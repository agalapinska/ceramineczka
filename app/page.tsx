import { getProducts } from "@/lib/notion";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Bestsellers } from "@/components/Bestsellers";
import { CategoryBand } from "@/components/CategoryBand";
import { Ingredients } from "@/components/Ingredients";
import { StatsCta } from "@/components/StatsCta";

export const revalidate = 600; // ISR: refresh from Notion every 10 minutes

export default async function Home() {
  const products = (await getProducts()).filter((p) => p.publikuj);

  return (
    <PageShell>
      <Hero />
      <Features />
      <Bestsellers products={products} />
      <CategoryBand />
      <Ingredients />
      <StatsCta />
    </PageShell>
  );
}
