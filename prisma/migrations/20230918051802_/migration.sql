-- CreateTable
CREATE TABLE `Answer` (
    `id` VARCHAR(191) NOT NULL,
    `userid` VARCHAR(191) NULL,
    `entryid` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnswerDetail` (
    `id` VARCHAR(191) NOT NULL,
    `answerid` VARCHAR(191) NULL,
    `section` INTEGER NULL,
    `sequence` INTEGER NULL,
    `answer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
