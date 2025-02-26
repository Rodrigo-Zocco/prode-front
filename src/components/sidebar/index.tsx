import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function Sidebar() {
  const session = await getSession();

  return (
    <div className="bg-green-800 text-2xl font-bold text-white flex justify-evenly mb-2">
      <Link href={"/"}>Inicio</Link>
      <Link href={"/premios"}>Premios</Link>
      <Link href={"/ligas/ligaId"}>Liga</Link>

      {session ? (
        <>
          <Link href={"/prode"}>Jugar</Link>
          <Link href={`/museos/${session.userId}`}>Mi Museo</Link>
        </>
      ) : (
        <>
          <span className="text-gray-400 cursor-not-allowed">Jugar</span>
          <span className="text-gray-400 cursor-not-allowed">Mi Museo</span>
        </>
      )}
    </div>
  );
}
