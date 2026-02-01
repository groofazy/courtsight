"use client";
import { useState } from "react";

// We only pass the player object, nothing else.
export default function ScoutReport({ player }: { player: any }) {
  // We initialize the state to an empty string or a generic placeholder.
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player }),
      });
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
    } catch (error) {
      console.error("AI Scout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      {/* Only show this box IF a summary has been generated */}
      {summary && (
        <div className="bg-zinc-50 dark:bg-zinc-700/50 p-3 rounded-xl relative border border-zinc-100">
          <p className="text-[10px] font-bold text-zinc-400 uppercase">AI Summary</p>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 italic">
            {isLoading ? "Analyzing..." : `"${summary}"`}
          </p>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full py-2 text-xs font-semibold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
      >
        {isLoading ? "Scout is thinking..." : summary ? "Regenerate Report" : "Generate Scout Report"}
      </button>
    </div>
  );
}