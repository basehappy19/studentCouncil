const express = require('express')
const router = express.Router()

const { Transaction, AddTransaction, UpdateTransaction, RemoveTransaction } = require('../Controllers/TransactionController')

router.get("/transaction/:budgetId", Transaction)
router.post("/transaction", AddTransaction)
router.put("/transaction/:id", UpdateTransaction)
router.delete("/transaction/:id", RemoveTransaction)


module.exports = router