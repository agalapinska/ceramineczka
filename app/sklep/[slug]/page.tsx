import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/notion";
import { PageShell } from "@/components/PageShell";
import { ItalicPlay } from "@/components/ItalicPlay";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCartWithQty } from "@/components/AddToCartWithQty";
import { galleryForProduct, photoForProduct } from "@/lib/photos";
import type { Product } from "@/lib/products";

export const revalidate = 600;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.filter((p) => p.publikuj).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const p = products.find((x) => x.slug === slug);
  if (!p) return { title: "Nie znaleziono — Ceramineczka" };
  return {
    title: `${p.name} — Ceramineczka`,
    description: p.opis,
    openGraph: {
      title: `${p.name} — Ceramineczka`,
      description: p.opis,
      images: [photoForProduct(p)],
    },
  };
}

function statusMeta(s: Product["status"]) {
  if (s === "Done") return { label: "dostępna", available: true };
  if (s === "In progress") return { label: "w wypale", available: false };
  return { label: "na zamówienie", available: true };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug && p.publikuj);
  if (!product) notFound();

  const gallery = galleryForProduct(product);
  const cover = gallery[0];
  const status = statusMeta(product.status);
  const onOrder = product.status === "Not started";

  const related = products
    .filter((p) => p.publikuj && p.slug !== product.slug && p.typ === product.typ)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.numer,
    description: product.opis,
    image: gallery,
    brand: { "@type": "Brand", name: "Ceramineczka" },
    category: product.typ,
    weight: product.wagaG
      ? { "@type": "QuantitativeValue", value: product.wagaG, unitCode: "GRM" }
      : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "PLN",
      price: product.cena,
      availability: status.available
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="bg-cream border-b border-ink px-s5 py-s3 caption flex items-center justify-between gap-s3">
        <div className="flex items-center gap-s3">
          <Link href="/sklep" className="hover:italic">← sklep</Link>
          <span className="text-ink-60">/</span>
          <span className="text-ink-60">{product.numer}</span>
          <span className="text-ink-60">·</span>
          <span className="text-ink-60">{product.typ}</span>
        </div>
        <span
          className={`px-s2 py-s1 border border-ink ${
            status.available ? "bg-cream" : "bg-ink text-cream"
          }`}
        >
          {status.label}
        </span>
      </nav>

      <section className="bg-cream border-b border-ink grid md:grid-cols-2">
        <div className="border-r border-ink">
          <ProductGallery images={gallery} alt={product.name} />
        </div>

        <div className="p-s5 md:p-s6 flex flex-col gap-s4">
          <div className="caption flex items-center justify-between text-ink-60">
            <span>{product.numer} · {product.kolekcja || "bez kolekcji"}</span>
            <span>{product.edycja}</span>
          </div>

          <h1 className="font-display font-medium text-display-l leading-[0.9]">
            <ItalicPlay text={product.opisKursywa} />
          </h1>

          <div className="flex items-baseline gap-s3">
            <span className="font-display font-medium text-display-m">
              {product.cena} zł
            </span>
            <span className="caption text-ink-60">brutto · 1 sztuka</span>
          </div>

          <p className="text-body-l max-w-prose">{product.opis}</p>

          <dl className="grid grid-cols-2 gap-s3 caption border-t border-ink pt-s4">
            <div>
              <dt className="text-ink-60">szkliwo</dt>
              <dd className="italic-accent text-body-m">{product.szkliwo || "—"}</dd>
            </div>
            <div>
              <dt className="text-ink-60">wymiary</dt>
              <dd>{product.wymiary || "—"}</dd>
            </div>
            <div>
              <dt className="text-ink-60">waga</dt>
              <dd>{product.wagaG ? `${product.wagaG} g` : "—"}</dd>
            </div>
            <div>
              <dt className="text-ink-60">edycja</dt>
              <dd>{product.edycja}</dd>
            </div>
            {product.dataWypalu && (
              <div>
                <dt className="text-ink-60">data wypału</dt>
                <dd>{product.dataWypalu}</dd>
              </div>
            )}
            {product.tagi.length > 0 && (
              <div>
                <dt className="text-ink-60">tagi</dt>
                <dd>{product.tagi.join(", ")}</dd>
              </div>
            )}
          </dl>

          <div className="border-t border-ink pt-s4">
            <AddToCartWithQty
              product={{
                numer: product.numer,
                slug: product.slug,
                name: product.name,
                cena: product.cena,
                typ: product.typ,
                zdjecie: cover,
              }}
              disabled={!status.available}
              disabledLabel="aktualnie w wypale"
            />
            <Link
              href="/koszyk"
              className="mt-s3 inline-block caption underline italic-accent"
            >
              przejdź do koszyka →
            </Link>
          </div>

          <p className="caption text-ink-60 leading-relaxed">
            {onOrder
              ? "Czas realizacji 3–4 tygodnie od opłacenia. Każdy egzemplarz toczony osobno."
              : "Wysyłka 5–7 dni roboczych. Każdy egzemplarz unikatowy — drobne różnice są częścią ręcznej roboty."}
          </p>
        </div>
      </section>

      <section className="bg-cream border-b border-ink grid md:grid-cols-3">
        <div className="border-r border-ink p-s5">
          <h2 className="caption mb-s3">pielęgnacja</h2>
          <p className="text-body-m max-w-prose">
            Można myć w zmywarce — ale ręcznie żyje dłużej. Unikaj nagłych
            zmian temperatury (z lodówki na rozgrzaną płytę). Mikrofalówka OK.
          </p>
        </div>
        <div className="border-r border-ink p-s5">
          <h2 className="caption mb-s3">wysyłka</h2>
          <p className="text-body-m max-w-prose">
            Paczkomat InPost — 19 zł. Wysyłka co wtorek, po opłaceniu
            zamówienia. Darmowa dostawa od 300 zł.
          </p>
        </div>
        <div className="p-s5">
          <h2 className="caption mb-s3">zwroty</h2>
          <p className="text-body-m max-w-prose">
            14 dni na zwrot bez podawania przyczyny. W razie stłuczki w
            transporcie — wymieniamy lub zwracamy pełną kwotę.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream border-b border-ink px-s5 py-s5">
          <h2 className="font-display font-medium text-display-s mb-s4">
            podobne <span className="italic-accent">sztuki</span>
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-s4">
            {related.map((r) => (
              <li
                key={r.numer}
                className="border border-ink group hover:bg-ink-20 transition-colors"
              >
                <Link href={`/sklep/${r.slug}`} className="block">
                  <div className="aspect-square flex items-center justify-center p-s4 bg-cream">
                    <img
                      src={photoForProduct(r)}
                      alt={r.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="border-t border-ink p-s3 flex items-center justify-between">
                    <span className="font-display font-medium">
                      <ItalicPlay text={r.opisKursywa} />
                    </span>
                    <span className="caption">{r.cena} zł</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
