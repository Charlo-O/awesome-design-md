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
const generatedPreviewRoot = path.join(rootDir, "site-assets", "generated-previews");
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
const openDesignRootCandidates = [
  process.env.OPEN_DESIGN_ROOT,
  path.resolve(rootDir, "..", "..", "Opendesgin", "open-design"),
  path.resolve(rootDir, "..", "..", "OpenDesign", "open-design"),
  "F:\\soft\\Opendesgin\\open-design",
].filter(Boolean);

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

const CATEGORY_BY_KEY = new Map(
  [...CATEGORY_MAP.values(), ...STYLE_TYPE_MAP.values()].map((item) => [
    item.key,
    item,
  ])
);

const RESOURCE_TYPE_PALETTES = {
  "design-system": ["#141413", "#1d5b48", "#e7f3ee", "#fffdfa", "#f7f2eb"],
  "style-template": ["#171411", "#8a5514", "#fdf2e7", "#fffdfa", "#f4efe8"],
  "artifact-template": ["#171411", "#2563eb", "#dbeafe", "#eff6ff", "#f4f8fc"],
  "prompt-template": ["#171411", "#d97706", "#fef3c7", "#fffbeb", "#f7f2eb"],
  "image-prompt-template": ["#171411", "#b45309", "#ffedd5", "#fff7ed", "#f7f2eb"],
  "agent-skill": ["#171411", "#66319a", "#f6eefc", "#fbf7ff", "#f4efe8"],
  plugin: ["#171411", "#e11d48", "#ffe4e6", "#fff1f2", "#f4efe8"],
  workflow: ["#171411", "#0891b2", "#cffafe", "#ecfeff", "#f4efe8"],
};

