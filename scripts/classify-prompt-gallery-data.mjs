#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = root;
const dataTargets = [
  {
    name: "OpenNana",
    dataDir: join(repoRoot, "extra", "opennana-prompt-gallery", "data"),
    pattern: (fileName) => fileName.endsWith(".json"),
  },
  {
    name: "GPT-Image2",
    dataDir: join(repoRoot, "extra", "awesome-gpt-image-2", "data"),
    pattern: (fileName) => fileName === "cases.json",
  },
];

const categories = [
  "Portraits & Fashion",
  "Celebrities & Sports",
  "Characters & IP",
  "Products & E-commerce",
  "Food & Beverage",
  "Brand & Icons",
  "Social Media & Stickers",
  "Posters & Typography",
  "Infographics & Diagrams",
  "UI & App Screens",
  "Architecture & Interiors",
  "Cinematic & Storytelling",
  "Illustration & Comics",
  "Historical & Fantasy",
  "Documents & Publishing",
  "Animals & Nature",
  "Other Creative Uses",
];

const categoryRules = [
  {
    category: "UI & App Screens",
    keywords: [
      "ui",
      "ux",
      "interface",
      "dashboard",
      "app screen",
      "mobile screen",
      "website",
      "web page",
      "landing page",
      "saas",
      "figma",
      "wireframe",
      "prototype",
      "widget",
      "settings panel",
      "onboarding screen",
      "界面",
      "网页",
      "仪表盘",
      "应用界面",
      "移动端",
      "小程序",
      "落地页",
      "后台",
      "组件",
    ],
  },
  {
    category: "Infographics & Diagrams",
    keywords: [
      "infographic",
      "diagram",
      "chart",
      "graph",
      "timeline",
      "flowchart",
      "knowledge map",
      "mind map",
      "reference sheet",
      "data visualization",
      "blueprint",
      "exploded view",
      "breakdown",
      "teardown",
      "anatomy",
      "comparison table",
      "map visualization",
      "信息图",
      "图解",
      "图表",
      "流程图",
      "时间线",
      "知识图谱",
      "脑图",
      "图谱",
      "百科",
      "参考图集",
      "数据可视化",
      "蓝图",
      "爆炸图",
      "拆解图",
      "分解图",
      "结构图",
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
      "newspaper",
      "book",
      "resume",
      "presentation",
      "certificate",
      "menu design",
      "page layout",
      "文档",
      "手册",
      "报告",
      "白皮书",
      "杂志",
      "报纸",
      "书籍",
      "证书",
      "简历",
      "菜单",
      "出版物",
      "页面排版",
    ],
  },
  {
    category: "Social Media & Stickers",
    keywords: [
      "social media",
      "instagram",
      "xiaohongshu",
      "rednote",
      "wechat",
      "tweet",
      "meme",
      "sticker",
      "emoji",
      "reaction pack",
      "avatar pack",
      "carousel",
      "grid post",
      "four-panel",
      "社媒",
      "小红书",
      "朋友圈",
      "微博",
      "推文",
      "表情包",
      "贴纸",
      "头像合集",
      "九宫格",
      "四格",
      "拼图",
      "图文母版",
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
      "flyer",
      "banner",
      "editorial poster",
      "layout poster",
      "海报",
      "封面",
      "字体",
      "排版",
      "标题设计",
      "招贴",
      "宣传单",
      "横幅",
    ],
  },
  {
    category: "Brand & Icons",
    keywords: [
      "brand",
      "branding",
      "logo",
      "identity",
      "visual identity",
      "app icon",
      "icon set",
      "stamp",
      "seal design",
      "mascot logo",
      "guideline",
      "vi system",
      "品牌",
      "标志",
      "logo",
      "图标",
      "应用图标",
      "印章",
      "篆刻",
      "视觉身份",
      "视觉识别",
      "吉祥物标志",
      "品牌规范",
    ],
  },
  {
    category: "Products & E-commerce",
    keywords: [
      "product",
      "packaging",
      "e-commerce",
      "amazon",
      "commerce",
      "commercial product",
      "product photography",
      "product ad",
      "bottle",
      "cosmetic",
      "skincare",
      "perfume",
      "watch",
      "sneaker",
      "shoe",
      "bag",
      "furniture",
      "appliance",
      "smart watch",
      "商品",
      "产品",
      "包装",
      "电商",
      "详情图",
      "亚马逊",
      "商业产品",
      "产品摄影",
      "产品广告",
      "护肤",
      "美妆",
      "香水",
      "手表",
      "智能手表",
      "球鞋",
      "鞋",
      "包袋",
      "家具",
    ],
  },
  {
    category: "Food & Beverage",
    keywords: [
      "food",
      "drink",
      "coffee",
      "tea",
      "restaurant",
      "chef",
      "cooking",
      "cookbook",
      "kitchenware",
      "dessert",
      "burger",
      "pizza",
      "noodle",
      "ramen",
      "taco",
      "garlic",
      "sushi",
      "hotpot",
      "milk tea",
      "beverage",
      "美食",
      "食物",
      "饮料",
      "咖啡",
      "茶",
      "奶茶",
      "餐厅",
      "厨师",
      "主厨",
      "厨神",
      "烹饪",
      "菜谱",
      "甜品",
      "汉堡",
      "披萨",
      "拉面",
      "面条",
      "塔可",
      "大蒜",
      "火锅",
      "麻辣烫",
      "寿司",
      "鱼头",
      "酸辣鱼",
      "热狗",
      "炸鸡",
      "牛排",
    ],
  },
  {
    category: "Celebrities & Sports",
    keywords: [
      "celebrity",
      "famous",
      "elon musk",
      "athlete",
      "football",
      "soccer",
      "basketball",
      "tennis",
      "stadium",
      "jersey",
      "cristiano",
      "ronaldo",
      "messi",
      "osimhen",
      "player",
      "fan photo",
      "olympic",
      "sports portrait",
      "名人",
      "明星",
      "马斯克",
      "运动员",
      "足球",
      "篮球",
      "网球",
      "球场",
      "球衣",
      "C罗",
      "梅西",
      "奥西姆亨",
      "球迷",
      "体育",
      "冠军",
    ],
  },
  {
    category: "Portraits & Fashion",
    keywords: [
      "portrait",
      "portrait photo",
      "fashion",
      "fashion editorial",
      "model",
      "beauty",
      "makeup",
      "selfie",
      "girl",
      "woman",
      "man",
      "boy",
      "couple",
      "wedding",
      "bride",
      "bikini",
      "lingerie",
      "outfit",
      "lookbook",
      "人像",
      "写真",
      "肖像",
      "时尚",
      "大片",
      "模特",
      "美女",
      "少女",
      "女孩",
      "女性",
      "男子",
      "男士",
      "自拍",
      "穿搭",
      "妆容",
      "婚纱",
      "新娘",
      "情侣写真",
      "比基尼",
      "内衣",
    ],
  },
  {
    category: "Characters & IP",
    keywords: [
      "character",
      "character design",
      "anime",
      "manga",
      "cosplay",
      "mascot",
      "chibi",
      "ip character",
      "game character",
      "pokemon",
      "lego",
      "pixar",
      "disney",
      "doll",
      "toy",
      "action figure",
      "figurine",
      "角色",
      "角色设计",
      "动漫",
      "漫画",
      "二次元",
      "cosplay",
      "吉祥物",
      "Q版",
      "IP",
      "游戏角色",
      "宝可梦",
      "乐高",
      "皮克斯",
      "迪士尼",
      "玩偶",
      "手办",
      "公仔",
    ],
  },
  {
    category: "Historical & Fantasy",
    keywords: [
      "history",
      "historical",
      "dynasty",
      "ancient",
      "classical",
      "hanfu",
      "samurai",
      "kimono",
      "tang dynasty",
      "song dynasty",
      "mythology",
      "wuxia",
      "fantasy",
      "dragon",
      "magic",
      "immortal",
      "xianxia",
      "历史",
      "古代",
      "古风",
      "汉服",
      "和服",
      "唐朝",
      "宋朝",
      "神话",
      "武侠",
      "仙侠",
      "幻想",
      "龙",
      "魔法",
      "花神",
      "传统",
    ],
  },
  {
    category: "Cinematic & Storytelling",
    keywords: [
      "cinematic",
      "film still",
      "movie scene",
      "story",
      "scene",
      "storyboard",
      "narrative",
      "shot",
      "camera movement",
      "sequence",
      "battle",
      "adventure",
      "action scene",
      "transformation",
      "bullet time",
      "电影感",
      "电影级",
      "影视",
      "分镜",
      "剧情",
      "场景",
      "叙事",
      "故事",
      "镜头",
      "运镜",
      "战斗",
      "冒险",
      "动作场面",
      "变装",
      "子弹时间",
    ],
  },
  {
    category: "Illustration & Comics",
    keywords: [
      "illustration",
      "painting",
      "watercolor",
      "ink",
      "oil painting",
      "sketch",
      "comic",
      "cartoon",
      "vector portrait",
      "paper cut",
      "clay style",
      "3d illustration",
      "插画",
      "绘画",
      "水彩",
      "水墨",
      "油画",
      "素描",
      "漫画",
      "卡通",
      "矢量",
      "剪纸",
      "粘土风",
      "3D插画",
    ],
  },
  {
    category: "Architecture & Interiors",
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
      "hotel lobby",
      "villa",
      "staircase",
      "cafe interior",
      "建筑",
      "室内",
      "空间",
      "房间",
      "客厅",
      "卧室",
      "厨房",
      "城市",
      "街景",
      "博物馆",
      "店面",
      "酒店",
      "别墅",
      "楼梯",
      "玄关",
      "咖啡馆",
      "餐厅空间",
    ],
  },
  {
    category: "Animals & Nature",
    keywords: [
      "animal",
      "cat",
      "dog",
      "rabbit",
      "tiger",
      "bird",
      "horse",
      "fish",
      "nature",
      "forest",
      "flower",
      "plant",
      "landscape",
      "beach",
      "动物",
      "野生动物",
      "宠物",
      "猫咪",
      "小猫",
      "猫头鹰",
      "狗狗",
      "小狗",
      "兔子",
      "老虎",
      "白虎",
      "鸟群",
      "小鸟",
      "鸟类",
      "画眉鸟",
      "马匹",
      "骏马",
      "鱼群",
      "鲸",
      "巨鲸",
      "鲨鱼",
      "幼鹿",
      "自然",
      "森林",
      "花海",
      "花丛",
      "植物",
      "风景",
      "海滩",
      "雪山之巅",
    ],
  },
];

