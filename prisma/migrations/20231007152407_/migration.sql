/*
  Warnings:

  - You are about to drop the column `userId` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Entry` DROP COLUMN `userId`,
    ADD COLUMN `insertat` DATETIME(3) NULL,
    ADD COLUMN `userid` VARCHAR(191) NULL;
