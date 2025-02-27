import { Suspense } from "react";
import PredictableGames from "@/components/predictable-games";

export default async function Home() {
  return (
    <main>
      <div>
        <Suspense
          fallback={<div className="text-3xl text-blue-500">CARGANDO...</div>}
        >
          <PredictableGames />
        </Suspense>
      </div>
      <div></div>
    </main>
  );
}
