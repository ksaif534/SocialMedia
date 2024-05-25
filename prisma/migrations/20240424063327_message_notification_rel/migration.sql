/*
  Warnings:

  - A unique constraint covering the columns `[notifiable_id]` on the table `notifications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "notifications_notifiable_id_key" ON "notifications"("notifiable_id");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_notifiable_id_fkey" FOREIGN KEY ("notifiable_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
