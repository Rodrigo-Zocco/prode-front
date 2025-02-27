"use client";

import { useSidebar } from "@/context/sidebar-context";
import Burger from "../icons/Burger";
import Link from "next/link";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header
      id="sticky-bar"
      className="p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10"
    >
      <Link href={"/"}>
        <h1 className="font-bold text-3xl text-white hover:text-custom-green-slight transition-colors duration-200">
          PRODE
        </h1>
      </Link>
      <button onClick={toggleSidebar} className="md:hidden px-4 py-2">
        <Burger className={"text-white"} />
      </button>
    </header>
  );
}
