"use client";

import { League } from "@/lib/definitions";
import Link from "next/link";
import { useState } from "react";
import Chevron from "../icons/Chevron";
import { usePathname } from "next/navigation";

export default function LeaguesDropdown({ leagues }: { leagues: League[] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer w-full text-left font-bold flex justify-between items-center ${
          isOpen
            ? "text-custom-green-slight"
            : "text-custom-white hover:text-custom-green-slight"
        } `}
      >
        LIGAS
        <span
          className={`transform transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <Chevron className="h-4 w-4" />
        </span>
      </button>
      <ul
        className={`overflow-scroll transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {leagues.map((league) => (
          <LeagueItem key={league.id} league={league} />
        ))}
      </ul>
    </div>
  );
}
// TODO: When a league is selected in mobile view, the Sidebar should be closed.
function LeagueItem({ league }: { league: League }) {
  const { id, name } = league;
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={`/ligas/${id}`}
        className={`flex items-center px-4 py-2 transition-colors duration-200 border-b border-custom-gray-obscure
          ${
            `/ligas/${league.id}` === pathName
              ? "text-custom-green-slight"
              : "text-white hover:text-custom-green-slight"
          }`}
      >
        {/* TODO: Should serve images from my API to prevent errors
          <Image
            src={logoUrl}
            width={24}
            height={24}
            alt={`Escudo de la liga ${league.name}`}
            className="mr-2"
          />
          */}
        {name}
      </Link>
    </li>
  );
}
