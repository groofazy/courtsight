import Link from "next/link";

export default function EmptyBookmarksState() {
  return (
    <div className="py-32 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
      <p className="text-zinc-600 font-medium mb-4">Your shortlist is empty.</p>
      <Link href="/" className="text-emerald-500 font-audiowide uppercase text-xs tracking-widest px-6 py-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 transition-all">
        Browse Players
      </Link>
    </div>
  );
}