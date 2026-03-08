import { ReactNode } from "react";

interface MetricRowData {
  label: string;
  value: string;
}

interface PlayerStatsTableProps {
  metrics: MetricRowData[];
}

function MetricRow({ label, value}: MetricRowData) {
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="px-8 py-4 font-medium text-zinc-400">{label}</td>
      <td className="px-8 py-4 font-bold text-white">{value}</td>
    </tr>
  );
}

export default function PlayerStatsTable({ metrics }: PlayerStatsTableProps) {
  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="font-audiowide text-lg lowercase">player stats per game</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-800/50 text-zinc-500 uppercase text-[14px] font-bold tracking-widest">
          <tr>
            <th className="px-8 py-4">Statistic</th>
            <th className="px-8 py-4">Average </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {metrics.map((metric, idx) => (
            <MetricRow key={idx} {...metric} />
          ))}
        </tbody>
      </table>
    </section>
  );
}