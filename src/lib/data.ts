import { League, MatchStatus } from "./definitions";
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
