import LeagueSection from "@/components/league-section";
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
      <LeagueSection section={"games"} />
      <Suspense fallback={<Loading />}>
        <div>Games Component that fetches goes here</div>
      </Suspense>
    </main>
  );
}