"use client";

interface FilterSelectProps {
  label: string;
  options: (string | number)[];
  value: string;
  onChange: (val: string) => void;
}

export function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-1">
        {label}
      </label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-black border border-zinc-800 text-white text-xs rounded-lg py-2.5 px-3 focus:border-blue-500 outline-none cursor-pointer appearance-none transition-colors hover:border-zinc-600"
      >
        <option value="all">All {label}s</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}