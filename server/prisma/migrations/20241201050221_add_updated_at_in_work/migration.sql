/*
  Warnings:

  - Added the required column `updatedAt` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Work` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
