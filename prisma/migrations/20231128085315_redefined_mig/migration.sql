/*
  Warnings:

  - Changed the type of `figure` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `thumbnail` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "figure",
ADD COLUMN     "figure" JSON NOT NULL,
DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnail" JSON NOT NULL;
