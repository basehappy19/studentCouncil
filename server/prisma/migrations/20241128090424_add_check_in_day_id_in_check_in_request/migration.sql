/*
  Warnings:

  - Added the required column `checkInDayId` to the `CheckInRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CheckInRequest` ADD COLUMN `checkInDayId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CheckInRequest` ADD CONSTRAINT `CheckInRequest_checkInDayId_fkey` FOREIGN KEY (`checkInDayId`) REFERENCES `CheckInDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
