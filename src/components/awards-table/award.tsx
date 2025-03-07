import { Award as AwardType } from "@/lib/definitions";
import Link from "next/link";

export default function Award({
  award,
  index,
}: {
  award: AwardType;
  index: number;
}) {
  return (
    <tr
      key={award.id}
      className={
        index % 2 === 0 ? "bg-custom-gray-slight" : "bg-custom-white-palid"
      }
    >
      <td className="border-2 border-custom-gray-obscure cursor-pointer hover:bg-gray-400">
        <Link href={`/museos/${award.user.id}`}>
          <p className="break-all text-left">{award.user.username}</p>
        </Link>
      </td>
      <td className="border-2 border-custom-gray-obscure">
        <p>{award.name}</p>
      </td>
      <td className="border-2 border-custom-gray-obscure hidden sm:table-cell">
        {award.description}
      </td>
      <td className="border-2 border-custom-gray-obscure">
        <div className="flex flex-col items-center">
          <img
            src={award.logoUrl}
            alt={`${award.name} logo`}
            width={60}
            height={60}
          />
        </div>
      </td>
    </tr>
  );
}
