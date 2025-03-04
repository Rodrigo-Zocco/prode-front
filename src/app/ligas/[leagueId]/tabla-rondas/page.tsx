import LeagueRoundsResultsTable from "@/components/league-rounds-results-table";
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
        <LeagueRoundsResultsTable leagueId={leagueId} />
      </Suspense>
    </>
  );
}
