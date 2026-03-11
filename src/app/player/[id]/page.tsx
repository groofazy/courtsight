import { notFound } from "next/navigation";
import ScoringTrends from "@/components/ScoringTrends";
import Link from "next/link";
import PlayerProfileHeader from "@/components/PlayerProfileHeader";
import AIScoutSection from "@/components/AIScoutSection";
import PlayerStatsTable from "@/components/PlayerStats";
import { createClient } from '@/utils/supabase/server';
import GameLog from "@/components/GameLog";

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
    .order('game_date', { foreignTable: 'game_stats', ascending: false })
    .single();

  if (error || !athlete) return notFound();

// Inside your PlayerProfile component...

  // 2. Calculate Averages from game_stats
  const statsArray = athlete.game_stats || [];
  const numGames = statsArray.length; // Dynamic count instead of hardcoded '4'

  const getAvg = (key: string) => 
    numGames > 0 
      ? (statsArray.reduce((acc: number, curr: any) => acc + (curr[key] || 0), 0) / numGames).toFixed(1) 
      : "0.0";

  const ppg = getAvg('points');
  const fpg = getAvg('fouls');
  const thrpg = getAvg('threes_made');
  const twopg = getAvg('twos_made');
  const ftpg = getAvg('free_throws_made');
  const ftattpg = getAvg('free_throws_attempted');

  // ... rest of your data mapping
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

  interface GameEntry {
    game_name: string;
    game_date: string;
    points: number;
    threes_made: number;
    twos_made: number;
    fouls: number;
    free_throws_made: number;      // Matches your profile page logic
    free_throws_attempted: number; // Matches your profile page logic
  }


  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Navigation & Brand Header */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <Link href="/" className="text-xl md:text-xl font-bold uppercase tracking-widest text-zinc-500 hover:text-emerald-500 transition-colors">
            ← Dashboard
          </Link>
          <h1 className="font-audiowide text-xl md:text-5xl lowercase text-white">courtsight</h1>
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
        {/* <PlayerStatsTable metrics={playerData} /> */}
        {/* 3. Stats Table & Detailed Log */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <PlayerStatsTable metrics={playerData} />
                  </div>
                  <div className="lg:col-span-2">
                    {/* Insert your new GameLog component here */}
                    <GameLog games={athlete.game_stats || []} />
                  </div>
                </div>

        {/* 4. AI Scout Evaluation */}
        <AIScoutSection player={athlete} />
      </div>
    </main>
  );
}