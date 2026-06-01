const express = require('express');
const router = express.Router()

const { AllVotes, AddVote, RemoveVote, getVote } = require('../Controllers/VoteController');
const { upload } = require('../Middlewares/UploadsMiddlewares');

router.get("/votes", AllVotes)
router.get("/vote/:id", getVote)
router.delete("/vote/:id", RemoveVote)
router.post("/vote", upload.array("documents"), AddVote)

module.exports = router;