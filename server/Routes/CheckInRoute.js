const express = require('express');
const router = express.Router()

const { AllCheckIns, CheckIn, CheckInStatus } = require('../Controllers/CheckInController')

router.get("/checkIns", AllCheckIns)
router.post("/checkIn", CheckIn)
router.post("/checkIn_status", CheckInStatus)

module.exports = router;