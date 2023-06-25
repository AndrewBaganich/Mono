/*
  Warnings:

  - You are about to alter the column `maskedPan` on the `Accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Accounts` MODIFY `maskedPan` JSON NOT NULL;

-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `currencyCodeA` INTEGER NOT NULL,
    `currencyCodeB` INTEGER NOT NULL,
    `date` INTEGER NOT NULL,
    `rateBuy` DOUBLE NOT NULL,
    `rateCross` DOUBLE NOT NULL,
    `rateSell` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
