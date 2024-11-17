const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.AllDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany({
            include: {
                budget: true,
            },
        });
    
        res.status(200).send(departments);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
}

exports.BudgetInDepartment = async (req, res) => {
    try {
        const { departmentId } = req.query;

        const budget = await prisma.budget.findFirst({
          where: { departmentId },
          include: {
            transactions: true,
            department: true,
          },
        })

        if(!budget){
            return res.status(404).json({ message: "ไม่พบงบประมาณ", type: "error" });
        }

        res.status(200).send(budget); 
    } catch (e) {
        console.error(e);  
        res.status(500).send('Server Error');
    }
};

exports.IncomeExpenseStatisticsByTime = async (req, res) => {
  try {
      const currentDate = new Date();
      
      const month = parseInt(req.query.month) || currentDate.getMonth() + 1;
      const year = parseInt(req.query.year) || currentDate.getFullYear();

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const summary = await prisma.transaction.findMany({
          by: ['type'], 
          where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
          },
          _sum: {
                amount: true, 
          },
      });

      res.status(200).send(summary);
  } catch (e) {
      console.error(e);
      res.status(500).send('Server Error');
  }
};

exports.IncomeExpenseStatisticsById = async (req, res) => {
    try {
        const { id } = req.query;
        const currentDate = new Date();
        
        const month = parseInt(req.query.month) || currentDate.getMonth() + 1;
        const year = parseInt(req.query.year) || currentDate.getFullYear();

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const summary = await prisma.transaction.groupBy({
            by: ['type'], 
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

        res.status(200).send(summary); 
    } catch (err) {
        console.error('IncomeExpenseStatisticsById Error:', err);  
        res.status(500).send('IncomeExpenseStatisticsById Error');
    }
};

exports.IncomeExpenseStatistics = async (req, res) => {
    try {
        const summary = await prisma.transaction.findMany({
            by: ['type'], 
            select:{
                title: true,
                description: true,
                amount: true,
                budgetBefore: true,
                budgetAfter: true,
                type: true,
                date: true,
                budget: true,
                byUser: true,
                editByUser: true,
            },
            _sum: {
                amount: true, 
            },
        }) 
        res.status(200).send(summary); 
    } catch (e) {
        console.error(e);  
        res.status(500).send('Server Error');
    }
};