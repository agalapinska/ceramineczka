import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui";

export const metadata = { title: "Płatność anulowana — Ceramineczka" };

export default function AnulowanoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="03 / anulowano"
        title="Płatność anulowana."
        lead="Nic się nie stało. Twój koszyk czeka — możesz wrócić i dokończyć kiedy będziesz gotowa."
      />
      <section className="border-b border-line px-s4 md:px-s6 py-s7">
        <div className="flex flex-wrap gap-s3">
          <ButtonLink href="/koszyk" variant="solid">Wróć do koszyka</ButtonLink>
          <ButtonLink href="/sklep">Wróć do sklepu</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
