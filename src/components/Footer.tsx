"use client";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const socials = [
    { 
      icon: <Instagram size={20} />, 
      href: "https://instagram.com", // Replace with actual handle
      label: "Instagram" 
    },
    { 
      icon: <Linkedin size={20} />, 
      href: "https://www.linkedin.com/company/courtsighthq", // Replace with actual handle
      label: "LinkedIn" 
    },
  ];

  return (
    <footer className="mt-20 border-t border-zinc-900 py-16 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-8">
        
        {/* Social Links */}
        <div className="flex gap-8">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300"
            >
              <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all">
                {social.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {social.label}
              </span>
            </a>
          ))}
        </div>

        {/* Legal & Branding */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-zinc-800" />
            <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-[0.3em] font-audiowide">
              Scouting Portal
            </p>
            <div className="h-px w-8 bg-zinc-800" />
          </div>
          
          <div className="text-center space-y-1">
            <p className="text-zinc-400 text-sm">
              Data used by <span className="text-white font-medium">Copyright © 2026 BC High School Basketball Championships</span>
            </p>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">
              Unofficial Tournament Resource • Vancouver, BC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}