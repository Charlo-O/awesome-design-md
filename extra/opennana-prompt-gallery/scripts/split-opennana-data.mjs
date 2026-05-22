#!/usr/bin/env node

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = join(root, "data");
const pageSize = 120;

function cleanList(values) {
  return [...new Set(values.filter(Boolean))];
}

function pageName(index) {
  return `page-${String(index + 1).padStart(3, "0")}.json`;
}

function splitFile(fileName) {
  const sourcePath = join(dataDir, fileName);
  const key = basename(fileName, ".json");
  const outputDir = join(dataDir, key);
  const pagesDir = join(outputDir, "pages");
  const payload = JSON.parse(readFileSync(sourcePath, "utf8"));
  const cases = payload.cases || [];
  const pages = Math.ceil(cases.length / pageSize);
  const categoryCounts = cases.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(pagesDir, { recursive: true });

  for (let index = 0; index < pages; index += 1) {
    const pageCases = cases.slice(index * pageSize, (index + 1) * pageSize);
    const pagePayload = {
      repository: payload.repository,
      label: payload.label,
      page: index + 1,
      pageSize,
      totalCases: cases.length,
      cases: pageCases,
    };
    writeFileSync(
      join(pagesDir, pageName(index)),
      `${JSON.stringify(pagePayload)}\n`,
      "utf8"
    );
  }

  const meta = {
    repository: payload.repository,
    label: payload.label,
    totalCases: cases.length,
    categories: payload.categories || cleanList(cases.map((item) => item.category)).sort(),
    styles: payload.styles || cleanList(cases.flatMap((item) => item.styles || [])).sort(),
    scenes: payload.scenes || cleanList(cases.flatMap((item) => item.scenes || [])).sort(),
    mediaTypes: payload.mediaTypes || {},
    generatedAt: payload.generatedAt,
    pageSize,
    pages,
    categoryCounts,
    pagePathPattern: `pages/${pageName(0).replace("001", "{page}")}`,
  };

  writeFileSync(join(outputDir, "meta.json"), `${JSON.stringify(meta, null, 2)}\n`, "utf8");

  return { key, total: cases.length, pages };
}

const results = readdirSync(dataDir)
  .filter((fileName) => fileName.endsWith(".json"))
  .map(splitFile);

for (const result of results) {
  console.log(`${result.key}: ${result.total} cases split into ${result.pages} pages`);
}
