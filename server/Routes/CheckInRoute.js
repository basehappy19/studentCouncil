const express = require('express')
const router = express.Router()

const { AllCheckIn,CheckIn,CheckInStatus } = require('../Controllers/CheckInController')

router.post("/checkin/list", AllCheckIn)
router.post("/checkin", CheckIn)
router.post("/checkin/status", CheckInStatus)

module.exports = router