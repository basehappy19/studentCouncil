const express = require('express')
const router = express.Router()

const { AllVote, Vote, AddVote } = require('../Controllers/VoteController')

router.get("/vote", AllVote)
router.get("/vote/:id", Vote)
router.post("/vote", AddVote)

module.exports = router