const express = require('express')
const router = express.Router()

const { AllStatus, AddStatus, AllPolicyProgress } = require('../Controllers/PolicyStatusController')

router.get("/policy/data/status", AllStatus)
router.get("/policy/data/track", AllPolicyProgress)
router.post("/policy/data/status", AddStatus)

module.exports = router