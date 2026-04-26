const categories = [
  {
    label: "kubki",
    meta: "uno",
    desc: "do kawy, herbaty i cichej niedzieli",
    img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1200&q=80",
    href: "/sklep",
  },
  {
    label: "miski",
    meta: "dos",
    desc: "pod deser, zupę, klucze",
    img: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=1200&q=80",
    href: "/sklep",
  },
  {
    label: "wazony",
    meta: "tres",
    desc: "na kwiaty, gałęzie, nic",
    img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
    href: "/sklep",
  },
];

export function CategoryBand() {
  return (
    <section id="kategorie" className="grid grid-cols-1 md:grid-cols-3 border-b border-ink">
      {categories.map((c, i) => (
        <a
          key={c.label}
          href={c.href}
          className={`relative group min-h-[70vh] overflow-hidden bg-ink ${
            i < categories.length - 1 ? "md:border-r border-ink" : ""
          }`}
        >
          <img
            src={c.img}
            alt={c.label}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
          />
          {/* Vertical rotated label, like the "face/body" ref */}
          <span
            className="absolute top-1/2 left-s4 -translate-y-1/2 text-cream font-display font-medium text-[clamp(3rem,7vw,7rem)] tracking-tight leading-none"
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
        </a>
      ))}
    </section>
  );
}
