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
        ADMINISTRACION
      </h1>
      <div className="space-y-20 mb-20">
        <div>
        <h1 className="text-2xl text-custom-yellow-light font-bold">LIGAS</h1>
          <AddLeagueForm />
          <LeaguesTable leagues={leagues} />
        </div>
        <div>
          <h1 className="text-2xl text-custom-yellow-light font-bold">RONDAS Y PARTIDOS</h1>
          <AdminRoundslayout leagues={leagues} rounds={rounds} />
        </div>
      </div>
    </>
  );
}
