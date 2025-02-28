import LeagueSection from "@/components/league-section";
import LeagueResultsTable from "@/components/league-results-table";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ leagueId: string }>;
}) {
  const leagueId = (await params).leagueId;
  return (
    <main>
      <LeagueSection section={"general-table"} />
      <Suspense fallback={<Loading />}>
        <LeagueResultsTable leagueId={leagueId} />
      </Suspense>
    </main>
  );
}
