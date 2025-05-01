-- AlterTable
ALTER TABLE "events" ADD COLUMN     "discountEndDate" TIMESTAMP(3),
ADD COLUMN     "discountedPrice" INTEGER,
ADD COLUMN     "price" INTEGER;
