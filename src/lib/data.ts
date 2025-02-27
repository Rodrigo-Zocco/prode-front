import { League } from "./definitions";
import { apiCall } from "./utils";

export async function fetchLeagues() {
  try {
    // TODO: This call could be catched and re-used for N hours
    const leagues = await apiCall<League[]>("GET", "/leagues");
    return leagues;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch Leagues data.");
  }
}
