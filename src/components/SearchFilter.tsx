"use client";

interface SearchFilterProps {
  search: string;
  setSearch: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function SearchFilter({ search, setSearch, sortBy, setSortBy }: SearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <input 
          type="text"
          value={search}
          placeholder="Search by name or school..."
          className="w-full bg-black border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
      </div>

      <div className="flex gap-1 bg-black p-1 rounded-xl border border-zinc-800">
        {['stars', 'ppg', 'rpg', 'apg'].map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              sortBy === key ? "bg-blue-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {key === 'stars' ? 'Rank' : key}
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}