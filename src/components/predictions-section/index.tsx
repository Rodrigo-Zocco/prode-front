import { fetchUserPredictions } from "@/lib/data";
import LeaguePredictions from "./league-predictions";

export default async function PredictionsSection() {
  const userPredictions = await fetchUserPredictions();

  return (
    <>
      {userPredictions.map((l) => (
        <LeaguePredictions key={l.name} league={l} />
      ))}
    </>
  );
}
