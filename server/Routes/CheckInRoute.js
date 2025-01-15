const express = require('express');
const router = express.Router()

const { AllCheckIns, CheckIn, CheckInStatus, CheckInStatistics, RequestCheckIns, ActionRequestCheckIn, RequestCheckInExist } = require('../Controllers/CheckInController');

router.get("/checkIns", AllCheckIns)
router.post("/checkIn", CheckIn)
router.get("/checkInUser", CheckInStatus)
router.get("/checkIn_statistics", CheckInStatistics)
router.get("/checkInRequests", RequestCheckIns)
router.get("/checkInRequest", RequestCheckInExist)
router.put("/actionRequestCheckIn", ActionRequestCheckIn)

module.exports = router;