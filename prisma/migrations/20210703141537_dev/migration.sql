-- CreateTable
CREATE TABLE "Warnings" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "guildID" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT E'!',
    "guildID" TEXT NOT NULL,
    "instagramChannel" TEXT,
    "darknetChannel" TEXT,
    "facebookChannel" TEXT,
    "twitterChannel" TEXT,
    "cargrChannel" TEXT,
    "logsChannel" TEXT,
    "serverIP" TEXT,
    "welcomeLeaveChannel" TEXT,
    "muteRoleID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild.guildID_unique" ON "Guild"("guildID");

-- AddForeignKey
ALTER TABLE "Warnings" ADD FOREIGN KEY ("guildID") REFERENCES "Guild"("guildID") ON DELETE CASCADE ON UPDATE CASCADE;
