import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Historial() {
  const session = await getSession();

  if(!session) {
    redirect("/");
  }

  return (
    <div className="bg-black font-bold text-center text-blue-500 text-3xl">
      <h1>Prode Historal Page</h1>
    </div>
  );
}