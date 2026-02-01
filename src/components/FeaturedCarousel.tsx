"use client";
import Link from "next/link";
import PlayerCard from "./PlayerCard";

interface FeaturedCarouselProps {
  players: any[];
  title?: string;
}

export default function FeaturedCarousel({ players, title = "Top Tier Prospects" }: FeaturedCarouselProps) {
  // Only show the carousel if there are players to display
  if (players.length === 0) return null;

  return (
    <section className="mb-16 relative z-20">
      <h3 className="text-[20px] font-audiowide- text-blue-500 uppercase tracking-[0.3em] mb-6">
        {title}
      </h3>
      
      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
        {players.map((p) => (
          <div key={p.id} className="min-w-[300px] md:min-w-[350px] snap-start">
            <Link 
              href={`/player/${p.id}`} 
              className="block transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <PlayerCard player={p} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}