import type { Metadata } from "next";
import { bricolage, instrument, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ceramineczka — ręcznie toczona ceramika",
  description: "Ceramika z Warszawy. Małe wypały, jednorazowe edycje.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${bricolage.variable} ${instrument.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
