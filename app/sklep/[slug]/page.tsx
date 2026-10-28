import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/notion";
import { PageShell } from "@/components/PageShell";
import { ItalicPlay } from "@/components/ItalicPlay";
import { ProductCard, ProductGrid } from "@/components/ProductCard";
import { Dash, Eyebrow, IconBox, TextLink, type IconName } from "@/components/ui";
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

const info: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "drop",
    title: "Pielęgnacja",
    text: "Można myć w zmywarce — ale ręcznie żyje dłużej. Unikaj nagłych zmian temperatury (z lodówki na rozgrzaną płytę). Mikrofalówka OK.",
  },
  {
    icon: "box",
    title: "Wysyłka",
    text: "Paczkomat InPost — 19 zł. Wysyłka co wtorek, po opłaceniu zamówienia. Darmowa dostawa od 300 zł.",
  },
  {
    icon: "clock",
    title: "Zwroty",
    text: "14 dni na zwrot bez podawania przyczyny. W razie stłuczki w transporcie — wymieniamy lub zwracamy pełną kwotę.",
  },
];

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

  const specs: [string, string][] = [
    ["szkliwo", product.szkliwo || "—"],
    ["wymiary", product.wymiary || "—"],
    ["waga", product.wagaG ? `${product.wagaG} g` : "—"],
    ["edycja", product.edycja],
    ...(product.dataWypalu ? [["data wypału", product.dataWypalu] as [string, string]] : []),
    ...(product.tagi.length > 0 ? [["tagi", product.tagi.join(", ")] as [string, string]] : []),
  ];

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="border-b border-line px-s4 md:px-s6 py-s3 caption flex items-center justify-between gap-s3">
        <div className="flex items-center gap-s3 text-ink-60">
          <Link href="/sklep" className="text-ink hover:opacity-60 transition-opacity">← Sklep</Link>
          <span>/</span>
          <span>{product.numer}</span>
          <span>·</span>
          <span>{product.typ}</span>
        </div>
        <span
          className={`px-s2 py-s1 border border-line ${
            status.available ? "" : "bg-ink text-paper"
          }`}
        >
          {status.label}
        </span>
      </nav>

      <section className="border-b border-line grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
        <div className="p-s4 md:p-s5 border-b md:border-b-0 md:border-r border-line">
          <div className="md:sticky md:top-[7rem]">
            <ProductGallery images={gallery} alt={product.name} />
          </div>
        </div>

        <div className="px-s4 md:px-s6 py-s6 flex flex-col gap-s5">
          <div className="caption flex items-center justify-between text-ink-60">
            <span>{product.numer} · {product.kolekcja || "bez kolekcji"}</span>
            <span>{product.edycja}</span>
          </div>

          <div>
            <h1 className="font-display font-medium text-display-l first-letter:uppercase">
              <ItalicPlay text={product.opisKursywa} />
            </h1>
            <Dash className="mt-s5" />
          </div>

          <div className="flex items-baseline gap-s3">
            <span className="font-display font-medium text-display-m">
              {product.cena} zł
            </span>
            <span className="caption text-ink-60">brutto · 1 sztuka</span>
          </div>

          <p className="text-body-l max-w-prose">{product.opis}</p>

          <dl className="border-t border-line">
            {specs.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-s4 border-b border-line py-s3">
                <dt className="caption text-ink-60">{k}</dt>
                <dd className="text-body-m text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <div>
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
            <div className="mt-s4">
              <TextLink href="/koszyk">Przejdź do koszyka</TextLink>
            </div>
          </div>

          <p className="text-body-m text-ink-60">
            {onOrder
              ? "Czas realizacji 3–4 tygodnie od opłacenia. Każdy egzemplarz toczony osobno."
              : "Wysyłka 5–7 dni roboczych. Każdy egzemplarz unikatowy — drobne różnice są częścią ręcznej roboty."}
          </p>
        </div>
      </section>

      <section className="border-b border-line overflow-hidden">
        <ul className="grid grid-cols-1 md:grid-cols-3 -mr-px -mb-px">
          {info.map((it) => (
            <li key={it.title} className="border-r border-b border-line p-s4 md:p-s5">
              <IconBox name={it.icon} />
              <h2 className="label-title mt-s5">{it.title}</h2>
              <Dash className="mt-s4" />
              <p className="mt-s4 text-body-m text-ink-60 max-w-prose">{it.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="border-b border-line">
          <div className="border-b border-line px-s4 md:px-s6 py-s5">
            <Eyebrow>Podobne sztuki</Eyebrow>
          </div>
          <ProductGrid cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.numer} product={r} />
            ))}
          </ProductGrid>
        </section>
      )}
    </PageShell>
  );
}
