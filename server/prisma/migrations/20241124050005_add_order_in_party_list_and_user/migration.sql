/*
  Warnings:

  - Added the required column `order` to the `PartyList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PartyList` ADD COLUMN `order` INTEGER NOT NULL,
    ADD COLUMN `orderInHomepage` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `order` INTEGER NOT NULL;
