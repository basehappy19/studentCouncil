const mongoose = require("mongoose")

const SubCategoriesSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
})

const PolicyCategoriesSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    icon: {
        type: [String],
    },
    subCategories: [SubCategoriesSchema]
})

module.exports = mongoose.model('PolicyCategories', PolicyCategoriesSchema)