/*
  Warnings:

  - Added the required column `isUsed` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "isUsed" BOOLEAN NOT NULL;
