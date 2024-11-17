const express = require('express');
const router = express.Router()

const { AllVotes, AddVote, RemoveVote, getVote } = require('../Controllers/VoteController');
const { upload } = require('../Middlewares/UploadsMiddlewares');

router.get("/votes", AllVotes)
router.get("/vote/:id", getVote)
router.delete("/vote", RemoveVote)
router.post("/vote", (req, res, next) => {
    req.params.fieldName = 'voteDocumentFiles';
    req.params.type = 'documents';
    next();
}, upload, AddVote)

module.exports = router;