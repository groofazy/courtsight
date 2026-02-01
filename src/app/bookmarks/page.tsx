"use client";
import { useState } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import players from "@data/players.json";
import PlayerCard from "@/components/PlayerCard";
import Link from "next/link";
import { ArrowLeft, Bookmark, Swords } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const savedPlayers = players.filter(p => bookmarks.includes(p.id));

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id].slice(-2)
    ); // Limits selection to the 2 most recent picks
  };

  return (
    <main className="min-h-screen bg-black p-8 pt-24 pb-32">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-emerald-500 mb-8 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest font-audiowide">Dashboard</span>
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="text-emerald-500" size={32} />
            <h1 className="font-audiowide text-4xl text-white uppercase italic tracking-tighter">
              Scout <span className="text-emerald-500">Shortlist</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-medium">Select two prospects to generate a Head-to-Head comparison.</p>
        </header>

        {savedPlayers.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
            <p className="text-zinc-600 font-medium mb-4">Your shortlist is empty.</p>
            <Link href="/" className="text-emerald-500 font-audiowide uppercase text-xs tracking-widest px-6 py-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 transition-all">
              Browse Players
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedPlayers.map(player => (
              <div 
                key={player.id} 
                onClick={() => toggleSelection(player.id)}
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
        )}

        {/* Floating Compare Action Bar */}
        <AnimatePresence>
          {selectedIds.length === 2 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
            >
              <Link 
                href={`/compare?p1=${selectedIds[0]}&p2=${selectedIds[1]}`}
                className="flex items-center gap-3 bg-emerald-500 text-black px-8 py-4 rounded-full font-audiowide text-sm italic uppercase shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-all active:scale-95"
              >
                <Swords size={20} />
                Compare Selected Prospects
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}