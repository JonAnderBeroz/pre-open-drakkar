import {rockSalt} from "@/fonts";

export default function Blackboard({children}: {children: React.ReactNode}) {
  return (
    <section
      className={`flex flex-col gap-8 w-full md:w-max h-96 md:aspect-video m-auto py-5 px-10 bg-white rounded-lg border-4 border-zinc-700 ${rockSalt.className}`}
    >
      {children}
    </section>
  );
}
