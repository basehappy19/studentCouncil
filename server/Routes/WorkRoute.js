const express = require('express');
const router = express.Router();
const { upload } = require('../Middlewares/UploadsMiddlewares');

const { AllWorks, UserWorks , AddWork } = require('../Controllers/WorkController');

router.get("/works", AllWorks)
router.get("/user_works", UserWorks)
router.post("/work", (req, res, next) => {
    req.params.fieldName = 'workImage'; 
    req.params.type = 'work'; 
    next(); 
}, upload, AddWork);

module.exports = router;