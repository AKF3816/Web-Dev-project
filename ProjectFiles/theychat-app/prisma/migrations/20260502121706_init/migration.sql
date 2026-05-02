-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "profilePic" TEXT
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "timeStamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postAuthorID" TEXT NOT NULL,
    CONSTRAINT "Post_postAuthorID_fkey" FOREIGN KEY ("postAuthorID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentID" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "timeStamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserID" TEXT NOT NULL,
    "postID" TEXT NOT NULL,
    CONSTRAINT "Comment_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "UserID" TEXT NOT NULL,
    "postID" TEXT NOT NULL,
    CONSTRAINT "Like_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Follow" (
    "processID" TEXT NOT NULL PRIMARY KEY,
    "FollowerID" TEXT NOT NULL,
    "Followed_byID" TEXT NOT NULL,
    CONSTRAINT "Follow_FollowerID_fkey" FOREIGN KEY ("FollowerID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follow_Followed_byID_fkey" FOREIGN KEY ("Followed_byID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Like_UserID_key" ON "Like"("UserID");

-- CreateIndex
CREATE UNIQUE INDEX "Like_postID_key" ON "Like"("postID");
