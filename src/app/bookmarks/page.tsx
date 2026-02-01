"use client";
import { useBookmarks } from "@/hooks/useBookmarks";
import players from "@data/players.json";
import PlayerCard from "@/components/PlayerCard";
import Link from "next/link";
import { ArrowLeft, Bookmark } from "lucide-react";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  
  // Filter the full player list to only show saved IDs
  const savedPlayers = players.filter(p => bookmarks.includes(p.id));

  return (
    <main className="min-h-screen bg-black p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Back */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest font-audiowide">Back to Dashboard</span>
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="text-emerald-500" size={32} />
            <h1 className="font-audiowide text-4xl text-white uppercase italic tracking-tighter">
              Scout <span className="text-emerald-500">Shortlist</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-medium">
            You have {savedPlayers.length} prospects saved for review.
          </p>
        </header>

        {savedPlayers.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
            <p className="text-zinc-600 font-medium mb-4">Your shortlist is currently empty.</p>
            <Link 
              href="/" 
              className="text-emerald-500 hover:text-emerald-400 font-audiowide uppercase text-xs tracking-widest border border-emerald-500/20 px-6 py-3 rounded-full bg-emerald-500/5 transition-all"
            >
              Browse Players
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedPlayers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}