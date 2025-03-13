import { fetchRoundWithMatches, fetchTeams } from "@/lib/data";
import BackButton, { AddMatchModal } from "./client-buttons";
import Star from "../icons/Star";
import StarOff from "../icons/StarOff";
import MatchState, { DeleteMatch, EditMatch, GenerateResults } from "./buttons";

export default async function AdminRoundLayout({
  roundId,
}: {
  roundId: string;
}) {
  const round = await fetchRoundWithMatches(roundId);
  const teams = await fetchTeams();

  return (
    <main className="my-4">
      <div className="flex items-center justify-evenly">
        <h1 className="text-3xl text-custom-green-fluor font-bold">
          {round.description}
        </h1>
        <BackButton />
      </div>
      <div className="mt-4 space-y-4 max-w-2xl mx-auto">
        <table className="w-full">
          <tbody className="text-custom-black text-xs font-bold md:text-sm">
            {round.matches.length > 0 ? (
              round.matches.map((match, index) => (
                <tr
                  key={match.id}
                  className={
                    index % 2 === 0
                      ? "bg-custom-gray-slight"
                      : "bg-custom-white-palid"
                  }
                >
                  <td className="text-center border border-custom-gray-obscure bg-custom-gray-slight">
                    <div className="flex flex-col items-center mr-4">
                      <img
                        src={match.homeTeam.logoUrl}
                        alt={`logo`}
                        width={20}
                        height={20}
                      />
                      <span>{match.homeTeam.name}</span>
                    </div>
                  </td>
                  <td className="text-center border border-custom-gray-obscure p-2 bg-custom-white">
                    {match.homeTeamScore}
                  </td>
                  <td className="text-center border border-custom-gray-obscure p-2 bg-custom-white">
                    {match.awayTeamScore}
                  </td>
                  <td className="text-center border border-custom-gray-obscure bg-custom-gray-slight">
                    <div className="flex flex-col items-center">
                      <img
                        src={match.awayTeam.logoUrl}
                        alt={`logo`}
                        width={20}
                        height={20}
                      />
                      <span>{match.awayTeam.name}</span>
                    </div>
                  </td>
                  <td className="text-center border border-custom-gray-obscure bg-custom-white">
                    <MatchState status={match.status} />
                  </td>
                  <td className="border border-custom-gray-obscure bg-custom-green-alive">
                    <div className="flex justify-center">
                      {match.highlighted ? (
                        <Star className={""} />
                      ) : (
                        <StarOff className={""} />
                      )}
                    </div>
                  </td>
                  <td className="text-center border border-custom-gray-obscure p-2 bg-custom-white">
                    <EditMatch id={match.id} />
                  </td>
                  <td className="text-center border border-custom-gray-obscure p-2 bg-custom-white">
                    <DeleteMatch id={match.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No hay partidos</td>
              </tr>
            )}
          </tbody>
        </table>
        {round.resultsCalculated ? (
          <div>
            <p className="text-custom-white font-semibold">
              Los resultados de esta ronda ya han sido calculados.
            </p>
          </div>
        ) : (
          <div className="flex justify-center space-x-2">
            <AddMatchModal roundId={round.id} teams={teams} />
            <GenerateResults roundId={round.id} />
          </div>
        )}
      </div>
    </main>
  );
}
