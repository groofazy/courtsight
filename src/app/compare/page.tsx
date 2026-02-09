"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import players from "@data/players.json";
import Link from "next/link";
import { 
  ArrowLeft, 
  Activity, 
  Info, 
  Crosshair, 
  Shield, 
  NotebookPen 
} from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import ComparisonRadarChart from "@/components/ComparisonRadarChart";
import ComparePlayerHeader from "@/components/ComparePlayerHeader";
import CompareStatSection from "@/components/CompareStatSection";
import CompareStatRow from "@/components/CompareStatRow";
import ScoutNotesSection from "@/components/ScoutNotesSection";

function CompareContent() {
  const searchParams = useSearchParams();
  const { notes } = useBookmarks();
  const p1Id = searchParams.get("p1");
  const p2Id = searchParams.get("p2");

  const p1 = players.find((p) => p.id === p1Id);
  const p2 = players.find((p) => p.id === p2Id);

  if (!p1 || !p2) return (
    <div className="text-center py-40">
      <p className="text-zinc-500 font-audiowide mb-4 uppercase">Selection incomplete</p>
      <Link href="/bookmarks" className="text-emerald-500 underline uppercase text-xs">Return to shortlist</Link>
    </div>
  );

  const getStatClass = (val1: number, val2: number) => {
    if (val1 > val2) return "text-emerald-500 font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]";
    if (val1 < val2) return "text-zinc-600";
    return "text-zinc-300";
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Link href="/bookmarks" className="flex items-center gap-2 text-zinc-500 hover:text-emerald-500 mb-12 transition-colors">
        <ArrowLeft size={16} /> 
        <span className="text-xs font-audiowide uppercase italic">Back to Shortlist</span>
      </Link>

      {/* Hero Head-to-Head Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-3">
          <ComparePlayerHeader player={p1} align="left" isWinner={p1.stats.ppg > p2.stats.ppg} />
        </div>

        <div className="lg:col-span-6">
          <ComparisonRadarChart p1={p1} p2={p2} />
        </div>

        <div className="lg:col-span-3">
          <ComparePlayerHeader player={p2} align="right" isWinner={p2.stats.ppg > p1.stats.ppg} />
        </div>
      </div>

      {/* Categorized Detailed Analysis */}
      <div className="max-w-4xl mx-auto space-y-16 pb-32">
        
        {/* Scout Observations Section */}
        <CompareStatSection title="Scout Observations" icon={<NotebookPen size={14}/>}>
          <ScoutNotesSection 
            p1Name={p1.name}
            p2Name={p2.name}
            p1Id={p1.id}
            p2Id={p2.id}
            notes={notes}
          />
        </CompareStatSection>

        <CompareStatSection title="Bio & Academic Profile" icon={<Info size={14}/>}>
          <CompareStatRow label="GPA" val1={p1.bio.gpa} val2={p2.bio.gpa} highlight={getStatClass} />
          <CompareStatRow label="Height" val1={p1.bio.height} val2={p2.bio.height} isText />
          <CompareStatRow label="Wingspan" val1={p1.bio.wingspan} val2={p2.bio.wingspan} isText />
          <CompareStatRow label="Weight" val1={p1.bio.weight} val2={p2.bio.weight} isText />
        </CompareStatSection>

        <CompareStatSection title="Offensive Production" icon={<Crosshair size={14}/>}>
          <CompareStatRow label="Points Per Game" val1={p1.stats.ppg} val2={p2.stats.ppg} highlight={getStatClass} />
          <CompareStatRow label="Assists Per Game" val1={p1.stats.apg} val2={p2.stats.apg} highlight={getStatClass} />
          <CompareStatRow label="FG %" val1={p1.stats.shooting.fg} val2={p2.stats.shooting.fg} highlight={getStatClass} />
          <CompareStatRow label="3P %" val1={p1.stats.shooting.threeP} val2={p2.stats.shooting.threeP} highlight={getStatClass} />
          <CompareStatRow label="FT %" val1={p1.stats.shooting.ft} val2={p2.stats.shooting.ft} highlight={getStatClass} />
        </CompareStatSection>

        <CompareStatSection title="Defensive Impact" icon={<Shield size={14}/>}>
          <CompareStatRow label="Rebounds Per Game" val1={p1.stats.rpg} val2={p2.stats.rpg} highlight={getStatClass} />
          <CompareStatRow label="Steals Per Game" val1={p1.stats.spg} val2={p2.stats.spg} highlight={getStatClass} />
          <CompareStatRow label="Blocks Per Game" val1={p1.stats.bpg} val2={p2.stats.bpg} highlight={getStatClass} />
        </CompareStatSection>

        <CompareStatSection title="Advanced Analytics" icon={<Activity size={14}/>}>
          <CompareStatRow label="AST/TO Ratio" val1={p1.stats.astToTurnover} val2={p2.stats.astToTurnover} highlight={getStatClass} />
          <CompareStatRow label="Star Rating" val1={p1.starRating} val2={p2.starRating} highlight={getStatClass} />
        </CompareStatSection>

      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24 leading-normal">
      <Suspense fallback={<div className="text-center py-40 font-audiowide animate-pulse text-emerald-500 uppercase tracking-widest text-xs italic">Initializing Comparison Engine...</div>}>
        <CompareContent />
      </Suspense>
    </main>
  );
}