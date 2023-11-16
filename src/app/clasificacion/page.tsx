import api from "@/api";

export default async function Clasificacion() {
  const ranking = await api.leaderboard.getOverall();

  console.log(ranking);

  return (
    <main className="w-full h-full p-10">
      <div className="h-max bg-white absolute">
        <table className="w-full bg-white rounded-lg overflow-hidden table-fixed">
          <thead className="bg-black text-white">
            <tr className="h-16">
              <th>Rank</th>
              <th>Equipo</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map(({id, name, points, members}, i) => (
              <tr key={id}>
                <td>{i + 1}</td>
                <td>{name}</td>
                <td>{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
