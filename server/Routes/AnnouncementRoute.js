const express = require('express');
const { AllAnnouncements, GetAnnouncement } = require('../Controllers/AnnouncementController');
const router = express.Router();

router.get('/announcements', AllAnnouncements);
router.get('/announcement/:id', GetAnnouncement);


module.exports = router;