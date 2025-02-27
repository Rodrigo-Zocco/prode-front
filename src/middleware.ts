import { NextResponse } from "next/server";
import { getSession } from "./lib/auth";
import { refresh } from "./lib/refresh";

export default async function middleware() {
  const session = await getSession();

  if (!session) {
    return NextResponse.next();
  }

  const accessTokenExpiration = new Date(session.aExp);
  const currentDate = new Date();

  if (accessTokenExpiration < currentDate) {
    try {
      await refresh(session);
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
