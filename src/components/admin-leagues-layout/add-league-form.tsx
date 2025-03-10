"use client";

import { addLeague } from "@/lib/actions";
import { AddLeagueActionResponse } from "@/lib/types";
import { useActionState } from "react";

export default function AddLeagueForm() {
  const initialState: AddLeagueActionResponse = {
    success: false,
    message: "",
  };
  const [state, action, isPending] = useActionState(addLeague, initialState);

  return (
    <form action={action} className="max-w-3xl mx-auto space-y-2">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-custom-white font-semibold">
          Nombre
        </label>
        <input
          className="w-full border-gray-300 font-bold text-custom-green-alive text-lg rounded-lg block p-2.5"
          type="text"
          id="name"
          name="name"
          defaultValue={state?.inputs?.name || ""}
          required
          minLength={4}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="country" className="text-custom-white font-semibold">
          País
        </label>
        <input
          className="w-full border-gray-300 font-bold text-custom-green-alive text-lg rounded-lg block p-2.5"
          type="text"
          id="country"
          name="country"
          defaultValue={state?.inputs?.country || ""}
          required
          minLength={3}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="logoUrl" className="text-custom-white font-semibold">
          Logo URL
        </label>
        <input
          className="w-full border-gray-300 font-bold text-custom-green-alive text-lg rounded-lg block p-2.5"
          type="text"
          id="logoUrl"
          name="logoUrl"
          defaultValue={state?.inputs?.logoUrl || ""}
          required
          minLength={10}
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
        {isPending ? "Cargando..." : "Agregar liga"}
      </button>
    </form>
  );
}
