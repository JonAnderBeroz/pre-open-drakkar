import {randomUUID} from "crypto";

import api from "@/api";
import {rockSalt} from "@/fonts";

export default async function Wod({params: {id}}: {params: {id: number}}) {
  const info = await api.wod.get(id);

  console.log(info);

  return (
    <main className="flex flex-row items-center justify-center w-full h-full p-10">
      <section
        className={`flex flex-col gap-5 md:h-full h-[350px] w-full md:max-w-[500px] py-5 px-10 bg-white rounded-lg border-4 border-zinc-700 aspect-video ${rockSalt.className}`}
      >
        <h3>{`Wod 23.${id}`}</h3>
        <h4>{info?.type}</h4>
        <article className="flex flex-col items flex-1 justify-evenly">
          {info?.elements.split(",").map((el) => <p key={randomUUID()}>{el.trim()}</p>)}
        </article>
      </section>
    </main>
  );
}
