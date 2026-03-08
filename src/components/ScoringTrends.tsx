"use client";
import { useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

interface GameData {
  game_name: string;
  points: number;
  game_date: string;
}

export default function ScoringTrends({ data }: { data: GameData[] }) {
  // 1. Sort and limit data
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return [...data]
      .sort((a, b) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime())
      .slice(-10);
  }, [data]);

  // 2. Dynamic Y-Axis Logic
  const { yAxisMax, ticks } = useMemo(() => {
    const maxVal = Math.max(...chartData.map(d => d.points), 0);
    // Round up to nearest 5 and add one extra step for padding
    const maxRounded = Math.ceil((maxVal + 1) / 5) * 5;
    const generatedTicks = Array.from(
      { length: (maxRounded / 5) + 1 }, 
      (_, i) => i * 5
    );
    return { yAxisMax: maxRounded, ticks: generatedTicks };
  }, [chartData]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl h-[400px] w-full shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-audiowide text-lg lowercase tracking-tighter text-white">
          scoring trends
        </h3>
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Last {chartData.length} Games
        </span>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          
          <XAxis 
            dataKey="game_name" 
            stroke="#71717a" 
            fontSize={9} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
            fontFamily="var(--font-audiowide)"
          />
          
          <YAxis 
            stroke="#71717a" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            fontFamily="var(--font-audiowide)"
            domain={[0, yAxisMax]} // Dynamic max
            ticks={ticks}          // Dynamic 5-point ticks
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#09090b', 
              border: '1px solid #27272a', 
              borderRadius: '12px'
            }}
            itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="points" 
            stroke="#10b981" 
            strokeWidth={3} 
            fill="url(#colorPoints)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}