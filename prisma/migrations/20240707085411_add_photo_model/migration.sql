-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "fileId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);
