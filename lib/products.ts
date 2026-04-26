// Mirror of Notion "Produkty - Ceramika" schema.
// Source of truth: https://www.notion.so/349ec94afa6980c8b19ffcd8e3433b22
// Seeded locally; swap for live Notion fetch later with @notionhq/client.

export type Product = {
  numer: string;
  name: string;
  typ: "kubek" | "miska" | "wazon" | "talerz" | "dzbanek" | "inne";
  kolekcja: string;
  status: "Done" | "In progress" | "Not started";
  cena: number;
  szkliwo: string;
  edycja: "jednorazowa" | "limitowana" | "stała";
  wymiary: string;
  wagaG: number;
  opis: string;
  opisKursywa: string; // words in *stars* render italic
  dataWypalu?: string;
  tagi: string[];
  slug: string;
  publikuj: boolean;
  zdjecia: string[];
};

export const products: Product[] = [
  {
    numer: "CER-1",
    name: "miska z gliny",
    typ: "miska",
    kolekcja: "Wypał II",
    status: "Done",
    cena: 180,
    szkliwo: "miodowe",
    edycja: "jednorazowa",
    wymiary: "Ø 18 cm · wys. 7 cm",
    wagaG: 340,
    opis: "Ręcznie toczona miska z gliny kamionkowej. Wnętrze szkliwione miodowo, zewnątrz surowe. Każdy egzemplarz nieco inny — tak ma być.",
    opisKursywa: "miska *z gliny*",
    dataWypalu: "2026-04-12",
    tagi: ["deser", "prezent"],
    slug: "miska-z-gliny-04",
    publikuj: true,
    zdjecia: [],
  },
  {
    numer: "CER-2",
    name: "kubek na dziś",
    typ: "kubek",
    kolekcja: "Wypał II",
    status: "Done",
    cena: 95,
    szkliwo: "matowe białe",
    edycja: "limitowana",
    wymiary: "Ø 8 cm · wys. 9 cm · 280 ml",
    wagaG: 220,
    opis: "Kubek do codziennej kawy. Matowa biel na zewnątrz, transparentne szkliwo w środku.",
    opisKursywa: "kubek *na dziś*",
    dataWypalu: "2026-04-12",
    tagi: ["kawa", "herbata"],
    slug: "kubek-na-dzis",
    publikuj: true,
    zdjecia: [],
  },
  {
    numer: "CER-4",
    name: "talerz wypał w sobotę",
    typ: "talerz",
    kolekcja: "Wypał I",
    status: "Done",
    cena: 140,
    szkliwo: "matowe czarne",
    edycja: "limitowana",
    wymiary: "Ø 22 cm",
    wagaG: 480,
    opis: "Głęboki talerz z matową czernią. Dobry pod wszystko, ale najlepiej pod pomarańcze.",
    opisKursywa: "talerz *wypał w sobotę*",
    dataWypalu: "2026-03-28",
    tagi: ["deser"],
    slug: "talerz-wypal-w-sobote",
    publikuj: true,
    zdjecia: [],
  },
  {
    numer: "CER-5",
    name: "dzbanek poranny",
    typ: "dzbanek",
    kolekcja: "Na zamówienie",
    status: "Not started",
    cena: 420,
    szkliwo: "transparentne",
    edycja: "stała",
    wymiary: "poj. 1000 ml · wys. 18 cm",
    wagaG: 720,
    opis: "Dzbanek na zamówienie. Czas realizacji 3–4 tygodnie od złożenia zamówienia.",
    opisKursywa: "dzbanek *poranny*",
    tagi: ["kawa", "herbata", "prezent"],
    slug: "dzbanek-poranny",
    publikuj: true,
    zdjecia: [],
  },
];
