"use client";
import { useState } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import players from "@data/players.json";
import Link from "next/link";
import { ArrowLeft, Bookmark } from "lucide-react";
import BookmarkPlayerGrid from "@/components/BookmarkPlayerGrid";
import EmptyBookmarksState from "@/components/EmptyBookmarksState";
import CompareActionBar from "@/components/CompareActionBar";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const savedPlayers = players.filter(p => bookmarks.includes(p.id));

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id].slice(-2)
    );
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
          <EmptyBookmarksState />
        ) : (
          <BookmarkPlayerGrid 
            savedPlayers={savedPlayers}
            selectedIds={selectedIds}
            onToggleSelection={toggleSelection}
          />
        )}

        <CompareActionBar selectedIds={selectedIds} />
      </div>
    </main>
  );
}