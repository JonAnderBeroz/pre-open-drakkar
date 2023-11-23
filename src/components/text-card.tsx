export default function TextCard({
  children,
  className = "p-10 md:w-[500px] w-[335px]",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`bg-neutral-400/60 backdrop-blur-sm rounded-lg  ${className}`}>
      {children}
    </article>
  );
}
