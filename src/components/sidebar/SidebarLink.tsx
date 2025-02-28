"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarLink as SidebarLinkType } from "@/lib/definitions";

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

  return (
    <li className={className}>
      <Link
        href={link.href}
        className={`font-bold ${
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
        {link.label}
      </Link>
    </li>
  );
}
