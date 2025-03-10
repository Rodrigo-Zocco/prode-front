import AdminTeamsLayout from "@/components/admin-teams-layout";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default function AdministracionEquipos() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminTeamsLayout />
    </Suspense>
  );
}
