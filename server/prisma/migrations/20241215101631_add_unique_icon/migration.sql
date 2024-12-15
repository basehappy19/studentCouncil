/*
  Warnings:

  - You are about to drop the column `name` on the `IconCategories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `IconContributors` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `IconTags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Contributor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Icon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `IconCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `IconCategories` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `IconContributors` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `IconTags` DROP COLUMN `name`;

-- CreateIndex
CREATE UNIQUE INDEX `Contributor_name_key` ON `Contributor`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Icon_name_key` ON `Icon`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `IconCategory_name_key` ON `IconCategory`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_key` ON `Tag`(`name`);
