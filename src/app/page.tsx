import WelcomeHero from "@/components/WelcomeHero";
import DashboardGrid from "@/components/DashboardGrid";
import Footer from "@/components/Footer";
import { createClient } from '@/utils/supabase/server';
import Header from "@/components/Header";

export default async function Home() {
  const supabase = await createClient();

  // Fetch athletes from your Supabase table
    const { data: athletes, error } = await supabase
        .from('athletes')
        .select(`
          *,
          game_stats (*) 
        `);
  if (error) {
    console.error("Error fetching athletes:", error);
    // Fallback to empty array so the page doesn't crash
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <WelcomeHero />
      <div className="px-6 md:px-12 pb-20">
        {/* Pass the database data to the grid */}
        <DashboardGrid players={athletes || []} />
      </div>
      <Footer />
    </main>
  );
}