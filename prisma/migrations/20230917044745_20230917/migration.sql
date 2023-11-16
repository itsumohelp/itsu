-- CreateTable
CREATE TABLE `Entry` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail` (
    `id` VARCHAR(191) NOT NULL,
    `entryid` VARCHAR(191) NULL,
    `section` INTEGER NULL,
    `sequence` INTEGER NULL,
    `value` VARCHAR(191) NULL,
    `type` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Choise` (
    `id` VARCHAR(191) NOT NULL,
    `entryid` VARCHAR(191) NULL,
    `section` INTEGER NULL,
    `sequence` INTEGER NULL,
    `answer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
