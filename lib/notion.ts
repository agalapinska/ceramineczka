import { Client } from "@notionhq/client";
import type { Product } from "./products";
import { products as fallbackProducts } from "./products";

const token = process.env.NOTION_TOKEN;
const dataSourceId =
  process.env.NOTION_DATA_SOURCE_ID ?? "349ec94a-fa69-8049-910c-000b4bed2fc7";

const notion = token ? new Client({ auth: token }) : null;

type Page = Extract<
  Awaited<ReturnType<Client["dataSources"]["query"]>>["results"][number],
  { properties: Record<string, unknown> }
>;

function plain(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return (prop.title ?? []).map((t: any) => t.plain_text).join("");
  if (prop.type === "rich_text") return (prop.rich_text ?? []).map((t: any) => t.plain_text).join("");
  return "";
}
function selectName(prop: any): string {
  return prop?.select?.name ?? "";
}
function statusName(prop: any): Product["status"] {
  const n = prop?.status?.name;
  if (n === "Done" || n === "In progress" || n === "Not started") return n;
  return "Not started";
}
function num(prop: any): number {
  return prop?.number ?? 0;
}
function multi(prop: any): string[] {
  return (prop?.multi_select ?? []).map((o: any) => o.name);
}
function dateStart(prop: any): string | undefined {
  return prop?.date?.start ?? undefined;
}
function checkbox(prop: any): boolean {
  return Boolean(prop?.checkbox);
}
function uniqueId(prop: any): string {
  const prefix = prop?.unique_id?.prefix ?? "";
  const n = prop?.unique_id?.number;
  return n != null ? `${prefix}-${n}` : "";
}
// Notion-hosted file URLs are signed and expire (~1h). External URLs are stable.
// `revalidate` na stronach + krótkie ISR utrzymuje świeże linki bez ręcznego cachowania.
// Notion-hosted file URLs są podpisane i wygasają (~1h). External URLs są stabilne.
// `revalidate` na stronach + krótkie ISR utrzymuje świeże linki bez ręcznego cachowania.
function fileUrls(prop: any): string[] {
  const arr = prop?.files;
  if (!Array.isArray(arr)) return [];
  return arr
    .map((f: any) =>
      f?.type === "external" ? f.external?.url : f?.file?.url,
    )
    .filter((u: unknown): u is string => typeof u === "string" && u.length > 0);
}

function mapPage(page: Page): Product {
  const p = page.properties as any;
  return {
    numer: uniqueId(p["Numer"]) || page.id.slice(0, 8),
    name: plain(p["Name"]),
    typ: (selectName(p["Typ"]) || "inne") as Product["typ"],
    kolekcja: selectName(p["Kolekcja"]),
    status: statusName(p["Status"]),
    cena: num(p["Cena"]),
    szkliwo: selectName(p["Szkliwo"]),
    edycja: (selectName(p["Edycja"]) || "jednorazowa") as Product["edycja"],
    wymiary: plain(p["Wymiary"]),
    wagaG: num(p["Waga (g)"]),
    opis: plain(p["Opis"]),
    opisKursywa: plain(p["Opis kursywą"]) || plain(p["Name"]),
    dataWypalu: dateStart(p["Data wypału"]),
    tagi: multi(p["Tagi"]),
    slug: plain(p["Slug"]),
    publikuj: checkbox(p["Publikuj"]),
    zdjecia: [...fileUrls(p["Zdjęcie"]), ...fileUrls(p["Zdjecia"])],
  };
}

/** Fetches products from Notion. Falls back to local mock data if NOTION_TOKEN is not set. */
export async function getProducts(): Promise<Product[]> {
  if (!notion) return fallbackProducts;

  try {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Publikuj", checkbox: { equals: true } },
      sorts: [{ property: "Numer", direction: "ascending" }],
      page_size: 50,
    });
    return (res.results as Page[]).map(mapPage);
  } catch (err) {
    console.warn("[notion] fetch failed, using fallback:", err);
    return fallbackProducts;
  }
}
