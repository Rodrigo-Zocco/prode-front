import { Team } from "@/lib/definitions";
import { DeleteTeam } from "./buttons";

export default function TeamsTable({ teams }: { teams: Team[] }) {
  return (
    <div>
      {" "}
      <h1 className="text-xl text-custom-yellow-light font-bold text-center">
        Lista de equipos
      </h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full  border border-gray-300">
          <thead>
            <tr className="bg-custom-black text-custom-white text-sm">
              <th className="border border-custom-gray-obscure">Logo</th>
              <th className="border border-custom-gray-obscure">Nombre</th>
              <th className="border border-custom-gray-obscure">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <tr
                  key={team.id}
                  className={
                    index % 2 === 0
                      ? "bg-custom-gray-slight"
                      : "bg-custom-white-palid"
                  }
                >
                  <td className="border border-custom-gray-obscure p-2">
                    <img
                      src={team.logoUrl}
                      alt={`logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </td>
                  <td className="border border-custom-gray-obscure p-2 font-medium">
                    {team.name}
                  </td>
                  <td className="border border-custom-gray-obscure p-2">
                    <DeleteTeam key={team.id} id={team.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border border-custom-gray-obscure bg-custom-gray-slight p-4 text-center"
                >
                  No hay equipos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
