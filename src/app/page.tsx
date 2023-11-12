import TextCard from "@/components/text-card";
import {teko} from "@/fonts";

export default function Home() {
  return (
    <main className="flex w-full h-full">
      <section className="flex flex-col justify-center gap-10 md:w-[500px] w-[335px] m-auto">
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
          className="mr-auto bg-[#050808]/90  text-white p-4 rounded-full text-lg font-semibold cursor-pointer hover:scale-105"
          href="/"
        >
          Ver clasificación
        </a>
      </section>
    </main>
  );
}
