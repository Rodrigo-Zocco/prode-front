import EditUsername from "@/components/edit-username";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Configuracion() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <div className="my-4">
        <h1 className="text-3xl text-custom-green-fluor font-bold">
          Configuración de la cuenta
        </h1>
        <h2 className="text-custom-green-fluor text-xl font-semibold mt-2">
          Administra las preferencias de tu cuenta
        </h2>
      </div>
      <div className="space-y-4">
        <EditUsername />
      </div>
    </main>
  );
}
