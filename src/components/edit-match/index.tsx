import { fetchMatch } from "@/lib/data";
import EditMatchForm from "./edit-match-form";

export default async function EditMatchLayout({
  matchId,
}: {
  matchId: string;
}) {
  const match = await fetchMatch(matchId);

  return <EditMatchForm match={match} />;
}
