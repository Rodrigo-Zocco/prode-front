import { fetchTeams } from "@/lib/data";
import AddTeamForm from "./add-team-form";
import TeamsTable from "./teams-table";

export default async function AdminTeamsLayout() {
  const teams = await fetchTeams();

  return (
    <>
      <h1 className="my-4 text-3xl text-custom-green-fluor font-bold">
        ADMINISTRACION
      </h1>
      <div className="space-y-20 mb-20">
        <AddTeamForm />
        <TeamsTable teams={teams} />
      </div>
    </>
  );
}
