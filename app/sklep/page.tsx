import { getProducts } from "@/lib/notion";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { CategoryBand } from "@/components/CategoryBand";
import { Bestsellers } from "@/components/Bestsellers";
import { ItalicPlay } from "@/components/ItalicPlay";

export const revalidate = 600;

const photoFor: Record<string, string> = {
  kubek: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
  miska: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=800&q=80",
  wazon: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
  talerz: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
  dzbanek: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
  inne: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
};

const tags = ["wszystko", "kubki", "miski", "wazony", "talerze", "dzbanki"];

export default async function Sklep() {
  const products = (await getProducts()).filter((p) => p.publikuj);

  return (
    <PageShell>
      <PageHero
        eyebrow="01 / sklep"
        title="cała *kolekcja*"
        lead="*Ręcznie* toczone kubki, miski, wazony, talerze. Każdy egzemplarz z numerem i datą wypału."
        meta={`${products.length} sztuk`}
      />

      {/* Filter bar */}
      <div className="sticky top-[61px] z-10 bg-cream border-b border-ink px-s5 py-s3 flex flex-wrap items-center justify-between gap-s3">
        <ul className="flex flex-wrap gap-s2 caption">
          {tags.map((t, i) => (
            <li key={t}>
              <button
                className={`border border-ink px-s3 py-s2 ${
                  i === 0 ? "bg-ink text-cream" : "bg-cream hover:bg-ink hover:text-cream transition-colors"
                }`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
        <div className="caption flex gap-s4">
          <span>sortuj: ·</span>
          <button className="italic-accent">najnowsze</button>
          <button>od najtańszych</button>
          <button>od najdroższych</button>
        </div>
      </div>

      {/* Featured bestsellers strip */}
      <Bestsellers products={products} />

      {/* Full catalog grid — Typology-inspired 3-col with lifestyle inserts */}
      <section className="bg-cream border-b border-ink">
        <ul className="grid grid-cols-2 md:grid-cols-3 border-t border-ink">
          {products.map((p, i) => (
            <li
              key={p.numer}
              className={`flex flex-col border-b border-r border-ink ${
                i % 3 === 2 ? "md:border-r-0" : ""
              }`}
            >
              <div className="aspect-square flex items-center justify-center p-s5 bg-cream">
                <img
                  src={photoFor[p.typ] ?? photoFor.inne}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="border-t border-ink p-s3">
                <div className="flex items-start justify-between caption mb-s2">
                  <span>{p.numer} · {p.typ}</span>
                  <span>{p.edycja}</span>
                </div>
                <h3 className="font-display font-medium text-display-s">
                  <ItalicPlay text={p.opisKursywa} />
                </h3>
                <div className="mt-s3 flex items-end justify-between">
                  <span className="italic-accent text-body-l">{p.szkliwo}</span>
                  <span className="font-display font-medium text-xl">{p.cena} zł</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CategoryBand />
    </PageShell>
  );
}
