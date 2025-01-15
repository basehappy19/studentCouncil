const express = require('express');
const router = express.Router()

const { AllSkills, AddSkill } = require('../Controllers/SkillController');

router.get("/skills", AllSkills)
router.post("/skill", AddSkill)

module.exports = router;