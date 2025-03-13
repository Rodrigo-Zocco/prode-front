import EditMatchLayout from "@/components/edit-match";
import Loading from "@/components/ui/loading";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ partidoId: string }>;
}) {
  const session = await getSession();

  if (!session || session.role !== "administrator") {
    redirect("/");
  }

  const matchId = (await params).partidoId;

  return (
    <Suspense fallback={<Loading />}>
      <EditMatchLayout matchId={matchId} />
    </Suspense>
  );
}
