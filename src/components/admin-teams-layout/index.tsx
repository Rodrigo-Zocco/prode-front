import AddTeamForm from "./add-team-form";

export default async function AdminTeamsLayout() {
  return (
    <>
      <h1 className="my-4 text-3xl text-custom-green-fluor font-bold">
        ADMINISTRACION
      </h1>
      <div className="space-y-20 mb-20">
        <div>
          <AddTeamForm />
        </div>
      </div>
    </>
  );
}
