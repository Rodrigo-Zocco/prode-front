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
          link.href === pathName
            ? "text-custom-green-slight"
            : "text-white hover:text-custom-green-slight"
        }`}
        onClick={onMobileClick}
      >
        {link.label}
      </Link>
    </li>
  );
}
