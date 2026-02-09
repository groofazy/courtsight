import PlayerImage from "@/components/PlayerImage";

interface PlayerProfileHeaderProps {
  player: any;
}

export default function PlayerProfileHeader({ player }: PlayerProfileHeaderProps) {
  return (
    <section className="flex flex-col md:flex-row gap-8 items-end">
      <PlayerImage 
        src={player.imageUrl} 
        name={player.name} 
        className="w-48 h-48 rounded-3xl border border-zinc-800" 
      />
      <div className="space-y-2">
        <h1 className="font-audiowide text-6xl md:text-8xl uppercase tracking-tighter leading-none">
          {player.name}
        </h1>
        <div className="flex gap-4 items-center">
          <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-sm">
            #{player.jersey} • {player.bio.position}
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <p className="text-zinc-500 font-medium">
            {player.bio.school} • Class of {player.bio.grad}
          </p>
        </div>
      </div>
    </section>
  );
}