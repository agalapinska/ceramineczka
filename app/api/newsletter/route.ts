import { NextResponse } from "next/server";
import { FormError, clientIp, rateLimit, saveNewsletter, validEmail } from "@/lib/forms";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) throw new FormError("Nieprawidłowe dane.");
    if (typeof body.website === "string" && body.website) return NextResponse.json({ ok: true });

    const email = validEmail(body.email);
    rateLimit(`newsletter:${clientIp(req)}`);
    const { already } = await saveNewsletter(email, String(body.zrodlo ?? ""));
    return NextResponse.json({ ok: true, already });
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[newsletter] zapis do Notion nie powiódł się:", err);
    return NextResponse.json(
      { error: "Nie udało się zapisać. Spróbuj ponownie za chwilę." },
      { status: 502 }
    );
  }
}
