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

          {/* New Star Rating Row */}
          <div className="flex items-center gap-2 mt-1 mb-2">
            <StarRating rating={player.starRating} />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Prospect
            </span>
          </div>

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

      {/* The isolated AI section
      <div>
        <ScoutReport
        player={player}/>
      </div> */}
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-zinc-300 stroke-zinc-300"
          }`}
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ))}
    </div>
  );
}
