"use client";
import { Star, NotebookPen } from "lucide-react";
import PlayerImage from "./PlayerImage";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useRouter } from "next/navigation";

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
      grad: number;
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
  const { bookmarks, toggleBookmark, notes, updateNote } = useBookmarks();
  const router = useRouter();
  const isBookmarked = bookmarks.includes(player.id);

  // Manual navigation ensures we don't need a wrapping <Link>
  const handleNavigate = () => {
    router.push(`/player/${player.id}`);
  };

  return (
    <div 
      onClick={handleNavigate}
      className="group relative p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-emerald-500 transition-all shadow-sm duration-300 cursor-pointer"
    >
      {/* Bookmark Button - Stopped Propagation */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(player.id);
        }}
        className="absolute top-8 right-8 z-30 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:scale-110 transition-transform active:scale-95 group/star"
      >
        <Star 
          size={18} 
          className={`transition-colors ${
            isBookmarked 
              ? "fill-emerald-500 text-emerald-500" 
              : "text-white/40 group-hover/star:text-emerald-400/60"
          }`} 
        />
      </button>

      <PlayerImage src={player.imageUrl} name={player.name} className="w-full h-48 rounded-xl mb-4 pointer-events-none" />

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-audiowide text-xl text-zinc-900 dark:text-white italic tracking-tighter">
              {player.name}
            </h3>
            <span className="text-zinc-400 font-audiowide text-sm">#{player.jersey}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 mb-2">
            <StarRating rating={player.starRating} />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-audiowide">Prospect</span>
          </div>
          <p className="text-sm text-zinc-500">{player.bio.school} • Class of {player.bio.grad}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-bold bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded uppercase tracking-wider border border-emerald-500/20">{player.bio.height}</span>
          <span className="text-[9px] text-zinc-400 font-medium text-nowrap">WS: {player.bio.wingspan}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
        <StatItem label="PPG" value={player.stats.ppg} />
        <StatItem label="RPG" value={player.stats.rpg} />
        <StatItem label="APG" value={player.stats.apg} />
        <StatItem label="BPG" value={player.stats.bpg} />
      </div>

      <div className="mt-6">
        <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl">
          <p className="text-[10px] font-bold text-emerald-500/60 uppercase font-audiowide mb-1">AI Archetype</p>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{player.aiArchetype}</p>
        </div>
      </div>

      {/* Note Section - COMPLETELY ISOLATED */}
      <div 
        className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 relative z-40"
        onClick={(e) => e.stopPropagation()} 
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-2">
          <NotebookPen size={12} className="text-emerald-500/50" />
          <span className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest font-audiowide">Scout's Note</span>
        </div>
        <textarea
          value={notes[player.id] || ""}
          onChange={(e) => updateNote(player.id, e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          placeholder="Add private scouting notes..."
          className="w-full bg-black/10 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 resize-none transition-all outline-none min-h-[80px]"
          rows={2}
        />
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[10px] uppercase text-zinc-500 font-bold">{label}</p>
      <p className="text-lg font-audiowide dark:text-zinc-100 italic">{value}</p>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} className={`w-3.5 h-3.5 ${i < rating ? "text-emerald-500" : "text-zinc-700 stroke-zinc-700"}`} strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      ))}
    </div>
  );
}