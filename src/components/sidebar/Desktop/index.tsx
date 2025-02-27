import { League, SidebarLink as SidebarLinkType } from "@/lib/definitions";
import SidebarLink from "../SidebarLink";
import LeaguesDropdown from "../LeaguesDropdown";

export default function DesktopSidebar({
  links,
  leagues,
}: {
  links: SidebarLinkType[];
  leagues: League[];
}) {
  return (
    <nav className="hidden md:block w-64 p-4">
      <ul>
        {links.map((link) => (
          <SidebarLink key={link.id} link={link} className={"mb-2"} />
        ))}
      </ul>
      <LeaguesDropdown leagues={leagues} />
    </nav>
  );
}
