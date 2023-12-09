import {sql} from "kysely";

import config from "@/config";

import {db} from "./database";
import {LeaderboardRecord, Team, Wod} from "./types";

export type dbQuery = {
  leaderboard: {
    getWodLeaderboard: (wod: number) => Promise<LeaderboardRecord[]>;
    getOverallLeaderboard: () => Promise<LeaderboardRecord[]>;
  };
  wod: {
    getWodInfo: (wod: number) => Promise<Partial<Wod> | undefined>;
    getAll: () => Promise<Partial<Wod>[]>;
  };
  teams: {
    getTeams: () => Promise<Team[]>;
  };
  score: {
    createScore: (score: number, teamId: string, wodId: string) => Promise<number>;
  };
};

export const Query: dbQuery = {
  leaderboard: {
    getWodLeaderboard: async (wod: number): Promise<LeaderboardRecord[]> => {
      return await db
        .selectFrom("Participant")
        .innerJoin("Team", "Team.id", "Participant.team_id")
        .innerJoin(
          (eb) =>
            eb
              .selectFrom("Score")
              .innerJoin("Wod", "Wod.id", "Score.wod_id")
              .select(["team_id", "Wod.name as wod_name", "score"])
              .as("ranked_score"),
          (join) => join.onRef("ranked_score.team_id", "=", "Team.id"),
        )
        .select([
          "Team.id",
          "Team.name",
          sql<string>`string_agg(DISTINCT full_name, ',')`.as("members"),
          sql<number>`MAX(ranked_score.score)`.as("points"),
        ])
        .where("ranked_score.wod_name", "like", `%${wod}`)
        .groupBy("Team.id")
        .orderBy("points", "desc")
        .execute();
    },
    getOverallLeaderboard: async (): Promise<LeaderboardRecord[]> => {
      return await db
        .selectFrom("Participant")
        .innerJoin("Team", "Team.id", "Participant.team_id")
        .innerJoin(
          (eb) =>
            eb
              .selectFrom("Score")
              .select([
                "team_id",
                sql<number>`ROW_NUMBER() OVER (PARTITION BY wod_id ORDER BY score DESC)`.as(
                  "position",
                ),
              ])
              .as("ranked_score"),
          (join) => join.onRef("ranked_score.team_id", "=", "Team.id"),
        )
        .select([
          "Team.id",
          "Team.name",
          sql<string>`string_agg(DISTINCT full_name, ',')`.as("members"),
          sql<number>`SUM(distinct ranked_score.position)`.as("points"),
          // sql<string>`full_name`.as("members"),
          // sql<number>`ranked_score.position`.as("points"),
        ])
        .groupBy("Team.id")
        .orderBy("points", "asc")
        .execute();
    },
  },
  wod: {
    getWodInfo: async (wod: number): Promise<Partial<Wod> | undefined> => {
      return await db
        .selectFrom("Wod")
        .select(["Wod.type", "Wod.elements"])
        .where("Wod.name", "like", `%.${wod}`)
        .executeTakeFirst();
    },
    getAll: async (): Promise<Partial<Wod>[]> => {
      const wods = await db.selectFrom("Wod").select(["Wod.id", "Wod.name"]).execute();

      return wods.filter((_, i) => {
        return config.wods.find((w) => w.id === i + 1)!.openDate < new Date();
      });
    },
  },
  teams: {
    getTeams: async (): Promise<Team[]> => {
      return await db.selectFrom("Team").selectAll().execute();
    },
  },
  score: {
    createScore: async (score: number, teamId: string, wodId: string): Promise<number> => {
      console.log(score, teamId, wodId);
      const res = await db
        .selectFrom("Score")
        .select("Score.id")
        .where("Score.team_id", "=", teamId)
        .where("Score.wod_id", "=", wodId)
        .executeTakeFirst();

      if (res?.id) {
        const updated = await db
          .updateTable("Score")
          .set({
            score: score,
          })
          .where("Score.team_id", "=", teamId)
          .where("Score.wod_id", "=", wodId)
          .executeTakeFirst();

        return Number(updated.numUpdatedRows) ?? 0;
      }

      const inserted = await db
        .insertInto("Score")
        .values({
          score: score,
          team_id: teamId,
          wod_id: wodId,
        })
        .executeTakeFirst();

      return Number(inserted.numInsertedOrUpdatedRows) ?? 0;
    },
  },
};
