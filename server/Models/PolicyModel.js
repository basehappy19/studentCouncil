const mongoose = require("mongoose")

const subCategories = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
    },
    icon: {
        type: String,
    },
})
const PolicySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    numberTag: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    statusPolicy: Number,
    categories: [Number],
    subCategories: [subCategories],
    problem: {
        type: String,
    },
    offer: {
        type: String,
    },
    budget: {
        type: String,
    },
    image: {
        type: String,
    },
})

module.exports = mongoose.model('Policy', PolicySchema)