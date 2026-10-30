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

## Formularze i filtry

- **Kontakt** (`/kontakt`) → `POST /api/kontakt` → baza Notion *Wiadomości ze strony*.
- **Newsletter** (strona główna, kontakt) → `POST /api/newsletter` → baza Notion *Newsletter* (bez duplikatów adresów).
- Obie bazy leżą na stronie Notion **Ceramineczka — formularze**. Integracja z `NOTION_TOKEN` musi mieć do niej dostęp: na tej stronie ••• → Connections → dodaj integrację sklepu.
- Bez `NOTION_TOKEN` formularze odpowiadają komunikatem z adresem `sklep@ceramineczka.pl`.
- Ochrona przed spamem: ukryte pole-pułapka + limit 5 zgłoszeń / 10 min z jednego IP.
- **Filtry sklepu**: `/sklep?typ=kubki&sort=cena-rosnaco` (typy: kubki, miski, wazony, talerze, dzbanki; sort: najnowsze, cena-rosnaco, cena-malejaco).
- **Filtr dziennika**: `/dziennik?zywiol=glina`.

## Deploy

Strona potrzebuje serwera Node (API: Stripe, formularze, proxy zdjęć, ISR z Notion), więc **GitHub Pages jej nie uruchomi**. Zalecany hosting: **Vercel** — import repozytorium, gałąź produkcyjna `main`, zmienne środowiskowe z `.env.example` (`NOTION_TOKEN`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`). Po pierwszym deployu dodaj w Stripe webhook na `https://<domena>/api/stripe/webhook`.

## Edycja produktów

Wszystko leci z bazy w Notion: <https://www.notion.so/349ec94afa6980c8b19ffcd8e3433b22>

Tylko wiersze z `Publikuj = true` lądują na stronie. Kolumna `Opis kursywą` używa konwencji `*gwiazdek*` opisanej powyżej (w kartach produktów tytuł renderuje się wersalikami).
