"use client";
import { useSearchParams } from "next/navigation";
import players from "@data/players.json";
import PlayerImage from "@/components/PlayerImage";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const p1Id = searchParams.get("p1");
  const p2Id = searchParams.get("p2");

  const p1 = players.find((p) => p.id === p1Id);
  const p2 = players.find((p) => p.id === p2Id);

  if (!p1 || !p2) return <div className="text-white p-20">Select two players to compare.</div>;

  // Helper to highlight the better stat
  const getStatClass = (val1: number, val2: number) => {
    if (val1 > val2) return "text-emerald-500 font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]";
    return "text-zinc-400";
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        <Link href="/bookmarks" className="flex items-center gap-2 text-zinc-500 hover:text-emerald-500 mb-8 transition-colors">
          <ArrowLeft size={16} /> <span className="text-xs font-audiowide uppercase italic">Back to Shortlist</span>
        </Link>

        <div className="grid grid-cols-3 gap-4 items-end mb-12">
          <PlayerHeader player={p1} />
          <div className="flex justify-center pb-10">
            <span className="font-audiowide text-4xl text-zinc-800 italic">VS</span>
          </div>
          <PlayerHeader player={p2} align="right" />
        </div>

        {/* Stat Comparison Table */}
        <div className="space-y-1 border-t border-zinc-900 pt-8">
          <ComparisonRow label="PPG" val1={p1.stats.ppg} val2={p2.stats.ppg} highlight={getStatClass} />
          <ComparisonRow label="RPG" val1={p1.stats.rpg} val2={p2.stats.rpg} highlight={getStatClass} />
          <ComparisonRow label="APG" val1={p1.stats.apg} val2={p2.stats.apg} highlight={getStatClass} />
          <ComparisonRow label="BPG" val1={p1.stats.bpg} val2={p2.stats.bpg} highlight={getStatClass} />
          <ComparisonRow label="GPA" val1={p1.bio.gpa} val2={p2.bio.gpa} highlight={getStatClass} />
          <ComparisonRow label="FG %" val1={p1.stats.shooting.fg} val2={p2.stats.shooting.fg} highlight={getStatClass} />
          <ComparisonRow label="3P %" val1={p1.stats.shooting.threeP} val2={p2.stats.shooting.threeP} highlight={getStatClass} />
        </div>
      </div>
    </main>
  );
}

function ComparisonRow({ label, val1, val2, highlight }: any) {
  return (
    <div className="grid grid-cols-3 py-4 border-b border-zinc-900 items-center group hover:bg-zinc-900/30 transition-colors px-4 rounded-xl">
      <div className={`text-xl font-audiowide ${highlight(val1, val2)}`}>{val1}</div>
      <div className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{label}</div>
      <div className={`text-xl font-audiowide text-right ${highlight(val2, val1)}`}>{val2}</div>
    </div>
  );
}

function PlayerHeader({ player, align = "left" }: any) {
  return (
    <div className={`space-y-4 ${align === "right" ? "text-right" : "text-left"}`}>
      <PlayerImage src={player.imageUrl} name={player.name} className="w-full aspect-square rounded-2xl border border-zinc-800" />
      <div>
        <h2 className="font-audiowide text-2xl uppercase italic leading-none">{player.name}</h2>
        <p className="text-emerald-500 text-xs font-bold uppercase mt-2">{player.aiArchetype}</p>
      </div>
    </div>
  );
}