"use client";
import { League } from "@/lib/definitions";
import { useState } from "react";
import Dropdown from "../ui/dropdown";
import LeagueTerms from "../league-terms";

const HeadData = ({ text }: { text: string }) => {
  return (
    <th className="border-2 border-custom-gray-obscure font-medium px-1">
      {text}
    </th>
  );
};

export default function RoundsResults({ league }: { league: League }) {
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);

  const headText = ["#", "Usuario", "PTS", "PJ", "PA", "RA"];

  const rounds = league.rounds?.map((round) => ({
    label: round.description,
    value: round.id,
  }));

  const selectedResult = league.rounds?.find((r) => r.id === selectedRoundId);

  return (
    <>
      <Dropdown
        placeholder="Elegí una fecha"
        items={rounds!}
        onChange={(selectedRound) => setSelectedRoundId(selectedRound)}
      />
      {selectedResult && (
        <>
          <table className="w-full">
            <thead>
              <tr className="text-custom-white bg-custom-black">
                {headText.map((text) => (
                  <HeadData key={text} text={text} />
                ))}
              </tr>
            </thead>
            <tbody className="font-medium text-center">
              {selectedResult?.roundResults.length === 0 && (
                <tr
                  className={`border-2 border-custom-gray-obscure bg-custom-gray-slight`}
                >
                  <td colSpan={6}>Todavía no hay resultados.</td>
                </tr>
              )}
              {selectedResult?.roundResults.map((result, idx) => (
                <tr
                  key={result.id}
                  className={`border-2 border-custom-gray-obscure ${
                    idx % 2 === 0
                      ? "bg-custom-gray-slight"
                      : "bg-custom-white-palid"
                  }`}
                >
                  <td
                    className={` ${
                      [1, 2, 3].includes(idx + 1) && "bg-custom-green-light"
                    }`}
                  >
                    {idx + 1}
                  </td>
                  <td className="border-2 border-custom-gray-obscure break-all text-left">
                    {result.user.username}
                  </td>
                  <td className="border-2 border-custom-gray-obscure">
                    {result.points}
                  </td>
                  <td className="border-2 border-custom-gray-obscure">
                    {result.playedGames}
                  </td>
                  <td className="border-2 border-custom-gray-obscure">
                    {result.resultsPredicted}
                  </td>
                  <td className="border-2 border-custom-gray-obscure">
                    {result.allPredicted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <LeagueTerms />
        </>
      )}
    </>
  );
}
