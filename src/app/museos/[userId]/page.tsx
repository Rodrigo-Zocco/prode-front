import MuseumLayout from "@/components/museum-layout";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default async function Museo({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ page?: number }>;
}) {
  const parameters = await params;
  const searchParameters = await searchParams;

  const userId = parameters.userId;
  const currentPage = Number(searchParameters?.page) || 1;

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <MuseumLayout userId={userId} currentPage={currentPage} />
      </Suspense>
    </main>
  );
}
