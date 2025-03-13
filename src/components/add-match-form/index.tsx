"use client";

import { addMatch } from "@/lib/actions";
import { AddMatchActionResponse } from "@/lib/types";
import { useActionState } from "react";
import CrossOff from "../icons/CrossOff";
import { Team } from "@/lib/definitions";

export default function AddMatchForm({
  onClose,
  roundId,
  teams,
}: {
  onClose: () => void;
  roundId: string;
  teams: Team[];
}) {
  const initialState: AddMatchActionResponse = {
    success: false,
    message: "",
  };

  const addMatchWithRoundId = addMatch.bind(null, roundId);
  const [state, action, isPending] = useActionState(
    addMatchWithRoundId,
    initialState
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto"
          id="background"
        >
          <div className="flex items-center justify-between py-2 px-4 text-custom-white">
            <h2 className="text-lg font-medium">Cambiar nombre de usuario</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <CrossOff className="h-5 w-5 text-red-500" />
            </button>
          </div>

          <form action={action} className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="block font-medium">Partido destacado</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="highlighted"
                    value="true"
                    defaultChecked={state.inputs?.highlighted || false}
                    className="h-4 w-4"
                  />
                  <span>Si</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="highlighted"
                    value="false"
                    defaultChecked={!state.inputs?.highlighted && true}
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

            <div className="space-y-2">
              <select
                name="homeTeamId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="x">Elige al equipo local</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              {state.errors?.homeTeamId && (
                <p className="text-red-500 text-xs mt-1 font-bold">
                  {state.errors.homeTeamId[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <select
                name="awayTeamId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="x">Elige al equipo visitante</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              {state.errors?.awayTeamId && (
                <p className="text-red-500 text-xs mt-1 font-bold">
                  {state.errors.awayTeamId[0]}
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
              {isPending ? "Cargando..." : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
