/*
  Warnings:

  - You are about to drop the column `subcategoryId` on the `SubCategories` table. All the data in the column will be lost.
  - Added the required column `subCategoryId` to the `SubCategories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SubCategories` DROP FOREIGN KEY `SubCategories_subcategoryId_fkey`;

-- DropIndex
DROP INDEX `SubCategories_subcategoryId_fkey` ON `SubCategories`;

-- AlterTable
ALTER TABLE `SubCategories` DROP COLUMN `subcategoryId`,
    ADD COLUMN `subCategoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
