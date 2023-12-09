import api from "@/api";
import Card from "@/components/card";

import ScoreForm from "./score-form";

export default async function Puntuacion() {
  const teams = await api.teams.getAll();
  const wods = await api.wod.getAll();

  async function createScore(formData: FormData) {
    "use server";
    const score = +formData.get("score")!.toString();
    const teamId = formData.get("teams")!.toString();
    const wodId = formData.get("wods")!.toString();

    const res = await api.score.create(score, teamId, wodId);

    console.log("Res", res);
  }

  return (
    <Card className="max-w-xl m-auto w-full p-10">
      <ScoreForm action={createScore} data={{teams, wods}} />
    </Card>
  );
}
