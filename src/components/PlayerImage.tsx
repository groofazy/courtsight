import Image from "next/image";

interface PlayerImageProps {
  src?: string;
  name: string;
  className?: string;
}

export default function PlayerImage({ src, name, className = "" }: PlayerImageProps) {
  // If no image, return a styled placeholder with initials
  if (!src) {
    return (
      <div className={`bg-zinc-800 flex items-center justify-center overflow-hidden ${className}`}>
        <span className="font-audiowide text-4xl text-zinc-700 select-none">
          {name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
    </div>
  );
}