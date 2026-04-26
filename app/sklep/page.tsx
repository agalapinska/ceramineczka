import Link from "next/link";
import { getProducts } from "@/lib/notion";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { CategoryBand } from "@/components/CategoryBand";
import { Bestsellers } from "@/components/Bestsellers";
import { ItalicPlay } from "@/components/ItalicPlay";
import { AddToCartButton } from "@/components/AddToCartButton";
import { photoForProduct } from "@/lib/photos";

export const revalidate = 600;

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
          {products.map((p, i) => {
            const sold = p.status === "Done" ? false : false; // schema na przyszłość
            const onOrder = p.status === "Not started";
            return (
              <li
                key={p.numer}
                className={`group flex flex-col border-b border-r border-ink relative ${
                  i % 3 === 2 ? "md:border-r-0" : ""
                }`}
              >
                <Link
                  href={`/sklep/${p.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Otwórz produkt ${p.name}`}
                />

                <div className="aspect-square flex items-center justify-center p-s5 bg-cream relative overflow-hidden">
                  <img
                    src={photoForProduct(p)}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  {(onOrder || sold) && (
                    <span className="absolute top-s3 left-s3 bg-ink text-cream caption px-s2 py-s1 z-[1]">
                      {sold ? "sprzedana" : "na zamówienie"}
                    </span>
                  )}
                  <span className="absolute bottom-s3 right-s3 caption bg-cream border border-ink px-s2 py-s1 opacity-0 group-hover:opacity-100 transition-opacity z-[1]">
                    zobacz →
                  </span>
                </div>

                <div className="border-t border-ink p-s3">
                  <div className="flex items-start justify-between caption mb-s2">
                    <span>{p.numer} · {p.typ}</span>
                    <span>{p.edycja}</span>
                  </div>
                  <h3 className="font-display font-medium text-display-s group-hover:italic transition-all">
                    <ItalicPlay text={p.opisKursywa} />
                  </h3>
                  <div className="mt-s3 flex items-end justify-between">
                    <span className="italic-accent text-body-l">{p.szkliwo}</span>
                    <span className="font-display font-medium text-xl">{p.cena} zł</span>
                  </div>
                  <div className="mt-s3 relative z-20">
                    <AddToCartButton
                      product={{
                        numer: p.numer,
                        slug: p.slug,
                        name: p.name,
                        cena: p.cena,
                        typ: p.typ,
                        zdjecie: photoForProduct(p),
                      }}
                      className="w-full border border-ink px-s3 py-s2 caption hover:bg-ink hover:text-cream transition-colors"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <CategoryBand />
    </PageShell>
  );
}
