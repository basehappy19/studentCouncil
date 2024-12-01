const express = require("express");
const router = express.Router();
const { upload } = require("../Middlewares/UploadsMiddlewares");

const {
    AllWorks,
    AddWork,
    UserWorkStatistics,
    UserWorks,
    OptionsForAddWork,
} = require("../Controllers/WorkController");

router.get("/works", AllWorks);
router.get("/userWorkStatistics", UserWorkStatistics);
router.get("/userWorks", UserWorks);
router.get("/optionsForAddWork", OptionsForAddWork);
router.post("/work", upload.array("images"), AddWork);

module.exports = router;
