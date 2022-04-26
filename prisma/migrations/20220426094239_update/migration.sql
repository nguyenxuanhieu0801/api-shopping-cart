/*
  Warnings:

  - You are about to drop the column `caption` on the `productimage` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productimage` DROP COLUMN `caption`,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL;
