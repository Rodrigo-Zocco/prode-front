import { useState } from "react";

export function useLeague() {
  const [isResultsTableOpen, setIsResultsTableOpen] = useState(false);
  const [isMatchesOpen, setIsMatchesOpen] = useState(true);

  const openMatches = () => {
    setIsMatchesOpen(true);
    setIsResultsTableOpen(false);
  };

  const openResultsTable = () => {
    setIsResultsTableOpen(true);
    setIsMatchesOpen(false);
  };

  return { isResultsTableOpen, isMatchesOpen, openMatches, openResultsTable };
}
