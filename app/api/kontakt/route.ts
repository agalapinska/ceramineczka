import { NextResponse } from "next/server";
import { FormError, clientIp, parseContact, rateLimit, saveContact } from "@/lib/forms";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) throw new FormError("Nieprawidłowe dane.");
    // Honeypot: pole niewidoczne dla ludzi; boty je wypełniają.
    if (typeof body.website === "string" && body.website) return NextResponse.json({ ok: true });

    const input = parseContact(body);
    rateLimit(`kontakt:${clientIp(req)}`);
    await saveContact(input);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[kontakt] zapis do Notion nie powiódł się:", err);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Napisz proszę na sklep@ceramineczka.pl." },
      { status: 502 }
    );
  }
}
