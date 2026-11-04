import type { Product } from "./products";

// Fallback — jeśli produkt nie ma własnego zdjęcia, bierzemy jedno z portfolio.
const photoForTyp: Record<Product["typ"], string> = {
  kubek: "/foto/ceramika-4.jpg",
  miska: "/foto/ceramika-3.jpg",
  wazon: "/foto/ceramika-2.jpg",
  talerz: "/foto/ceramika-5.jpg",
  dzbanek: "/foto/ceramika-6.jpg",
  inne: "/foto/ceramika-7.jpg",
};

/** Hosts proxowane przez /api/img — Notion-signed URL-e wygasają. */
const PROXY_HOSTS = new Set([
  "prod-files-secure.s3.us-west-2.amazonaws.com",
  "s3.us-west-2.amazonaws.com",
  "www.notion.so",
]);

function viaProxy(url: string): string {
  try {
    const u = new URL(url);
    if (PROXY_HOSTS.has(u.hostname)) {
      return `/api/img?url=${encodeURIComponent(url)}`;
    }
  } catch {}
  return url;
}

/** Fallback po typie. */
export function photoForType(typ: string): string {
  return photoForTyp[(typ as Product["typ"]) ?? "inne"] ?? photoForTyp.inne;
}

type PhotoSource = { zdjecia?: string[]; zdjecie?: string; typ: string };

/** Główne zdjęcie produktu — pierwsze z `zdjecia[]` (lub `zdjecie`), fallback po typie. */
export function photoForProduct(p: PhotoSource): string {
  const first = p.zdjecia?.find((u) => u?.trim()) ?? p.zdjecie?.trim();
  return first ? viaProxy(first) : photoForType(p.typ);
}

/** Pełna galeria. Zwraca co najmniej jeden URL (fallback). */
export function galleryForProduct(p: PhotoSource): string[] {
  const arr = (p.zdjecia ?? []).filter((u) => u?.trim()).map(viaProxy);
  if (arr.length > 0) return arr;
  if (p.zdjecie?.trim()) return [viaProxy(p.zdjecie)];
  return [photoForType(p.typ)];
}
