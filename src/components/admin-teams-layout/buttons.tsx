import { deleteTeam } from "@/lib/actions";
import TrashIcon from "../icons/TrashIcon";

export function DeleteTeam({ id }: { id: number }) {
  const deleteTeamWithId = deleteTeam.bind(null, id);

  return (
    <form action={deleteTeamWithId}>
      <button className="flex rounded-md border p-2 hover:bg-red-500">
        <p>Eliminar</p>
        <TrashIcon className="ml-2" />
      </button>
    </form>
  );
}
