/*
  Warnings:

  - You are about to drop the column `createdByUserId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_createdByUserId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "createdByUserId",
ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
