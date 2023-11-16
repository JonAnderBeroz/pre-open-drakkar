import {sql} from "kysely";

import {db} from "@/db/database";
import {Team} from "@/db/types";

const api = {
  leaderboard: {
    getOverall: async (): Promise<
      {
        id: string;
        name: string;
        members: string;
        points: number;
      }[]
    > => {
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
          sql<number>`SUM(ranked_score.position)`.as("points"),
        ])
        .groupBy("Team.id")
        .orderBy("points")
        .execute();
    },
  },
};

export default api;
