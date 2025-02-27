"use client";

import CrossOff from "../../icons/CrossOff";
import { League, SidebarLink as SidebarLinkType } from "@/lib/definitions";
import SidebarLink from "../SidebarLink";
import LeaguesDropdown from "../LeaguesDropdown";
import { useSidebar } from "@/context/sidebar-context";

export default function MobileSidebar({
  links,
  leagues,
}: {
  links: SidebarLinkType[];
  leagues: League[];
}) {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      <nav
        id="mobile-sidebar"
        className={`fixed inset-0 text-white z-50 flex flex-col items-center justify-center
          transform transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-white hover:text-blue-300 transition-colors"
          aria-label="Close menu"
        >
          <CrossOff className={"text-white"} />
        </button>
        <ul className="text-center">
          {links.map((link) => (
            <SidebarLink
              key={link.id}
              link={link}
              className={"mb-6"}
              onMobileClick={closeSidebar}
            />
          ))}
        </ul>
        <LeaguesDropdown leagues={leagues} />
      </nav>
    </>
  );
}
