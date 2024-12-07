const express = require('express');
const router = express.Router()
const { BudgetInDepartment, IncomeExpenseStatistics, IncomeExpenseStatisticsById, IncomeExpenseStatisticsByTime, AllDepartments } = require('../Controllers/BudgetController')

router.get("/budget/department", BudgetInDepartment)
router.get("/budget/statistics/income_expense", IncomeExpenseStatistics)
router.get("/statistics/budget/income_expense/:id", IncomeExpenseStatisticsById)

module.exports = router;