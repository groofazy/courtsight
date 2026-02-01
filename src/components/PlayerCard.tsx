// components/PlayerCard.tsx

import ScoutReport from "./ScoutReport";

// general data for PlayerCard component
interface PlayerInfo{
    player: {
    name: string;
    bio: {
        height: string;
        school: string;
        grad:string;
    };
    stats: {
        ppg: number;
        rpg: number;
        apg: number;
    };
    aiArchetype: string;
    starRating: number;
    };
}

export default function PlayerCard({player}: PlayerInfo) {
    return (
    <div className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:border-blue-500 transition-all shadow-sm">
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
        <StatItem label="PPG" value={player.stats.ppg} />
        <StatItem label="RPG" value={player.stats.rpg} />
        <StatItem label="APG" value={player.stats.apg} />
      </div>

      {/* AI Content Section */}
      <div className="mt-6 space-y-3">
        <AIField title="AI Archetype" content={player.aiArchetype} />
      </div>

      {/* The isolated AI section */}
      <div>
        <ScoutReport
        player={player}/>
      </div>
    </div>
  );
}

// Small "Sub-Components" for internal cleanup
function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[10px] uppercase text-zinc-400 font-bold">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function AIField({ title, content, isItalic = false }: { title: string; content: string; isItalic?: boolean }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-700/50 p-3 rounded-xl">
      <p className="text-[10px] font-bold text-zinc-400 uppercase">{title}</p>
      <p className={`text-sm font-medium text-zinc-700 dark:text-zinc-300 ${isItalic ? 'italic' : ''}`}>
        "{content}"
      </p>
    </div>
    );
}


