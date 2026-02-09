interface CompareStatRowProps {
  label: string;
  val1: number | string;
  val2: number | string;
  highlight?: (val1: any, val2: any) => string;
  isText?: boolean;
}

export default function CompareStatRow({ 
  label, 
  val1, 
  val2, 
  highlight, 
  isText = false 
}: CompareStatRowProps) {
  return (
    <div className="grid grid-cols-3 py-5 border-b border-zinc-900/50 items-center group hover:bg-emerald-500/[0.03] transition-colors px-8">
      <div className={`text-2xl font-audiowide ${!isText && highlight ? highlight(val1, val2) : "text-zinc-100"}`}>
        {val1}
      </div>
      <div className="text-center">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] mb-0.5">{label}</p>
        <div className="h-[1px] w-4 bg-zinc-800 mx-auto" />
      </div>
      <div className={`text-2xl font-audiowide text-right ${!isText && highlight ? highlight(val2, val1) : "text-zinc-100"}`}>
        {val2}
      </div>
    </div>
  );
}