import AdminRoundLayout from "@/components/admin-round-layout";
import Loading from "@/components/ui/loading";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ rondaId: string }>;
}) {
  const session = await getSession();

  if (!session || session.role !== "administrator") {
    redirect("/");
  }

  const roundId = (await params).rondaId;

  return (
    <Suspense fallback={<Loading />}>
      <AdminRoundLayout roundId={roundId} />
    </Suspense>
  );
}
