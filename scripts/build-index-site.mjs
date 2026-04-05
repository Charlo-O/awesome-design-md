#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const readmePath = path.join(rootDir, "README.md");
const primaryDesignRoot = path.join(rootDir, "design-md");
const outputPath = path.join(rootDir, "site-assets", "designs.js");
const externalTargetRoot = path.join(rootDir, "extra", "uiuxskillProMax");
const externalGeneratedRoot = path.join(externalTargetRoot, "generated");
const externalSourceCandidates = [
  path.resolve(rootDir, "..", "extra", "uiuxskillProMax"),
  externalTargetRoot,
];
const externalRuntimeFiles = [
  "README.md",
  "index.html",
  "uiuxpro_styles.html",
  "uiuxpro_colors.html",
  "uiuxpro_icons.html",
  ".nojekyll",
];
const externalRuntimeDirs = ["css", "js", "refstyles"];

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

const STYLE_TYPE_MAP = new Map([
  [
    "一般",
    {
      key: "styleGeneral",
      labelZh: "通用风格模板",
      labelEn: "General Style Templates",
      audienceEn: "general interfaces",
    },
  ],
  [
    "登陸頁面",
    {
      key: "styleLanding",
      labelZh: "落地页风格模板",
      labelEn: "Landing Page Templates",
      audienceEn: "landing pages",
    },
  ],
  [
    "商業智慧/分析",
    {
      key: "styleAnalytics",
      labelZh: "分析仪表板模板",
      labelEn: "Analytics Dashboard Templates",
      audienceEn: "analytics and BI dashboards",
    },
  ],
]);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeText(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function normalizeText(value) {
  return String(value ?? "").replace(/\r/g, "").replace(/\s+/g, " ").trim();
}

function stripMarkdown(value) {
  return normalizeText(
    String(value ?? "")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
  );
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
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

function sanitizeSlug(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/\.html?$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function relativeFromRoot(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, "/");
}

function parseJsVariable(filePath, variableName) {
  const source = readText(filePath);
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${source}\nglobalThis.__parsed = ${variableName};`, context);
  return context.__parsed;
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

function extractFontsFromCss(content) {
  const names = unique(
    [...content.matchAll(/font-family:\s*([^;]+);/gi)]
      .flatMap((match) => match[1].split(","))
      .map((item) => item.replace(/['"]/g, "").trim())
      .filter(
        (item) =>
          item &&
          !/^(sans-serif|serif|monospace|system-ui|ui-sans-serif)$/i.test(item)
      )
  );

  const fonts = {
    serif: null,
    sans: null,
    mono: null,
  };

  for (const name of names) {
    if (!fonts.mono && /(mono|code)/i.test(name)) {
      fonts.mono = name;
      continue;
    }

    if (
      !fonts.serif &&
      /(serif|times|georgia|garamond|baskerville|merriweather|song)/i.test(name) &&
      !/sans/i.test(name)
    ) {
      fonts.serif = name;
      continue;
    }

    if (!fonts.sans) {
      fonts.sans = name;
    }
  }

  return fonts;
}

function extractFonts(preview) {
  const getVar = (name) =>
    preview.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]?.trim() || null;

  const fromVars = {
    serif: getVar("font-serif"),
    sans: getVar("font-sans"),
    mono: getVar("font-mono"),
  };

  if (Object.values(fromVars).some(Boolean)) {
    return fromVars;
  }

  return extractFontsFromCss(preview);
}

function extractHexColors(...sources) {
  return unique(
    sources
      .flatMap((source) =>
        String(source ?? "")
          .match(/#[0-9a-fA-F]{6}\b/g)
          ?.map((value) => value.toLowerCase()) || []
      )
      .filter(Boolean)
  );
}

function extractColors(preview, designContent) {
  return extractHexColors(preview, designContent).slice(0, 6);
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

function buildPrimaryDesignRecord(item, index) {
  const folder = path.join(primaryDesignRoot, item.slug);
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
    searchTerms: [],
  };
}

function resolveExternalSourceRoot() {
  return (
    externalSourceCandidates.find(
      (candidate) =>
        exists(candidate) &&
        exists(path.join(candidate, "js", "style-data.js")) &&
        exists(path.join(candidate, "refstyles"))
    ) || null
  );
}

function syncExternalRuntime(sourceRoot) {
  if (!sourceRoot) {
    return null;
  }

  if (path.resolve(sourceRoot) !== path.resolve(externalTargetRoot)) {
    fs.rmSync(externalTargetRoot, { recursive: true, force: true });
    fs.mkdirSync(externalTargetRoot, { recursive: true });

    for (const name of externalRuntimeFiles) {
      const sourcePath = path.join(sourceRoot, name);
      if (exists(sourcePath)) {
        fs.cpSync(sourcePath, path.join(externalTargetRoot, name), { recursive: true });
      }
    }

    for (const name of externalRuntimeDirs) {
      const sourcePath = path.join(sourceRoot, name);
      if (exists(sourcePath)) {
        fs.cpSync(sourcePath, path.join(externalTargetRoot, name), { recursive: true });
      }
    }
  }

  fs.rmSync(externalGeneratedRoot, { recursive: true, force: true });
  fs.mkdirSync(externalGeneratedRoot, { recursive: true });
  return externalTargetRoot;
}

function buildExternalSummary(styleName, typeMeta, style) {
  const keywords = normalizeText(style.keywords)
    .split(/\s*,\s*/)
    .filter(Boolean)
    .slice(0, 5)
    .join(", ");

  return `${styleName} is a UI style reference for ${typeMeta.audienceEn}, focused on ${keywords}.`;
}

function buildExternalOverview(styleName, typeMeta, style) {
  const visualFocus = normalizeText(style.visual?.effects || style.keywords);
  const bestFor = normalizeText(style.usage?.bestFor);
  const avoid = normalizeText(style.usage?.avoid);

  return [
    `${styleName} is a UI style reference for ${typeMeta.audienceEn}, combining ${normalizeText(
      style.keywords
    )}. The visual direction is shaped by ${visualFocus}.`,
    `Use it for ${bestFor}. Avoid it for ${avoid}.`,
  ].filter(Boolean);
}

function buildExternalCharacteristics(style) {
  return [
    `Primary palette: ${normalizeText(style.visual?.primary)}`,
    `Secondary palette: ${normalizeText(style.visual?.secondary)}`,
    `Effects: ${normalizeText(style.visual?.effects)}`,
    `Accessibility: ${normalizeText(style.metrics?.accessibility)}; performance: ${normalizeText(style.metrics?.performance)}; dark mode: ${normalizeText(style.metrics?.darkMode)}; complexity: ${normalizeText(style.metrics?.complexity)}.`,
    `Framework fit: ${normalizeText(style.meta?.frameworks)}; era: ${normalizeText(style.meta?.era)}.`,
    `Best for: ${normalizeText(style.usage?.bestFor)}`,
    `Avoid for: ${normalizeText(style.usage?.avoid)}`,
  ]
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .slice(0, 6);
}

function buildExternalDocs(styleName, slugBase, style, previewRelativePath) {
  const docDir = path.join(externalGeneratedRoot, slugBase);
  const previewPath = path.join(rootDir, previewRelativePath);
  const libraryHomePath = path.join(externalTargetRoot, "index.html");
  const libraryStylesPath = path.join(externalTargetRoot, "uiuxpro_styles.html");
  const libraryColorsPath = path.join(externalTargetRoot, "uiuxpro_colors.html");
  const libraryIconsPath = path.join(externalTargetRoot, "uiuxpro_icons.html");

  const links = {
    preview: path.relative(docDir, previewPath).replaceAll(path.sep, "/"),
    home: path.relative(docDir, libraryHomePath).replaceAll(path.sep, "/"),
    styles: path.relative(docDir, libraryStylesPath).replaceAll(path.sep, "/"),
    colors: path.relative(docDir, libraryColorsPath).replaceAll(path.sep, "/"),
    icons: path.relative(docDir, libraryIconsPath).replaceAll(path.sep, "/"),
  };

  const readmeContent = [
    `# ${styleName}`,
    "",
    `This entry mirrors the \`${styleName}\` reference style from the local UI/UX Pro Max library.`,
    "",
    "## Included Pages",
    "",
    `- [Preview page](${links.preview})`,
    `- [UI/UX Pro Max home](${links.home})`,
    `- [Style library](${links.styles})`,
    `- [Color library](${links.colors})`,
    `- [Icon library](${links.icons})`,
    "",
    "## Style Metadata",
    "",
    `- Type: ${normalizeText(style.type)}`,
    `- Keywords: ${normalizeText(style.keywords)}`,
    `- Frameworks: ${normalizeText(style.meta?.frameworks)}`,
    `- Era: ${normalizeText(style.meta?.era)}`,
    "",
  ].join("\n");

  const designContent = [
    `# ${styleName}`,
    "",
    "## 1. Visual Theme & Atmosphere",
    "",
    `${buildExternalOverview(styleName, STYLE_TYPE_MAP.get(style.type) || STYLE_TYPE_MAP.get("一般"), style).join("\n\n")}`,
    "",
    "**Key Characteristics:**",
    `- Primary palette: ${normalizeText(style.visual?.primary)}`,
    `- Secondary palette: ${normalizeText(style.visual?.secondary)}`,
    `- Effects: ${normalizeText(style.visual?.effects)}`,
    `- Accessibility: ${normalizeText(style.metrics?.accessibility)}; performance: ${normalizeText(style.metrics?.performance)}; dark mode: ${normalizeText(style.metrics?.darkMode)}.`,
    `- Best for: ${normalizeText(style.usage?.bestFor)}`,
    `- Avoid for: ${normalizeText(style.usage?.avoid)}`,
    "",
    "## 2. Implementation Notes",
    "",
    `- Framework fit: ${normalizeText(style.meta?.frameworks)}`,
    `- Era reference: ${normalizeText(style.meta?.era)}`,
    `- Local preview: [Open HTML preview](${links.preview})`,
    `- Library index: [Open UI/UX Pro Max home](${links.home})`,
    "",
  ].join("\n");

  const readmePath = path.join(docDir, "README.md");
  const designPath = path.join(docDir, "DESIGN.md");
  writeText(readmePath, readmeContent);
  writeText(designPath, designContent);

  return {
    readme: relativeFromRoot(readmePath),
    design: relativeFromRoot(designPath),
  };
}

function buildExternalDesignRecord(style, index) {
  const typeMeta = STYLE_TYPE_MAP.get(style.type) || STYLE_TYPE_MAP.get("一般");
  const styleName = normalizeText(style.category || `Style ${style.id}`);
  const slugBase = sanitizeSlug(path.basename(style.preview_url || styleName, ".html"));
  const slug = `uiuxpro-${slugBase}`;
  const previewRelativePath = path.posix.join(
    "extra/uiuxskillProMax",
    String(style.preview_url || "").replaceAll("\\", "/")
  );
  const previewFile = path.join(rootDir, previewRelativePath);

  if (!exists(previewFile)) {
    throw new Error(`Missing imported preview for ${slug}`);
  }

  const previewContent = readText(previewFile);
  const generatedFiles = buildExternalDocs(styleName, slugBase, style, previewRelativePath);
  const colors = extractHexColors(
    previewContent,
    style.visual?.primary,
    style.visual?.secondary,
    style.visual?.effects
  ).slice(0, 6);

  return {
    id: index + 1,
    slug,
    name: styleName,
    monogram: monogramFromName(styleName, slug),
    categoryKey: typeMeta.key,
    categoryLabelZh: typeMeta.labelZh,
    categoryLabelEn: typeMeta.labelEn,
    summary: buildExternalSummary(styleName, typeMeta, style),
    overview: buildExternalOverview(styleName, typeMeta, style),
    keyCharacteristics: buildExternalCharacteristics(style),
    colors,
    fonts: extractFonts(previewContent),
    sourceSite: {
      name: "UI/UX Pro Max",
      url: "extra/uiuxskillProMax/index.html",
    },
    files: {
      readme: generatedFiles.readme,
      design: generatedFiles.design,
      preview: previewRelativePath,
      previewDark: null,
    },
    stats: {
      previewCount: 1,
      colorCount: colors.length,
    },
    searchTerms: [
      style.type,
      style.category,
      style.category_zh,
      style.keywords,
      style.usage?.bestFor,
      style.usage?.avoid,
      style.visual?.primary,
      style.visual?.secondary,
      style.meta?.frameworks,
      style.meta?.era,
    ]
      .map((item) => normalizeText(item))
      .filter(Boolean),
  };
}

function main() {
  const rootReadme = readText(readmePath);
  const primaryItems = extractCollection(rootReadme);
  const primaryDesigns = primaryItems.map(buildPrimaryDesignRecord);

  let importedDesigns = [];
  const externalSourceRoot = resolveExternalSourceRoot();
  if (externalSourceRoot) {
    const syncedRoot = syncExternalRuntime(externalSourceRoot);
    const stylesData = parseJsVariable(
      path.join(syncedRoot, "js", "style-data.js"),
      "stylesData"
    );

    importedDesigns = stylesData.map((style, index) =>
      buildExternalDesignRecord(style, primaryDesigns.length + index)
    );
  } else {
    console.warn("Skipped UI/UX Pro Max import because no source directory was found.");
  }

  const designs = [...primaryDesigns, ...importedDesigns];

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
    `Generated ${path.relative(rootDir, outputPath)} with ${designs.length} design entries (${importedDesigns.length} imported from UI/UX Pro Max).`
  );
}

main();
