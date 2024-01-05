/*
  Warnings:

  - The primary key for the `DatabaseTune` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DatabaseTune" DROP CONSTRAINT "DatabaseTune_pkey",
ADD CONSTRAINT "DatabaseTune_pkey" PRIMARY KEY ("databaseId", "databaseTuneId");
