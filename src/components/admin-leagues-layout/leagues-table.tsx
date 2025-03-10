import { League } from "@/lib/definitions";
import { DeleteLeague } from "./buttons";

export default function LeaguesTable({ leagues }: { leagues: League[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <h1 className="text-custom-white my-2 font-bold">Ligas Disponibles</h1>
      <table className="w-full  border border-gray-300">
        <thead>
          <tr className="bg-custom-black text-custom-white text-sm">
            <th className="border border-custom-gray-obscure">Logo</th>
            <th className="border border-custom-gray-obscure">Nombre</th>
            <th className="border border-custom-gray-obscure">País</th>
            <th className="border border-custom-gray-obscure">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {leagues.length > 0 ? (
            leagues.map((league, index) => (
              <tr
                key={league.id}
                className={
                  index % 2 === 0
                    ? "bg-custom-gray-slight"
                    : "bg-custom-white-palid"
                }
              >
                <td className="border border-custom-gray-obscure p-2">
                  <img
                    src={league.logoUrl}
                    alt={`logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </td>
                <td className="border border-custom-gray-obscure p-2 font-medium">
                  {league.name}
                </td>
                <td className="border border-custom-gray-obscure p-2">
                  {league.country}
                </td>
                <td className="border border-custom-gray-obscure p-2">
                  <DeleteLeague key={league.id} id={league.id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="border border-custom-gray-obscure bg-custom-gray-slight p-4 text-center"
              >
                No hay ligas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
