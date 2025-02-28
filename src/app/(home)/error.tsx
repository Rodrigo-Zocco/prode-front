"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Prode error: ", error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-custom-white text-3xl font-bold">
        Hubo un error
      </h2>
      <button
        className="mt-4 text-custom-white bg-custom-green-alive border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2"
        onClick={() => reset()}
      >
        Volver a intentar
      </button>
    </main>
  );
}
