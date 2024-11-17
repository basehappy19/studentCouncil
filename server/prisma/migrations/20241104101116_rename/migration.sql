/*
  Warnings:

  - You are about to drop the `TagInWork` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TagInWork` DROP FOREIGN KEY `TagInWork_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `TagInWork` DROP FOREIGN KEY `TagInWork_workId_fkey`;

-- DropTable
DROP TABLE `TagInWork`;

-- CreateTable
CREATE TABLE `TagInWorks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    UNIQUE INDEX `TagInWorks_workId_tagId_key`(`workId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TagInWorks` ADD CONSTRAINT `TagInWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagInWorks` ADD CONSTRAINT `TagInWorks_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `WorkTag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
