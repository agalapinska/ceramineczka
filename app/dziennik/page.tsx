import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Ingredients } from "@/components/Ingredients";
import { ItalicPlay } from "@/components/ItalicPlay";
import { ArrowBox, Dash, SectionHead } from "@/components/ui";
import { articles, zywioly, type Article } from "@/lib/articles";

export const metadata = {
  title: "Dziennik · Ceramineczka",
  description: "Zapiski z pracowni. Wypały, gliny, szkliwa.",
};

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
}

function ArticleCard({ a, large = false }: { a: Article; large?: boolean }) {
  return (
    <li className={`border-r border-b border-line ${large ? "md:col-span-2 md:row-span-2" : ""}`}>
      <Link href={`/dziennik/${a.slug}`} className="group h-full p-s4 flex flex-col">
        <div className={`inset-photo relative ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <img
            src={a.cover}
            alt=""
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-s4 flex items-center justify-between gap-s3 caption text-ink-60">
          <span className="text-ink">{a.zywiol}</span>
          <span>{fmt(a.data)} · {a.czas}</span>
        </div>
        <h3
          className={`mt-s3 font-display font-medium ${large ? "text-display-m" : "text-display-s"}`}
        >
          <ItalicPlay text={a.title} />
        </h3>
        <Dash className="mt-s4" />
        <div className="mt-s4 flex-1 flex items-end justify-between gap-s4">
          <p className={`text-ink-60 ${large ? "text-body-l max-w-xl" : "text-body-m"}`}>
            <ItalicPlay text={a.lead} />
          </p>
          <ArrowBox />
        </div>
      </Link>
    </li>
  );
}

export default function Dziennik() {
  const [lead, ...rest] = articles;

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

        {/* Filter by żywioł */}
        <div className="border-b border-line px-s4 md:px-s6 py-s4 flex flex-wrap items-center gap-s2 caption">
          <span className="text-ink-60 mr-s3">Filtruj:</span>
          <button className="border border-line px-s3 py-s2 bg-ink text-paper">wszystkie</button>
          {zywioly.map((z) => (
            <button
              key={z.key}
              className="border border-line px-s3 py-s2 hover:bg-ink hover:text-paper transition-colors"
            >
              {z.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden">
          <ul className="grid grid-cols-1 md:grid-cols-3 -mr-px -mb-px">
            <ArticleCard a={lead} large />
            {rest.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
