const express = require('express');
const router = express.Router()

const { AllRoles, AddRole } = require('../Controllers/RoleController');

router.get("/roles", AllRoles)
router.post("/role", AddRole)

module.exports = router;