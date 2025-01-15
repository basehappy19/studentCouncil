const express = require("express");
const { getLocations } = require("../Controllers/TraffyFondueController");
const router = express.Router();

router.get("/traffyFondue/locations", getLocations);

module.exports = router;
