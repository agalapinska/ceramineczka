import Link from "next/link";
import type { Product } from "@/lib/products";
import { ItalicPlay } from "./ItalicPlay";

const photoFor: Record<string, string> = {
  kubek: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
  miska: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=800&q=80",
  wazon: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
  talerz: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
  dzbanek: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
  inne: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
};

const tagFor: Record<string, string> = {
  jednorazowa: "UNIKAT",
  limitowana: "SERIA LIMITOWANA",
  stała: "NA ZAMÓWIENIE",
};

export function Bestsellers({ products }: { products: Product[] }) {
  const list = products.slice(0, 4);
  return (
    <section id="kolekcja" className="bg-cream border-b border-ink">
      <div className="px-s5 py-s5 flex items-end justify-between">
        <h2 className="font-display font-medium text-display-m tracking-tight">
          <span className="caption block mb-s2">● bestsellery</span>
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
                src={photoFor[p.typ] ?? photoFor.inne}
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
