"use client";
import { ChevronDown } from "lucide-react";

interface FilterSelectProps {
  label: string;
  options: (string | number)[];
  value: string;
  onChange: (val: string) => void;
}

export function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1.5 group">
      <label className="text-[10px] font-bold text-zinc-600 group-hover:text-emerald-500/50 uppercase tracking-widest px-1 transition-colors">
        {label}
      </label>
      
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black border border-zinc-800 text-zinc-300 text-xs rounded-xl py-2.5 pl-3 pr-10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none cursor-pointer appearance-none transition-all hover:border-zinc-700 hover:text-white"
        >
          <option value="all">All {label}s</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        
        {/* Custom Chevron for a cleaner look */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 group-hover:text-emerald-500 transition-colors">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}