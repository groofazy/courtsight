"use client";
import PlayerCard from "@/components/PlayerCard";

interface BookmarkPlayerGridProps {
  savedPlayers: any[];
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
}

export default function BookmarkPlayerGrid({
  savedPlayers,
  selectedIds,
  onToggleSelection,
}: BookmarkPlayerGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {savedPlayers.map(player => (
        <div 
          key={player.id} 
          onClick={() => onToggleSelection(player.id)}
          className={`relative cursor-pointer transition-all duration-300 rounded-2xl ${
            selectedIds.includes(player.id) 
              ? "ring-2 ring-emerald-500 ring-offset-4 ring-offset-black scale-[0.98]" 
              : "opacity-80 hover:opacity-100"
          }`}
        >
          <div className="pointer-events-none">
            <PlayerCard player={player} />
          </div>
          {selectedIds.includes(player.id) && (
            <div className="absolute -top-2 -left-2 bg-emerald-500 text-black font-black text-[10px] h-6 w-6 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] z-40">
              {selectedIds.indexOf(player.id) + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}