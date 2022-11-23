/*
  Warnings:

  - You are about to drop the column `commiteeTitle` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "commiteeTitle",
ADD COLUMN     "committeeTitle" VARCHAR(80);
