import {Query, dbQuery} from "./db/query";
import {LeaderboardRecord, Team, Wod} from "./db/types";

const queries: dbQuery = Query;

const api = {
  leaderboard: {
    get: async (wod: number): Promise<LeaderboardRecord[]> => {
      if (wod > 0) {
        return await queries.leaderboard.getWodLeaderboard(wod);
      }

      return await queries.leaderboard.getOverallLeaderboard();
    },
  },
  wod: {
    get: async (wod: number): Promise<Partial<Wod> | undefined> => {
      return await queries.wod.getWodInfo(wod);
    },
    getAll: async (): Promise<Partial<Wod>[]> => {
      return await queries.wod.getAll();
    },
  },
  teams: {
    getAll: async (): Promise<Team[]> => {
      return await queries.teams.getTeams();
    },
  },
  score: {
    create: async (score: number, teamId: string, wodId: string): Promise<number> => {
      return await queries.score.createScore(score, teamId, wodId);
    },
  },
};

export default api;
