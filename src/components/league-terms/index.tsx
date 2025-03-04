export default function LeagueTerms() {
  return (
    <table className="w-full sm:w-2/3">
      <tbody className="font-medium text-xs">
        <tr className="bg-custom-gray-slight">
          <td className="border-2 border-custom-gray-obscure">
            PTS: Puntos Totales
          </td>
        </tr>
        <tr className="bg-custom-white-palid">
          <td className="border-2 border-custom-gray-obscure">
            PJ: Partidos Jugados
          </td>
        </tr>
        <tr className="bg-custom-gray-slight">
          <td className="border-2 border-custom-gray-obscure">
            PA: Partidos Acertados (Se adivino el resultado)
          </td>
        </tr>
        <tr className="bg-custom-white-palid">
          <td className="border-2 border-custom-gray-obscure">
            <div className="flex flex-col">
              <p>RA: Resultados Acertados (Se adivino la cantidad de goles) </p>
              <span className="font-bold">*No incluye los PA</span>
            </div>
          </td>
        </tr>
        <tr className="bg-custom-white-palid">
          <td className="border-2 border-custom-gray-obscure">
            <div>
              <span className="bg-custom-green-light">Puestos de trofeos</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
