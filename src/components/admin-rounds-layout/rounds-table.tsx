import { Round } from "@/lib/definitions";

export default function RoundsTable({
  leagueName,
  rounds,
}: {
  leagueName: string;
  rounds: Round[];
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full  border border-gray-300">
        <thead>
          <tr className="bg-custom-black text-custom-white text-sm">
            <th colSpan={3} className="border border-custom-gray-obscure">
              {leagueName} Rondas
            </th>
          </tr>
          <tr className="bg-custom-black text-custom-white text-sm">
            <th className="border border-custom-gray-obscure">Descripción</th>
            <th className="border border-custom-gray-obscure">
              Resultados Calculados
            </th>
            <th className="border border-custom-gray-obscure">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rounds.length > 0 ? (
            rounds.map((round, index) => (
              <tr
                key={round.id}
                className={
                  index % 2 === 0
                    ? "bg-custom-gray-slight"
                    : "bg-custom-white-palid"
                }
              >
                <td className="border border-custom-gray-obscure p-2 font-medium">
                  {round.description}
                </td>
                <td className="border border-custom-gray-obscure p-2">
                  {round.resultsCalculated ? "Calculados" : "Sin calcular"}
                </td>
                <td className="border border-custom-gray-obscure p-2">
                  Acciones
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="border border-custom-gray-obscure bg-custom-gray-slight p-4 text-center"
              >
                No hay Rondas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
