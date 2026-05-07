<p align="center"><img src="./data/images/banner.svg" alt="GPT-Image2 Prompt System" width="800" /></p>

<h3 align="center">Prompt as Code | GPT-Image2 工业级提示词引擎与模板库，370+ 个案例逆向工程，20+ 套工业级模板</h3>

<p align="center">
  <a href="https://github.com/freestylefly/awesome-gpt-image-2"><img src="https://img.shields.io/github/stars/freestylefly/awesome-gpt-image-2?style=flat-square&color=rgb(25%2C%20121%2C%20255)" alt="Stars"></a>
  <a href="https://github.com/freestylefly/awesome-gpt-image-2"><img src="https://img.shields.io/github/forks/freestylefly/awesome-gpt-image-2?style=flat-square&color=green" alt="Forks"></a>
  <a href="https://github.com/freestylefly/awesome-gpt-image-2"><img src="https://img.shields.io/badge/Cases-378-blueviolet?style=flat-square" alt="Cases"></a>
  <a href="https://github.com/freestylefly/awesome-gpt-image-2"><img src="https://img.shields.io/badge/100%25-Original_AI_Rewritten-green?style=flat-square" alt="Original"></a>
</p>

<p align="center">
  <a href="./README.md">English</a> | <strong>简体中文</strong>
</p>

