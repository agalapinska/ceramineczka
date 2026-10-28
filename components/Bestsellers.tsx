import type { Product } from "@/lib/products";
import { ProductCard, ProductGrid } from "./ProductCard";
import { ButtonLink, SectionHead } from "./ui";

export function Bestsellers({ products }: { products: Product[] }) {
  const list = products.slice(0, 4);
  return (
    <section id="kolekcja" className="border-b border-line">
      <SectionHead
        eyebrow="Świeża partia"
        title="Prosto z ostatniego wypału."
        action={<ButtonLink href="/sklep" className="w-full sm:w-auto">Cała kolekcja</ButtonLink>}
      />
      <ProductGrid>
        {list.map((p) => (
          <ProductCard key={p.numer} product={p} />
        ))}
      </ProductGrid>
    </section>
  );
}
