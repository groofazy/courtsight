import PlayerImage from "./PlayerImage";

// Match the detailed JSON structure exactly
interface PlayerInfo {
  player: {
    id: string;
    name: string;
    imageUrl?: string;
    jersey: string;
    bio: {
      height: string;
      wingspan: string;
      weight: string;
      school: string;
      clubTeam: string;
      gpa: number;
      grad: number; // Changed from string to number
      position: string;
      hand: string;
    };
    stats: {
      ppg: number;
      rpg: number;
      apg: number;
      spg: number;
      bpg: number;
      shooting: {
        fg: number;
        threeP: number;
        ft: number;
      };
      astToTurnover: number;
    };
    aiArchetype: string;
    starRating: number;
  };
}

export default function PlayerCard({ player }: PlayerInfo) {
  return (
    <div className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:border-blue-500 transition-all shadow-sm">

      <PlayerImage 
        src={player.imageUrl} 
        name={player.name} 
        className="w-full h-48 rounded-xl mb-4" 
      />

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-audiowide text-xl text-zinc-900 dark:text-white">
              {player.name}
            </h3>
            <span className="text-zinc-400 font-audiowide text-sm">#{player.jersey}</span>
          </div>

          <div className="flex items-center gap-2 mt-1 mb-2">
            <StarRating rating={player.starRating} />
            <span className="text-[10px] font-bold-audiowide text-zinc-400 uppercase tracking-widest">
              Prospect
            </span>
          </div>

          <p className="text-sm text-zinc-500">
            {player.bio.school} • Class of {player.bio.grad}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded uppercase tracking-wider">
            {player.bio.height}
          </span>
          <span className="text-[9px] text-zinc-400 font-medium">WS: {player.bio.wingspan}</span>
        </div>
      </div>

      {/* Stat Grid */}
      <div className="mt-6 flex justify-between border-t border-zinc-50 dark:border-zinc-700 pt-4">
        <StatItem label="PPG" value={player.stats.ppg} />
        <StatItem label="RPG" value={player.stats.rpg} />
        <StatItem label="APG" value={player.stats.apg} />
        {/* Added Defensive Stats to Card */}
        <StatItem label="BPG" value={player.stats.bpg} />
      </div>

      {/* AI Content Section */}
      <div className="mt-6 space-y-3">
        <AIField title="AI Archetype" content={player.aiArchetype} />
      </div>
    </div>
  );
}

// Small "Sub-Components" for internal cleanup
function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[10px] uppercase text-zinc-400 font-bold">{label}</p>
      <p className="text-lg font-semibold dark:text-zinc-100">{value}</p>
    </div>
  );
}

function AIField({ title, content, isItalic = false }: { title: string; content: string; isItalic?: boolean }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-700/50 p-3 rounded-xl">
      <p className="text-[10px] font-bold text-zinc-400 uppercase">{title}</p>
      <p className={`text-sm font-medium text-zinc-700 dark:text-zinc-300 ${isItalic ? 'italic' : ''}`}>
        {content}
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
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-zinc-300 stroke-zinc-300"}`}
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