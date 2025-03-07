import AllAwardsLayout from "@/components/all-awards-layout";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default async function Premios({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <AllAwardsLayout currentPage={currentPage} />
      </Suspense>
    </main>
  );
}
