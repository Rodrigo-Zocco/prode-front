import Link from "next/link";
import StarOff from "../icons/StarOff";
import Star from "../icons/Star";
import { League } from "@/lib/definitions";

// TODO: Should change the img for Next Image
export default function LeaguePredictableGames({ league }: { league: League }) {
  return (
    <>
      <div className="max-w-md mx-auto mb-12">
        <table className="w-full">
          <thead>
            <tr>
              <th colSpan={5}>
                <div className="bg-custom-green-strong flex items-center justify-center">
                  <img
                    src={league.logoUrl}
                    alt={`${league.name} logo`}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <h2 className="text-center text-base text-custom-white font-medium">
                    {league.name.toUpperCase()}
                  </h2>
                  <img
                    src={league.logoUrl}
                    alt={`${league.name} logo`}
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-custom-black text-xs font-bold md:text-sm">
            {league.rounds?.flatMap((round) =>
              round.matches.map((match) => (
                <tr key={match.id}>
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
                  <td className="text-center border border-custom-gray-obscure p-2 bg-custom-white"></td>
                  <td className="text-center border border-custom-gray-obscure p-2 bg-custom-white"></td>
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
                  <td className="border border-custom-gray-obscure bg-custom-green-alive">
                    <div className="flex justify-center">
                      {match.highlighted ? (
                        <Star className={""} />
                      ) : (
                        <StarOff className={""} />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div>
          <Link href={`/ligas/${league.id}`}>
            <button className="bg-custom-greenblue border border-1 border-custom-black text-custom-white text-xs font-semibold p-2 hover:cursor-pointer">
              Seccion
              <h2>{league.name}</h2>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
