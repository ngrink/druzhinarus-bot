/*
  Warnings:

  - You are about to drop the `Verse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jokes` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "quotes" ALTER COLUMN "author" DROP NOT NULL;

-- DropTable
DROP TABLE "Verse";

-- DropTable
DROP TABLE "jokes";

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "file_id" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verses" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT,

    CONSTRAINT "verses_pkey" PRIMARY KEY ("id")
);
