-- CreateTable
CREATE TABLE `Announcement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `timestamp` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `order` INTEGER NOT NULL,
    `newAnnouncement` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HighlightedAnnouncement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `announcementId` INTEGER NOT NULL,
    `priority` ENUM('NORMAL', 'IMPORTANT', 'URGENT', 'VERY_URGENT') NOT NULL DEFAULT 'NORMAL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `HighlightedAnnouncement_announcementId_idx`(`announcementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduleInAnnouncement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheduleId` INTEGER NOT NULL,
    `announcementId` INTEGER NOT NULL,

    INDEX `ScheduleInAnnouncement_scheduleId_announcementId_idx`(`scheduleId`, `announcementId`),
    UNIQUE INDEX `ScheduleInAnnouncement_scheduleId_announcementId_key`(`scheduleId`, `announcementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnnouncementSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NULL,
    `activity` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinkInAnnouncement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `announcementId` INTEGER NOT NULL,
    `linkId` INTEGER NOT NULL,

    INDEX `LinkInAnnouncement_announcementId_linkId_idx`(`announcementId`, `linkId`),
    UNIQUE INDEX `LinkInAnnouncement_announcementId_linkId_key`(`announcementId`, `linkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnnouncementLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `url` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnnouncementIframe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `url` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IframeInAnnouncement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `announcementId` INTEGER NOT NULL,
    `iframeId` INTEGER NOT NULL,

    INDEX `IframeInAnnouncement_announcementId_iframeId_idx`(`announcementId`, `iframeId`),
    UNIQUE INDEX `IframeInAnnouncement_announcementId_iframeId_key`(`announcementId`, `iframeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnnouncementImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageInAnnouncement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `announcementId` INTEGER NOT NULL,
    `imageId` INTEGER NOT NULL,

    INDEX `ImageInAnnouncement_announcementId_imageId_idx`(`announcementId`, `imageId`),
    UNIQUE INDEX `ImageInAnnouncement_announcementId_imageId_key`(`announcementId`, `imageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `CheckInRequest_userId_checkInDayId_idx` ON `CheckInRequest`(`userId`, `checkInDayId`);

-- CreateIndex
CREATE INDEX `IconContributors_iconId_contributorId_idx` ON `IconContributors`(`iconId`, `contributorId`);

-- CreateIndex
CREATE INDEX `SubCategories_categoryId_subCategoryId_idx` ON `SubCategories`(`categoryId`, `subCategoryId`);

-- CreateIndex
CREATE INDEX `TagInWorks_workId_tagId_idx` ON `TagInWorks`(`workId`, `tagId`);

-- AddForeignKey
ALTER TABLE `HighlightedAnnouncement` ADD CONSTRAINT `HighlightedAnnouncement_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleInAnnouncement` ADD CONSTRAINT `ScheduleInAnnouncement_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `AnnouncementSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleInAnnouncement` ADD CONSTRAINT `ScheduleInAnnouncement_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LinkInAnnouncement` ADD CONSTRAINT `LinkInAnnouncement_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LinkInAnnouncement` ADD CONSTRAINT `LinkInAnnouncement_linkId_fkey` FOREIGN KEY (`linkId`) REFERENCES `AnnouncementLink`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IframeInAnnouncement` ADD CONSTRAINT `IframeInAnnouncement_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IframeInAnnouncement` ADD CONSTRAINT `IframeInAnnouncement_iframeId_fkey` FOREIGN KEY (`iframeId`) REFERENCES `AnnouncementIframe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageInAnnouncement` ADD CONSTRAINT `ImageInAnnouncement_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageInAnnouncement` ADD CONSTRAINT `ImageInAnnouncement_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `AnnouncementImage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
