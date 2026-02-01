"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import players from "@data/players.json";
import PlayerImage from "@/components/PlayerImage";
import Link from "next/link";
import { 
  ArrowLeft, 
  Activity, 
  Info, 
  Crosshair, 
  Shield, 
  NotebookPen 
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { useBookmarks } from "@/hooks/useBookmarks";

/**
 * 1. RADAR CHART COMPONENT
 */
function ComparisonRadar({ p1, p2 }: { p1: any, p2: any }) {
  const data = [
    { 
      subject: 'Scoring', 
      A: Math.min(p1.stats.ppg * 3.5, 100), 
      B: Math.min(p2.stats.ppg * 3.5, 100) 
    },
    { 
      subject: 'Playmaking', 
      A: Math.min(p1.stats.apg * 12, 100), 
      B: Math.min(p2.stats.apg * 12, 100) 
    },
    { 
      subject: 'Defense', 
      A: Math.min((p1.stats.spg + p1.stats.bpg) * 18, 100), 
      B: Math.min((p2.stats.spg + p2.stats.bpg) * 18, 100) 
    },
    { 
      subject: 'Physicals', 
      A: parseFloat(p1.bio.wingspan) * 10 || 70, 
      B: parseFloat(p2.bio.wingspan) * 10 || 70 
    },
    { 
      subject: 'Efficiency', 
      A: (p1.stats.shooting.fg + p1.stats.shooting.threeP) / 1.1, 
      B: (p2.stats.shooting.fg + p2.stats.shooting.threeP) / 1.1 
    },
  ];

  return (
    <div className="h-[450px] w-full bg-zinc-900/10 rounded-3xl border border-zinc-900/50 my-4 p-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-audiowide text-[10rem] text-zinc-900/30 italic select-none uppercase">VS</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 'bold' }} />
          <Radar name={p1.name} dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
          <Radar name={p2.name} dataKey="B" stroke="#ffffff" fill="#ffffff" fillOpacity={0.1} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * 2. MAIN CONTENT COMPONENT
 */
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
          <PlayerHeader player={p1} align="left" isWinner={p1.stats.ppg > p2.stats.ppg} />
        </div>

        <div className="lg:col-span-6">
          <ComparisonRadar p1={p1} p2={p2} />
        </div>

        <div className="lg:col-span-3">
          <PlayerHeader player={p2} align="right" isWinner={p2.stats.ppg > p1.stats.ppg} />
        </div>
      </div>

      {/* Categorized Detailed Analysis */}
      <div className="max-w-4xl mx-auto space-y-16 pb-32">
        
        {/* Scout Observations Section */}
        <StatSection title="Scout Observations" icon={<NotebookPen size={14}/>}>
          <div className="grid grid-cols-2 gap-0 divide-x divide-zinc-800">
            <div className="p-8 bg-emerald-500/[0.02]">
              <p className="text-[9px] text-emerald-500/50 uppercase font-bold mb-4 tracking-widest font-audiowide">Notes on {p1.name}</p>
              <p className="text-sm text-zinc-400 italic leading-relaxed">
                {notes[p1.id] ? `"${notes[p1.id]}"` : "No specific notes recorded for this prospect."}
              </p>
            </div>
            <div className="p-8 text-right bg-white/[0.01]">
              <p className="text-[9px] text-zinc-600 uppercase font-bold mb-4 tracking-widest font-audiowide">Notes on {p2.name}</p>
              <p className="text-sm text-zinc-400 italic leading-relaxed">
                {notes[p2.id] ? `"${notes[p2.id]}"` : "No specific notes recorded for this prospect."}
              </p>
            </div>
          </div>
        </StatSection>

        <StatSection title="Bio & Academic Profile" icon={<Info size={14}/>}>
          <ComparisonRow label="GPA" val1={p1.bio.gpa} val2={p2.bio.gpa} highlight={getStatClass} />
          <ComparisonRow label="Height" val1={p1.bio.height} val2={p2.bio.height} isText />
          <ComparisonRow label="Wingspan" val1={p1.bio.wingspan} val2={p2.bio.wingspan} isText />
          <ComparisonRow label="Weight" val1={p1.bio.weight} val2={p2.bio.weight} isText />
        </StatSection>

        <StatSection title="Offensive Production" icon={<Crosshair size={14}/>}>
          <ComparisonRow label="Points Per Game" val1={p1.stats.ppg} val2={p2.stats.ppg} highlight={getStatClass} />
          <ComparisonRow label="Assists Per Game" val1={p1.stats.apg} val2={p2.stats.apg} highlight={getStatClass} />
          <ComparisonRow label="FG %" val1={p1.stats.shooting.fg} val2={p2.stats.shooting.fg} highlight={getStatClass} />
          <ComparisonRow label="3P %" val1={p1.stats.shooting.threeP} val2={p2.stats.shooting.threeP} highlight={getStatClass} />
          <ComparisonRow label="FT %" val1={p1.stats.shooting.ft} val2={p2.stats.shooting.ft} highlight={getStatClass} />
        </StatSection>

        <StatSection title="Defensive Impact" icon={<Shield size={14}/>}>
          <ComparisonRow label="Rebounds Per Game" val1={p1.stats.rpg} val2={p2.stats.rpg} highlight={getStatClass} />
          <ComparisonRow label="Steals Per Game" val1={p1.stats.spg} val2={p2.stats.spg} highlight={getStatClass} />
          <ComparisonRow label="Blocks Per Game" val1={p1.stats.bpg} val2={p2.stats.bpg} highlight={getStatClass} />
        </StatSection>

        <StatSection title="Advanced Analytics" icon={<Activity size={14}/>}>
          <ComparisonRow label="AST/TO Ratio" val1={p1.stats.astToTurnover} val2={p2.stats.astToTurnover} highlight={getStatClass} />
          <ComparisonRow label="Star Rating" val1={p1.starRating} val2={p2.starRating} highlight={getStatClass} />
        </StatSection>

      </div>
    </div>
  );
}

