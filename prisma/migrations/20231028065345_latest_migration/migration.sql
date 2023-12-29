/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username",
ADD COLUMN     "image" VARCHAR(255) NOT NULL,
ADD COLUMN     "is_active" INTEGER NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "sub_title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "type" INTEGER NOT NULL,
    "tags" VARCHAR(255) NOT NULL,
    "is_share" INTEGER NOT NULL,
    "figure" VARCHAR(255) NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,
    "video_post_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
