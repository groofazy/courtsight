"use client";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

interface GameData {
  game: string;
  points: number;
}

export default function ScoringTrends({ data }: { data: GameData[] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl h-[400px] w-full shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-audiowide text-lg lowercase tracking-tighter text-white">
          scoring trends
        </h3>
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">
          Last 10 Games
        </span>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="game" 
            stroke="#71717a" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="#71717a" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#09090b', 
              border: '1px solid #27272a', 
              borderRadius: '12px',
              fontSize: '12px',
              fontFamily: 'var(--font-geist-sans)'
            }}
            itemStyle={{ color: '#3b82f6' }}
            cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="points" 
            stroke="#10b981" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorPoints)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}