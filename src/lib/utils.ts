import { League, MatchStatus } from "./definitions";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function apiCall<T>(
  method: Method,
  path: string,
  body?: Record<string, unknown>,
  authToken?: string
): Promise<T> {
  const options: RequestInit = { method };

  if (body) {
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(body);
  }

  if (authToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${authToken}`,
    };
  }

  const response = await fetch(`${process.env.API_URL}${path}`, options);

  const data: T = await response.json();
  return data;
}

export function countPredictableMatches(leagues: League[]): number {
  return leagues
    .flatMap((league) => league.rounds)
    .flatMap((round) => round?.matches)
    .filter((match) => match?.status === MatchStatus.Predictable).length;
}
