import { Client } from "@notionhq/client";

// Zgłoszenia z formularzy lądują w Notion, na stronie „Ceramineczka — formularze”.
// Integracja z NOTION_TOKEN musi mieć dostęp do tej strony (••• → Connections).
const token = process.env.NOTION_TOKEN;
const contactDataSourceId =
  process.env.NOTION_CONTACT_DATA_SOURCE_ID ?? "f9f60eed-371f-402f-b09e-b7f94447bcad";
const newsletterDataSourceId =
  process.env.NOTION_NEWSLETTER_DATA_SOURCE_ID ?? "fb2924a5-88fe-4216-9b07-2adc544b4822";

const notion = token ? new Client({ auth: token }) : null;

import { POWODY, ZRODLA } from "./form-options";

export class FormError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function validEmail(v: unknown): string {
  const email = str(v, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) throw new FormError("Podaj poprawny adres e-mail.");
  return email;
}

/** Proste ograniczenie liczby zgłoszeń z jednego IP (w pamięci instancji). */
const hits = new Map<string, number[]>();
export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    throw new FormError("Za dużo prób. Spróbuj ponownie za kilka minut.", 429);
  }
  recent.push(now);
  hits.set(key, recent);
}

function requireNotion(): Client {
  if (!notion) {
    throw new FormError(
      "Formularz chwilowo nie działa. Napisz proszę na sklep@ceramineczka.pl.",
      503
    );
  }
  return notion;
}

const text = (content: string) => [{ type: "text" as const, text: { content } }];

export type ContactInput = { imie: string; email: string; powod: string; wiadomosc: string };

export function parseContact(body: Record<string, unknown>): ContactInput {
  const imie = str(body.imie, 100);
  const email = validEmail(body.email);
  const powodRaw = str(body.powod, 100);
  const powod = (POWODY as readonly string[]).includes(powodRaw) ? powodRaw : POWODY[0];
  const wiadomosc = str(body.wiadomosc, 2000);
  if (!imie) throw new FormError("Podaj imię.");
  if (wiadomosc.length < 5) throw new FormError("Napisz kilka słów wiadomości.");
  return { imie, email, powod, wiadomosc };
}

export async function saveContact(input: ContactInput) {
  await requireNotion().pages.create({
    parent: { type: "data_source_id", data_source_id: contactDataSourceId },
    properties: {
      "Imię": { title: text(input.imie) },
      Email: { email: input.email },
      "Powód": { select: { name: input.powod } },
      "Wiadomość": { rich_text: text(input.wiadomosc) },
    },
  });
}

/** Zapis do newslettera. Ponowny zapis tego samego adresu nie tworzy duplikatu. */
export async function saveNewsletter(email: string, zrodlo: string) {
  const client = requireNotion();
  const source = (ZRODLA as readonly string[]).includes(zrodlo) ? zrodlo : "inne";
  const existing = await client.dataSources.query({
    data_source_id: newsletterDataSourceId,
    filter: { property: "Email", title: { equals: email } },
    page_size: 1,
  });
  if (existing.results.length > 0) return { already: true };
  await client.pages.create({
    parent: { type: "data_source_id", data_source_id: newsletterDataSourceId },
    properties: {
      Email: { title: text(email) },
      "Źródło": { select: { name: source } },
      Aktywny: { checkbox: true },
    },
  });
  return { already: false };
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
