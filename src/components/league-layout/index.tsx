import LeagueContainer from "./container";
import Header from "./header";
import Matches from "./matches";
import Results from "./results";

export default async function LeagueLayout({ leagueId }: { leagueId: string }) {
  //TODO: Fetch of the league should be done here
  await new Promise((r) => setTimeout(r, 3000));
  return (
    <LeagueContainer>
      <Header leagueName={"Superliga Argentina"} logoUrl={"x"} />
      <Matches />
      <Results />
    </LeagueContainer>
  );
}
