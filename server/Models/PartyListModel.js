const mongoose = require("mongoose")

const socialSchema = mongoose.Schema({
    facebook: String,
    instagram: String,
})

const PartyListSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    nickName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    numberTag: {
        type: String,
        required: true,
    },
    roleId: {
        type: [Number],
        required: true,
    },
    study: {
        type: String,
        required: true,
    },
    experience_work: {
        type: [String],
        required: true,
    },
    skillId: {
        type: [Number],
        required: true,
    },
    social: [socialSchema],
    showInHomepage: {
        required: true,
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('PartyList', PartyListSchema)