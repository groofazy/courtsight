import { ReactNode } from "react";

interface CompareStatSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function CompareStatSection({ 
  title, 
  icon, 
  children 
}: CompareStatSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 pl-2">
        <span className="text-emerald-500">{icon}</span>
        <h3 className="font-audiowide text-zinc-500 text-[10px] uppercase tracking-[0.4em]">
          {title}
        </h3>
      </div>
      <div className="bg-zinc-900/20 rounded-2xl border border-zinc-900/50 overflow-hidden backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}