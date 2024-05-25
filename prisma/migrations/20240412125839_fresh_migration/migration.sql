-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "is_active" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "sub_title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "type" INTEGER NOT NULL,
    "tags" VARCHAR(255) NOT NULL,
    "is_share" INTEGER NOT NULL,
    "figure" VARCHAR(255) NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,
    "video_post_url" VARCHAR(255) NOT NULL,
    "is_group" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "is_allow" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "marital_status" INTEGER NOT NULL,
    "gender" INTEGER NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "education_level" INTEGER NOT NULL,
    "occupation" INTEGER NOT NULL,
    "country" INTEGER NOT NULL,
    "city" INTEGER NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "profile_photo" VARCHAR(255) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "networks" (
    "id" SERIAL NOT NULL,
    "user_id_from" INTEGER NOT NULL,
    "user_id_to" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL,
    "group_photo" VARCHAR(255) NOT NULL DEFAULT '',
    "group_mods" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groupModerators" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "groupModerators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groupMembers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "groupMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_groupModeratorsTogroups" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_groupMembersTogroups" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_groupModeratorsTogroups_AB_unique" ON "_groupModeratorsTogroups"("A", "B");

-- CreateIndex
CREATE INDEX "_groupModeratorsTogroups_B_index" ON "_groupModeratorsTogroups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_groupMembersTogroups_AB_unique" ON "_groupMembersTogroups"("A", "B");

-- CreateIndex
CREATE INDEX "_groupMembersTogroups_B_index" ON "_groupMembersTogroups"("B");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_user_id_to_fkey" FOREIGN KEY ("user_id_to") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupModerators" ADD CONSTRAINT "groupModerators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupMembers" ADD CONSTRAINT "groupMembers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupModeratorsTogroups" ADD CONSTRAINT "_groupModeratorsTogroups_A_fkey" FOREIGN KEY ("A") REFERENCES "groupModerators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupModeratorsTogroups" ADD CONSTRAINT "_groupModeratorsTogroups_B_fkey" FOREIGN KEY ("B") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupMembersTogroups" ADD CONSTRAINT "_groupMembersTogroups_A_fkey" FOREIGN KEY ("A") REFERENCES "groupMembers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupMembersTogroups" ADD CONSTRAINT "_groupMembersTogroups_B_fkey" FOREIGN KEY ("B") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
