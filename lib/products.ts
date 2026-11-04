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

// Dane-zapas używane tylko, gdy Notion nie jest dostępny.
// Prawdziwe produkty żyją w bazie Notion "Produkty - Ceramika".
export const products: Product[] = [
  {
    numer: "CER-1",
    name: "kubek kaszubski",
    typ: "kubek",
    kolekcja: "modern pomeranian folk",
    status: "Done",
    cena: 120,
    szkliwo: "transparentne + malowanie podszkliwne",
    edycja: "jednorazowa",
    wymiary: "Ø 8 cm · wys. 9 cm · 280 ml",
    wagaG: 240,
    opis: "Kubek z nowoczesną interpretacją motywu kaszubskiego haftu. Każdy ręcznie toczony i malowany — unikat.",
    opisKursywa: "kubek *kaszubski*",
    tagi: ["kawa", "herbata", "prezent"],
    slug: "kubek-kaszubski",
    publikuj: true,
    zdjecia: ["/foto/ceramika-4.jpg", "/foto/ceramika-7.jpg"],
  },
  {
    numer: "CER-2",
    name: "miska bez wzoru",
    typ: "miska",
    kolekcja: "basic",
    status: "Done",
    cena: 160,
    szkliwo: "matowe białe",
    edycja: "limitowana",
    wymiary: "Ø 16 cm · wys. 7 cm",
    wagaG: 320,
    opis: "Miska z czystą formą — same szkliwa, zero zdobień. Codzienność, która nie krzyczy.",
    opisKursywa: "miska *bez wzoru*",
    tagi: ["śniadanie", "deser"],
    slug: "miska-basic",
    publikuj: true,
    zdjecia: ["/foto/ceramika-3.jpg"],
  },
  {
    numer: "CER-3",
    name: "eksperyment nr 4",
    typ: "inne",
    kolekcja: "outlet",
    status: "Done",
    cena: 80,
    szkliwo: "próbne",
    edycja: "jednorazowa",
    wymiary: "forma nieregularna",
    wagaG: 300,
    opis: "Praca eksperymentalna — z lekkim uszczerbkiem albo próba szkliwa, która zaskoczyła. Dla kolekcjonerów procesu.",
    opisKursywa: "eksperyment *nr 4*",
    tagi: ["unikat"],
    slug: "eksperyment-nr-4",
    publikuj: true,
    zdjecia: ["/foto/ceramika-7.jpg"],
  },
  {
    numer: "CER-4",
    name: "zastawa na miarę",
    typ: "inne",
    kolekcja: "individual",
    status: "Not started",
    cena: 1200,
    szkliwo: "ustalamy wspólnie",
    edycja: "stała",
    wymiary: "ustalamy wspólnie",
    wagaG: 0,
    opis: "Zestaw naczyń projektowany pod ciebie — ilość, kolor szkliwa, wzór. Rozmowa startowa 20 min, realizacja do 14 dni roboczych od akceptacji projektu.",
    opisKursywa: "zastawa *na miarę*",
    tagi: ["na zamówienie", "prezent"],
    slug: "zastawa-individual",
    publikuj: true,
    zdjecia: ["/foto/ceramika-2.jpg", "/foto/ceramika-5.jpg"],
  },
];
