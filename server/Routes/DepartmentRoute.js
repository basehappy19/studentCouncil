const express = require('express');
const { AllDepartments } = require('../Controllers/DepartmentController');
const router = express.Router()

router.get("/departments", AllDepartments)

module.exports = router;