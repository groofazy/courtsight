interface ScoutNotesSectionProps {
  p1Name: string;
  p2Name: string;
  p1Id: string;
  p2Id: string;
  notes: Record<string, string>;
}

export default function ScoutNotesSection({
  p1Name,
  p2Name,
  p1Id,
  p2Id,
  notes,
}: ScoutNotesSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-0 divide-x divide-zinc-800">
      <div className="p-8 bg-emerald-500/[0.02]">
        <p className="text-[9px] text-emerald-500/50 uppercase font-bold mb-4 tracking-widest font-audiowide">Notes on {p1Name}</p>
        <p className="text-sm text-zinc-400 italic leading-relaxed">
          {notes[p1Id] ? `"${notes[p1Id]}"` : "No specific notes recorded for this prospect."}
        </p>
      </div>
      <div className="p-8 text-right bg-white/[0.01]">
        <p className="text-[9px] text-zinc-600 uppercase font-bold mb-4 tracking-widest font-audiowide">Notes on {p2Name}</p>
        <p className="text-sm text-zinc-400 italic leading-relaxed">
          {notes[p2Id] ? `"${notes[p2Id]}"` : "No specific notes recorded for this prospect."}
        </p>
      </div>
    </div>
  );
}