import { fetchLeagues, fetchRounds } from "@/lib/data";
import LeaguesTable from "./leagues-table";
import AddLeagueForm from "./add-league-form";
import AdminRoundslayout from "../admin-rounds-layout";

export default async function AdminLeaguesLayout() {
  const leagues = await fetchLeagues();
  const rounds = await fetchRounds();

  return (
    <>
      <h1 className="my-4 text-3xl text-custom-green-fluor font-bold text-center">
        ADMINISTRACION LIGAS
      </h1>
      <div className="space-y-4">
        <AddLeagueForm />
        <LeaguesTable leagues={leagues} />
        <AdminRoundslayout leagues={leagues} rounds={rounds} />
      </div>
    </>
  );
}
