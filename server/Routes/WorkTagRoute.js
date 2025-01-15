const express = require('express');
const router = express.Router();

const { AllWorkTags, AddWorkTag, AllWorkTagsWithWork } = require('../Controllers/WorkTagController');

router.get('/tags', AllWorkTags);
router.get('/work/tags', AllWorkTagsWithWork);
router.post('/tag', AddWorkTag);

module.exports = router;