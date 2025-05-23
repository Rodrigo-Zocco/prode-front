import { getSession } from "./auth";
import {
  Award,
  League,
  Match,
  MatchStatus,
  Pagination,
  Round,
  Team,
} from "./definitions";
import { apiCall } from "./utils";

// TODO: May be possible to catch N hours all api calls here (it depends case by case)

export async function fetchLeagues() {
  try {
    const leagues = await apiCall<League[]>("GET", "/leagues");
    return leagues;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch Leagues data.");
  }
}

export async function fetchGames(status?: MatchStatus) {
  try {
    let path = "/leagues/matches";

    if (status) {
      path += `?status=${status}`;
    }

    const leagues = await apiCall<League[]>("GET", path);
    return leagues;
  } catch {
    throw new Error("Failed to fetch Predictable games data.");
  }
}

export async function fetchLeagueResults(leagueId: string) {
  try {
    const path = `/leagues/${leagueId}/results`;

    const leagueResults = await apiCall<League>("GET", path);

    return leagueResults;
  } catch {
    throw new Error("Failed to fetch League results data.");
  }
}

export async function fetchLeagueRoundsResults(leagueId: string) {
  try {
    const path = `/leagues/${leagueId}/rounds-results`;

    const leagueRoundsResults = await apiCall<League>("GET", path);

    return leagueRoundsResults;
  } catch {
    throw new Error("Failed to fetch League Rounds results data.");
  }
}

export async function fetchUserPredictions() {
  const session = await getSession();

  try {
    const path = `/predictions`;
    const userPredictions = await apiCall<League[]>(
      "GET",
      path,
      undefined,
      session?.accessToken
    );
    return userPredictions;
  } catch {
    throw new Error("Failed to fetch User predictions data.");
  }
}

export async function fetchAwards(page: number) {
  try {
    const path = `/awards?page=${page}`;

    const awards = await apiCall<{ awards: Award[]; pagination: Pagination }>(
      "GET",
      path
    );

    return awards;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch Awards data.");
  }
}

export async function fetchUserAwards(userId: string, page: number) {
  try {
    const path = `/awards/${userId}?page=${page}`;

    const awards = await apiCall<{ awards: Award[]; pagination: Pagination }>(
      "GET",
      path
    );

    return awards;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch User Awards data.");
  }
}

export async function fetchRounds() {
  try {
    const session = await getSession();
    const rounds = await apiCall<Round[]>(
      "GET",
      "/rounds",
      undefined,
      session?.accessToken
    );
    return rounds;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch Rounds data.");
  }
}

export async function fetchTeams() {
  try {
    const session = await getSession();
    const rounds = await apiCall<Team[]>(
      "GET",
      "/teams",
      undefined,
      session?.accessToken
    );
    return rounds;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch Teams data.");
  }
}

export async function fetchRoundWithMatches(roundId: string) {
  try {
    const session = await getSession();

    const roundWithMatches = await apiCall<Round>(
      "GET",
      `/rounds/${roundId}`,
      undefined,
      session?.accessToken
    );
    return roundWithMatches;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch Round with matches data.");
  }
}

export async function fetchMatch(matchId: string) {
  try {
    const session = await getSession();

    const roundWithMatches = await apiCall<Match>(
      "GET",
      `/matches/${matchId}`,
      undefined,
      session?.accessToken
    );
    return roundWithMatches;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch match data.");
  }
}