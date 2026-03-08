"use client";
import { Star } from "lucide-react";
import PlayerImage from "./PlayerImage";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useRouter } from "next/navigation";

// Interface allows for flexible Supabase join results
interface PlayerInfo {
  player: any; 
}

export default function PlayerCard({ player }: PlayerInfo) {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const router = useRouter();
  const isBookmarked = bookmarks.includes(player.id);

  const handleNavigate = () => {
    router.push(`/player/${player.id}`);
  };

  // 1. Calculate Averages from the game_stats relational table
  const stats = player.game_stats || [];
  const totalGames = 4;

  const ppg = totalGames > 0 
    ? (stats.reduce((acc: number, curr: any) => acc + (curr.points || 0), 0) / totalGames).toFixed(1) 
    : "0.0";

  const fpg = totalGames > 0 
    ? (stats.reduce((acc: number, curr: any) => acc + (curr.fouls || 0), 0) / totalGames).toFixed(1) 
    : "0.0";


  const twopg = totalGames > 0 
    ? (stats.reduce((acc: number, curr: any) => acc + (curr.twos_made || 0), 0) / totalGames).toFixed(1) 
    : "0.0";

  const apg = totalGames > 0 
    ? (stats.reduce((acc: number, curr: any) => acc + (curr.assists || 0), 0) / totalGames).toFixed(1) 
    : "0.0";

  const thrpg = totalGames > 0 
    ? (stats.reduce((acc: number, curr: any) => acc + (curr.threes_made || 0), 0) / totalGames).toFixed(1) 
    : "0.0";

  return (
    <div 
      onClick={handleNavigate}
      className="group relative p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-emerald-500 transition-all shadow-sm duration-300 cursor-pointer"
    >
      {/* Bookmark Button */}
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

      {/* Image uses the flat image_url column */}
      <PlayerImage src={player.image_url} name={player.name} className="w-full h-50 rounded-2xs mb-4 pointer-events-none" />

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-audiowide text-xl text-zinc-900 dark:text-white italic tracking-tighter">
              {player.name}
            </h3>
            <span className="text-zinc-400 font-audiowide text-sm">#{player.jersey}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 mb-2">
            {/* <StarRating rating={player.star_rating} /> */}
            <span className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest font-audiowide">{player.position}</span>
          </div>
          {/* Flat columns for school and grad_year */}
          <p className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest font-audiowide">{player.school}</p>
          <p className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest font-audiowide">Class of {player.grad_year}</p>

        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-bold bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg uppercase tracking-wider border border-emerald-500/20">
            {player.height}
          </span>
          {/* <span className="text-[9px] text-zinc-400 font-medium text-nowrap">WS: {player.wingspan}</span> */}
        </div>
      </div>

      <div className="mt-6 flex justify-between border-t border-zinc-100 dark:border-zinc-900 pt-4">
        {/* Using the locally calculated average variables */}
        <StatItem label="PPG" value={ppg} />
        <StatItem label ="2PG" value={twopg} />
        <StatItem label ="3PG" value={thrpg} />
        {/* <StatItem label="RPG" value={rpg} />
        <StatItem label="APG" value={apg} /> */}
      </div>
    </div>
  );
}

function StatItem({ label, value, isText = false }: { label: string; value: any; isText?: boolean }) {
  return (
    <div>
      <p className="text-[15px] uppercase text-emerald-500 font-bold tracking-widest mb-1">{label}</p>
      <p className={`font-audiowide dark:text-zinc-100 italic leading-none ${
              isText ? 'text-sm uppercase' : 'text-xl'
            }`}>
              {value || "0.0"}
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
          className={`w-3.5 h-3.5 ${i < rating ? "text-emerald-500" : "text-zinc-700 stroke-zinc-700"}`} 
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      ))}
    </div>
  );
}