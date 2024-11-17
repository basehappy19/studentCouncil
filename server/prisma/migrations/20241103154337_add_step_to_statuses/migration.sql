/*
  Warnings:

  - A unique constraint covering the columns `[step]` on the table `Status` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Status` ADD COLUMN `step` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Status_step_key` ON `Status`(`step`);
