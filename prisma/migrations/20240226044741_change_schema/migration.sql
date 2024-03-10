/*
  Warnings:

  - Changed the type of `occupation` on the `profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `country` on the `profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `city` on the `profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "occupation",
ADD COLUMN     "occupation" INTEGER NOT NULL,
DROP COLUMN "country",
ADD COLUMN     "country" INTEGER NOT NULL,
DROP COLUMN "city",
ADD COLUMN     "city" INTEGER NOT NULL;
