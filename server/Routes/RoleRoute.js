const express = require('express')
const router = express.Router()

const { AllRole, AddRole } = require('../Controllers/RoleController')

router.get("/role", AllRole)
router.post("/role", AddRole)

module.exports = router