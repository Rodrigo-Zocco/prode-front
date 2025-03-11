import { deleteRound } from "@/lib/actions";
import TrashIcon from "../icons/TrashIcon";
import Link from "next/link";
import Ball from "../icons/Ball";

export function DeleteRound({ id }: { id: string }) {
  const deleteRoundWithId = deleteRound.bind(null, id);

  return (
    <form action={deleteRoundWithId}>
      <button className="flex rounded-md border p-2 bg-red-500 hover:bg-red-700">
        <p>Eliminar</p>
        <TrashIcon className="ml-2" />
      </button>
    </form>
  );
}

export function RoundMatchesLink({ roundId }: { roundId: string }) {
  return (
    <>
      <Link
        className="
  flex
  rounded-md
  border
  p-2
  bg-custom-yellow-light
  hover:bg-yellow-500"
        href={`/administracion/rondas/${roundId}`}
      >
        Partidos
        <Ball className={"ml-2"} />
      </Link>
    </>
  );
}
