const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    roleId: {
        type : [String],
        default: [10],
        required: true,
    },
    accessId: {
        type: String,
        default: 1,
        required: true,
    },
    profilePicture: {
        type : String,
        default : 'default-image.png'
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema)