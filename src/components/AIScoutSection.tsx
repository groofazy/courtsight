import { ReactNode } from "react";
import ScoutReport from "@/components/ScoutReport";

interface AIScoutSectionProps {
  player: any;
}

export default function AIScoutSection({ player }: AIScoutSectionProps) {
  return (
    <section className="rounded-3xl border border-blue-900/30 bg-blue-950/10 p-8 shadow-[0_0_50px_rgba(37,99,235,0.05)]">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        <h2 className="text-xl font-bold font-audiowide lowercase">ai scouting report</h2>
      </div>
      <ScoutReport player={player} />
    </section>
  );
}