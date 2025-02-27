import { fetchLeagues } from "@/lib/data";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { getSession } from "@/lib/auth";

export default async function Sidebar() {
  const session = await getSession();

  const dissableLinks = session ? false : true;

  const links = [
    {
      id: 1,
      label: "INICIO",
      href: "/",
      disabled: false,
    },
    {
      id: 2,
      label: "JUGAR",
      href: "/prode",
      disabled: dissableLinks,
    },
    {
      id: 3,
      label: "MUSEO",
      href: `/museos/${session?.userId ? session.userId : "none"}`,
      disabled: dissableLinks,
    },
    {
      id: 4,
      label: "SALON DE LA FAMA",
      href: "/premios",
      disabled: false,
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
