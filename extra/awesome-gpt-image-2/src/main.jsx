import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Search,
  Sparkles,
  WandSparkles
} from 'lucide-react';
import './styles.css';

const fallbackRepoUrl = 'https://github.com/freestylefly/awesome-gpt-image-2';

const copy = {
  en: {
    loading: 'Loading GPT-Image2 cases...',
    brand: 'GPT-Image2 Gallery',
    navCases: 'Cases',
    navTemplates: 'Templates',
    eyebrow: 'Live GPT-Image2 prompt gallery',
    title: 'From viral images to reusable prompts.',
    subtitle:
      'A visual front door for the awesome-gpt-image-2 repository: copy production-ready prompts, filter by style or scene, and jump straight into the GitHub source.',
    explore: 'Explore cases',
    githubProject: 'GitHub project',
    cases: 'cases',
    categories: 'categories',
    templates: 'templates',
    sectionEyebrow: 'Copy, filter, remix',
    sectionTitle: 'Viral cases with prompts one click away.',
    templateEyebrow: '20+ industrial prompt templates',
    templateTitle: 'Start from a proven template, then remix the case library.',
    templateSubtitle:
      'Each template is distilled from real GPT-Image2 examples and includes structure, constraints, and pitfalls for production use.',
    templateKind: 'Prompt Template',
    openTemplate: 'Open Template',
    search: 'Search cases, sources, prompts...',
    category: 'Category',
    style: 'Style',
    scene: 'Scene',
    all: 'All',
    matching: 'matching cases',
    openGithub: 'Open GitHub project',
    copied: 'Copied',
    copyPrompt: 'Copy Prompt',
    openOnGithub: 'Open on GitHub',
    limit: (count) => `Showing the first ${count} results for speed. Use search or filters to narrow the gallery.`
  },
  zh: {
    loading: '正在加载 GPT-Image2 案例...',
    brand: 'GPT-Image2 画廊',
    navCases: '案例',
    navTemplates: '模板',
    eyebrow: '实时更新的 GPT-Image2 提示词画廊',
    title: '从爆款图片，到可复用 Prompt。',
    subtitle:
      '这是 awesome-gpt-image-2 的可视化入口：复制可直接复用的 Prompt，按风格或场景筛选，并一键跳转到 GitHub 源项目。',
    explore: '浏览案例',
    githubProject: 'GitHub 项目',
    cases: '个案例',
    categories: '个分类',
    templates: '套模板',
    sectionEyebrow: '复制、筛选、复用',
    sectionTitle: '爆款案例和 Prompt，一键可取。',
    templateEyebrow: '20+ 套工业级提示词模板',
    templateTitle: '先用成熟模板起稿，再从案例库里继续 remix。',
    templateSubtitle:
      '每套模板都从真实 GPT-Image2 案例里提炼，包含结构、约束和防坑经验，适合生产流程直接复用。',
    templateKind: '提示词模板',
    openTemplate: '打开模板',
    search: '搜索案例、来源、Prompt...',
    category: '分类',
    style: '风格',
    scene: '场景',
    all: '全部',
    matching: '个匹配案例',
    openGithub: '打开 GitHub 项目',
    copied: '已复制',
    copyPrompt: '复制 Prompt',
    openOnGithub: '在 GitHub 打开',
    limit: (count) => `为了保证浏览速度，当前展示前 ${count} 条结果。可以用搜索或筛选缩小范围。`
  }
};

