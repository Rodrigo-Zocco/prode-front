"use server";
import "server-only";

import { cookies } from "next/headers";
import { encrypt, ProdeSession } from "./auth";
import { apiCall } from "./utils";

export async function refresh(parsedSession: ProdeSession) {

  let response;

  try {
    response = await apiCall<{ accessToken: string }>(
      "GET",
      "/auth/refresh",
      undefined,
      parsedSession.refreshToken
    );
  } catch {
    return;
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
}
