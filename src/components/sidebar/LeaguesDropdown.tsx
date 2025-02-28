"use client";

import type { League } from "@/lib/definitions";
import Link from "next/link";
import { useState } from "react";
import Chevron from "../icons/Chevron";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";

export default function LeaguesDropdown({ leagues }: { leagues: League[] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full px-4 mb-20">
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
        className={`overflow-y-auto transition-all duration-500 ease-in-out md:overflow-visible ${
          isOpen ? "max-h-[50vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {leagues.map((league) => (
          <LeagueItem key={league.id} league={league} />
        ))}
      </ul>
    </div>
  );
}

function LeagueItem({ league }: { league: League }) {
  const { id, name } = league;
  const pathName = usePathname();
  const { closeSidebar } = useSidebar();

  return (
    <li>
      <Link
        href={`/ligas/${id}/partidos`}
        onClick={closeSidebar}
        className={`flex items-center px-4 py-2 transition-colors duration-200 border-b border-custom-gray-obscure
          ${
            pathName.includes(`/ligas/${league.id}`)
              ? "text-custom-green-slight"
              : "text-white hover:text-custom-green-slight"
          }`}
      >
        <img
          src={league.logoUrl}
          width={24}
          height={24}
          alt={`Escudo de la liga ${league.name}`}
          className="mr-2"
        />
        {name}
      </Link>
    </li>
  );
}
