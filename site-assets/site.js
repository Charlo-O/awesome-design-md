(function () {
  const rawDesigns = window.DESIGNS || [];
  const hotkeysAgents = window.HOTKEYS_AGENTS || [];
  const hotkeysSummaryZh = window.HOTKEYS_SUMMARY_ZH || {};
  const skillTagLabels = {
    zh: {
      Design: "设计",
      Dev: "开发",
      Motion: "动效",
      Accessibility: "无障碍",
      Marketing: "营销",
      Video: "视频",
    },
    en: {
      Design: "Design",
      Dev: "Dev",
      Motion: "Motion",
      Accessibility: "Accessibility",
      Marketing: "Marketing",
      Video: "Video",
    },
  };
  const skillPaletteByTag = {
    Design: ["#02182c", "#ef0d45", "#ffd7e2", "#fff7fa", "#f4f8fc"],
    Dev: ["#02182c", "#2563eb", "#dbeafe", "#eff6ff", "#f4f8fc"],
    Motion: ["#02182c", "#0891b2", "#cffafe", "#ecfeff", "#f4f8fc"],
    Accessibility: ["#02182c", "#059669", "#dcfce7", "#ecfdf5", "#f4f8fc"],
    Marketing: ["#02182c", "#e11d48", "#ffe4e6", "#fff1f2", "#f4f8fc"],
    Video: ["#02182c", "#d97706", "#fef3c7", "#fffbeb", "#f4f8fc"],
  };
  const imagineCasesUrl = "extra/awesome-gpt-image-2/data/cases.json";
  const imagineCasesTotal = 441;
  const imagineImageBase = "extra/awesome-gpt-image-2/data";
  const imagineRepoUrl = "https://github.com/freestylefly/awesome-gpt-image-2";
  let imagineEntries = [];
  let imagineCategoryKeys = [];
  const imagineCategoryLabelsZh = {
    "Architecture & Spaces": "建筑与空间",
    "Brand & Logos": "品牌与标志",
    "Characters & People": "人物与角色",
    "Charts & Infographics": "图表与信息可视化",
    "Documents & Publishing": "文档与出版物",
    "History & Classical Themes": "历史与古风题材",
    "Illustration & Art": "插画与艺术",
    "Other Use Cases": "其他应用场景",
    "Photography & Realism": "摄影与写实",
    "Posters & Typography": "海报与排版",
    "Products & E-commerce": "商品与电商",
    "Scenes & Storytelling": "场景与叙事",
    "UI & Interfaces": "UI 与界面",
  };
  Object.assign(imagineCategoryLabelsZh, {
    "Portraits & Fashion": "人像与时尚",
    "Celebrities & Sports": "名人与运动",
    "Characters & IP": "角色与 IP",
    "Food & Beverage": "美食与饮品",
    "Brand & Icons": "品牌与图标",
    "Social Media & Stickers": "社媒与表情包",
    "Infographics & Diagrams": "信息图与图解",
    "UI & App Screens": "UI 与应用界面",
    "Architecture & Interiors": "建筑与室内",
    "Cinematic & Storytelling": "影视与叙事",
    "Illustration & Comics": "插画与漫画",
    "Historical & Fantasy": "历史与幻想",
    "Animals & Nature": "动物与自然",
    "Other Creative Uses": "其他创意用途",
  });
  const promptFineCategoryKeys = [
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
  const imagineCategoryPalette = [
    { bg: "#edf1f8", text: "#284b7b", border: "#c9d4e8" },
    { bg: "#f8ebef", text: "#7f3551", border: "#e6c7d3" },
    { bg: "#fdf2e7", text: "#8a5514", border: "#edd3b0" },
    { bg: "#e8f4ee", text: "#1a5a3e", border: "#c7ddcf" },
    { bg: "#f4efe8", text: "#5a534a", border: "#ddd1c2" },
    { bg: "#fff0e5", text: "#8a4d19", border: "#f0cfb3" },
    { bg: "#efe9fb", text: "#4a2f76", border: "#d2c3f0" },
    { bg: "#f7f2eb", text: "#6d655d", border: "#d8cbbb" },
    { bg: "#e9f1ff", text: "#2d4f85", border: "#c9d6ef" },
    { bg: "#fff4dc", text: "#77570c", border: "#ead29a" },
    { bg: "#edf9f2", text: "#21603d", border: "#c8e4d2" },
    { bg: "#f8eef9", text: "#6a3571", border: "#e4c7e7" },
    { bg: "#edf5eb", text: "#315d2d", border: "#cfe0ca" },
  ];
  const openNanaDataBase = "extra/opennana-prompt-gallery/data";
  const openNanaRemoteAssetBaseUrls = {
    "nano-banana-2":
      "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-nano-banana/main",
    "nano-banana-pro":
      "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-nano-banana/main",
    chatgpt: "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-chatgpt/main",
    grok: "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-grok/main",
    "seedance-2.0":
      "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-seedance-2-images/main",
  };
  const seedanceVideoAssetBaseUrls = [
    "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-seedance-2-video-1/main",
    "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-seedance-2-video-2/main",
    "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-seedance-2-video-3/main",
    "https://raw.githubusercontent.com/Charlo-O/awesome-design-assets-seedance-2-video-4/main",
  ];
  const promptModeSources = [
    {
      key: "nano-banana",
      label: "Nano Banana",
      resourceType: "image-prompt-template",
      url: `${openNanaDataBase}/nano-banana.json`,
      metaUrl: `${openNanaDataBase}/nano-banana/meta.json`,
      pageBaseUrl: `${openNanaDataBase}/nano-banana/pages`,
      total: 5999,
      categories: promptFineCategoryKeys,
    },
    {
      key: "chatgpt",
      label: "ChatGPT",
      resourceType: "image-prompt-template",
      url: `${openNanaDataBase}/chatgpt.json`,
      metaUrl: `${openNanaDataBase}/chatgpt/meta.json`,
      pageBaseUrl: `${openNanaDataBase}/chatgpt/pages`,
      total: 1300,
      categories: promptFineCategoryKeys,
    },
    {
      key: "grok",
      label: "Grok",
      resourceType: "image-prompt-template",
      url: `${openNanaDataBase}/grok.json`,
      metaUrl: `${openNanaDataBase}/grok/meta.json`,
      pageBaseUrl: `${openNanaDataBase}/grok/pages`,
      total: 54,
      categories: promptFineCategoryKeys,
    },
    {
      key: "seedance-2.0",
      label: "Seedance 2.0",
      resourceType: "prompt-template",
      url: `${openNanaDataBase}/seedance-2.0.json`,
      metaUrl: `${openNanaDataBase}/seedance-2.0/meta.json`,
      pageBaseUrl: `${openNanaDataBase}/seedance-2.0/pages`,
      total: 609,
      categories: promptFineCategoryKeys,
    },
  ];
  const promptModeMap = new Map(
    promptModeSources.map((source) => [source.key, source])
  );
  const promptModeEntries = new Map();
  const promptModeMeta = new Map();
  const promptModeCategoryKeys = new Map(
    promptModeSources.map((source) => [source.key, source.categories])
  );
  const promptModeLoadedPages = new Map();
  const promptModeLoading = new Set();
  const promptCategoryLabelsZh = {
    Image: "图片",
    Video: "视频",
  };
  const promptCategoryPalette = [
    { bg: "#edf7f6", text: "#1e5f5a", border: "#c5dfdc" },
    { bg: "#f3edfb", text: "#573186", border: "#d8c5ef" },
  ];

  function buildSkillMonogram(name) {
    const tokens = String(name || "")
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (tokens.length === 0) {
      return "SK";
    }
    if (tokens.length === 1) {
      return tokens[0].slice(0, 2).toUpperCase();
    }
    return `${tokens[0][0]}${tokens[1][0]}`.toUpperCase();
  }

  function inferSurfaceFromText(...parts) {
    const text = parts.filter(Boolean).join(" ").toLowerCase();
    if (/deck|ppt|slide|presentation/.test(text)) return "deck";
    if (/mobile|iphone|android|onboarding/.test(text)) return "mobile";
    if (/dashboard|analytics|report|data/.test(text)) return "dashboard";
    if (/image|poster|avatar|infographic|photo/.test(text)) return "image";
    if (/video|motion|hyperframes|clip/.test(text)) return "video";
    if (/audio|music|speech|voice|jingle/.test(text)) return "audio";
    if (/doc|pdf|resume|invoice|notes|brief|spec/.test(text)) return "document";
    if (/workflow|scenario|migration|export|pipeline/.test(text)) return "workflow";
    return "web";
  }

  function buildHotkeysSkills(items) {
    return items.map((item, index) => {
      const tags = Array.isArray(item.tags) ? item.tags : [];
      const primaryTag = tags[0] || "Design";
      const colors = skillPaletteByTag[primaryTag] || [
        "#02182c",
        "#475569",
        "#e2e8f0",
        "#f8fafc",
        "#f1f5f9",
      ];

      return {
        id: rawDesigns.length + index + 1,
        slug: `skill-${item.id}`,
        name: item.name,
        monogram: buildSkillMonogram(item.name),
        entryType: "skill",
        resourceType: "agent-skill",
        surface: inferSurfaceFromText(item.name, item.description, tags.join(" ")),
        scenario: primaryTag,
        sourceKind: "hotkeys-skill",
        categoryKey: "skill",
        categoryLabelZh: "技能",
        categoryLabelEn: "Skill Library",
        summary: item.description,
        summaryZh: hotkeysSummaryZh[item.id] || "",
        overview: [item.description],
        keyCharacteristics: [],
        colors,
        fonts: {
          serif: null,
          sans: "Geist, Inter, system-ui, sans-serif",
          mono: "JetBrains Mono, SFMono-Regular, Menlo, monospace",
        },
        sourceSite: {
          name: item.author,
          url: item.sourceUrl,
        },
        files: {
          readme: null,
          design: null,
          preview: null,
          previewDark: null,
        },
        stats: {
          previewCount: 0,
          colorCount: colors.length,
        },
        searchTerms: [
          ...(tags || []),
          ...tags.map((tag) => skillTagLabels.zh[tag] || tag),
          item.author,
          item.description,
          hotkeysSummaryZh[item.id] || "",
          item.npxCommand || "",
          "hotkeys.design",
          "skill",
          "技能",
        ].filter(Boolean),
        skillCommand: item.npxCommand || null,
        skillTags: tags,
        skillTagsZh: tags.map((tag) => skillTagLabels.zh[tag] || tag),
        skillAuthor: item.author,
        skillAuthorUrl: item.authorUrl || null,
        skillLibraryUrl: "https://hotkeys.design/",
        featured: Boolean(item.featured),
        createdAt: item.createdAt || null,
      };
    });
  }

  function normalizeImagineImagePath(path) {
    const value = String(path || "").replace(/^\/+/, "");
    if (value.startsWith("images/")) {
      return `${imagineImageBase}/${value}`;
    }

    return value || `${imagineImageBase}/images/category-covers/gallery.jpg`;
  }

  function isPromptMode(mode) {
    return promptModeMap.has(mode);
  }

  function isPromptResourceMode(mode) {
    return mode === "prompt-template" || mode === "image-prompt-template" || isPromptMode(mode);
  }

  function normalizePromptAssetPath(path) {
    const value = String(path || "").replace(/^\/+/, "");
    if (value.startsWith("assets/")) {
      const [, assetBucket, ...assetPathParts] = value.split("/");
      const seedanceVideoIndex =
        assetBucket === "seedance-2.0" && /\.(mp4|mov|webm)$/i.test(value)
          ? (parseInt(assetPathParts[0], 10) || 0) % seedanceVideoAssetBaseUrls.length
          : -1;
      const remoteBase =
        seedanceVideoIndex >= 0
          ? seedanceVideoAssetBaseUrls[seedanceVideoIndex]
          : openNanaRemoteAssetBaseUrls[assetBucket];
      if (remoteBase && assetPathParts.length) {
        return `${remoteBase.replace(/\/$/, "")}/${[assetBucket, ...assetPathParts].join("/")}`;
      }

      return `${openNanaDataBase}/${value}`;
    }

    return value;
  }

  function getPromptModeLabel(mode) {
    return promptModeMap.get(mode)?.label || "OpenNana";
  }

  function getSourceFilterLabel(key) {
    if (key === "awesome-gpt-image-2") {
      return "GPT-Image2";
    }

    return promptModeMap.get(key)?.label || key;
  }

  function promptPageUrl(source, page) {
    return `${source.pageBaseUrl}/page-${String(page).padStart(3, "0")}.json`;
  }

  function getMediaTypeLabel(mediaType) {
    const isVideo = mediaType === "video";
    if (getLanguage() === "zh") {
      return isVideo ? "视频" : "图片";
    }

    return isVideo ? "Video" : "Image";
  }

  function buildImagineMonogram(category) {
    const compact = String(category || "Imagine")
      .split(/[\s&]+/)
      .filter(Boolean)
      .map((token) => token[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return compact || "I2";
  }

  function buildImagineEntries(siteData) {
    imagineCategoryKeys = Array.isArray(siteData?.categories)
      ? siteData.categories
      : [];

    return (siteData?.cases || []).map((item) => {
      const title = item.title || `Case ${item.id}`;
      const promptPreview = item.promptPreview || item.prompt || "";
      const image = normalizeImagineImagePath(item.image);

      return {
        id: item.id,
        slug: `imagine-${item.id}`,
        name: title,
        monogram: buildImagineMonogram(item.category),
        entryType: "imagine",
        resourceType: "image-prompt-template",
        surface: "image",
        scenario: item.category || "image",
        sourceKind: "awesome-gpt-image-2",
        categoryKey: item.category || "Other Use Cases",
        summary: promptPreview,
        overview: [promptPreview, item.prompt || ""].filter(Boolean),
        keyCharacteristics: [
          ...(item.styles || []).map((style) => `Style: ${style}`),
          ...(item.scenes || []).map((scene) => `Scene: ${scene}`),
        ],
        colors: ["#171411", "#d2c4b1", "#f7f2eb", "#1d5b48"],
        files: {
          image,
        },
        stats: {
          previewCount: item.prompt ? 1 : 0,
        },
        sourceSite: {
          name: item.sourceLabel || "GPT-Image2",
          url: item.sourceUrl || item.githubUrl || siteData.repository || imagineRepoUrl,
        },
        searchTerms: [
          title,
          item.imageAlt,
          item.category,
          ...(item.styles || []),
          ...(item.scenes || []),
          item.sourceLabel,
          item.promptPreview,
          item.prompt,
          "GPT-Image2",
          "Imagine 2",
        ].filter(Boolean),
        imagine: {
          image,
          imageAlt: item.imageAlt || title,
          prompt: item.prompt || "",
          promptPreview,
          styles: item.styles || [],
          scenes: item.scenes || [],
          githubUrl: item.githubUrl || siteData.repository || imagineRepoUrl,
          repository: siteData.repository || imagineRepoUrl,
        },
      };
    });
  }

  function buildPromptEntries(siteData, source) {
    const categories = Array.isArray(siteData?.categories)
      ? siteData.categories
      : source.categories || [];
    promptModeCategoryKeys.set(source.key, categories);

    return (siteData?.cases || []).map((item, index) => {
      const title = item.title || `${source.label} Case ${item.sourceId || item.id}`;
      const promptPreview = item.promptPreview || item.prompt || "";
      const image = normalizePromptAssetPath(item.image);
      const media = (item.media || [])
        .map((mediaItem) => ({
          ...mediaItem,
          path: normalizePromptAssetPath(mediaItem.path),
        }))
        .filter((mediaItem) => mediaItem.path);
      const fullImage =
        media.find((mediaItem) => mediaItem.kind === "image")?.path || image;
      const video =
        normalizePromptAssetPath(item.video) ||
        media.find((mediaItem) => mediaItem.type === "video")?.path ||
        "";
      const mediaType = item.mediaType === "video" || video ? "video" : "image";
      const sourceUrl =
        item.sourceUrl ||
        item.githubUrl ||
        siteData.repository ||
        source.repository ||
        promptModeMap.get(source.key)?.url;

      return {
        id: item.sourceId || item.id || index + 1,
        slug: `prompt-${source.key}-${item.sourceId || item.id || item.slug || index}`,
        name: title,
        monogram: buildImagineMonogram(item.category || source.label),
        entryType: "imagine",
        resourceType:
          source.resourceType ||
          (mediaType === "image" ? "image-prompt-template" : "prompt-template"),
        surface: mediaType,
        scenario: item.category || mediaType,
        sourceKind: source.key,
        categoryKey: item.category || (mediaType === "video" ? "Video" : "Image"),
        summary: promptPreview,
        overview: [promptPreview, item.prompt || ""].filter(Boolean),
        keyCharacteristics: [
          ...(item.styles || []).map((style) => `Style: ${style}`),
          ...(item.scenes || []).map((scene) => `Scene: ${scene}`),
        ],
        colors: mediaType === "video"
          ? ["#191426", "#7c4fd6", "#f3edfb", "#282033"]
          : ["#102826", "#39a7a0", "#edf7f6", "#f7fbfa"],
        files: {
          image,
          video,
        },
        stats: {
          previewCount: item.prompt ? 1 : 0,
        },
        sourceSite: {
          name: item.sourceLabel || source.label || "OpenNana",
          url: sourceUrl,
        },
        searchTerms: [
          title,
          item.imageAlt,
          item.category,
          item.mediaType,
          source.label,
          ...(item.styles || []),
          ...(item.scenes || []),
          item.sourceLabel,
          item.promptPreview,
          item.prompt,
          "OpenNana",
          "prompt gallery",
        ].filter(Boolean),
        imagine: {
          image,
          fullImage,
          video,
          media,
          mediaType,
          imageAlt: item.imageAlt || title,
          prompt: item.prompt || "",
          promptPreview,
          styles: item.styles || [],
          scenes: item.scenes || [],
          githubUrl: item.githubUrl || sourceUrl,
          repository: siteData.repository || source.repository || sourceUrl,
          model: source.label,
        },
      };
    });
  }

  const designs = [...rawDesigns, ...buildHotkeysSkills(hotkeysAgents)];
  const computedSiteMeta = {
    totalDesigns: designs.length,
    totalPreviews: designs.reduce((sum, design) => sum + (design.stats?.previewCount || 0), 0),
    totalCategories: new Set(designs.map((design) => design.categoryKey)).size,
  };
  const siteMeta = {
    ...(window.SITE_META || {}),
    ...computedSiteMeta,
  };
  const zhTranslations = window.ZH_TRANSLATIONS || {};
  const favoritesKey = "adm_index_favorites_v1";
  const previewModeKey = "adm_index_preview_mode_v1";
  const languageKey = "adm_index_lang_v1";

  const copy = {
    zh: {
      htmlLang: "zh-CN",
      homeDocumentTitle: "Awesome DESIGN.md 索引站",
      homeMetaDescription:
        "从品牌风格、预览页和设计文档。点击任意框架查看详细UI风格。",
      detailDocumentTitle: (name) => `${name} · Awesome DESIGN.md 索引站`,
      detailMetaDescription: (name) =>
        `${name} 的本地风格详情页，包含设计摘要、调色板、本地预览与文件入口。`,
      homeHeroLabel: "本地设计图谱",
      homeHeroTitle: (count) =>
        `<span class="hero-count-inline">${count}</span> 个<br><em>UI设计模板</em>`,
      homeHeroDesc:
        "从品牌风格、预览页和设计文档。点击任意框架查看详细UI风格。",
      homeHeroLabelSkill: "Hotkeys 技能库",
      homeHeroTitleSkill: (count) =>
        `<span class="hero-count-inline">${count}</span> 个<br><em>Skill 命令索引</em>`,
      homeHeroDescSkill:
        "从 hotkeys.design 收录的技能与命令中浏览。点击任意条目查看安装命令、标签与来源链接。",
      homeHeroLabelImagine: "image-2",
      homeHeroTitleImagine: (count) =>
        `<span class="hero-count-inline">${count}</span> 个<br><em>image-2</em>`,
      homeHeroDescImagine:
        "从 awesome-gpt-image-2 收录的案例图片与 Prompt 中浏览。按实际画面与提示词内容筛选，点击条目查看图片、提示词和来源。",
      statDesigns: "风格条目",
      statPreviews: "预览页面",
      statCategories: "分组类型",
      statDesignsSkill: "技能条目",
      statPreviewsSkill: "命令数量",
      statCategoriesSkill: "标签类型",
      statDesignsImagine: "image-2",
      statPreviewsImagine: "Prompt 数量",
      statCategoriesImagine: "内容标签",
      searchPlaceholder: "搜索",
      modeSwitcherLabel: "内容类型",
      modeUi: "UI 设计",
      modeSkill: "Skill",
      modeImagine: "image-2",
      modeSkillNote: "skill",
      modeSwitchTo: "切换为",
      modeCurrentOnly: "只显示当前分类",
      favoritesSection: "★ 我的常看",
      filterAll: (count) => `全部 (${count})`,
      filterFavorites: (count) => `收藏 (${count})`,
      resultsCount: (visible, total) => `${visible} / ${total}`,
      emptyTitle: "没有找到匹配的风格",
      emptyBody: "试试其他关键词，或者取消“只看收藏”筛选。",
      addFavoriteAria: "收藏",
      removeFavoriteAria: "取消收藏",
      modalFavoriteOn: "★ 已收藏",
      modalFavoriteOff: "☆ 收藏",
      close: "关闭",
      detailPage: "详情页",
      copyCommand: "复制命令",
      copiedCommand: "已复制",
      copyPrompt: "复制 Prompt",
      imagePreview: "案例图片",
      promptSection: "Prompt",
      imageSource: "图片来源",
      githubSource: "GitHub 案例",
      lightPreview: "浅色预览",
      darkPreview: "深色预览",
      summarySection: "风格摘要",
      traitsSection: "关键特征",
      sourceSite: "来源站点",
      palette: "调色板",
      fileAccess: "文件入口",
      homeFooterNote:
        '基于本地 <code>design-md/*</code>、<code>extra/uiuxskillProMax</code>、<code>hotkeys.design</code>、<code>awesome-gpt-image-2</code> 与 <code>Open Design</code> 数据构建的索引站。',
      detailBack: "← 返回索引站",
      detailKicker: "设计详情",
      originalSite: "原站",
      authorLink: "作者主页",
      skillLibraryLabel: "Hotkeys 技能库",
      skillAuthorLabel: "作者",
      skillTagsLabel: "技能标签",
      skillSourceLabel: "来源链接",
      skillCommandLabel: "安装命令",
      skillFeatured: "Hotkeys 热门收录",
      commandEyebrow: "快速安装",
      commandTitle: "安装命令",
      commandHint:
        "这类条目不提供本地预览，可直接复制安装命令或跳转到来源页。",
      commandUnavailable: "当前条目没有可复制的安装命令。",
      skillDetailMetaDescription: (name) =>
        `${name} 的技能详情页，包含安装命令、来源链接与标签信息。`,
      previousLink: (name) => `← ${name}`,
      nextLink: (name) => `${name} →`,
      styleSnapshot: "风格快照",
      previewSection: "本地预览",
      relatedSection: "同组延伸",
      paletteEyebrow: "调色",
      paletteTitle: "颜色线索",
      typographyEyebrow: "字体",
      typographyTitle: "字体栈",
      serif: "衬线",
      sans: "无衬线",
      mono: "等宽",
      notDeclared: "未声明",
      filesEyebrow: "本地文件",
      filesTitle: "文件入口",
      metadataEyebrow: "元数据",
      metadataTitle: "补充信息",
      metadataCategory: "风格分组",
      metadataPreviewCount: "预览数量",
      metadataSourceDomain: "来源域名",
      readmeLabel: "README",
      designLabel: "DESIGN.md",
      fileLightShort: "浅色",
      fileDarkShort: "深色",
      detailNotFoundTitle: "没有找到这个风格条目",
      detailNotFoundBody:
        "请从索引站重新进入，或检查地址栏里的 slug 参数。",
      detailFooterNote:
        "当前本地风格条目的详情页。",
      skillDetailFooterNote:
        "当前技能条目的详情页。",
      favoritesCount: (count) => `${count} 个`,
      prevItem: "上一项",
      nextItem: "下一项",
      langZh: "ZH",
      langEn: "EN",
      langSwitcherLabel: "语言",
    },
    en: {
      htmlLang: "en",
      homeDocumentTitle: "Awesome DESIGN.md Index",
      homeMetaDescription:
        "Browse brand styles, preview pages, and design documents. Open any item to inspect the detailed UI style.",
      detailDocumentTitle: (name) => `${name} · Awesome DESIGN.md Index`,
      detailMetaDescription: (name) =>
        `Local detail page for ${name}, with summaries, palettes, local previews, and file links.`,
      homeHeroLabel: "Local Design Atlas",
      homeHeroTitle: (count) =>
        `<span class="hero-count-inline">${count}</span><br><em>UI Design Templates</em>`,
      homeHeroDesc:
        "Browse brand styles, preview pages, and design documents. Open any item to inspect the detailed UI style.",
      homeHeroLabelSkill: "Hotkeys Skill Library",
      homeHeroTitleSkill: (count) =>
        `<span class="hero-count-inline">${count}</span><br><em>Skill Command Index</em>`,
      homeHeroDescSkill:
        "Browse skills and install commands collected from hotkeys.design. Open any item to inspect commands, tags, and source links.",
      homeHeroLabelImagine: "image-2",
      homeHeroTitleImagine: (count) =>
        `<span class="hero-count-inline">${count}</span><br><em>image-2</em>`,
      homeHeroDescImagine:
        "Browse local images and reusable prompts from awesome-gpt-image-2. Filter by the actual image and prompt content, then open an item for its image, prompt, and source.",
      statDesigns: "Design Entries",
      statPreviews: "Preview Pages",
      statCategories: "Categories",
      statDesignsSkill: "Skill Entries",
      statPreviewsSkill: "Commands",
      statCategoriesSkill: "Tag Types",
      statDesignsImagine: "image-2",
      statPreviewsImagine: "Prompts",
      statCategoriesImagine: "Content Labels",
      searchPlaceholder: "Search",
      modeSwitcherLabel: "Content Type",
      modeUi: "UI",
      modeSkill: "Skills",
      modeImagine: "image-2",
      modeSkillNote: "skill",
      modeSwitchTo: "Switch to",
      modeCurrentOnly: "Only show current category",
      favoritesSection: "★ Saved Picks",
      filterAll: (count) => `All (${count})`,
      filterFavorites: (count) => `Saved Only (${count})`,
      resultsCount: (visible, total) => `${visible} / ${total}`,
      emptyTitle: "No matching styles found",
      emptyBody: "Try a different keyword or turn off the saved-only filter.",
      addFavoriteAria: "Save",
      removeFavoriteAria: "Remove from saved",
      modalFavoriteOn: "★ Saved",
      modalFavoriteOff: "☆ Save",
      close: "Close",
      detailPage: "Detail Page",
      copyCommand: "Copy Command",
      copiedCommand: "Copied",
      copyPrompt: "Copy Prompt",
      imagePreview: "Case Image",
      promptSection: "Prompt",
      imageSource: "Image Source",
      githubSource: "GitHub Case",
      lightPreview: "Light Preview",
      darkPreview: "Dark Preview",
      summarySection: "Style Summary",
      traitsSection: "Key Characteristics",
      sourceSite: "Source Site",
      palette: "Palette",
      fileAccess: "File Access",
      homeFooterNote:
        'Built from local <code>design-md/*</code>, <code>extra/uiuxskillProMax</code>, <code>hotkeys.design</code>, <code>awesome-gpt-image-2</code>, and <code>Open Design</code> data.',
      detailBack: "← Back to Index",
      detailKicker: "Design Detail",
      originalSite: "Original Site",
      authorLink: "Author Page",
      skillLibraryLabel: "Hotkeys Library",
      skillAuthorLabel: "Author",
      skillTagsLabel: "Tags",
      skillSourceLabel: "Source Link",
      skillCommandLabel: "Install Command",
      skillFeatured: "Featured on Hotkeys",
      commandEyebrow: "Quick Install",
      commandTitle: "Install Command",
      commandHint:
        "This entry does not include a local preview. Copy the install command or jump to the source page instead.",
      commandUnavailable: "No install command is available for this entry.",
      skillDetailMetaDescription: (name) =>
        `Skill detail page for ${name}, with install command, source links, and tags.`,
      previousLink: (name) => `← ${name}`,
      nextLink: (name) => `${name} →`,
      styleSnapshot: "Style Snapshot",
      previewSection: "Local Preview",
      relatedSection: "More in This Category",
      paletteEyebrow: "Palette",
      paletteTitle: "Color Clues",
      typographyEyebrow: "Typography",
      typographyTitle: "Font Stacks",
      serif: "Serif",
      sans: "Sans",
      mono: "Mono",
      notDeclared: "Not declared",
      filesEyebrow: "Local Files",
      filesTitle: "File Access",
      metadataEyebrow: "Metadata",
      metadataTitle: "Additional Info",
      metadataCategory: "Category",
      metadataPreviewCount: "Preview Count",
      metadataSourceDomain: "Source Domain",
      readmeLabel: "README",
      designLabel: "DESIGN.md",
      fileLightShort: "Light",
      fileDarkShort: "Dark",
      detailNotFoundTitle: "This style entry could not be found",
      detailNotFoundBody:
        "Open it again from the index, or check the slug parameter in the URL.",
      detailFooterNote:
        "Local detail page for the current style entry.",
      skillDetailFooterNote:
        "Detail page for the current skill entry.",
      favoritesCount: (count) => `${count} saved`,
      prevItem: "Previous item",
      nextItem: "Next item",
      langZh: "ZH",
      langEn: "EN",
      langSwitcherLabel: "Language",
    },
  };

  const categoryMeta = {
    ai: {
      labelZh: "AI",
      labelEn: "AI & Machine Learning",
      bg: "#e8f4ee",
      text: "#1a5a3e",
      border: "#c7ddcf",
    },
    dev: {
      labelZh: "开发工具",
      labelEn: "Developer Tools & Platforms",
      bg: "#efe9fb",
      text: "#4a2f76",
      border: "#d2c3f0",
    },
    infra: {
      labelZh: "基建与云",
      labelEn: "Infrastructure & Cloud",
      bg: "#edf1f8",
      text: "#284b7b",
      border: "#c9d4e8",
    },
    design: {
      labelZh: "设计生产",
      labelEn: "Design & Productivity",
      bg: "#fdf2e7",
      text: "#8a5514",
      border: "#edd3b0",
    },
    finance: {
      labelZh: "金融加密",
      labelEn: "Fintech & Crypto",
      bg: "#edf9f2",
      text: "#21603d",
      border: "#c8e4d2",
    },
    enterprise: {
      labelZh: "企业消费",
      labelEn: "Enterprise & Consumer",
      bg: "#f8ebef",
      text: "#7f3551",
      border: "#e6c7d3",
    },
    styleGeneral: {
      labelZh: "通用",
      labelEn: "General Style Templates",
      bg: "#edf5eb",
      text: "#315d2d",
      border: "#cfe0ca",
    },
    styleLanding: {
      labelZh: "落地页",
      labelEn: "Landing Page Templates",
      bg: "#fff0e5",
      text: "#8a4d19",
      border: "#f0cfb3",
    },
    styleAnalytics: {
      labelZh: "分析仪表",
      labelEn: "Analytics Dashboard Templates",
      bg: "#e9f1ff",
      text: "#2d4f85",
      border: "#c9d6ef",
    },
    skill: {
      labelZh: "技能",
      labelEn: "Skill Library",
      bg: "#f6eefc",
      text: "#66319a",
      border: "#dec8f4",
    },
  };
  const resourceTypeMeta = {
    "design-system": {
      labelZh: "设计系统",
      labelEn: "Design Systems",
      heroLabelZh: "DESIGN.md 设计图谱",
      heroLabelEn: "DESIGN.md Atlas",
      heroTitleZh: "设计系统",
      heroTitleEn: "Design Systems",
      descZh: "品牌级 DESIGN.md、调色板和预览页，用于捕捉产品的视觉语言。",
      descEn:
        "Brand-grade DESIGN.md entries with palettes and previews for capturing a product's visual language.",
      statLabelZh: "系统条目",
      statLabelEn: "Systems",
    },
    "style-template": {
      labelZh: "UI 风格",
      labelEn: "UI Styles",
      heroLabelZh: "UI/UX Pro Max",
      heroLabelEn: "UI/UX Pro Max",
      heroTitleZh: "UI 风格",
      heroTitleEn: "UI Styles",
      descZh: "通用、落地页和仪表板风格模板，用于快速决定界面视觉方向。",
      descEn:
        "General, landing-page, and analytics dashboard style templates for picking a clear interface direction.",
      statLabelZh: "风格模板",
      statLabelEn: "Styles",
    },
    "artifact-template": {
      labelZh: "产物模板",
      labelEn: "Artifact Templates",
      heroLabelZh: "Open Design 模板库",
      heroLabelEn: "Open Design Templates",
      heroTitleZh: "产物模板",
      heroTitleEn: "Artifact Templates",
      descZh: "Web、Deck、Mobile、报告等可直接生成产物的模板化 Skill。",
      descEn:
        "Template-shaped skills for web pages, decks, mobile screens, reports, posters, and other finished artifacts.",
      statLabelZh: "模板条目",
      statLabelEn: "Templates",
    },
    "prompt-template": {
      labelZh: "Prompt 模板",
      labelEn: "Prompt Templates",
      heroLabelZh: "Prompt 模板库",
      heroLabelEn: "Prompt Gallery",
      heroTitleZh: "Prompt 模板",
      heroTitleEn: "Prompt Templates",
      descZh: "视频、HyperFrames 与通用生成任务提示词，可按内容标签和来源继续细分。",
      descEn:
        "Reusable prompts for video, HyperFrames, and general generation tasks, filterable by content label and source.",
      statLabelZh: "Prompt",
      statLabelEn: "Prompts",
    },
    "image-prompt-template": {
      labelZh: "图片 Prompt",
      labelEn: "Image Prompts",
      heroLabelZh: "图片 Prompt 图库",
      heroLabelEn: "Image Prompt Gallery",
      heroTitleZh: "图片 Prompt 模板",
      heroTitleEn: "Image Prompt Templates",
      descZh: "专门收纳图片生成提示词，保留画面案例、风格目标和可复用的描述结构。",
      descEn:
        "A focused home for image-generation prompts, preserving visual examples, style goals, and reusable prompt structure.",
      statLabelZh: "图片 Prompt",
      statLabelEn: "Image Prompts",
    },
    "agent-skill": {
      labelZh: "Agent 技能",
      labelEn: "Agent Skills",
      heroLabelZh: "Agent 能力索引",
      heroLabelEn: "Agent Capability Index",
      heroTitleZh: "Agent 技能",
      heroTitleEn: "Agent Skills",
      descZh: "Agent 可读可调用的 SKILL.md 能力单元，覆盖设计、媒体、开发和工具流程。",
      descEn:
        "SKILL.md capability units that agents can read and invoke across design, media, development, and utility tasks.",
      statLabelZh: "Skill",
      statLabelEn: "Skills",
    },
    plugin: {
      labelZh: "插件",
      labelEn: "Plugins",
      heroLabelZh: "Open Design 插件库",
      heroLabelEn: "Open Design Plugins",
      heroTitleZh: "插件",
      heroTitleEn: "Plugins",
      descZh: "带 open-design.json 的一键工作流包，把 Skill、上下文、输入项和预览打包。",
      descEn:
        "Marketplace-ready Open Design bundles that package skills, context, inputs, previews, and capabilities.",
      statLabelZh: "插件",
      statLabelEn: "Plugins",
    },
    workflow: {
      labelZh: "工作流",
      labelEn: "Workflows",
      heroLabelZh: "场景工作流",
      heroLabelEn: "Scenario Pipelines",
      heroTitleZh: "工作流",
      heroTitleEn: "Workflows",
      descZh: "由 atoms 组成的长任务 pipeline，比如新生成、Figma 迁移、代码迁移和导出。",
      descEn:
        "Long-running scenario pipelines composed from atoms, such as new generation, Figma migration, code migration, and export.",
      statLabelZh: "工作流",
      statLabelEn: "Workflows",
    },
  };
  const resourceTypeOrder = [
    "design-system",
    "style-template",
    "artifact-template",
    "image-prompt-template",
    "prompt-template",
    "agent-skill",
    "plugin",
    "workflow",
  ];
  const defaultResourceType = "design-system";
  const uiCategoryKeys = Object.keys(categoryMeta).filter((key) => key !== "skill");
  const skillTagOrder = [
    "Design",
    "Dev",
    "Motion",
    "Accessibility",
    "Marketing",
    "Video",
  ];

  const page = document.body.dataset.page;

  function getRequestedLanguage() {
    const requested = new URLSearchParams(window.location.search).get("lang");
    return requested === "en" || requested === "zh" ? requested : null;
  }

  function getLanguage() {
    return getRequestedLanguage() || (localStorage.getItem(languageKey) === "en" ? "en" : "zh");
  }

  function setLanguage(lang) {
    const next = lang === "en" ? "en" : "zh";
    localStorage.setItem(languageKey, next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
    document.documentElement.lang = copy[next].htmlLang;
    return next;
  }

  function t(key, ...args) {
    const lang = getLanguage();
    const entry = copy[lang][key];
    return typeof entry === "function" ? entry(...args) : entry;
  }

  function normalizeText(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
  }

  function translateContent(value) {
    if (getLanguage() !== "zh") {
      return String(value ?? "");
    }

    const raw = String(value ?? "");
    const normalized = normalizeText(raw);
    if (!normalized) {
      return raw;
    }

    const translated = zhTranslations[normalized];
    if (!translated) {
      return raw;
    }

    const prefix = raw.match(/^\s*/)?.[0] || "";
    const suffix = raw.match(/\s*$/)?.[0] || "";
    return `${prefix}${translated}${suffix}`;
  }

  function translateList(items) {
    return (items || []).map((item) => translateContent(item));
  }

  function isSkillEntry(design) {
    return design?.entryType === "skill" || design?.categoryKey === "skill";
  }

  function isImagineEntry(design) {
    return design?.entryType === "imagine";
  }

  function getEntryResourceType(design) {
    if (design?.resourceType) {
      return design.resourceType;
    }

    if (isSkillEntry(design)) {
      return "agent-skill";
    }

    if (isImagineEntry(design)) {
      return "image-prompt-template";
    }

    if (String(design?.categoryKey || "").startsWith("style")) {
      return "style-template";
    }

    return "design-system";
  }

  async function loadImagineEntries() {
    if (imagineEntries.length > 0) {
      return imagineEntries;
    }

    const response = await fetch(imagineCasesUrl);
    if (!response.ok) {
      throw new Error(`Unable to load Imagine 2 cases: ${response.status}`);
    }

    const siteData = await response.json();
    imagineEntries = buildImagineEntries(siteData);
    return imagineEntries;
  }

  async function loadPromptModeMeta(mode) {
    const source = promptModeMap.get(mode);
    if (!source) {
      return null;
    }

    if (promptModeMeta.has(mode)) {
      return promptModeMeta.get(mode);
    }

    const response = await fetch(source.metaUrl);
    if (!response.ok) {
      throw new Error(`Unable to load ${source.label} metadata: ${response.status}`);
    }

    const meta = await response.json();
    promptModeMeta.set(mode, meta);
    promptModeCategoryKeys.set(
      mode,
      Array.isArray(meta.categories) ? meta.categories : source.categories || []
    );
    return meta;
  }

  async function loadPromptModeFullData(mode, source) {
    const response = await fetch(source.url);
    if (!response.ok) {
      throw new Error(`Unable to load ${source.label} cases: ${response.status}`);
    }

    const siteData = await response.json();
    const entries = buildPromptEntries(siteData, source);
    promptModeEntries.set(mode, entries);
    promptModeLoadedPages.set(mode, new Set(["full"]));
    return entries;
  }

  async function loadPromptModePage(mode, page = 1) {
    const source = promptModeMap.get(mode);
    if (!source) {
      return [];
    }

    if (!source.pageBaseUrl) {
      return loadPromptModeFullData(mode, source);
    }

    const loadedPages = promptModeLoadedPages.get(mode) || new Set();
    if (loadedPages.has(page) || loadedPages.has("full")) {
      return promptModeEntries.get(mode) || [];
    }

    const response = await fetch(promptPageUrl(source, page));
    if (!response.ok) {
      throw new Error(`Unable to load ${source.label} page ${page}: ${response.status}`);
    }

    const siteData = await response.json();
    const existing = promptModeEntries.get(mode) || [];
    const nextEntries = buildPromptEntries(siteData, source);
    const seen = new Set(existing.map((entry) => entry.slug));
    const merged = [
      ...existing,
      ...nextEntries.filter((entry) => !seen.has(entry.slug)),
    ];
    loadedPages.add(page);
    promptModeLoadedPages.set(mode, loadedPages);
    promptModeEntries.set(mode, merged);
    return merged;
  }

  async function loadPromptModeEntries(mode) {
    const source = promptModeMap.get(mode);
    if (!source) {
      return [];
    }

    const loadedPages = promptModeLoadedPages.get(mode);
    if (promptModeEntries.has(mode) && loadedPages?.size > 0) {
      if (!promptModeMeta.has(mode)) {
        await loadPromptModeMeta(mode);
      }
      return promptModeEntries.get(mode);
    }

    try {
      await loadPromptModeMeta(mode);
      return await loadPromptModePage(mode, 1);
    } catch (error) {
      console.warn(error);
      return loadPromptModeFullData(mode, source);
    }
  }

  function getNextPromptPage(mode) {
    if (!isPromptMode(mode)) {
      return null;
    }

    const meta = promptModeMeta.get(mode);
    const loadedPages = promptModeLoadedPages.get(mode) || new Set();
    if (!meta?.pages || loadedPages.has("full")) {
      return null;
    }

    for (let page = 1; page <= meta.pages; page += 1) {
      if (!loadedPages.has(page)) {
        return page;
      }
    }

    return null;
  }

  function getOpenDesignPromptCount() {
    return designs.filter((design) => getEntryResourceType(design) === "prompt-template").length;
  }

  function getOpenDesignImagePromptCount() {
    return designs.filter((design) => getEntryResourceType(design) === "image-prompt-template").length;
  }

  function getPromptSourceTotal(resourceType) {
    return promptModeSources
      .filter((source) => source.resourceType === resourceType)
      .reduce((total, source) => {
        const meta = promptModeMeta.get(source.key);
        return total + (meta?.totalCases || source.total || 0);
      }, 0);
  }

  function getPromptAggregateTotal() {
    return getOpenDesignPromptCount() + getPromptSourceTotal("prompt-template");
  }

  function getImagePromptAggregateTotal() {
    return (
      getOpenDesignImagePromptCount() +
      (imagineEntries.length || imagineCasesTotal) +
      getPromptSourceTotal("image-prompt-template")
    );
  }

  function getNextPromptSourcePage(resourceType) {
    for (const source of promptModeSources.filter((item) => item.resourceType === resourceType)) {
      const nextPage = getNextPromptPage(source.key);
      if (nextPage) {
        return {
          mode: source.key,
          page: nextPage,
        };
      }
    }

    return null;
  }

  function isPromptAggregateLoading(resourceType) {
    return promptModeSources
      .filter((source) => source.resourceType === resourceType)
      .some((source) => promptModeLoading.has(source.key));
  }

  function ensureResourceTypeLoaded(resourceType) {
    if (resourceType === "image-prompt-template") {
      loadImagineEntries()
        .then(() => {
          renderHomeIfReady();
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    if (!["prompt-template", "image-prompt-template"].includes(resourceType)) {
      return;
    }

    promptModeSources
      .filter((source) => source.resourceType === resourceType)
      .forEach((source) => {
      loadPromptModeEntries(source.key)
        .then(() => {
          renderHomeIfReady();
        })
        .catch((error) => {
          console.warn(error);
        });
      });
  }

  function renderHomeIfReady() {
    if (typeof window.__vibeuiRenderHome === "function") {
      window.__vibeuiRenderHome();
    }
  }

  function getLocalizedSkillTags(design) {
    if (!isSkillEntry(design)) {
      return [];
    }

    if (getLanguage() === "zh") {
      return design.skillTagsZh?.length
        ? design.skillTagsZh
        : (design.skillTags || []).map((tag) => skillTagLabels.zh[tag] || tag);
    }

    return design.skillTags || [];
  }

  function getLocalizedSummary(design) {
    if (isImagineEntry(design)) {
      return design.imagine?.promptPreview || design.summary || "";
    }

    if (isSkillEntry(design)) {
      return getLanguage() === "zh" && design.summaryZh
        ? design.summaryZh
        : design.summary || "";
    }

    return translateContent(design.summary);
  }

  function getLocalizedOverview(design) {
    if (isImagineEntry(design)) {
      return [
        design.imagine?.promptPreview || design.summary || "",
        design.imagine?.prompt || "",
      ].filter(Boolean);
    }

    if (isSkillEntry(design)) {
      return [getLocalizedSummary(design), t("commandHint")].filter(Boolean);
    }

    return translateList(design.overview || [design.summary]);
  }

  function getLocalizedTraits(design) {
    if (isImagineEntry(design)) {
      const category = getCategory(design.categoryKey);
      return [
        `${t("metadataCategory")}: ${category.label}`,
        ...(design.imagine?.styles || []).map((style) => `Style: ${style}`),
        ...(design.imagine?.scenes || []).map((scene) => `Scene: ${scene}`),
        design.sourceSite?.name
          ? `${t("imageSource")}: ${design.sourceSite.name}`
          : "",
      ].filter(Boolean);
    }

    if (isSkillEntry(design)) {
      const traits = [];
      const tags = getLocalizedSkillTags(design);

      if (design.skillAuthor) {
        traits.push(`${t("skillAuthorLabel")}: ${design.skillAuthor}`);
      }

      if (tags.length) {
        traits.push(`${t("skillTagsLabel")}: ${tags.join(" · ")}`);
      }

      if (design.skillCommand) {
        traits.push(`${t("skillCommandLabel")}: ${design.skillCommand}`);
      }

      if (design.sourceSite?.url) {
        traits.push(`${t("skillSourceLabel")}: ${design.sourceSite.url}`);
      }

      if (design.featured) {
        traits.push(t("skillFeatured"));
      }

      return traits;
    }

    return translateList(design.keyCharacteristics || []);
  }

  const bilingualStyleCategories = new Set([
    "styleGeneral",
    "styleLanding",
    "styleAnalytics",
  ]);
  const simplifiedStyleZhNames = {
    "uiuxpro-01-minimalism": "极简主义与瑞士风格",
    "uiuxpro-02-neumorphism": "新拟物化",
    "uiuxpro-03-glassmorphism": "玻璃拟态",
    "uiuxpro-04-brutalism": "粗野主义",
    "uiuxpro-05-3d-hyperrealism": "3D 与超写实主义",
    "uiuxpro-06-vibrant-block": "活力色块风格",
    "uiuxpro-07-dark-mode-oled": "OLED 深色模式",
    "uiuxpro-08-accessible": "无障碍与伦理设计",
    "uiuxpro-09-claymorphism": "黏土拟态",
    "uiuxpro-10-aurora-ui": "极光 UI",
    "uiuxpro-11-retro-futurism": "复古未来主义",
    "uiuxpro-12-flat-design": "扁平化设计",
    "uiuxpro-13-skeuomorphism": "拟物化设计",
    "uiuxpro-14-liquid-glass": "液态玻璃",
    "uiuxpro-15-motion-driven": "动态驱动",
    "uiuxpro-16-micro-interactions": "微交互",
    "uiuxpro-17-inclusive-design": "包容性设计",
    "uiuxpro-18-zero-interface": "零界面",
    "uiuxpro-19-soft-ui-evolution": "柔和 UI 进化版",
    "uiuxpro-20-hero-centric": "主视觉导向设计",
    "uiuxpro-21-conversion-optimized": "转化优化",
    "uiuxpro-22-feature-rich": "丰富功能展示",
    "uiuxpro-23-minimal-direct": "极简直观",
    "uiuxpro-24-social-proof": "社会证明导向",
    "uiuxpro-25-interactive-demo": "互动产品演示",
    "uiuxpro-26-trust-authority": "信任与权威",
    "uiuxpro-27-storytelling": "叙事驱动",
    "uiuxpro-28-data-dense-dashboard": "数据密集仪表板",
    "uiuxpro-29-heatmap-density": "热图风格",
    "uiuxpro-30-executive-summary": "高管仪表板",
    "uiuxpro-31-real-time-monitoring": "实时监控",
    "uiuxpro-32-drill-down-analytics": "下钻分析",
    "uiuxpro-33-comparative-analytics": "对比分析仪表板",
    "uiuxpro-34-predictive-analytics": "预测分析",
    "uiuxpro-35-user-behavior-analytics": "用户行为分析",
    "uiuxpro-36-financial-analytics": "财务仪表板",
    "uiuxpro-37-sales-intelligence": "销售智能仪表板",
    "uiuxpro-38-neubrutalism": "新粗野主义",
    "uiuxpro-39-bento-box": "便当盒网格",
    "uiuxpro-40-y2k-revival": "Y2K 美学",
    "uiuxpro-41-cyberpunk": "赛博朋克 UI",
    "uiuxpro-42-organic-biophilic": "有机亲生物设计",
    "uiuxpro-43-ai-native": "AI 原生 UI",
    "uiuxpro-44-memphis-revival": "孟菲斯设计",
    "uiuxpro-45-vaporwave": "蒸汽波",
    "uiuxpro-46-dimensional-layering": "多维层叠",
    "uiuxpro-47-exaggerated-minimalism": "夸张极简主义",
    "uiuxpro-48-kinetic-typography": "动态排版",
    "uiuxpro-49-parallax-storytelling": "视差叙事",
    "uiuxpro-50-swiss-modernism": "瑞士现代主义 2.0",
    "uiuxpro-51-hud-scifi": "科幻 HUD / FUI",
    "uiuxpro-52-pixel-art": "像素艺术",
    "uiuxpro-53-bento-grids": "便当盒网格",
    "uiuxpro-54-neubrutalism-v2": "新粗野主义",
    "uiuxpro-55-spatial-ui": "空间 UI (VisionOS)",
    "uiuxpro-56-e-ink-paper": "电子墨水 / 纸质",
    "uiuxpro-57-gen-z-chaos": "Z 世代混乱 / 极繁主义",
    "uiuxpro-58-biomimetic-organic": "仿生 / 有机 2.0",
  };
  const bilingualStyleNameSkip = new Set([
    "一般",
    "通用",
    "落地页",
    "落地頁",
    "分析仪表",
    "分析仪表板",
    "分析儀表",
    "分析儀表板",
  ]);

  function getStyleZhName(design) {
    if (!bilingualStyleCategories.has(design?.categoryKey)) {
      return "";
    }

    if (simplifiedStyleZhNames[design.slug]) {
      return simplifiedStyleZhNames[design.slug];
    }

    const terms = Array.isArray(design.searchTerms) ? design.searchTerms : [];
    for (const term of terms) {
      const text = normalizeText(term);
      if (!text) {
        continue;
      }

      if (!/[\u3400-\u9fff]/.test(text)) {
        continue;
      }

      if (bilingualStyleNameSkip.has(text)) {
        continue;
      }

      if (text.length > 40) {
        continue;
      }

      if (/[(),]/.test(text) && text.length > 18) {
        continue;
      }

      return text;
    }

    return normalizeText(translateContent(design.name));
  }

  function localizedDesignName(design) {
    const raw = String(design?.name ?? "");
    if (getLanguage() !== "zh" || !bilingualStyleCategories.has(design?.categoryKey)) {
      return raw;
    }

    const zhName = getStyleZhName(design);
    const rawNormalized = normalizeText(raw).toLowerCase();
    const zhNormalized = normalizeText(zhName).toLowerCase();
    if (!zhName || zhNormalized === rawNormalized) {
      return raw;
    }

    if (zhNormalized.includes(rawNormalized)) {
      return zhName;
    }

    return `${zhName} / ${raw}`;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function hexToRgba(hex, alpha) {
    const clean = String(hex || "").replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
      return `rgba(29, 91, 72, ${alpha})`;
    }

    const r = Number.parseInt(clean.slice(0, 2), 16);
    const g = Number.parseInt(clean.slice(2, 4), 16);
    const b = Number.parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function renderCommandPanel(design, options = {}) {
    const { compact = false, buttonClass = "detail-action" } = options;
    if (!design.skillCommand) {
      if (design.openDesign?.path) {
        return `
          <div class="command-panel ${compact ? "command-panel-compact" : ""}">
            <code class="command-code">${escapeHTML(design.openDesign.path)}</code>
            ${
              design.sourceSite?.url
                ? `<a
                    class="${escapeHTML(buttonClass)}"
                    href="${escapeHTML(design.sourceSite.url)}"
                    target="_blank"
                    rel="noopener"
                  >${escapeHTML(t("originalSite"))}</a>`
                : ""
            }
          </div>
        `;
      }

      return `<p class="command-empty">${escapeHTML(t("commandUnavailable"))}</p>`;
    }

    return `
      <div class="command-panel ${compact ? "command-panel-compact" : ""}">
        <code class="command-code">${escapeHTML(design.skillCommand)}</code>
        <button
          class="${escapeHTML(buttonClass)}"
          type="button"
          data-copy-command="${escapeHTML(design.skillCommand)}"
          data-copy-label="${escapeHTML(t("copyCommand"))}"
        >
          ${escapeHTML(t("copyCommand"))}
        </button>
      </div>
    `;
  }

  function renderSkillTagPills(design) {
    const tags = getLocalizedSkillTags(design);
    return tags
      .map((tag) => `<span class="file-pill">${escapeHTML(tag)}</span>`)
      .join("");
  }

  function renderResourceLinks(design, options = {}) {
    const { includeAuthor = true } = options;
    const links = [];
    if (design.skillLibraryUrl) {
      links.push({ label: t("skillLibraryLabel"), href: design.skillLibraryUrl });
    }
    if (design.openDesign?.path) {
      links.push({
        label: "Open Design",
        href: design.sourceSite?.url || "https://github.com/nexu-io/open-design",
        code: design.openDesign.path,
      });
    }
    if (design.sourceSite?.url) {
      links.push({ label: t("originalSite"), href: design.sourceSite.url });
    }
    if (includeAuthor && design.skillAuthorUrl) {
      links.push({ label: t("authorLink"), href: design.skillAuthorUrl });
    }

    return links
      .map(
        (item) => `
          <a class="file-link" href="${escapeHTML(item.href)}" target="_blank" rel="noopener">
            <span>${escapeHTML(item.label)}</span>
            <code>${escapeHTML(item.code || item.href)}</code>
          </a>
        `
      )
      .join("");
  }

  function getResourceTypeLabel(design) {
    const meta = getResourceTypeMeta(getEntryResourceType(design));
    return getLanguage() === "en" ? meta.labelEn : meta.labelZh;
  }

  async function copyCommandValue(value) {
    if (!value) {
      return false;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "absolute";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(field);
    return copied;
  }

  function flashCopyButton(button) {
    const defaultLabel = button.dataset.copyLabel || t("copyCommand");
    button.textContent = t("copiedCommand");
    window.setTimeout(() => {
      if (button.isConnected) {
        button.textContent = defaultLabel;
      }
    }, 1600);
  }

  function getCategory(key) {
    const lang = getLanguage();
    const meta = categoryMeta[key];
    if (meta) {
      return {
        ...meta,
        label: lang === "en" ? meta.labelEn : meta.labelZh,
      };
    }

    const imagineIndex = imagineCategoryKeys.indexOf(key);
    if (imagineIndex >= 0 || imagineCategoryLabelsZh[key]) {
      const palette =
        imagineCategoryPalette[
          Math.max(imagineIndex, 0) % imagineCategoryPalette.length
        ];
      return {
        ...palette,
        label: lang === "en" ? key : imagineCategoryLabelsZh[key] || key,
      };
    }

    if (promptCategoryLabelsZh[key]) {
      const keys = Object.keys(promptCategoryLabelsZh);
      const palette =
        promptCategoryPalette[
          Math.max(keys.indexOf(key), 0) % promptCategoryPalette.length
        ];
      return {
        ...palette,
        label: lang === "en" ? key : promptCategoryLabelsZh[key],
      };
    }

    return {
      label: key,
      bg: "#f4efe8",
      text: "#5a534a",
      border: "#ddd1c2",
    };
  }

  function getFavoriteSlugs() {
    try {
      const parsed = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function setFavoriteSlugs(slugs) {
    localStorage.setItem(favoritesKey, JSON.stringify(slugs));
  }

  function isFavorite(slug) {
    return getFavoriteSlugs().includes(slug);
  }

  function toggleFavorite(slug) {
    const current = getFavoriteSlugs();
    const next = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug];
    setFavoriteSlugs(next);
    return next;
  }

  function getPreviewMode() {
    return localStorage.getItem(previewModeKey) || "light";
  }

  function setPreviewMode(mode) {
    localStorage.setItem(previewModeKey, mode);
  }

  function getCardPreviewLabel() {
    return getLanguage() === "en" ? "Preview" : "预览";
  }

  function getCardPreviewAriaLabel(name) {
    return getLanguage() === "en"
      ? `Show preview for ${name}`
      : `显示 ${name} 的预览`;
  }

  function getCardPreviewStageAriaLabel(name) {
    return getLanguage() === "en"
      ? `Open details for ${name}`
      : `打开 ${name} 的详情页`;
  }

  function localizeEmbeddedFrame(frame) {
    if (getLanguage() !== "zh" || !frame?.contentDocument?.body) {
      return;
    }

    const doc = frame.contentDocument;
    const walker = doc.createTreeWalker(doc.body, doc.defaultView.NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const translated = translateContent(node.textContent);
      if (translated !== node.textContent) {
        node.textContent = translated;
      }
    }

    doc.querySelectorAll("[placeholder]").forEach((element) => {
      const translated = translateContent(element.getAttribute("placeholder"));
      if (translated !== element.getAttribute("placeholder")) {
        element.setAttribute("placeholder", translated);
      }
    });

    doc.querySelectorAll("[title]").forEach((element) => {
      const translated = translateContent(element.getAttribute("title"));
      if (translated !== element.getAttribute("title")) {
        element.setAttribute("title", translated);
      }
    });
  }

  function renderLanguageSwitcher() {
    const lang = getLanguage();
    return `
      <div class="lang-switcher" aria-label="${escapeHTML(t("langSwitcherLabel"))}">
        <button
          class="lang-toggle ${lang === "zh" ? "active" : ""}"
          type="button"
          data-lang-choice="zh"
        >
          ${escapeHTML(t("langZh"))}
        </button>
        <button
          class="lang-toggle ${lang === "en" ? "active" : ""}"
          type="button"
          data-lang-choice="en"
        >
          ${escapeHTML(t("langEn"))}
        </button>
      </div>
    `;
  }

  function getAllEntries() {
    return [
      ...designs,
      ...imagineEntries,
      ...promptModeSources.flatMap(
        (source) => promptModeEntries.get(source.key) || []
      ),
    ];
  }

  function getAggregatePromptSourceKeys(resourceType) {
    return promptModeSources
      .filter((source) => source.resourceType === resourceType)
      .map((source) => source.key);
  }

  function getModePool(mode) {
    return getAllEntries().filter((design) => getEntryResourceType(design) === mode);
  }

  function getResourceTypeMeta(mode) {
    return resourceTypeMeta[mode] || resourceTypeMeta[defaultResourceType];
  }

  function getModeStats(mode) {
    const pool = getModePool(mode);
    const totalDesigns =
      mode === "prompt-template"
        ? getPromptAggregateTotal()
        : mode === "image-prompt-template"
          ? getImagePromptAggregateTotal()
          : pool.length;
    return {
      totalDesigns,
      totalPreviews: pool.reduce(
        (sum, design) => sum + (design.stats?.previewCount || 0),
        0
      ),
      totalCategories: new Set(
        mode === "prompt-template" || mode === "image-prompt-template"
          ? pool.map((design) => design.categoryKey || design.surface)
          : pool.map((design) => design.surface || design.categoryKey)
      ).size,
    };
  }

  function getSkillTagLabel(tag) {
    const lang = getLanguage();
    return skillTagLabels[lang]?.[tag] || tag;
  }

  function getFilterFacet(design) {
    if (getEntryResourceType(design) === "agent-skill" && (design.skillTags || []).length) {
      return (design.skillTags || [])[0];
    }

    if (getEntryResourceType(design) === "prompt-template") {
      return design.categoryKey || design.surface || "prompt";
    }

    return design.surface || design.categoryKey || "general";
  }

  function getSecondaryFacet(design) {
    return (
      design.originalCategoryKey ||
      design.categoryKey ||
      design.scenario ||
      design.surface ||
      "general"
    );
  }

  function getTertiaryFacet(design) {
    if (getEntryResourceType(design) === "agent-skill" && (design.skillTags || []).length) {
      return (design.skillTags || [])[0];
    }

    if (isImagineEntry(design)) {
      return design.sourceKind || design.sourceSite?.name || "prompt-gallery";
    }

    if (
      ["prompt-template", "image-prompt-template"].includes(getEntryResourceType(design)) &&
      design.sourceKind
    ) {
      return design.sourceKind;
    }

    return design.surface || design.scenario || getFilterFacet(design);
  }

  function getLegacyFacet(design) {
    return getSecondaryFacet(design);
  }

  function getFilterLabel(key) {
    const surfaceLabels = {
      web: { zh: "Web", en: "Web" },
      ui: { zh: "UI", en: "UI" },
      mobile: { zh: "Mobile", en: "Mobile" },
      deck: { zh: "Deck / PPT", en: "Deck / PPT" },
      dashboard: { zh: "Dashboard", en: "Dashboard" },
      image: { zh: "Image", en: "Image" },
      video: { zh: "Video", en: "Video" },
      audio: { zh: "Audio", en: "Audio" },
      document: { zh: "Document", en: "Document" },
      "design-system": { zh: "Design System", en: "Design System" },
      workflow: { zh: "Workflow", en: "Workflow" },
      "prompt-template": { zh: "Prompt", en: "Prompt" },
      "image-prompt-template": { zh: "图片 Prompt", en: "Image Prompt" },
      "style-template": { zh: "UI 风格", en: "UI Style" },
      "agent-skill": { zh: "Agent Skill", en: "Agent Skill" },
      plugin: { zh: "插件", en: "Plugin" },
      "awesome-gpt-image-2": { zh: "GPT-Image2", en: "GPT-Image2" },
      "open-design-prompt-template": { zh: "Open Design", en: "Open Design" },
      "prompt-gallery": { zh: "Prompt Gallery", en: "Prompt Gallery" },
      general: { zh: "通用", en: "General" },
    };
    const lang = getLanguage();
    if (surfaceLabels[key]) {
      return surfaceLabels[key][lang];
    }

    if (skillTagOrder.includes(key)) {
      return getSkillTagLabel(key);
    }

    if (promptModeMap.has(key)) {
      return getSourceFilterLabel(key);
    }

    return getCategory(key).label;
  }

  function renderModeSwitcher(mode) {
    const lang = getLanguage();
    const modeItems = resourceTypeOrder
      .map((key) => {
        const meta = getResourceTypeMeta(key);
        return {
          key,
          label: lang === "en" ? meta.labelEn : meta.labelZh,
          count: getModeStats(key).totalDesigns,
        };
      })
      .filter((item) => item.count > 0 || item.key !== "workflow");
    const activeIndex = Math.max(
      modeItems.findIndex((item) => item.key === mode),
      0
    );

    return `
      <div class="mode-tabs-head">
        <span class="hero-stat-label">${escapeHTML(t("modeSwitcherLabel"))}</span>
      </div>
      <div
        class="mode-tabs"
        role="tablist"
        aria-label="${escapeHTML(t("modeSwitcherLabel"))}"
        data-active-mode="${escapeHTML(mode)}"
        style="--mode-count:${modeItems.length};--active-index:${activeIndex};"
      >
        ${modeItems
          .map((item) => {
            const active = item.key === mode;
            return `
              <button
                class="mode-tab ${active ? "active" : ""}"
                type="button"
                role="tab"
                aria-selected="${active ? "true" : "false"}"
                aria-controls="filters"
                data-content-mode="${escapeHTML(item.key)}"
              >
                <span class="mode-tab-label">${escapeHTML(item.label)}</span>
                <span class="mode-tab-count">${escapeHTML(String(item.count))}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function sourceLabel(design) {
    if (isImagineEntry(design) && design.sourceSite?.name) {
      return design.sourceSite.name;
    }

    if (isSkillEntry(design) && design.sourceSite?.name) {
      return design.sourceSite.name;
    }

    if (!design.sourceSite?.url) {
      return getCategory(design.categoryKey).label;
    }

    try {
      return new URL(design.sourceSite.url).hostname.replace(/^www\./, "");
    } catch {
      return design.sourceSite.name || getCategory(design.categoryKey).label;
    }
  }

  function searchBlob(design) {
    return [
      design.name,
      getStyleZhName(design),
      design.summary,
      design.summaryZh,
      getLocalizedSummary(design),
      design.categoryLabelZh,
      design.categoryLabelEn,
      ...(design.overview || []),
      ...(getLanguage() === "zh" && design.summaryZh ? [design.summaryZh] : []),
      ...getLocalizedOverview(design),
      ...translateList(design.overview || []),
      ...(design.keyCharacteristics || []),
      ...getLocalizedTraits(design),
      ...translateList(design.keyCharacteristics || []),
      ...(design.searchTerms || []),
      ...translateList(design.searchTerms || []),
      ...(design.skillTags || []),
      ...(design.skillTagsZh || []),
      design.skillCommand,
      design.skillAuthor,
      design.imagine?.mediaType,
      design.imagine?.model,
      design.imagine?.prompt,
      design.imagine?.promptPreview,
      ...(design.imagine?.styles || []),
      ...(design.imagine?.scenes || []),
      design.sourceSite?.name,
      design.sourceSite?.url,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function detailHref(slug) {
    return `style.html?slug=${encodeURIComponent(slug)}&lang=${encodeURIComponent(
      getLanguage()
    )}`;
  }

  function indexHref() {
    return `index.html?lang=${encodeURIComponent(getLanguage())}`;
  }

  function renderPaletteDots(colors, count) {
    return (colors || [])
      .slice(0, count)
      .map(
        (color) =>
          `<span class="palette-dot" style="background:${escapeHTML(color)}"></span>`
      )
      .join("");
  }

  function renderSwatchRows(colors) {
    return (colors || [])
      .map(
        (color) => `
          <div class="swatch-row">
            <span class="swatch-chip" style="background:${escapeHTML(color)}"></span>
            <span class="swatch-code">${escapeHTML(color)}</span>
          </div>
        `
      )
      .join("");
  }

  function renderFilePills(design, options = {}) {
    const { includeCardPreview = false } = options;

    if (isImagineEntry(design)) {
      const pills = [
        getResourceTypeLabel(design),
        ...(design.imagine?.styles || []).slice(0, 2),
      ];
      return pills
        .map((pill) => `<span class="file-pill">${escapeHTML(pill)}</span>`)
        .join("");
    }

    if (isSkillEntry(design)) {
      const pills = [getResourceTypeLabel(design), ...getLocalizedSkillTags(design).slice(0, 2)];
      return pills
        .map((pill) => `<span class="file-pill">${escapeHTML(pill)}</span>`)
        .join("");
    }

    const pills = [getResourceTypeLabel(design), design.surface || t("fileLightShort")];
    if (design.files.previewDark) {
      pills.push(t("fileDarkShort"));
    }

    const staticPills = pills
      .map((pill) => `<span class="file-pill">${escapeHTML(pill)}</span>`)
      .join("");

    if (!includeCardPreview || !design.files.preview) {
      return staticPills;
    }

    return `${staticPills}
      <button
        class="file-pill file-pill-link"
        type="button"
        data-card-preview="${escapeHTML(design.files.preview)}"
        data-detail-href="${escapeHTML(detailHref(design.slug))}"
        data-preview-name="${escapeHTML(localizedDesignName(design))}"
        aria-label="${escapeHTML(getCardPreviewAriaLabel(localizedDesignName(design)))}"
        aria-expanded="false"
        aria-controls="card-preview-popover"
      >
        ${escapeHTML(getCardPreviewLabel())}
      </button>`;
  }

  function renderCardPreview(design) {
    if (!design.files.preview) {
      return `<div class="card-preview"><div class="card-preview-empty">${escapeHTML(
        design.monogram
      )}</div></div>`;
    }

    return `
      <div class="card-preview">
        <div class="card-preview-viewport">
          <iframe
            class="card-preview-frame"
            src="${escapeHTML(design.files.preview)}"
            title="${escapeHTML(localizedDesignName(design))} preview"
            loading="lazy"
            tabindex="-1"
          ></iframe>
        </div>
      </div>`;
  }

  function renderUiCard(design) {
    const category = getCategory(design.categoryKey);
    const colors = (design.colors || []).slice(0, 4);
    const tint = hexToRgba(colors[1] || colors[0] || category.border, 0.2);
    const favorite = isFavorite(design.slug);
    const hasInlinePreview = !!design.files.preview;
    const cardClass = hasInlinePreview ? "card has-preview" : "card is-standard";

    return `
      <article class="${cardClass}" data-slug="${escapeHTML(design.slug)}" style="--card-soft:${tint}">
        ${hasInlinePreview ? renderCardPreview(design) : ""}
        <div class="card-info">
        <div class="card-ghost">${escapeHTML(design.monogram)}</div>
        <div class="card-topline">
          <span># ${String(design.id).padStart(2, "0")}</span>
          <span>${escapeHTML(getResourceTypeLabel(design))}</span>
        </div>
        <div class="card-head">
          <div class="card-name">${escapeHTML(localizedDesignName(design))}</div>
          <span
            class="card-tag"
            style="background:${category.bg};color:${category.text};border-color:${category.border};"
          >
            ${escapeHTML(category.label)}
          </span>
        </div>
        <div class="card-desc">${escapeHTML(getLocalizedSummary(design))}</div>
        <div class="card-footer">
          <div class="card-meta-row">
            <div class="card-palette">${renderPaletteDots(colors, 4)}</div>
            <button
              class="fav-star ${favorite ? "is-favorite" : ""}"
              type="button"
              data-favorite="${escapeHTML(design.slug)}"
              aria-label="${escapeHTML(
                favorite ? t("removeFavoriteAria") : t("addFavoriteAria")
              )}"
            >
              ${favorite ? "★" : "☆"}
            </button>
          </div>
          <div class="card-files">${renderFilePills(design, { includeCardPreview: hasInlinePreview })}</div>
        </div>
        </div>
      </article>
    `;
  }

  function renderSkillCard(design) {
    const category = getCategory(design.categoryKey);
    const colors = (design.colors || []).slice(0, 4);
    const tint = hexToRgba(colors[1] || colors[0] || category.border, 0.2);
    const favorite = isFavorite(design.slug);
    const hasInlinePreview = !!design.files?.preview;
    const cardClass = hasInlinePreview ? "card has-preview skill-card" : "card is-standard skill-card";

    return `
      <article class="${cardClass}" data-slug="${escapeHTML(design.slug)}" style="--card-soft:${tint}">
        ${hasInlinePreview ? renderCardPreview(design) : ""}
        <div class="card-info">
        <button
          class="fav-star ${favorite ? "is-favorite" : ""}"
          type="button"
          data-favorite="${escapeHTML(design.slug)}"
          aria-label="${escapeHTML(
            favorite ? t("removeFavoriteAria") : t("addFavoriteAria")
          )}"
        >
          ${favorite ? "★" : "☆"}
        </button>
        <div class="card-ghost">${escapeHTML(design.monogram)}</div>
        <div class="card-topline">
          <span># ${String(design.id).padStart(3, "0")}</span>
          <span>${escapeHTML(getResourceTypeLabel(design))}</span>
        </div>
        <div class="card-head">
          <div class="card-name">${escapeHTML(localizedDesignName(design))}</div>
          <span
            class="card-tag"
            style="background:${category.bg};color:${category.text};border-color:${category.border};"
          >
            ${escapeHTML(category.label)}
          </span>
        </div>
        <div class="card-desc">${escapeHTML(getLocalizedSummary(design))}</div>
        <div class="card-palette">${renderPaletteDots(colors, 4)}</div>
        <div class="card-files">${renderFilePills(design, { includeCardPreview: hasInlinePreview })}</div>
        </div>
      </article>
    `;
  }

  function renderImaginePrimaryMedia(design) {
    const image =
      design.imagine?.fullImage ||
      design.imagine?.image ||
      design.files?.image ||
      "";
    const poster = design.imagine?.image || image;
    const video = design.imagine?.video || design.files?.video || "";
    const alt = design.imagine?.imageAlt || localizedDesignName(design);

    if (design.imagine?.mediaType === "video" && video) {
      return `
        <video
          src="${escapeHTML(video)}"
          poster="${escapeHTML(poster)}"
          controls
          playsinline
          preload="metadata"
        ></video>
      `;
    }

    return `
      <img
        src="${escapeHTML(image)}"
        alt="${escapeHTML(alt)}"
        loading="lazy"
        decoding="async"
      >
    `;
  }

  function renderImagineMediaStrip(design) {
    const media = (design.imagine?.media || [])
      .filter((item) => item.path && (item.kind === "image" || item.kind === "video"))
      .filter((item, index, items) =>
        items.findIndex((candidate) => candidate.path === item.path) === index
      );

    if (media.length <= 1) {
      return "";
    }

    return `
      <div class="imagine-media-strip" aria-label="OpenNana media files">
        ${media
          .slice(0, 8)
          .map((item) => {
            const isVideo = item.kind === "video";
            const label = isVideo ? getMediaTypeLabel("video") : getMediaTypeLabel("image");
            return `
              <a
                class="imagine-media-chip ${isVideo ? "is-video" : ""}"
                href="${escapeHTML(item.path)}"
                target="_blank"
                rel="noopener"
              >
                <span>${escapeHTML(label)}</span>
                <span>${escapeHTML(String(item.index || 1).padStart(2, "0"))}</span>
              </a>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderImagineCard(design) {
    const category = getCategory(design.categoryKey);
    const favorite = isFavorite(design.slug);
    const image = design.imagine?.image || design.files?.image || "";
    const mediaType = design.imagine?.mediaType || "image";

    return `
      <article class="card imagine-card" data-slug="${escapeHTML(design.slug)}">
        <div class="imagine-thumb">
          <button
            class="fav-star ${favorite ? "is-favorite" : ""}"
            type="button"
            data-favorite="${escapeHTML(design.slug)}"
            aria-label="${escapeHTML(
              favorite ? t("removeFavoriteAria") : t("addFavoriteAria")
            )}"
          >
            ${favorite ? "★" : "☆"}
          </button>
          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(design.imagine?.imageAlt || localizedDesignName(design))}"
            loading="lazy"
            decoding="async"
          >
          ${
            mediaType === "video"
              ? `<span class="imagine-play-badge" aria-hidden="true"></span>`
              : ""
          }
          <span class="imagine-media-badge">${escapeHTML(
            getMediaTypeLabel(mediaType)
          )}</span>
        </div>
        <div class="card-info">
          <div class="card-topline">
            <span># ${String(design.id).padStart(3, "0")}</span>
            <span>${escapeHTML(getResourceTypeLabel(design))}</span>
          </div>
          <div class="card-head">
            <div class="card-name">${escapeHTML(localizedDesignName(design))}</div>
            <span
              class="card-tag"
              style="background:${category.bg};color:${category.text};border-color:${category.border};"
            >
              ${escapeHTML(category.label)}
            </span>
          </div>
          <div class="card-desc">${escapeHTML(getLocalizedSummary(design))}</div>
          <div class="card-footer">
            <div class="card-meta-row">
              <div class="card-files">${renderFilePills(design)}</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderCard(design) {
    if (isImagineEntry(design)) {
      return renderImagineCard(design);
    }

    return isSkillEntry(design) ? renderSkillCard(design) : renderUiCard(design);
  }

  function initHome() {
    const refs = {
      filters: document.getElementById("filters"),
      search: document.getElementById("search"),
      grid: document.getElementById("grid"),
      favoritesGrid: document.getElementById("favorites-grid"),
      favoritesSection: document.getElementById("fav-section"),
      favoritesCount: document.getElementById("fav-count"),
      overlay: document.getElementById("overlay"),
      modalShell: document.getElementById("modal-shell"),
      modalPrev: document.getElementById("modal-prev"),
      modalNext: document.getElementById("modal-next"),
      homeHeroLabel: document.getElementById("home-hero-label"),
      homeHeroTitle: document.getElementById("home-hero-title"),
      homeHeroDesc: document.getElementById("home-hero-desc"),
      statDesignsLabel: document.getElementById("stat-designs-label"),
      statDesignsValue: document.getElementById("stat-designs"),
      statPreviewsLabel: document.getElementById("stat-previews-label"),
      statPreviewsValue: document.getElementById("stat-previews"),
      statCategoriesLabel: document.getElementById("stat-categories-label"),
      statCategoriesValue: document.getElementById("stat-categories"),
      favoritesLabel: document.getElementById("favorites-label"),
      homeFooterNote: document.getElementById("home-footer-note"),
      homeLangSwitcher: document.getElementById("home-lang-switcher"),
      homeModeSwitcher: document.getElementById("home-mode-switcher"),
      backToTop: document.getElementById("back-to-top"),
    };

    const state = {
      contentMode: defaultResourceType,
      activeFilter: "all",
      secondaryFilter: "all",
      tertiaryFilter: "all",
      favoritesOnly: false,
      query: "",
      visibleDesigns: [],
      modalIndex: -1,
      modalPool: [],
    };

    function updateBackToTopButton() {
      if (!refs.backToTop) {
        return;
      }

      refs.backToTop.classList.toggle("is-visible", window.scrollY > 520);
    }

    refs.backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const previewPopover = (() => {
      const root = document.createElement("section");
      root.id = "card-preview-popover";
      root.className = "card-preview-popover";
      root.setAttribute("aria-hidden", "true");
      root.innerHTML = `
        <div class="card-preview-popover-inner">
          <div class="card-preview-popover-head">
            <span class="card-preview-popover-kicker"></span>
            <span class="card-preview-popover-title"></span>
          </div>
          <div
            class="card-preview-popover-stage"
            role="link"
            tabindex="0"
          >
            <div class="card-preview-popover-canvas">
              <iframe
                class="card-preview-popover-frame"
                loading="lazy"
                tabindex="-1"
              ></iframe>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(root);
      return {
        root,
        kicker: root.querySelector(".card-preview-popover-kicker"),
        title: root.querySelector(".card-preview-popover-title"),
        stage: root.querySelector(".card-preview-popover-stage"),
        canvas: root.querySelector(".card-preview-popover-canvas"),
        frame: root.querySelector(".card-preview-popover-frame"),
      };
    })();
    let previewHideTimer = 0;
    let activePreviewButton = null;
    let previewPopoverOpenedAt = 0;

    function bindCardPreviewFrames(scope) {
      scope.querySelectorAll(".card-preview").forEach((preview) => {
        const frame = preview.querySelector(".card-preview-frame");
        if (!frame || frame.dataset.bound === "true") {
          return;
        }

        frame.dataset.bound = "true";
        const markReady = () => preview.classList.add("is-ready");
        frame.addEventListener("load", markReady, { once: true });

        if (frame.contentDocument?.readyState === "complete") {
          markReady();
        }
      });
    }

    setLanguage(getLanguage());

    function updatePreviewPopoverMetrics() {
      const chromePadding = 26;
      const maxVisibleWidth = Math.min(Math.max(window.innerWidth - 56, 260), 760);
      const maxVisibleHeight = Math.max(window.innerHeight - 120, 320);
      const frameHeight = Number(previewPopover.frame.dataset.frameHeight) || 1360;
      const scale = Math.min(0.56, maxVisibleWidth / 1280);
      const safeScale = Math.max(scale, 0.2);
      const visibleWidth = Math.round(1280 * safeScale);
      const contentHeight = Math.round(frameHeight * safeScale);
      const visibleHeight = Math.min(contentHeight, Math.round(maxVisibleHeight));
      previewPopover.root.style.setProperty(
        "--card-preview-scale",
        safeScale.toFixed(4)
      );
      previewPopover.root.style.setProperty(
        "--card-preview-visible-width",
        `${visibleWidth}px`
      );
      previewPopover.root.style.setProperty(
        "--card-preview-visible-height",
        `${visibleHeight}px`
      );
      previewPopover.root.style.setProperty(
        "--card-preview-frame-height",
        `${frameHeight}px`
      );
      previewPopover.root.style.setProperty(
        "--card-preview-content-height",
        `${contentHeight}px`
      );
      previewPopover.root.style.width = `${visibleWidth + chromePadding}px`;
    }

    function syncPreviewFrameHeight() {
      const doc = previewPopover.frame.contentDocument;
      if (!doc) {
        previewPopover.frame.dataset.frameHeight = "1360";
        return;
      }

      const root = doc.documentElement;
      const body = doc.body;
      const frameHeight = Math.max(
        1360,
        root?.scrollHeight || 0,
        root?.offsetHeight || 0,
        root?.clientHeight || 0,
        body?.scrollHeight || 0,
        body?.offsetHeight || 0,
        body?.clientHeight || 0
      );
      previewPopover.frame.dataset.frameHeight = String(frameHeight);
    }

    function clearPreviewHideTimer() {
      if (!previewHideTimer) {
        return;
      }

      window.clearTimeout(previewHideTimer);
      previewHideTimer = 0;
    }

    function setPreviewButtonExpanded(button, expanded) {
      if (!button) {
        return;
      }

      button.setAttribute("aria-expanded", expanded ? "true" : "false");
    }

    function positionPreviewPopover(button) {
      if (!button || !document.body.contains(button)) {
        return;
      }

      const buttonRect = button.getBoundingClientRect();
      const popoverRect = previewPopover.root.getBoundingClientRect();
      const gap = 14;
      const inset = 12;
      let left = buttonRect.left + buttonRect.width / 2 - popoverRect.width / 2;
      left = Math.min(
        Math.max(left, inset),
        window.innerWidth - popoverRect.width - inset
      );

      let top = buttonRect.top - popoverRect.height - gap;
      let placement = "top";
      if (top < inset) {
        top = buttonRect.bottom + gap;
        placement = "bottom";
      }

      if (top + popoverRect.height > window.innerHeight - inset) {
        top = Math.max(inset, window.innerHeight - popoverRect.height - inset);
      }

      previewPopover.root.dataset.placement = placement;
      previewPopover.root.style.left = `${Math.round(left)}px`;
      previewPopover.root.style.top = `${Math.round(top)}px`;
    }

    function hidePreviewPopover() {
      clearPreviewHideTimer();
      setPreviewButtonExpanded(activePreviewButton, false);
      activePreviewButton = null;
      previewPopover.root.removeAttribute("data-detail-href");
      previewPopover.root.classList.remove("is-open");
      previewPopover.root.setAttribute("aria-hidden", "true");
      previewPopover.root.removeAttribute("data-placement");
    }

    function schedulePreviewHide() {
      clearPreviewHideTimer();
      previewHideTimer = window.setTimeout(() => {
        if (previewPopover.root.matches(":hover")) {
          return;
        }

        hidePreviewPopover();
      }, 120);
    }

    function showPreviewPopover(button) {
      if (!button?.dataset.cardPreview) {
        return;
      }

      clearPreviewHideTimer();
      updatePreviewPopoverMetrics();
      if (activePreviewButton && activePreviewButton !== button) {
        setPreviewButtonExpanded(activePreviewButton, false);
      }

      activePreviewButton = button;
      previewPopover.kicker.textContent = t("lightPreview");
      previewPopover.title.textContent = button.dataset.previewName || "";
      previewPopover.frame.title = `${button.dataset.previewName || ""} ${t("lightPreview")}`;
      previewPopover.stage.setAttribute(
        "aria-label",
        getCardPreviewStageAriaLabel(button.dataset.previewName || "")
      );
      previewPopover.root.dataset.detailHref = button.dataset.detailHref || "";
      previewPopover.root.classList.add("is-open");
      previewPopover.root.setAttribute("aria-hidden", "false");
      previewPopoverOpenedAt = performance.now();
      setPreviewButtonExpanded(button, true);

      const nextSrc = button.dataset.cardPreview;
      if (previewPopover.frame.dataset.src !== nextSrc) {
        previewPopover.frame.dataset.src = nextSrc;
        previewPopover.frame.dataset.frameHeight = "1360";
        previewPopover.frame.src = nextSrc;
        previewPopover.stage.scrollTop = 0;
        previewPopover.stage.scrollLeft = 0;
      } else {
        localizeEmbeddedFrame(previewPopover.frame);
        syncPreviewFrameHeight();
        previewPopover.stage.scrollTop = 0;
        previewPopover.stage.scrollLeft = 0;
      }

      updatePreviewPopoverMetrics();
      positionPreviewPopover(button);
    }

    function renderStaticChrome() {
      const modeStats = getModeStats(state.contentMode);
      const skillMode = state.contentMode === "skill";
      const imagineMode = state.contentMode === "imagine";
      const promptMode = isPromptMode(state.contentMode);
      const mediaMode = imagineMode || promptMode;
      const promptLabel = getPromptModeLabel(state.contentMode);
      const promptHeroLabel =
        getLanguage() === "zh"
          ? `${promptLabel} 提示词库`
          : `${promptLabel} Prompt Gallery`;
      const promptHeroTitle =
        getLanguage() === "zh"
          ? `<span class="hero-count-inline">${modeStats.totalDesigns}</span> 个<br><em>${promptLabel} 案例</em>`
          : `<span class="hero-count-inline">${modeStats.totalDesigns}</span><br><em>${promptLabel} Cases</em>`;
      const promptHeroDesc =
        getLanguage() === "zh"
          ? "精选提示词、图片与视频案例，点击卡片查看媒体和完整 Prompt。"
          : "Explore prompt, image, and video cases. Open any card for media and the full prompt.";
      const promptCategoryStat =
        getLanguage() === "zh" ? "内容标签" : "Content Labels";

      document.title = t("homeDocumentTitle");
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          "content",
          promptMode
            ? promptHeroDesc
            : imagineMode
            ? t("homeHeroDescImagine")
            : skillMode
              ? t("homeHeroDescSkill")
              : t("homeMetaDescription")
        );
      refs.homeHeroLabel.textContent = promptMode
        ? promptHeroLabel
        : imagineMode
        ? t("homeHeroLabelImagine")
        : skillMode
          ? t("homeHeroLabelSkill")
          : t("homeHeroLabel");
      refs.homeHeroTitle.innerHTML = promptMode
        ? promptHeroTitle
        : imagineMode
        ? t("homeHeroTitleImagine", modeStats.totalDesigns)
        : skillMode
          ? t("homeHeroTitleSkill", modeStats.totalDesigns)
          : t("homeHeroTitle", modeStats.totalDesigns);
      refs.homeHeroDesc.innerHTML = promptMode
        ? promptHeroDesc
        : imagineMode
        ? t("homeHeroDescImagine")
        : skillMode
          ? t("homeHeroDescSkill")
          : t("homeHeroDesc");
      refs.statDesignsLabel.textContent = mediaMode
        ? t("statDesignsImagine")
        : skillMode
          ? t("statDesignsSkill")
          : t("statDesigns");
      refs.statDesignsValue.textContent = String(modeStats.totalDesigns);
      refs.statPreviewsLabel.textContent = mediaMode
        ? t("statPreviewsImagine")
        : skillMode
          ? t("statPreviewsSkill")
          : t("statPreviews");
      refs.statPreviewsValue.textContent = String(modeStats.totalPreviews);
      refs.statCategoriesLabel.textContent = promptMode
        ? promptCategoryStat
        : imagineMode
        ? t("statCategoriesImagine")
        : skillMode
          ? t("statCategoriesSkill")
          : t("statCategories");
      refs.statCategoriesValue.textContent = String(modeStats.totalCategories);
      {
        const modeMeta = getResourceTypeMeta(state.contentMode);
        const lang = getLanguage();
        const heroLabel = lang === "en" ? modeMeta.heroLabelEn : modeMeta.heroLabelZh;
        const heroTitle = lang === "en" ? modeMeta.heroTitleEn : modeMeta.heroTitleZh;
        const heroDesc = lang === "en" ? modeMeta.descEn : modeMeta.descZh;
        const statLabel = lang === "en" ? modeMeta.statLabelEn : modeMeta.statLabelZh;

        document
          .querySelector('meta[name="description"]')
          ?.setAttribute("content", heroDesc || t("homeMetaDescription"));
        refs.homeHeroLabel.textContent = heroLabel;
        refs.homeHeroTitle.innerHTML =
          lang === "zh"
            ? `<span class="hero-count-inline">${modeStats.totalDesigns}</span> 个<br><em>${escapeHTML(heroTitle)}</em>`
            : `<span class="hero-count-inline">${modeStats.totalDesigns}</span><br><em>${escapeHTML(heroTitle)}</em>`;
        refs.homeHeroDesc.textContent = heroDesc;
        refs.statDesignsLabel.textContent = statLabel;
        refs.statPreviewsLabel.textContent =
          ["agent-skill", "prompt-template", "image-prompt-template"].includes(state.contentMode)
            ? t("statPreviewsSkill")
            : t("statPreviews");
        refs.statCategoriesLabel.textContent =
          ["prompt-template", "image-prompt-template"].includes(state.contentMode)
            ? t("statCategoriesImagine")
            : t("statCategories");
      }
      refs.search.placeholder = t("searchPlaceholder");
      refs.favoritesLabel.textContent = t("favoritesSection");
      refs.homeFooterNote.innerHTML = t("homeFooterNote");
      refs.homeLangSwitcher.innerHTML = renderLanguageSwitcher();
      refs.homeModeSwitcher.innerHTML = renderModeSwitcher(state.contentMode);
      refs.modalPrev.setAttribute("aria-label", t("prevItem"));
      refs.modalNext.setAttribute("aria-label", t("nextItem"));
    }

    function getFilteredDesigns() {
      const query = state.query.trim().toLowerCase();
      const pool = getModePool(state.contentMode);
      return pool.filter((design) => {
        const categoryMatch =
          state.activeFilter === "all" ||
          getLegacyFacet(design) === state.activeFilter ||
          getFilterFacet(design) === state.activeFilter ||
          design.categoryKey === state.activeFilter ||
          (design.skillTags || []).includes(state.activeFilter);
        const secondaryMatch =
          state.secondaryFilter === "all" ||
          getSecondaryFacet(design) === state.secondaryFilter ||
          design.categoryKey === state.secondaryFilter;
        const tertiaryMatch =
          state.tertiaryFilter === "all" ||
          getTertiaryFacet(design) === state.tertiaryFilter ||
          design.surface === state.tertiaryFilter ||
          design.scenario === state.tertiaryFilter ||
          (design.skillTags || []).includes(state.tertiaryFilter);
        const favoriteMatch = !state.favoritesOnly || isFavorite(design.slug);
        const queryMatch = !query || searchBlob(design).includes(query);
        return categoryMatch && secondaryMatch && tertiaryMatch && favoriteMatch && queryMatch;
      });
    }

    function renderFilters() {
      const pool = getModePool(state.contentMode);
      const favoritesCount = pool.filter((design) => isFavorite(design.slug)).length;
      const allCount =
        state.contentMode === "prompt-template"
          ? getPromptAggregateTotal()
          : state.contentMode === "image-prompt-template"
            ? getImagePromptAggregateTotal()
          : isPromptMode(state.contentMode)
            ? promptModeMeta.get(state.contentMode)?.totalCases ||
              getModeStats(state.contentMode).totalDesigns
            : pool.length;
      const secondaryCounts = pool.reduce((accumulator, design) => {
        const facet = getSecondaryFacet(design);
        accumulator[facet] = (accumulator[facet] || 0) + 1;
        return accumulator;
      }, {});
      const secondaryPool = pool.filter(
        (design) =>
          state.secondaryFilter === "all" ||
          getSecondaryFacet(design) === state.secondaryFilter ||
          design.categoryKey === state.secondaryFilter
      );
      const tertiaryCounts = secondaryPool.reduce((accumulator, design) => {
        const facet = getTertiaryFacet(design);
        accumulator[facet] = (accumulator[facet] || 0) + 1;
        return accumulator;
      }, {});
      const orderedFacetKeys = [
        ...getAggregatePromptSourceKeys(state.contentMode),
        "awesome-gpt-image-2",
        "web",
        "ui",
        "mobile",
        "deck",
        "dashboard",
        "image",
        "video",
        "audio",
        "document",
        "design-system",
        "workflow",
        ...skillTagOrder,
        ...uiCategoryKeys,
        ...imagineCategoryKeys,
      ];
      const secondaryItems = [
        ...new Set([
          ...getAggregatePromptSourceKeys(state.contentMode).filter(
            (key) => secondaryCounts[key]
          ),
          ...(secondaryCounts["awesome-gpt-image-2"] ? ["awesome-gpt-image-2"] : []),
          ...uiCategoryKeys.filter((key) => secondaryCounts[key]),
          ...Object.keys(secondaryCounts).sort((a, b) =>
            getFilterLabel(a).localeCompare(getFilterLabel(b))
          ),
        ]),
      ].map((key) => ({
        key,
        label: `${getFilterLabel(key)} (${secondaryCounts[key] || 0})`,
        active: state.secondaryFilter === key && !state.favoritesOnly,
        className: "",
      }));
      const tertiaryItems = [
        ...new Set([
          ...orderedFacetKeys.filter((key) => tertiaryCounts[key]),
          ...Object.keys(tertiaryCounts).sort((a, b) =>
            getFilterLabel(a).localeCompare(getFilterLabel(b))
          ),
        ]),
      ].map((key) => ({
        key,
        label: `${getFilterLabel(key)} (${tertiaryCounts[key] || 0})`,
        active: state.tertiaryFilter === key && !state.favoritesOnly,
        className: "",
      }));
      const primaryItems = [
        {
          key: "all",
          label: t("filterAll", allCount),
          active:
            state.secondaryFilter === "all" &&
            state.tertiaryFilter === "all" &&
            !state.favoritesOnly,
          className: "",
        },
        {
          key: "favorites",
          label: t("filterFavorites", favoritesCount),
          active: state.favoritesOnly,
          className: "favorites-toggle",
        },
      ];

      const renderFilterButtons = (items, attr) =>
        items
          .map(
            (item) => `
              <button
                class="filter-btn ${item.className} ${item.active ? "active" : ""}"
                type="button"
                ${attr}="${escapeHTML(item.key)}"
              >
                ${escapeHTML(item.label)}
              </button>
            `
          )
          .join("");

      refs.filters.innerHTML = `
        <div class="filter-tier filter-tier-primary">
          <span class="filter-tier-label">${escapeHTML(
            getLanguage() === "en" ? "All" : "全部"
          )}</span>
          <div class="filter-tier-buttons">${renderFilterButtons(primaryItems, "data-filter")}</div>
        </div>
        <div class="filter-tier">
          <span class="filter-tier-label">${escapeHTML(
            getLanguage() === "en" ? "Original Tags" : "原始标签"
          )}</span>
          <div class="filter-tier-buttons">
            ${renderFilterButtons(
              [
                {
                  key: "all",
                  label: t("filterAll", pool.length),
                  active: state.secondaryFilter === "all" && !state.favoritesOnly,
                  className: "",
                },
                ...secondaryItems,
              ],
              "data-secondary-filter"
            )}
          </div>
        </div>
        <div class="filter-tier">
          <span class="filter-tier-label">${escapeHTML(
            getLanguage() === "en" ? "Supplement" : "补充标签"
          )}</span>
          <div class="filter-tier-buttons">
            ${renderFilterButtons(
              [
                {
                  key: "all",
                  label: t("filterAll", secondaryPool.length),
                  active: state.tertiaryFilter === "all" && !state.favoritesOnly,
                  className: "",
                },
                ...tertiaryItems,
              ],
              "data-tertiary-filter"
            )}
          </div>
        </div>
      `;
    }

    function renderFavoritesSection() {
      const modePool = getModePool(state.contentMode);
      const favorites = getFavoriteSlugs()
        .map((slug) => modePool.find((design) => design.slug === slug))
        .filter(Boolean);

      if (
        favorites.length > 0 &&
        state.activeFilter === "all" &&
        state.secondaryFilter === "all" &&
        state.tertiaryFilter === "all" &&
        !state.favoritesOnly &&
        !state.query
      ) {
        refs.favoritesSection.hidden = false;
        refs.favoritesCount.textContent = t("favoritesCount", favorites.length);
        refs.favoritesGrid.innerHTML = favorites.map(renderCard).join("");
        bindCardPreviewFrames(refs.favoritesGrid);
        return;
      }

      refs.favoritesSection.hidden = true;
      refs.favoritesGrid.innerHTML = "";
    }

    function renderPromptAutoLoadSentinel(totalVisible = 0) {
      if (!isPromptResourceMode(state.contentMode)) {
        return "";
      }

      const nextPage =
        state.contentMode === "prompt-template"
          ? getNextPromptSourcePage("prompt-template")
          : state.contentMode === "image-prompt-template"
            ? getNextPromptSourcePage("image-prompt-template")
            : getNextPromptPage(state.contentMode);
      if (!nextPage) {
        return "";
      }

      const meta = promptModeMeta.get(state.contentMode);
      const total =
        state.contentMode === "prompt-template"
          ? getPromptAggregateTotal()
          : meta?.totalCases || getModeStats(state.contentMode).totalDesigns;
      const loading =
        state.contentMode === "prompt-template"
          ? isPromptAggregateLoading("prompt-template")
          : state.contentMode === "image-prompt-template"
            ? isPromptAggregateLoading("image-prompt-template")
            : promptModeLoading.has(state.contentMode);
      return `
        <div
          class="grid-auto-load ${loading ? "is-loading" : ""}"
          data-auto-load-prompts
          data-loaded-count="${escapeHTML(String(totalVisible))}"
          data-total-count="${escapeHTML(String(total))}"
          aria-hidden="true"
        >
          <span>${escapeHTML(loading ? "Loading..." : "")}</span>
        </div>
      `;
    }

    function loadNextPromptPage() {
      if (!isPromptResourceMode(state.contentMode)) {
        return;
      }

      const nextPrompt =
        state.contentMode === "prompt-template"
          ? getNextPromptSourcePage("prompt-template")
          : state.contentMode === "image-prompt-template"
            ? getNextPromptSourcePage("image-prompt-template")
            : { mode: state.contentMode, page: getNextPromptPage(state.contentMode) };
      const mode = nextPrompt?.mode;
      const nextPage = nextPrompt?.page;
      if (!nextPage) {
        return;
      }
      if (promptModeLoading.has(mode)) {
        return;
      }

      promptModeLoading.add(mode);
      rerender();
      loadPromptModePage(mode, nextPage)
        .then(() => {
          renderStaticChrome();
          rerender();
        })
        .catch((error) => {
          console.warn(error);
        })
        .finally(() => {
          promptModeLoading.delete(mode);
          rerender();
        });
    }

    function maybeAutoLoadNextPromptPage() {
      if (!isPromptResourceMode(state.contentMode)) {
        return;
      }

      if (
        state.contentMode === "prompt-template" &&
        isPromptAggregateLoading("prompt-template")
      ) {
        return;
      }

      if (
        state.contentMode === "image-prompt-template" &&
        isPromptAggregateLoading("image-prompt-template")
      ) {
        return;
      }

      if (isPromptMode(state.contentMode) && promptModeLoading.has(state.contentMode)) {
        return;
      }

      const sentinel = refs.grid.querySelector("[data-auto-load-prompts]");
      if (!sentinel) {
        return;
      }

      const rect = sentinel.getBoundingClientRect();
      const preloadDistance = Math.max(window.innerHeight * 1.2, 720);
      if (rect.top <= window.innerHeight + preloadDistance) {
        loadNextPromptPage();
      }
    }

    function renderGrid() {
      state.visibleDesigns = getFilteredDesigns();
      const canLoadMorePrompts =
        isPromptResourceMode(state.contentMode) &&
        Boolean(
          state.contentMode === "prompt-template"
            ? getNextPromptSourcePage("prompt-template")
            : state.contentMode === "image-prompt-template"
              ? getNextPromptSourcePage("image-prompt-template")
              : getNextPromptPage(state.contentMode)
        );

      if (state.visibleDesigns.length === 0) {
        refs.grid.innerHTML = `
          ${
            canLoadMorePrompts
              ? ""
              : `
                <div class="empty-state">
                  <h2>${escapeHTML(t("emptyTitle"))}</h2>
                  <p>${escapeHTML(t("emptyBody"))}</p>
                </div>
              `
          }
          ${renderPromptAutoLoadSentinel(0)}
        `;
        window.requestAnimationFrame(maybeAutoLoadNextPromptPage);
        return;
      }

      refs.grid.innerHTML = [
        ...state.visibleDesigns.map(renderCard),
        renderPromptAutoLoadSentinel(state.visibleDesigns.length),
      ].join("");
      bindCardPreviewFrames(refs.grid);
      window.requestAnimationFrame(maybeAutoLoadNextPromptPage);
    }

    function renderImagineModal(design) {
      const category = getCategory(design.categoryKey);
      const favorite = isFavorite(design.slug);
      const prompt = design.imagine?.prompt || getLocalizedSummary(design);
      const tags = [
        ...(design.imagine?.styles || []),
        ...(design.imagine?.scenes || []),
      ];

      refs.modalShell.innerHTML = `
        <div class="modal-frame imagine-modal">
          <button class="modal-close" type="button" data-modal-close aria-label="${escapeHTML(
            t("close")
          )}">×</button>
          <div class="imagine-modal-image">
            ${renderImaginePrimaryMedia(design)}
          </div>
          <div class="modal-split">
            <div class="modal-content">
              <section class="modal-section">
                <span
                  class="modal-pill"
                  style="background:${category.bg};color:${category.text};border-color:${category.border};"
                >
                  # ${String(design.id).padStart(3, "0")} · ${escapeHTML(category.label)}
                </span>
                <h2 class="modal-title">${escapeHTML(localizedDesignName(design))}</h2>
                <p class="modal-summary">${escapeHTML(getLocalizedSummary(design))}</p>
                ${renderImagineMediaStrip(design)}
                <div class="modal-actions">
                  <button
                    class="modal-action"
                    type="button"
                    data-copy-command="${escapeHTML(prompt)}"
                    data-copy-label="${escapeHTML(t("copyPrompt"))}"
                  >
                    ${escapeHTML(t("copyPrompt"))}
                  </button>
                  <button
                    class="modal-action"
                    type="button"
                    data-favorite="${escapeHTML(design.slug)}"
                  >
                    ${escapeHTML(
                      favorite ? t("modalFavoriteOn") : t("modalFavoriteOff")
                    )}
                  </button>
                  ${
                    design.imagine?.githubUrl
                      ? `<a class="modal-action" href="${escapeHTML(
                          design.imagine.githubUrl
                        )}" target="_blank" rel="noopener">${escapeHTML(
                          t("githubSource")
                        )}</a>`
                      : ""
                  }
                  ${
                    design.sourceSite?.url
                      ? `<a class="modal-action" href="${escapeHTML(
                          design.sourceSite.url
                        )}" target="_blank" rel="noopener">${escapeHTML(
                          t("imageSource")
                        )}</a>`
                      : ""
                  }
                </div>
              </section>
              <section class="modal-section">
                <h3 class="modal-section-title">${escapeHTML(
                  t("promptSection")
                )}</h3>
                <p class="modal-summary imagine-prompt">${escapeHTML(prompt)}</p>
              </section>
            </div>
            <aside class="modal-sidebar">
              <article class="meta-card">
                <div class="meta-grid">
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(
                      t("metadataCategory")
                    )}</span>
                    <span class="meta-value">${escapeHTML(category.label)}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(t("imageSource"))}</span>
                    <span class="meta-value">${escapeHTML(sourceLabel(design))}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(t("fileAccess"))}</span>
                    <div class="card-files">
                      ${tags
                        .slice(0, 6)
                        .map((tag) => `<span class="file-pill">${escapeHTML(tag)}</span>`)
                        .join("")}
                    </div>
                  </div>
                </div>
              </article>
            </aside>
          </div>
        </div>
      `;

      refs.modalPrev.disabled = state.modalIndex <= 0;
      refs.modalNext.disabled = state.modalIndex >= state.modalPool.length - 1;
      refs.overlay.classList.add("open");
      refs.overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function renderModal() {
      const design = state.modalPool[state.modalIndex];
      if (!design) {
        return;
      }

      if (isImagineEntry(design)) {
        renderImagineModal(design);
        return;
      }

      const category = getCategory(design.categoryKey);
      const colors = (design.colors || []).slice(0, 4);
      const heroBg = `
        linear-gradient(135deg, ${hexToRgba(colors[0] || category.border, 0.24)}, ${hexToRgba(
          colors[1] || category.bg,
          0.32
        )}),
        ${category.bg}
      `;
      const favorite = isFavorite(design.slug);
      const overview = getLocalizedOverview(design).join("\n\n");
      const traits = getLocalizedTraits(design);

      refs.modalShell.innerHTML = `
        <div class="modal-frame">
          <button class="modal-close" type="button" data-modal-close aria-label="${escapeHTML(
            t("close")
          )}">×</button>
          <div class="modal-hero" style="background:${heroBg}">
            <span
              class="modal-pill"
              style="background:rgba(255,255,255,0.74);color:${category.text};border-color:${category.border};"
            >
              # ${String(design.id).padStart(2, "0")} · ${escapeHTML(category.label)}
            </span>
            <div class="modal-actions" style="margin-top:16px">
              <button
                class="detail-action"
                type="button"
                data-favorite="${escapeHTML(design.slug)}"
              >
                ${escapeHTML(
                  favorite ? t("modalFavoriteOn") : t("modalFavoriteOff")
                )}
              </button>
            </div>
            <h2 class="modal-title">${escapeHTML(localizedDesignName(design))}</h2>
            <p class="modal-summary">${escapeHTML(getLocalizedSummary(design))}</p>
            <div class="modal-actions">
              ${
                isSkillEntry(design)
                  ? `
                    ${renderCommandPanel(design, {
                      compact: true,
                      buttonClass: "modal-action",
                    })}
                  `
                  : `
                    <a class="modal-action" href="${detailHref(design.slug)}">${escapeHTML(
                      t("detailPage")
                    )}</a>
                    ${
                      design.files.preview
                        ? `<a class="modal-action" href="${escapeHTML(
                            design.files.preview
                          )}" target="_blank" rel="noopener">${escapeHTML(
                            t("lightPreview")
                          )}</a>`
                        : ""
                    }
                    ${
                      design.files.previewDark
                        ? `<a class="modal-action" href="${escapeHTML(
                            design.files.previewDark
                          )}" target="_blank" rel="noopener">${escapeHTML(
                            t("darkPreview")
                          )}</a>`
                        : ""
                    }
                    ${
                      design.files.design
                        ? `<a class="modal-action" href="${escapeHTML(
                            design.files.design
                          )}" target="_blank" rel="noopener">DESIGN.md</a>`
                        : ""
                    }
                  `
              }
            </div>
          </div>
          <div class="modal-split">
            <div class="modal-content">
              <section class="modal-section">
                <h3 class="modal-section-title">${escapeHTML(
                  t("summarySection")
                )}</h3>
                <p class="modal-summary">${escapeHTML(overview)}</p>
              </section>
              <section class="modal-section">
                <h3 class="modal-section-title">${escapeHTML(
                  t("traitsSection")
                )}</h3>
                <ul class="modal-list">
                  ${traits
                    .map((item) => `<li>${escapeHTML(item)}</li>`)
                    .join("")}
                </ul>
              </section>
            </div>
            <aside class="modal-sidebar">
              <article class="meta-card">
                <div class="meta-grid">
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(
                      isSkillEntry(design) ? t("skillAuthorLabel") : t("sourceSite")
                    )}</span>
                    <span class="meta-value">${
                      isSkillEntry(design)
                        ? design.skillAuthorUrl
                          ? `<a class="file-link" href="${escapeHTML(
                              design.skillAuthorUrl
                            )}" target="_blank" rel="noopener">${escapeHTML(
                              design.skillAuthor || sourceLabel(design)
                            )}</a>`
                          : escapeHTML(design.skillAuthor || sourceLabel(design))
                        : design.sourceSite?.url
                          ? `<a class="file-link" href="${escapeHTML(
                              design.sourceSite.url
                            )}" target="_blank" rel="noopener">${escapeHTML(
                              sourceLabel(design)
                            )}</a>`
                          : escapeHTML(sourceLabel(design))
                    }</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(
                      isSkillEntry(design) ? t("skillSourceLabel") : t("palette")
                    )}</span>
                    ${
                      isSkillEntry(design)
                        ? `<div class="file-list">${renderResourceLinks(design, {
                            includeAuthor: false,
                          })}</div>`
                        : `<div class="card-palette">${renderPaletteDots(colors, 4)}</div>`
                    }
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(
                      isSkillEntry(design) ? t("skillTagsLabel") : t("fileAccess")
                    )}</span>
                    <div class="${isSkillEntry(design) ? "card-files" : "card-files"}">${
                      isSkillEntry(design)
                        ? renderSkillTagPills(design)
                        : renderFilePills(design)
                    }</div>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(
                      getLanguage() === "en" ? "Resource Type" : "资源类型"
                    )}</span>
                    <span class="meta-value">${escapeHTML(getResourceTypeLabel(design))}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(
                      getLanguage() === "en" ? "Surface" : "产物形态"
                    )}</span>
                    <span class="meta-value">${escapeHTML(design.surface || "general")}</span>
                  </div>
                </div>
              </article>
            </aside>
          </div>
        </div>
      `;

      refs.modalPrev.disabled = state.modalIndex <= 0;
      refs.modalNext.disabled = state.modalIndex >= state.modalPool.length - 1;
      refs.overlay.classList.add("open");
      refs.overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function closeModal() {
      state.modalIndex = -1;
      state.modalPool = [];
      refs.overlay.classList.remove("open");
      refs.overlay.setAttribute("aria-hidden", "true");
      refs.modalShell.innerHTML = "";
      document.body.classList.remove("modal-open");
    }

    function openModal(slug) {
      hidePreviewPopover();
      const pool = state.visibleDesigns.length
        ? state.visibleDesigns
        : getModePool(state.contentMode);
      const index = pool.findIndex((design) => design.slug === slug);
      if (index === -1) {
        return;
      }

      state.modalPool = pool;
      state.modalIndex = index;
      renderModal();
    }

    function rerender() {
      hidePreviewPopover();
      renderFilters();
      renderFavoritesSection();
      renderGrid();
      if (state.modalIndex >= 0) {
        const current = state.modalPool[state.modalIndex];
        if (current) {
          const stillVisible = state.visibleDesigns.some(
            (design) => design.slug === current.slug
          );
          if (stillVisible) {
            openModal(current.slug);
          } else {
            closeModal();
          }
        }
      }
    }

    window.__vibeuiRenderHome = () => {
      renderStaticChrome();
      rerender();
    };

    refs.filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) {
        return;
      }

      const filter = button.dataset.filter;
      if (filter === "favorites") {
        state.favoritesOnly = !state.favoritesOnly;
        if (state.favoritesOnly) {
          state.activeFilter = "all";
          state.secondaryFilter = "all";
          state.tertiaryFilter = "all";
        }
      } else {
        state.activeFilter = filter;
        state.secondaryFilter = "all";
        state.tertiaryFilter = "all";
        state.favoritesOnly = false;
      }

      rerender();
    });

    refs.filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-secondary-filter]");
      if (!button) {
        return;
      }

      state.secondaryFilter = button.dataset.secondaryFilter || "all";
      state.tertiaryFilter = "all";
      state.activeFilter = "all";
      state.favoritesOnly = false;
      rerender();
    });

    refs.filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tertiary-filter]");
      if (!button) {
        return;
      }

      state.tertiaryFilter = button.dataset.tertiaryFilter || "all";
      state.activeFilter = "all";
      state.favoritesOnly = false;
      rerender();
    });

    refs.search.addEventListener("input", () => {
      state.query = refs.search.value.trim();
      rerender();
    });

    previewPopover.root.addEventListener("mouseenter", () => {
      clearPreviewHideTimer();
    });

    previewPopover.root.addEventListener("mouseleave", () => {
      schedulePreviewHide();
    });

    previewPopover.stage.addEventListener("click", () => {
      if (performance.now() - previewPopoverOpenedAt < 180) {
        return;
      }

      const href = previewPopover.root.dataset.detailHref;
      if (!href) {
        return;
      }

      hidePreviewPopover();
      window.location.assign(href);
    });

    previewPopover.stage.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const href = previewPopover.root.dataset.detailHref;
      if (!href) {
        return;
      }

      event.preventDefault();
      hidePreviewPopover();
      window.location.assign(href);
    });

    previewPopover.frame.addEventListener("load", () => {
      localizeEmbeddedFrame(previewPopover.frame);
      syncPreviewFrameHeight();
      updatePreviewPopoverMetrics();
      if (activePreviewButton) {
        positionPreviewPopover(activePreviewButton);
      }
    });

    document.addEventListener("click", (event) => {
      const langButton = event.target.closest("[data-lang-choice]");
      if (langButton) {
        event.preventDefault();
        setLanguage(langButton.dataset.langChoice);
        renderStaticChrome();
        rerender();
        return;
      }

      const modeButton = event.target.closest("[data-content-mode]");
      if (modeButton) {
        event.preventDefault();
        const requestedMode = modeButton.dataset.contentMode;
        const nextMode = resourceTypeMeta[requestedMode]
          ? requestedMode
          : defaultResourceType;
        if (state.contentMode !== nextMode) {
          state.contentMode = nextMode;
          state.activeFilter = "all";
          state.secondaryFilter = "all";
          state.tertiaryFilter = "all";
          state.favoritesOnly = false;
          renderStaticChrome();
          rerender();
          ensureResourceTypeLoaded(nextMode);
        }
        return;
      }

      const previewButton = event.target.closest("[data-card-preview]");
      if (previewButton) {
        event.preventDefault();
        showPreviewPopover(previewButton);
        return;
      }

      const copyButton = event.target.closest("[data-copy-command]");
      if (copyButton) {
        event.preventDefault();
        event.stopPropagation();
        copyCommandValue(copyButton.dataset.copyCommand)
          .then((copied) => {
            if (copied) {
              flashCopyButton(copyButton);
            }
          })
          .catch(() => {});
        return;
      }

      const favoriteButton = event.target.closest("[data-favorite]");
      if (favoriteButton) {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(favoriteButton.dataset.favorite);
        rerender();
        return;
      }

      const card = event.target.closest(".card[data-slug]");
      const interactiveTarget = event.target.closest(
        "a, button, input, select, textarea, summary"
      );
      if (card && !interactiveTarget) {
        openModal(card.dataset.slug);
        return;
      }

      if (event.target === refs.overlay || event.target.closest("[data-modal-close]")) {
        closeModal();
      }
    });

    document.addEventListener("mouseover", (event) => {
      const previewButton = event.target.closest("[data-card-preview]");
      if (!previewButton) {
        return;
      }

      showPreviewPopover(previewButton);
    });

    document.addEventListener("mouseout", (event) => {
      const previewButton = event.target.closest("[data-card-preview]");
      if (!previewButton || previewButton !== activePreviewButton) {
        return;
      }

      const relatedTarget = event.relatedTarget;
      if (
        relatedTarget &&
        (previewButton.contains(relatedTarget) ||
          previewPopover.root.contains(relatedTarget))
      ) {
        return;
      }

      schedulePreviewHide();
    });

    document.addEventListener("focusin", (event) => {
      const previewButton = event.target.closest("[data-card-preview]");
      if (!previewButton) {
        return;
      }

      showPreviewPopover(previewButton);
    });

    document.addEventListener("focusout", (event) => {
      const previewButton = event.target.closest("[data-card-preview]");
      if (!previewButton || previewButton !== activePreviewButton) {
        return;
      }

      const relatedTarget = event.relatedTarget;
      if (relatedTarget && previewPopover.root.contains(relatedTarget)) {
        return;
      }

      schedulePreviewHide();
    });

    refs.modalPrev.addEventListener("click", () => {
      if (state.modalIndex > 0) {
        state.modalIndex -= 1;
        renderModal();
      }
    });

    refs.modalNext.addEventListener("click", () => {
      if (state.modalIndex < state.modalPool.length - 1) {
        state.modalIndex += 1;
        renderModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        refs.search.focus();
        refs.search.select();
      }

      if (event.key === "Escape" && state.modalIndex >= 0) {
        closeModal();
      }

      if (event.key === "Escape" && activePreviewButton) {
        hidePreviewPopover();
      }

      if (state.modalIndex >= 0 && event.key === "ArrowLeft" && state.modalIndex > 0) {
        state.modalIndex -= 1;
        renderModal();
      }

      if (
        state.modalIndex >= 0 &&
        event.key === "ArrowRight" &&
        state.modalIndex < state.modalPool.length - 1
      ) {
        state.modalIndex += 1;
        renderModal();
      }
    });

    window.addEventListener(
      "scroll",
      () => {
        if (activePreviewButton) {
          positionPreviewPopover(activePreviewButton);
        }
        updateBackToTopButton();
        maybeAutoLoadNextPromptPage();
      },
      { passive: true }
    );

    window.addEventListener("resize", () => {
      if (activePreviewButton) {
        updatePreviewPopoverMetrics();
        positionPreviewPopover(activePreviewButton);
      }
      updateBackToTopButton();
      maybeAutoLoadNextPromptPage();
    });

    updatePreviewPopoverMetrics();
    updateBackToTopButton();
    renderStaticChrome();
    rerender();
    ensureResourceTypeLoaded(state.contentMode);
  }

  function renderRelated(design) {
    const related = designs
      .filter(
        (item) => item.slug !== design.slug && item.categoryKey === design.categoryKey
      )
      .slice(0, 4);

    if (related.length === 0) {
      return "";
    }

    return `
      <article class="detail-card">
        <h2 class="detail-card-title">${escapeHTML(t("relatedSection"))}</h2>
        <div class="related-grid">
          ${related
            .map(
              (item) => `
                <a class="related-card" href="${detailHref(item.slug)}">
                  <div class="related-card-name">${escapeHTML(
                    localizedDesignName(item)
                  )}</div>
                  <div class="related-card-desc">${escapeHTML(getLocalizedSummary(item))}</div>
                </a>
              `
            )
            .join("")}
        </div>
      </article>
    `;
  }

  function renderNotFound(layout) {
    layout.innerHTML = `
      <section class="detail-empty">
        <h1>${escapeHTML(t("detailNotFoundTitle"))}</h1>
        <p>${escapeHTML(t("detailNotFoundBody"))}</p>
        <p><a class="back-link" href="${indexHref()}">${escapeHTML(
          t("detailBack")
        )}</a></p>
      </section>
    `;
  }

  function initDetail() {
    const hero = document.getElementById("detail-hero");
    const layout = document.getElementById("detail-layout");
    const footerNote = document.getElementById("detail-footer-note");
    const slug = new URLSearchParams(window.location.search).get("slug");
    const design = designs.find((item) => item.slug === slug);

    setLanguage(getLanguage());

    if (!design) {
      function renderMissingPage() {
        document.title = t("homeDocumentTitle");
        document
          .querySelector('meta[name="description"]')
          ?.setAttribute("content", t("homeMetaDescription"));
        hero.innerHTML = `
          <div class="detail-topbar">
            <a class="back-link" href="${indexHref()}">${escapeHTML(t("detailBack"))}</a>
            ${renderLanguageSwitcher()}
          </div>
        `;
        footerNote.innerHTML = t("detailFooterNote");
        renderNotFound(layout);
      }

      document.addEventListener("click", (event) => {
        const langButton = event.target.closest("[data-lang-choice]");
        if (!langButton) {
          return;
        }

        event.preventDefault();
        setLanguage(langButton.dataset.langChoice);
        renderMissingPage();
      });

      renderMissingPage();
      return;
    }

    function localizePreviewFrame(frame) {
      if (getLanguage() !== "zh" || !frame?.contentDocument?.body) {
        return;
      }

      const doc = frame.contentDocument;
      const walker = doc.createTreeWalker(doc.body, doc.defaultView.NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const translated = translateContent(node.textContent);
        if (translated !== node.textContent) {
          node.textContent = translated;
        }
      }

      doc.querySelectorAll("[placeholder]").forEach((element) => {
        const translated = translateContent(element.getAttribute("placeholder"));
        if (translated !== element.getAttribute("placeholder")) {
          element.setAttribute("placeholder", translated);
        }
      });

      doc.querySelectorAll("[title]").forEach((element) => {
        const translated = translateContent(element.getAttribute("title"));
        if (translated !== element.getAttribute("title")) {
          element.setAttribute("title", translated);
        }
      });
    }

    function bindPreviewFrameTranslation() {
      const frame = document.getElementById("detail-preview-frame");
      if (!frame) {
        return;
      }

      frame.addEventListener("load", () => {
        localizePreviewFrame(frame);
      });

      if (frame.contentDocument?.readyState === "complete") {
        localizePreviewFrame(frame);
      }
    }

    function renderPage() {
      const index = designs.findIndex((item) => item.slug === design.slug);
      const previous = index > 0 ? designs[index - 1] : null;
      const next = index < designs.length - 1 ? designs[index + 1] : null;
      const category = getCategory(design.categoryKey);
      const colors = (design.colors || []).slice(0, 6);
      const sideBg = `
        linear-gradient(135deg, ${hexToRgba(
          colors[0] || category.border,
          0.24
        )}, ${hexToRgba(colors[1] || category.bg, 0.32)}),
        rgba(255,255,255,0.92)
      `;
      const preferredMode =
        getPreviewMode() === "dark" && design.files.previewDark ? "dark" : "light";
      const previewSrc =
        preferredMode === "dark" && design.files.previewDark
          ? design.files.previewDark
          : design.files.preview;
      const overviewParagraphs = getLocalizedOverview(design);
      const detailTraits = getLocalizedTraits(design);

      const displayName = localizedDesignName(design);
      document.title = t("detailDocumentTitle", displayName);
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          "content",
          isSkillEntry(design)
            ? t("skillDetailMetaDescription", displayName)
            : t("detailMetaDescription", displayName)
        );
      footerNote.innerHTML = isSkillEntry(design)
        ? t("skillDetailFooterNote")
        : t("detailFooterNote");

      hero.innerHTML = `
        <section class="detail-headline">
          <div class="detail-topbar">
            <a class="back-link" href="${indexHref()}">${escapeHTML(t("detailBack"))}</a>
            ${renderLanguageSwitcher()}
          </div>
          <div class="detail-kicker">${escapeHTML(t("detailKicker"))}</div>
          <h1 class="detail-title">${escapeHTML(displayName)}</h1>
          <p class="detail-summary">${escapeHTML(getLocalizedSummary(design))}</p>
          <div class="detail-chips">
            <span
              class="detail-chip"
              style="background:${category.bg};color:${category.text};border-color:${category.border};"
            >
              ${escapeHTML(category.label)}
            </span>
            <span class="detail-chip" style="background:rgba(255,255,255,0.78);color:var(--text-secondary);border-color:var(--border-strong);">
              # ${String(design.id).padStart(2, "0")}
            </span>
            <span class="detail-chip" style="background:rgba(255,255,255,0.78);color:var(--text-secondary);border-color:var(--border-strong);">
              ${escapeHTML(sourceLabel(design))}
            </span>
            <span class="detail-chip" style="background:rgba(255,255,255,0.78);color:var(--text-secondary);border-color:var(--border-strong);">
              ${escapeHTML(getResourceTypeLabel(design))}
            </span>
          </div>
          <div class="detail-actions">
            ${
              isSkillEntry(design)
                ? `
                  ${
                    design.skillLibraryUrl
                      ? `<a class="detail-action" href="${escapeHTML(
                          design.skillLibraryUrl
                        )}" target="_blank" rel="noopener">${escapeHTML(
                          t("skillLibraryLabel")
                        )}</a>`
                      : ""
                  }
                  ${
                    design.skillAuthorUrl
                      ? `<a class="detail-action" href="${escapeHTML(
                          design.skillAuthorUrl
                        )}" target="_blank" rel="noopener">${escapeHTML(
                          t("authorLink")
                        )}</a>`
                      : ""
                  }
                `
                : `
                  ${
                    design.files.preview
                      ? `<a class="detail-action" href="${escapeHTML(
                          design.files.preview
                        )}" target="_blank" rel="noopener">${escapeHTML(
                          t("lightPreview")
                        )}</a>`
                      : ""
                  }
                  ${
                    design.files.previewDark
                      ? `<a class="detail-action" href="${escapeHTML(
                          design.files.previewDark
                        )}" target="_blank" rel="noopener">${escapeHTML(
                          t("darkPreview")
                        )}</a>`
                      : ""
                  }
                  ${
                    design.files.design
                      ? `<a class="detail-action" href="${escapeHTML(
                          design.files.design
                        )}" target="_blank" rel="noopener">DESIGN.md</a>`
                      : ""
                  }
                  ${
                    design.files.readme
                      ? `<a class="detail-action" href="${escapeHTML(
                          design.files.readme
                        )}" target="_blank" rel="noopener">README</a>`
                      : ""
                  }
                `
            }
            ${
              design.sourceSite?.url
                ? `<a class="detail-action" href="${escapeHTML(
                    design.sourceSite.url
                  )}" target="_blank" rel="noopener">${escapeHTML(
                    t("originalSite")
                  )}</a>`
                : ""
            }
          </div>
          <div class="detail-nav-links">
            ${
              previous
                ? `<a class="nav-mini-link" href="${detailHref(
                    previous.slug
                  )}">${escapeHTML(
                    t("previousLink", localizedDesignName(previous))
                  )}</a>`
                : ""
            }
            ${
              next
                ? `<a class="nav-mini-link" href="${detailHref(
                    next.slug
                  )}">${escapeHTML(
                    t("nextLink", localizedDesignName(next))
                  )}</a>`
                : ""
            }
          </div>
        </section>
        <aside
          class="detail-sidecard"
          data-monogram="${escapeHTML(design.monogram)}"
          style="background:${sideBg}"
        >
          <div class="detail-sidecard-content">
            <div class="hero-panel-label">${escapeHTML(t("styleSnapshot"))}</div>
            <div class="detail-sidecard-title">${escapeHTML(category.label)}</div>
            <p class="hero-panel-quote">${escapeHTML(
              overviewParagraphs[0] || getLocalizedSummary(design)
            )}</p>
            <div class="card-palette">${renderPaletteDots(colors, 5)}</div>
          </div>
        </aside>
      `;

      layout.innerHTML = `
        <section class="detail-main">
          ${
            design.files.preview
              ? `
                <article class="detail-card">
                  <h2 class="detail-card-title">${escapeHTML(t("previewSection"))}</h2>
                  <div class="preview-toolbar">
                    <button
                      class="preview-toggle ${preferredMode === "light" ? "active" : ""}"
                      type="button"
                      data-preview-src="${escapeHTML(design.files.preview)}"
                      data-preview-frame="#detail-preview-frame"
                      data-preview-mode="light"
                    >
                      ${escapeHTML(t("lightPreview"))}
                    </button>
                    ${
                      design.files.previewDark
                        ? `
                          <button
                            class="preview-toggle ${preferredMode === "dark" ? "active" : ""}"
                            type="button"
                            data-preview-src="${escapeHTML(design.files.previewDark)}"
                            data-preview-frame="#detail-preview-frame"
                            data-preview-mode="dark"
                          >
                            ${escapeHTML(t("darkPreview"))}
                          </button>
                        `
                        : ""
                    }
                  </div>
                  <div class="preview-frame-wrap">
                    <iframe
                      class="preview-frame"
                      id="detail-preview-frame"
                      src="${escapeHTML(previewSrc)}"
                      title="${escapeHTML(localizedDesignName(design))} preview"
                      loading="lazy"
                    ></iframe>
                  </div>
                </article>
              `
              : `
                <article class="detail-card">
                  <div class="hero-panel-label">${escapeHTML(t("commandEyebrow"))}</div>
                  <h2 class="detail-card-title">${escapeHTML(t("commandTitle"))}</h2>
                  <p class="detail-summary">${escapeHTML(t("commandHint"))}</p>
                  ${renderCommandPanel(design)}
                </article>
              `
          }

          <article class="detail-card">
            <h2 class="detail-card-title">${escapeHTML(t("summarySection"))}</h2>
            <div class="detail-paragraphs">
              ${overviewParagraphs
                .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
                .join("")}
            </div>
            ${
              detailTraits.length
                ? `
                  <ul class="detail-list">
                    ${detailTraits
                      .map((item) => `<li>${escapeHTML(item)}</li>`)
                      .join("")}
                  </ul>
                `
                : ""
            }
          </article>

          ${renderRelated(design)}
        </section>

        <aside class="detail-sidebar">
          <article class="detail-card">
            <div class="hero-panel-label">${escapeHTML(t("paletteEyebrow"))}</div>
            <h2 class="detail-card-title">${escapeHTML(t("paletteTitle"))}</h2>
            <div class="swatch-grid">${renderSwatchRows(colors)}</div>
          </article>

          <article class="detail-card">
            <div class="hero-panel-label">${escapeHTML(
              t("typographyEyebrow")
            )}</div>
            <h2 class="detail-card-title">${escapeHTML(
              t("typographyTitle")
            )}</h2>
            <div class="font-stack">
              <div class="font-item">
                <span class="font-label">${escapeHTML(t("serif"))}</span>
                <span class="font-value">${escapeHTML(
                  design.fonts?.serif || t("notDeclared")
                )}</span>
              </div>
              <div class="font-item">
                <span class="font-label">${escapeHTML(t("sans"))}</span>
                <span class="font-value">${escapeHTML(
                  design.fonts?.sans || t("notDeclared")
                )}</span>
              </div>
              <div class="font-item">
                <span class="font-label">${escapeHTML(t("mono"))}</span>
                <span class="font-value">${escapeHTML(
                  design.fonts?.mono || t("notDeclared")
                )}</span>
              </div>
            </div>
          </article>

          <article class="detail-card">
            <div class="hero-panel-label">${escapeHTML(t("filesEyebrow"))}</div>
            <h2 class="detail-card-title">${escapeHTML(t("filesTitle"))}</h2>
            <div class="file-list">
              ${
                isSkillEntry(design)
                  ? renderResourceLinks(design)
                  : `
                    ${
                      design.files.readme
                        ? `<a class="file-link" href="${escapeHTML(
                            design.files.readme
                          )}" target="_blank" rel="noopener"><span>${escapeHTML(
                            t("readmeLabel")
                          )}</span><code>${escapeHTML(design.files.readme)}</code></a>`
                        : ""
                    }
                    ${
                      design.files.design
                        ? `<a class="file-link" href="${escapeHTML(
                            design.files.design
                          )}" target="_blank" rel="noopener"><span>${escapeHTML(
                            t("designLabel")
                          )}</span><code>${escapeHTML(design.files.design)}</code></a>`
                        : ""
                    }
                    ${
                      design.files.preview
                        ? `<a class="file-link" href="${escapeHTML(
                            design.files.preview
                          )}" target="_blank" rel="noopener"><span>${escapeHTML(
                            t("lightPreview")
                          )}</span><code>${escapeHTML(design.files.preview)}</code></a>`
                        : ""
                    }
                    ${
                      design.files.previewDark
                        ? `<a class="file-link" href="${escapeHTML(
                            design.files.previewDark
                          )}" target="_blank" rel="noopener"><span>${escapeHTML(
                            t("darkPreview")
                          )}</span><code>${escapeHTML(
                            design.files.previewDark
                          )}</code></a>`
                        : ""
                    }
                  `
              }
            </div>
          </article>

          <article class="detail-card">
            <div class="hero-panel-label">${escapeHTML(
              t("metadataEyebrow")
            )}</div>
            <h2 class="detail-card-title">${escapeHTML(
              t("metadataTitle")
            )}</h2>
            <div class="meta-grid">
              <div class="meta-item">
                <span class="meta-label">${escapeHTML(
                  t("metadataCategory")
                )}</span>
                <span class="meta-value">${escapeHTML(category.label)}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">${escapeHTML(
                  getLanguage() === "en" ? "Resource Type" : "资源类型"
                )}</span>
                <span class="meta-value">${escapeHTML(getResourceTypeLabel(design))}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">${escapeHTML(
                  getLanguage() === "en" ? "Surface" : "产物形态"
                )}</span>
                <span class="meta-value">${escapeHTML(design.surface || "general")}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">${escapeHTML(
                  t("metadataPreviewCount")
                )}</span>
                <span class="meta-value">${escapeHTML(
                  String(design.stats?.previewCount ?? 0)
                )}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">${escapeHTML(
                  t("metadataSourceDomain")
                )}</span>
                <span class="meta-value">${escapeHTML(sourceLabel(design))}</span>
              </div>
            </div>
          </article>
        </aside>
      `;

      bindPreviewFrameTranslation();
    }

    document.addEventListener("click", (event) => {
      const langButton = event.target.closest("[data-lang-choice]");
      if (langButton) {
        event.preventDefault();
        setLanguage(langButton.dataset.langChoice);
        renderPage();
        return;
      }

      const copyButton = event.target.closest("[data-copy-command]");
      if (copyButton) {
        event.preventDefault();
        copyCommandValue(copyButton.dataset.copyCommand)
          .then((copied) => {
            if (copied) {
              flashCopyButton(copyButton);
            }
          })
          .catch(() => {});
        return;
      }

      const button = event.target.closest("[data-preview-src]");
      if (!button) {
        return;
      }

      const frame = document.querySelector(button.dataset.previewFrame);
      if (!frame) {
        return;
      }

      frame.src = button.dataset.previewSrc;
      const toolbar = button.closest(".preview-toolbar");
      toolbar?.querySelectorAll(".preview-toggle").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      setPreviewMode(button.dataset.previewMode || "light");
    });

    renderPage();
  }

  if (page === "home") {
    initHome();
  }

  if (page === "detail") {
    initDetail();
  }
})();
