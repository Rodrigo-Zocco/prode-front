import LeagueSection from "@/components/league-section";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default async function TablaRondas({
  params,
}: {
  params: Promise<{ leagueId: string }>;
}) {
  const leagueId = (await params).leagueId;
  return (
    <>
      <LeagueSection section={"rounds-table"} />
      <Suspense fallback={<Loading />}>
        <div>Table Rounds Component that fetches goes here</div>
      </Suspense>
    </>
  );
}
