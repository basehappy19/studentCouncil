const express = require('express');
const router = express.Router();

const { AllCategories, Category } = require('../Controllers/CategoryController');

router.get("/categories", AllCategories)
router.get("/category", Category)

module.exports = router;