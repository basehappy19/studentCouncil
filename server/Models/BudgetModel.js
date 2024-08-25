const mongoose = require("mongoose")


const BudgetSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    budgetTitle: {
        type: String,
        required: true,
    },
    budgetDescription: {
        type: String,
        required: true,
    },
    budgetIcon: {
        type: String,
    },
    budgetColor: {
        type: String,
    },
})

module.exports = mongoose.model('Budget', BudgetSchema)
