"use client";
import { motion } from "framer-motion";

export default function WelcomeHero() {
  return (
    // Add pointer-events-none here
    <div className="relative h-[30vh] flex items-center justify-center overflow-hidden pointer-events-none">
      <motion.h2
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        // Add pointer-events-auto here if you want the text itself to be interactive
        className="font-audiowide text-5xl md:text-7xl text-white uppercase italic tracking-tighter pointer-events-auto"
      >
        welcome to hoopsight
      </motion.h2>
    </div>
  );
}