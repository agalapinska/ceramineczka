import Link from "next/link";
import type { Product } from "@/lib/products";
import { ItalicPlay } from "./ItalicPlay";
import { photoForProduct } from "@/lib/photos";

const tagFor: Record<string, string> = {
  jednorazowa: "UNIKAT",
  limitowana: "SERIA LIMITOWANA",
  stała: "NA ZAMÓWIENIE",
};

export function Bestsellers({ products }: { products: Product[] }) {
  const list = products.slice(0, 4);
  if (list.length === 0) return null;
  return (
    <section id="kolekcja" className="bg-cream border-b border-ink">
      <div className="px-s5 py-s5 flex items-end justify-between">
        <h2 className="font-display font-medium text-display-m tracking-tight">
          <span className="caption block mb-s2">● pierwszy wypał</span>
          <ItalicPlay text="świeża *partia*" />
        </h2>
        <Link href="/sklep" className="caption underline underline-offset-4">
          cała kolekcja →
        </Link>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 border-t border-ink">
        {list.map((p, i) => (
          <li
            key={p.numer}
            className={`flex flex-col ${i < list.length - 1 ? "border-r border-ink" : ""}`}
          >
            <div className="px-s3 pt-s3 flex items-start justify-between caption">
              <span>{tagFor[p.edycja]}</span>
              <span>{p.typ}</span>
            </div>
            <div className="aspect-[4/5] bg-cream flex items-center justify-center p-s4">
              <img
                src={photoForProduct(p)}
                alt={p.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="border-t border-ink px-s3 py-s3 flex flex-col gap-s1">
              <p className="italic-accent text-body-l">
                <ItalicPlay text={p.opisKursywa} />
              </p>
              <div className="flex items-baseline justify-between">
                <span className="font-display font-medium text-xl">{p.cena} zł</span>
                <span className="caption opacity-60">{p.szkliwo}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
