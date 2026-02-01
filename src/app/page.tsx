import Header from "@/components/Header";
import WelcomeHero from "@/components/WelcomeHero";
import DashboardGrid from "@/components/DashboardGrid";
import players from "@data/players.json";
import PlayerCard from "@/components/PlayerCard";
import FeaturedCarousel from "@/components/FeaturedCarousel";

export default function Home() {
  // Filter for 'featured' players (e.g., those with 5 stars)
  const featuredPlayers = players.filter(p => p.starRating === 5);

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6">
        <WelcomeHero />
        
        <FeaturedCarousel players={featuredPlayers} />

        <DashboardGrid players={players} />
      </div>
    </main>
  );
}