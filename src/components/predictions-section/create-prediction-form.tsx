"use client";

import { Match } from "@/lib/definitions";
import Star from "../icons/Star";
import StarOff from "../icons/StarOff";
import { createPrediction } from "@/lib/actions";
import { useActionState } from "react";
import { CreatePredictionActionResponse } from "@/lib/types";

export default function CreatePredictionForm({ match }: { match: Match }) {
  const createPredictionWithMatchId = createPrediction.bind(null, match.id);
  const initialState: CreatePredictionActionResponse = {
    success: false,
    message: "",
  };
  const [state, action, isPending] = useActionState(
    createPredictionWithMatchId,
    initialState
  );

  return (
    <tr>
      <td className="text-center border border-custom-gray-obscure bg-custom-gray-slight">
        <div className="flex flex-col items-center">
          <img
            src={match.homeTeam.logoUrl}
            alt={`logo`}
            width={20}
            height={20}
          />
          <span>{match.homeTeam.name}</span>
        </div>
      </td>
      <td className="text-center border border-custom-gray-obscure bg-custom-white">
        <form id={`prediction-form-${match.id}`} action={action}>
          <input
            className="max-w-8 text-center"
            type="number"
            name="homeTeamScore"
            defaultValue={state?.inputs?.homeTeamScore || 0}
            aria-label={`${match.homeTeam.name} score`}
          />
          {state?.errors?.homeTeamScore && (
            <p className="text-red-500 text-xs mt-1">
              {state.errors.homeTeamScore[0]}
            </p>
          )}
        </form>
      </td>
      <td className="text-center border border-custom-gray-obscure bg-custom-white">
        <input
          className="max-w-8 text-center"
          type="number"
          name="awayTeamScore"
          defaultValue={state?.inputs?.awayTeamScore || 0}
          form={`prediction-form-${match.id}`}
          aria-label={`${match.awayTeam.name} score`}
        />
        {state?.errors?.awayTeamScore && (
          <p className="text-red-500 text-xs mt-1">
            {state.errors.awayTeamScore[0]}
          </p>
        )}
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
      <td className="border border-custom-gray-obscure bg-custom-green-alive">
        <div className="flex justify-center">
          {match.highlighted ? (
            <Star className={""} />
          ) : (
            <StarOff className={""} />
          )}
        </div>
      </td>
      <td className="px-1">
        <button
          className={`text-custom-white border-custom-green-fluor text-sm font-semibold border rounded-lg p-2 ${
            isPending ? "bg-gray-600" : "bg-custom-green-alive"
          }`}
          type="submit"
          form={`prediction-form-${match.id}`}
          aria-disabled={isPending}
          disabled={isPending}
        >
          Crear
        </button>
      </td>
    </tr>
  );
}
