"use client";
import { useEffect, useState } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { createClient } from '@/utils/supabase/client'; // Use client-side utility
import Link from "next/link";
import { ArrowLeft, Bookmark } from "lucide-react";
import DashboardGrid from "@/components/DashboardGrid";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks(); // This gives you an array of IDs like ['b1', 'b2']
  const [bookmarkedAthletes, setBookmarkedAthletes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchBookmarkedPlayers() {
      if (bookmarks.length === 0) {
        setBookmarkedAthletes([]);
        setLoading(false);
        return;
      }

      // Query Supabase for athletes where ID is in our bookmarks array
      const { data, error } = await supabase
        .from('athletes')
        .select('*')
        .in('id', bookmarks);

      if (!error && data) {
        setBookmarkedAthletes(data);
      }
      setLoading(false);
    }

    fetchBookmarkedPlayers();
  }, [bookmarks, supabase]);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-colors">
          <ArrowLeft size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <Bookmark className="text-emerald-500" fill="currentColor" />
          <h1 className="font-audiowide text-4xl">My Scouting List</h1>
        </div>

        {loading ? (
          <p className="text-zinc-500">Loading your prospects...</p>
        ) : bookmarkedAthletes.length > 0 ? (
          <DashboardGrid players={bookmarkedAthletes} />
        ) : (
          <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500">No prospects bookmarked yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}