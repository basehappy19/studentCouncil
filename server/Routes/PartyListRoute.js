const express = require('express');
const router = express.Router()

const { PartyList, AllPartyLists, AddPartyList, HomePagePartyLists } = require('../Controllers/PartyListController')

router.get("/partyLists", AllPartyLists)
router.get("/partyList", PartyList)
router.get("/partyList_for_homepages", HomePagePartyLists)
router.post("/partyList", AddPartyList)

module.exports = router;