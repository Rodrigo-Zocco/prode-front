import { fetchGames } from "@/lib/data";

import Star from "../icons/Star";
import FaceSad from "../icons/FaceSad";
import Link from "next/link";
import LeaguePredictableGames from "./league-predictable-games";
import { countPredictableMatches } from "@/lib/utils";
import { MatchStatus } from "@/lib/definitions";

export default async function PredictableGames() {
  const predictableGames = await fetchGames(MatchStatus.Predictable);
  const predictableGamesCount = countPredictableMatches(predictableGames);

  return (
    <>
      <h1 className="text-3xl">
        <span className="text-custom-yellow-light">
          {predictableGamesCount}
        </span>{" "}
        PARTIDOS DISPONIBLES
      </h1>

      {predictableGamesCount > 0 ? (
        <>
          <h2 className="text-custom-yellow-light text-2xl">
            Inicia sesión y subi o edita tu predicción a estos partidos, hacelo
            antes de que cierren!
          </h2>
          <div className="flex text-center justify-center items-center">
            <h3 className="text-custom-yellow-light text-sm">
              Los partidos destacados
            </h3>

            <Star className={"mx-1"} />

            <h3 className="text-custom-yellow-light text-sm">
              suman más puntos
            </h3>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <h2 className="text-red-500 text-3xl">
              Por el momento no hay partidos disponibles
            </h2>
            <FaceSad className={"ml-2"} />
          </div>

          <h2 className="text-custom-yellow-light text-2xl">
            Cuando haya algun partido para jugar, lo vas a ver aca.
          </h2>
        </>
      )}
      <button className="bg-custom-green px-6 py-2 m-4 rounded transition duration-300 hover:bg-custom-green-alive hover:cursor-pointer">
        <Link href={"/prode"}>
          {predictableGamesCount > 0 ? "JUGAR" : "MIS PREDICCIONES"}
        </Link>
      </button>

      <div>
        {predictableGames.map((leagueWithGames) => (
          <LeaguePredictableGames
            key={leagueWithGames.id}
            league={leagueWithGames}
          />
        ))}
      </div>
    </>
  );
}
