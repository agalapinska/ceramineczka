import type { Product } from "./products";

const photoForTyp: Record<Product["typ"], string> = {
  kubek: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
  miska: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=800&q=80",
  wazon: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
  talerz: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
  dzbanek: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
  inne: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
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
