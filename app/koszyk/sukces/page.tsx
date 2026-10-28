import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import { ButtonLink } from "@/components/ui";

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
        title="Zamówienie przyjęte."
        lead="Dzięki! Wysłaliśmy potwierdzenie na maila. Skontaktujemy się gdy paczka będzie gotowa do wysyłki."
      />
      <ClearCartOnMount />
      <section className="border-b border-line px-s4 md:px-s6 py-s7">
        <div className="max-w-xl space-y-s5">
          {sessionId && (
            <p className="caption text-ink-60">numer sesji: {sessionId}</p>
          )}
          <ButtonLink href="/sklep">Wróć do sklepu</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
