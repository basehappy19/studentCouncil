const express = require('express');
const { Messages, AddMessage, LikeMessage } = require('../Controllers/FakbokController');
const router = express.Router()

router.get("/fakbok", Messages)
router.post("/fakbok", AddMessage)
router.put("/fakbok/like/:publicId", LikeMessage)

module.exports = router;