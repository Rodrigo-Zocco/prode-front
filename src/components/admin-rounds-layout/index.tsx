"use client";

import { League, Round } from "@/lib/definitions";
import Dropdown from "../ui/dropdown";
import { useState } from "react";
import RoundsTable from "./rounds-table";
import AddRoundForm from "./add-round-form";

export default function AdminRoundslayout({
  leagues,
  rounds,
}: {
  leagues: League[];
  rounds: Round[];
}) {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);

  const dropdownLeaguesValues = leagues.map((l) => ({
    value: l.id,
    label: l.name,
  }));

  const selectedLeague = leagues.find((l) => l.id === selectedLeagueId);

  const selectedRounds = rounds.filter(
    (round) => round.leagueId === selectedLeagueId
  );

  return (
    <div>
      {" "}
      <h1 className="my-4 text-3xl text-custom-green-fluor font-bold text-center">
        ADMINISTRACION RONDAS
      </h1>
      <div className="space-y-4">
        <Dropdown
          items={dropdownLeaguesValues}
          placeholder="Elegí una Liga"
          onChange={(leagueId) => setSelectedLeagueId(leagueId)}
        />

        {selectedLeague && (
          <>
            <AddRoundForm leagueId={selectedLeague.id} />
            <RoundsTable
              leagueName={selectedLeague!.name}
              rounds={selectedRounds}
            />
          </>
        )}
      </div>
    </div>
  );
}
