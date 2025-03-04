import Link from "next/link";

type ProdeSection = "historial" | "partidos";

export default function ProdeSection({ section }: { section: ProdeSection }) {
  return (
    <div className="mt-6 flex w-full text-white font-bold text-xl text-center">
      <Link
        href={"partidos"}
        className={`flex-1 hover:cursor-pointer border-b-2 ${
          section === "partidos"
            ? `text-custom-green-fluor border-custom-green-fluor`
            : "border-custom-gray-obscure"
        }`}
      >
        Partidos
      </Link>
      <Link
        href={"historial"}
        className={`flex-1 hover:cursor-pointer border-b-2 ${
          section === "historial"
            ? `text-custom-green-fluor border-custom-green-fluor`
            : "border-custom-gray-obscure"
        }`}
      >
        Historial
      </Link>
    </div>
  );
}
