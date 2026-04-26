import { getProducts } from "@/lib/notion";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Bestsellers } from "@/components/Bestsellers";
import { CategoryBand } from "@/components/CategoryBand";
import { Bento } from "@/components/Bento";
import { Principles } from "@/components/Principles";
import { Ingredients } from "@/components/Ingredients";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export const revalidate = 600; // ISR: refresh from Notion every 10 minutes

export default async function Home() {
  const products = (await getProducts()).filter((p) => p.publikuj);

  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Bestsellers products={products} />
        <CategoryBand />
        <Bento products={products} />
        <Principles />
        <Ingredients />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
