const express = require('express');
const router = express.Router()

const { PartyList, AllPartyLists, AddPartyList, HomePagePartyLists, SupportPartyList, SendMessage } = require('../Controllers/PartyListController')

router.get("/partyLists", AllPartyLists)
router.get("/partyList", PartyList)
router.post("/partyList/message", SendMessage)
router.put("/partyList/support", SupportPartyList)
router.get("/partyList_for_homepages", HomePagePartyLists)
router.post("/partyList", AddPartyList)

module.exports = router;