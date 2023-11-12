export default function TextCard({children}: {children: React.ReactNode}) {
  return (
    <article className=" bg-neutral-400/60 backdrop-blur-sm rounded-lg p-5 md:w-[500px] w-[335px] ">
      {children}
    </article>
  );
}
