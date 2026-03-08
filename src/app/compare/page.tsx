"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from '@/utils/supabase/client';
import Link from "next/link";
// Fixed: GraduationCap must be PascalCase
import { ArrowLeft, Zap, Activity, GraduationCap } from "lucide-react";

import ComparePlayerHeader from "@/components/ComparePlayerHeader";
import CompareStatSection from "@/components/CompareStatSection";
import CompareStatRow from "@/components/CompareStatRow";

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-20 text-zinc-500 italic text-center">Loading comparison engine...</div>}>
      <CompareContent />
    </Suspense>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [athletes, setAthletes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const ids = searchParams.get("ids")?.split(",") || [];

  useEffect(() => {
    async function fetchComparisonData() {
      if (ids.length === 0) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('athletes')
        .select('*, game_stats (*)')
        .in('id', ids);

      if (!error && data) {
        const processed = data.map(athlete => {
          const stats = athlete.game_stats || [];
          const count = stats.length || 1;
          return {
            ...athlete,
            // Calculating averages from game_stats table
            ppg: (stats.reduce((acc: number, curr: any) => acc + curr.points, 0) / count).toFixed(1),
            rpg: (stats.reduce((acc: number, curr: any) => acc + curr.rebounds, 0) / count).toFixed(1),
            apg: (stats.reduce((acc: number, curr: any) => acc + curr.assists, 0) / count).toFixed(1),
          };
        });
        setAthletes(processed);
      }
      setLoading(false);
    }

    fetchComparisonData();
  }, [ids.join(","), supabase]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 italic">Syncing performance data...</div>;
  
  if (athletes.length < 2) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <p className="text-zinc-500">Select at least two prospects to compare.</p>
      <Link href="/" className="text-emerald-500 text-xs font-bold uppercase tracking-widest hover:underline">Return to Dashboard</Link>
    </div>
  );

  const [p1, p2] = athletes;

  // Logic to highlight the superior stat
  const highWins = (v1: any, v2: any) => parseFloat(v1) > parseFloat(v2) ? "text-emerald-500" : "text-zinc-500";

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Navigation */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-colors">
            <ArrowLeft size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Dashboard</span>
          </Link>
          <h1 className="font-audiowide text-4xl lowercase text-white">compare</h1>
        </div>

        {/* Player Headers */}
        <div className="grid grid-cols-2 gap-8 md:gap-24">
          <ComparePlayerHeader 
            player={p1} 
            align="left" 
            isWinner={parseFloat(p1.ppg) > parseFloat(p2.ppg)} 
          />
          <ComparePlayerHeader 
            player={p2} 
            align="right" 
            isWinner={parseFloat(p2.ppg) > parseFloat(p1.ppg)} 
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          
          <CompareStatSection title="Season Averages" icon={<Activity size={14} />}>
            <CompareStatRow label="Points (PPG)" val1={p1.ppg} val2={p2.ppg} highlight={highWins} />
            <CompareStatRow label="Rebounds (RPG)" val1={p1.rpg} val2={p2.rpg} highlight={highWins} />
            <CompareStatRow label="Assists (APG)" val1={p1.apg} val2={p2.apg} highlight={highWins} />
          </CompareStatSection>

          <CompareStatSection title="Physical Specs" icon={<Zap size={14} />}>
            <CompareStatRow label="Height" val1={p1.height} val2={p2.height} isText />
            <CompareStatRow label="Wingspan" val1={p1.wingspan} val2={p2.wingspan} isText />
            <CompareStatRow label="Weight" val1={p1.weight} val2={p2.weight} isText />
          </CompareStatSection>

          {/* Fixed Icon: GraduationCap */}
          <CompareStatSection title="Academics" icon={<GraduationCap size={14} />}>
            <CompareStatRow label="GPA" val1={p1.gpa} val2={p2.gpa} highlight={highWins} />
            <CompareStatRow label="Class" val1={p1.grad_year} val2={p2.grad_year} isText />
          </CompareStatSection>

        </div>
      </div>
    </main>
  );
}