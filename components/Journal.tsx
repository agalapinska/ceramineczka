"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ItalicPlay } from "./ItalicPlay";
import { Photo } from "./Photo";
import { ArrowBox, Dash } from "./ui";

export type JournalEntry = {
  slug: string;
  zywiol: string;
  title: string;
  lead: string;
  data: string;
  czas: string;
  cover: string;
};
export type Zywiol = { key: string; label: string };

function fmt(iso: string) {
  const d = new Date(iso);
  // UTC: ta sama data na serwerze i w przeglądarce (bez błędu hydratacji).
  return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
}

function href(zywiol: string | null) {
  return zywiol ? `/dziennik?zywiol=${encodeURIComponent(zywiol)}#artykuly` : "/dziennik#artykuly";
}

function ArticleCard({ a, large = false }: { a: JournalEntry; large?: boolean }) {
  return (
    <li className={`border-r border-b border-line ${large ? "md:col-span-2 md:row-span-2" : ""}`}>
      <Link href={`/dziennik/${a.slug}`} className="group h-full p-s4 flex flex-col">
        <div className={`inset-photo relative ${large ? "aspect-[16/10]" : "aspect-[16/9] sm:aspect-[4/3]"}`}>
          <Photo
            src={a.cover}
            alt=""
            sizes={large ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-s4 flex items-center justify-between gap-s3 caption text-ink-60">
          <span className="text-ink">{a.zywiol}</span>
          <span>{fmt(a.data)} · {a.czas}</span>
        </div>
        <h3
          className={`mt-s3 font-display font-medium ${large ? "text-[1.75rem] md:text-display-m" : "text-display-s"}`}
        >
          <ItalicPlay text={a.title} />
        </h3>
        <Dash className="mt-s4" />
        <div className="mt-s4 flex-1 flex items-end justify-between gap-s4">
          <p className={`text-ink-60 text-body-m ${large ? "md:text-body-l max-w-xl" : ""}`}>
            <ItalicPlay text={a.lead} />
          </p>
          <ArrowBox />
        </div>
      </Link>
    </li>
  );
}

/** Lista wpisów z filtrem żywiołu — bez hooków, renderowana też na serwerze. */
export function JournalView({
  articles,
  zywioly,
  active,
}: {
  articles: JournalEntry[];
  zywioly: readonly Zywiol[];
  active: string | null;
}) {
  const list = active ? articles.filter((a) => a.zywiol === active) : articles;
  const [lead, ...rest] = list;
  const chip = (on: boolean) =>
    `shrink-0 inline-flex items-center border border-line px-s3 min-h-[2.75rem] md:min-h-0 md:py-s2 transition-colors ${
      on ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper"
    }`;

  return (
    <>
      <div className="no-scrollbar border-b border-line px-s4 md:px-s6 py-s3 md:py-s4 flex items-center gap-s2 overflow-x-auto md:flex-wrap caption whitespace-nowrap">
        <span className="text-ink-60 mr-s3">Filtruj:</span>
        <Link href={href(null)} replace scroll={false} aria-current={!active ? "page" : undefined} className={chip(!active)}>
          wszystkie
        </Link>
        {zywioly.map((z) => (
          <Link
            key={z.key}
            href={href(z.key)}
            replace
            scroll={false}
            aria-current={active === z.key ? "page" : undefined}
            className={chip(active === z.key)}
          >
            {z.label}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden" aria-live="polite">
        {lead ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 -mr-px -mb-px">
            <ArticleCard a={lead} large />
            {rest.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </ul>
        ) : (
          <p className="px-s4 md:px-s6 py-s7 text-body-l max-w-md">
            Jeszcze nic tu nie ma.{" "}
            <Link href={href(null)} replace scroll={false} className="underline underline-offset-4">
              Pokaż wszystkie wpisy
            </Link>
            .
          </p>
        )}
      </div>
    </>
  );
}

export function Journal(props: { articles: JournalEntry[]; zywioly: readonly Zywiol[] }) {
  const params = useSearchParams();
  const z = params.get("zywiol");
  const active = props.zywioly.some((x) => x.key === z) ? z : null;
  return <JournalView {...props} active={active} />;
}
