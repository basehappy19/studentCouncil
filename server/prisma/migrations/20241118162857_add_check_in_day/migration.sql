/*
  Warnings:

  - Added the required column `checkInDayId` to the `CheckIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CheckIn` ADD COLUMN `checkInDayId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CheckInDay` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CheckIn` ADD CONSTRAINT `CheckIn_checkInDayId_fkey` FOREIGN KEY (`checkInDayId`) REFERENCES `CheckInDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
