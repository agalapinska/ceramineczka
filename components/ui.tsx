import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ---------- Ikony liniowe (stroke 1.25, 24×24) ---------- */

const icons = {
  arrow: <path d="M7 17 17 7M9 7h8v8" />,
  hand: (
    <>
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M11 10.5V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M14 10.5V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-.5a6 6 0 0 1-4.6-2.2L3.6 15a1.5 1.5 0 0 1 2.3-1.9L8 15" />
    </>
  ),
  flame: (
    <path d="M12 21c3.9 0 6.5-2.6 6.5-6.2 0-3.6-2.6-5.6-3.6-8.8-1.6 1.7-2 3.3-2 4.8-1-.8-1.8-2.4-1.8-4.3C8 8 5.5 11 5.5 14.8 5.5 18.4 8.1 21 12 21Z" />
  ),
  drop: <path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0c0-4.2 6-10.6 6-10.6Z" />,
  stamp: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.4a3.6 3.6 0 1 0 0 5.2" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 10h18a9 9 0 0 1-18 0Z" />
      <path d="M9 19.2V21h6v-1.8" />
    </>
  ),
  cup: (
    <>
      <path d="M5 7h11v7a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V7Z" />
      <path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16" />
    </>
  ),
  vase: <path d="M9.5 3h5M10 3v3c0 1.6-4 3.4-4 8.2C6 18 8.6 21 12 21s6-3 6-6.8C18 9.4 14 7.6 14 6V3" />,
  box: (
    <>
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
      <path d="M5 19 13 11" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h16" />,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, className = "w-6 h-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden
    >
      {icons[name]}
    </svg>
  );
}

/** Ikona w kwadratowej ramce — nagłówek kart cech. */
export function IconBox({ name }: { name: IconName }) {
  return (
    <span className="hairline inline-flex shrink-0 w-12 h-12 sm:w-[4.25rem] sm:h-[4.25rem] items-center justify-center bg-paper">
      <Icon name={name} className="w-6 h-6 sm:w-8 sm:h-8" />
    </span>
  );
}

/**
 * Karta z ikoną (01 / TYTUŁ / kreska / opis). Na telefonie układa się w wiersz
 * (ikona po lewej), od sm w kolumnę jak w referencji.
 */
export function IconCard({
  icon,
  index,
  title,
  children,
  href,
}: {
  icon: IconName;
  index?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <IconBox name={icon} />
      <div className="flex-1 min-w-0 flex flex-col sm:mt-s5">
        {index && <p className="caption">{index}</p>}
        <h3 className="label-title text-[1.0625rem] sm:text-display-s mt-s1 sm:mt-s3">{title}</h3>
        <Dash className="hidden sm:block mt-s4" />
        <div className="mt-s2 sm:mt-s4 flex-1 flex items-end justify-between gap-s4">
          <p className="text-body-m text-ink-60 max-w-[17rem]">{children}</p>
          {href && <ArrowBox className="hidden sm:inline-flex" />}
        </div>
      </div>
      {href && <Icon name="arrow" className="sm:hidden w-5 h-5 shrink-0 self-center" />}
    </>
  );
  const cls = "h-full p-s4 md:p-s5 flex gap-s4 sm:flex-col sm:gap-0";
  return href ? (
    <Link href={href} className={`group ${cls}`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Strzałka ↗ w kwadracie — prawy dolny róg kart. */
export function ArrowBox({ className = "" }: { className?: string }) {
  return (
    <span
      className={`hairline inline-flex w-11 h-11 shrink-0 items-center justify-center transition-colors group-hover:bg-ink group-hover:text-paper ${className}`}
      aria-hidden
    >
      <Icon name="arrow" className="w-5 h-5" />
    </span>
  );
}

/* ---------- Typografia ---------- */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`caption ${className}`}>{children}</p>;
}

export function Dash({ className = "" }: { className?: string }) {
  return <span className={`dash ${className}`} aria-hidden />;
}

/* ---------- Przyciski ---------- */

const btnBase =
  "group inline-flex items-center justify-between gap-s5 caption px-s4 py-[1.05rem] min-h-[3.25rem] sm:min-w-[14rem] border border-line transition-colors";
const btnVariants = {
  outline: "bg-paper text-ink hover:bg-ink hover:text-paper",
  solid: "bg-ink text-paper hover:bg-paper hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  variant = "outline",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof btnVariants;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={`${btnBase} ${btnVariants[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      <Icon name="arrow" className="w-5 h-5" />
    </Link>
  );
}

export function buttonClass(variant: keyof typeof btnVariants = "outline", extra = "") {
  return `${btnBase} ${btnVariants[variant]} ${extra}`;
}

/** Podkreślony link tekstowy ze strzałką — „READ REVIEWS ↗". */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="relative caption inline-flex items-center gap-s2 border-b border-line pb-[2px] hover:opacity-60 transition-opacity before:absolute before:-inset-x-2 before:-inset-y-3 before:content-['']"
    >
      {children}
      <Icon name="arrow" className="w-4 h-4" />
    </Link>
  );
}

/* ---------- Sekcje ---------- */

/** Nagłówek sekcji w ramce: eyebrow + tytuł po lewej, link po prawej. */
export function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="border-b border-line px-s4 md:px-s6 py-s6 flex flex-wrap items-end justify-between gap-x-s4 gap-y-s3">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-s3 md:mt-s4 font-display font-medium text-display-m max-w-3xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
