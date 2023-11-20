import {Generated, Insertable, Selectable, Updateable} from "kysely";

export interface Database {
  Wod: WodTable;
  Team: TeamTable;
  Participant: ParticipantTable;
  Score: ScoreTable;
}

export interface WodTable {
  id: Generated<string>;
  name: string;
  elements: string;
  type: string;
}
export type Wod = Selectable<WodTable>;
export type NewWod = Insertable<WodTable>;
export type WodUpdate = Updateable<WodTable>;

export interface TeamTable {
  id: Generated<string>;
  name: string;
}
export type Team = Selectable<TeamTable>;
export type NewTeam = Insertable<TeamTable>;
export type TeamUpdate = Updateable<TeamTable>;

export interface ParticipantTable {
  id: Generated<string>;
  team_id: string;
  full_name: string;
}
export type Participant = Selectable<ParticipantTable>;
export type NewParticipant = Insertable<ParticipantTable>;
export type ParticipantUpdate = Updateable<ParticipantTable>;

export interface ScoreTable {
  id: Generated<string>;
  wod_id: string;
  team_id: string;
  score: number;
}
export type Score = Selectable<ScoreTable>;
export type NewScore = Insertable<ScoreTable>;
export type ScoreUpdate = Updateable<ScoreTable>;

export type LeaderboardRecord = {
  id: string;
  name: string;
  members: string;
  points: number;
};

export type WodRecord = {
  type: string;
  elements: string;
};
