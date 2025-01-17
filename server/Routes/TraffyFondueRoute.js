const express = require("express");
const { getLocations, ReportProblem, getProblems } = require("../Controllers/TraffyFondueController");
const { upload } = require("../Middlewares/UploadsMiddlewares");
const router = express.Router();

router.get("/traffyFondue/locations", getLocations);
router.get("/traffyFondue/reports", getProblems);
router.post("/traffyFondue/report", upload.array("images"), ReportProblem);
module.exports = router;
