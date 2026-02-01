import { notFound } from "next/navigation";
import ScoutReport from "@/components/ScoutReport";
import ComparisonCarousel from "@/components/ComparisonCarousel";
import ScoringTrends from "@/components/ScoringTrends";
import PlayerImage from "@/components/PlayerImage";
import Link from "next/link";
import players from "@data/players.json";

export default async function PlayerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = players.find((p) => p.id === id);

  if (!player) return notFound();

  // Peer logic: Compare this player to others at their position
  const peers = players.filter((p) => p.bio.position === player.bio.position);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Navigation & Brand Header */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">
            ← Dashboard
          </Link>
          <h1 className="font-audiowide text-xl lowercase text-white">courtsight</h1>
        </div>

        {/* 1. Identity Row */}
        <section className="flex flex-col md:flex-row gap-8 items-end">
          <PlayerImage 
            src={player.imageUrl} 
            name={player.name} 
            className="w-48 h-48 rounded-3xl border border-zinc-800" 
          />
          <div className="space-y-2">
            <h1 className="font-audiowide text-6xl md:text-8xl uppercase tracking-tighter leading-none">
              {player.name}
            </h1>
            <div className="flex gap-4 items-center">
              <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-sm">
                #{player.jersey} • {player.bio.position}
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-700" />
              <p className="text-zinc-500 font-medium">
                {player.bio.school} • Class of {player.bio.grad}
              </p>
            </div>
          </div>
        </section>

        {/* 2. Analytics Row (Carousel & Graph) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ComparisonCarousel player={player} peers={peers} />
          <div className="lg:col-span-2">
             {/* Note: Ensure 'performanceHistory' exists in your JSON */}
            <ScoringTrends data={player.performanceHistory || []} />
          </div>
        </section>

        {/* 3. Deep Dive Data Table */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h3 className="font-audiowide text-lg lowercase">advanced metrics</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-800/50 text-zinc-500 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="px-8 py-4">Metric</th>
                <th className="px-8 py-4">Value</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <MetricRow label="Wingspan" value={player.bio.wingspan} status="Elite" />
              <MetricRow label="GPA" value={player.bio.gpa.toString()} status="High Academic" />
              <MetricRow label="True Shooting" value={`${player.stats.shooting.fg}%`} status="Above Avg" />
              <MetricRow label="AST/TO Ratio" value={player.stats.astToTurnover.toString()} status="Reliable" />
            </tbody>
          </table>
        </section>

        {/* 4. AI Scout Evaluation (The Gemini Section) */}
        <section className="rounded-3xl border border-blue-900/30 bg-blue-950/10 p-8 shadow-[0_0_50px_rgba(37,99,235,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <h2 className="text-xl font-bold font-audiowide lowercase">ai scouting report</h2>
          </div>
          <ScoutReport player={player} />
        </section>
      </div>
    </main>
  );
}

// Internal Helper for Table Rows
function MetricRow({ label, value, status }: { label: string; value: string; status: string }) {
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="px-8 py-4 font-medium text-zinc-400">{label}</td>
      <td className="px-8 py-4 font-bold text-white">{value}</td>
      <td className="px-8 py-4">
        <span className="text-[10px] font-bold text-blue-500 uppercase border border-blue-500/30 px-2 py-1 rounded">
          {status}
        </span>
      </td>
    </tr>
  );
}