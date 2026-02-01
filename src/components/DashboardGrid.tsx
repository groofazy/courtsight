"use client";
import { useState } from "react";
import Link from "next/link";
import PlayerCard from "./PlayerCard";

export default function DashboardGrid({ players }: { players: any[] }) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Logic to handle sorting/filtering
  const processedPlayers = [...players]
    .filter((p) => (filter === "all" ? true : p.starRating >= parseInt(filter)))
    .sort((a, b) => {
      if (sortBy === "ppg") return b.stats.ppg - a.stats.ppg;
      if (sortBy === "rpg") return b.stats.rpg - a.stats.rpg;
      if (sortBy === "apg") return b.stats.apg - a.stats.apg;
      if (sortBy === "stars") return b.starRating - a.starRating;
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      {/* Filter Bar - Dark Design */}
      <div className="flex flex-wrap gap-4 mb-10 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-zinc-500 uppercase">Filter:</span>
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-black text-white text-sm border border-zinc-700 rounded-lg px-3 py-1 outline-none focus:border-blue-500"
          >
            <option value="all">All Stars</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-zinc-500 uppercase">Sort By:</span>
          {[
            { id: "ppg", label: "Points" },
            { id: "rpg", label: "Rebounds" },
            { id: "apg", label: "Assists" },
            { id: "stars", label: "Rank" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSortBy(btn.id)}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                sortBy === btn.id 
                ? "bg-blue-600 text-white" 
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {processedPlayers.map((player) => (
          <Link href={`/player/${player.id}`} key={player.id} className="block transition-transform hover:scale-[1.01]">
            <PlayerCard player={player} />
          </Link>
        ))}
      </div>
    </div>
  );
}