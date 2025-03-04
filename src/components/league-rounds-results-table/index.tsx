import { fetchLeagueRoundsResults } from "@/lib/data";
import LeagueTerms from "../league-terms";
import LeagueHeader from "../league-header";

export default async function LeagueRoundsResultsTable({
  leagueId,
}: {
  leagueId: string;
}) {
  const league = await fetchLeagueRoundsResults(leagueId);

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <LeagueHeader name={league.name} logo={league.logoUrl} />
      <LeagueTerms />
    </div>
  );
}