const templateCards = [
  {
    anchor: 'tpl-ui',
    cover: '/images/case17.jpg',
    en: ['UI Screenshot System', 'High-fidelity app, web, dashboard, and social interface prompts.'],
    zh: ['UI 截图系统', '生成 App、网页、仪表盘、社媒截图等高保真界面。']
  },
  {
    anchor: 'tpl-infographic',
    cover: '/images/case334.png',
    en: ['Infographic Engine', 'Structured diagrams, timelines, knowledge maps, and explainers.'],
    zh: ['信息图引擎', '生成结构化图解、时间线、知识图谱和技术解释图。']
  },
  {
    anchor: 'tpl-infographic',
    cover: '/images/case341.jpg',
    en: ['Scientific Scale Diagram', 'Multi-scale science visuals with readable labels and hierarchy.'],
    zh: ['科学尺度缩放图', '生成多尺度科学信息图，强调层级、标签和可读性。']
  },
  {
    anchor: 'tpl-poster',
    cover: '/images/case345.jpg',
    en: ['Poster Layout System', 'Event, product, movie, and social poster compositions.'],
    zh: ['海报排版系统', '生成活动、产品、电影和社媒传播海报。']
  },
  {
    anchor: 'tpl-poster',
    cover: '/images/case350.jpg',
    en: ['Sports Campaign Poster', 'Commercial sports visuals with athletes, props, and brand color.'],
    zh: ['运动商业 Campaign', '生成运动员、道具、品牌色统一的商业运动海报。']
  },
  {
    anchor: 'tpl-poster',
    cover: '/images/case355.jpg',
    en: ['Conceptual Typography Poster', 'Premium title-led posters with strong typographic systems.'],
    zh: ['概念字体海报', '生成以标题文字为主视觉的高级字体海报。']
  },
  {
    anchor: 'tpl-poster',
    cover: '/images/case359.jpg',
    en: ['Ink Double Exposure Poster', 'Chinese ink, portrait, and layered atmosphere composition.'],
    zh: ['水墨双重曝光海报', '生成水墨、人像与层叠氛围结合的视觉海报。']
  },
  {
    anchor: 'tpl-poster',
    cover: '/images/case339.jpg',
    en: ['Nature Science Poster', 'Minimal product-style science posters for natural subjects.'],
    zh: ['自然科普海报', '生成极简产品感自然科普海报。']
  },
  {
    anchor: 'tpl-product',
    cover: '/images/case373.jpg',
    en: ['Product Commerce Visual', 'Product shots, packaging, detail pages, and selling-point layouts.'],
    zh: ['商品商业视觉', '生成商品图、包装、详情页和卖点排版。']
  },
  {
    anchor: 'tpl-product',
    cover: '/images/case353.jpg',
    en: ['Personalized Beauty Report', 'Recommendation-report layouts for beauty and lifestyle products.'],
    zh: ['个性化美妆报告', '生成美妆与生活方式产品的推荐报告版式。']
  },
  {
    anchor: 'tpl-brand',
    cover: '/images/case354.jpg',
    en: ['Brand Identity Package', 'Logo, palette, typography, applications, and brand touchpoints.'],
    zh: ['品牌身份包', '生成 Logo、配色、字体、应用触点与品牌系统。']
  },
  {
    anchor: 'tpl-brand',
    cover: '/images/case362.jpg',
    en: ['Brand Touchpoint Board', 'Campaign boards across packaging, social, web, and display contexts.'],
    zh: ['品牌触点视觉板', '生成包装、社媒、网页和展示场景里的品牌触点板。']
  },
  {
    anchor: 'tpl-architecture',
    cover: '/images/case331.png',
    en: ['Architecture & Space', 'Interior, exterior, city, map, and spatial concept visuals.'],
    zh: ['建筑与空间', '生成室内、建筑、城市地图和空间概念视觉。']
  },
  {
    anchor: 'tpl-photo',
    cover: '/images/case377.jpg',
    en: ['Realistic Photography', 'Lens, lighting, film texture, and documentary-style photo prompts.'],
    zh: ['写实摄影', '控制镜头、光线、胶片质感和纪实摄影效果。']
  },
  {
    anchor: 'tpl-photo',
    cover: '/images/case376.jpg',
    en: ['Street Accident Moment', 'Realistic phone-photo scenes with negative constraints.'],
    zh: ['街头意外瞬间摄影', '生成手机纪实风街头瞬间，并加入负面约束。']
  },
  {
    anchor: 'tpl-illustration',
    cover: '/images/case346.jpg',
    en: ['Illustration & Art Style', 'Anime, watercolor, ink, material experiments, and art direction.'],
    zh: ['插画与艺术风格', '生成动漫、水彩、水墨、材质实验和艺术风格图。']
  },
  {
    anchor: 'tpl-character',
    cover: '/images/case347.jpg',
    en: ['Character Design Sheet', 'Characters, pose sheets, action grids, and identity consistency.'],
    zh: ['角色设定表', '生成角色设定、动作分解和一致性参考。']
  },
  {
    anchor: 'tpl-character',
    cover: '/images/case378.jpg',
    en: ['3D Collectible Toy', 'Reference photo to premium 3D collectible figure prompts.'],
    zh: ['3D 收藏玩具', '把参考图转换成高级 3D 收藏玩具效果。']
  },
  {
    anchor: 'tpl-scene',
    cover: '/images/case330.png',
    en: ['Scene Storytelling', 'Storyboards, worldbuilding, narrative scenes, and emotional pacing.'],
    zh: ['场景叙事', '生成分镜、世界观、故事场景和情绪节奏。']
  },
  {
    anchor: 'tpl-history',
    cover: '/images/case375.jpg',
    en: ['History & Classical Themes', 'Dynasty clothing, scroll narrative, poetry, and traditional motifs.'],
    zh: ['历史与古风题材', '生成朝代服饰、长卷叙事、诗词和传统题材。']
  },
  {
    anchor: 'tpl-document',
    cover: '/images/case360.jpg',
    en: ['Document & Publishing', 'White papers, manuals, encyclopedic plates, and page systems.'],
    zh: ['文档与出版物', '生成白皮书、手册、百科图鉴和页面系统。']
  },
  {
    anchor: 'tpl-other',
    cover: '/images/case370.jpg',
    en: ['Concept Product Breakdown', 'R&D boards, exploded views, mixed tasks, and special outputs.'],
    zh: ['概念产品研发拆解', '生成研发板、拆解图、混合任务和特殊输出。']
  }
];

