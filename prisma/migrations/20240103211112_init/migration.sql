-- CreateTable
CREATE TABLE "Database" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TuneComment" (
    "id" SERIAL NOT NULL,
    "tuneId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "hasABC" INTEGER NOT NULL,

    CONSTRAINT "TuneComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TuneName" (
    "id" SERIAL NOT NULL,
    "tuneId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TuneName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TuneTag" (
    "tuneId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TuneTag_pkey" PRIMARY KEY ("tuneId","tagId")
);

-- CreateTable
CREATE TABLE "Tune" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Tune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatabaseTune" (
    "databaseId" INTEGER NOT NULL,
    "databaseTuneId" INTEGER NOT NULL,
    "tuneId" INTEGER NOT NULL,

    CONSTRAINT "DatabaseTune_pkey" PRIMARY KEY ("databaseId","tuneId")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "sessionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("sessionId","userId")
);

-- CreateTable
CREATE TABLE "UserTune" (
    "userId" INTEGER NOT NULL,
    "tuneId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFavorite" BOOLEAN NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "UserTune_pkey" PRIMARY KEY ("userId","tuneId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseTune_databaseId_databaseTuneId_key" ON "DatabaseTune"("databaseId", "databaseTuneId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "TuneComment" ADD CONSTRAINT "TuneComment_tuneId_fkey" FOREIGN KEY ("tuneId") REFERENCES "Tune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuneComment" ADD CONSTRAINT "TuneComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuneName" ADD CONSTRAINT "TuneName_tuneId_fkey" FOREIGN KEY ("tuneId") REFERENCES "Tune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuneTag" ADD CONSTRAINT "TuneTag_tuneId_fkey" FOREIGN KEY ("tuneId") REFERENCES "Tune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuneTag" ADD CONSTRAINT "TuneTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseTune" ADD CONSTRAINT "DatabaseTune_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "Database"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseTune" ADD CONSTRAINT "DatabaseTune_tuneId_fkey" FOREIGN KEY ("tuneId") REFERENCES "Tune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTune" ADD CONSTRAINT "UserTune_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTune" ADD CONSTRAINT "UserTune_tuneId_fkey" FOREIGN KEY ("tuneId") REFERENCES "Tune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
