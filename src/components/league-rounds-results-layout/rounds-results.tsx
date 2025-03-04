"use client";
import { League } from "@/lib/definitions";
import { useState } from "react";
import Dropdown from "../ui/dropdown";
import ResultsTable from "../results-table";

const HeadData = ({ text }: { text: string }) => {
  return (
    <th className="border-2 border-custom-gray-obscure font-medium px-1">
      {text}
    </th>
  );
};

export default function RoundsResults({ league }: { league: League }) {
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);

  const rounds = league.rounds?.map((round) => ({
    label: round.description,
    value: round.id,
  }));

  const selectedRound = league.rounds?.find((r) => r.id === selectedRoundId);

  return (
    <>
      <Dropdown
        placeholder="Elegí una fecha"
        items={rounds!}
        onChange={(selectedRound) => setSelectedRoundId(selectedRound)}
      />
      {selectedRound && <ResultsTable results={selectedRound.roundResults!} />}
    </>
  );
}
