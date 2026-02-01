"use client";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    <div className="relative h-[30vh] flex items-center justify-center overflow-hidden">
      <motion.h2
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="font-audiowide text-5xl md:text-7xl text-white uppercase italic tracking-tighter"
      >
        the future of recruiting
      </motion.h2>
    </div>
  );
}