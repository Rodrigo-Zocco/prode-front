"use server";
import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiCall } from "./utils";

const secretKey = process.env.JWT_SECRET!;
const key = new TextEncoder().encode(secretKey);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any, expires: Date) {
  //TODO: Set payload type if possible
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(key);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function decrypt(input: string): Promise<any> {
  //TODO: Set response type if possible
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

enum Role {
  Administrator = "administrator",
  Regular = "regular",
}

interface LoginResponse {
  userId: string;
  username: string;
  role: Role;
  refreshToken: string;
  accessToken: string;
}

//type RefreshResponse = Omit<LoginResponse, "refreshToken">;

export interface ProdeSession extends LoginResponse {
  expires: Date;
  aExp: Date;
}

export async function getSession(): Promise<ProdeSession | null> {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    return null;
  }

  try {
    return await decrypt(session);
  } catch {
    return null;
  }
}

export async function login(code: string) {
  let data: LoginResponse;

  try {
    data = await apiCall<LoginResponse>("POST", "/auth/login", { code });
  } catch {
    console.error("POST /auth/login Error on Login request");
    redirect("/");
  }

  const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const oneHourFromNow = new Date(Date.now() + 1 * 60 * 60 * 1000);

  const session = await encrypt(
    {
      ...data,
      expires: oneDayFromNow,
      aExp: oneHourFromNow,
    },
    oneDayFromNow
  );

  (await cookies()).set("session", session, {
    expires: oneDayFromNow,
    httpOnly: true,
  });
}

export async function logout() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  (await cookies()).set("session", "", { expires: new Date(0) });

  try {
    await apiCall<void>("GET", "/auth/logout", undefined, session.refreshToken);
  } catch {
    console.error("GET /auth/logout Error on Logout request");
  }
  redirect("/");
}
