const express = require('express')
const router = express.Router()

const { Policy,AllPolicy, PolicyFilter, AddPolicy } = require('../Controllers/PolicyController')

router.get("/policy/:id", Policy)
router.get("/policy", AllPolicy)
router.get("/policy/category/:category/:subcategory", PolicyFilter)
router.post("/policy", AddPolicy)


module.exports = router