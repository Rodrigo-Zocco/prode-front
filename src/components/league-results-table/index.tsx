import { fetchLeagueResults } from "@/lib/data";
import LeagueTerms from "../league-terms";
import LeagueHeader from "../league-header";

const HeadData = ({ text }: { text: string }) => {
  return (
    <th className="border-2 border-custom-gray-obscure font-medium px-1">
      {text}
    </th>
  );
};

export default async function LeagueResultsTable({
  leagueId,
}: {
  leagueId: string;
}) {
  const league = await fetchLeagueResults(leagueId);
  const headText = ["#", "Usuario", "PTS", "PJ", "PA", "RA"];

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <LeagueHeader name={league.name} logo={league.logoUrl} />
      <table className="w-full">
        <thead>
          <tr className="text-custom-white bg-custom-black">
            {headText.map((text) => (
              <HeadData key={text} text={text} />
            ))}
          </tr>
        </thead>
        <tbody className="font-medium text-center">
          {league.leagueResults?.length === 0 && (
            <tr
              className={`border-2 border-custom-gray-obscure bg-custom-gray-slight`}
            >
              <td colSpan={6}>Todavía no hay resultados.</td>
            </tr>
          )}
          {league.leagueResults?.map((result, idx) => (
            <tr
              key={result.id}
              className={`border-2 border-custom-gray-obscure ${
                idx % 2 === 0
                  ? "bg-custom-gray-slight"
                  : "bg-custom-white-palid"
              }`}
            >
              <td
                className={` ${
                  [1, 2, 3, 4, 5].includes(idx + 1) && "bg-custom-green-light"
                }`}
              >
                {idx + 1}
              </td>
              <td className="border-2 border-custom-gray-obscure break-all text-left">
                {result.user.username}
              </td>
              <td className="border-2 border-custom-gray-obscure">
                {result.points}
              </td>
              <td className="border-2 border-custom-gray-obscure">
                {result.playedGames}
              </td>
              <td className="border-2 border-custom-gray-obscure">
                {result.resultsPredicted}
              </td>
              <td className="border-2 border-custom-gray-obscure">
                {result.allPredicted}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LeagueTerms />
    </div>
  );
}
