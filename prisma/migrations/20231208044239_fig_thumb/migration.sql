/*
  Warnings:

  - You are about to alter the column `figure` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Json` to `VarChar(255)`.
  - You are about to alter the column `thumbnail` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Json` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "figure" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "thumbnail" SET DATA TYPE VARCHAR(255);