const styleRules = [
  ["Photo", ["photo", "photography", "camera", "iphone", "dslr", "film grain", "照片", "摄影", "相机", "胶片"]],
  ["Realistic", ["realistic", "photorealistic", "ultra-realistic", "真实", "写实", "超写实"]],
  ["Portrait", ["portrait", "selfie", "model", "beauty", "人像", "肖像", "写真", "自拍", "模特"]],
  ["Fashion", ["fashion", "outfit", "makeup", "lookbook", "时尚", "穿搭", "妆容", "大片"]],
  ["Product", ["product", "packaging", "e-commerce", "产品", "商品", "包装", "电商"]],
  ["Brand", ["brand", "logo", "identity", "icon", "品牌", "标志", "图标", "视觉身份"]],
  ["Poster", ["poster", "cover", "typography", "flyer", "海报", "封面", "排版", "字体"]],
  ["Infographic", ["infographic", "diagram", "chart", "blueprint", "exploded view", "信息图", "图解", "图表", "蓝图", "爆炸图", "拆解图"]],
  ["UI", ["ui", "interface", "dashboard", "website", "app screen", "界面", "网页", "仪表盘", "应用界面"]],
  ["Architecture", ["architecture", "interior", "building", "room", "建筑", "室内", "空间", "房间"]],
  ["Illustration", ["illustration", "painting", "watercolor", "comic", "插画", "绘画", "水彩", "漫画"]],
  ["Character", ["character", "anime", "manga", "toy", "角色", "动漫", "二次元", "手办", "玩偶"]],
  ["3D", ["3d", "c4d", "blender", "render", "toy", "clay", "三维", "渲染", "玩具", "粘土"]],
  ["Cinematic", ["cinematic", "film", "shot", "storyboard", "电影感", "分镜", "镜头", "运镜"]],
  ["Classical", ["history", "ancient", "dynasty", "hanfu", "wuxia", "历史", "古风", "汉服", "武侠"]],
  ["Food", ["food", "drink", "coffee", "restaurant", "美食", "食物", "饮料", "咖啡", "餐厅"]],
  ["Video", ["video", "motion", "camera movement", "视频", "动画", "运镜"]],
];

