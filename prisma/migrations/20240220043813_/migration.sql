/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Session` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "createdBy",
ADD COLUMN     "createdByUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
