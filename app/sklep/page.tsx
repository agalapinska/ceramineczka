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

      {/* Filter bar — na telefonie jeden rząd przesuwany palcem */}
      <div className="border-b border-line py-s3 md:py-s4 md:px-s6 flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-s3 md:gap-s4">
        <ul className="no-scrollbar flex gap-s2 overflow-x-auto px-s4 md:px-0 caption">
          {tags.map((t, i) => (
            <li key={t} className="shrink-0">
              <button
                aria-pressed={i === 0}
                className={`border border-line px-s3 min-h-[2.75rem] md:min-h-0 md:py-s2 transition-colors ${
                  i === 0 ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper"
                }`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
        <div className="no-scrollbar caption flex items-center gap-s4 overflow-x-auto px-s4 md:px-0 text-ink-60 whitespace-nowrap">
          <span>Sortuj:</span>
          {sorts.map((s, i) => (
            <button
              key={s}
              aria-pressed={i === 0}
              className={`border-b py-s2 md:py-0 md:pb-[2px] ${
                i === 0 ? "text-ink border-line" : "border-transparent hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <section className="border-b border-line">
        <ProductGrid cols="grid-cols-2 lg:grid-cols-3">
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
