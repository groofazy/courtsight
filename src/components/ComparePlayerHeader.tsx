import PlayerImage from "@/components/PlayerImage";

interface ComparePlayerHeaderProps {
  player: any;
  align?: "left" | "right";
  isWinner?: boolean;
}

export default function ComparePlayerHeader({ 
  player, 
  align = "left", 
  isWinner 
}: ComparePlayerHeaderProps) {
  return (
    <div className={`space-y-6 ${align === "right" ? "text-right" : "text-left"}`}>
      <div className="relative">
        <PlayerImage 
          src={player.imageUrl} 
          name={player.name} 
          className={`w-full aspect-[3/4] rounded-2xl border transition-all duration-700 ${
            isWinner 
              ? "border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.15)]" 
              : "border-zinc-800"
          }`} 
        />
        {isWinner && (
          <div className={`absolute -top-3 ${align === "right" ? "-right-3" : "-left-3"} bg-emerald-500 text-black font-audiowide text-[10px] px-3 py-1 rounded-full italic uppercase shadow-lg z-10`}>
            Lead Prospect
          </div>
        )}
      </div>
      <div>
        <h2 className="font-audiowide text-4xl uppercase italic leading-none tracking-tighter text-white">
          {player.name}
        </h2>
        <p className="text-emerald-500 text-xs font-bold uppercase mt-4 tracking-widest font-audiowide">
          {player.aiArchetype}
        </p>
        <div className={`mt-3 flex gap-2 items-center text-zinc-600 text-[10px] font-bold uppercase tracking-tighter ${align === "right" ? "justify-end" : "justify-start"}`}>
          <span>#{player.jersey}</span>
          <span>•</span>
          <span>{player.bio.position}</span>
          <span>•</span>
          <span>{player.bio.school}</span>
        </div>
      </div>
    </div>
  );
}