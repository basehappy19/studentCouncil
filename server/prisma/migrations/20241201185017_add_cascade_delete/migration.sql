-- DropForeignKey
ALTER TABLE `TagInWorks` DROP FOREIGN KEY `TagInWorks_workId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkImages` DROP FOREIGN KEY `WorkImages_workId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkOperators` DROP FOREIGN KEY `WorkOperators_workId_fkey`;

-- AddForeignKey
ALTER TABLE `WorkImages` ADD CONSTRAINT `WorkImages_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkOperators` ADD CONSTRAINT `WorkOperators_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagInWorks` ADD CONSTRAINT `TagInWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
