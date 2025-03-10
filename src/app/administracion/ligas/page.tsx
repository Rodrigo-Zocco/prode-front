import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default function AdministracionLigas() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h1 className="my-4">ADMINISTRACION LIGAS</h1>
      </div>
    </Suspense>
  );
}
