"use client";

import CrossOff from "../../icons/CrossOff";
import type { League, SidebarLink as SidebarLinkType } from "@/lib/definitions";
import SidebarLink from "../SidebarLink";
import LeaguesDropdown from "../LeaguesDropdown";
import { useSidebar } from "@/context/sidebar-context";
import type { ProdeSession } from "@/lib/auth";
import LogoutButton from "@/components/logout-button";
import type React from "react";

export default function MobileSidebar({
  links,
  leagues,
  session,
  children,
}: {
  links: SidebarLinkType[];
  leagues: League[];
  session: ProdeSession | null;
  children: React.ReactNode;
}) {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      <div
        className={`fixed inset-0 bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      <nav
        id="mobile-sidebar"
        className={`fixed inset-0 text-white z-50 md:hidden
          transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="h-full w-full flex flex-col overflow-hidden">
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-white hover:text-blue-300 transition-colors"
            aria-label="Close menu"
          >
            <CrossOff className={"text-white"} />
          </button>

          <div className="flex flex-col items-center justify-start h-full overflow-y-auto py-16 pb-20">
            <div className="w-full p-4 text-center">
              {session ? (
                <>
                  <div className="flex flex-col text-custom-white font-bold">
                    <p>Bienvenido</p>
                    <p className="text-custom-green-fluor truncate mb-2">
                      {session.username}
                    </p>
                  </div>
                  <LogoutButton />
                </>
              ) : (
                <>{children}</>
              )}
            </div>
            <ul className="text-center mb-6 w-full">
              {links.map((link) => (
                <SidebarLink
                  key={link.id}
                  link={link}
                  className={"mb-6"}
                  onMobileClick={closeSidebar}
                />
              ))}
            </ul>
            <div className="w-full flex-shrink-0">
              <LeaguesDropdown leagues={leagues} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
