"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PlayerCard from "./PlayerCard";
import { SearchFilter } from "./SearchFilter";
import { FilterSelect } from "./FilterSelect";

export default function DashboardGrid({ players }: { players: any[] }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [filters, setFilters] = useState({ school: "all", grad: "all", pos: "all", height: "all" });

  // 1. Logic moved to the "Engine"
  const filteredPlayers = usePlayerFilters(players, search, filters, sortBy);

  // 2. Data derivation moved into a config object
const filterConfigs = [
    { label: "School", key: "school", options: Array.from(new Set(players.map(p => p.bio.school))).sort() },
    { label: "Grad Year", key: "grad", options: Array.from(new Set(players.map(p => p.bio.grad.toString()))).sort() }, // Fixed "Classs" typo here
    { label: "Position", key: "pos", options: Array.from(new Set(players.map(p => p.bio.position))).sort() },
    { label: "Height", key: "height", options: Array.from(new Set(players.map(p => p.bio.height))).sort() },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl space-y-6">
        <SearchFilter search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-zinc-800">
          {filterConfigs.map((cfg) => (
            <FilterSelect 
              key={cfg.key}
              label={cfg.label} 
              options={cfg.options} 
              value={filters[cfg.key as keyof typeof filters]} 
              // Added ': string' to val to fix the TypeScript error
              onChange={(val: string) => setFilters(prev => ({ ...prev, [cfg.key]: val }))} 
            />
          ))}
        </div>
      </div>

    {/* Result Counter Badge */}
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        <p className="text-sm font-medium text-zinc-500">
          Showing <span className="text-white font-bold">{filteredPlayers.length}</span> prospects
        </p>
      </div>
      
      {/* Conditional 'Clear All' button */}
      {(search || Object.values(filters).some(v => v !== 'all')) && (
        <button 
          onClick={() => {
            setSearch("");
            setFilters({ school: "all", grad: "all", pos: "all", height: "all" });
          }}
          className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter hover:text-blue-400 transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
        {filteredPlayers.map((player) => (
          <Link href={`/player/${player.id}`} key={player.id} className="block transition-transform duration-200 hover:scale-[1.02]">
            <PlayerCard player={player} />
          </Link>
        ))}
      </div>
    </div>
  );
}

// Logic extracted to a focused helper
function usePlayerFilters(players: any[], search: string, filters: any, sortBy: string) {
  return useMemo(() => {
    return [...players]
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                              p.bio.school.toLowerCase().includes(search.toLowerCase());
        const matchesSchool = filters.school === "all" || p.bio.school === filters.school;
        const matchesGrad = filters.grad === "all" || p.bio.grad.toString() === filters.grad;
        const matchesPos = filters.pos === "all" || p.bio.position === filters.pos;
        const matchesHeight = filters.height === "all" || p.bio.height === filters.height;
        return matchesSearch && matchesSchool && matchesGrad && matchesPos && matchesHeight;
      })
      .sort((a, b) => (b.stats[sortBy] || b.starRating) - (a.stats[sortBy] || a.starRating));
  }, [search, filters, sortBy, players]);
}