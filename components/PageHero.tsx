import { ItalicPlay } from "./ItalicPlay";
import { Photo } from "./Photo";
import { Eyebrow } from "./ui";

/** Standardowy hero podstron — eyebrow, duży tytuł, lead; opcjonalnie zdjęcie w ramce po prawej. */
export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  image,
}: {
  eyebrow: string; // e.g. "02 / sklep"
  title: string; // supports *accent*
  lead?: string; // supports *accent*
  meta?: string;
  image?: { src: string; alt: string };
}) {
  if (image) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] border-b border-line">
        <div className="px-s4 md:px-s6 pt-s6 pb-s5 md:pb-s6 flex flex-col">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-s5 md:mt-s6 font-display font-medium text-display-xl first-letter:uppercase">
            <ItalicPlay text={title} />
          </h1>
          {lead && (
            <p className="mt-s4 md:mt-s6 text-body-l max-w-md">
              <ItalicPlay text={lead} />
            </p>
          )}
          {meta && <p className="mt-s5 caption text-ink-60">{meta}</p>}
        </div>
        <div className="px-s4 pb-s4 md:p-s5 md:pl-0">
          <div className="inset-photo relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[28rem]">
            <Photo src={image.src} alt={image.alt} sizes="(min-width: 768px) 52vw, 100vw" priority />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-line px-s4 md:px-s6 pt-s6 pb-s6 md:pb-s7">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mt-s5 md:mt-s6 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-s4 md:gap-s5 items-end">
        <h1 className="font-display font-medium text-display-xl first-letter:uppercase">
          <ItalicPlay text={title} />
        </h1>
        <div className="flex flex-col gap-s4">
          {lead && (
            <p className="text-body-l max-w-md">
              <ItalicPlay text={lead} />
            </p>
          )}
          {meta && <p className="caption text-ink-60">{meta}</p>}
        </div>
      </div>
    </section>
  );
}
