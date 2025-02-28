import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center text-center text-custom-white text-3xl font-bold">
      <h2>Error</h2>
      <p>La pagina buscada no existe</p>

      <Link
        className="mt-4 text-custom-white bg-custom-green-alive border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2"
        href="/"
      >
        Ir a la pagina principal
      </Link>
    </main>
  );
}
