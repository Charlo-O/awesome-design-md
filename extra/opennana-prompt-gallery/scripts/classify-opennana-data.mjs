#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = join(root, "data");

const categories = [
  "Architecture & Spaces",
  "Brand & Logos",
  "Characters & People",
  "Charts & Infographics",
  "Documents & Publishing",
  "History & Classical Themes",
  "Illustration & Art",
  "Other Use Cases",
  "Photography & Realism",
  "Posters & Typography",
  "Products & E-commerce",
  "Scenes & Storytelling",
  "UI & Interfaces",
];

const categoryRules = [
  {
    category: "UI & Interfaces",
    keywords: [
      "ui",
      "ux",
      "app",
      "interface",
      "dashboard",
      "website",
      "web page",
      "landing page",
      "screenshot",
      "saas",
      "widget",
      "settings",
      "onboarding",
      "mobile screen",
      "界面",
      "网页",
      "应用",
      "仪表盘",
      "落地页",
      "截图",
    ],
  },
  {
    category: "Charts & Infographics",
    keywords: [
      "infographic",
      "diagram",
      "chart",
      "graph",
      "timeline",
      "flowchart",
      "map",
      "knowledge map",
      "data visualization",
      "exploded view",
      "blueprint",
      "atlas",
      "信息图",
      "图解",
      "图表",
      "时间线",
      "流程图",
      "数据可视化",
      "拆解",
    ],
  },
  {
    category: "Posters & Typography",
    keywords: [
      "poster",
      "cover",
      "typography",
      "type design",
      "title design",
      "album cover",
      "movie poster",
      "campaign poster",
      "layout",
      "editorial poster",
      "海报",
      "封面",
      "字体",
      "排版",
      "标题",
      "招贴",
    ],
  },
  {
    category: "Products & E-commerce",
    keywords: [
      "product",
      "packaging",
      "e-commerce",
      "commerce",
      "bottle",
      "cosmetic",
      "skincare",
      "perfume",
      "watch",
      "sneaker",
      "shoe",
      "bag",
      "furniture",
      "food ad",
      "commercial product",
      "商品",
      "产品",
      "包装",
      "电商",
      "护肤",
      "香水",
      "手表",
      "鞋",
      "广告",
    ],
  },
  {
    category: "Brand & Logos",
    keywords: [
      "brand",
      "logo",
      "identity",
      "visual identity",
      "app icon",
      "icon set",
      "mascot logo",
      "guideline",
      "branding",
      "品牌",
      "标志",
      "logo",
      "图标",
      "视觉识别",
      "vi",
    ],
  },
  {
    category: "Architecture & Spaces",
    keywords: [
      "architecture",
      "interior",
      "exterior",
      "building",
      "house",
      "room",
      "living room",
      "bedroom",
      "kitchen",
      "cityscape",
      "urban",
      "museum",
      "storefront",
      "space design",
      "landscape",
      "建筑",
      "室内",
      "空间",
      "房间",
      "客厅",
      "卧室",
      "城市",
      "景观",
    ],
  },
  {
    category: "Photography & Realism",
    keywords: [
      "photo",
      "photography",
      "photorealistic",
      "realistic",
      "ultra-realistic",
      "camera",
      "iphone",
      "dslr",
      "portrait photo",
      "street photo",
      "documentary",
      "candid",
      "film grain",
      "lens",
      "写实",
      "摄影",
      "照片",
      "相机",
      "抓拍",
      "纪实",
      "胶片",
    ],
  },
  {
    category: "Illustration & Art",
    keywords: [
      "illustration",
      "painting",
      "watercolor",
      "ink",
      "oil painting",
      "anime art",
      "manga",
      "sketch",
      "cartoon",
      "sticker",
      "paper cut",
      "clay",
      "3d illustration",
      "插画",
      "绘画",
      "水彩",
      "水墨",
      "油画",
      "漫画",
      "贴纸",
      "卡通",
      "剪纸",
    ],
  },
  {
    category: "Characters & People",
    keywords: [
      "character",
      "avatar",
      "person",
      "portrait",
      "girl",
      "woman",
      "man",
      "boy",
      "pose",
      "cosplay",
      "fashion model",
      "chibi",
      "mascot",
      "action figure",
      "人物",
      "角色",
      "头像",
      "人像",
      "女孩",
      "女性",
      "男孩",
      "姿势",
    ],
  },
  {
    category: "Scenes & Storytelling",
    keywords: [
      "scene",
      "story",
      "storyboard",
      "narrative",
      "cinematic",
      "shot",
      "multi-camera",
      "sequence",
      "worldbuilding",
      "fantasy world",
      "battle",
      "adventure",
      "film still",
      "场景",
      "故事",
      "分镜",
      "电影感",
      "镜头",
      "叙事",
      "战斗",
      "冒险",
    ],
  },
  {
    category: "History & Classical Themes",
    keywords: [
      "history",
      "historical",
      "dynasty",
      "ancient",
      "classical",
      "hanfu",
      "samurai",
      "tang dynasty",
      "song dynasty",
      "mythology",
      "wuxia",
      "traditional chinese",
      "历史",
      "古代",
      "古风",
      "汉服",
      "唐朝",
      "宋朝",
      "神话",
      "武侠",
      "东方",
    ],
  },
  {
    category: "Documents & Publishing",
    keywords: [
      "document",
      "manual",
      "report",
      "white paper",
      "brochure",
      "magazine",
      "book",
      "newspaper",
      "resume",
      "presentation",
      "certificate",
      "page system",
      "文档",
      "手册",
      "报告",
      "白皮书",
      "杂志",
      "报纸",
      "证书",
      "简历",
    ],
  },
];

