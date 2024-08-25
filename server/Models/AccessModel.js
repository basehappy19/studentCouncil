const mongoose = require("mongoose")

const AccessSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.model('Access', AccessSchema)