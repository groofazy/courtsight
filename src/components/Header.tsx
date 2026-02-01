import Link from "next/link";

export default function Header() {
  const navLinks = [
    { name: "players", href: "/" },
    { name: "programs", href: "/programs" },
    { name: "services", href: "/services" },
    { name: "contact us", href: "/contact" },
  ];

  return (
    <header className="flex items-center justify-between px-12 py-6 bg-black border-b border-zinc-900">
      <nav className="flex gap-8">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      
      <h1 className="font-audiowide text-2xl text-white lowercase">
        courtsight
      </h1>
    </header>
  );
}