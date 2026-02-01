"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ComparisonCarousel({ player, peers }: { player: any, peers: any[] }) {
  const [index, setIndex] = useState(0);

  // Example Algorithm: Compare PPG to peers
  const ppgRank = peers.filter(p => p.stats.ppg < player.stats.ppg).length;
  const percentile = Math.round((ppgRank / peers.length) * 100);

  const slides = [
    { title: "Scoring Rank", value: `${percentile}%`, desc: `Higher PPG than ${percentile}% of ${player.bio.position}s` },
    { title: "Academic Standing", value: player.bio.gpa, desc: "Comparison based on Class of " + player.bio.grad },
    { title: "Efficiency", value: player.stats.shooting.fg + "%", desc: "Field Goal consistency vs District Average" }
  ];

  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 h-64 flex flex-col justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center space-y-2"
        >
          <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">{slides[index].title}</h4>
          <p className="font-audiowide text-6xl text-white">{slides[index].value}</p>
          <p className="text-zinc-500 text-sm">{slides[index].desc}</p>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-blue-500' : 'bg-zinc-700'}`} />
        ))}
      </div>
    </div>
  );
}