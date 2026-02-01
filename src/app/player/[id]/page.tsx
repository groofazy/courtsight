import { notFound } from "next/navigation";
import ScoutReport from "@/components/ScoutReport";
import Link from "next/link";
import players from "@data/players.json";


export default async function PlayerProfile({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  
  // Find the player in your JSON
  const player = players.find((p) => p.id === id);

  if (!player) return notFound();

  return (
    <main className="min-h-screen bg-white p-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>

        <header className="mt-8 flex items-end justify-between border-b pb-6">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">{player.name}</h1>
            <p className="text-lg text-zinc-500">{player.bio.school} • Class of {player.bio.grad}</p>
          </div>
          <div className="text-right">
            <span className="rounded-full bg-zinc-100 px-4 py-1 text-sm font-bold dark:bg-zinc-800">
              {player.bio.height}
            </span>
          </div>
        </header>

        {/* Deep Dive Stats Section */}
        <section className="mt-8 grid grid-cols-3 gap-4">
          <StatBox label="Points" value={player.stats.ppg} />
          <StatBox label="Rebounds" value={player.stats.rpg} />
          <StatBox label="Assists" value={player.stats.apg} />
        </section>

        {/* The AI Scouting Section */}
        <section className="mt-12 rounded-3xl border border-zinc-100 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-bold">Pro Scout Evaluation</h2>
          <div className="mb-6">
             <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Archetype</span>
             <p className="text-lg font-medium">{player.aiArchetype}</p>
          </div>
          
          {/* This is where Gemini lives now */}
          <ScoutReport player={player} />
        </section>
      </div>
    </main>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 text-center dark:border-zinc-800">
      <p className="text-xs font-bold uppercase text-zinc-400">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}