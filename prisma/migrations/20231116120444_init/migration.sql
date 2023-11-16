-- CreateTable
CREATE TABLE "Wods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '23.-',
    "elements" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Wods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '-',

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participants" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" TEXT NOT NULL,
    "wod_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_wod_id_fkey" FOREIGN KEY ("wod_id") REFERENCES "Wods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