const labelMap = {
  zh: {
    'Architecture & Spaces': '建筑与空间',
    Architecture: '建筑',
    Brand: '品牌',
    'Brand & Logos': '品牌与标志',
    Character: '角色',
    Characters: '人物',
    'Characters & People': '人物与角色',
    Charts: '图表',
    'Charts & Infographics': '图表与信息可视化',
    Classical: '古典',
    Commerce: '商业',
    Creative: '创意',
    Documents: '文档',
    'Documents & Publishing': '文档与出版物',
    Education: '教育',
    Fashion: '时尚',
    Food: '食品饮品',
    History: '历史',
    'History & Classical Themes': '历史与古风题材',
    Illustration: '插画',
    'Illustration & Art': '插画与艺术',
    Infographic: '信息图',
    'Other Use Cases': '其他应用场景',
    Photography: '摄影',
    'Photography & Realism': '摄影与写实',
    Poster: '海报',
    'Posters & Typography': '海报与排版',
    Product: '商品',
    Products: '商品',
    'Products & E-commerce': '商品与电商',
    Realistic: '写实',
    Scenes: '场景',
    'Scenes & Storytelling': '场景与叙事',
    Social: '社媒',
    Story: '叙事',
    Tech: '科技',
    Travel: '旅行',
    UI: '界面',
    'UI & Interfaces': 'UI 与界面'
  }
};

