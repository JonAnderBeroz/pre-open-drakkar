import TextCard from "@/components/card";
import {teko} from "@/fonts";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-5 w-full h-full pt-5">
      <TextCard>
        <h1 className={`text-6xl ${teko.className} font-bold text-center`}>
          Pre <span className="text-white font-semibold">Open</span> <br /> Drakkar
          <span className="text-white font-semibold"> 2023</span>
        </h1>
        <p>
          Unos Open por parejas❤️, wods accesibles para todo el mundo💪🏼, pista de los wods los
          lunes📸, un directo por instagram los jueves para saber el wod ➕duelo entre dos parejas
          🫣 y los domingos día para hacer el wod
        </p>
      </TextCard>
      <a
        className="bg-[#050808]/90  text-white p-4 rounded-full text-lg font-semibold cursor-pointer hover:scale-105"
        href="/clasificacion"
      >
        Ver clasificación
      </a>
    </main>
  );
}