> 不定期更新最新的玩法，欢迎star。
> 本项目由 [词元 API](https://ciyuan.today/) 提供赞助支持。词元 API 是一个 AI 聚合平台，可以高性价比使用 GPT Image 2。

<a name="section-vision"></a>

## ⚡️ 项目愿景

GPT-Image2 全量开放后，AI 画图从“能不能出图”变成了“能不能稳定、可控、可复用地出图”。这个项目关注的是把零散案例逆向整理成一套更适合 Agent 和自动化工作流调用的 Prompt-as-Code 资产，而非单纯堆提示词。

核心目标只有一个：把“散文式提示词”压缩成“结构化协议”。当你需要批量出图、做模板系统、接进生产流程时，这种整理方式比单纯堆案例更有价值。

- 🧱 原子化 Schema：把主体、光影、材质、排版等视觉要素拆成可组合组件
- ⚙️ 工作流友好：面向 Agent、脚本和自动化系统，而不是只给人肉复制
- 🧬 结构化控制：尽量提高版式、文案、信息层级的可控性

## 📖 快速入口

- [完整案例总览](docs/gallery.md)
- [案例画廊 Part 1：例 1-165](docs/gallery-part-1.md)
- [案例画廊 Part 2：例 166-378](docs/gallery-part-2.md)
- [工业级提示词模板与防坑指南](docs/templates.md#section-templates)
- [MIT License](LICENSE)
- [完整声明页](docs/disclaimer.md#section-disclaimer)

## 🗂️ 分类概览

先看案例画册，快速找到你想参考的视觉类型；再看提示词模板，把对应类型拆成可复用结构。

### 🖼️ 案例分类画册

<table>
  <tr>
    <td width="33%" valign="top" align="center">
      <p><strong>🧩 UI与界面</strong><br><sub>68 cases</sub></p>
      <a href="docs/gallery.md#cat-ui"><img src="data/images/category-covers/ui.jpg" alt="UI与界面" width="220"></a><br>
      <sub>App、网页、仪表盘、社媒截图与产品界面。</sub><br>
      <a href="docs/gallery.md#cat-ui"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>📊 图表与信息可视化</strong><br><sub>55 cases</sub></p>
      <a href="docs/gallery.md#cat-infographic"><img src="data/images/category-covers/infographic.jpg" alt="图表与信息可视化" width="220"></a><br>
      <sub>信息图、知识图谱、技术解释与结构化图解。</sub><br>
      <a href="docs/gallery.md#cat-infographic"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>📰 海报与排版</strong><br><sub>71 cases</sub></p>
      <a href="docs/gallery.md#cat-poster"><img src="data/images/category-covers/poster.jpg" alt="海报与排版" width="220"></a><br>
      <sub>活动海报、封面、字体视觉和强排版画面。</sub><br>
      <a href="docs/gallery.md#cat-poster"><strong>查看案例</strong></a>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top" align="center">
      <p><strong>🛍️ 商品与电商</strong><br><sub>24 cases</sub></p>
      <a href="docs/gallery.md#cat-product"><img src="data/images/category-covers/product.jpg" alt="商品与电商" width="220"></a><br>
      <sub>商品图、详情页、包装卖点和商业广告。</sub><br>
      <a href="docs/gallery.md#cat-product"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>🏷️ 品牌与标志</strong><br><sub>19 cases</sub></p>
      <a href="docs/gallery.md#cat-brand"><img src="data/images/category-covers/brand.jpg" alt="品牌与标志" width="220"></a><br>
      <sub>Logo、VI、品牌触点和 Campaign 视觉系统。</sub><br>
      <a href="docs/gallery.md#cat-brand"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>🏛️ 建筑与空间</strong><br><sub>25 cases</sub></p>
      <a href="docs/gallery.md#cat-architecture"><img src="data/images/category-covers/architecture.jpg" alt="建筑与空间" width="220"></a><br>
      <sub>建筑表现、室内空间、城市地图和空间概念。</sub><br>
      <a href="docs/gallery.md#cat-architecture"><strong>查看案例</strong></a>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top" align="center">
      <p><strong>📷 摄影与写实</strong><br><sub>34 cases</sub></p>
      <a href="docs/gallery.md#cat-photo"><img src="data/images/category-covers/photo.jpg" alt="摄影与写实" width="220"></a><br>
      <sub>人像、手机纪实、胶片质感和商业摄影。</sub><br>
      <a href="docs/gallery.md#cat-photo"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>🎨 插画与艺术</strong><br><sub>25 cases</sub></p>
      <a href="docs/gallery.md#cat-illustration"><img src="data/images/category-covers/illustration.jpg" alt="插画与艺术" width="220"></a><br>
      <sub>插画、艺术风格、材质实验和装饰画面。</sub><br>
      <a href="docs/gallery.md#cat-illustration"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>🧍 人物与角色</strong><br><sub>14 cases</sub></p>
      <a href="docs/gallery.md#cat-character"><img src="data/images/category-covers/character.jpg" alt="人物与角色" width="220"></a><br>
      <sub>角色设定、动作参考、卡牌和 3D 玩具。</sub><br>
      <a href="docs/gallery.md#cat-character"><strong>查看案例</strong></a>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top" align="center">
      <p><strong>🎬 场景与叙事</strong><br><sub>7 cases</sub></p>
      <a href="docs/gallery.md#cat-scene"><img src="data/images/category-covers/scene.jpg" alt="场景与叙事" width="220"></a><br>
      <sub>分镜、故事场景、直播画面和世界观叙事。</sub><br>
      <a href="docs/gallery.md#cat-scene"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>🏮 历史与古风题材</strong><br><sub>9 cases</sub></p>
      <a href="docs/gallery.md#cat-history"><img src="data/images/category-covers/history.jpg" alt="历史与古风题材" width="220"></a><br>
      <sub>古风长卷、历史人物、传统题材和诗词画面。</sub><br>
      <a href="docs/gallery.md#cat-history"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>📚 文档与出版物</strong><br><sub>7 cases</sub></p>
      <a href="docs/gallery.md#cat-document"><img src="data/images/category-covers/document.jpg" alt="文档与出版物" width="220"></a><br>
      <sub>白皮书、手册、百科图鉴和出版页设计。</sub><br>
      <a href="docs/gallery.md#cat-document"><strong>查看案例</strong></a>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top" align="center">
      <p><strong>🧪 其他应用场景</strong><br><sub>20 cases</sub></p>
      <a href="docs/gallery.md#cat-other"><img src="data/images/category-covers/other.jpg" alt="其他应用场景" width="220"></a><br>
      <sub>创意实验、特殊任务、混合玩法和实用场景。</sub><br>
      <a href="docs/gallery.md#cat-other"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <h4>🖼️ 完整画廊</h4>
      <a href="docs/gallery.md"><img src="data/images/category-covers/gallery.jpg" alt="完整画廊" width="220"></a><br>
      <sub>按分册浏览全部 378 个案例和代表案例入口。</sub><br>
      <a href="docs/gallery.md"><strong>进入画廊</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <h4>⭐ 最新新增</h4>
      <a href="docs/gallery-part-2.md#case-378"><img src="data/images/category-covers/latest.jpg" alt="最新新增" width="220"></a><br>
      <sub>最近收录的 X 社区案例和新玩法。</sub><br>
      <a href="docs/gallery-part-2.md#case-378"><strong>查看最新</strong></a>
    </td>
  </tr>
</table>

### 🧩 提示词模板分类

<details open>
<summary><strong>模板 Page 1 / 4：设计与信息</strong></summary>

| 分类 | 模板入口 | 核心能力 |
|---|---|---|
| 🧩 UI与界面 | [查看提示词](docs/templates.md#tpl-ui) | 组件、页面层级、截图质感 |
| 📊 图表与信息可视化 | [查看提示词](docs/templates.md#tpl-infographic) | 模块、箭头、数据结构、可读性 |
| 📰 海报与排版 | [查看提示词](docs/templates.md#tpl-poster) | 版式、标题、人物和视觉冲击 |

</details>

<details>
<summary><strong>模板 Page 2 / 4：商业与空间</strong></summary>

| 分类 | 模板入口 | 核心能力 |
|---|---|---|
| 🛍️ 商品与电商 | [查看提示词](docs/templates.md#tpl-product) | 产品卖点、包装、详情页结构 |
| 🏷️ 品牌与标志 | [查看提示词](docs/templates.md#tpl-brand) | Logo、品牌身份、触点系统 |
| 🏛️ 建筑与空间 | [查看提示词](docs/templates.md#tpl-architecture) | 透视、材质、室内外光线 |

</details>

<details>
<summary><strong>模板 Page 3 / 4：影像与角色</strong></summary>

| 分类 | 模板入口 | 核心能力 |
|---|---|---|
| 📷 摄影与写实 | [查看提示词](docs/templates.md#tpl-photo) | 镜头、光线、真实纹理 |
| 🎨 插画与艺术 | [查看提示词](docs/templates.md#tpl-illustration) | 笔触、材质、艺术风格 |
| 🧍 人物与角色 | [查看提示词](docs/templates.md#tpl-character) | 人设、动作表、角色一致性 |

</details>

<details>
<summary><strong>模板 Page 4 / 4：叙事与扩展</strong></summary>

| 分类 | 模板入口 | 核心能力 |
|---|---|---|
| 🎬 场景与叙事 | [查看提示词](docs/templates.md#tpl-scene) | 分镜、世界观、情绪铺陈 |
| 🏮 历史与古风题材 | [查看提示词](docs/templates.md#tpl-history) | 朝代、服饰、长卷叙事 |
| 📚 文档与出版物 | [查看提示词](docs/templates.md#tpl-document) | 页面系统、目录、版面规范 |
| 🧪 其他应用场景 | [查看提示词](docs/templates.md#tpl-other) | 混合任务、实验玩法、特殊输出 |

</details>

<a name="section-gallery"></a>

## 🖼️ 首页精选

### 例 1：信息图可视化设计

[![城市生命系统图谱 / Urban Metabolism Atlas](data/images/case1.jpg)](docs/gallery-part-1.md#case-1)

工程白皮书气质的信息图案例，适合看结构化信息图如何组织模块、层级和双语标签。
[查看完整案例](docs/gallery-part-1.md#case-1)

### 例 2：社媒界面截图

[![Ailln AI](data/images/case2.jpg)](docs/gallery-part-1.md#case-2)

偏“产品界面 + 社媒内容截图”的混合场景，适合看文字区域、UI 框架和内容卡片的控制方式。
[查看完整案例](docs/gallery-part-1.md#case-2)

### 例 6：插画艺术创作图

[![参考图是角色人设图，为参考图的少女绘制一副日系唯美奇幻风格插画](data/images/case6.jpg)](docs/gallery-part-1.md#case-6)

日系奇幻插画范例，适合观察氛围、色彩和大场景构图的描述方式。
[查看完整案例](docs/gallery-part-1.md#case-6)

### 例 17：界面交互设计图

[![type](data/images/case17.jpg)](docs/gallery-part-1.md#case-17)

典型的“结构分解图 + 说明排版”场景，适合做产品示意图、海报化技术讲解图。
[查看完整案例](docs/gallery-part-1.md#case-17)

### 例 166：十二黄金圣斗士卡牌合集

[![十二黄金圣斗士卡牌合集](data/images/case166.jpg)](docs/gallery-part-2.md#case-166)

多卡面、多元素统一风格的案例，适合参考批量生成与系列化设计。
[查看完整案例](docs/gallery-part-2.md#case-166)

### 例 310：零食品牌技术分解图

[![零食品牌技术分解图](data/images/case310.jpg)](docs/gallery-part-2.md#case-310)

品牌叙事、分解结构和商业化呈现结合得比较完整，适合作为“信息图 + 品牌视觉”混合参考。
[查看完整案例](docs/gallery-part-2.md#case-310)

### 苍何新增实测

<table>
  <tr>
    <td width="33%" valign="top" align="center">
      <p><strong>例 330：月下美女直播画面</strong></p>
      <a href="docs/gallery-part-2.md#case-330"><img src="data/images/category-covers/scene.jpg" alt="月下美女直播画面" width="220"></a><br>
      <sub>高仿直播截图，适合参考界面氛围、弹幕和人物写实结合。</sub><br>
      <a href="docs/gallery-part-2.md#case-330"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>例 334：RAG 技术详解图</strong></p>
      <a href="docs/gallery-part-2.md#case-334"><img src="data/images/category-covers/infographic.jpg" alt="RAG 技术详解图" width="220"></a><br>
      <sub>技术概念、流程箭头和中文说明模块的结构参考。</sub><br>
      <a href="docs/gallery-part-2.md#case-334"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>例 338：《赤壁怀古》长卷图</strong></p>
      <a href="docs/gallery-part-2.md#case-338"><img src="data/images/category-covers/history.jpg" alt="赤壁怀古长卷图" width="220"></a><br>
      <sub>长卷尺寸、古风叙事和整篇文字排版结合完整。</sub><br>
      <a href="docs/gallery-part-2.md#case-338"><strong>查看案例</strong></a>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top" align="center">
      <p><strong>例 331：西安手绘水彩城市地图</strong></p>
      <a href="docs/gallery-part-2.md#case-331"><img src="data/images/case331.png" alt="西安手绘水彩城市地图" width="220"></a><br>
      <sub>城市地图、手绘路线和地标标注的轻量参考。</sub><br>
      <a href="docs/gallery-part-2.md#case-331"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>例 332：茶π产品宣传海报</strong></p>
      <a href="docs/gallery-part-2.md#case-332"><img src="data/images/case332.png" alt="茶π产品宣传海报" width="220"></a><br>
      <sub>饮品商品图、中文卖点和清爽商业海报组合。</sub><br>
      <a href="docs/gallery-part-2.md#case-332"><strong>查看案例</strong></a>
    </td>
    <td width="33%" valign="top" align="center">
      <p><strong>例 339：Apple 风格自然科普海报</strong></p>
      <a href="docs/gallery-part-2.md#case-339"><img src="data/images/case339.jpg" alt="Apple 风格自然科普海报" width="220"></a><br>
      <sub>极简棚拍、自然主体和科普信息排版。</sub><br>
      <a href="docs/gallery-part-2.md#case-339"><strong>查看案例</strong></a>
    </td>
  </tr>
</table>

### 近 24 小时 X 社区新增

<table>
  <tr>
    <td width="25%" valign="top" align="center">
      <p><strong>例 375：古希腊三哲时间轴城市图</strong></p>
      <a href="docs/gallery-part-2.md#case-375"><img src="data/images/case375.jpg" alt="古希腊三哲时间轴城市图" width="180"></a><br>
      <sub>历史人物、城市背景和时间轴叙事。</sub><br>
      <a href="docs/gallery-part-2.md#case-375"><strong>查看案例</strong></a>
    </td>
    <td width="25%" valign="top" align="center">
      <p><strong>例 376：泼洒抹茶街头手机照片</strong></p>
      <a href="docs/gallery-part-2.md#case-376"><img src="data/images/category-covers/photo.jpg" alt="泼洒抹茶街头手机照片" width="180"></a><br>
      <sub>手机纪实、真实光影和负面约束。</sub><br>
      <a href="docs/gallery-part-2.md#case-376"><strong>查看案例</strong></a>
    </td>
    <td width="25%" valign="top" align="center">
      <p><strong>例 377：樱花咖啡户外人像</strong></p>
      <a href="docs/gallery-part-2.md#case-377"><img src="data/images/case377.jpg" alt="樱花咖啡户外人像" width="180"></a><br>
      <sub>参考图编辑、身份保持和户外生活方式写真。</sub><br>
      <a href="docs/gallery-part-2.md#case-377"><strong>查看案例</strong></a>
    </td>
    <td width="25%" valign="top" align="center">
      <p><strong>例 378：高端 3D 收藏玩具头像</strong></p>
      <a href="docs/gallery-part-2.md#case-378"><img src="data/images/category-covers/latest.jpg" alt="高端 3D 收藏玩具头像" width="180"></a><br>
      <sub>参考图转 3D 收藏玩具，保留身份锚点。</sub><br>
      <a href="docs/gallery-part-2.md#case-378"><strong>查看案例</strong></a>
    </td>
  </tr>
</table>

#### 代表案例 1：月下美女直播画面

[![月下美女直播画面](data/images/case330.png)](docs/gallery-part-2.md#case-330)

高仿直播截图场景，重点看界面氛围、中文弹幕和人物写实感的结合。
[查看完整案例](docs/gallery-part-2.md#case-330)

#### 代表案例 2：RAG 技术详解图

[![RAG 技术详解图](data/images/case334.png)](docs/gallery-part-2.md#case-334)

适合用来参考“技术概念 + 信息图排版 + 中文说明模块”的组织方式。
[查看完整案例](docs/gallery-part-2.md#case-334)

#### 代表案例 3：《赤壁怀古》长卷图

[![赤壁怀古长卷图](data/images/case338.png)](docs/gallery-part-2.md#case-338)

长卷尺寸、古风叙事和整篇文字排版结合得很完整，适合作为长文本视觉化参考。
[查看完整案例](docs/gallery-part-2.md#case-338)

<a name="section-templates"></a>

## 🧩 模板入口

完整模板已移到 [`docs/templates.md`](docs/templates.md)。如果你想按分类快速跳转，直接使用上方的 **提示词模板分类**；如果想看完整模板正文，进入 [工业级提示词模板与防坑指南](docs/templates.md#section-templates)。

## 🚀 怎么用这个库

1. 先在精选案例里确定你要模仿的输出类型。
2. 再去完整画廊里找相近案例，抄结构，不要只抄风格词。
3. 最后回到模板页，把你的业务变量填进通用模板或 JSON 模板。

<a name="section-disclaimer"></a>

## 📄 声明与补充

## 致谢与来源说明

本项目在整理与研究过程中，参考并使用了 [YouMind](https://youmind.com/) 与 [OpenNana](https://opennana.com/) 的公开提示词库内容，仅用于学习、归纳与方法论研究。相关内容版权归原作者或原平台所有，如有侵权或不当使用请联系处理，我们将第一时间修正或下线。

## 声明 (Disclaimer)

本项目仅整理公开可访问的社区提示词与示例图片，默认用于学习与研究，不主张对第三方原创内容的任何所有权。

本项目里的所有提示词案例和生成的图片，最初的灵感和数据来源均来自公开社区，特别是 [YouMind](https://youmind.com/) 与 [OpenNana](https://opennana.com/)。我们做这个项目，主要是想把好看的案例拆解成可复用的结构化协议，用于学习、归纳和大模型 Agent 接入的自动化测试。

- 我们尽最大努力保留原始来源，包括作者主页、原帖链接与原仓库链接。
- 涉及第三方内容时，遵循来源仓库声明、`CC BY 4.0` 等许可及对应平台规则。
- 若你是原作者或权利人，认为某条内容不应展示，请在本仓库发起 Issue 并附上条目链接，我们将在核验后快速下架。
- 本仓库不保证第三方内容可用于商业用途；商业使用前请自行取得原权利方授权。

**如果你觉得这个库帮到了你，请点亮右上角的 Star ⭐。**

## Star 趋势图

[![Star History Chart](https://api.star-history.com/svg?repos=freestylefly/awesome-gpt-image-2&type=Date)](https://star-history.com/#freestylefly/awesome-gpt-image-2&Date)

## 公众号

微信搜 **苍何** 或扫描下方二维码关注苍何的原创公众号，回复 **AI** 即可获取更多 AI 提示词学习资源。

![苍何微信公众号](data/images/公众号.png)

## 📜 开源协议

本项目采用 [MIT License](LICENSE) 开源。你可以在保留许可声明的前提下自由使用、修改、分发与二次开发。
