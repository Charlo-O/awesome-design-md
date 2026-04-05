#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const designsPath = path.join(rootDir, "site-assets", "designs.js");
const designRoot = path.join(rootDir, "design-md");
const outputPath = path.join(rootDir, "site-assets", "translations.js");
const commonProtectedTerms = [
  "DESIGN.md",
  "UI",
  "UX",
  "API",
  "CLI",
  "CMS",
  "GPU",
  "SVG",
  "CSS",
  "HTML",
  "JS",
  "JSON",
  "SQL",
  "NoSQL",
  "OpenType",
  "Tailwind",
  "React Native",
  "Firebase",
  "LLM",
  "B2B",
  "B2C",
  "CTA",
  "CTAs",
  "HCP",
  "VIN",
  "IBAN",
  "USDC",
  "GROQ",
  "Geist",
  "SF Pro",
  "SFMono-Regular",
  "JetBrains Mono",
  "DM Sans",
  "DM Serif Display",
  "Inter",
  "Anthropic Serif",
];

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) =>
      String.fromCodePoint(Number.parseInt(dec, 10))
    );
}

function shouldTranslate(value) {
  const text = normalizeText(value);
  if (!text || text.length < 2) {
    return false;
  }

  if (/^#[0-9a-fA-F]{3,8}$/.test(text)) {
    return false;
  }

  if (/^[#0-9.,:%()[\]/+\-_\s]+$/.test(text)) {
    return false;
  }

  return /[A-Za-z]/.test(text);
}

function loadDesigns() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(designsPath, "utf8"), ctx);
  return ctx.window.DESIGNS || [];
}

function collectDesignStrings(designs) {
  const items = [];
  for (const design of designs) {
    items.push(design.summary, ...(design.overview || []), ...(design.keyCharacteristics || []));
  }
  return items;
}

function collectPreviewStrings() {
  const found = [];
  const files = fs
    .readdirSync(designRoot)
    .flatMap((slug) =>
      ["preview.html", "preview-dark.html"]
        .map((name) => path.join(designRoot, slug, name))
        .filter((file) => fs.existsSync(file))
    );

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const withoutScripts = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ");

    const matches = withoutScripts.matchAll(/>([^<>]+)</g);
    for (const match of matches) {
      const decoded = decodeHtmlEntities(match[1]);
      const text = normalizeText(decoded);
      if (shouldTranslate(text)) {
        found.push(text);
      }
    }
  }

  return found;
}

function unique(values) {
  return [...new Set(values.map(normalizeText).filter(Boolean))];
}

function loadExistingMap() {
  if (!fs.existsSync(outputPath)) {
    return {};
  }

  const source = fs.readFileSync(outputPath, "utf8");
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(source, ctx);
  return Object.fromEntries(
    Object.entries(ctx.window.ZH_TRANSLATIONS || {}).filter(
      ([, value]) => !String(value).includes("[[[")
    )
  );
}

function writeTranslations(map) {
  const sorted = Object.fromEntries(
    Object.entries(map).sort((left, right) => left[0].localeCompare(right[0]))
  );

  const output = [
    `window.ZH_TRANSLATIONS = ${JSON.stringify(sorted, null, 2)};`,
    "",
  ].join("\n");

  fs.writeFileSync(outputPath, output, "utf8");
}

function buildProtectedTerms(designs) {
  const brandNames = unique(
    designs.flatMap((design) => [
      design.name,
      design.sourceSite?.name,
      design.sourceSite?.url?.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    ])
  ).filter(Boolean);

  return unique([...brandNames, ...commonProtectedTerms]).sort(
    (left, right) => right.length - left.length
  );
}

function protectTerms(text, protectedTerms) {
  let current = text;
  const placeholders = [];
  let index = 0;

  for (const term of protectedTerms) {
    if (!term || !current.includes(term)) {
      continue;
    }

    const token = `[[[TERM_${index}]]]`;
    current = current.split(term).join(token);
    placeholders.push([token, term]);
    index += 1;
  }

  current = current.replace(/\b([A-Z]{2,}(?:[./+-][A-Z0-9]+)*)\b/g, (match) => {
    const token = `[[[AUTO_${index}]]]`;
    placeholders.push([token, match]);
    index += 1;
    return token;
  });

  return { text: current, placeholders };
}

function restoreTerms(text, placeholders) {
  let current = text;
  for (const [token, term] of placeholders) {
    current = current.split(token).join(term);
  }
  return current.replace(/\u200b/g, "");
}

async function fetchTranslation(text) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=" +
    encodeURIComponent(text);

  const raw = execFileSync("curl", ["-sS", "-L", "--max-time", "20", url], {
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  });
  const data = JSON.parse(raw);
  return (data?.[0] || []).map((part) => part[0]).join("");
}

async function translateBatch(items, protectedTerms) {
  const prepared = items.map((item) => protectTerms(item, protectedTerms));
  const query = prepared.map((item) => item.text).join("\n");
  const translated = await fetchTranslation(query);
  const parts = translated.split("\n");

  if (parts.length !== items.length) {
    const singles = [];
    for (const item of items) {
      const singlePrepared = protectTerms(item, protectedTerms);
      const singleTranslated = await fetchTranslation(singlePrepared.text);
      singles.push(restoreTerms(singleTranslated, singlePrepared.placeholders));
    }
    return singles;
  }

  return parts.map((part, index) => restoreTerms(part, prepared[index].placeholders));
}

function buildBatches(items) {
  const batches = [];
  let current = [];
  let length = 0;

  for (const item of items) {
    const addition = item.length + 2;
    if (current.length > 0 && length + addition > 3800) {
      batches.push(current);
      current = [];
      length = 0;
    }

    current.push(item);
    length += addition;
  }

  if (current.length > 0) {
    batches.push(current);
  }

  return batches;
}

async function main() {
  const designs = loadDesigns();
  const existing = loadExistingMap();
  const protectedTerms = buildProtectedTerms(designs);
  const strings = unique([
    ...collectDesignStrings(designs),
    ...collectPreviewStrings(),
  ]).filter(shouldTranslate);

  const pending = strings.filter((item) => !existing[item]);
  const batches = buildBatches(pending);

  console.log(`Found ${strings.length} unique strings, ${pending.length} pending translation.`);

  let completed = 0;
  for (const batch of batches) {
    let translatedBatch;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        translatedBatch = await translateBatch(batch, protectedTerms);
        break;
      } catch (error) {
        if (attempt === 2) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }

    batch.forEach((item, index) => {
      existing[item] = normalizeText(translatedBatch[index]);
    });
    writeTranslations(existing);
    completed += batch.length;
    console.log(`Translated ${completed}/${pending.length}`);
  }

  writeTranslations(existing);
  console.log(`Wrote ${path.relative(rootDir, outputPath)} with ${Object.keys(existing).length} entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
