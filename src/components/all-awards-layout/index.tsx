import { fetchAwards } from "@/lib/data";
import Pagination from "../ui/pagination";
import AwardsTable from "../awards-table";

export default async function AllAwardsLayout({
  currentPage,
}: {
  currentPage: number;
}) {
  const awards = await fetchAwards(currentPage);

  return (
    <>
      <AwardsTable awards={awards.awards} />
      <div className="flex justify-center my-3">
        {" "}
        <Pagination data={awards.pagination} />
      </div>
    </>
  );
}
