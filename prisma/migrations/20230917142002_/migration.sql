/*
  Warnings:

  - You are about to drop the column `return` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Entry` DROP COLUMN `return`,
    ADD COLUMN `benefit` VARCHAR(191) NULL;