const templateVisuals = {
  'tpl-ui': {
    cover: '/images/category-covers/ui.jpg',
    category: 'UI & Interfaces',
    tags: ['UI', 'Dashboard', 'Screenshot']
  },
  'tpl-infographic': {
    cover: '/images/category-covers/infographic.jpg',
    category: 'Charts & Infographics',
    tags: ['Infographic', 'Chart', 'Education']
  },
  'tpl-poster': {
    cover: '/images/category-covers/poster.jpg',
    category: 'Posters & Typography',
    tags: ['Poster', 'Typography', 'Campaign']
  },
  'tpl-product': {
    cover: '/images/category-covers/product.jpg',
    category: 'Products & E-commerce',
    tags: ['Product', 'Commerce', 'Packaging']
  },
  'tpl-brand': {
    cover: '/images/category-covers/brand.jpg',
    category: 'Brand & Logos',
    tags: ['Brand', 'Logo', 'Identity']
  },
  'tpl-architecture': {
    cover: '/images/category-covers/architecture.jpg',
    category: 'Architecture & Spaces',
    tags: ['Architecture', 'Interior', 'Map']
  },
  'tpl-photo': {
    cover: '/images/category-covers/photo.jpg',
    category: 'Photography & Realism',
    tags: ['Photography', 'Realistic', 'Lens']
  },
  'tpl-illustration': {
    cover: '/images/category-covers/illustration.jpg',
    category: 'Illustration & Art',
    tags: ['Illustration', 'Art', 'Style']
  },
  'tpl-character': {
    cover: '/images/category-covers/character.jpg',
    category: 'Characters & People',
    tags: ['Character', 'Pose', '3D']
  },
  'tpl-scene': {
    cover: '/images/category-covers/scene.jpg',
    category: 'Scenes & Storytelling',
    tags: ['Scene', 'Story', 'Storyboard']
  },
  'tpl-history': {
    cover: '/images/category-covers/history.jpg',
    category: 'History & Classical Themes',
    tags: ['History', 'Classical', 'Scroll']
  },
  'tpl-document': {
    cover: '/images/category-covers/document.jpg',
    category: 'Documents & Publishing',
    tags: ['Document', 'Publishing', 'Layout']
  },
  'tpl-other': {
    cover: '/images/category-covers/other.jpg',
    category: 'Other Use Cases',
    tags: ['Creative', 'R&D', 'Special']
  }
};

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function localizeLabel(value, language) {
  return labelMap[language]?.[value] || value;
}

function localizeTemplateTag(value, language) {
  const zhTags = {
    Art: '艺术',
    Campaign: '商业 Campaign',
    Chart: '图表',
    Classical: '古典',
    Creative: '创意',
    Dashboard: '仪表盘',
    Document: '文档',
    Education: '教育',
    Identity: '身份系统',
    Interior: '室内',
    Layout: '版式',
    Lens: '镜头',
    Logo: 'Logo',
    Map: '地图',
    Packaging: '包装',
    Pose: '动作',
    Publishing: '出版',
    'R&D': '研发',
    Scene: '场景',
    Screenshot: '截图',
    Scroll: '长卷',
    Special: '特殊输出',
    Storyboard: '分镜',
    Style: '风格',
    Typography: '字体'
  };
  return language === 'zh' ? zhTags[value] || localizeLabel(value, language) : value;
}

function useCopy() {
  const [copiedId, setCopiedId] = useState(null);

  async function copyPrompt(caseItem) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(caseItem.prompt);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = caseItem.prompt;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(caseItem.id);
    window.setTimeout(() => setCopiedId(null), 1600);
  }

  return { copiedId, copyPrompt };
}

