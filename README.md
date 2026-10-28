# Ceramineczka

Sklep z ręcznie toczoną ceramiką. Kierunek wizualny: **Tactile Brutalism** — cała strona w jednej ramce z cienką linią, siatka komórek rozdzielonych 1px liniami, paleta paper / ink, typografia Inter Tight (nagłówki) + Inter (tekst, UPPERCASE etykiety), ikony liniowe w kwadratowych ramkach, przyciski i strzałki ↗ w obrysie, zdjęcia osadzone w komórkach z własną ramką, zero cieni i zaokrągleń.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS 3** z theme zmapowanym na CSS custom properties (design tokens)
- **Notion** jako CMS produktów (`Produkty - Ceramika`) — fetch z ISR co 10 min
- **Figma Variables** — kolekcja `Ceramineczka Tokens` zsynchronizowana z `app/globals.css`

## Setup

```bash
npm install
cp .env.example .env.local
# Wklej NOTION_TOKEN z https://www.notion.so/profile/integrations
# Następnie: w bazie Produkty - Ceramika → ··· → Connections → dodaj integrację
npm run dev
```

Bez `NOTION_TOKEN` strona wciąż działa — fallback do mock'a w `lib/products.ts`.

## Struktura

```
.
├── app/
│   ├── layout.tsx, fonts.ts, globals.css   # tokens jako CSS vars
│   ├── page.tsx                            # homepage (10 sekcji-teaserów)
│   ├── sklep/page.tsx                      # katalog z filtrem
│   ├── pracownia/page.tsx                  # o pracowni + proces 6 kroków
│   ├── dziennik/page.tsx                   # żywioły + lista artykułów
│   ├── dziennik/[slug]/page.tsx            # pojedynczy artykuł (SSG)
│   ├── zasady/page.tsx                     # TAK/NIE + gwarancje + FAQ
│   └── kontakt/page.tsx                    # form + adres + maile
├── components/                             # ui.tsx (ikony, IconBox, ArrowBox, ButtonLink,
│                                           # SectionHead), PageShell (ramka), Header, Hero,
│                                           # Features, ProductCard, Bestsellers, CategoryBand,
│                                           # Ingredients, StatsCta, Principles, Newsletter,
│                                           # Footer, PageHero, ItalicPlay
├── lib/
│   ├── products.ts                         # typ Product + mock data
│   ├── notion.ts                           # fetch z Notion + fallback
│   └── articles.ts                         # 4 artykuły do dziennika
├── tailwind.config.ts                      # theme z tokenami
└── next.config.mjs                         # remote images + tracing root
```

## Reguła brandu

W treściach (Notion, mock'i, artykuły) można nadal używać konwencji `*słowo*` — `components/ItalicPlay.tsx` usuwa gwiazdki i owija słowo w `<span class="accent">`. W kierunku „Tactile Brutalism" akcent jest celowo neutralny (zdefiniowany w `app/globals.css` jako `.accent`), więc treści z Notion nie wymagają zmian.

## Edycja produktów

Wszystko leci z bazy w Notion: <https://www.notion.so/349ec94afa6980c8b19ffcd8e3433b22>

Tylko wiersze z `Publikuj = true` lądują na stronie. Kolumna `Opis kursywą` używa konwencji `*gwiazdek*` opisanej powyżej (w kartach produktów tytuł renderuje się wersalikami).
