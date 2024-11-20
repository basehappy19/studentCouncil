/*
  Warnings:

  - Made the column `fullName` on table `PartyList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `CheckIn` MODIFY `type` ENUM('NORMAL', 'SICK_LEAVE', 'PERSONAL_LEAVE', 'NOT_CHECKED_IN', 'ABSENT', 'FORGOT_TO_CHECK_IN', 'HOLIDAY', 'CLOSED_FOR_CHECK_IN') NOT NULL;

-- AlterTable
ALTER TABLE `PartyList` MODIFY `fullName` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkInOpen` BOOLEAN NOT NULL DEFAULT true,
    `byUserId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkipDay` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `type` ENUM('NORMAL', 'HOLIDAY', 'CLOSED_FOR_CHECK_IN') NOT NULL,
    `byUserId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Setting` ADD CONSTRAINT `Setting_byUserId_fkey` FOREIGN KEY (`byUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkipDay` ADD CONSTRAINT `SkipDay_byUserId_fkey` FOREIGN KEY (`byUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
