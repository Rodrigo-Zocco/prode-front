import PredictionsSection from "@/components/predictions-section";
import Loading from "@/components/ui/loading";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Partidos() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <div className="text-3xl text-custom-green-fluor font-bold text-center my-4">
        <h1 className="mb-2">PARTIDOS</h1>
        <h2 className="text-xl text-custom-white">
          Si no creas tu predicción para un partido, no sumarás puntos.
        </h2>
        <h2 className="text-xl text-custom-white">
          Podés editar tus predicciónes.
        </h2>
      </div>
      <Suspense fallback={<Loading />}>
        <PredictionsSection />
      </Suspense>
    </main>
  );
}
