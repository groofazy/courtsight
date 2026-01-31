import Image from "next/image";
import { promises as fs } from 'fs';
import path from 'path';
import { Analytics } from "@vercel/analytics/next";

export default async function Home() {
  // 1. Fetching the local JSON data
  const filePath = path.join(process.cwd(), 'data/players.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  const players = JSON.parse(fileContent);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="flex min-h-screen w-full max-w-4xl flex-col bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Area */}
        <header className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              CourtSight
            </h1>
            <p className="text-zinc-500 text-sm">NCAA DII & Local BC Recruitment</p>
          </div>
          <Image className="dark:invert" src="/next.svg" alt="Logo" width={80} height={16} />
        </header>

        {/* Player List Area */}
        <section className="p-8 grid gap-6">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Active Recruits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {players.map((player: any) => (
              <div key={player.id} className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:border-blue-500 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white">{player.name}</h3>
                    <p className="text-sm text-zinc-500">{player.bio.school} • Class of {player.bio.grad}</p>
                  </div>
                  <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded uppercase tracking-wider">
                    {player.bio.height}
                  </span>
                </div>

                {/* Stat Grid */}
                <div className="mt-6 flex gap-8 border-t border-zinc-50 dark:border-zinc-700 pt-4">
                  <div>
                    <p className="text-[10px] uppercase text-zinc-400 font-bold">PPG</p>
                    <p className="text-lg font-semibold">{player.stats.ppg}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-zinc-400 font-bold">RPG</p>
                    <p className="text-lg font-semibold">{player.stats.rpg}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-zinc-400 font-bold">APG</p>
                    <p className="text-lg font-semibold">{player.stats.apg}</p>
                  </div>
                </div>

                {/* AI Archetype Badge */}
                <div className="mt-4 bg-zinc-50 dark:bg-zinc-700/50 p-3 rounded-xl">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">AI Archetype</p>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 italic">
                    "{player.aiArchetype}"
                  </p>
                </div>

                <div className="mt-4 bg-zinc-50 dark:bg-zinc-700/50 p-3 rounded-xl">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">AI Summary</p>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 italic">
                    "{player.aiSummarization}"
                    </p>
                </div>

              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}