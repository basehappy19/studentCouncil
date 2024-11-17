/*
  Warnings:

  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[leaderId]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Department` ADD COLUMN `leaderId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `date`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Vote` DROP COLUMN `date`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Department_leaderId_key` ON `Department`(`leaderId`);

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_leaderId_fkey` FOREIGN KEY (`leaderId`) REFERENCES `PartyList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
