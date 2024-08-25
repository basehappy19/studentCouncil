const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    budgetId: {
        type: Number,
        required: true,
    },
    transactionTitle: {
        type: String,
        required: true,
        trim: true,
    },
    transactionDescription: {
        type: String,
        trim: true,
    },
    transactionAmount: {
        type: Number,
        required: true,
    },
    transactionType: {
        type: Number,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    editByUserId: {
        type: Number,
        default: null, 
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
