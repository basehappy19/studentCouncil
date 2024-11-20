const express = require('express');
const router = express.Router();
const { AddUser, Login } = require('../Controllers/AuthController');
const { VerifyAuth } = require('../Middlewares/Verify');

router.post('/add_user', VerifyAuth, AddUser)
router.post('/login', Login)

module.exports = router;