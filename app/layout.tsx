import type { Metadata } from "next";
import { bricolage, instrument, inter } from "./fonts";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Ceramineczka — ręcznie toczona ceramika z Gdyni",
  description:
    "Ceramika, która nie udaje perfekcji. Modern pomeranian folk — nowoczesne interpretacje kaszubskiego haftu. Agata Kręczkowska, Gdynia.",
  icons: {
    icon: [{ url: "/sygnet.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Ceramineczka — ręcznie toczona ceramika",
    description:
      "Ceramika, która nie udaje perfekcji. Modern pomeranian folk — nowoczesne interpretacje kaszubskiego haftu.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${bricolage.variable} ${instrument.variable} ${inter.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
