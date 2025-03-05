"use client";

import { editPrediction } from "@/lib/actions";
import { Match } from "@/lib/definitions";
import { useActionState } from "react";
import Star from "../icons/Star";
import StarOff from "../icons/StarOff";

export default function EditPredictionForm({ match }: { match: Match }) {
  const editPredictionWithId = editPrediction.bind(
    null,
    match.predictions![0].id
  );
  const initialState = { message: null, errors: {} };
  // TODO: Fix the action state error below
  const [state, dispatch] = useActionState(editPredictionWithId, initialState);

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
        <form id={`edit-prediction-form-${match.id}`} action={dispatch}>
          <input
            className="max-w-8 text-center"
            type="number"
            name="homeTeamScore"
            defaultValue={match.predictions![0].homeTeamScore}
            aria-label={`${match.homeTeam.name} score`}
          />
          {state.errors?.homeTeamScore && (
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
          defaultValue={match.predictions![0].awayTeamScore}
          form={`edit-prediction-form-${match.id}`}
          aria-label={`${match.awayTeam.name} score`}
        />
        {state.errors?.awayTeamScore && (
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
          className="text-custom-black bg-custom-yellow-light border-custom-green-fluor text-sm font-semibold border rounded-lg p-2"
          type="submit"
          form={`edit-prediction-form-${match.id}`}
        >
          Editar
        </button>
      </td>

      {/*state.message && (
          <td
            className="border border-custom-gray-obscure bg-custom-white"
            colSpan={5}
          >
            <p className={state.errors ? "text-red-500" : "text-green-500"}>
              {state.message}
            </p>
          </td>
        )*/}
    </tr>
  );
}
