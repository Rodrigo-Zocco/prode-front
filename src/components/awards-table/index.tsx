import { Award as AwardType } from "@/lib/definitions";
import Award from "./award";

export default function AwardsTable({ awards }: { awards: AwardType[] }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl my-4 text-custom-green-fluor font-bold text-center">
        TROFEOS
      </h1>
      <table className="w-full border-collapse border-2 border-custom-gray-obscure">
        <thead>
          <tr className="border-2 border-custom-gray-obscure font-medium sm:px-1 text-custom-white bg-custom-black">
            <th>Usuario</th>
            <th>Nombre</th>
            <th className="hidden sm:table-cell">Descripción</th>
            <th>Trofeo</th>
          </tr>
        </thead>
        <tbody className="font-medium text-center">
          {awards.map((award, i) => (
            <Award key={award.id} award={award} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
