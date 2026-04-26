import { ItalicPlay } from "./ItalicPlay";

/** Standard subpage hero — mirrors brand rules from Slajd 41. */
export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
}: {
  eyebrow: string; // e.g. "02 / sklep"
  title: string; // supports *italic*
  lead?: string; // supports *italic*
  meta?: string;
}) {
  return (
    <section className="px-s5 md:px-s6 py-s7 border-b border-ink bg-cream">
      <div className="grid grid-cols-12 gap-s4">
        <p className="caption col-span-12 md:col-span-2">{eyebrow}</p>
        <h1 className="col-span-12 md:col-span-10 font-display font-medium text-display-xl leading-[0.9] tracking-[-0.03em]">
          <ItalicPlay text={title} />
        </h1>
        {lead && (
          <p className="col-start-1 md:col-start-3 col-span-12 md:col-span-7 mt-s4 text-body-l italic-accent">
            <ItalicPlay text={lead} />
          </p>
        )}
        {meta && (
          <p className="col-span-12 md:col-span-2 mt-s4 caption self-end text-right">{meta}</p>
        )}
      </div>
    </section>
  );
}
