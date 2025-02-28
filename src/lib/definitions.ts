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

interface Team {
  id: number;
  name: string;
  logoUrl: string;
}

interface Award {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  createdAt: Date;
}

interface User {
  id: string;
  username: string;
  role: UserRole;
  favoriteTeam?: Team;
  favoriteSecondTeam?: Team;
  awards: Award[];
}

interface Match {
  id: string;
  status: MatchStatus;
  homeTeamScore?: number;
  awayTeamScore?: number;
  highlighted: boolean;
  homeTeam: Team;
  awayTeam: Team;
}

interface Round {
  id: string;
  description: string;
  matches: Match[];
}

interface LeagueResults {
  id: string;
  playedGames: number;
  points: number;
  resultsPredicted: number;
  allPredicted: number;
  user: User;
}

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
