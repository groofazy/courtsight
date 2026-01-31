import Image from "next/image";
import { promises as fs } from 'fs';
import path from 'path';
import { Analytics } from "@vercel/analytics/next";
import PlayerCard from "@/components/PlayerCard";

export default async function Home() {
  // 1. Fetching the local JSON data
  const filePath = path.join(process.cwd(), 'data/players.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  const players = JSON.parse(fileContent);

return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">CourtSight</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {players.map((player: any) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </main>
  );
}