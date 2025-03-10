import AdminLeaguesLayout from "@/components/admin-leagues-layout";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default function AdministracionLigas() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminLeaguesLayout />
    </Suspense>
  );
}
