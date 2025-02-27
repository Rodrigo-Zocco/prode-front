"use client";

import { login } from "@/lib/auth";
import { useGoogleLogin } from "@react-oauth/google";

export default function Button() {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      await login(code);
    },
    onError: () => {
      console.error("Google log in error");
    },
  });

  return (
    <button
      className="text-custom-white bg-custom-green-alive border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2"
      onClick={() => googleLogin()}
    >
      Iniciar Sesión
    </button>
  );
}
