import { ReactNode } from "react";

interface MetricRowData {
  label: string;
  value: string;
  status: string;
}

interface AdvancedMetricsTableProps {
  metrics: MetricRowData[];
}

function MetricRow({ label, value, status }: MetricRowData) {
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="px-8 py-4 font-medium text-zinc-400">{label}</td>
      <td className="px-8 py-4 font-bold text-white">{value}</td>
      <td className="px-8 py-4">
        <span className="text-[10px] font-bold text-blue-500 uppercase border border-blue-500/30 px-2 py-1 rounded">
          {status}
        </span>
      </td>
    </tr>
  );
}

export default function AdvancedMetricsTable({ metrics }: AdvancedMetricsTableProps) {
  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="font-audiowide text-lg lowercase">advanced metrics</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-800/50 text-zinc-500 uppercase text-[10px] font-bold tracking-widest">
          <tr>
            <th className="px-8 py-4">Metric</th>
            <th className="px-8 py-4">Value</th>
            <th className="px-8 py-4">Status</th>
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