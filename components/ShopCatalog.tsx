"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/products";
import { photoForProduct } from "@/lib/photos";
import {
  SORTY,
  TYPY,
  filterProducts,
  parseSort,
  parseTyp,
  shopHref,
  type SortKey,
  type TypKey,
} from "@/lib/catalog";
import { AddToCartButton } from "./AddToCartButton";
import { ProductCard, ProductGrid } from "./ProductCard";
import { buttonClass, Icon } from "./ui";

/** Widok katalogu — bez hooków, renderowany też na serwerze jako fallback. */
export function CatalogView({
  products,
  typ,
  sort,
}: {
  products: Product[];
  typ: TypKey;
  sort: SortKey;
}) {
  const list = filterProducts(products, typ, sort);
  const counts = new Map(TYPY.map((t) => [t.key, filterProducts(products, t.key, sort).length]));

  return (
    <>
      {/* Filter bar — na telefonie jeden rząd przesuwany palcem */}
      <div className="border-b border-line py-s3 md:py-s4 md:px-s6 flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-s3 md:gap-s4">
        <ul className="no-scrollbar flex gap-s2 overflow-x-auto px-s4 md:px-0 caption" aria-label="Kategoria">
          {TYPY.map((t) => {
            const active = t.key === typ;
            return (
              <li key={t.key} className="shrink-0">
                <Link
                  href={shopHref(t.key, sort)}
                  scroll={false}
                  replace
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-s2 border border-line px-s3 min-h-[2.75rem] md:min-h-0 md:py-s2 transition-colors ${
                    active ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper"
                  }`}
                >
                  {t.label}
                  <span className={active ? "opacity-60" : "text-ink-60"}>{counts.get(t.key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="no-scrollbar caption flex items-center gap-s4 overflow-x-auto px-s4 md:px-0 text-ink-60 whitespace-nowrap">
          <span>Sortuj:</span>
          {SORTY.map((s) => {
            const active = s.key === sort;
            return (
              <Link
                key={s.key}
                href={shopHref(typ, s.key)}
                scroll={false}
                replace
                aria-current={active ? "true" : undefined}
                className={`border-b py-s2 md:py-0 md:pb-[2px] ${
                  active ? "text-ink border-line" : "border-transparent hover:text-ink"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      <section className="border-b border-line" aria-live="polite">
        {list.length > 0 ? (
          <ProductGrid cols="grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
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
        ) : (
          <div className="px-s4 md:px-s6 py-s7">
            <p className="text-body-l max-w-md">
              W tej kategorii nie ma teraz żadnych sztuk. Zajrzyj po następnym wypale albo napisz
              o zamówienie indywidualne.
            </p>
            <div className="mt-s5 flex flex-wrap gap-s3">
              <Link
                href={shopHref("wszystko", sort)}
                scroll={false}
                replace
                className={buttonClass("solid", "w-full sm:w-auto")}
              >
                <span>Pokaż wszystko</span>
                <Icon name="arrow" className="w-5 h-5" />
              </Link>
              <Link href="/kontakt" className={buttonClass("outline", "w-full sm:w-auto")}>
                <span>Zamówienie indywidualne</span>
                <Icon name="arrow" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

/** Katalog z filtrami zapisanymi w adresie (?typ=kubki&sort=cena-rosnaco). */
export function ShopCatalog({ products }: { products: Product[] }) {
  const params = useSearchParams();
  return (
    <CatalogView
      products={products}
      typ={parseTyp(params.get("typ"))}
      sort={parseSort(params.get("sort"))}
    />
  );
}
