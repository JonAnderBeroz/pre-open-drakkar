import {randomUUID} from "crypto";

import api from "@/api";
import Blackboard from "@/components/blackboard";
import Countdown from "@/components/countdown/countdown";

export default async function Wod({params: {id}}: {params: {id: number}}) {
  const info = await api.wod.get(id);

  return (
    <>
      {false ? (
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
        <Countdown targetDate={new Date(2023, 10, 23, 12, 7)} />
      )}
    </>
  );
}
