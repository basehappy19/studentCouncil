const express = require('express');
const router = express.Router()

const { PartyList, AllPartyLists, AddPartyList, HomePagePartyLists, SupportPartyList, SendMessage, UpdateBioPartyList, AddExperiencePartyList, UpdateExperiencePartyList, DeleteExperiencePartyList, AllPlatforms, AddContact, UpdateContact, RemoveContact, AllSkills, AddSkillInPartyList, RemoveSkillInPartyList } = require('../Controllers/PartyListController')

router.get("/partyLists", AllPartyLists)
router.get("/partyList", PartyList)
router.post("/partyList/message", SendMessage)
router.put("/partyList/support", SupportPartyList)
router.get("/partyList_for_homepages", HomePagePartyLists)
router.post("/partyList", AddPartyList)
router.put("/partyList/bio", UpdateBioPartyList)
router.post("/partyList/experience", AddExperiencePartyList)
router.put("/partyList/experience", UpdateExperiencePartyList)
router.delete("/partyList/experience", DeleteExperiencePartyList)
router.get("/platforms", AllPlatforms)
router.post("/partyList/contact", AddContact)
router.put("/partyList/contact", UpdateContact)
router.delete("/partyList/contact", RemoveContact)
router.get("/skills", AllSkills)
router.post("/partyList/skill", AddSkillInPartyList)
router.delete("/partyList/skill", RemoveSkillInPartyList)


module.exports = router;