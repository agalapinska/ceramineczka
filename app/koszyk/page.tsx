import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { CartView } from "@/components/CartView";

export const metadata = { title: "Koszyk — Ceramineczka" };

export default function KoszykPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="02 / koszyk"
        title="twój *koszyk*"
        lead="*Sprawdź* zamówienie i przejdź do płatności. Wysyłka po wypale, w 5–7 dni roboczych."
      />
      <CartView />
    </PageShell>
  );
}