const DOMAIN_BY_SCENARIO = new Map([
  ["design", "design"],
  ["marketing", "design"],
  ["creator", "design"],
  ["personal", "enterprise"],
  ["operation", "enterprise"],
  ["operations", "enterprise"],
  ["product", "design"],
  ["engineering", "dev"],
  ["code-migration", "dev"],
  ["figma-migration", "design"],
  ["finance", "finance"],
  ["sale", "enterprise"],
  ["sales", "enterprise"],
  ["hr", "enterprise"],
  ["image", "design"],
  ["video", "design"],
  ["audio", "design"],
  ["media-generation", "design"],
  ["default-router", "design"],
  ["new-generation", "design"],
  ["tune-collab", "design"],
  ["downstream-export", "dev"],
  ["plugin-authoring", "dev"],
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

function dedupeKey(value) {
  return normalizeText(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
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

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function listDirs(dirPath) {
  if (!exists(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dirPath, entry.name));
}

function getCategoryByKey(key) {
  return CATEGORY_BY_KEY.get(key) || {
    key,
    labelZh: key,
    labelEn: key,
  };
}

function stripYamlQuotes(value) {
  return normalizeText(value).replace(/^["']|["']$/g, "");
}

function extractFrontmatter(markdown) {
  const match = String(markdown || "").match(/^---\s*\n([\s\S]*?)\n---/);
  return match ? match[1] : "";
}

function extractYamlScalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match ? stripYamlQuotes(match[1]) : "";
}

function extractYamlBlock(frontmatter, key) {
  const blockMatch = frontmatter.match(
    new RegExp(`^${key}:\\s*\\|\\s*\\n([\\s\\S]*?)(?=^\\S|$)`, "m")
  );
  if (blockMatch) {
    return blockMatch[1]
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s{2,}/, ""))
      .join(" ")
      .trim();
  }

  return extractYamlScalar(frontmatter, key);
}

function extractOdBlock(frontmatter) {
  const match = frontmatter.match(/^od:\s*\n([\s\S]*?)(?=^\S|$)/m);
  return match ? match[1] : "";
}

function extractOdScalar(frontmatter, key) {
  const block = extractOdBlock(frontmatter);
  const match = block.match(new RegExp(`^\\s{2}${key}:\\s*(.+)$`, "m"));
  return match ? stripYamlQuotes(match[1]) : "";
}

function parseSkillFile(skillPath) {
  if (!exists(skillPath)) {
    return null;
  }

  const content = readText(skillPath);
  const frontmatter = extractFrontmatter(content);
  return {
    content,
    name: extractYamlScalar(frontmatter, "name") || path.basename(path.dirname(skillPath)),
    description: extractYamlBlock(frontmatter, "description"),
    mode:
      extractOdScalar(frontmatter, "mode") ||
      extractYamlScalar(frontmatter, "mode") ||
      "",
    platform: extractOdScalar(frontmatter, "platform"),
    scenario:
      extractOdScalar(frontmatter, "scenario") ||
      extractYamlScalar(frontmatter, "scenario") ||
      "",
    upstream: extractOdScalar(frontmatter, "upstream"),
  };
}

function resolveOpenDesignRoot() {
  return (
    openDesignRootCandidates.find(
      (candidate) =>
        exists(candidate) &&
        exists(path.join(candidate, "skills")) &&
        exists(path.join(candidate, "plugins"))
    ) || null
  );
}

function inferSurface(mode, name, summary = "") {
  const text = `${mode} ${name} ${summary}`.toLowerCase();
  if (/deck|ppt|slide|presentation/.test(text)) return "deck";
  if (/mobile|iphone|android|onboarding/.test(text)) return "mobile";
  if (/dashboard|analytics|report|data/.test(text)) return "dashboard";
  if (/image|poster|avatar|infographic|photo/.test(text)) return "image";
  if (/video|motion|hyperframes|clip/.test(text)) return "video";
  if (/audio|music|speech|voice|jingle/.test(text)) return "audio";
  if (/doc|pdf|resume|invoice|notes|brief|spec/.test(text)) return "document";
  if (/design-system|design system|design-md/.test(text)) return "design-system";
  if (/workflow|scenario|migration|export|pipeline/.test(text)) return "workflow";
  return "web";
}

function inferCategoryKey(scenario, mode, text = "") {
  const normalized = normalizeText(scenario || mode).toLowerCase();
  if (DOMAIN_BY_SCENARIO.has(normalized)) {
    return DOMAIN_BY_SCENARIO.get(normalized);
  }

  const haystack = `${normalized} ${text}`.toLowerCase();
  if (/finance|fintech|crypto|bank/.test(haystack)) return "finance";
  if (/code|dev|engineering|github|react|vue|next|figma/.test(haystack)) return "dev";
  if (/infra|cloud|database|api|server/.test(haystack)) return "infra";
  if (/enterprise|hr|sale|consumer|personal/.test(haystack)) return "enterprise";
  return "design";
}

function buildResourceRecord({
  index,
  slug,
  name,
  summary,
  resourceType,
  surface,
  scenario,
  categoryKey,
  sourceKind,
  sourceName,
  sourceUrl,
  sourcePath,
  files = {},
  colors,
  searchTerms = [],
  openDesign = null,
}) {
  const category = getCategoryByKey(categoryKey || "design");
  const palette = colors || RESOURCE_TYPE_PALETTES[resourceType] || RESOURCE_TYPE_PALETTES.plugin;
  const cleanSummary = stripMarkdown(summary || `${name} resource`);
  const originalCategoryKey = category.key;
  const originalCategoryLabelZh = category.labelZh;
  const originalCategoryLabelEn = category.labelEn;

  return {
    id: index + 1,
    slug,
    name,
    monogram: monogramFromName(name, slug),
    entryType: resourceType === "agent-skill" ? "skill" : "resource",
    resourceType,
    surface,
    scenario,
    sourceKind,
    categoryKey: category.key,
    categoryLabelZh: category.labelZh,
    categoryLabelEn: category.labelEn,
    originalCategoryKey,
    originalCategoryLabelZh,
    originalCategoryLabelEn,
    summary: cleanSummary,
    overview: [cleanSummary],
    keyCharacteristics: [
      `Resource type: ${resourceType}`,
      `Surface: ${surface}`,
      scenario ? `Scenario: ${scenario}` : "",
      sourceKind ? `Source kind: ${sourceKind}` : "",
      sourcePath ? `Local source: ${sourcePath}` : "",
    ].filter(Boolean),
    colors: palette,
    fonts: {
      serif: null,
      sans: "Inter, system-ui, -apple-system, sans-serif",
      mono: "JetBrains Mono, SFMono-Regular, Menlo, monospace",
    },
    sourceSite: {
      name: sourceName,
      url: sourceUrl || null,
    },
    files: {
      readme: files.readme || null,
      design: files.design || null,
      preview: files.preview || null,
      previewDark: files.previewDark || null,
    },
    stats: {
      previewCount: files.preview ? 1 + (files.previewDark ? 1 : 0) : 0,
      colorCount: palette.length,
    },
    searchTerms: unique([
      resourceType,
      surface,
      scenario,
      sourceKind,
      sourceName,
      sourcePath,
      ...searchTerms,
    ]).filter(Boolean),
    openDesign,
  };
}

function buildOpenDesignSkillRecords(openDesignRoot, startIndex) {
  const records = [];
  const addSkillDir = (dirPath, resourceType, sourceKind) => {
    const skill = parseSkillFile(path.join(dirPath, "SKILL.md"));
    if (!skill) {
      return;
    }

    const name = skill.name || path.basename(dirPath);
    const summary = skill.description || `${name} ${resourceType}`;
    const mode = skill.mode || "";
    const scenario = skill.scenario || mode || resourceType;
    const surface = inferSurface(mode, name, summary);
    const categoryKey = inferCategoryKey(scenario, mode, summary);
    const sourcePath = path.relative(openDesignRoot, dirPath).replaceAll(path.sep, "/");
    const previewPath = path.join(dirPath, "example.html");

    records.push(
      buildResourceRecord({
        index: startIndex + records.length,
        slug: `od-${sourceKind}-${sanitizeSlug(name)}`,
        name,
        summary,
        resourceType,
        surface,
        scenario,
        categoryKey,
        sourceKind: `open-design-${sourceKind}`,
        sourceName: "Open Design",
        sourceUrl: skill.upstream || "https://github.com/nexu-io/open-design",
        sourcePath,
        files: exists(previewPath) ? {} : {},
        searchTerms: [mode, skill.platform, sourcePath],
        openDesign: {
          root: openDesignRoot,
          path: sourcePath,
          mode,
          platform: skill.platform,
        },
      })
    );
  };

  for (const dirPath of listDirs(path.join(openDesignRoot, "skills"))) {
    addSkillDir(dirPath, "agent-skill", "skill");
  }

  for (const dirPath of listDirs(path.join(openDesignRoot, "design-templates"))) {
    addSkillDir(dirPath, "artifact-template", "design-template");
  }

  return records;
}

function buildOpenDesignPromptRecords(openDesignRoot, startIndex) {
  const records = [];
  const promptRoots = [
    { dir: path.join(openDesignRoot, "prompt-templates", "image"), surface: "image" },
    { dir: path.join(openDesignRoot, "prompt-templates", "video"), surface: "video" },
  ];

  for (const promptRoot of promptRoots) {
    if (!exists(promptRoot.dir)) {
      continue;
    }

    for (const fileName of fs.readdirSync(promptRoot.dir)) {
      if (!fileName.endsWith(".json")) {
        continue;
      }

      const filePath = path.join(promptRoot.dir, fileName);
      let item;
      try {
        item = readJson(filePath);
      } catch {
        continue;
      }

      const name = item.title || item.id || path.basename(fileName, ".json");
      const summary = item.summary || item.prompt || `${name} prompt`;
      const sourcePath = path.relative(openDesignRoot, filePath).replaceAll(path.sep, "/");
      records.push(
        buildResourceRecord({
          index: startIndex + records.length,
          slug: `od-prompt-${sanitizeSlug(item.id || name)}`,
          name,
          summary,
          resourceType:
            (item.surface || promptRoot.surface) === "image"
              ? "image-prompt-template"
              : "prompt-template",
          surface: item.surface || promptRoot.surface,
          scenario: item.category || promptRoot.surface,
          categoryKey: inferCategoryKey(item.category, promptRoot.surface, summary),
          sourceKind: "open-design-prompt-template",
          sourceName: item.source?.repo || "Open Design",
          sourceUrl: item.source?.url || "https://github.com/nexu-io/open-design",
          sourcePath,
          searchTerms: [item.model, item.aspect, item.category, ...(item.tags || [])],
          openDesign: {
            root: openDesignRoot,
            path: sourcePath,
            model: item.model,
            aspect: item.aspect,
          },
        })
      );
    }
  }

  return records;
}

function pluginResourceType(sectionName) {
  if (sectionName === "scenarios") return "workflow";
  if (sectionName === "image-templates") return "image-prompt-template";
  if (sectionName === "video-templates") {
    return "prompt-template";
  }
  if (sectionName === "design-systems") return "design-system";
  if (sectionName === "examples") return "plugin";
  if (sectionName === "atoms") return "agent-skill";
  return "plugin";
}

function buildOpenDesignPluginRecords(openDesignRoot, startIndex) {
  const records = [];
  const officialRoot = path.join(openDesignRoot, "plugins", "_official");
  const sections = [
    "examples",
    "image-templates",
    "video-templates",
    "design-systems",
    "scenarios",
    "atoms",
  ];

  for (const section of sections) {
    for (const dirPath of listDirs(path.join(officialRoot, section))) {
      const manifestPath = path.join(dirPath, "open-design.json");
      const skill = parseSkillFile(path.join(dirPath, "SKILL.md"));
      if (!exists(manifestPath) && !skill) {
        continue;
      }

      let manifest = null;
      if (exists(manifestPath)) {
        try {
          manifest = readJson(manifestPath);
        } catch {
          manifest = null;
        }
      }

      const od = manifest?.od || {};
      const name = manifest?.title || manifest?.name || skill?.name || path.basename(dirPath);
      const query = od.useCase?.query?.en || od.useCase?.query?.["zh-CN"] || "";
      const summary = manifest?.description || skill?.description || query || `${name} plugin`;
      const resourceType = pluginResourceType(section);
      const mode = od.mode || skill?.mode || "";
      const scenario = od.scenario || skill?.scenario || od.taskKind || mode || section;
      const surface = od.surface || inferSurface(mode, name, summary);
      const categoryKey = inferCategoryKey(scenario, mode, summary);
      const sourcePath = path.relative(openDesignRoot, dirPath).replaceAll(path.sep, "/");

      records.push(
        buildResourceRecord({
          index: startIndex + records.length,
          slug: `od-${section}-${sanitizeSlug(manifest?.name || skill?.name || name)}`,
          name,
          summary,
          resourceType,
          surface,
          scenario,
          categoryKey,
          sourceKind: `open-design-${section}`,
          sourceName: "Open Design",
          sourceUrl: manifest?.homepage || "https://github.com/nexu-io/open-design",
          sourcePath,
          searchTerms: [
            manifest?.name,
            od.kind,
            od.taskKind,
            mode,
            ...(manifest?.tags || []),
            ...(od.capabilities || []),
          ],
          openDesign: {
            root: openDesignRoot,
            path: sourcePath,
            manifest: exists(manifestPath) ? sourcePath + "/open-design.json" : null,
            mode,
            taskKind: od.taskKind,
            kind: od.kind,
          },
        })
      );
    }
  }

  return records;
}

function buildOpenDesignRecords(startIndex) {
  const openDesignRoot = resolveOpenDesignRoot();
  if (!openDesignRoot) {
    console.warn("Skipped Open Design import because no source directory was found.");
    return [];
  }

  const records = [
    ...buildOpenDesignSkillRecords(openDesignRoot, startIndex),
  ];
  records.push(...buildOpenDesignPromptRecords(openDesignRoot, startIndex + records.length));
  records.push(...buildOpenDesignPluginRecords(openDesignRoot, startIndex + records.length));
  return records;
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
    `^${escaped}\\s*$([\\s\\S]*?)(?=^##\\s+|$)`,
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
  const match = content.match(/\*\*Key Characteristics:\*\*([\s\S]*?)(?=\n##\s+|$)/);
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
    entryType: "resource",
    resourceType: "design-system",
    surface: "design-system",
    scenario: item.category.key,
    sourceKind: "design-md",
    categoryKey: item.category.key,
    categoryLabelZh: item.category.labelZh,
    categoryLabelEn: item.category.labelEn,
    originalCategoryKey: item.category.key,
    originalCategoryLabelZh: item.category.labelZh,
    originalCategoryLabelEn: item.category.labelEn,
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
    entryType: "resource",
    resourceType: "style-template",
    surface:
      typeMeta.key === "styleAnalytics"
        ? "dashboard"
        : typeMeta.key === "styleLanding"
          ? "web"
          : "ui",
    scenario: typeMeta.key,
    sourceKind: "uiux-pro-max",
    categoryKey: typeMeta.key,
    categoryLabelZh: typeMeta.labelZh,
    categoryLabelEn: typeMeta.labelEn,
    originalCategoryKey: typeMeta.key,
    originalCategoryLabelZh: typeMeta.labelZh,
    originalCategoryLabelEn: typeMeta.labelEn,
    summary: buildExternalSummary(styleName, typeMeta, style),
    overview: buildExternalOverview(styleName, typeMeta, style),
    keyCharacteristics: buildExternalCharacteristics(style),
    colors,
    fonts: extractFonts(previewContent),
    sourceSite: {
      name: "UI/UX Pro Max",
      url: previewRelativePath,
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

function dedupeDesignRecords(records) {
  const primaryDesignNames = new Set(
    records
      .filter((record) => record.sourceKind === "design-md")
      .map((record) => dedupeKey(record.name || record.slug))
  );
  const seen = new Set();

  return records.filter((record) => {
    const key = `${record.resourceType || "resource"}:${dedupeKey(record.name || record.slug)}`;
    if (
      record.resourceType === "design-system" &&
      record.sourceKind !== "design-md" &&
      primaryDesignNames.has(dedupeKey(record.name || record.slug))
    ) {
      return false;
    }

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function previewDocument(record) {
  const palette = record.colors?.length
    ? record.colors
    : RESOURCE_TYPE_PALETTES[record.resourceType] || RESOURCE_TYPE_PALETTES.plugin;
  const [ink, accent, soft, paper] = palette;
  const title = stripMarkdown(record.name || "Resource");
  const summary = stripMarkdown(record.summary || "");
  const type = record.resourceType || "resource";
  const surface = record.surface || "web";
  const category = record.categoryLabelZh || record.categoryLabelEn || record.categoryKey || "";
  const traits = (record.keyCharacteristics || [])
    .slice(0, 3)
    .map((trait) => `<li>${escapeHtml(stripMarkdown(trait))}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} Preview</title>
  <style>
    :root {
      --ink: ${escapeHtml(ink || "#171411")};
      --accent: ${escapeHtml(accent || "#1d5b48")};
      --soft: ${escapeHtml(soft || "#e7f3ee")};
      --paper: ${escapeHtml(paper || "#fffdfa")};
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 48px;
      background:
        radial-gradient(circle at 78% 18%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 28%),
        linear-gradient(145deg, var(--paper), color-mix(in srgb, var(--soft) 64%, white));
      color: var(--ink);
      font-family: Inter, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    }
    main {
      width: min(980px, 100%);
      min-height: 560px;
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: 34px;
      padding: 42px;
      border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
      background: color-mix(in srgb, white 78%, var(--paper));
      box-shadow: 0 28px 90px color-mix(in srgb, var(--ink) 12%, transparent);
    }
    .topline, .meta {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      color: color-mix(in srgb, var(--ink) 58%, transparent);
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 220px;
      gap: 44px;
      align-items: center;
    }
    h1 {
      margin: 0;
      max-width: 680px;
      font-family: Georgia, "Songti SC", serif;
      font-size: clamp(42px, 8vw, 86px);
      line-height: 0.96;
      font-weight: 400;
      letter-spacing: -0.03em;
    }
    p {
      max-width: 620px;
      margin: 22px 0 0;
      color: color-mix(in srgb, var(--ink) 72%, transparent);
      font-size: 18px;
      line-height: 1.72;
    }
    .mark {
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
      background:
        linear-gradient(135deg, color-mix(in srgb, var(--soft) 84%, white), white);
      color: var(--accent);
      font-family: Georgia, serif;
      font-size: 76px;
      box-shadow: inset 0 0 0 18px color-mix(in srgb, var(--paper) 72%, transparent);
    }
    ul {
      display: grid;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
      color: color-mix(in srgb, var(--ink) 68%, transparent);
      font-size: 14px;
      line-height: 1.5;
    }
    li::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-right: 10px;
      border-radius: 50%;
      background: var(--accent);
      vertical-align: 1px;
    }
    @media (max-width: 720px) {
      body { padding: 22px; }
      main { min-height: 0; padding: 28px; }
      .hero { grid-template-columns: 1fr; }
      .mark { width: 180px; }
    }
  </style>
</head>
<body>
  <main>
    <div class="topline">
      <span>${escapeHtml(type)}</span>
      <span>${escapeHtml(surface)}</span>
    </div>
    <section class="hero">
      <div>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(summary)}</p>
      </div>
      <div class="mark">${escapeHtml(record.monogram || monogramFromName(title, record.slug || ""))}</div>
    </section>
    <div class="meta">
      <span>${escapeHtml(category)}</span>
      <ul>${traits}</ul>
    </div>
  </main>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function attachGeneratedPreviews(records) {
  fs.rmSync(generatedPreviewRoot, { recursive: true, force: true });
  fs.mkdirSync(generatedPreviewRoot, { recursive: true });

  return records.map((record) => {
    if (record.files?.preview) {
      return record;
    }

    const fileName = `${sanitizeSlug(record.slug || record.name)}.html`;
    const filePath = path.join(generatedPreviewRoot, fileName);
    writeText(filePath, previewDocument(record));

    return {
      ...record,
      files: {
        ...(record.files || {}),
        preview: `site-assets/generated-previews/${fileName}`,
      },
      stats: {
        ...(record.stats || {}),
        previewCount: 1,
      },
    };
  });
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

  const openDesignRecords = buildOpenDesignRecords(
    primaryDesigns.length + importedDesigns.length
  );

  const designs = attachGeneratedPreviews(
    dedupeDesignRecords([...primaryDesigns, ...importedDesigns, ...openDesignRecords]).map(
      (design, index) => ({
        ...design,
        id: index + 1,
      })
    )
  );

  const categoryCounts = designs.reduce((accumulator, design) => {
    accumulator[design.categoryKey] = (accumulator[design.categoryKey] || 0) + 1;
    return accumulator;
  }, {});
  const resourceTypeCounts = designs.reduce((accumulator, design) => {
    const key = design.resourceType || design.entryType || "unknown";
    accumulator[key] = (accumulator[key] || 0) + 1;
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
    resourceTypeCounts,
  };

  const output = [
    `window.SITE_META = ${JSON.stringify(siteMeta, null, 2)};`,
    `window.DESIGNS = ${JSON.stringify(designs, null, 2)};`,
    "",
  ].join("\n");

  fs.writeFileSync(outputPath, output, "utf8");
  console.log(
    `Generated ${path.relative(rootDir, outputPath)} with ${designs.length} entries (${importedDesigns.length} imported from UI/UX Pro Max, ${openDesignRecords.length} imported from Open Design).`
  );
}

main();
