import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ItalicPlay } from "@/components/ItalicPlay";
import { articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: `${a.title.replace(/\*/g, "")} · Dziennik · Ceramineczka` };
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  const other = articles.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <PageShell>
      {/* Article hero */}
      <article className="bg-cream">
        <header className="px-s5 md:px-s6 pt-s7 pb-s5 border-b border-ink">
          <div className="grid grid-cols-12 gap-s4">
            <div className="col-span-12 md:col-span-2 caption flex flex-col gap-s2">
              <Link href="/dziennik" className="underline underline-offset-4">← dziennik</Link>
              <span className="mt-s3">{a.zywiol}</span>
              <span className="opacity-60">{fmt(a.data)}</span>
              <span className="opacity-60">{a.czas}</span>
            </div>
            <h1 className="col-span-12 md:col-span-10 font-display font-medium text-display-xl leading-[0.9] tracking-[-0.03em]">
              <ItalicPlay text={a.title} />
            </h1>
            <p className="col-start-1 md:col-start-3 col-span-12 md:col-span-8 mt-s4 italic-accent text-body-l">
              <ItalicPlay text={a.lead} />
            </p>
          </div>
        </header>

        {/* Cover */}
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden border-b border-ink">
          <img src={a.cover} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Body */}
        <div className="px-s5 md:px-s6 py-s6 grid grid-cols-12 gap-s4 border-b border-ink">
          <aside className="col-span-12 md:col-span-2 caption">
            <p>autor · {a.autor}</p>
            <p className="mt-s2 opacity-60">{fmt(a.data)}</p>
          </aside>
          <div className="col-span-12 md:col-span-8 flex flex-col gap-s5">
            {a.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-display-s font-display font-medium leading-[1.15]" : "text-body-l leading-[1.6]"}>
                <ItalicPlay text={p} />
              </p>
            ))}
            <div className="mt-s4 border-t border-ink pt-s4 caption">
              <p>Koniec wpisu · {fmt(a.data)}</p>
              <p className="italic-accent mt-s2">
                <ItalicPlay text="*Dziękuję* za uwagę. Do następnego wypału." />
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      <section className="px-s5 md:px-s6 py-s6 bg-cream border-b border-ink">
        <div className="flex items-end justify-between mb-s5">
          <h2 className="font-display font-medium text-display-m">
            <ItalicPlay text="czytaj *dalej*" />
          </h2>
          <Link href="/dziennik" className="caption underline underline-offset-4">
            wszystkie wpisy →
          </Link>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-s4">
          {other.map((x) => (
            <li key={x.slug} className="border border-ink flex flex-col">
              <Link href={`/dziennik/${x.slug}`} className="block group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={x.cover}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-s3">
                  <p className="caption mb-s2">{x.zywiol} · {fmt(x.data)}</p>
                  <h3 className="font-display font-medium text-display-s">
                    <ItalicPlay text={x.title} />
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
