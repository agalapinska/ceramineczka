import { Suspense } from "react";
import { getProducts } from "@/lib/notion";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { CategoryBand } from "@/components/CategoryBand";
import { CatalogView, ShopCatalog } from "@/components/ShopCatalog";

export const revalidate = 600;

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

      {/* Bez JS (i przed hydratacją) serwer pokazuje pełną listę; filtry czytają ?typ=&sort= */}
      <Suspense fallback={<CatalogView products={products} typ="wszystko" sort="najnowsze" />}>
        <ShopCatalog products={products} />
      </Suspense>

      <CategoryBand />
    </PageShell>
  );
}
