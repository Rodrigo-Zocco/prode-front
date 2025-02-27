import { fetchLeagues } from "@/lib/data";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default async function Sidebar() {
  const links = [
    {
      id: 1,
      label: "INICIO",
      href: "/",
    },
    {
      id: 2,
      label: "JUGAR",
      href: "/prode",
    },
    {
      id: 3,
      label: "MUSEO",
      href: "/museos/userIdGoesHere",
    },
    {
      id: 4,
      label: "SALON DE LA FAMA",
      href: "/premios",
    },
  ];

  const leagues = await fetchLeagues();

  return (
    <>
      <Desktop links={links} leagues={leagues} />
      <Mobile links={links} leagues={leagues} />
    </>
  );
}