/**
 * 3. EXPORT
 */
export default function ComparePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24 leading-normal">
      <Suspense fallback={<div className="text-center py-40 font-audiowide animate-pulse text-emerald-500 uppercase tracking-widest text-xs italic">Initializing Comparison Engine...</div>}>
        <CompareContent />
      </Suspense>
    </main>
  );
}

/**
 * 4. UI HELPERS
 */
function StatSection({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
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

function ComparisonRow({ label, val1, val2, highlight, isText = false }: any) {
  return (
    <div className="grid grid-cols-3 py-5 border-b border-zinc-900/50 items-center group hover:bg-emerald-500/[0.03] transition-colors px-8">
      <div className={`text-2xl font-audiowide ${!isText ? highlight(val1, val2) : "text-zinc-100"}`}>
        {val1}
      </div>
      <div className="text-center">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] mb-0.5">{label}</p>
        <div className="h-[1px] w-4 bg-zinc-800 mx-auto" />
      </div>
      <div className={`text-2xl font-audiowide text-right ${!isText ? highlight(val2, val1) : "text-zinc-100"}`}>
        {val2}
      </div>
    </div>
  );
}

function PlayerHeader({ player, align = "left", isWinner }: any) {
  return (
    <div className={`space-y-6 ${align === "right" ? "text-right" : "text-left"}`}>
      <div className="relative">
        <PlayerImage 
          src={player.imageUrl} 
          name={player.name} 
          className={`w-full aspect-[3/4] rounded-2xl border transition-all duration-700 ${
            isWinner 
              ? "border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.15)]" 
              : "border-zinc-800"
          }`} 
        />
        {isWinner && (
          <div className={`absolute -top-3 ${align === "right" ? "-right-3" : "-left-3"} bg-emerald-500 text-black font-audiowide text-[10px] px-3 py-1 rounded-full italic uppercase shadow-lg z-10`}>
            Lead Prospect
          </div>
        )}
      </div>
      <div>
        <h2 className="font-audiowide text-4xl uppercase italic leading-none tracking-tighter text-white">
          {player.name}
        </h2>
        <p className="text-emerald-500 text-xs font-bold uppercase mt-4 tracking-widest font-audiowide">
          {player.aiArchetype}
        </p>
        <div className={`mt-3 flex gap-2 items-center text-zinc-600 text-[10px] font-bold uppercase tracking-tighter ${align === "right" ? "justify-end" : "justify-start"}`}>
          <span>#{player.jersey}</span>
          <span>•</span>
          <span>{player.bio.position}</span>
          <span>•</span>
          <span>{player.bio.school}</span>
        </div>
      </div>
    </div>
  );
}