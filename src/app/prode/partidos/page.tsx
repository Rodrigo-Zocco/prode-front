import PredictionsSection from "@/components/predictions-section";
import ProdeSection from "@/components/prode-section";
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
      <ProdeSection section="partidos" />
      <h1 className="text-3xl text-custom-green-fluor font-bold text-center mt-4">
        PARTIDOS
      </h1>
      <Suspense fallback={<Loading />}>
        <PredictionsSection />
      </Suspense>
    </main>
  );
}
