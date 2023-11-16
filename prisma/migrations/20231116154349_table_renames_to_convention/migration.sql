/*
  Warnings:

  - You are about to drop the `Participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Scores" DROP CONSTRAINT "Scores_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Scores" DROP CONSTRAINT "Scores_wod_id_fkey";

-- DropTable
DROP TABLE "Participants";

-- DropTable
DROP TABLE "Scores";

-- DropTable
DROP TABLE "Teams";

-- DropTable
DROP TABLE "Wods";

-- CreateTable
CREATE TABLE "Wod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '23.-',
    "elements" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Wod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '-',

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "wod_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_wod_id_fkey" FOREIGN KEY ("wod_id") REFERENCES "Wod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