const styleRules = [
  ["UI", ["ui", "interface", "dashboard", "website", "app", "saas", "界面", "网页", "应用"]],
  ["Infographic", ["infographic", "diagram", "chart", "timeline", "flowchart", "图解", "信息图", "图表"]],
  ["Poster", ["poster", "cover", "typography", "海报", "封面", "排版", "字体"]],
  ["Product", ["product", "packaging", "commerce", "商品", "产品", "包装", "电商"]],
  ["Brand", ["brand", "logo", "identity", "app icon", "品牌", "标志", "图标"]],
  ["Architecture", ["architecture", "interior", "room", "building", "建筑", "室内", "空间"]],
  ["Photography", ["photo", "photography", "camera", "iphone", "摄影", "照片", "相机"]],
  ["Realistic", ["realistic", "photorealistic", "ultra-realistic", "真实", "写实"]],
  ["Illustration", ["illustration", "painting", "watercolor", "ink", "插画", "绘画", "水彩", "水墨"]],
  ["Character", ["character", "avatar", "portrait", "girl", "woman", "man", "角色", "人物", "人像"]],
  ["3D", ["3d", "c4d", "blender", "render", "toy", "clay", "三维", "渲染", "玩具", "黏土"]],
  ["Classical", ["history", "ancient", "dynasty", "hanfu", "wuxia", "历史", "古风", "汉服", "武侠"]],
  ["Video", ["video", "film", "shot", "camera movement", "视频", "影片", "镜头"]],
];

const sceneRules = [
  ["Tech", ["ai", "tech", "data", "saas", "dashboard", "cyberpunk", "robot", "future", "科技", "数据", "赛博", "机器人"]],
  ["Commerce", ["product", "brand", "ad", "campaign", "commercial", "e-commerce", "商品", "品牌", "广告", "商业", "电商"]],
  ["Education", ["guide", "science", "learning", "manual", "diagram", "tutorial", "科普", "学习", "教程", "手册"]],
  ["Social", ["social", "wechat", "instagram", "x.com", "sticker", "meme", "社交", "表情包", "贴纸"]],
  ["Fashion", ["fashion", "clothing", "model", "beauty", "makeup", "portrait", "时尚", "服装", "美妆", "人像"]],
  ["Food", ["food", "drink", "coffee", "tea", "restaurant", "dessert", "食品", "饮料", "咖啡", "茶", "餐厅"]],
  ["Travel", ["city", "street", "map", "landscape", "hotel", "travel", "城市", "街头", "地图", "旅行", "景观"]],
  ["Story", ["story", "scene", "storyboard", "cinematic", "battle", "adventure", "故事", "场景", "分镜", "电影感", "战斗"]],
  ["History", ["history", "ancient", "dynasty", "classical", "mythology", "历史", "古代", "神话", "传统"]],
  ["Creative", ["illustration", "poster", "art", "painting", "design", "插画", "海报", "艺术", "设计"]],
];

