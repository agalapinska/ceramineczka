import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ItalicPlay } from "@/components/ItalicPlay";
import { Photo } from "@/components/Photo";
import { ArrowBox, Dash, Eyebrow, TextLink } from "@/components/ui";
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
      <article>
        {/* Article hero */}
        <header className="border-b border-line px-s4 md:px-s6 pt-s6 pb-s6 md:pb-s7">
          <div className="flex flex-wrap items-center justify-between gap-s3 caption">
            <Link href="/dziennik" className="hover:opacity-60 transition-opacity">← Dziennik</Link>
            <span className="text-ink-60">
              {a.zywiol} · {fmt(a.data)} · {a.czas}
            </span>
          </div>
          <div className="mt-s6 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-s5 items-end">
            <h1 className="font-display font-medium text-display-xl">
              <ItalicPlay text={a.title} />
            </h1>
            <p className="text-body-l max-w-md">
              <ItalicPlay text={a.lead} />
            </p>
          </div>
        </header>

        {/* Cover */}
        <div className="p-s4 md:p-s5 border-b border-line">
          <div className="inset-photo relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
            <Photo src={a.cover} alt="" sizes="100vw" priority />
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] border-b border-line">
          <aside className="hidden md:block px-s6 py-s6 border-r border-line caption space-y-s2">
            <p>Autor · {a.autor}</p>
            <p className="text-ink-60">{fmt(a.data)}</p>
            <p className="text-ink-60">{a.czas}</p>
          </aside>
          <div className="px-s4 md:px-s6 py-s6 flex flex-col gap-s5 max-w-3xl">
            <p className="md:hidden caption text-ink-60 -mb-s2">Autor · {a.autor}</p>
            {a.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display font-medium text-[1.25rem] md:text-display-s leading-[1.4]"
                    : "text-body-l leading-[1.7]"
                }
              >
                <ItalicPlay text={p} />
              </p>
            ))}
            <div className="mt-s4 border-t border-line pt-s4">
              <p className="caption">Koniec wpisu · {fmt(a.data)}</p>
              <p className="text-body-m text-ink-60 mt-s2">Dziękuję za uwagę. Do następnego wypału.</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      <section className="border-b border-line">
        <div className="border-b border-line px-s4 md:px-s6 py-s5 flex flex-wrap items-center justify-between gap-s4">
          <Eyebrow>Czytaj dalej</Eyebrow>
          <TextLink href="/dziennik">Wszystkie wpisy</TextLink>
        </div>
        <div className="overflow-hidden">
          <ul className="rail md:grid-cols-3 -mr-px -mb-px">
            {other.map((x) => (
              <li key={x.slug} className="border-r border-b border-line">
                <Link href={`/dziennik/${x.slug}`} className="group h-full p-s4 flex flex-col">
                  <div className="inset-photo relative aspect-[4/3]">
                    <Photo
                      src={x.cover}
                      alt=""
                      sizes="(min-width: 768px) 33vw, 80vw"
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="caption mt-s4 text-ink-60">{x.zywiol} · {fmt(x.data)}</p>
                  <h3 className="mt-s3 font-display font-medium text-display-s">
                    <ItalicPlay text={x.title} />
                  </h3>
                  <Dash className="mt-s4" />
                  <div className="mt-s4 flex-1 flex items-end justify-end">
                    <ArrowBox />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
