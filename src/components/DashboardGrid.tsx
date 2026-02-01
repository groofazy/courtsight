"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PlayerCard from "./PlayerCard";
import { SearchFilter } from "./SearchFilter";
import { FilterSelect } from "./FilterSelect";

export default function DashboardGrid({ players }: { players: any[] }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [filters, setFilters] = useState({ 
    school: "all", 
    grad: "all", 
    pos: "all", 
    height: "all",
    clubTeam: "all",
    hand: "all",
    stars: "all",
    gpa:"all",
    weight:"all"
  });

  // 1. Logic moved to the "Engine"
  const filteredPlayers = usePlayerFilters(players, search, filters, sortBy);

  // 2. Data derivation moved into a config object
  const filterConfigs = [
    { label: "School", key: "school", options: Array.from(new Set(players.map(p => p.bio.school))).sort() },
    { label: "Club Team", key: "clubTeam", options: Array.from(new Set(players.map(p => p.bio.clubTeam))).sort() },
    { label: "Position", key: "pos", options: Array.from(new Set(players.map(p => p.bio.position))).sort() },
    { label: "Grad Year", key: "grad", options: Array.from(new Set(players.map(p => p.bio.grad.toString()))).sort() },
    { label: "Strong Hand", key: "hand", options: Array.from(new Set(players.map(p => p.bio.hand))).sort() },
    { label: "Stars", key: "stars", options: ["1", "2", "3", "4", "5"] },
    { label: "Min GPA", key: "gpa", options: ["3.0", "3.5", "3.8", "4.0"] }, // Added
    { label: "Weight", key: "weight", options: Array.from(new Set(players.map(p => p.bio.weight))).sort() }, // Added
  ];

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl space-y-6">
        <SearchFilter search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pt-6 border-t border-zinc-800">
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
            setFilters({ 
              school: "all", 
              grad: "all", 
              pos: "all", 
              height: "all", 
              clubTeam: "all", 
              hand: "all", 
              stars: "all",
              gpa:"all",
              weight: "all"
             });
          }}
          className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter hover:text-blue-400 transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
        {filteredPlayers.map((player) => (
          <Link href={`/player/${player.id}`} 
          key={player.id} 
          className="relative z-10 block transition-transform duration-200 hover:scale-[1.02] cursor-pointer">
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
        // 1. Global Search: Checks Name, School, Club, Archetype, and Position
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          p.name.toLowerCase().includes(searchLower) || 
          p.bio.school.toLowerCase().includes(searchLower) ||
          p.bio.clubTeam.toLowerCase().includes(searchLower) ||
          p.aiArchetype.toLowerCase().includes(searchLower) ||
          p.bio.position.toLowerCase().includes(searchLower);
        
        // 2. Exact Category Filters
    const matchesSchool = filters.school === "all" || p.bio.school === filters.school;
    const matchesGrad = filters.grad === "all" || p.bio.grad.toString() === filters.grad;
    const matchesPos = filters.pos === "all" || p.bio.position === filters.pos;
    const matchesHeight = filters.height === "all" || p.bio.height === filters.height;
    const matchesClub = filters.clubTeam === "all" || p.bio.clubTeam === filters.clubTeam;
    const matchesHand = filters.hand === "all" || p.bio.hand === filters.hand;
    const matchesStars = filters.stars === "all" || p.starRating.toString() === filters.stars;
    // Inside the .filter() function
    const matchesGPA = filters.gpa === "all" || p.bio.gpa >= parseFloat(filters.gpa);
    const matchesWeight = filters.weight === "all" || p.bio.weight === filters.weight;

    return matchesSearch && matchesSchool && matchesGrad && matchesPos && 
          matchesHeight && matchesClub && matchesHand && matchesStars && 
          matchesGPA && matchesWeight;
      })
      .sort((a, b) => {
        // 3. Dynamic Sorting for Nested Stats
        // This handles top-level (starRating) and nested (stats.ppg, stats.shooting.fg)
        const getVal = (obj: any, path: string) => {
          if (path === 'stars') return obj.starRating;
          if (path === 'fg') return obj.stats.shooting.fg;
          return obj.stats[path];
        };

        return getVal(b, sortBy) - getVal(a, sortBy);
      });
  }, [search, filters, sortBy, players]);
}