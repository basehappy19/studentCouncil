const express = require('express');
const router = express.Router();
const { Policy, AllPolicies, AddPolicy, LikePolicy, CommentPolicy } = require('../Controllers/PolicyController');

router.get("/policy", Policy)
router.post("/policy/comment", CommentPolicy)
router.put("/policy/like", LikePolicy)
router.get("/policies_recommend", AllPolicies)
router.get("/policies", AllPolicies)
router.post("/policy", AddPolicy)


module.exports = router;