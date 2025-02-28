import LeagueLayout from "@/components/league-layout";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default async function Liga({
  params,
}: {
  params: Promise<{ leagueId: string }>;
}) {
  const leagueId = (await params).leagueId;
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <LeagueLayout leagueId={leagueId} />
      </Suspense>
    </main>
  );
}
