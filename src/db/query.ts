import {sql} from "kysely";

import {db} from "./database";
import {LeaderboardRecord, WodRecord} from "./types";

export const Query = {
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
  getWodInfo: async (wod: number): Promise<WodRecord | undefined> => {
    console.log(wod);

    return await db
      .selectFrom("Wod")
      .select(["Wod.type", "Wod.elements"])
      .where("Wod.name", "like", `%.${wod}`)
      .executeTakeFirst();
  },
};
