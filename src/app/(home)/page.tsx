import { Suspense } from "react";
import PredictableGames from "@/components/predictable-games";
import Loading from "@/components/ui/loading";

export default async function Home() {
  return (
    <main>
      <div>
        <Suspense fallback={<Loading />}>
          <PredictableGames />
        </Suspense>
      </div>
      <div></div>
    </main>
  );
}
