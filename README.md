# awesome-design-md

这是当前仓库的实际说明文档，不是上游 `VoltAgent/awesome-design-md` 的原始宣传页。

本仓库当前是一个本地化静态索引站，把两类设计资产汇总到同一个浏览入口里：

- `design-md/*` 中的 54 个站点级 DESIGN.md 条目
- `extra/uiuxskillProMax` 中导入的 58 个 UI/UX 风格模板

按当前已提交的生成结果，站点一共包含：

- 112 个风格条目
- 166 个预览页面
- 9 个分类

首页是 [index.html](./index.html)，详情页是 [style.html](./style.html)。站点支持中英文切换、搜索、分类筛选、收藏、首页预览弹窗和详情页浏览。

## 目录结构

| 路径 | 作用 |
| --- | --- |
| `design-md/` | 原始站点 DESIGN.md、README、浅色/深色预览 |
| `extra/uiuxskillProMax/` | UI/UX Pro Max 风格库及其静态资源 |
| `extra/uiuxskillProMax/generated/` | 为导入风格生成的本地 README / DESIGN.md |
| `site-assets/designs.js` | 站点数据，生成文件 |
| `site-assets/translations.js` | 中译文案映射，生成文件 |
| `site-assets/site.js` | 首页与详情页交互逻辑 |
| `site-assets/site.css` | 站点样式 |
| `scripts/build-index-site.mjs` | 汇总条目并生成 `site-assets/designs.js` |
| `scripts/build-translations.mjs` | 生成 `site-assets/translations.js` |

## 本地运行

这个项目没有 `package.json`，不需要安装 npm 依赖。它是一个纯静态站点，直接起本地静态服务器即可。

```powershell
cd F:\soft\vibeui\awesome-design-md
python -m http.server 4173
```

