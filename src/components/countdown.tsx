"use client";

import {DateTime, Duration} from "luxon";
import {useEffect, useRef, useState} from "react";

import {teko} from "@/fonts";

import TextCard from "./text-card";
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (!delay) return;
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default function Countdown({targetDate}: {targetDate: Date}) {
  const [time, setTime] = useState<Duration | null>();
  const target = DateTime.fromJSDate(targetDate);

  function callback() {
    if (!time) return;
    setTime(target.diff(DateTime.now()).shiftToAll());
  }

  useEffect(() => {
    const diff = target
      .diff(DateTime.now())
      .shiftTo("weeks", "days", "hours", "minutes", "seconds", "millisecond");

    setTime(diff);
  }, []);

  useInterval(callback, time && time.as("seconds") > 0 ? 1000 : null);

  return (
    <section
      className={`text-[clamp(1rem,4vw,3rem)] grid grid-cols-[repeat(5,minmax(50px,1fr))] gap-5 my-auto bg-[#050808]/75 p-5 rounded-xl backdrop-blurlg text-white ${teko.className}`}
    >
      {time && (
        <>
          <article className="bg-neutral-400/60 backdrop-blur-sm rounded-lg p-5 text-center">
            {time.weeks} <br /> Semanas
          </article>
          <article className="bg-neutral-400/60 backdrop-blur-sm rounded-lg p-5 text-center">
            {time.days} <br /> Dias
          </article>
          <article className="bg-neutral-400/60 backdrop-blur-sm rounded-lg p-5 text-center">
            {time.hours} <br /> Horas
          </article>
          <article className="bg-neutral-400/60 backdrop-blur-sm rounded-lg p-5 text-center">
            {time.minutes} <br /> Minutos
          </article>
          <article className="bg-neutral-400/60 backdrop-blur-sm rounded-lg p-5 text-center">
            {time.seconds} <br /> Segundos
          </article>
        </>
      )}
    </section>
  );
}
