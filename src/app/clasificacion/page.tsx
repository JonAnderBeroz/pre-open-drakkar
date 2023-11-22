import api from "@/api";

import {teko} from "@/fonts";

import Filter from "./filter";

export default async function Clasificacion({
  searchParams,
}: {
  searchParams: {[key: string]: number | undefined};
}) {
  const wod = searchParams.filter ?? 0;
  const ranking = await api.leaderboard.get(wod);

  return (
    <>
      <Filter selectedWod={wod} />
      <table className="w-full bg-white rounded-lg overflow-hidden table-fixed">
        <thead className={`bg-black text-white font-extrabold ${teko.className} text-2xl`}>
          <tr className="h-16">
            <th>Rank</th>
            <th>Equipo</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody className="text-center font-medium">
          {ranking.map(({id, name, points, members}, i) => (
            <tr key={id} className="h-12">
              <td>{i + 1}</td>
              <td>{`${name} (${members})`}</td>
              <td>{points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
