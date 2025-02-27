import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/auth";
import { refresh } from "./lib/refresh";

export default async function middleware() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) {
    return NextResponse.next();
  }

  const session = await decrypt(cookie);

  const expirationDate = new Date(session.aExp);
  const currentDate = new Date();

  if (expirationDate < currentDate) {
    try {
      await refresh();
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
