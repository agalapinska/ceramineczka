import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Płatność anulowana — Ceramineczka" };

export default function AnulowanoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="03 / anulowano"
        title="płatność *anulowana*"
        lead="*Nic się nie stało.* Twój koszyk czeka — możesz wrócić i dokończyć kiedy będziesz gotowa."
      />
      <section className="bg-cream border-b border-ink px-s5 py-s7">
        <div className="max-w-xl flex gap-s3">
          <Link
            href="/koszyk"
            className="inline-block bg-ink text-cream px-s4 py-s3 caption hover:opacity-80 transition-opacity"
          >
            wróć do koszyka
          </Link>
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
