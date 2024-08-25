const mongoose = require("mongoose")

const SkillSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    skillTitle: {
        type: String,
        required: true,
    },
    skillIcon: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Skill', SkillSchema)