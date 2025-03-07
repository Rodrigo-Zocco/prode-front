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

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
