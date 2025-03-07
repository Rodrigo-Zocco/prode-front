import Link from "next/link";

type LeagueSection = "general-table" | "rounds-table";

export default function LeagueSection({ section }: { section: LeagueSection }) {
  return (
    <div className="mt-6 flex w-full text-white font-bold text-xl text-center">
      <Link
        href={"tabla-general"}
        className={`flex-1 hover:cursor-pointer border-b-2 ${
          section === "general-table"
            ? `text-custom-green-fluor border-custom-green-fluor`
            : "border-custom-gray-obscure"
        }`}
      >
        Tabla General
      </Link>
      <Link
        href={"tabla-rondas"}
        className={`flex-1 hover:cursor-pointer border-b-2 ${
          section === "rounds-table"
            ? `text-custom-green-fluor border-custom-green-fluor`
            : "border-custom-gray-obscure"
        }`}
      >
        Tabla De fechas
      </Link>
    </div>
  );
}
