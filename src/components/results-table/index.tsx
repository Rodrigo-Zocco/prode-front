import type { Result } from "@/lib/definitions";
import LeagueTerms from "../league-terms";

export default function ResultsTable({ results }: { results: Result[] }) {
  const headText = ["#", "Usuario", "PTS", "PJ", "PA", "RA"];

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="text-custom-white bg-custom-black">
            {headText.map((text) => (
              <th
                key={text}
                className="border-2 border-custom-gray-obscure font-medium px-1"
              >
                {text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-medium text-center">
          {results.length === 0 && (
            <tr
              className={`border-2 border-custom-gray-obscure bg-custom-gray-slight`}
            >
              <td colSpan={6}>Todavía no hay resultados.</td>
            </tr>
          )}

          {results.map((result, idx) => (
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
                  [1, 2, 3].includes(idx + 1) && "bg-custom-green-light"
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
    </>
  );
}
