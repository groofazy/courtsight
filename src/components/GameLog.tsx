"use client";

interface GameEntry {
  game_name: string;
  game_date: string;
  points: number;
  threes_made: number;
  twos_made: number;
  fouls: number;
  free_throws_made: number;
  free_throws_attempted: number;
}

interface GameLogProps {
  games: GameEntry[];
}

export default function GameLog({ games }: GameLogProps) {
  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h3 className="font-audiowide text-lg lowercase">game log</h3>
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          {games.length} Games Tracked
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-800/50 text-zinc-500 uppercase text-[11px] font-black tracking-widest border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Opponent</th>
              <th className="px-6 py-4 text-emerald-500">PTS</th>
              <th className="px-6 py-4">3PM</th>
              <th className="px-6 py-4">2PM</th>
              <th className="px-6 py-4">FTM/A</th>
              <th className="px-6 py-4">PF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {games.length > 0 ? (
              games.map((game, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="px-6 py-4 text-zinc-500 font-medium text-xs">
                  {(() => {
                    // Split "2026-03-08" into [2026, 03, 08]
                    const [year, month, day] = game.game_date.split('-').map(Number);
                    // Create date using local components (Note: month is 0-indexed in JS)
                    const localDate = new Date(year, month - 1, day);
                    
                    return localDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  })()}
                </td>
                  <td className="px-6 py-4 text-white font-bold tracking-tight">
                    {game.game_name}
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-black text-lg">
                    {game.points}
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{game.threes_made}</td>
                  <td className="px-6 py-4 text-zinc-300">{game.twos_made}</td>
                  <td className="px-6 py-4 text-zinc-300">
                    {game.free_throws_made}/{game.free_throws_attempted}
                  </td>
                  <td className={`px-6 py-4 font-bold ${game.fouls >= 4 ? 'text-red-500' : 'text-zinc-500'}`}>
                    {game.fouls}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-zinc-600 italic">
                  No game data available for this prospect.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}