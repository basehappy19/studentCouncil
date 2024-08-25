const express = require('express')
const router = express.Router()
const { upload } = require('../Middlewares/UploadsMiddlewares')

const { AllWork, UserWorks , AddWork } = require('../Controllers/WorkController')

router.get("/work", AllWork)
router.get("/user-works/:id", UserWorks)
router.post("/work", upload, AddWork)

module.exports = router