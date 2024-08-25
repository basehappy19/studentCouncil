const express = require('express')
const router = express.Router()

const { AllWorkTag, AddWorkTag } = require('../Controllers/WorkTagController')

router.get("/work/tag", AllWorkTag)
router.post("/work/tag", AddWorkTag)

module.exports = router