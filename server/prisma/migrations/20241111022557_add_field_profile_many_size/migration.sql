/*
  Warnings:

  - You are about to drop the column `profileImg` on the `PartyList` table. All the data in the column will be lost.
  - You are about to drop the column `profileImg` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `NoVote` ADD COLUMN `reason` VARCHAR(191) NULL DEFAULT 'ไม่อยู่ลงคะแนน';

-- AlterTable
ALTER TABLE `PartyList` DROP COLUMN `profileImg`,
    ADD COLUMN `profile_image_128x128` VARCHAR(191) NOT NULL DEFAULT 'default-image-partyList_128x128.png',
    ADD COLUMN `profile_image_full` VARCHAR(191) NOT NULL DEFAULT 'default-image-partyList.png';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profileImg`,
    ADD COLUMN `profile_image_128x128` VARCHAR(191) NOT NULL DEFAULT 'default-image-partyList_128x128.png',
    ADD COLUMN `profile_image_full` VARCHAR(191) NOT NULL DEFAULT 'default-image-user_full.png';
