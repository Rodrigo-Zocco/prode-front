"use client";

import { logout } from "@/lib/auth";

export default function LogoutButton() {
  return (
    <button
      className="text-custom-white bg-custom-green-alive border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2"
      onClick={() => logout()}
    >
      Cerrar sesión
    </button>
  );
}
