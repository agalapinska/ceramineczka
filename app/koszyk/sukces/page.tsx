import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";

export const metadata = { title: "Dziękujemy — Ceramineczka" };

export default async function SukcesPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const sp = await searchParams;
  const sessionId = sp?.session_id;
  return (
    <PageShell>
      <PageHero
        eyebrow="03 / dziękujemy"
        title="zamówienie *przyjęte*"
        lead="*Dzięki!* Wysłaliśmy potwierdzenie na maila. Skontaktujemy się gdy paczka będzie gotowa do wysyłki."
      />
      <ClearCartOnMount />
      <section className="bg-cream border-b border-ink px-s5 py-s7">
        <div className="max-w-xl space-y-s4">
          {sessionId && (
            <p className="caption text-ink-60">numer sesji: {sessionId}</p>
          )}
          <Link
            href="/sklep"
            className="inline-block border border-ink px-s4 py-s3 caption hover:bg-ink hover:text-cream transition-colors"
          >
            wróć do sklepu
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
