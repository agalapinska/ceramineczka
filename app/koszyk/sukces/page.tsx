import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import { CheckoutSessionId } from "@/components/CheckoutSessionId";
import { ButtonLink } from "@/components/ui";

export const metadata = { title: "Dziękujemy — Ceramineczka" };

export default function SukcesPage() {
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
          <Suspense fallback={null}>
            <CheckoutSessionId />
          </Suspense>
          <ButtonLink href="/sklep">Wróć do sklepu</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
