"use client";

import { createRound } from "@/lib/actions";
import { AddRoundActionResponse } from "@/lib/types";
import { useActionState } from "react";

export default function AddRoundForm({ leagueId }: { leagueId: string }) {
  const initialState: AddRoundActionResponse = {
    success: false,
    message: "",
  };

  const createRoundWithLeagueId = createRound.bind(null, leagueId);
  const [state, action, isPending] = useActionState(
    createRoundWithLeagueId,
    initialState
  );

  return (
    <form action={action} className="max-w-3xl mx-auto space-y-2">
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="text-custom-white font-semibold"
        >
          Descripcion
        </label>
        <input
          className="w-full border-gray-300 font-bold text-custom-green-alive text-lg rounded-lg block p-2.5"
          type="text"
          id="description"
          name="description"
          defaultValue={state?.inputs?.description || ""}
          required
          minLength={4}
        />
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
        {isPending ? "Cargando..." : "Agregar Ronda"}
      </button>
    </form>
  );
}
