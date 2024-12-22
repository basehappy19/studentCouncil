const express = require('express');
const { AllAnnouncements } = require('../Controllers/AnnouncementController');
const router = express.Router();

router.get('/announcements', AllAnnouncements);


module.exports = router;