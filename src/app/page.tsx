import Header from "@/components/Header";
import WelcomeHero from "@/components/WelcomeHero";
import DashboardGrid from "@/components/DashboardGrid";
import players from "@data/players.json";
import PlayerCard from "@/components/PlayerCard";

export default function Home() {
  // Filter for 'featured' players (e.g., those with 5 stars)
  const featuredPlayers = players.filter(p => p.starRating === 5);

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6">
        <WelcomeHero />

        {/* FEATURED CAROUSEL SECTION */}
        <section className="mb-16">
          <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-6">
            Top Tier Prospects
          </h3>
          {/* We will build the Carousel component next */}
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {featuredPlayers.map(p => (
               <div key={p.id} className="min-w-[300px]">
                 <PlayerCard player={p} />
               </div>
            ))}
          </div>
        </section>

        <DashboardGrid players={players} />
      </div>
    </main>
  );
}