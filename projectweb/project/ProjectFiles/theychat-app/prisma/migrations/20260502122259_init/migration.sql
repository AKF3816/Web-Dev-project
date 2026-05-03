/*
  Warnings:

  - A unique constraint covering the columns `[FollowerID,Followed_byID]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserID,postID]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_postID_key";

-- DropIndex
DROP INDEX "Like_UserID_key";

-- CreateIndex
CREATE UNIQUE INDEX "Follow_FollowerID_Followed_byID_key" ON "Follow"("FollowerID", "Followed_byID");

-- CreateIndex
CREATE UNIQUE INDEX "Like_UserID_postID_key" ON "Like"("UserID", "postID");
