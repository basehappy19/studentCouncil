const express = require('express');
const router = express.Router();

const { AllWorkTags, AddWorkTag } = require('../Controllers/WorkTagController');

router.get('/work_tags', AllWorkTags);
router.post('/work_tag', AddWorkTag);

module.exports = router;