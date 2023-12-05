import {randomUUID} from "crypto";

import api from "@/api";
import Blackboard from "@/components/blackboard";
import Countdown from "@/components/countdown/countdown";
import config from "@/config";

export default async function Wod({params: {id}}: {params: {id: string}}) {
  const info = await api.wod.get(+id);
  const getOpenDate = (id: number): Date => {
    return config.wods.find((wod) => wod.id === id)?.openDate ?? new Date();
  };

  return (
    <>
      {getOpenDate(+id) < new Date() ? (
        <Blackboard>
          <h3>{`Wod 23.${id}`}</h3>
          <h4>{info?.type}</h4>
          <article className="flex flex-col justify-between flex-1">
            {info?.elements.split(",").map((el) => (
              <p key={randomUUID()}>
                <span className="font-semibold">*</span> {el.trim()}
              </p>
            ))}
          </article>
        </Blackboard>
      ) : (
        <Countdown targetDate={getOpenDate(+id)} />
      )}
    </>
  );
}
