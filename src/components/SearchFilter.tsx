"use client";

interface SearchFilterProps {
  search: string;
  setSearch: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function SearchFilter({ search, setSearch, sortBy, setSortBy }: SearchFilterProps) {
  // Updated sort options to match your specific requirements
  const sortOptions = [
    { id: 'ppg', label: 'Points' },
    { id: 'tpg', label: '3PM' }, // Threes Per Game
    { id: 'twpg', label: '2PM' }, // Twos Per Game
    { id: 'name', label: 'A-Z' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <input 
          type="text"
          value={search}
          placeholder="Search by name, school, or position..."
          className="w-full bg-black border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-600"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
      </div>

      {/* Sort Toggle Group */}
      <div className="flex flex-wrap gap-1 bg-black p-1 rounded-xl border border-zinc-800">
        {sortOptions.map((item) => (
          <button
            key={item.id}
            onClick={() => setSortBy(item.id)}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
              sortBy === item.id 
                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
            }`}
          >
            {item.label}
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