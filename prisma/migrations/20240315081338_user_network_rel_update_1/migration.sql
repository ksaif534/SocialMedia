-- DropForeignKey
ALTER TABLE "networks" DROP CONSTRAINT "networks_user_id_from_fkey";

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_user_id_to_fkey" FOREIGN KEY ("user_id_to") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