const sceneRules = [
  ["Fashion", ["fashion", "clothing", "model", "beauty", "makeup", "portrait", "时尚", "服装", "美妆", "人像"]],
  ["Sports", ["football", "soccer", "basketball", "tennis", "stadium", "运动", "足球", "篮球", "网球", "球场"]],
  ["Commerce", ["product", "brand", "ad", "campaign", "commercial", "e-commerce", "商品", "品牌", "广告", "商业", "电商"]],
  ["Tech", ["ai", "tech", "data", "saas", "dashboard", "cyberpunk", "robot", "future", "科技", "数据", "赛博", "机器人"]],
  ["Food", ["food", "drink", "coffee", "tea", "restaurant", "dessert", "食品", "美食", "饮料", "咖啡", "餐厅"]],
  ["Travel", ["city", "street", "map", "landscape", "hotel", "travel", "城市", "街头", "地图", "旅行", "景观"]],
  ["Social", ["social", "instagram", "wechat", "sticker", "meme", "社交", "小红书", "表情包", "贴纸"]],
  ["Story", ["story", "scene", "storyboard", "cinematic", "battle", "adventure", "故事", "场景", "分镜", "电影感", "战斗"]],
  ["History", ["history", "ancient", "dynasty", "classical", "mythology", "历史", "古代", "神话", "传统"]],
  ["Nature", ["animal", "cat", "dog", "forest", "flower", "landscape", "动物", "猫", "狗", "森林", "花", "自然"]],
  ["Education", ["guide", "science", "learning", "manual", "diagram", "tutorial", "科普", "学习", "教程", "手册"]],
  ["Creative", ["illustration", "poster", "art", "painting", "design", "插画", "海报", "艺术", "设计"]],
];

