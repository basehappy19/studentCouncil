/*
  Warnings:

  - You are about to drop the column `date` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Experience` DROP COLUMN `date`,
    DROP COLUMN `description`;
