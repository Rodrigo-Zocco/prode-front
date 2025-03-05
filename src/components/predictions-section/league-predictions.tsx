import { League } from "@/lib/definitions";
import CreatePredictionForm from "./create-prediction-form";

export default function LeaguePredictions({ league }: { league: League }) {
  return (
    <div className="max-w-lg mx-auto my-12">
      <table className="w-full">
        <thead>
          <tr>
            <th colSpan={6}>
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
            round.matches.map((match) =>
              match.predictions![0] ? (
                <tr key={match.id}>
                  <td>Editable</td>
                </tr>
              ) : (
                <CreatePredictionForm key={match.id} match={match} />
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
