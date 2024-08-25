const express = require('express')
const router = express.Router()

const { AllUser, AddUser } = require('../Controllers/UserController')

router.get("/user", AllUser)
router.post("/user", AddUser)

module.exports = router