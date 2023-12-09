"use client";

import {DateTime, Duration, DurationObjectUnits} from "luxon";
import {useCallback, useEffect, useMemo, useState} from "react";

import {teko} from "@/fonts";

import {getDateDifference} from "@/utils";

import useInterval from "./hooks/useInterval";
import TimeSection from "./time-section";

const sections: Record<string, keyof DurationObjectUnits> = {
  semanas: "weeks",
  dias: "days",
  horas: "hours",
  minutos: "minutes",
  segundos: "seconds",
};

export default function Countdown({targetDate}: {targetDate: Date}) {
  const [time, setTime] = useState<Duration | null>();
  const target = useMemo(() => DateTime.fromJSDate(targetDate), [targetDate]);

  const updateTime = useCallback(() => {
    const dateDiff = getDateDifference(target, DateTime.now(), [
      ...Object.values(sections),
      "milliseconds",
    ]);

    setTime(dateDiff);
  }, [target]);

  useEffect(() => {
    updateTime();
  }, [updateTime]);

  useInterval(
    (): void => {
      if (!time) return;
      updateTime();
    },
    time && time.as("seconds") > 0 ? 1000 : null,
  );

  return (
    <section
      className={`text-[clamp(2rem,5vw,2.5rem)] flex flex-wrap justify-stretch self-center my-auto gap-5  bg-[#050808]/75 p-5 rounded-xl backdrop-blur-lg text-white ${teko.className}`}
    >
      {time &&
        Object.keys(sections).map((key, i) => (
          <TimeSection key={i}>
            {time[sections[key]]} <br /> {key}
          </TimeSection>
        ))}
    </section>
  );
}
