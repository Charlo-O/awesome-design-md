#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const readmePath = path.join(rootDir, "README.md");
const designRoot = path.join(rootDir, "design-md");
const outputPath = path.join(rootDir, "site-assets", "designs.js");

const CATEGORY_MAP = new Map([
  [
    "AI & Machine Learning",
    { key: "ai", labelZh: "AI 与机器学习", labelEn: "AI & Machine Learning" },
  ],
  [
    "Developer Tools & Platforms",
    {
      key: "dev",
      labelZh: "开发工具与平台",
      labelEn: "Developer Tools & Platforms",
    },
  ],
  [
    "Infrastructure & Cloud",
    { key: "infra", labelZh: "基础设施与云", labelEn: "Infrastructure & Cloud" },
  ],
  [
    "Design & Productivity",
    { key: "design", labelZh: "设计与生产力", labelEn: "Design & Productivity" },
  ],
  [
    "Fintech & Crypto",
    { key: "finance", labelZh: "金融与加密", labelEn: "Fintech & Crypto" },
  ],
  [
    "Enterprise & Consumer",
    { key: "enterprise", labelZh: "企业与消费", labelEn: "Enterprise & Consumer" },
  ],
]);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function normalizeText(value) {
  return value.replace(/\r/g, "").replace(/\s+/g, " ").trim();
}

function stripMarkdown(value) {
  return normalizeText(
    value
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
  );
}

function unique(values) {
  return [...new Set(values)];
}

function monogramFromName(name, slug) {
  const initials = unique(
    (name.match(/[A-Z0-9]/g) || [])
      .join("")
      .split("")
      .filter(Boolean)
  )
    .join("")
    .slice(0, 2);

  if (initials.length >= 2) {
    return initials;
  }

  const words = name
    .replace(/[.]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  return slug.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase();
}

function extractSourceSite(readme) {
  const match =
    readme.match(/public \[([^\]]+)\]\((https?:\/\/[^)]+)\)/i) ||
    readme.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);

  if (!match) {
    return null;
  }

  return {
    name: match[1],
    url: match[2],
  };
}

function extractSection(content, title) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionRegex = new RegExp(
    `^${escaped}\\s*$([\\s\\S]*?)(?=^##\\s+|\\Z)`,
    "m"
  );
  const match = content.match(sectionRegex);
  return match ? match[1].trim() : "";
}

function extractOverviewParagraphs(content) {
  const section = extractSection(content, "## 1. Visual Theme & Atmosphere");
  if (!section) {
    return [];
  }

  return section
    .split(/\n\s*\n/)
    .map((block) => stripMarkdown(block))
    .filter(
      (block) =>
        block &&
        !block.startsWith("Key Characteristics:") &&
        !block.startsWith("- ")
    )
    .slice(0, 2);
}

function extractKeyCharacteristics(content) {
  const match = content.match(/\*\*Key Characteristics:\*\*([\s\S]*?)(?=\n##\s+|\Z)/);
  if (!match) {
    return [];
  }

  return match[1]
    .split(/\n/)
    .map((line) => line.match(/^- (.+)$/)?.[1])
    .filter(Boolean)
    .map((line) => stripMarkdown(line))
    .slice(0, 5);
}

function extractFonts(preview) {
  const getVar = (name) =>
    preview.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]?.trim() || null;

  return {
    serif: getVar("font-serif"),
    sans: getVar("font-sans"),
    mono: getVar("font-mono"),
  };
}

function extractColors(preview, designContent) {
  const previewHexes = [...preview.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((match) =>
    match[0].toLowerCase()
  );
  const designHexes = [...designContent.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((match) =>
    match[0].toLowerCase()
  );

  return unique([...previewHexes, ...designHexes]).slice(0, 6);
}

function extractCollection(readme) {
  const lines = readme.split(/\r?\n/);
  const items = [];
  let currentCategory = null;

  for (const line of lines) {
    const headingMatch = line.match(/^###\s+(.+)$/);
    if (headingMatch) {
      currentCategory = CATEGORY_MAP.has(headingMatch[1]) ? headingMatch[1] : null;
      continue;
    }

    if (!currentCategory) {
      continue;
    }

    const itemMatch = line.match(/^- \[\*\*(.+?)\*\*\]\((.+?)\)\s+-\s+(.+)$/);
    if (!itemMatch) {
      continue;
    }

    const [, name, url, summary] = itemMatch;
    const slug = url.match(/\/design-md\/([^/]+)\/?$/)?.[1];

    if (!slug) {
      continue;
    }

    items.push({
      name,
      slug,
      summary: stripMarkdown(summary),
      category: CATEGORY_MAP.get(currentCategory),
    });
  }

  return items;
}

function buildDesignRecord(item, index) {
  const folder = path.join(designRoot, item.slug);
  const readmeFile = path.join(folder, "README.md");
  const designFile = path.join(folder, "DESIGN.md");
  const previewFile = path.join(folder, "preview.html");
  const previewDarkFile = path.join(folder, "preview-dark.html");

  if (!exists(readmeFile) || !exists(designFile) || !exists(previewFile)) {
    throw new Error(`Missing expected files for ${item.slug}`);
  }

  const localReadme = readText(readmeFile);
  const designContent = readText(designFile);
  const previewContent = readText(previewFile);

  const overviewParagraphs = extractOverviewParagraphs(designContent);
  const sourceSite = extractSourceSite(localReadme);
  const colors = extractColors(previewContent, designContent);
  const hasDarkPreview = exists(previewDarkFile);

  return {
    id: index + 1,
    slug: item.slug,
    name: item.name,
    monogram: monogramFromName(item.name, item.slug),
    categoryKey: item.category.key,
    categoryLabelZh: item.category.labelZh,
    categoryLabelEn: item.category.labelEn,
    summary: item.summary,
    overview: overviewParagraphs.length ? overviewParagraphs : [item.summary],
    keyCharacteristics: extractKeyCharacteristics(designContent),
    colors,
    fonts: extractFonts(previewContent),
    sourceSite,
    files: {
      readme: `design-md/${item.slug}/README.md`,
      design: `design-md/${item.slug}/DESIGN.md`,
      preview: `design-md/${item.slug}/preview.html`,
      previewDark: hasDarkPreview ? `design-md/${item.slug}/preview-dark.html` : null,
    },
    stats: {
      previewCount: hasDarkPreview ? 2 : 1,
      colorCount: colors.length,
    },
  };
}

function main() {
  const rootReadme = readText(readmePath);
  const items = extractCollection(rootReadme);
  const designs = items.map(buildDesignRecord);

  const categoryCounts = designs.reduce((accumulator, design) => {
    accumulator[design.categoryKey] = (accumulator[design.categoryKey] || 0) + 1;
    return accumulator;
  }, {});

  const siteMeta = {
    generatedAt: new Date().toISOString(),
    totalDesigns: designs.length,
    totalPreviews: designs.reduce(
      (sum, design) => sum + (design.stats.previewCount || 0),
      0
    ),
    totalCategories: Object.keys(categoryCounts).length,
    categoryCounts,
  };

  const output = [
    `window.SITE_META = ${JSON.stringify(siteMeta, null, 2)};`,
    `window.DESIGNS = ${JSON.stringify(designs, null, 2)};`,
    "",
  ].join("\n");

  fs.writeFileSync(outputPath, output, "utf8");
  console.log(
    `Generated ${path.relative(rootDir, outputPath)} with ${designs.length} design entries.`
  );
}

main();
