const express = require('express');
const router = express.Router();
const { AddUser, Login, getUserData } = require('../Controllers/AuthController');

router.post('/add_user', AddUser);
router.get('/user/data', getUserData);
router.post('/auth/login', Login);

module.exports = router;