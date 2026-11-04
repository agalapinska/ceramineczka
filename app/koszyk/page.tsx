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
        lead="Na razie *zapytania mailowe* — sprzedaż startuje w 2026. Na stanie wyślę w 3 dni, na zamówienie w 14."
      />
      <CartView />
    </PageShell>
  );
}
