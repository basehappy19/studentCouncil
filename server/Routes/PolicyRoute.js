const express = require('express');
const router = express.Router();
const { Policy, AllPolicies, PolicyFilter, AddPolicy } = require('../Controllers/PolicyController');

router.get("/policy", Policy)
router.get("/policies_recommend", AllPolicies)
router.get("/policies", AllPolicies)
router.post("/policy", AddPolicy)


module.exports = router;