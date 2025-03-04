import ProdeSection from "@/components/prode-section";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Historial() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <ProdeSection section="historial" />
      <h1 className="text-3xl text-custom-green-fluor font-bold text-center mt-4">
        HISTORIAL
      </h1>
    </main>
  );
}