const categoryFallbackStyles = {
  "Architecture & Spaces": ["Architecture"],
  "Brand & Logos": ["Brand"],
  "Characters & People": ["Character"],
  "Charts & Infographics": ["Infographic"],
  "Documents & Publishing": ["Documents"],
  "History & Classical Themes": ["Classical"],
  "Illustration & Art": ["Illustration"],
  "Other Use Cases": ["Other Use Cases"],
  "Photography & Realism": ["Photography", "Realistic"],
  "Posters & Typography": ["Poster"],
  "Products & E-commerce": ["Product"],
  "Scenes & Storytelling": ["Scenes"],
  "UI & Interfaces": ["UI"],
};

function cleanList(values) {
  return [...new Set(values.filter(Boolean))];
}

function textForCase(item) {
  return [
    item.title,
    item.slug,
    item.imageAlt,
    item.category,
    item.mediaType,
    item.promptPreview,
    item.prompt,
  ]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
}

function scoreKeywords(text, keywords) {
  return keywords.reduce((score, keyword) => {
    const needle = keyword.toLowerCase();
    if (!needle) return score;

    if (/^[a-z0-9]+$/.test(needle)) {
      const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return score + (text.match(new RegExp(`\\b${escaped}\\b`, "g")) || []).length;
    }

    let index = text.indexOf(needle);
    let matches = 0;
    while (index >= 0) {
      matches += 1;
      index = text.indexOf(needle, index + needle.length);
    }
    return score + matches;
  }, 0);
}

function inferCategory(item, text) {
  const scored = categoryRules
    .map((rule) => ({
      category: rule.category,
      score: scoreKeywords(text, rule.keywords),
    }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (!best || best.score === 0) {
    return item.mediaType === "video" ? "Scenes & Storytelling" : "Other Use Cases";
  }

  const photo = scored.find((item) => item.category === "Photography & Realism");
  const character = scored.find((item) => item.category === "Characters & People");
  if (
    photo?.score > 0 &&
    character?.score > 0 &&
    /\b(photo|photography|photorealistic|realistic|camera|iphone|candid|portrait photo)\b/.test(text)
  ) {
    return "Photography & Realism";
  }

  if (item.mediaType === "video") {
    const scene = scored.find((item) => item.category === "Scenes & Storytelling");
    if (scene && scene.score >= Math.max(best.score - 1, 1)) {
      return "Scenes & Storytelling";
    }
  }

  return best.category;
}

function inferTags(rules, text, fallback) {
  const tags = rules
    .filter(([, keywords]) => scoreKeywords(text, keywords) > 0)
    .map(([label]) => label);
  return cleanList(tags.length ? tags.slice(0, 4) : fallback);
}

function classifyCase(item) {
  const text = textForCase(item);
  const category = inferCategory(item, text);
  const styles = inferTags(styleRules, text, categoryFallbackStyles[category] || ["Other Use Cases"]);
  const scenes = inferTags(sceneRules, text, ["Creative"]);
  if (item.mediaType === "video" && !styles.includes("Video")) {
    styles.unshift("Video");
  }

  return {
    ...item,
    category,
    styles: cleanList(styles).slice(0, 4),
    scenes: cleanList(scenes).slice(0, 4),
  };
}

function classifyFile(fileName) {
  const filePath = join(dataDir, fileName);
  const payload = JSON.parse(readFileSync(filePath, "utf8"));
  const cases = (payload.cases || []).map(classifyCase);
  const nextPayload = {
    ...payload,
    categories: cleanList(cases.map((item) => item.category)).sort(),
    styles: cleanList(cases.flatMap((item) => item.styles)).sort(),
    scenes: cleanList(cases.flatMap((item) => item.scenes)).sort(),
    cases,
  };

  writeFileSync(filePath, `${JSON.stringify(nextPayload)}\n`, "utf8");

  const counts = cases.reduce((accumulator, item) => {
    accumulator[item.category] = (accumulator[item.category] || 0) + 1;
    return accumulator;
  }, {});

  return { fileName, total: cases.length, counts };
}

const results = readdirSync(dataDir)
  .filter((fileName) => fileName.endsWith(".json"))
  .map(classifyFile);

for (const result of results) {
  console.log(`${result.fileName}: ${result.total} cases`);
  for (const [category, count] of Object.entries(result.counts).sort()) {
    console.log(`  ${category}: ${count}`);
  }
}
