import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Ingredients } from "@/components/Ingredients";
import { Journal, JournalView, type JournalEntry } from "@/components/Journal";
import { SectionHead } from "@/components/ui";
import { articles, zywioly } from "@/lib/articles";

export const metadata = {
  title: "Dziennik · Ceramineczka",
  description: "Zapiski z pracowni. Wypały, gliny, szkliwa.",
};

export default function Dziennik() {
  // Do klienta idą tylko pola potrzebne na liście (bez treści wpisów).
  const entries: JournalEntry[] = articles.map(({ slug, zywiol, title, lead, data, czas, cover }) => ({
    slug,
    zywiol,
    title,
    lead,
    data,
    czas,
    cover,
  }));

  return (
    <PageShell>
      <PageHero
        eyebrow="03 / dziennik"
        title="Zapiski z pracowni."
        lead="Co się dzieje między wypałami. Trzy żywioły, cztery pory roku, jeden piec."
        meta={`${articles.length} wpisów`}
      />

      {/* Żywioły (reused Ingredients component) */}
      <Ingredients />

      {/* Articles grid */}
      <section id="artykuly" className="border-b border-line">
        <SectionHead eyebrow="Artykuły" title="Najnowsze wpisy." />

        <Suspense fallback={<JournalView articles={entries} zywioly={zywioly} active={null} />}>
          <Journal articles={entries} zywioly={zywioly} />
        </Suspense>
      </section>
    </PageShell>
  );
}
