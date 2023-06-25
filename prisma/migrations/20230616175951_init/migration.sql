-- CreateTable
CREATE TABLE `User` (
    `clientId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `webHookUrl` VARCHAR(191) NOT NULL,
    `permissions` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`clientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accounts` (
    `id` VARCHAR(191) NOT NULL,
    `sendId` VARCHAR(191) NOT NULL,
    `balance` INTEGER NOT NULL,
    `creditLimit` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `currencyCode` INTEGER NOT NULL,
    `cashbackType` VARCHAR(191) NOT NULL,
    `maskedPan` VARCHAR(191) NOT NULL,
    `iban` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Accounts_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jars` (
    `id` VARCHAR(191) NOT NULL,
    `sendId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `currencyCode` INTEGER NOT NULL,
    `balance` INTEGER NOT NULL,
    `goal` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Jars_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `mcc` INTEGER NOT NULL,
    `originalMcc` INTEGER NOT NULL,
    `hold` BOOLEAN NOT NULL,
    `amount` INTEGER NOT NULL,
    `operationAmount` INTEGER NOT NULL,
    `currencyCode` INTEGER NOT NULL,
    `commissionRate` INTEGER NOT NULL,
    `cashbackAmount` INTEGER NOT NULL,
    `balance` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `receiptId` VARCHAR(191) NOT NULL,
    `invoiceId` VARCHAR(191) NOT NULL,
    `counterEdrpou` VARCHAR(191) NOT NULL,
    `counterIban` VARCHAR(191) NOT NULL,
    `counterName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accounts` ADD CONSTRAINT `Accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`clientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jars` ADD CONSTRAINT `Jars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`clientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`clientId`) ON DELETE RESTRICT ON UPDATE CASCADE;
