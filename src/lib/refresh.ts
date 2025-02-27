"use server";
import "server-only";

import { cookies } from "next/headers";
import { decrypt, encrypt } from "./auth";
import { apiCall } from "./utils";

export async function refresh() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  const parsedSession = await decrypt(session);

  let response;

  try {
    response = await apiCall<{ accessToken: string }>(
      "GET",
      "/auth/refresh",
      undefined,
      parsedSession.refreshToken
    );
  } catch {
    return null;
  }

  const oneHourFromNow = new Date(Date.now() + 1 * 60 * 60 * 1000);

  const cookieExpiration = new Date(parsedSession.expires);

  const newSession = await encrypt(
    {
      ...parsedSession,
      accessToken: response.accessToken,
      aExp: oneHourFromNow,
    },
    cookieExpiration
  );

  (await cookies()).set("session", newSession, {
    expires: cookieExpiration,
    httpOnly: true,
  });

  return  response.accessToken;
}
