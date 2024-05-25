-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_notifiable_id_fkey";

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_notifiable_id_fkey" FOREIGN KEY ("notifiable_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
