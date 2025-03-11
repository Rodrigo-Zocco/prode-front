import AdminTeamsLayout from "@/components/admin-teams-layout";
import Loading from "@/components/ui/loading";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AdministracionEquipos() {
  const session = await getSession();

  if (!session || session.role !== "administrator") {
    redirect("/");
  }

  return (
    <Suspense fallback={<Loading />}>
      <AdminTeamsLayout />
    </Suspense>
  );
}
