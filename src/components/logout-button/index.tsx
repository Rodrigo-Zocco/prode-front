"use client";

import { logout } from "@/lib/auth";

export default function LogoutButton() {

  return <button onClick={() => logout()}>Cerrar sesion</button>;
}
