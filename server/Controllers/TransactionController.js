const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateRequiredFields = require('../Functions/ValidateRequiredFields');

exports.Transactions = async (req, res) => {
    try {
        const { id } = req.query;
        const transactions = await prisma.transaction.findMany({
            where: {
                budget: id
            }
        })
        res.status(200).send(transactions); 
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
};

exports.AddTransaction = async (req, res) => {
    try {
        const { title, description, amount, type, budgetId } = req.body;
        
        const requiredFields = {
            title: "Title",
            description: "Description",
            amount: "Amount",
            type: "Type",
            budgetId: "Budget Id",
        };
        
        const errorMessage = validateRequiredFields(req.body, requiredFields);
        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: "error" });
        }

        const userId = req.user.id;

        const budget = await prisma.budget.findFirst({
            where: { id: budgetId }
        });

        if (!budget) {
            return res.status(404).json({ message: "ไม่พบบัญชีงบประมาณ", type: "error" });
        }

        let budgetBefore = budget.total;
        let budgetAfter;

        if (type === 'EXPENSE') {
            if (budget.total < amount) {
                return res.status(400).json({ message: "งบประมาณคงเหลือไม่เพียงพอ", type: "error" });
            }
            budgetAfter = budget.total - amount;
        } else if (type === 'INCOME') {
            budgetAfter = budget.total + amount;
        } else {
            return res.status(400).json({ message: "ประเภทธุรกรรมไม่ถูกต้อง", type: "error" });
        }

        await prisma.budget.update({
            where: { id: budgetId },
            data: { total: budgetAfter },
        });

        const transaction = await prisma.transaction.create({
            data: {
                title,
                description,
                amount,
                budgetBefore,
                budgetAfter,
                type,
                userId,
                budgetId,
            },
        });

        res.status(201).json({
            message: `เพิ่มรายการ "${transaction.title}" เรียบร้อยแล้ว`,
            type: 'success',
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Error");
    }
};

exports.UpdateTransaction = async (req, res) => {
    try {
        const { id } = req.query; 
        const { title, description, amount, type, budgetId } = req.body;

        const requiredFields = {
            title: "Title",
            description: "Description",
            amount: "Amount",
            type: "Type",
            budgetId: "Budget Id",
        };

        const errorMessage = validateRequiredFields(req.body, requiredFields);
        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: "error" });
        }

        const transaction = await prisma.transaction.findFirst({
            where: { id: parseInt(id) },
        });

        if (!transaction) {
            return res.status(404).json({ message: "ไม่พบรายการธุรกรรม", type: "error" });
        }

        const budget = await prisma.budget.findFirst({
            where: { id: budgetId }
        });

        if (!budget) {
            return res.status(404).json({ message: "ไม่พบบัญชีงบประมาณ", type: "error" });
        }

        const oldAmount = transaction.amount;
        const oldType = transaction.type;

        const transactions = await prisma.transaction.findMany({
            where: { budgetId: budgetId },
            orderBy: { createdAt: 'asc' }, 
        });

        transaction.title = title;
        transaction.description = description;
        transaction.amount = amount;
        transaction.type = type;

        let runningTotal = 0;

        for (const tran of transactions) {
            if (tran.id === transaction.id) {
                if (type === 'INCOME') {
                    runningTotal += amount;
                } else {
                    runningTotal -= amount;
                }
            } else {
                if (tran.type === 'INCOME') {
                    runningTotal += tran.amount;
                } else {
                    runningTotal -= tran.amount;
                }
            }

            if (runningTotal < 0) {
                return res.status(400).json({
                    message: `ไม่สามารถแก้ไขรายการได้ เนื่องจากงบประมาณของรายการ ${tran.title} จะติดลบ`,
                    type: 'error',
                });
            }

            await prisma.transaction.update({
                where: { id: tran.id },
                data: {
                    budgetBefore: runningTotal - tran.amount,
                    budgetAfter: runningTotal,
                },
            });
        }

        await prisma.budget.update({
            where: { id: budgetId },
            data: { total: runningTotal },
        });

        res.status(200).json({
            message: `แก้ไขรายการ ${transaction.title} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (err) {
        console.error('UpdateTransaction Error:', err);
        res.status(500).send('UpdateTransaction Error');
    }
};

exports.RemoveTransaction = async (req, res) => {
    try {
        const { id } = req.query;
        
        const transactionToDelete = await prisma.transaction.findFirst({
            where: { id: parseInt(id) },
        });

        if (!transactionToDelete) {
            return res.status(404).json({ message: "ไม่พบรายการธุรกรรม", type: "error" });
        }

        const budget = await prisma.budget.findFirst({
            where: { id: transactionToDelete.budgetId },
        });

        if (!budget) {
            return res.status(404).json({ message: "ไม่พบบัญชีงบประมาณ", type: "error" });
        }

        if (transactionToDelete.transactionType !== 'EXPENSE') {
            budget.total -= transactionToDelete.amount;
        } else {
            budget.total += transactionToDelete.amount;
        }

        if (budget.total < 0) {
            return res.status(200).json({
                message: `ลบรายการ "${transactionToDelete.title}" ไม่ได้เนื่องจากเงินในบัญชีจะน้อยกว่าศูนย์`,
                type: 'error'
            });
        }

        await prisma.transaction.delete({
            where: { id: transactionToDelete.id },
        });

        const remainingTransactions = await prisma.transaction.findMany({
            where: {
                budgetId: transactionToDelete.budgetId,
                id: { gt: transactionToDelete.id },
            },
            orderBy: { id: 'asc' },
        });

        let currentBudgetTotal = budget.total;

        for (let transaction of remainingTransactions) {
            const newBudgetBefore = currentBudgetTotal;
            const newBudgetAfter = 
                transaction.transactionType === 'EXPENSE'
                    ? newBudgetBefore - transaction.transactionAmount
                    : newBudgetBefore + transaction.transactionAmount;

            await prisma.transaction.update({
                where: { id: transaction.id },
                data: {
                    budgetBefore: newBudgetBefore,
                    budgetAfter: newBudgetAfter,
                },
            });

            currentBudgetTotal = newBudgetAfter;
        }

        await prisma.budget.update({
            where: { id: budget.id },
            data: { total: budget.total },
        });

        res.status(204).json({ message: `ลบรายการ ${transactionToDelete.title} เรียบร้อยแล้ว`, type: 'success' });
    } catch (err) {
        console.error('Delete Transaction Error:', err);
        res.status(500).send('Internal Server Error');
    }
};


