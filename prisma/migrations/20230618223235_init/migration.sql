/*
  Warnings:

  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Accounts_id_key` ON `Accounts`;

-- DropIndex
DROP INDEX `Jars_id_key` ON `Jars`;

-- AlterTable
ALTER TABLE `Accounts` ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Jars` ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Transactions` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `transactionId` VARCHAR(191) NOT NULL,
    MODIFY `amount` INTEGER NULL,
    MODIFY `operationAmount` INTEGER NULL,
    MODIFY `currencyCode` INTEGER NULL,
    MODIFY `commissionRate` INTEGER NULL,
    MODIFY `cashbackAmount` INTEGER NULL,
    MODIFY `balance` INTEGER NULL,
    MODIFY `comment` VARCHAR(191) NULL,
    MODIFY `receiptId` VARCHAR(191) NULL,
    MODIFY `invoiceId` VARCHAR(191) NULL,
    MODIFY `counterEdrpou` VARCHAR(191) NULL,
    MODIFY `counterIban` VARCHAR(191) NULL,
    MODIFY `counterName` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`transactionId`);
