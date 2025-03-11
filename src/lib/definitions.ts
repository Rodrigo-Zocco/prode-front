export enum UserRole {
  Administrator = "administrator",
  Regular = "regular",
}

export enum MatchStatus {
  Predictable = "predictable",
  Ongoing = "ongoing",
  Finished = "finished",
  Suspended = "suspended",
  Waiting = "waiting",
}

export interface Team {
  id: number;
  name: string;
  logoUrl: string;
}

export interface Award {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  user: User;
}

interface User {
  id: string;
  username: string;
  role: UserRole;
  favoriteTeam?: Team;
  favoriteSecondTeam?: Team;
  awards: Award[];
}

export interface Match {
  id: string;
  status: MatchStatus;
  homeTeamScore?: number;
  awayTeamScore?: number;
  highlighted: boolean;
  homeTeam: Team;
  awayTeam: Team;
  predictions?: Prediction[];
}

interface Prediction {
  id: string;
  homeTeamScore: number;
  awayTeamScore: number;
  matchId: string;
}

export interface Round {
  id: string;
  description: string;
  resultsCalculated: boolean;
  matches: Match[];
  createdAt: Date;
  updatedAt: Date;
  roundResults?: RoundResults[];
  leagueId?: string;
}

export interface Result {
  id: string;
  playedGames: number;
  points: number;
  resultsPredicted: number;
  allPredicted: number;
  user: User;
}

type RoundResults = Result;

type LeagueResults = Result;

export interface League {
  id: string;
  name: string;
  country: string;
  logoUrl: string;
  rounds?: Round[];
  leagueResults?: LeagueResults[];
}

export interface SidebarLink {
  id: number;
  label: string;
  href: string;
  disabled: boolean;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
