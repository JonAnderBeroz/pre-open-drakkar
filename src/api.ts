import {Query} from "./db/query";
import {LeaderboardRecord, WodRecord} from "./db/types";

interface dbQuery {
  getWodLeaderboard: (wod: number) => Promise<LeaderboardRecord[]>;
  getOverallLeaderboard: () => Promise<LeaderboardRecord[]>;
  getWodInfo: (wod: number) => Promise<WodRecord | undefined>;
}

const queries: dbQuery = Query;

const api = {
  leaderboard: {
    get: async (wod: number): Promise<LeaderboardRecord[]> => {
      if (wod > 0) {
        return await queries.getWodLeaderboard(wod);
      }

      return await queries.getOverallLeaderboard();
    },
  },
  wod: {
    get: async (wod: number): Promise<WodRecord | undefined> => {
      return await queries.getWodInfo(wod);
    },
  },
};

export default api;
