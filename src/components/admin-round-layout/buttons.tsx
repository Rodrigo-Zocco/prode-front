import { MatchStatus } from "@/lib/definitions";
import { deleteMatch, generateRoundResults } from "@/lib/actions";
import TrashIcon from "../icons/TrashIcon";
import Ball from "../icons/Ball";
import Link from "next/link";

export default function MatchState({ status }: { status: MatchStatus }) {
  const translatedStatus = {
    waiting: { text: "En espera", color: "bg-yellow-500" },
    predictable: { text: "Pronosticable", color: "bg-green-500" },
    ongoing: { text: "En curso", color: "bg-blue-500" },
    finished: { text: "Finalizado", color: "bg-purple-500" },
    suspended: { text: "Suspendido", color: "bg-red-500" },
  };

  return (
    <p
      className={`text-custom-black font-semibold rounded-lg ${translatedStatus[status].color}`}
    >
      {translatedStatus[status].text}
    </p>
  );
}

export function DeleteMatch({ id }: { id: string }) {
  const deleteMatchWithId = deleteMatch.bind(null, id);

  return (
    <form action={deleteMatchWithId}>
      <button className="flex rounded-md border p-1 bg-red-500 hover:bg-red-700">
        <p>Eliminar</p>
        <TrashIcon className="ml-2" />
      </button>
    </form>
  );
}

export function GenerateResults({ roundId }: { roundId: string }) {
  const generateResultsWithRoundId = generateRoundResults.bind(null, roundId);

  return (
    <form action={generateResultsWithRoundId}>
      <button className="flex rounded-md border p-2 bg-custom-yellow-light font-semibold hover:bg-custom-green-fluor">
        <p>Generar resultados</p>
        <Ball className="ml-2" />
      </button>
    </form>
  );
}

export function EditMatch({ id }: { id: string }) {
  return (
    <Link
      href={`/administracion/partidos/${id}/editar`}
      className="rounded-md border p-1 bg-green-500 hover:bg-custom-green-alive"
    >
      Editar
    </Link>
  );
}
