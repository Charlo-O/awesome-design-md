(function () {
  const designs = window.DESIGNS || [];
  const siteMeta = window.SITE_META || {};
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
        `<span class="hero-count-inline">${count}</span> 个<br><em>DESIGN.md 风格索引</em>`,
      homeHeroDesc:
        "从品牌风格、预览页和设计文档。点击任意框架查看详细UI风格。",
      statDesigns: "风格条目",
      statPreviews: "预览页面",
      statCategories: "分组类型",
      searchPlaceholder: "搜索品牌名、风格描述或关键词...",
      favoritesSection: "★ 我的常看",
      filterAll: (count) => `全部 (${count})`,
      filterFavorites: (count) => `只看收藏 (${count})`,
      resultsCount: (visible, total) => `${visible} / ${total}`,
      emptyTitle: "没有找到匹配的风格",
      emptyBody: "试试其他关键词，或者取消“只看收藏”筛选。",
      addFavoriteAria: "收藏",
      removeFavoriteAria: "取消收藏",
      modalFavoriteOn: "★ 已收藏",
      modalFavoriteOff: "☆ 收藏",
      close: "关闭",
      detailPage: "详情页",
      lightPreview: "浅色预览",
      darkPreview: "深色预览",
      summarySection: "风格摘要",
      traitsSection: "关键特征",
      sourceSite: "来源站点",
      palette: "调色板",
      fileAccess: "文件入口",
      homeFooterNote:
        '基于本地 <code>design-md/*</code> 资产构建的 <code>awesome-design-md</code> 索引站。',
      detailBack: "← 返回索引站",
      detailKicker: "设计详情",
      originalSite: "原站",
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
        "当前 <code>DESIGN.md</code> 条目的本地详情页。",
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
        `<span class="hero-count-inline">${count}</span><br><em>DESIGN.md Style Index</em>`,
      homeHeroDesc:
        "Browse brand styles, preview pages, and design documents. Open any item to inspect the detailed UI style.",
      statDesigns: "Design Entries",
      statPreviews: "Preview Pages",
      statCategories: "Categories",
      searchPlaceholder: "Search brand names, style notes, or keywords...",
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
      lightPreview: "Light Preview",
      darkPreview: "Dark Preview",
      summarySection: "Style Summary",
      traitsSection: "Key Characteristics",
      sourceSite: "Source Site",
      palette: "Palette",
      fileAccess: "File Access",
      homeFooterNote:
        'Built from local <code>design-md/*</code> assets inside <code>awesome-design-md</code>.',
      detailBack: "← Back to Index",
      detailKicker: "Design Detail",
      originalSite: "Original Site",
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
        'Local detail page for the current <code>DESIGN.md</code> entry.',
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
      labelZh: "AI 与机器学习",
      labelEn: "AI & Machine Learning",
      bg: "#e8f4ee",
      text: "#1a5a3e",
      border: "#c7ddcf",
    },
    dev: {
      labelZh: "开发工具与平台",
      labelEn: "Developer Tools & Platforms",
      bg: "#efe9fb",
      text: "#4a2f76",
      border: "#d2c3f0",
    },
    infra: {
      labelZh: "基础设施与云",
      labelEn: "Infrastructure & Cloud",
      bg: "#edf1f8",
      text: "#284b7b",
      border: "#c9d4e8",
    },
    design: {
      labelZh: "设计与生产力",
      labelEn: "Design & Productivity",
      bg: "#fdf2e7",
      text: "#8a5514",
      border: "#edd3b0",
    },
    finance: {
      labelZh: "金融与加密",
      labelEn: "Fintech & Crypto",
      bg: "#edf9f2",
      text: "#21603d",
      border: "#c8e4d2",
    },
    enterprise: {
      labelZh: "企业与消费",
      labelEn: "Enterprise & Consumer",
      bg: "#f8ebef",
      text: "#7f3551",
      border: "#e6c7d3",
    },
  };

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

  function getCategory(key) {
    const lang = getLanguage();
    const meta = categoryMeta[key];
    if (meta) {
      return {
        ...meta,
        label: lang === "en" ? meta.labelEn : meta.labelZh,
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

  function sourceLabel(design) {
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
      design.summary,
      translateContent(design.summary),
      design.categoryLabelZh,
      design.categoryLabelEn,
      ...(design.overview || []),
      ...translateList(design.overview || []),
      ...(design.keyCharacteristics || []),
      ...translateList(design.keyCharacteristics || []),
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

  function renderFilePills(design) {
    const pills = [t("readmeLabel"), "DESIGN", t("fileLightShort")];
    if (design.files.previewDark) {
      pills.push(t("fileDarkShort"));
    }

    return pills
      .map((pill) => `<span class="file-pill">${escapeHTML(pill)}</span>`)
      .join("");
  }

  function renderCard(design) {
    const category = getCategory(design.categoryKey);
    const colors = (design.colors || []).slice(0, 4);
    const tint = hexToRgba(colors[1] || colors[0] || category.border, 0.2);
    const favorite = isFavorite(design.slug);

    return `
      <article class="card" data-slug="${escapeHTML(design.slug)}" style="--card-soft:${tint}">
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
          <span># ${String(design.id).padStart(2, "0")}</span>
          <span>${escapeHTML(sourceLabel(design))}</span>
        </div>
        <div class="card-head">
          <div class="card-name">${escapeHTML(design.name)}</div>
          <span
            class="card-tag"
            style="background:${category.bg};color:${category.text};border-color:${category.border};"
          >
            ${escapeHTML(category.label)}
          </span>
        </div>
        <div class="card-desc">${escapeHTML(translateContent(design.summary))}</div>
        <div class="card-palette">${renderPaletteDots(colors, 4)}</div>
        <div class="card-files">${renderFilePills(design)}</div>
      </article>
    `;
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
      statPreviewsLabel: document.getElementById("stat-previews-label"),
      statCategoriesLabel: document.getElementById("stat-categories-label"),
      favoritesLabel: document.getElementById("favorites-label"),
      homeFooterNote: document.getElementById("home-footer-note"),
      homeLangSwitcher: document.getElementById("home-lang-switcher"),
    };

    const state = {
      activeFilter: "all",
      favoritesOnly: false,
      query: "",
      visibleDesigns: [],
      modalIndex: -1,
      modalPool: [],
    };

    setLanguage(getLanguage());

    document.getElementById("stat-designs").textContent = String(
      siteMeta.totalDesigns || designs.length
    );
    document.getElementById("stat-previews").textContent = String(
      siteMeta.totalPreviews ||
        designs.reduce((sum, design) => sum + (design.stats?.previewCount || 0), 0)
    );
    document.getElementById("stat-categories").textContent = String(
      siteMeta.totalCategories || Object.keys(categoryMeta).length
    );

    function renderStaticChrome() {
      document.title = t("homeDocumentTitle");
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", t("homeMetaDescription"));
      refs.homeHeroLabel.textContent = t("homeHeroLabel");
      refs.homeHeroTitle.innerHTML = t(
        "homeHeroTitle",
        siteMeta.totalDesigns || designs.length
      );
      refs.homeHeroDesc.innerHTML = t("homeHeroDesc");
      refs.statDesignsLabel.textContent = t("statDesigns");
      refs.statPreviewsLabel.textContent = t("statPreviews");
      refs.statCategoriesLabel.textContent = t("statCategories");
      refs.search.placeholder = t("searchPlaceholder");
      refs.favoritesLabel.textContent = t("favoritesSection");
      refs.homeFooterNote.innerHTML = t("homeFooterNote");
      refs.homeLangSwitcher.innerHTML = renderLanguageSwitcher();
      refs.modalPrev.setAttribute("aria-label", t("prevItem"));
      refs.modalNext.setAttribute("aria-label", t("nextItem"));
    }

    function getFilteredDesigns() {
      const query = state.query.trim().toLowerCase();
      return designs.filter((design) => {
        const categoryMatch =
          state.activeFilter === "all" || design.categoryKey === state.activeFilter;
        const favoriteMatch = !state.favoritesOnly || isFavorite(design.slug);
        const queryMatch = !query || searchBlob(design).includes(query);
        return categoryMatch && favoriteMatch && queryMatch;
      });
    }

    function renderFilters() {
      const favoritesCount = getFavoriteSlugs().length;
      const items = [
        {
          key: "all",
          label: t("filterAll", designs.length),
          active: state.activeFilter === "all" && !state.favoritesOnly,
          className: "",
        },
        ...Object.entries(categoryMeta).map(([key, meta]) => ({
          key,
          label: `${getCategory(key).label} (${designs.filter((design) => design.categoryKey === key).length})`,
          active: state.activeFilter === key && !state.favoritesOnly,
          className: "",
        })),
        {
          key: "favorites",
          label: t("filterFavorites", favoritesCount),
          active: state.favoritesOnly,
          className: "favorites-toggle",
        },
      ];

      refs.filters.innerHTML = items
        .map(
          (item) => `
            <button
              class="filter-btn ${item.className} ${item.active ? "active" : ""}"
              type="button"
              data-filter="${escapeHTML(item.key)}"
            >
              ${escapeHTML(item.label)}
            </button>
          `
        )
        .join("");
    }

    function renderFavoritesSection() {
      const favorites = getFavoriteSlugs()
        .map((slug) => designs.find((design) => design.slug === slug))
        .filter(Boolean);

      if (
        favorites.length > 0 &&
        state.activeFilter === "all" &&
        !state.favoritesOnly &&
        !state.query
      ) {
        refs.favoritesSection.hidden = false;
        refs.favoritesCount.textContent = t("favoritesCount", favorites.length);
        refs.favoritesGrid.innerHTML = favorites.map(renderCard).join("");
        return;
      }

      refs.favoritesSection.hidden = true;
      refs.favoritesGrid.innerHTML = "";
    }

    function renderGrid() {
      state.visibleDesigns = getFilteredDesigns();

      if (state.visibleDesigns.length === 0) {
        refs.grid.innerHTML = `
          <div class="empty-state">
            <h2>${escapeHTML(t("emptyTitle"))}</h2>
            <p>${escapeHTML(t("emptyBody"))}</p>
          </div>
        `;
        return;
      }

      refs.grid.innerHTML = state.visibleDesigns.map(renderCard).join("");
    }

    function renderModal() {
      const design = state.modalPool[state.modalIndex];
      if (!design) {
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
      const overview = design.overview?.length
        ? translateList(design.overview).join("\n\n")
        : translateContent(design.summary);

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
            <h2 class="modal-title">${escapeHTML(design.name)}</h2>
            <p class="modal-summary">${escapeHTML(
              translateContent(design.summary)
            )}</p>
            <div class="modal-actions">
              <a class="modal-action" href="${detailHref(design.slug)}">${escapeHTML(
                t("detailPage")
              )}</a>
              <a class="modal-action" href="${escapeHTML(design.files.preview)}" target="_blank" rel="noopener">${escapeHTML(
                t("lightPreview")
              )}</a>
              ${
                design.files.previewDark
                  ? `<a class="modal-action" href="${escapeHTML(
                      design.files.previewDark
                    )}" target="_blank" rel="noopener">${escapeHTML(
                      t("darkPreview")
                    )}</a>`
                  : ""
              }
              <a class="modal-action" href="${escapeHTML(design.files.design)}" target="_blank" rel="noopener">DESIGN.md</a>
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
                  ${translateList(design.keyCharacteristics || [])
                    .map((item) => `<li>${escapeHTML(item)}</li>`)
                    .join("")}
                </ul>
              </section>
            </div>
            <aside class="modal-sidebar">
              <article class="meta-card">
                <div class="meta-grid">
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(t("sourceSite"))}</span>
                    <span class="meta-value">${
                      design.sourceSite?.url
                        ? `<a class="file-link" href="${escapeHTML(
                            design.sourceSite.url
                          )}" target="_blank" rel="noopener">${escapeHTML(
                            sourceLabel(design)
                          )}</a>`
                        : escapeHTML(sourceLabel(design))
                    }</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(t("palette"))}</span>
                    <div class="card-palette">${renderPaletteDots(colors, 4)}</div>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">${escapeHTML(t("fileAccess"))}</span>
                    <div class="card-files">${renderFilePills(design)}</div>
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
      const pool = state.visibleDesigns.length ? state.visibleDesigns : designs;
      const index = pool.findIndex((design) => design.slug === slug);
      if (index === -1) {
        return;
      }

      state.modalPool = pool;
      state.modalIndex = index;
      renderModal();
    }

    function rerender() {
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
        }
      } else {
        state.activeFilter = filter;
        state.favoritesOnly = false;
      }

      rerender();
    });

    refs.search.addEventListener("input", () => {
      state.query = refs.search.value.trim();
      rerender();
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

      const favoriteButton = event.target.closest("[data-favorite]");
      if (favoriteButton) {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(favoriteButton.dataset.favorite);
        rerender();
        return;
      }

      const card = event.target.closest(".card[data-slug]");
      if (card) {
        openModal(card.dataset.slug);
        return;
      }

      if (event.target === refs.overlay || event.target.closest("[data-modal-close]")) {
        closeModal();
      }
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

    renderStaticChrome();
    rerender();
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
                  <div class="related-card-name">${escapeHTML(item.name)}</div>
                  <div class="related-card-desc">${escapeHTML(
                    translateContent(item.summary)
                  )}</div>
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

      document.title = t("detailDocumentTitle", design.name);
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", t("detailMetaDescription", design.name));
      footerNote.innerHTML = t("detailFooterNote");

      hero.innerHTML = `
        <section class="detail-headline">
          <div class="detail-topbar">
            <a class="back-link" href="${indexHref()}">${escapeHTML(t("detailBack"))}</a>
            ${renderLanguageSwitcher()}
          </div>
          <div class="detail-kicker">${escapeHTML(t("detailKicker"))}</div>
          <h1 class="detail-title">${escapeHTML(design.name)}</h1>
          <p class="detail-summary">${escapeHTML(
            translateContent(design.summary)
          )}</p>
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
          </div>
          <div class="detail-actions">
            <a class="detail-action" href="${escapeHTML(
              design.files.preview
            )}" target="_blank" rel="noopener">${escapeHTML(
        t("lightPreview")
      )}</a>
            ${
              design.files.previewDark
                ? `<a class="detail-action" href="${escapeHTML(
                    design.files.previewDark
                  )}" target="_blank" rel="noopener">${escapeHTML(
                    t("darkPreview")
                  )}</a>`
                : ""
            }
            <a class="detail-action" href="${escapeHTML(
              design.files.design
            )}" target="_blank" rel="noopener">DESIGN.md</a>
            <a class="detail-action" href="${escapeHTML(
              design.files.readme
            )}" target="_blank" rel="noopener">README</a>
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
                  )}">${escapeHTML(t("previousLink", previous.name))}</a>`
                : ""
            }
            ${
              next
                ? `<a class="nav-mini-link" href="${detailHref(next.slug)}">${escapeHTML(
                    t("nextLink", next.name)
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
              translateContent(design.overview?.[0] || design.summary)
            )}</p>
            <div class="card-palette">${renderPaletteDots(colors, 5)}</div>
          </div>
        </aside>
      `;

      layout.innerHTML = `
        <section class="detail-main">
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
                title="${escapeHTML(design.name)} preview"
                loading="lazy"
              ></iframe>
            </div>
          </article>

          <article class="detail-card">
            <h2 class="detail-card-title">${escapeHTML(t("summarySection"))}</h2>
            <div class="detail-paragraphs">
              ${translateList(design.overview || [design.summary])
                .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
                .join("")}
            </div>
            ${
              design.keyCharacteristics?.length
                ? `
                  <ul class="detail-list">
                    ${translateList(design.keyCharacteristics)
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
              <a class="file-link" href="${escapeHTML(
                design.files.readme
              )}" target="_blank" rel="noopener"><span>${escapeHTML(
        t("readmeLabel")
      )}</span><code>${escapeHTML(design.files.readme)}</code></a>
              <a class="file-link" href="${escapeHTML(
                design.files.design
              )}" target="_blank" rel="noopener"><span>${escapeHTML(
        t("designLabel")
      )}</span><code>${escapeHTML(design.files.design)}</code></a>
              <a class="file-link" href="${escapeHTML(
                design.files.preview
              )}" target="_blank" rel="noopener"><span>${escapeHTML(
        t("lightPreview")
      )}</span><code>${escapeHTML(design.files.preview)}</code></a>
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
                  t("metadataPreviewCount")
                )}</span>
                <span class="meta-value">${escapeHTML(
                  String(design.stats?.previewCount || 1)
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
