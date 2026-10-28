import { getProducts } from "@/lib/notion";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { CategoryBand } from "@/components/CategoryBand";
import { ProductCard, ProductGrid } from "@/components/ProductCard";
import { AddToCartButton } from "@/components/AddToCartButton";
import { photoForProduct } from "@/lib/photos";

export const revalidate = 600;

const tags = ["wszystko", "kubki", "miski", "wazony", "talerze", "dzbanki"];
const sorts = ["najnowsze", "od najtańszych", "od najdroższych"];

export default async function Sklep() {
  const products = (await getProducts()).filter((p) => p.publikuj);

  return (
    <PageShell>
      <PageHero
        eyebrow="01 / sklep"
        title="Cała kolekcja."
        lead="Ręcznie toczone kubki, miski, wazony i talerze. Każdy egzemplarz z numerem i datą wypału."
        meta={`${products.length} sztuk w sprzedaży`}
      />

      {/* Filter bar */}
      <div className="border-b border-line px-s4 md:px-s6 py-s4 flex flex-wrap items-center justify-between gap-s4">
        <ul className="flex flex-wrap gap-s2 caption">
          {tags.map((t, i) => (
            <li key={t}>
              <button
                className={`border border-line px-s3 py-s2 transition-colors ${
                  i === 0 ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper"
                }`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
        <div className="caption flex flex-wrap items-center gap-s4 text-ink-60">
          <span>Sortuj:</span>
          {sorts.map((s, i) => (
            <button
              key={s}
              className={`border-b pb-[2px] ${
                i === 0 ? "text-ink border-line" : "border-transparent hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <section className="border-b border-line">
        <ProductGrid cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.numer}
              product={p}
              action={
                <AddToCartButton
                  product={{
                    numer: p.numer,
                    slug: p.slug,
                    name: p.name,
                    cena: p.cena,
                    typ: p.typ,
                    zdjecie: photoForProduct(p),
                  }}
                />
              }
            />
          ))}
        </ProductGrid>
      </section>

      <CategoryBand />
    </PageShell>
  );
}
