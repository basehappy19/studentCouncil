-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_accessId_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_accessId_fkey` FOREIGN KEY (`accessId`) REFERENCES `Access`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
