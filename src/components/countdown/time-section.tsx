import TextCard from "@/components/card";

export default function TimeSection({children}: {children: React.ReactNode}) {
  return (
    <TextCard className="md:p-5 min-h-[132px] min-w-[112px] max-w-[168px] text-center flex-1 flex items-center justify-center m-auto">
      {children}
    </TextCard>
  );
}
