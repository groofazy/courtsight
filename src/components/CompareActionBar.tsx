"use client";
import Link from "next/link";
import { Swords } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CompareActionBarProps {
  selectedIds: string[];
}

export default function CompareActionBar({ selectedIds }: CompareActionBarProps) {
  return (
    <AnimatePresence>
      {selectedIds.length === 2 && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
        >
          <Link 
            href={`/compare?p1=${selectedIds[0]}&p2=${selectedIds[1]}`}
            className="flex items-center gap-3 bg-emerald-500 text-black px-8 py-4 rounded-full font-audiowide text-sm italic uppercase shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-all active:scale-95"
          >
            <Swords size={20} />
            Compare Selected Prospects
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}