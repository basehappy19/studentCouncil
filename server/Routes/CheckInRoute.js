const express = require('express');
const router = express.Router()

const { AllCheckIns, CheckIn, CheckInStatus, CheckInStatistic } = require('../Controllers/CheckInController')

router.get("/checkIn_statistics", CheckInStatistic)
router.get("/checkIns", AllCheckIns)
router.post("/checkIn", CheckIn)
router.post("/checkIn_status", CheckInStatus)

module.exports = router;