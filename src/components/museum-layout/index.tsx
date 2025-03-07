import { fetchUserAwards } from "@/lib/data";
import Pagination from "../ui/pagination";
import MuseumTable from "./table";

export default async function MuseumLayout({
  currentPage,
  userId,
}: {
  currentPage: number;
  userId: string;
}) {
  const awards = await fetchUserAwards(userId, currentPage);

  return (
    <>
      <MuseumTable awards={awards.awards} />
      <div className="flex justify-center my-3">
        {" "}
        <Pagination data={awards.pagination} />
      </div>
    </>
  );
}
