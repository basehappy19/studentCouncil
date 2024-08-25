const mongoose = require("mongoose")

const WorkTagSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    tagTitle: {
        type: String,
        required: true,
    },
    tagIcon: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('WorkTag', WorkTagSchema)