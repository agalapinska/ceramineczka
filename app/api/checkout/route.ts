import { NextResponse } from "next/server";
import { getProducts } from "@/lib/notion";
import { getStripe, SHIPPING_PLN } from "@/lib/stripe";
import { photoForProduct } from "@/lib/photos";

export const runtime = "nodejs";

type Incoming = { items: { numer: string; qty: number }[] };

export async function POST(req: Request) {
  let body: Incoming;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  if (!body?.items?.length) {
    return NextResponse.json({ error: "Koszyk jest pusty." }, { status: 400 });
  }

  const catalog = await getProducts();
  const byNumer = new Map(catalog.map((p) => [p.numer, p]));

  const lineItems: Array<{
    quantity: number;
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: {
        name: string;
        description?: string;
        images?: string[];
        metadata: Record<string, string>;
      };
    };
  }> = [];

  for (const i of body.items) {
    const p = byNumer.get(i.numer);
    if (!p || !p.publikuj) {
      return NextResponse.json(
        { error: `Produkt ${i.numer} jest niedostępny.` },
        { status: 400 },
      );
    }
    const qty = Math.max(1, Math.min(10, Math.floor(i.qty)));
    lineItems.push({
      quantity: qty,
      price_data: {
        currency: "pln",
        unit_amount: Math.round(p.cena * 100),
        product_data: {
          name: p.name,
          description: p.opis?.slice(0, 240) || undefined,
          images: [photoForProduct(p)],
          metadata: { numer: p.numer, slug: p.slug, typ: p.typ },
        },
      },
    });
  }

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  let stripe;
  try {
    stripe = getStripe();
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Stripe nie jest skonfigurowany." },
      { status: 500 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "blik", "p24"],
      locale: "pl",
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Paczkomat InPost",
            fixed_amount: { amount: SHIPPING_PLN * 100, currency: "pln" },
          },
        },
      ],
      shipping_address_collection: { allowed_countries: ["PL"] },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/koszyk/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/koszyk/anulowano`,
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err: any) {
    console.error("[stripe] checkout error", err);
    return NextResponse.json(
      { error: err?.message ?? "Nie udało się utworzyć sesji płatności." },
      { status: 500 },
    );
  }
}
