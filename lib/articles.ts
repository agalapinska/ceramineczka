export type Article = {
  slug: string;
  zywiol: "glina" | "ogień" | "szkliwo" | "pracownia";
  title: string; // supports *italic* markers
  lead: string;
  data: string; // ISO
  autor: string;
  czas: string; // "6 min czytania"
  cover: string;
  paragraphs: string[]; // each supports *italic*
};

export const articles: Article[] = [
  {
    slug: "kamionka-z-boleslawca",
    zywiol: "glina",
    title: "Dlaczego *kamionka* z Bolesławca",
    lead: "Mała kopalnia pod Bolesławcem od 40 lat dostarcza glinę, która pamięta polodowcowe ciśnienia. Rozmowa z panem Januszem.",
    data: "2026-04-14",
    autor: "Agata Łapińska",
    czas: "6 min czytania",
    cover:
      "https://images.unsplash.com/photo-1528283648649-33347faa5d9e?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "Kupuję glinę od trzech dostawców. Najwięcej z kopalni pod *Bolesławcem* — kamionka o temperaturze spiekania 1240°C, w kolorze ciepłego siwego dymu.",
      "Pierwszy raz spotkałam pana Janusza na targu rzemieślniczym w 2022. *'Glina nie lubi pośpiechu'* — powiedział, ważąc mi worek. To zdanie wisi teraz nad kołem garncarskim.",
      "Kamionka różni się od porcelany *gęstością*. Ma 0,8% absorpcji wody — praktycznie nie przepuszcza. Dlatego miski z niej są food-safe nawet bez pełnego szkliwienia.",
      "W pracowni przygotowuję glinę sama — odleżała dwa tygodnie pod mokrą płachtą, *ugniecona* 80 razy. Dopiero wtedy siada na kole.",
    ],
  },
  {
    slug: "wypal-18-godzin",
    zywiol: "ogień",
    title: "18 godzin *ognia*",
    lead: "Wypał redukcyjny w piecu gazowym — dlaczego trwa tak długo i co się w nim dzieje.",
    data: "2026-04-02",
    autor: "Agata Łapińska",
    czas: "8 min czytania",
    cover:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "Piec startuje w *sobotę o 18:00*. Temperatura rośnie powoli — 80°C na godzinę. Za szybko = pęknięcia.",
      "Około 600°C robi się *kwarcowa inwersja*. Glina przechodzi strukturalną zmianę. Trzeba przystanąć, wyrównać atmosferę.",
      "Od 1000°C zaczynam *redukcję* — odcinam dopływ tlenu. Żelazo w glinie się redukuje, szkliwo robi się głębsze, miodowe dostaje bursztynu.",
      "Szczyt: *1240°C*, niedziela 12:00. Trzymam godzinę. Potem wyłączam gaz i czekam. Piec stygnie 12 godzin — otwarcie w poniedziałek rano.",
    ],
  },
  {
    slug: "receptura-szkliwa-miodowego",
    zywiol: "szkliwo",
    title: "Receptura *miodowego*",
    lead: "Szkliwo, od którego wszystko się zaczęło. Feldspar, wapień, kaolin — i trochę tlenku żelaza.",
    data: "2026-03-21",
    autor: "Agata Łapińska",
    czas: "5 min czytania",
    cover:
      "https://images.unsplash.com/photo-1617196038574-9a2b8a1b6f9e?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "Miodowe szkliwo to *49% feldspatu potasowego, 22% wapienia, 18% kaolinu, 8% kwarcu, 3% tlenku żelaza*. Proporcje znam na pamięć — zrobiłam je 200 razy.",
      "Każda partia szkliwa inaczej się zachowuje. *Wilgotność* magazynu, *wiek* tlenku, nawet *pogoda* podczas mielenia mają znaczenie.",
      "Sito 120 mesh, mielenie 45 minut. Zanurzenie 3 sekundy. *Dwa razy* — pod kątem 45°, potem 90°.",
      "Po wypale miodowe jest *transparentne z głębią*. Na białej glinie wychodzi jasnożółte, na kamionce — bursztynowe. Nigdy takie samo.",
    ],
  },
  {
    slug: "dziennik-wypalu-ii",
    zywiol: "pracownia",
    title: "Dziennik *wypału II*",
    lead: "Co się udało, co poszło nie tak, i dlaczego 2 z 24 sztuk trafiły do rozbitych.",
    data: "2026-04-13",
    autor: "Agata Łapińska",
    czas: "4 min czytania",
    cover:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=80",
    paragraphs: [
      "Wypał II: *24 sztuki*. 18 kubków, 4 miski, 2 talerze. Partia kwietniowa.",
      "Dwie miski *pękły* na szwie dna — wypuściłam za szybko. Lekcja: cierpliwość na 600°C.",
      "Jedna sztuka wyszła z *bąblem* pod szkliwem — tlenek żelaza nie rozpuścił się równo. Ale wygląda ładnie. Zostawiam, nazywam 'z charakterem'.",
      "Reszta — *dostępna w sklepie*. Numery CER-1 do CER-22.",
    ],
  },
];

export const zywioly = [
  { key: "glina", label: "glina", n: "I" },
  { key: "ogień", label: "ogień", n: "II" },
  { key: "szkliwo", label: "szkliwo", n: "III" },
  { key: "pracownia", label: "pracownia", n: "IV" },
] as const;
