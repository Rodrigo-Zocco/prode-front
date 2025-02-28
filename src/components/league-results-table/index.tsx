import { fetchLeagueResults } from "@/lib/data";

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
      <div className="flex flex-row w-full justify-center items-center">
        <img
          src={league.logoUrl}
          alt={`${league.name} logo`}
          width={60}
          height={60}
          className="mr-2"
        />
        <h1 className="text-custom-white text-center text-3xl font-bold p-4">
          {league.name.toUpperCase()}
        </h1>
        <img
          src={league.logoUrl}
          alt={`${league.name} logo`}
          width={60}
          height={60}
          className="mr-2"
        />
      </div>
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

      <table className="w-full sm:w-2/3">
        <tbody className="font-medium text-xs">
          <tr className="bg-custom-gray-slight">
            <td className="border-2 border-custom-gray-obscure">
              PTS: Puntos Totales
            </td>
          </tr>
          <tr className="bg-custom-white-palid">
            <td className="border-2 border-custom-gray-obscure">
              PJ: Partidos Jugados
            </td>
          </tr>
          <tr className="bg-custom-gray-slight">
            <td className="border-2 border-custom-gray-obscure">
              PA: Partidos Acertados (Se adivino el resultado)
            </td>
          </tr>
          <tr className="bg-custom-white-palid">
            <td className="border-2 border-custom-gray-obscure">
              <div className="flex flex-col">
                <p>
                  RA: Resultados Acertados (Se adivino la cantidad de goles){" "}
                </p>
                <span className="font-bold">*No incluye los PA</span>
              </div>
            </td>
          </tr>
          <tr className="bg-custom-white-palid">
            <td className="border-2 border-custom-gray-obscure">
              <div>
                <span className="bg-custom-green-light">
                  Puestos de trofeos
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
