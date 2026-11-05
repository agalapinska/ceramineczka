import Link from "next/link";

const categories = [
  {
    label: "modern pomeranian folk",
    meta: "uno",
    desc: "nowoczesne interpretacje wzorów kaszubskiego haftu",
    img: "/foto/ceramika-4.jpg",
    href: "/sklep",
  },
  {
    label: "basic",
    meta: "dos",
    desc: "prace same szkliwa, bez wzorów",
    img: "/foto/ceramika-3.jpg",
    href: "/sklep",
  },
  {
    label: "outlet & future",
    meta: "tres",
    desc: "eksperymenty i prace z lekkim uszczerbkiem",
    img: "/foto/ceramika-7.jpg",
    href: "/sklep",
  },
];

export function CategoryBand() {
  return (
    <section id="kategorie" className="grid grid-cols-1 md:grid-cols-3 border-b border-ink overflow-hidden -mr-px">
      {categories.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          className="relative group min-h-[70vh] overflow-hidden bg-ink md:border-r border-ink"
        >
          <img
            src={c.img}
            alt={c.label}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
          />
          <span
            className="absolute top-1/2 left-s4 -translate-y-1/2 text-cream font-display font-medium text-[clamp(2.5rem,5vw,5rem)] tracking-tight leading-none max-w-[80%]"
            style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
          >
            {c.label}
          </span>
          <div className="relative z-10 h-full p-s5 flex flex-col justify-between text-cream">
            <span className="caption self-end">{c.meta}</span>
            <div className="flex items-end justify-between gap-s4">
              <p className="italic-accent text-body-l max-w-[60%]">{c.desc}</p>
              <span className="border border-cream px-s3 py-s2 caption group-hover:bg-cream group-hover:text-ink transition-colors">
                zobacz →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
