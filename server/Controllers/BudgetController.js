const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AllBudget = async (req, res, next) => {
    try {
        const budgets = await prisma.budget.findMany({
            include: {
                department: true
            }
        });
        return res.status(200).json(budgets);
    } catch (e) {
        console.error("[AllBudget Error]:", e);
        next(e);
    }
};

exports.BudgetInDepartment = async (req, res, next) => {
    try {
        const { id } = req.query;

        const budget = await prisma.budget.findFirst({
            where: {
                department: {
                    id: isNaN(parseInt(id))
                        ? undefined
                        : parseInt(id),
                },
            },
            include: {
                transactions: true,
                department: {
                    include: {
                        leader: true,
                    },
                },
            },
        });

        if (!budget) {
            return res
                .status(404)
                .json({ message: "ไม่พบงบประมาณ", type: "error" });
        }

        return res.status(200).json(budget);
    } catch (e) {
        console.error("[BudgetInDepartment Error]:", e);
        e.status = e.status || 500;
        next(e);
    }
};

exports.IncomeExpenseStatisticsById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentDate = new Date();

        const month = parseInt(req.query.month) || currentDate.getMonth() + 1;
        const year = parseInt(req.query.year) || currentDate.getFullYear();

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const summary = await prisma.transaction.groupBy({
            by: ["type"],
            where: {
                budgetId: id,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            _sum: {
                amount: true,
            },
        });

        return res.status(200).json(summary);
    } catch (e) {
        console.error("[IncomeExpenseStatisticsById Error]:", e);
        e.status = e.status || 500;
        next(e);
    }
};

exports.IncomeExpenseStatistics = async (req, res, next) => {
    try {
        const today = new Date();

        const month = parseInt(req.query.month) || today.getMonth() + 1;
        const year = parseInt(req.query.year) || today.getFullYear();

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const summary = await prisma.transaction.groupBy({
            by: ["type", "budgetId"],
            _sum: {
                amount: true,
            },
        });

        const summaryByTime = await prisma.transaction.groupBy({
            by: ["type", "budgetId"],
            _sum: {
                amount: true,
            },
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        const budgetDetails = await prisma.budget.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                department: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const budgetMap = budgetDetails.reduce((acc, budget) => {
            acc[budget.id] = {
                title: budget.title,
                description: budget.description,
                department: budget.department?.name || "N/A",
            };
            return acc;
        }, {});

        const totalIncome = summary.filter(item => item.type === "INCOME")
            .reduce((sum, item) => sum + (item._sum.amount || 0), 0);
        const totalExpense = summary.filter(item => item.type === "EXPENSE")
            .reduce((sum, item) => sum + (item._sum.amount || 0), 0);

        const balance = totalIncome - totalExpense;

        const budgetStats = budgetDetails.map(budget => {
            
            const income = summaryByTime.find(item => item.type === "INCOME" && item.budgetId === budget.id);
            const expense = summaryByTime.find(item => item.type === "EXPENSE" && item.budgetId === budget.id);

            return {
                budgetData: budgetMap[budget.id],
                income: income?._sum.amount || 0,
                expense: expense?._sum.amount || 0,
                balance: (income?._sum.amount || 0) - (expense?._sum.amount || 0),
            };
        });

        const result = {
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            balance: balance,
            budgets: budgetStats,
        };

        return res.status(200).json(result);
    } catch (e) {
        console.error("[IncomeExpenseStatistics Error]:", e);
        e.status = e.status || 500;
        next(e);
    }
};



