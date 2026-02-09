import { notFound } from "next/navigation";
import ComparisonCarousel from "@/components/ComparisonCarousel";
import ScoringTrends from "@/components/ScoringTrends";
import Link from "next/link";
import players from "@data/players.json";
import PlayerProfileHeader from "@/components/PlayerProfileHeader";
import AdvancedMetricsTable from "@/components/AdvancedMetricsTable";
import AIScoutSection from "@/components/AIScoutSection";

export default async function PlayerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = players.find((p) => p.id === id);

  if (!player) return notFound();

  // Peer logic: Compare this player to others at their position
  const peers = players.filter((p) => p.bio.position === player.bio.position);

  // Prepare metrics data for the table
  const metricsData = [
    { label: "Wingspan", value: player.bio.wingspan, status: "Elite" },
    { label: "GPA", value: player.bio.gpa.toString(), status: "High Academic" },
    { label: "True Shooting", value: `${player.stats.shooting.fg}%`, status: "Above Avg" },
    { label: "AST/TO Ratio", value: player.stats.astToTurnover.toString(), status: "Reliable" },
  ];

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
        <PlayerProfileHeader player={player} />

        {/* 2. Analytics Row (Carousel & Graph) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ComparisonCarousel player={player} peers={peers} />
          <div className="lg:col-span-2">
            <ScoringTrends data={player.performanceHistory || []} />
          </div>
        </section>

        {/* 3. Deep Dive Data Table */}
        <AdvancedMetricsTable metrics={metricsData} />

        {/* 4. AI Scout Evaluation */}
        <AIScoutSection player={player} />
      </div>
    </main>
  );
}