/*
  Warnings:

  - You are about to alter the column `image` on the `users` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image" SET DATA TYPE VARCHAR(255);
