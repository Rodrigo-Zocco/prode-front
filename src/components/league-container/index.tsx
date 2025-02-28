"use client";

import { useLeague } from "@/hooks/use-league";

export default function LeagueContainer({
  children,
}: {
  children: React.ReactNode[];
}) {
  const { isMatchesOpen, isResultsTableOpen, openMatches, openResultsTable } =
    useLeague();

  return (
    <div className="mt-6">
      {children[0]}
      <div className="flex w-full p-2 text-white font-bold text-xl">
        <button
          type="button"
          onClick={() => openMatches()}
          className={`flex-1 hover:cursor-pointer border-b-2 ${
            isMatchesOpen
              ? `text-custom-green-fluor border-custom-green-fluor`
              : "border-custom-gray-obscure"
          }`}
        >
          LISTA DE PARTIDOS
        </button>
        <button
          type="button"
          onClick={() => openResultsTable()}
          className={`flex-1 hover:cursor-pointer border-b-2 ${
            isResultsTableOpen
              ? `text-custom-green-fluor border-custom-green-fluor`
              : "border-custom-gray-obscure"
          }`}
        >
          TABLA DE POSICIONES
        </button>
      </div>
      <div className="mb-6">
        {isMatchesOpen && children[1]}
        {isResultsTableOpen && children[2]}
      </div>
    </div>
  );
}
