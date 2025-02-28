import LeagueContainer from "@/components/league-container";
import Header from "@/components/league-container/header";
import Matches from "@/components/league-container/matches";
import Results from "@/components/league-container/results";

export default async function Liga({
  params,
}: {
  params: Promise<{ leagueId: string }>;
}) {
  const leagueId = (await params).leagueId;
  await new Promise(r => setTimeout(r, 3000));
  return (
    <>
      <LeagueContainer>
        <Header
          leagueName={"Superliga Argentina"}
          logoUrl={"x"}
        />
        <Matches />
        <Results />
      </LeagueContainer>
    </>
  );
}
