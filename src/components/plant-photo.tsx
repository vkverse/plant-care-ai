import Image from "next/image";

export function PlantPhoto({ src, alt }: { src?: string; alt: string }) {
  return src ? (
    <Image src={src} alt={alt} width={400} height={300} unoptimized />
  ) : (
    <div
      className="mini-plant"
      role="img"
      aria-label="Illustrated sample plant"
    >
      🌿
    </div>
  );
}
