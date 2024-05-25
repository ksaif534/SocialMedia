-- CreateTable
CREATE TABLE "chat_settings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_active" INTEGER NOT NULL,
    "is_shown" INTEGER NOT NULL,

    CONSTRAINT "chat_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chat_settings_user_id_key" ON "chat_settings"("user_id");

-- AddForeignKey
ALTER TABLE "chat_settings" ADD CONSTRAINT "chat_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
