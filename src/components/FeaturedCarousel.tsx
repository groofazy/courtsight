"use client";
import PlayerCard from "./PlayerCard";

interface FeaturedCarouselProps {
  players: any[];
  title?: string;
}

export default function FeaturedCarousel({ players, title = "Top Tier Prospects" }: FeaturedCarouselProps) {
  if (players.length === 0) return null;

  return (
    <section className="mb-16 relative z-20">
      <h3 className="text-[20px] font-audiowide text-blue-500 uppercase tracking-[0.3em] mb-6">
        {title}
      </h3>
      
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
        {players.map((p) => (
          <div key={p.id} className="min-w-[300px] md:min-w-[350px] snap-start">
            {/* REMOVED the <Link> wrapper here */}
            <PlayerCard player={p} />
          </div>
        ))}
      </div>
    </section>
  );
}