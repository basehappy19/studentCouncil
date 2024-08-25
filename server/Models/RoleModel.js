const mongoose = require("mongoose")

const RoleSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Role', RoleSchema)