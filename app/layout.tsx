import type { Metadata } from "next";
import { bricolage, instrument, inter } from "./fonts";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Ceramineczka — ręcznie toczona ceramika",
  description: "Ceramika z Warszawy. Małe wypały, jednorazowe edycje.",
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
