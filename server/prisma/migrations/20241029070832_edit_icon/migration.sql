/*
  Warnings:

  - You are about to drop the column `Icon` on the `Skill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `Icon`,
    ADD COLUMN `icon` VARCHAR(191) NULL;