function Hero({ hotCases, language, repoUrl, totalCases, categoryCount }) {
  const t = copy[language];

  return (
    <section className="hero">
      <div className="heroGlow heroGlowA" />
      <div className="heroGlow heroGlowB" />
      <div className="scanGrid" />
      <div className="heroCopy">
        <div className="eyebrow">
          <Sparkles size={16} />
          {t.eyebrow}
        </div>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div className="heroActions">
          <a className="primaryAction" href="#gallery">
            {t.explore}
            <ArrowUpRight size={18} />
          </a>
          <a className="secondaryAction" href={repoUrl} target="_blank" rel="noreferrer">
            <Github size={18} />
            {t.githubProject}
          </a>
        </div>
        <div className="metrics">
          <span><strong>{totalCases}</strong> {t.cases}</span>
          <span><strong>{categoryCount}</strong> {t.categories}</span>
          <span><strong>20+</strong> {t.templates}</span>
        </div>
      </div>
      <div className="heroDeck" aria-label="Featured GPT-Image2 cases">
        {hotCases.slice(0, 5).map((caseItem, index) => (
          <a
            className={`heroCard heroCard${index + 1}`}
            href={caseItem.githubUrl}
            target="_blank"
            rel="noreferrer"
            key={caseItem.id}
          >
            <img src={caseItem.image} alt={caseItem.imageAlt} />
            <span>{language === 'zh' ? '案例' : 'Case'} {caseItem.id}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function FilterPill({ active, children, onClick }) {
  return (
    <button className={cx('filterPill', active && 'active')} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function LanguageSwitch({ language, setLanguage }) {
  return (
    <div className="languageSwitch" aria-label="Language switcher">
      <button
        className={cx(language === 'en' && 'active')}
        type="button"
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        className={cx(language === 'zh' && 'active')}
        type="button"
        onClick={() => setLanguage('zh')}
      >
        中文
      </button>
    </div>
  );
}

function TemplateSection({ language }) {
  const t = copy[language];
  const repoDocsUrl = `${fallbackRepoUrl}/blob/main/docs/templates.md`;

  return (
    <section className="templateSection" id="templates">
      <div className="sectionHead templateHead">
        <div>
          <span className="eyebrow">{t.templateEyebrow}</span>
          <h2>{t.templateTitle}</h2>
          <p>{t.templateSubtitle}</p>
        </div>
        <a className="templateCta" href={`${repoDocsUrl}#section-templates`} target="_blank" rel="noreferrer">
          {t.openTemplate}
          <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="caseGrid templateCaseGrid">
        {templateCards.map((item, index) => {
          const [title, description] = item[language];
          const visual = templateVisuals[item.anchor] || templateVisuals['tpl-other'];
          const cover = item.cover || visual.cover;
          return (
            <article className="caseCard templateVisualCard" key={`${item.anchor}-${title}`}>
              <a
                className="caseImage templateImage"
                href={`${repoDocsUrl}#${item.anchor}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={cover} alt={title} loading="lazy" />
                <span className="caseBadge">
                  {language === 'zh' ? '模板' : 'Template'} {String(index + 1).padStart(2, '0')}
                </span>
              </a>
              <div className="caseBody">
                <div className="caseMeta">
                  <span>{t.templateKind}</span>
                  <span>{localizeLabel(visual.category, language)}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="tagRow">
                  {visual.tags.map((tag) => (
                    <span key={`${item.anchor}-${tag}`}>{localizeTemplateTag(tag, language)}</span>
                  ))}
                </div>
                <div className="cardActions singleAction">
                  <a href={`${repoDocsUrl}#${item.anchor}`} target="_blank" rel="noreferrer">
                    {t.openTemplate}
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PromptCard({ caseItem, copied, language, onCopy }) {
  const t = copy[language];
  const tags = [...new Set([...caseItem.styles, ...caseItem.scenes])].slice(0, 4);

  return (
    <article className="caseCard">
      <a className="caseImage" href={caseItem.githubUrl} target="_blank" rel="noreferrer">
        <img src={caseItem.image} alt={caseItem.imageAlt} loading="lazy" />
        <span className="caseBadge">{language === 'zh' ? '案例' : 'Case'} {caseItem.id}</span>
      </a>
      <div className="caseBody">
        <div className="caseMeta">
          <span>{localizeLabel(caseItem.category, language)}</span>
          {caseItem.sourceUrl ? (
            <a href={caseItem.sourceUrl} target="_blank" rel="noreferrer">
              {caseItem.sourceLabel}
            </a>
          ) : (
            <span>{caseItem.sourceLabel}</span>
          )}
        </div>
        <h3>{caseItem.title}</h3>
        <p>{caseItem.promptPreview}</p>
        <div className="tagRow">
          {tags.map((tag) => (
            <span key={`${caseItem.id}-${tag}`}>{localizeLabel(tag, language)}</span>
          ))}
        </div>
        <div className="cardActions">
          <button type="button" onClick={() => onCopy(caseItem)}>
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? t.copied : t.copyPrompt}
          </button>
          <a href={caseItem.githubUrl} target="_blank" rel="noreferrer" aria-label={t.openOnGithub}>
            <Github size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [siteData, setSiteData] = useState(null);
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [style, setStyle] = useState('All');
  const [scene, setScene] = useState('All');
  const { copiedId, copyPrompt } = useCopy();
  const repoUrl = siteData?.repository || fallbackRepoUrl;
  const t = copy[language];

  useEffect(() => {
    let cancelled = false;
    fetch('/cases.json')
      .then((response) => response.json())
      .then((payload) => {
        if (!cancelled) setSiteData(payload);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const hotCases = useMemo(() => {
    if (!siteData) return [];
    return [...siteData.cases]
      .filter((item) => item.featured)
      .sort((a, b) => b.id - a.id);
  }, [siteData]);

  const filteredCases = useMemo(() => {
    if (!siteData) return [];
    const q = query.trim().toLowerCase();
    return siteData.cases.filter((item) => {
      const matchQuery =
        !q ||
        `${item.id} ${item.title} ${item.category} ${item.prompt} ${item.sourceLabel}`
          .toLowerCase()
          .includes(q);
      const matchCategory = category === 'All' || item.category === category;
      const matchStyle = style === 'All' || item.styles.includes(style);
      const matchScene = scene === 'All' || item.scenes.includes(scene);
      return matchQuery && matchCategory && matchStyle && matchScene;
    });
  }, [siteData, query, category, style, scene]);

  const visibleCases = filteredCases.slice(0, 72);

  if (!siteData) {
    return (
      <main>
        <div className="loadingScreen">
          <WandSparkles size={28} />
          <span>{t.loading}</span>
        </div>
      </main>
    );
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#">
          <WandSparkles size={21} />
          {t.brand}
        </a>
        <div className="topbarControls">
          <nav>
            <a href="#templates">{t.navTemplates}</a>
            <a href="#gallery">{t.navCases}</a>
            <a href={repoUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
      </header>

      <Hero
        hotCases={hotCases}
        language={language}
        repoUrl={repoUrl}
        totalCases={siteData.totalCases}
        categoryCount={siteData.categories.length}
      />

      <section className="hotStrip">
        {hotCases.slice(0, 8).map((caseItem) => (
          <a href={caseItem.githubUrl} target="_blank" rel="noreferrer" key={caseItem.id}>
            <img src={caseItem.image} alt={caseItem.imageAlt} />
            <span>#{caseItem.id}</span>
          </a>
        ))}
      </section>

      <TemplateSection language={language} />

      <section className="gallerySection" id="gallery">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">{t.sectionEyebrow}</span>
            <h2>{t.sectionTitle}</h2>
          </div>
          <div className="searchBox">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search}
            />
          </div>
        </div>

        <div className="filterPanel">
          <div>
            <strong>{t.category}</strong>
            <div className="filterRow">
              <FilterPill active={category === 'All'} onClick={() => setCategory('All')}>{t.all}</FilterPill>
              {siteData.categories.map((item) => (
                <FilterPill key={item} active={category === item} onClick={() => setCategory(item)}>
                  {localizeLabel(item, language)}
                </FilterPill>
              ))}
            </div>
          </div>
          <div>
            <strong>{t.style}</strong>
            <div className="filterRow">
              <FilterPill active={style === 'All'} onClick={() => setStyle('All')}>{t.all}</FilterPill>
              {siteData.styles.map((item) => (
                <FilterPill key={item} active={style === item} onClick={() => setStyle(item)}>
                  {localizeLabel(item, language)}
                </FilterPill>
              ))}
            </div>
          </div>
          <div>
            <strong>{t.scene}</strong>
            <div className="filterRow">
              <FilterPill active={scene === 'All'} onClick={() => setScene('All')}>{t.all}</FilterPill>
              {siteData.scenes.map((item) => (
                <FilterPill key={item} active={scene === item} onClick={() => setScene(item)}>
                  {localizeLabel(item, language)}
                </FilterPill>
              ))}
            </div>
          </div>
        </div>

        <div className="resultBar">
          <span>{language === 'zh' ? `${filteredCases.length} ${t.matching}` : `${filteredCases.length} ${t.matching}`}</span>
          <a href={repoUrl} target="_blank" rel="noreferrer">
            {t.openGithub}
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="caseGrid">
          {visibleCases.map((caseItem) => (
            <PromptCard
              caseItem={caseItem}
              copied={copiedId === caseItem.id}
              language={language}
              onCopy={copyPrompt}
              key={caseItem.id}
            />
          ))}
        </div>

        {filteredCases.length > visibleCases.length && (
          <p className="limitNote">
            {t.limit(visibleCases.length)}
          </p>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
