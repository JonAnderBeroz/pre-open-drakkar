import {supabase} from "@/supabase";

export default async function Clasificacion() {
  const test = await supabase.from("teams").select();

  console.log(test);

  return (
    <main className="flex w-full h-full p-10">
      <table className="table-auto w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-black text-white">
          <tr>
            <th>Rank</th>
            <th>Equipo</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
          <tr>
            <td>patata</td>
            <td>patata</td>
            <td>patata</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
