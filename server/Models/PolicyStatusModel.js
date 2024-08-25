const mongoose = require("mongoose")

const PolicyStatusSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    statusName: {
        type: String,
        required: true,
    },
    statusColor: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('PolicyStatus', PolicyStatusSchema)