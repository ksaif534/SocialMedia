-- CreateTable
CREATE TABLE "networks" (
    "id" SERIAL NOT NULL,
    "user_id_from" INTEGER NOT NULL,
    "user_id_to" INTEGER NOT NULL,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);
