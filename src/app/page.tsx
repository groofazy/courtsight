import players from "@data/players.json";
import DashboardGrid from "@/components/DashboardGrid";

export default async function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-12 sm:px-12">
      <div className="max-w-5xl mx-auto">
        
        {/* CourtSight Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            CourtSight
          </h1>
          <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
            Regional Scouting Dashboard • BC High School Athletics
          </p>
        </header>

        {/* DashboardGrid now handles the filtering buttons 
          AND the player grid display internally.
        */}
        <DashboardGrid players={players} />

        {/* Footer/Meta Info */}
        <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center">
          <p className="text-sm text-zinc-400">
            Internal Use Only • AI-Generated Performance Summaries
          </p>
        </footer>
      </div>
    </main>
  );
}