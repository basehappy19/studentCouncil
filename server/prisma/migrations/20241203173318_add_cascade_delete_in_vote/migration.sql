-- DropForeignKey
ALTER TABLE `NoVote` DROP FOREIGN KEY `NoVote_resultId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteAbstain` DROP FOREIGN KEY `VoteAbstain_resultId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteAgree` DROP FOREIGN KEY `VoteAgree_resultId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteDisagree` DROP FOREIGN KEY `VoteDisagree_resultId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteDocument` DROP FOREIGN KEY `VoteDocument_documentId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteDocument` DROP FOREIGN KEY `VoteDocument_voteId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteRefer` DROP FOREIGN KEY `VoteRefer_referId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteRefer` DROP FOREIGN KEY `VoteRefer_voteId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteResult` DROP FOREIGN KEY `VoteResult_maxAttendeesId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteResult` DROP FOREIGN KEY `VoteResult_voteId_fkey`;

-- AddForeignKey
ALTER TABLE `VoteRefer` ADD CONSTRAINT `VoteRefer_voteId_fkey` FOREIGN KEY (`voteId`) REFERENCES `Vote`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteRefer` ADD CONSTRAINT `VoteRefer_referId_fkey` FOREIGN KEY (`referId`) REFERENCES `Refer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteDocument` ADD CONSTRAINT `VoteDocument_voteId_fkey` FOREIGN KEY (`voteId`) REFERENCES `Vote`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteDocument` ADD CONSTRAINT `VoteDocument_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteResult` ADD CONSTRAINT `VoteResult_maxAttendeesId_fkey` FOREIGN KEY (`maxAttendeesId`) REFERENCES `VoteMaxAttendees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteResult` ADD CONSTRAINT `VoteResult_voteId_fkey` FOREIGN KEY (`voteId`) REFERENCES `Vote`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteAgree` ADD CONSTRAINT `VoteAgree_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `VoteResult`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteDisagree` ADD CONSTRAINT `VoteDisagree_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `VoteResult`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteAbstain` ADD CONSTRAINT `VoteAbstain_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `VoteResult`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoVote` ADD CONSTRAINT `NoVote_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `VoteResult`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
