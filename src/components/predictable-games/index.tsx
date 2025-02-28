import { fetchGames } from "@/lib/data";

import Star from "../icons/Star";
import FaceSad from "../icons/FaceSad";
import LeaguePredictableGames from "./league-predictable-games";
import { countPredictableMatches } from "@/lib/utils";
import { MatchStatus } from "@/lib/definitions";

export default async function PredictableGames() {
  const predictableGames = await fetchGames(MatchStatus.Predictable);
  const predictableGamesCount = countPredictableMatches(predictableGames);

  return (
    <>
      <h1 className="text-3xl text-custom-green-fluor font-bold text-center">
        {predictableGamesCount} PARTIDOS DISPONIBLES
      </h1>

      {predictableGamesCount > 0 ? (
        <div className="text-center font-bold text-custom-white text-2xl mt-4">
          <h2>
            Inicia sesión y elegí la opcion jugar en el menu para subir o editar
            tu predicción a estos partidos, ¡hacelo antes de que cierren!
          </h2>
          <div className="text-center justify-center items-center flex flex-col mt-4">
            <h3>Los partidos destacados suman más puntos</h3>
            <span className="mx-1">
              <Star className={""} />
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-center font-bold">
          <h2 className="text-red-500 text-3xl">
            Por el momento no hay partidos disponibles{" "}
          </h2>
          <h2 className="text-custom-white text-2xl">
            Cuando haya algun partido para jugar, lo vas a ver aca.
          </h2>
          <FaceSad className={"w-full my-4"} />
        </div>
      )}

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
