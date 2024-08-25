const express = require('express')
const router = express.Router()

const { AllSkill, AddSkill } = require('../Controllers/SkillController')

router.get("/skill", AllSkill)
router.post("/skill", AddSkill)

module.exports = router