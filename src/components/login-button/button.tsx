"use client";

import { login } from "@/lib/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export default function Button() {
  const [error, setError] = useState<string | null>(null);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        await login(code);
      } catch {
        setError("Login with Google error");
      }
    },
    onError: () => {
      console.error("Google log in error");
    },
  });

  return (
    <div>
      <button
        className="bg-yellow-500 text-black border-gray-500 text-lg p-2 my-4 border-2 rounded-lg"
        onClick={() => googleLogin()}
      >
        Google log in
      </button>
      <div className="text-red-500 text-sm">{error && <p>{error}</p>}</div>
    </div>
  );
}
