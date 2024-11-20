const express = require('express');
const router = express.Router()

const { Transactions, AddTransaction, UpdateTransaction, RemoveTransaction } = require('../Controllers/TransactionController');

router.get("/transactions", Transactions)
router.post("/transaction", AddTransaction)
router.put("/transaction", UpdateTransaction)
router.delete("/transaction", RemoveTransaction)


module.exports = router;