import { deleteRound } from "@/lib/actions";
import TrashIcon from "../icons/TrashIcon";

export function DeleteRound({ id }: { id: string }) {
  const deleteRoundWithId = deleteRound.bind(null, id);

  return (
    <form action={deleteRoundWithId}>
      <button className="flex rounded-md border p-2 hover:bg-red-500">
        <p>Eliminar</p>
        <TrashIcon className="ml-2" />
      </button>
    </form>
  );
}
