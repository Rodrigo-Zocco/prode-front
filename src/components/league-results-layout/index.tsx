import { fetchLeagueResults } from "@/lib/data";
import LeagueHeader from "../league-header";
import ResultsTable from "../results-table";

export default async function LeagueResultsLayout({
  leagueId,
}: {
  leagueId: string;
}) {
  const league = await fetchLeagueResults(leagueId);

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <LeagueHeader name={league.name} logo={league.logoUrl} />
      <ResultsTable results={league.leagueResults!} />
    </div>
  );
}
