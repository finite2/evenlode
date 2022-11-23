-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VISITOR', 'MEMBER', 'CAPTAIN', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "commiteeTitle" VARCHAR(80),
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'VISITOR';
