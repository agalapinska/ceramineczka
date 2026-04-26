import Link from "next/link";
import type { Product } from "@/lib/products";
import { ItalicPlay } from "./ItalicPlay";

export function Bento({ products }: { products: Product[] }) {
  const first = products[0];
  const second = products[1];
  const third = products[2];

  return (
    <section id="pracownia" className="bg-ink text-cream">
      <div className="grid grid-cols-12 gap-0 border-b border-cream/20">
        {/* Hero image left */}
        <div className="col-span-12 md:col-span-5 aspect-[4/3] md:aspect-auto relative overflow-hidden border-r border-cream/20">
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80"
            alt="Pracownia"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Right manifesto */}
        <div className="col-span-12 md:col-span-7 p-s5 md:p-s6 flex flex-col justify-between min-h-[60vh]">
          <p className="caption opacity-70">02 / pracownia</p>
          <h2 className="font-display font-medium text-display-l leading-[0.9] tracking-tight">
            <ItalicPlay text="od *gliny* do Twojej półki." />
          </h2>
          <p className="italic-accent text-body-l max-w-xl">
            <ItalicPlay text="Każdy egzemplarz toczony jest *ręcznie* w Warszawie. Wypalam w piecu gazowym w 1240°C. *Sygnowany* od spodu literą C." />
          </p>
          <div className="flex gap-s3">
            <Link href="/pracownia" className="border border-cream caption px-s4 py-s3 hover:bg-cream hover:text-ink transition-colors">
              cała pracownia →
            </Link>
            <Link href="/dziennik" className="caption underline underline-offset-4 self-center">
              dziennik wypałów →
            </Link>
          </div>
        </div>
      </div>

      {/* Bento bottom row */}
      <div className="grid grid-cols-12 gap-0">
        {/* Best-sellers mini */}
        <div className="col-span-12 md:col-span-3 border-r border-cream/20 p-s5 flex flex-col justify-between">
          <div>
            <p className="caption opacity-70">BESTSELLERY</p>
            <p className="font-display font-medium text-display-s mt-s2">
              <ItalicPlay text="*3* ulubione" />
            </p>
          </div>
          <Link href="/sklep" className="caption underline underline-offset-4">zobacz wszystkie →</Link>
        </div>

        {first && (
          <div className="col-span-6 md:col-span-3 border-r border-cream/20 p-s4 flex flex-col justify-between aspect-square">
            <div className="caption flex justify-between"><span>{first.numer}</span><span>{first.typ}</span></div>
            <div>
              <p className="italic-accent text-xl"><ItalicPlay text={first.opisKursywa} /></p>
              <p className="font-display font-medium mt-s1">{first.cena} zł</p>
            </div>
          </div>
        )}
        {second && (
          <div className="col-span-6 md:col-span-3 border-r border-cream/20 p-s4 flex flex-col justify-between aspect-square bg-cream text-ink">
            <div className="caption flex justify-between"><span>{second.numer}</span><span>{second.typ}</span></div>
            <div>
              <p className="italic-accent text-xl"><ItalicPlay text={second.opisKursywa} /></p>
              <p className="font-display font-medium mt-s1">{second.cena} zł</p>
            </div>
          </div>
        )}
        {third && (
          <div className="col-span-12 md:col-span-3 p-s4 flex flex-col justify-between aspect-square">
            <div className="caption flex justify-between"><span>{third.numer}</span><span>{third.typ}</span></div>
            <div>
              <p className="italic-accent text-xl"><ItalicPlay text={third.opisKursywa} /></p>
              <p className="font-display font-medium mt-s1">{third.cena} zł</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
