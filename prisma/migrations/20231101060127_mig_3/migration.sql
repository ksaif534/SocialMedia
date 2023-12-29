-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "is_allow" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);
