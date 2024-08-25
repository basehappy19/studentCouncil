const express = require('express')
const router = express.Router()

const { AllAccess, AddAccess } = require('../Controllers/AccessController')

router.get("/access", AllAccess)
router.post("/access", AddAccess)

module.exports = router