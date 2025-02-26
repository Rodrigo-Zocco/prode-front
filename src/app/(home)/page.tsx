import LoginButton from "@/components/login-button";
import LogoutButton from "@/components/logout-button";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="bg-black font-bold text-center text-white text-3xl">
      <h1>Home page</h1>
      {session ? (
        <div>
          <h2>Sesion iniciada</h2>
          <pre className="text-xs">{JSON.stringify(session, null, 2)}</pre>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
