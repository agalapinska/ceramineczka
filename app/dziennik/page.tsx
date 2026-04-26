import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Ingredients } from "@/components/Ingredients";
import { ItalicPlay } from "@/components/ItalicPlay";
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
    <Link
      href={`/dziennik/${a.slug}`}
      className={`group flex flex-col border border-ink bg-cream ${
        large ? "md:col-span-2 md:row-span-2" : ""
      } hover:bg-ink hover:text-cream transition-colors`}
    >
      <div className={`overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <img
          src={a.cover}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-s4 flex flex-col gap-s3 flex-1">
        <div className="flex items-center justify-between caption">
          <span>{a.zywiol}</span>
          <span>{fmt(a.data)} · {a.czas}</span>
        </div>
        <h3
          className={`font-display font-medium tracking-tight ${
            large ? "text-display-m" : "text-display-s"
          }`}
        >
          <ItalicPlay text={a.title} />
        </h3>
        <p className="italic-accent text-body-l mt-auto">
          <ItalicPlay text={a.lead} />
        </p>
        <span className="caption underline underline-offset-4 mt-s3">czytaj →</span>
      </div>
    </Link>
  );
}

export default function Dziennik() {
  const [lead, ...rest] = articles;

  return (
    <PageShell>
      <PageHero
        eyebrow="03 / dziennik"
        title="zapiski *z pracowni*"
        lead="Co się dzieje między wypałami. Trzy *żywioły*, cztery pory roku, jeden piec."
        meta={`${articles.length} wpisów`}
      />

      {/* Żywioły (reused Ingredients component) */}
      <Ingredients />

      {/* Filter by żywioł */}
      <section className="bg-cream border-b border-ink px-s5 md:px-s6 py-s4 flex flex-wrap gap-s2">
        <span className="caption self-center mr-s3">filtruj:</span>
        <button className="border border-ink px-s3 py-s2 caption bg-ink text-cream">wszystkie</button>
        {zywioly.map((z) => (
          <button
            key={z.key}
            className="border border-ink px-s3 py-s2 caption hover:bg-ink hover:text-cream transition-colors"
          >
            {z.label}
          </button>
        ))}
      </section>

      {/* Articles grid */}
      <section id="artykuly" className="px-s5 md:px-s6 py-s6 bg-cream border-b border-ink">
        <div className="grid grid-cols-12 gap-s4 mb-s5">
          <p className="caption col-span-12 md:col-span-2">ARTYKUŁY</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="najnowsze *wpisy*" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-s4">
          <ArticleCard a={lead} large />
          {rest.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
