import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";
import { photoForProduct } from "@/lib/photos";
import { ItalicPlay } from "./ItalicPlay";
import { Photo } from "./Photo";
import { ArrowBox, Dash } from "./ui";

const tagFor: Record<Product["edycja"], string> = {
  jednorazowa: "unikat",
  limitowana: "seria limitowana",
  stała: "na zamówienie",
};

/** Karta produktu w siatce z liniami — zdjęcie w ramce, numer, tytuł, kreska, cena, strzałka. */
export function ProductCard({ product: p, action }: { product: Product; action?: ReactNode }) {
  return (
    <li className="group relative border-r border-b border-line p-s3 sm:p-s4 flex flex-col">
      <Link
        href={`/sklep/${p.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Otwórz produkt ${p.name}`}
      />
      <div className="inset-photo relative aspect-[4/5]">
        <Photo
          src={photoForProduct(p)}
          alt={p.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {p.status === "Not started" && (
          <span className="absolute top-s2 left-s2 sm:top-s3 sm:left-s3 bg-paper border border-line caption text-[0.625rem] sm:text-caption px-s2 py-s1">
            na zamówienie
          </span>
        )}
      </div>

      <div className="mt-s3 sm:mt-s4 flex items-center justify-between gap-s2 caption text-ink-60">
        <span>{p.numer}</span>
        <span className="hidden sm:inline">{tagFor[p.edycja]}</span>
      </div>
      <h3 className="label-title text-[0.9375rem] sm:text-display-s mt-s2 sm:mt-s3">
        <ItalicPlay text={p.opisKursywa || p.name} />
      </h3>
      <Dash className="hidden sm:block mt-s4" />
      <div className="mt-s2 sm:mt-s4 flex-1 flex items-end justify-between gap-s3">
        <div className="min-w-0">
          <p className="text-[0.8125rem] sm:text-body-m text-ink-60 truncate">{p.szkliwo}</p>
          <p className="font-display font-medium text-lg sm:text-xl mt-s1">{p.cena} zł</p>
        </div>
        <ArrowBox className="hidden sm:inline-flex" />
      </div>
      {action && <div className="relative z-20 mt-s3 sm:mt-s4">{action}</div>}
    </li>
  );
}

/**
 * Siatka kart z liniami podziału (krawędzie zewnętrzne chowa overflow).
 * `rail` — na telefonie poziomy rząd przesuwany palcem zamiast długiej kolumny.
 */
export function ProductGrid({
  children,
  cols = "grid-cols-2 lg:grid-cols-4",
  rail = false,
}: {
  children: ReactNode;
  cols?: string;
  rail?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <ul className={`${rail ? "rail" : "grid"} ${cols} -mr-px -mb-px`}>{children}</ul>
    </div>
  );
}
