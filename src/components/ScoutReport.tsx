"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown"; // You'll need to install this

export default function ScoutReport({ player }: { player: any }) {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!player) return;
    setLoading(true);
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({ player }),
      });
      const data = await response.json();
      setReport(data.summary);
    } catch (error) {
      console.error("Scout Report Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative z-30">
      <AnimatePresence mode="wait">
        {!report && !loading && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={generateReport}
            className="w-full py-4 border border-blue-500/30 bg-blue-500/5 text-blue-500 font-audiowide uppercase text-sm rounded-2xl hover:bg-blue-500/10 transition-all active:scale-95"
          >
            Generate AI Scouting Report
          </motion.button>
        )}

        {loading && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3 animate-pulse"
          >
            <div className="h-4 bg-zinc-800 rounded w-3/4" />
            <div className="h-4 bg-zinc-800 rounded w-full" />
            <div className="h-4 bg-zinc-800 rounded w-5/6" />
          </motion.div>
        )}

        {report && (
          <motion.div 
            key="report"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* Swapped the <p> tag for the Markdown component with prose styling */}
            <div className="prose prose-invert prose-sm max-w-none text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap prose-strong:text-blue-500 prose-strong:font-bold">
              <Markdown>{report}</Markdown>
            </div>
            
            <button 
              onClick={() => setReport("")}
              className="mt-4 text-[10px] font-bold text-zinc-600 uppercase tracking-tighter hover:text-blue-500 transition-colors"
            >
              Regenerate Report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}