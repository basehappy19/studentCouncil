const express = require('express');
const { AllEvents } = require('../Controllers/EventController');
const router = express.Router();

router.get('/events', AllEvents);


module.exports = router;