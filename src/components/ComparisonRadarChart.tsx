import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

export default function ComparisonRadarChart({ p1, p2 }: { p1: any, p2: any }) {
  const data = [
    { 
      subject: 'Scoring', 
      A: Math.min(p1.stats.ppg * 3.5, 100), 
      B: Math.min(p2.stats.ppg * 3.5, 100) 
    },
    { 
      subject: 'Playmaking', 
      A: Math.min(p1.stats.apg * 12, 100), 
      B: Math.min(p2.stats.apg * 12, 100) 
    },
    { 
      subject: 'Defense', 
      A: Math.min((p1.stats.spg + p1.stats.bpg) * 18, 100), 
      B: Math.min((p2.stats.spg + p2.stats.bpg) * 18, 100) 
    },
    { 
      subject: 'Physicals', 
      A: parseFloat(p1.bio.wingspan) * 10 || 70, 
      B: parseFloat(p2.bio.wingspan) * 10 || 70 
    },
    { 
      subject: 'Efficiency', 
      A: (p1.stats.shooting.fg + p1.stats.shooting.threeP) / 1.1, 
      B: (p2.stats.shooting.fg + p2.stats.shooting.threeP) / 1.1 
    },
  ];

  return (
    <div className="h-[450px] w-full bg-zinc-900/10 rounded-3xl border border-zinc-900/50 my-4 p-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-audiowide text-[10rem] text-zinc-900/30 italic select-none uppercase">VS</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 'bold' }} />
          <Radar name={p1.name} dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
          <Radar name={p2.name} dataKey="B" stroke="#ffffff" fill="#ffffff" fillOpacity={0.1} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}