const categoryFallbackStyles = {
  "Portraits & Fashion": ["Portrait", "Fashion"],
  "Celebrities & Sports": ["Photo", "Sports"],
  "Characters & IP": ["Character"],
  "Products & E-commerce": ["Product"],
  "Food & Beverage": ["Food"],
  "Brand & Icons": ["Brand"],
  "Social Media & Stickers": ["Social"],
  "Posters & Typography": ["Poster"],
  "Infographics & Diagrams": ["Infographic"],
  "UI & App Screens": ["UI"],
  "Architecture & Interiors": ["Architecture"],
  "Cinematic & Storytelling": ["Cinematic"],
  "Illustration & Comics": ["Illustration"],
  "Historical & Fantasy": ["Classical"],
  "Documents & Publishing": ["Documents"],
  "Animals & Nature": ["Nature"],
  "Other Creative Uses": ["Creative"],
};

function cleanList(values) {
  return [...new Set(values.filter(Boolean))];
}

function textPartsForCase(item) {
  const title = [
    item.title,
    item.slug,
    item.imageAlt,
    item.category,
    item.mediaType,
  ]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();

  const body = [
    item.promptPreview,
    item.prompt,
    ...(item.styles || []),
    ...(item.scenes || []),
  ]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();

  return { title, body, all: `${title}\n${body}` };
}

function countKeyword(text, keyword) {
  const needle = keyword.toLowerCase();
  if (!needle) {
    return 0;
  }

  if (/^[a-z0-9]+$/.test(needle)) {
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return (text.match(new RegExp(`\\b${escaped}\\b`, "g")) || []).length;
  }

  let index = text.indexOf(needle);
  let matches = 0;
  while (index >= 0) {
    matches += 1;
    index = text.indexOf(needle, index + needle.length);
  }
  return matches;
}

function scoreKeywords(parts, keywords) {
  return keywords.reduce((score, keyword) => {
    const titleMatches = countKeyword(parts.title, keyword);
    const bodyMatches = countKeyword(parts.body, keyword);
    return score + titleMatches * 5 + bodyMatches;
  }, 0);
}

