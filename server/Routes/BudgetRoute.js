const express = require('express');
const router = express.Router()
const { VerifyAuth } = require('../Middlewares/Verify')
const { BudgetInDepartment, IncomeExpenseStatistics, IncomeExpenseStatisticsById, IncomeExpenseStatisticsByTime, AllDepartments } = require('../Controllers/BudgetController')

router.get("/budget/department", BudgetInDepartment)
router.post("/statistics/budget/all/income_expense", VerifyAuth, IncomeExpenseStatisticsByTime)
router.get("/statistics/budget/income_expense", VerifyAuth, IncomeExpenseStatistics)
router.get("/statistics/budget/income_expense/:id", VerifyAuth, IncomeExpenseStatisticsById)

module.exports = router;