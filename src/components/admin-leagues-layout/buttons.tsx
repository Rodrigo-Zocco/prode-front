import { deleteLeague } from "@/lib/actions";
import TrashIcon from "../icons/TrashIcon";

export function DeleteLeague({ id }: { id: string }) {
  const deleteLeagueWithId = deleteLeague.bind(null, id);

  return (
    <form action={deleteLeagueWithId}>
      <button className="flex rounded-md border p-2 hover:bg-red-500">
        <p>Eliminar</p>
        <TrashIcon className="ml-2" />
      </button>
    </form>
  );
}
