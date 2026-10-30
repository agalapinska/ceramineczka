import type { Product } from "./products";

// Filtry sklepu — wspólne dla serwera (linki) i klienta (filtrowanie).
export const TYPY = [
  { key: "wszystko", label: "wszystko", typ: null },
  { key: "kubki", label: "kubki", typ: "kubek" },
  { key: "miski", label: "miski", typ: "miska" },
  { key: "wazony", label: "wazony", typ: "wazon" },
  { key: "talerze", label: "talerze", typ: "talerz" },
  { key: "dzbanki", label: "dzbanki", typ: "dzbanek" },
] as const;

export const SORTY = [
  { key: "najnowsze", label: "najnowsze" },
  { key: "cena-rosnaco", label: "od najtańszych" },
  { key: "cena-malejaco", label: "od najdroższych" },
] as const;

export type TypKey = (typeof TYPY)[number]["key"];
export type SortKey = (typeof SORTY)[number]["key"];

export function parseTyp(v: string | null | undefined): TypKey {
  return TYPY.some((t) => t.key === v) ? (v as TypKey) : "wszystko";
}
export function parseSort(v: string | null | undefined): SortKey {
  return SORTY.some((s) => s.key === v) ? (v as SortKey) : "najnowsze";
}

/** Numer „CER-12” → 12, do stabilnego sortowania. */
function numerValue(p: Product): number {
  const n = Number(p.numer.split("-").pop());
  return Number.isFinite(n) ? n : 0;
}

export function filterProducts(products: Product[], typ: TypKey, sort: SortKey): Product[] {
  const wanted = TYPY.find((t) => t.key === typ)?.typ ?? null;
  const list = wanted ? products.filter((p) => p.typ === wanted) : [...products];
  if (sort === "cena-rosnaco") return list.sort((a, b) => a.cena - b.cena);
  if (sort === "cena-malejaco") return list.sort((a, b) => b.cena - a.cena);
  // najnowsze: data wypału malejąco, bez daty na końcu, potem numer malejąco
  return list.sort((a, b) => {
    const da = a.dataWypalu ?? "";
    const db = b.dataWypalu ?? "";
    if (da !== db) return db.localeCompare(da);
    return numerValue(b) - numerValue(a);
  });
}

export function shopHref(typ: TypKey, sort: SortKey = "najnowsze"): string {
  const params = new URLSearchParams();
  if (typ !== "wszystko") params.set("typ", typ);
  if (sort !== "najnowsze") params.set("sort", sort);
  const q = params.toString();
  return q ? `/sklep?${q}` : "/sklep";
}
