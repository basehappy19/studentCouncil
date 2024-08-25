const express = require('express')
const router = express.Router()

const { AllBudget, AddBudget, Budget } = require('../Controllers/BudgetController')

router.get("/budget", AllBudget)
router.get("/budget/:id", Budget)
router.post("/budget", AddBudget)

module.exports = router