function inferCategory(item, parts) {
  const scored = categoryRules
    .map((rule, index) => ({
      category: rule.category,
      index,
      score: scoreKeywords(parts, rule.keywords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  if (!scored.length) {
    return item.mediaType === "video"
      ? "Cinematic & Storytelling"
      : "Other Creative Uses";
  }

  const top = scored[0];
  const scoreFor = (category) =>
    scored.find((entry) => entry.category === category)?.score || 0;
  const hasAny = (keywords) => keywords.some((keyword) => countKeyword(parts.all, keyword) > 0);
  const titleHasAny = (keywords) =>
    keywords.some((keyword) => countKeyword(parts.title, keyword) > 0);

  const infographicScore = scoreFor("Infographics & Diagrams");
  if (
    infographicScore >= 3 &&
    (titleHasAny([
      "信息图",
      "图解",
      "图谱",
      "百科",
      "参考图",
      "爆炸图",
      "拆解图",
      "分解图",
      "结构图",
      "blueprint",
      "exploded",
      "infographic",
      "diagram",
    ]) ||
      infographicScore >= Math.max(top.score - 3, 5))
  ) {
    return "Infographics & Diagrams";
  }

  const foodScore = scoreFor("Food & Beverage");
  if (
    foodScore >= 3 &&
    (titleHasAny([
      "美食",
      "食物",
      "餐厅",
      "厨师",
      "主厨",
      "厨神",
      "烹饪",
      "菜谱",
      "咖啡",
      "奶茶",
      "甜点",
      "甜品",
      "汉堡",
      "披萨",
      "拉面",
      "寿司",
      "塔可",
      "热狗",
      "炸鸡",
      "牛排",
      "鱼头",
      "酸辣鱼",
      "taco",
      "chef",
      "cooking",
      "restaurant",
    ]) ||
      foodScore >= Math.max(top.score - 2, 5))
  ) {
    return "Food & Beverage";
  }

  if (
    top.category === "Animals & Nature" &&
    !hasAny([
      "animal",
      "cat",
      "dog",
      "rabbit",
      "tiger",
      "bird",
      "horse",
      "fish",
      "whale",
      "shark",
      "pet",
      "wildlife",
      "nature",
      "forest",
      "landscape",
      "动物",
      "宠物",
      "野生动物",
      "猫咪",
      "小猫",
      "猫头鹰",
      "狗狗",
      "小狗",
      "兔子",
      "老虎",
      "白虎",
      "鸟群",
      "小鸟",
      "鸟类",
      "画眉鸟",
      "鲸",
      "巨鲸",
      "鲨鱼",
      "幼鹿",
      "森林",
      "花海",
      "花丛",
      "植物",
      "风景",
      "海滩",
      "雪山之巅",
    ])
  ) {
    const next = scored.find((entry) => entry.category !== "Animals & Nature");
    return next?.category || "Other Creative Uses";
  }

  if (item.mediaType === "video") {
    const cinematic = scored.find((entry) => entry.category === "Cinematic & Storytelling");
    if (cinematic && cinematic.score >= Math.max(top.score - 2, 2)) {
      return cinematic.category;
    }
  }

  return top.category;
}

function inferTags(rules, parts, fallback) {
  const tags = rules
    .map(([label, keywords]) => ({
      label,
      score: scoreKeywords(parts, keywords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.label);
  return cleanList(tags.length ? tags.slice(0, 5) : fallback);
}

function classifyCase(item) {
  const parts = textPartsForCase(item);
  const category = inferCategory(item, parts);
  const styles = inferTags(
    styleRules,
    parts,
    categoryFallbackStyles[category] || ["Creative"]
  );
  const scenes = inferTags(sceneRules, parts, ["Creative"]);

  if (item.mediaType === "video" && !styles.includes("Video")) {
    styles.unshift("Video");
  }

  return {
    ...item,
    category,
    styles: cleanList(styles).slice(0, 5),
    scenes: cleanList(scenes).slice(0, 5),
  };
}

function classifyFile(dataDir, fileName) {
  const filePath = join(dataDir, fileName);
  const payload = JSON.parse(readFileSync(filePath, "utf8"));
  const cases = (payload.cases || []).map(classifyCase);
  const nextPayload = {
    ...payload,
    categories: categories.filter((category) =>
      cases.some((item) => item.category === category)
    ),
    styles: cleanList(cases.flatMap((item) => item.styles)).sort(),
    scenes: cleanList(cases.flatMap((item) => item.scenes)).sort(),
    cases,
  };

  const indentation = fileName === "cases.json" ? 2 : 0;
  writeFileSync(filePath, `${JSON.stringify(nextPayload, null, indentation)}\n`, "utf8");

  const counts = cases.reduce((accumulator, item) => {
    accumulator[item.category] = (accumulator[item.category] || 0) + 1;
    return accumulator;
  }, {});

  return { fileName, total: cases.length, counts };
}

for (const target of dataTargets) {
  const dataDir = resolve(target.dataDir);
  const results = readdirSync(dataDir)
    .filter(target.pattern)
    .map((fileName) => classifyFile(dataDir, fileName));

  console.log(`\n${target.name}`);
  for (const result of results) {
    console.log(`${result.fileName}: ${result.total} cases`);
    for (const category of categories) {
      if (result.counts[category]) {
        console.log(`  ${category}: ${result.counts[category]}`);
      }
    }
  }
}
