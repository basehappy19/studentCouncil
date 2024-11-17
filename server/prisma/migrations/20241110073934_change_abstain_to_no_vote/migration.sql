/*
  Warnings:

  - You are about to drop the `VoteAbstention` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `VoteAbstention` DROP FOREIGN KEY `VoteAbstention_partyListId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteAbstention` DROP FOREIGN KEY `VoteAbstention_resultId_fkey`;

-- DropTable
DROP TABLE `VoteAbstention`;

-- CreateTable
CREATE TABLE `NoVote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partyListId` INTEGER NOT NULL,
    `resultId` INTEGER NOT NULL,

    UNIQUE INDEX `NoVote_partyListId_resultId_key`(`partyListId`, `resultId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NoVote` ADD CONSTRAINT `NoVote_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `VoteResult`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoVote` ADD CONSTRAINT `NoVote_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
