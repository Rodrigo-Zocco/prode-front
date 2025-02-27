import { League, SidebarLink as SidebarLinkType } from "@/lib/definitions";
import SidebarLink from "../SidebarLink";
import LeaguesDropdown from "../LeaguesDropdown";
import { ProdeSession } from "@/lib/auth";
import LogoutButton from "@/components/logout-button";
import LoginButton from "@/components/login-button";

export default function DesktopSidebar({
  links,
  leagues,
  session,
}: {
  links: SidebarLinkType[];
  leagues: League[];
  session: ProdeSession | null;
}) {
  return (
    <nav className="hidden md:block w-64 p-4">
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
          <LoginButton />
        )}
      </div>
      <ul>
        {links.map((link) => (
          <SidebarLink key={link.id} link={link} className={"mb-2"} />
        ))}
      </ul>
      <LeaguesDropdown leagues={leagues} />
    </nav>
  );
}
