const express = require('express');
const router = express.Router()
const { AllAccesses, AddAccess } = require('../Controllers/AccessController');

router.get("/accesses", AllAccesses)
router.post("/access", AddAccess)

module.exports = router;