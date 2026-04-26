# Ceramineczka

Sklep z ręcznie toczoną ceramiką. Kierunek wizualny: **Typographic Play** — paleta cream / ink / white, typografia Bricolage Grotesque + Instrument Serif italic + Inter UPPERCASE caption, sharp 1px borders, zero cieni.

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
├── components/                             # TopBar, Header, Hero, Bestsellers,
│                                           # CategoryBand, Bento, Principles,
│                                           # Ingredients, Newsletter, Footer,
│                                           # ItalicPlay, PageShell, PageHero
├── lib/
│   ├── products.ts                         # typ Product + mock data
│   ├── notion.ts                           # fetch z Notion + fallback
│   └── articles.ts                         # 4 artykuły do dziennika
├── tailwind.config.ts                      # theme z tokenami
└── next.config.mjs                         # remote images + tracing root
```

## Reguła brandu

W treściach (Notion, mock'i, artykuły) używaj `*słowo*` żeby wyrenderować **italic Instrument Serif** w środku Bricolage. To rdzeń kierunku „Typographic Play" — patrz `components/ItalicPlay.tsx`.

Przykład: `kubek *na dziś*` → drugie słowo wychodzi italic serif.

## Edycja produktów

Wszystko leci z bazy w Notion: <https://www.notion.so/349ec94afa6980c8b19ffcd8e3433b22>

Tylko wiersze z `Publikuj = true` lądują na stronie. Kolumna `Opis kursywą` używa konwencji `*gwiazdek*` opisanej powyżej.
