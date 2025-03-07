import { Suspense } from "react";
import PredictableGames from "@/components/predictable-games";
import Loading from "@/components/ui/loading";

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <PredictableGames />
      </Suspense>
    </main>
  );
}
