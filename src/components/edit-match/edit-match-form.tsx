"use client";

import { editMatch } from "@/lib/actions";
import { Match } from "@/lib/definitions";
import { EditMatchActionResponse } from "@/lib/types";
import { useActionState } from "react";
import BackButton from "../admin-round-layout/back-button";

export default function EditMatchForm({ match }: { match: Match }) {
  const initialState: EditMatchActionResponse = {
    success: false,
    message: "",
  };

  const editMatchWithId = editMatch.bind(null, match.id);
  const [state, action, isPending] = useActionState(
    editMatchWithId,
    initialState
  );

  const status = [
    { status: "waiting", text: "En espera", color: "text-yellow-500" },
    { status: "predictable", text: "Pronosticable", color: "text-green-500" },
    { status: "ongoing", text: "En curso", color: "text-blue-500" },
    { status: "finished", text: "Finalizado", color: "text-purple-500" },
    { status: "suspended", text: "Suspendido", color: "text-red-500" },
  ];

  return (
    <form
      action={action}
      className="max-w-xl mx-auto mt-6 border rounded-md space-y-6 p-2 text-custom-white"
    >
      <BackButton />
      <div className="space-y-2">
        <label className="font-medium">Goles</label>

        <div className="max-w-sm space-y-2 mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center flex-1">
              <div className="w-12 h-12 relative mr-3">
                <img
                  src={match.homeTeam.logoUrl}
                  alt={match.homeTeam.name}
                  className="object-contain"
                />
              </div>
              <span>{match.homeTeam.name}</span>
            </div>
            <div className="w-20">
              <input
                type="number"
                name="homeTeamScore"
                defaultValue={match.homeTeamScore}
                min="0"
                max="20"
                className="w-full px-3 py-2 border rounded text-center bg-transparent"
              />
              {state.errors?.homeTeamScore && (
                <p className="text-red-500 text-xs mt-1 font-bold">
                  {state.errors.homeTeamScore[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center flex-1">
              <div className="w-12 h-12 relative mr-3">
                <img
                  src={match.awayTeam.logoUrl}
                  alt={match.awayTeam.name}
                  className="object-contain"
                />
              </div>
              <span>{match.awayTeam.name}</span>
            </div>
            <div className="w-20">
              <input
                type="number"
                name="awayTeamScore"
                defaultValue={match.awayTeamScore}
                min="0"
                max="20"
                className="w-full px-3 py-2 border rounded text-center bg-transparent"
              />
              {state.errors?.awayTeamScore && (
                <p className="text-red-500 text-xs mt-1 font-bold">
                  {state.errors.awayTeamScore[0]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 items-center space-x-2">
        <label className="font-medium">Estado del partido</label>
        <div className="flex  flex-wrap gap-2">
          {status.map((status) => (
            <label key={status.text} className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value={status.status}
                defaultChecked={match.status === status.status}
                className="h-4 w-4"
              />
              <span className={`capitalize ${status.color} font-semibold`}>
                {status.text}
              </span>
            </label>
          ))}
          {state.errors?.status && (
            <p className="text-red-500 text-xs mt-1 font-bold">
              {state.errors.status[0]}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Partido destacado</label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="highlighted"
              value="true"
              defaultChecked={match.highlighted === true}
              className="h-4 w-4"
            />
            <span>Si</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="highlighted"
              value="false"
              defaultChecked={match.highlighted === false}
              className="h-4 w-4"
            />
            <span>No</span>
          </label>
        </div>
        {state.errors?.highlighted && (
          <p className="text-red-500 text-xs mt-1 font-bold">
            {state.errors.highlighted[0]}
          </p>
        )}
      </div>

      {state?.message && !isPending && (
        <p
          className={`text-xl font-bold text-center ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        className={`mt-4 ml-2 text-custom-white border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2 ${
          isPending ? "bg-gray-600" : "bg-custom-green-alive"
        }`}
        type="submit"
        aria-disabled={isPending}
        disabled={isPending}
      >
        {isPending ? "Cargando..." : "Editar"}
      </button>
    </form>
  );
}
