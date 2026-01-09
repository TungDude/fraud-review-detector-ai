/*
  Warnings:

  - You are about to alter the column `rating` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;
