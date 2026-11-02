// Pobiera zdjęcia produktów z Notion do public/notion/ przed statycznym buildem.
// Linki do plików w Notion są podpisane i wygasają po ~1 h, więc statyczna strona
// (GitHub Pages) musi mieć własne kopie. lib/notion.ts podmienia adresy według
// .notion-images.json (klucz: ścieżka pliku w S3, stała między zapytaniami).
import { Client } from "@notionhq/client";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const token = process.env.NOTION_TOKEN;
const dataSourceId =
  process.env.NOTION_DATA_SOURCE_ID ?? "349ec94a-fa69-8049-910c-000b4bed2fc7";
const outDir = join(process.cwd(), "public", "notion");
const manifestPath = join(process.cwd(), ".notion-images.json");

if (!token) {
  console.log("[notion-images] brak NOTION_TOKEN — pomijam (strona użyje danych zastępczych).");
  process.exit(0);
}

const notion = new Client({ auth: token });
const res = await notion.dataSources.query({
  data_source_id: dataSourceId,
  filter: { property: "Publikuj", checkbox: { equals: true } },
  page_size: 100,
});

const urls = [];
for (const page of res.results) {
  for (const name of ["Zdjęcia", "Zdjęcie", "Zdjecia"]) {
    for (const f of page.properties?.[name]?.files ?? []) {
      if (f.type === "file" && f.file?.url) urls.push(f.file.url);
    }
  }
}

await mkdir(outDir, { recursive: true });
const manifest = {};
for (const url of urls) {
  const { pathname } = new URL(url);
  const ext = (extname(pathname) || ".jpg").toLowerCase();
  const file = createHash("sha1").update(pathname).digest("hex").slice(0, 16) + ext;
  const r = await fetch(url);
  if (!r.ok) {
    console.warn(`[notion-images] ${r.status} dla ${pathname}, pomijam`);
    continue;
  }
  await writeFile(join(outDir, file), Buffer.from(await r.arrayBuffer()));
  manifest[pathname] = `notion/${file}`;
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`[notion-images] pobrano ${Object.keys(manifest).length} z ${urls.length} zdjęć.`);
