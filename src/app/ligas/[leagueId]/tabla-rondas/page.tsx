import LeagueRoundsResultsLayout from "@/components/league-rounds-results-layout";
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
        <LeagueRoundsResultsLayout leagueId={leagueId} />
      </Suspense>
    </>
  );
}
