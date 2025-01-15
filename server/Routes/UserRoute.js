const express = require('express');
const router = express.Router()
const { upload } = require('../Middlewares/UploadsMiddlewares');
const { AllUsers, RemoveUser, updateUser, updateUserProfile, User } = require('../Controllers/UserController');

router.get("/users", AllUsers)
router.get("/user", User)
router.put("/user", updateUser)
// router.put("/user_profile", (req, res, next) => {
//     req.params.fieldName = 'profileImage';
//     req.params.type = 'profile';
//     next();
// }, upload, updateUserProfile);
router.delete("/user", RemoveUser)

module.exports = router;