然后打开 [http://127.0.0.1:4173/](http://127.0.0.1:4173/)。

## 数据生成

如果你改了 `design-md/*`、根目录 `README.md` 里的主站点列表，或者 `extra/uiuxskillProMax` 相关资源，需要重新生成站点数据：

```powershell
node scripts/build-index-site.mjs
```

如果你改了英文文案，需要重新生成中文翻译映射：

```powershell
node scripts/build-translations.mjs
```

说明：

- `build-index-site.mjs` 只使用 Node 内置模块。
- `build-translations.mjs` 依赖本机可用的 `curl`，并需要联网访问翻译接口。
- 这两个脚本都会直接改写仓库里的生成文件。

## 真实数据来源

站点数据不是只来自一个来源。

### 1. 主站点条目

主站点条目来自 `design-md/*`，每个条目通常包含：

- `README.md`
- `DESIGN.md`
- `preview.html`
- `preview-dark.html`（如果存在）

这些条目会出现在 AI、开发工具、基础设施、设计生产、金融加密、企业消费这 6 个分类里。

### 2. UI/UX Pro Max 导入条目

导入条目来自 `extra/uiuxskillProMax/js/style-data.js` 和相关预览页面。构建脚本会：

- 读取 UI/UX Pro Max 风格数据
- 为每个风格在 `extra/uiuxskillProMax/generated/` 下生成本地 `README.md` 和 `DESIGN.md`
- 把这些风格并入索引站

这些导入条目会出现在：

- `General Style Templates`
- `Landing Page Templates`
- `Analytics Dashboard Templates`

## 维护约束

`scripts/build-index-site.mjs` 会解析本 README 中的“Primary Collection”部分来识别 `design-md/*` 的主站点条目。

这意味着：

- 可以修改本 README 的说明文字
- 但如果你改了 `Primary Collection` 下的分类标题或条目格式，也要同步调整 `scripts/build-index-site.mjs`
- 如果新增或删除 `design-md/*` 条目，应该同时更新该列表

## Primary Collection

这一节是构建脚本的输入之一。请保持以下两点稳定：

1. 分类标题必须保持当前英文名称
2. 条目格式必须保持 `- [**Name**](url) - summary`

导入自 UI/UX Pro Max 的 58 个风格不在这里手写维护，它们由脚本自动导入。

### AI & Machine Learning

- [**Claude**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/claude/) - Anthropic's AI assistant. Warm terracotta accent, clean editorial layout
- [**Cohere**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/cohere/) - Enterprise AI platform. Vibrant gradients, data-rich dashboard aesthetic
- [**ElevenLabs**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/elevenlabs/) - AI voice platform. Dark cinematic UI, audio-waveform aesthetics
- [**Minimax**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/minimax/) - AI model provider. Bold dark interface with neon accents
- [**Mistral AI**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/mistral.ai/) - Open-weight LLM provider. French-engineered minimalism, purple-toned
- [**Ollama**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/ollama/) - Run LLMs locally. Terminal-first, monochrome simplicity
- [**OpenCode AI**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/opencode.ai/) - AI coding platform. Developer-centric dark theme
- [**Replicate**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/replicate/) - Run ML models via API. Clean white canvas, code-forward
- [**RunwayML**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/runwayml/) - AI video generation. Cinematic dark UI, media-rich layout
- [**Together AI**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/together.ai/) - Open-source AI infrastructure. Technical, blueprint-style design
- [**VoltAgent**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/voltagent/) - AI agent framework. Void-black canvas, emerald accent, terminal-native
- [**xAI**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/x.ai/) - Elon Musk's AI lab. Stark monochrome, futuristic minimalism

### Developer Tools & Platforms

- [**Cursor**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/cursor/) - AI-first code editor. Sleek dark interface, gradient accents
- [**Expo**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/expo/) - React Native platform. Dark theme, tight letter-spacing, code-centric
- [**Linear**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/linear.app/) - Project management for engineers. Ultra-minimal, precise, purple accent
- [**Lovable**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/lovable/) - AI full-stack builder. Playful gradients, friendly dev aesthetic
- [**Mintlify**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/mintlify/) - Documentation platform. Clean, green-accented, reading-optimized
- [**PostHog**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/posthog/) - Product analytics. Playful hedgehog branding, developer-friendly dark UI
- [**Raycast**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/raycast/) - Productivity launcher. Sleek dark chrome, vibrant gradient accents
- [**Resend**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/resend/) - Email API for developers. Minimal dark theme, monospace accents
- [**Sentry**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/sentry/) - Error monitoring. Dark dashboard, data-dense, pink-purple accent
- [**Supabase**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/supabase/) - Open-source Firebase alternative. Dark emerald theme, code-first
- [**Superhuman**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/superhuman/) - Fast email client. Premium dark UI, keyboard-first, purple glow
- [**Vercel**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/vercel/) - Frontend deployment platform. Black and white precision, Geist font
- [**Warp**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/warp/) - Modern terminal. Dark IDE-like interface, block-based command UI
- [**Zapier**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/zapier/) - Automation platform. Warm orange, friendly illustration-driven

### Infrastructure & Cloud

- [**ClickHouse**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/clickhouse/) - Fast analytics database. Yellow-accented, technical documentation style
- [**Composio**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/composio/) - Tool integration platform. Modern dark with colorful integration icons
- [**HashiCorp**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/hashicorp/) - Infrastructure automation. Enterprise-clean, black and white
- [**MongoDB**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/mongodb/) - Document database. Green leaf branding, developer documentation focus
- [**Sanity**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/sanity/) - Headless CMS. Red accent, content-first editorial layout
- [**Stripe**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/stripe/) - Payment infrastructure. Signature purple gradients, weight-300 elegance

### Design & Productivity

- [**Airtable**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/airtable/) - Spreadsheet-database hybrid. Colorful, friendly, structured data aesthetic
- [**Cal.com**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/cal/) - Open-source scheduling. Clean neutral UI, developer-oriented simplicity
- [**Clay**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/clay/) - Creative agency. Organic shapes, soft gradients, art-directed layout
- [**Figma**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/figma/) - Collaborative design tool. Vibrant multi-color, playful yet professional
- [**Framer**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/framer/) - Website builder. Bold black and blue, motion-first, design-forward
- [**Intercom**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/intercom/) - Customer messaging. Friendly blue palette, conversational UI patterns
- [**Miro**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/miro/) - Visual collaboration. Bright yellow accent, infinite canvas aesthetic
- [**Notion**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/notion/) - All-in-one workspace. Warm minimalism, serif headings, soft surfaces
- [**Pinterest**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/pinterest/) - Visual discovery platform. Red accent, masonry grid, image-first
- [**Webflow**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/webflow/) - Visual web builder. Blue-accented, polished marketing site aesthetic

### Fintech & Crypto

- [**Coinbase**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/coinbase/) - Crypto exchange. Clean blue identity, trust-focused, institutional feel
- [**Kraken**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/kraken/) - Crypto trading platform. Purple-accented dark UI, data-dense dashboards
- [**Revolut**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/revolut/) - Digital banking. Sleek dark interface, gradient cards, fintech precision
- [**Wise**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/wise/) - International money transfer. Bright green accent, friendly and clear

### Enterprise & Consumer

- [**Airbnb**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/airbnb/) - Travel marketplace. Warm coral accent, photography-driven, rounded UI
- [**Apple**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/apple/) - Consumer electronics. Premium white space, SF Pro, cinematic imagery
- [**BMW**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/bmw/) - Luxury automotive. Dark premium surfaces, precise German engineering aesthetic
- [**IBM**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/ibm/) - Enterprise technology. Carbon design system, structured blue palette
- [**NVIDIA**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/nvidia/) - GPU computing. Green-black energy, technical power aesthetic
- [**SpaceX**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/spacex/) - Space technology. Stark black and white, full-bleed imagery, futuristic
- [**Spotify**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/spotify/) - Music streaming. Vibrant green on dark, bold type, album-art-driven
- [**Uber**](https://github.com/Charlo-O/awesome-design-md/tree/main/design-md/uber/) - Mobility platform. Bold black and white, tight type, urban energy

## License

MIT，见 [LICENSE](./LICENSE)。

仓库中收录的 DESIGN.md、预览页和样式信息主要用于本地浏览、设计分析和 AI 生成参考。原始品牌视觉资产归各自品牌所有。
