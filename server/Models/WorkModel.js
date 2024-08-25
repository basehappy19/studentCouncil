const mongoose = require("mongoose")

const WorkSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    workTitle: {
        type: String,
        required: true,
    },
    workDescription: {
        type: String,
        required: true,
    },
    workOperator: {
        type: [Number],
        required: true,
    },
    workPostBy: {
        type: Number,
        required: true,
    },
    workImage: {
        type: [String],
        required: true,
    },
    workTagId: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Work', WorkSchema)