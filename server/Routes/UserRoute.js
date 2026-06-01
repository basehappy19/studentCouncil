const express = require('express');
const router = express.Router()
const { upload } = require('../Middlewares/UploadsMiddlewares');
const { AllUsers, RemoveUser, updateUser, updateUserProfile, User } = require('../Controllers/UserController');

router.get("/users", AllUsers)
router.get("/user", User) // Get self
router.get("/user/:id", User) // Get specific user
router.put("/user/:id", updateUser)
router.delete("/user/:id", RemoveUser)

module.exports = router;