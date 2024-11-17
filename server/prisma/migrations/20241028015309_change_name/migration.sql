/*
  Warnings:

  - You are about to drop the `ExperienceOwnPartylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ExperienceOwnPartylist` DROP FOREIGN KEY `ExperienceOwnPartylist_bioId_fkey`;

-- DropForeignKey
ALTER TABLE `ExperienceOwnPartylist` DROP FOREIGN KEY `ExperienceOwnPartylist_experienceId_fkey`;

-- DropTable
DROP TABLE `ExperienceOwnPartylist`;

-- CreateTable
CREATE TABLE `ExperienceOwnPartyList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `experienceId` INTEGER NOT NULL,
    `bioId` INTEGER NOT NULL,

    UNIQUE INDEX `ExperienceOwnPartyList_experienceId_bioId_key`(`experienceId`, `bioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExperienceOwnPartyList` ADD CONSTRAINT `ExperienceOwnPartyList_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `Experience`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExperienceOwnPartyList` ADD CONSTRAINT `ExperienceOwnPartyList_bioId_fkey` FOREIGN KEY (`bioId`) REFERENCES `Bio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
