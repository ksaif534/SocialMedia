-- CreateTable
CREATE TABLE "_networksTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_networksTousers_AB_unique" ON "_networksTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_networksTousers_B_index" ON "_networksTousers"("B");

-- AddForeignKey
ALTER TABLE "_networksTousers" ADD CONSTRAINT "_networksTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "networks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_networksTousers" ADD CONSTRAINT "_networksTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
