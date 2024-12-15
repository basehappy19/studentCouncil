-- CreateTable
CREATE TABLE `CommentPolicy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `policyId` INTEGER NOT NULL,
    `message` TEXT NOT NULL,

    INDEX `CommentPolicy_policyId_idx`(`policyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommentPolicy` ADD CONSTRAINT `CommentPolicy_policyId_fkey` FOREIGN KEY (`policyId`) REFERENCES `Policy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
