const express = require('express');
const router = express.Router()
const { AllAccesses, AddAccess } = require('../Controllers/AccessController');
const { VerifyAuth } = require('../Middlewares/Verify')

router.get("/accesses", VerifyAuth, AllAccesses)
router.post("/access", VerifyAuth, AddAccess)

module.exports = router;