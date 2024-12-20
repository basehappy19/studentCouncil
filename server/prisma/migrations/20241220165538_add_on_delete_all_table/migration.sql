/*
  Warnings:

  - You are about to drop the column `descriptionId` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `SubCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[policyId]` on the table `PolicyDescription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `policyId` to the `PolicyDescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Budget` DROP FOREIGN KEY `Budget_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `CheckIn` DROP FOREIGN KEY `CheckIn_checkInDayId_fkey`;

-- DropForeignKey
ALTER TABLE `CheckIn` DROP FOREIGN KEY `CheckIn_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CheckInRequest` DROP FOREIGN KEY `CheckInRequest_checkInDayId_fkey`;

-- DropForeignKey
ALTER TABLE `CheckInRequest` DROP FOREIGN KEY `CheckInRequest_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CommentInWork` DROP FOREIGN KEY `CommentInWork_workId_fkey`;

-- DropForeignKey
ALTER TABLE `CommentPolicy` DROP FOREIGN KEY `CommentPolicy_policyId_fkey`;

-- DropForeignKey
ALTER TABLE `Contact` DROP FOREIGN KEY `Contact_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `Contact` DROP FOREIGN KEY `Contact_platformId_fkey`;

-- DropForeignKey
ALTER TABLE `ExperienceOwnPartyList` DROP FOREIGN KEY `ExperienceOwnPartyList_bioId_fkey`;

-- DropForeignKey
ALTER TABLE `ExperienceOwnPartyList` DROP FOREIGN KEY `ExperienceOwnPartyList_experienceId_fkey`;

-- DropForeignKey
ALTER TABLE `IconCategories` DROP FOREIGN KEY `IconCategories_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `IconCategories` DROP FOREIGN KEY `IconCategories_iconId_fkey`;

-- DropForeignKey
ALTER TABLE `IconContributors` DROP FOREIGN KEY `IconContributors_contributorId_fkey`;

-- DropForeignKey
ALTER TABLE `IconContributors` DROP FOREIGN KEY `IconContributors_iconId_fkey`;

-- DropForeignKey
ALTER TABLE `IconTags` DROP FOREIGN KEY `IconTags_iconId_fkey`;

-- DropForeignKey
ALTER TABLE `IconTags` DROP FOREIGN KEY `IconTags_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `MessageToPartyList` DROP FOREIGN KEY `MessageToPartyList_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `NoVote` DROP FOREIGN KEY `NoVote_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `PartyList` DROP FOREIGN KEY `PartyList_bioId_fkey`;

-- DropForeignKey
ALTER TABLE `Policy` DROP FOREIGN KEY `Policy_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Policy` DROP FOREIGN KEY `Policy_descriptionId_fkey`;

-- DropForeignKey
ALTER TABLE `PolicySubCategory` DROP FOREIGN KEY `PolicySubCategory_policyId_fkey`;

-- DropForeignKey
ALTER TABLE `PolicySubCategory` DROP FOREIGN KEY `PolicySubCategory_subCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `ProgressPolicy` DROP FOREIGN KEY `ProgressPolicy_policyId_fkey`;

-- DropForeignKey
ALTER TABLE `ProgressPolicy` DROP FOREIGN KEY `ProgressPolicy_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `RoleForPartyList` DROP FOREIGN KEY `RoleForPartyList_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `RoleForPartyList` DROP FOREIGN KEY `RoleForPartyList_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `Setting` DROP FOREIGN KEY `Setting_byUserId_fkey`;

-- DropForeignKey
ALTER TABLE `SkillOwnPartyList` DROP FOREIGN KEY `SkillOwnPartyList_bioId_fkey`;

-- DropForeignKey
ALTER TABLE `SkillOwnPartyList` DROP FOREIGN KEY `SkillOwnPartyList_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `SkipDay` DROP FOREIGN KEY `SkipDay_byUserId_fkey`;

-- DropForeignKey
ALTER TABLE `SubCategory` DROP FOREIGN KEY `SubCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `TagInWorks` DROP FOREIGN KEY `TagInWorks_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_budgetId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_byUserId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteAbstain` DROP FOREIGN KEY `VoteAbstain_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteAgree` DROP FOREIGN KEY `VoteAgree_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteDisagree` DROP FOREIGN KEY `VoteDisagree_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `Work` DROP FOREIGN KEY `Work_postById_fkey`;

-- DropForeignKey
ALTER TABLE `WorkOperators` DROP FOREIGN KEY `WorkOperators_userId_fkey`;

-- DropIndex
DROP INDEX `CheckIn_checkInDayId_fkey` ON `CheckIn`;

-- DropIndex
DROP INDEX `CheckInRequest_userId_fkey` ON `CheckInRequest`;

-- DropIndex
DROP INDEX `Contact_platformId_fkey` ON `Contact`;

-- DropIndex
DROP INDEX `ExperienceOwnPartyList_bioId_fkey` ON `ExperienceOwnPartyList`;

-- DropIndex
DROP INDEX `IconCategories_categoryId_fkey` ON `IconCategories`;

-- DropIndex
DROP INDEX `IconContributors_contributorId_fkey` ON `IconContributors`;

-- DropIndex
DROP INDEX `IconTags_tagId_fkey` ON `IconTags`;

-- DropIndex
DROP INDEX `Policy_categoryId_descriptionId_idx` ON `Policy`;

-- DropIndex
DROP INDEX `Policy_descriptionId_key` ON `Policy`;

-- DropIndex
DROP INDEX `PolicySubCategory_subCategoryId_fkey` ON `PolicySubCategory`;

-- DropIndex
DROP INDEX `ProgressPolicy_policyId_fkey` ON `ProgressPolicy`;

-- DropIndex
DROP INDEX `RoleForPartyList_roleId_fkey` ON `RoleForPartyList`;

-- DropIndex
DROP INDEX `SkillOwnPartyList_bioId_fkey` ON `SkillOwnPartyList`;

-- DropIndex
DROP INDEX `SubCategory_categoryId_idx` ON `SubCategory`;

-- DropIndex
DROP INDEX `TagInWorks_tagId_fkey` ON `TagInWorks`;

-- DropIndex
DROP INDEX `Transaction_budgetId_fkey` ON `Transaction`;

-- AlterTable
ALTER TABLE `CheckInRequest` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `IconCategories` MODIFY `categoryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `IconContributors` MODIFY `contributorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `IconTags` MODIFY `tagId` INTEGER NULL;

-- AlterTable
ALTER TABLE `NoVote` MODIFY `partyListId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Policy` DROP COLUMN `descriptionId`;

-- AlterTable
ALTER TABLE `PolicyDescription` ADD COLUMN `policyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ProgressPolicy` MODIFY `statusId` INTEGER NULL;

-- AlterTable
ALTER TABLE `RoleForPartyList` MODIFY `partyListId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Setting` MODIFY `byUserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `SkipDay` MODIFY `byUserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `SubCategory` DROP COLUMN `categoryId`;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `byUserId` INTEGER NULL,
    MODIFY `budgetId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `accessId` INTEGER NULL;

-- AlterTable
ALTER TABLE `VoteAbstain` MODIFY `partyListId` INTEGER NULL;

-- AlterTable
ALTER TABLE `VoteAgree` MODIFY `partyListId` INTEGER NULL;

-- AlterTable
ALTER TABLE `VoteDisagree` MODIFY `partyListId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Work` MODIFY `postById` INTEGER NULL;

-- AlterTable
ALTER TABLE `WorkOperators` MODIFY `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `SubCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `subcategoryId` INTEGER NOT NULL,

    INDEX `SubCategories_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Policy_categoryId_idx` ON `Policy`(`categoryId`);

-- CreateIndex
CREATE INDEX `PolicyDescription_policyId_idx` ON `PolicyDescription`(`policyId`);

-- CreateIndex
CREATE UNIQUE INDEX `PolicyDescription_policyId_key` ON `PolicyDescription`(`policyId`);

-- AddForeignKey
ALTER TABLE `Budget` ADD CONSTRAINT `Budget_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_byUserId_fkey` FOREIGN KEY (`byUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_budgetId_fkey` FOREIGN KEY (`budgetId`) REFERENCES `Budget`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Setting` ADD CONSTRAINT `Setting_byUserId_fkey` FOREIGN KEY (`byUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkipDay` ADD CONSTRAINT `SkipDay_byUserId_fkey` FOREIGN KEY (`byUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_postById_fkey` FOREIGN KEY (`postById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentInWork` ADD CONSTRAINT `CommentInWork_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkOperators` ADD CONSTRAINT `WorkOperators_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IconContributors` ADD CONSTRAINT `IconContributors_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IconContributors` ADD CONSTRAINT `IconContributors_contributorId_fkey` FOREIGN KEY (`contributorId`) REFERENCES `Contributor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IconTags` ADD CONSTRAINT `IconTags_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IconTags` ADD CONSTRAINT `IconTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IconCategories` ADD CONSTRAINT `IconCategories_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IconCategories` ADD CONSTRAINT `IconCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `IconCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagInWorks` ADD CONSTRAINT `TagInWorks_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `WorkTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckIn` ADD CONSTRAINT `CheckIn_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckIn` ADD CONSTRAINT `CheckIn_checkInDayId_fkey` FOREIGN KEY (`checkInDayId`) REFERENCES `CheckInDay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckInRequest` ADD CONSTRAINT `CheckInRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckInRequest` ADD CONSTRAINT `CheckInRequest_checkInDayId_fkey` FOREIGN KEY (`checkInDayId`) REFERENCES `CheckInDay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteAgree` ADD CONSTRAINT `VoteAgree_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteDisagree` ADD CONSTRAINT `VoteDisagree_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteAbstain` ADD CONSTRAINT `VoteAbstain_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoVote` ADD CONSTRAINT `NoVote_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartyList` ADD CONSTRAINT `PartyList_bioId_fkey` FOREIGN KEY (`bioId`) REFERENCES `Bio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageToPartyList` ADD CONSTRAINT `MessageToPartyList_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleForPartyList` ADD CONSTRAINT `RoleForPartyList_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleForPartyList` ADD CONSTRAINT `RoleForPartyList_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExperienceOwnPartyList` ADD CONSTRAINT `ExperienceOwnPartyList_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `Experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExperienceOwnPartyList` ADD CONSTRAINT `ExperienceOwnPartyList_bioId_fkey` FOREIGN KEY (`bioId`) REFERENCES `Bio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillOwnPartyList` ADD CONSTRAINT `SkillOwnPartyList_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillOwnPartyList` ADD CONSTRAINT `SkillOwnPartyList_bioId_fkey` FOREIGN KEY (`bioId`) REFERENCES `Bio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `Platform`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `SubCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Policy` ADD CONSTRAINT `Policy_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PolicyDescription` ADD CONSTRAINT `PolicyDescription_policyId_fkey` FOREIGN KEY (`policyId`) REFERENCES `Policy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentPolicy` ADD CONSTRAINT `CommentPolicy_policyId_fkey` FOREIGN KEY (`policyId`) REFERENCES `Policy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PolicySubCategory` ADD CONSTRAINT `PolicySubCategory_policyId_fkey` FOREIGN KEY (`policyId`) REFERENCES `Policy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PolicySubCategory` ADD CONSTRAINT `PolicySubCategory_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProgressPolicy` ADD CONSTRAINT `ProgressPolicy_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProgressPolicy` ADD CONSTRAINT `ProgressPolicy_policyId_fkey` FOREIGN KEY (`policyId`) REFERENCES `Policy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
