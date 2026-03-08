import { notFound } from "next/navigation";
import ScoringTrends from "@/components/ScoringTrends";
import Link from "next/link";
import PlayerProfileHeader from "@/components/PlayerProfileHeader";
import AIScoutSection from "@/components/AIScoutSection";
import PlayerStatsTable from "@/components/PlayerStats";
import { createClient } from '@/utils/supabase/server';

export default async function PlayerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Fetch data from the 'athletes' table (matching your SQL schema)
  const { data: athlete, error } = await supabase
    .from('athletes')
    .select(`
      *,
      game_stats (*) 
    `)
    .eq('id', id)
    .single();

  if (error || !athlete) return notFound();

  // 2. Calculate Averages from game_stats
  const statsArray = athlete.game_stats || [];
  const ppg = statsArray.length > 0 
    ? (statsArray.reduce((acc: number, curr: any) => acc + curr.points, 0) / 4).toFixed(1) 
    : "0.0";
  
  const fpg = statsArray.length > 0 
    ? (statsArray.reduce((acc: number, curr: any) => acc + curr.fouls, 0) / 4).toFixed(1) 
    : "0.0";

  const thrpg = statsArray.length > 0 
    ? (statsArray.reduce((acc: number, curr: any) => acc + curr.threes_made, 0) / 4).toFixed(1) 
    : "0.0";

  const twopg = statsArray.length > 0 
    ? (statsArray.reduce((acc: number, curr: any) => acc + curr.twos_made, 0) / 4).toFixed(1) 
    : "0.0";

  const ftpg = statsArray.length > 0 
    ? (statsArray.reduce((acc: number, curr: any) => acc + curr.free_throws_made, 0) / 4).toFixed(1) 
    : "0.0";

  const ftattpg = statsArray.length > 0 
    ? (statsArray.reduce((acc: number, curr: any) => acc + curr.free_throws_attempted, 0) / 4).toFixed(1) 
    : "0.0";
  // 3. Prepare data for the components (Mapping DB columns to UI)
  const playerData = [
    { label: "Points", value: ppg },
    { label: "Twos Made", value: twopg },
    { label: "Threes Made", value: thrpg },
    { label: "Free Throws Made", value: ftpg },
    { label: "Free Throws Attempted", value: ftattpg },
    { label: "Fouls", value: fpg }
    // { label: "Grad Year", value: athlete.grad_year.toString() },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Navigation & Brand Header */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <Link href="/" className="text-[14px] font-bold uppercase tracking-widest text-zinc-500 hover:text-emerald-500 transition-colors">
            ← Dashboard
          </Link>
          <h1 className="font-audiowide text-5xl lowercase text-white">hoopsight</h1>
        </div>

        {/* 1. Identity Row - Passing 'athlete' instead of 'player' */}
        <PlayerProfileHeader player={athlete} />

        {/* 2. Analytics Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            {/* Using game_stats for the trend graph */}
            <ScoringTrends data={athlete.game_stats || []} />
          </div>
        </section>

        {/* 3. Stats Table */}
        <PlayerStatsTable metrics={playerData} />

        {/* 4. AI Scout Evaluation */}
        <AIScoutSection player={athlete} />
      </div>
    </main>
  );
}