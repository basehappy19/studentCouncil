const express = require('express')
const router = express.Router()

const { AllPolicyCategories, PolicyCategories, AddPolicyCategory } = require('../Controllers/PolicyCategoriesController')

router.get("/policy/category", AllPolicyCategories)
router.get("/policy/category/info/:id", PolicyCategories)
router.post("/policy/category", AddPolicyCategory)


module.exports = router