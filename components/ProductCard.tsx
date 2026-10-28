import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";
import { photoForProduct } from "@/lib/photos";
import { ItalicPlay } from "./ItalicPlay";
import { ArrowBox, Dash } from "./ui";

const tagFor: Record<Product["edycja"], string> = {
  jednorazowa: "unikat",
  limitowana: "seria limitowana",
  stała: "na zamówienie",
};

/** Karta produktu w siatce z liniami — zdjęcie w ramce, numer, tytuł, kreska, cena, strzałka. */
export function ProductCard({ product: p, action }: { product: Product; action?: ReactNode }) {
  return (
    <li className="group relative border-r border-b border-line p-s4 flex flex-col">
      <Link
        href={`/sklep/${p.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Otwórz produkt ${p.name}`}
      />
      <div className="inset-photo relative aspect-[4/5]">
        <img
          src={photoForProduct(p)}
          alt={p.name}
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {p.status === "Not started" && (
          <span className="absolute top-s3 left-s3 bg-paper border border-line caption px-s2 py-s1">
            na zamówienie
          </span>
        )}
      </div>

      <div className="mt-s4 flex items-center justify-between caption text-ink-60">
        <span>{p.numer}</span>
        <span>{tagFor[p.edycja]}</span>
      </div>
      <h3 className="label-title mt-s3">
        <ItalicPlay text={p.opisKursywa || p.name} />
      </h3>
      <Dash className="mt-s4" />
      <div className="mt-s4 flex-1 flex items-end justify-between gap-s3">
        <div>
          <p className="text-body-m text-ink-60">{p.szkliwo}</p>
          <p className="font-display font-medium text-xl mt-s1">{p.cena} zł</p>
        </div>
        <ArrowBox />
      </div>
      {action && <div className="relative z-20 mt-s4">{action}</div>}
    </li>
  );
}

/** Siatka kart z liniami podziału (krawędzie zewnętrzne chowa overflow). */
export function ProductGrid({
  children,
  cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}: {
  children: ReactNode;
  cols?: string;
}) {
  return (
    <div className="overflow-hidden">
      <ul className={`grid ${cols} -mr-px -mb-px`}>{children}</ul>
    </div>
  );
}
