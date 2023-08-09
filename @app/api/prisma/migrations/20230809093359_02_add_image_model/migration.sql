-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "avatar_id" INTEGER,
    "bio" TEXT,
    "date_of_birth" DATETIME,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Profile_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("bio", "date_of_birth", "id", "name", "user_id") SELECT "bio", "date_of_birth", "id", "name", "user_id" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Image_link_key" ON "Image"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Image_key_key" ON "Image"("key");
