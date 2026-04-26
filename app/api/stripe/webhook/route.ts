import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Brak STRIPE_WEBHOOK_SECRET." },
      { status: 500 },
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Brak podpisu." }, { status: 400 });

  const body = await req.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    console.error("[stripe webhook] invalid signature", err?.message);
    return NextResponse.json({ error: "Nieprawidłowy podpis." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("[stripe webhook] paid", session.id, session.amount_total);
      // TODO: zapisz zamówienie (np. utwórz stronę "Zamówienia" w Notion),
      //       wyślij maila z potwierdzeniem, oznacz produkty jako sprzedane.
      break;
    }
    case "checkout.session.expired":
      console.log("[stripe webhook] expired", event.data.object.id);
      break;
    default:
      // ignoruj pozostałe eventy
      break;
  }

  return NextResponse.json({ received: true });
}
