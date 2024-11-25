const express = require('express');
const router = express.Router();
const { AddUser, Login, getUserData } = require('../Controllers/AuthController');
const { VerifyAuth } = require('../Middlewares/Verify');

router.post('/add_user', VerifyAuth, AddUser);
router.get('/user/data', VerifyAuth, getUserData);
router.post('/auth/login', Login);

module.exports = router;