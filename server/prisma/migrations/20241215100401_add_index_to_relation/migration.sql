/*
  Warnings:

  - You are about to alter the column `iconId` on the `WorkTag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `WorkTag` MODIFY `iconId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `CheckIn_userId_checkInDayId_idx` ON `CheckIn`(`userId`, `checkInDayId`);

-- CreateIndex
CREATE INDEX `Contact_partyListId_platformId_idx` ON `Contact`(`partyListId`, `platformId`);

-- CreateIndex
CREATE INDEX `Department_leaderId_idx` ON `Department`(`leaderId`);

-- CreateIndex
CREATE INDEX `ExperienceOwnPartyList_experienceId_bioId_idx` ON `ExperienceOwnPartyList`(`experienceId`, `bioId`);

-- CreateIndex
CREATE INDEX `IconCategories_iconId_categoryId_idx` ON `IconCategories`(`iconId`, `categoryId`);

-- CreateIndex
CREATE INDEX `IconTags_iconId_tagId_idx` ON `IconTags`(`iconId`, `tagId`);

-- CreateIndex
CREATE INDEX `NoVote_partyListId_resultId_idx` ON `NoVote`(`partyListId`, `resultId`);

-- CreateIndex
CREATE INDEX `Policy_categoryId_descriptionId_idx` ON `Policy`(`categoryId`, `descriptionId`);

-- CreateIndex
CREATE INDEX `PolicySubCategory_policyId_subCategoryId_idx` ON `PolicySubCategory`(`policyId`, `subCategoryId`);

-- CreateIndex
CREATE INDEX `ProgressPolicy_statusId_policyId_idx` ON `ProgressPolicy`(`statusId`, `policyId`);

-- CreateIndex
CREATE INDEX `RoleForPartyList_partyListId_roleId_idx` ON `RoleForPartyList`(`partyListId`, `roleId`);

-- CreateIndex
CREATE INDEX `SkillOwnPartyList_skillId_bioId_idx` ON `SkillOwnPartyList`(`skillId`, `bioId`);

-- CreateIndex
CREATE INDEX `User_accessId_partyListId_idx` ON `User`(`accessId`, `partyListId`);

-- CreateIndex
CREATE INDEX `VoteAbstain_partyListId_resultId_idx` ON `VoteAbstain`(`partyListId`, `resultId`);

-- CreateIndex
CREATE INDEX `VoteAgree_partyListId_resultId_idx` ON `VoteAgree`(`partyListId`, `resultId`);

-- CreateIndex
CREATE INDEX `VoteDisagree_partyListId_resultId_idx` ON `VoteDisagree`(`partyListId`, `resultId`);

-- CreateIndex
CREATE INDEX `VoteDocument_voteId_documentId_idx` ON `VoteDocument`(`voteId`, `documentId`);

-- CreateIndex
CREATE INDEX `VoteRefer_voteId_referId_idx` ON `VoteRefer`(`voteId`, `referId`);

-- CreateIndex
CREATE INDEX `VoteResult_maxAttendeesId_voteId_idx` ON `VoteResult`(`maxAttendeesId`, `voteId`);

-- CreateIndex
CREATE INDEX `WorkOperators_userId_workId_idx` ON `WorkOperators`(`userId`, `workId`);

-- CreateIndex
CREATE INDEX `WorkTag_iconId_idx` ON `WorkTag`(`iconId`);

-- AddForeignKey
ALTER TABLE `WorkTag` ADD CONSTRAINT `WorkTag_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `CheckInRequest` RENAME INDEX `CheckInRequest_checkInDayId_fkey` TO `CheckInRequest_checkInDayId_idx`;

-- RenameIndex
ALTER TABLE `IconContributors` RENAME INDEX `IconContributors_iconId_fkey` TO `IconContributors_iconId_idx`;

-- RenameIndex
ALTER TABLE `MessageToPartyList` RENAME INDEX `MessageToPartyList_partyListId_fkey` TO `MessageToPartyList_partyListId_idx`;

-- RenameIndex
ALTER TABLE `Setting` RENAME INDEX `Setting_byUserId_fkey` TO `Setting_byUserId_idx`;

-- RenameIndex
ALTER TABLE `SkipDay` RENAME INDEX `SkipDay_byUserId_fkey` TO `SkipDay_byUserId_idx`;

-- RenameIndex
ALTER TABLE `SubCategory` RENAME INDEX `SubCategory_categoryId_fkey` TO `SubCategory_categoryId_idx`;

-- RenameIndex
ALTER TABLE `Transaction` RENAME INDEX `Transaction_byUserId_fkey` TO `Transaction_byUserId_idx`;

-- RenameIndex
ALTER TABLE `Work` RENAME INDEX `Work_postById_fkey` TO `Work_postById_idx`;

-- RenameIndex
ALTER TABLE `WorkImages` RENAME INDEX `WorkImages_workId_fkey` TO `WorkImages_workId_idx`;
