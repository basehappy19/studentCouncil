const express = require('express');
const router = express.Router()

const { AllPolicyProgresses, AddStatus, StatisticProgresses, AllStatuses } = require('../Controllers/PolicyStatusController');

router.get("/policy_statuses", AllStatuses)
router.get("/policy_track", AllPolicyProgresses)
router.get("/policy_track_statistic", StatisticProgresses)
router.post("/policy_status", AddStatus)

module.exports = router;