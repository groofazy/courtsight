"use client";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function Header() {
  const { bookmarks } = useBookmarks();

  const navLinks = [
    { name: "players", href: "/" },
    { name: "programs", href: "/programs" },
    { name: "services", href: "/services" },
    { name: "contact us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <nav className="flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-emerald-500 transition-colors"
          >
            {link.name}
          </Link>
        ))}
        
        {/* Shortlist Link with Live Counter */}
        <Link 
          href="/bookmarks" 
          className="flex items-center gap-2 group border-l border-zinc-800 pl-8 transition-all"
        >
          <Bookmark 
            size={14} 
            className={`transition-colors ${
              bookmarks.length > 0 ? "text-emerald-500 fill-emerald-500/20" : "text-zinc-500 group-hover:text-emerald-500"
            }`} 
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-emerald-500 transition-colors">
            Shortlist
          </span>
          {bookmarks.length > 0 && (
            <span className="flex items-center justify-center bg-emerald-500 text-black text-[9px] font-black h-4 w-4 rounded-full ml-1 animate-in zoom-in duration-300">
              {bookmarks.length}
            </span>
          )}
        </Link>
      </nav>
      
      <h1 className="font-audiowide text-2xl text-white lowercase tracking-tighter">
        courtsight
      </h1>
    </header>
  );
}