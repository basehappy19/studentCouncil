const express = require('express')
const router = express.Router()

const { PartyList,AllPartyList,AddPartyList,HomePagePartyList } = require('../Controllers/PartyListController')

router.get("/partylist", AllPartyList)
router.get("/partylist/:id", PartyList)
router.get("/homepage/partylist", HomePagePartyList)
router.post("/partylist", AddPartyList)

module.exports = router