import Link from "next/link";
import { Photo } from "./Photo";
import { ArrowBox, Dash, SectionHead } from "./ui";

const categories = [
  {
    label: "Kubki",
    desc: "Do kawy, herbaty i cichej niedzieli.",
    img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1200&q=80",
    href: "/sklep",
  },
  {
    label: "Miski",
    desc: "Pod deser, zupę, klucze.",
    img: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=1200&q=80",
    href: "/sklep",
  },
  {
    label: "Wazony",
    desc: "Na kwiaty, gałęzie albo na nic.",
    img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
    href: "/sklep",
  },
];

export function CategoryBand() {
  return (
    <section id="kategorie" className="border-b border-line">
      <SectionHead eyebrow="Kategorie" title="Kubki, miski, wazony." />
      <div className="overflow-hidden">
        <ul className="rail md:grid-cols-3 -mr-px -mb-px">
          {categories.map((c, i) => (
            <li key={c.label} className="border-r border-b border-line">
              <Link href={c.href} className="group h-full p-s4 flex flex-col">
                <div className="inset-photo relative aspect-[4/3]">
                  <Photo
                    src={c.img}
                    alt={c.label}
                    sizes="(min-width: 768px) 33vw, 80vw"
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="caption mt-s4 text-ink-60">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="label-title mt-s2 sm:mt-s3">{c.label}</h3>
                <Dash className="mt-s3 sm:mt-s4" />
                <div className="mt-s3 sm:mt-s4 flex-1 flex items-end justify-between gap-s4">
                  <p className="text-body-m text-ink-60">{c.desc}</p>
                  <ArrowBox />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
