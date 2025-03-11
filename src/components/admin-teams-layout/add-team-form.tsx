"use client";

import { addTeam } from "@/lib/actions";
import { AddTeamActionResponse } from "@/lib/types";
import { useActionState } from "react";

export default function AddTeamForm() {
  const initialState: AddTeamActionResponse = {
    success: false,
    message: "",
  };

  const [state, action, isPending] = useActionState(addTeam, initialState);

  return (
    <div>
      <h1 className="text-xl text-custom-yellow-light font-bold text-center">
        Agregar un equipo
      </h1>
      <form action={action} className="max-w-3xl mx-auto space-y-2">
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-custom-white font-semibold"
          >
            Nombre
          </label>
          <input
            className="w-full border-gray-300 font-bold text-custom-green-alive text-lg rounded-lg block p-2.5"
            type="text"
            id="name"
            name="name"
            defaultValue={state?.inputs?.name || ""}
            required
            minLength={3}
          />
          {state.errors?.name && (
            <p className="text-red-500 text-xs mt-1 font-bold">
              {state.errors.name[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-custom-white font-semibold"
          >
            Logo (URL)
          </label>
          <input
            className="w-full border-gray-300 font-bold text-custom-green-alive text-lg rounded-lg block p-2.5"
            type="text"
            id="logoUrl"
            name="logoUrl"
            defaultValue={state?.inputs?.logoUrl || ""}
            required
            minLength={3}
          />
          {state.errors?.logoUrl && (
            <p className="text-red-500 text-xs mt-1 font-bold">
              {state.errors.logoUrl[0]}
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
          {isPending ? "Cargando..." : `Agregar Equipo`}
        </button>
      </form>
    </div>
  );
}
