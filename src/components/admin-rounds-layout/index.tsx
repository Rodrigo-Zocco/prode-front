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
    <div className="space-y-2">
      <Dropdown
        items={dropdownLeaguesValues}
        placeholder="Elegí una Liga"
        onChange={(leagueId) => setSelectedLeagueId(leagueId)}
      />

      {selectedLeague && (
        <>
          <AddRoundForm
            leagueId={selectedLeague.id}
            leagueName={selectedLeague.name}
          />
          <RoundsTable
            leagueName={selectedLeague.name}
            rounds={selectedRounds}
          />
        </>
      )}
    </div>
  );
}
