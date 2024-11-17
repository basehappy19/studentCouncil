/*
  Warnings:

  - You are about to drop the `WorkOperator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `WorkOperator` DROP FOREIGN KEY `WorkOperator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkOperator` DROP FOREIGN KEY `WorkOperator_workId_fkey`;

-- DropTable
DROP TABLE `WorkOperator`;

-- CreateTable
CREATE TABLE `WorkOperators` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `workId` INTEGER NOT NULL,

    UNIQUE INDEX `WorkOperators_userId_workId_key`(`userId`, `workId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkOperators` ADD CONSTRAINT `WorkOperators_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkOperators` ADD CONSTRAINT `WorkOperators_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
