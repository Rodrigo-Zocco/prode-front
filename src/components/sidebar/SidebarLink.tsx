"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarLink as SidebarLinkType } from "@/lib/definitions";
import Shield from "../icons/Shield";

export default function SidebarLink({
  link,
  className,
  onMobileClick = () => {},
}: {
  link: SidebarLinkType;
  className: string;
  onMobileClick?: () => void;
}) {
  const pathName = usePathname();

  const adminLabels = ["EQUIPOS", "LIGAS Y PARTIDOS"];

  return (
    <li className={className}>
      <Link
        href={link.href}
        className={`font-bold justify-center md:justify-normal flex ${
          link.disabled
            ? "pointer-events-none text-slate-400"
            : link.href === pathName
            ? "text-custom-green-slight"
            : "text-white hover:text-custom-green-slight"
        }`}
        aria-disabled={link.disabled}
        onClick={onMobileClick}
        tabIndex={link.disabled ? -1 : undefined}
      >
        {adminLabels.includes(link.label) && (
          <Shield className={"text-custom-yellow-light mr-1"} />
        )}
        {link.label}{" "}
      </Link>
    </li>
  );
}
