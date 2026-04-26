import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Pozwól Next/Vercel cache trzymać odpowiedzi długo — klucz to pełny URL z querystringiem.
export const revalidate = 31536000;

const ALLOWED_HOSTS = new Set([
  "prod-files-secure.s3.us-west-2.amazonaws.com",
  "s3.us-west-2.amazonaws.com",
  "www.notion.so",
  "images.unsplash.com",
]);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("url");
  if (!raw) {
    return NextResponse.json({ error: "Brak parametru url." }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy URL." }, { status: 400 });
  }

  if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: "Host niedozwolony." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(target.toString(), {
      // Cache na poziomie data cache Next.js — ograniczamy ruch do upstreamu.
      next: { revalidate: 86400 },
    });
  } catch (err) {
    console.error("[img proxy] fetch failed", err);
    return NextResponse.json({ error: "Błąd pobierania." }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: `Upstream ${upstream.status}.` },
      { status: upstream.status === 404 ? 404 : 502 },
    );
  }

  const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control":
        "public, max-age=31536000, s-maxage=2592000, stale-while-revalidate=86400, immutable",
    },
  });
}
