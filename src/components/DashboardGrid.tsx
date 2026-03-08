"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PlayerCard from "./PlayerCard";
import { SearchFilter } from "./SearchFilter";
import { FilterSelect } from "./FilterSelect";

export default function DashboardGrid({ players }: { players: any[] }) {
  const [search, setSearch] = useState("");
  // Update default to 'ppg' since you removed star ratings
  const [sortBy, setSortBy] = useState("ppg"); 
  const [filters, setFilters] = useState({
    school: "all",
    grad: "all",
    pos: "all",
    clubTeam: "all",
    hand: "all",
    stars: "all",
    gpa: "all",
    weight: "all"
  });

  const filteredPlayers = usePlayerFilters(players, search, filters, sortBy);

  const filterConfigs = [
    { label: "School", key: "school", options: Array.from(new Set(players.map(p => p.school))).filter(Boolean).sort() },
    { label: "Position", key: "pos", options: Array.from(new Set(players.map(p => p.position))).filter(Boolean).sort() },
    { label: "Grad Year", key: "grad", options: Array.from(new Set(players.map(p => p.grad_year?.toString()))).filter(Boolean).sort() },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl space-y-6">
        <SearchFilter search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pt-6 border-t border-zinc-800">
          {filterConfigs.map((cfg) => (
            <FilterSelect 
              key={cfg.key}
              label={cfg.label} 
              options={cfg.options} 
              value={filters[cfg.key as keyof typeof filters]} 
              onChange={(val: string) => setFilters(prev => ({ ...prev, [cfg.key]: val }))} 
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm font-medium text-zinc-500">
            Showing <span className="text-white font-bold">{filteredPlayers.length}</span> prospects
          </p>
        </div>
        
        {(search || Object.values(filters).some(v => v !== 'all')) && (
          <button 
            onClick={() => {
              setSearch("");
              setFilters({ school: "all", grad: "all", pos: "all", clubTeam: "all", hand: "all", stars: "all", gpa: "all", weight: "all" });
            }}
            className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter hover:text-emerald-400 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {filteredPlayers.map((player) => (
          <Link 
            href={`/player/${player.id}`} 
            key={player.id} 
            className="relative z-10 block transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
          >
            <PlayerCard player={player} />
          </Link>
        ))}
      </div>
    </div>
  );
}

// Fixed Helper Function with Dynamic Stat Averaging
function usePlayerFilters(players: any[], search: string, filters: any, sortBy: string) {
  return useMemo(() => {
    // Helper to calculate averages from the nested game_stats table
    const getAvg = (gameStats: any[], key: string) => {
      if (!gameStats || gameStats.length === 0) return 0;
      const total = gameStats.reduce((acc, curr) => acc + (curr[key] || 0), 0);
      return total / gameStats.length;
    };

    return [...players]
      .filter((p) => {
        const searchLower = search.toLowerCase();
        
        const matchesSearch = 
          (p.name?.toLowerCase().includes(searchLower)) || 
          (p.school?.toLowerCase().includes(searchLower)) ||
          (p.position?.toLowerCase().includes(searchLower));
        
        const matchesSchool = filters.school === "all" || p.school === filters.school;
        const matchesGrad = filters.grad === "all" || p.grad_year?.toString() === filters.grad;
        const matchesPos = filters.pos === "all" || p.position?.toLowerCase() === filters.pos?.toLowerCase();

        return matchesSearch && matchesSchool && matchesGrad && matchesPos;
      })
      .sort((a, b) => {
        // Sort by Points Per Game
        if (sortBy === 'ppg') {
          return getAvg(b.game_stats, 'points') - getAvg(a.game_stats, 'points');
        }
        // Sort by 3-Pointers Made per game
        if (sortBy === 'tpg') {
          return getAvg(b.game_stats, 'threes_made') - getAvg(a.game_stats, 'threes_made');
        }
        // Sort by 2-Pointers Made per game
        if (sortBy === 'twpg') {
          return getAvg(b.game_stats, 'twos_made') - getAvg(a.game_stats, 'twos_made');
        }
        // Alphabetical fallback
        if (sortBy === 'name') {
          return (a.name || "").localeCompare(b.name || "");
        }
        return 0;
      });
  }, [search, filters, sortBy, players]);
}