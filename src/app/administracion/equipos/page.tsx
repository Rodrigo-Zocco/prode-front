import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default function AdministracionEquipos() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h1 className="my-4">ADMINISTRACION EQUIPOS</h1>
      </div>
    </Suspense>
  );
}
