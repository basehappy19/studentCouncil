-- AlterTable
ALTER TABLE `PartyList` ADD COLUMN `support` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `MessageToPartyList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partyListId` INTEGER NOT NULL,
    `message` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MessageToPartyList` ADD CONSTRAINT `MessageToPartyList_partyListId_fkey` FOREIGN KEY (`partyListId`) REFERENCES `PartyList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
