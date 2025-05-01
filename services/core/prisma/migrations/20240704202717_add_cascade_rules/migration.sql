-- DropForeignKey
ALTER TABLE "events_members" DROP CONSTRAINT "events_members_eventId_fkey";

-- DropForeignKey
ALTER TABLE "events_members" DROP CONSTRAINT "events_members_userId_fkey";

-- AddForeignKey
ALTER TABLE "events_members" ADD CONSTRAINT "events_members_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_members" ADD CONSTRAINT "events_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
