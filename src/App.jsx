import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Box,
  Gamepad2,
  Layers,
  Mail,
  MapPin,
  Package,
  Palette,
  PenTool,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import BorderGlow from "./components/BorderGlow";
import Grainient from "./components/Grainient";
import usePortfolioMotion from "./usePortfolioMotion";

const contact = {
  name: "陈裕昇",
  role: "视觉传达设计本科在读 / 寻找设计实习",
  phone: "18138707143",
  email: "439661086@qq.com",
  location: "广东省广州市",
  school: "广州应用科技学院",
  major: "视觉传达设计",
  target: "周边设计师 / 平面海报设计",
};

const navItems = [
  ["首页", "#hero"],
  ["经历", "#experience"],
  ["作品", "#projects"],
  ["优势", "#strengths"],
  ["联系", "#contact"],
];

const glowProps = {
  edgeSensitivity: 30,
  glowColor: "0 56 40",
  backgroundColor: "#100b0d",
  borderRadius: 8,
  glowRadius: 28,
  glowIntensity: 1,
  coneSpread: 24,
  animated: false,
  colors: ["#5f1717", "#a22c2c", "#c85a5a"],
  fillOpacity: 0.22,
};

function GlowFrame({ children, className = "", compact = false }) {
  return (
    <BorderGlow
      {...glowProps}
      className={className}
      edgeSensitivity={compact ? 20 : glowProps.edgeSensitivity}
      glowRadius={compact ? 16 : glowProps.glowRadius}
      glowIntensity={compact ? 0.78 : glowProps.glowIntensity}
      coneSpread={compact ? 18 : glowProps.coneSpread}
      fillOpacity={compact ? 0.14 : glowProps.fillOpacity}
    >
      {children}
    </BorderGlow>
  );
}

const stats = [
  { value: "6", label: "作品集展示方向" },
  { value: "2027", label: "本科预计毕业" },
];

const experienceGroups = [
  {
    title: "实习经历",
    meta: "公司 / 画室",
    items: [
      {
        date: "2025.06 - 2025.09",
        title: "广州稀区文化艺术传播有限公司",
        role: "宣传部实习生",
        copy: "负责「稀区美术 ART」公众号图文排版与内容撰写，完成封面、正文配图及版式优化，协同选题梳理与发布前校对。",
      },
      {
        date: "2024.06 - 2024.09",
        title: "姜浩张超画室",
        role: "美术助教",
        copy: "负责课堂辅导与作业点评，围绕构图、色彩、造型提出修改建议，协助课堂管理、示范讲解与课后反馈。",
      },
    ],
  },
  {
    title: "校园经历",
    meta: "组织宣传 / 视觉统筹",
    items: [
      {
        date: "2024.10 - 2026.06",
        title: "学院党小组",
        role: "宣传部部长",
        copy: "统筹社团招生宣传物料设计，完成海报、手册及周边物料；搭建视觉素材库，统一色彩、字体与版式规范。",
      },
    ],
  },
  {
    title: "教育背景",
    meta: "本科在读",
    items: [
      {
        date: "2023.09 - 2027.06",
        title: "广州应用科技学院",
        role: "视觉传达设计 / 本科",
        copy: "主修海报设计、包装设计、文创IP设计、VI 设计、人物插画、C4D 建模与摄影。",
      },
    ],
  },
];

const projectIconMap = {
  "海报设计": Palette,
  "游戏概念设计": Gamepad2,
  "人物插画": PenTool,
  "VI设计": Layers,
  "包装设计": Package,
  "文创IP设计": Box,
};

const viManualPages = Array.from({ length: 25 }, (_, index) => {
  const page = index + 1;
  const pageNo = String(page).padStart(2, "0");
  const highlightedPages = {
    1: "VI 手册封面",
    3: "VI 手册目录",
  };

  return {
    src: `/assets/projects/vi/vi_page_${pageNo}.webp`,
    title: highlightedPages[page] ?? `VI 手册 P${pageNo}`,
    featured: page === 1 || page === 3,
  };
});

const webpName = (fileName) => fileName.replace(/\.(jpe?g|png)$/i, ".webp");
const posterAsset = (fileName) => `/assets/projects/poster/${webpName(fileName)}?v=20260714`;
const packagingAsset = (fileName) => `/assets/projects/packaging/${webpName(fileName)}?v=20260714`;
const gameConceptAsset = (fileName) => `/assets/projects/game-concept/${webpName(fileName)}?v=20260714`;
const characterIllustrationAsset = (fileName) =>
  `/assets/projects/character-illustration/${webpName(fileName)}?v=20260714`;
const culturalIpAsset = (fileName) => `/assets/projects/cultural-ip/${webpName(fileName)}?v=20260714`;

const posterSections = [
  {
    title: "城市地标海报",
    tag: "City Landmark",
    copy: "以广州城市建筑与地标符号为主体，强调纵向构图、复古纸感和城市识别度。",
    items: [
      { src: posterAsset("city_01.jpg"), title: "广州塔地标海报 01" },
      { src: posterAsset("city_02.jpg"), title: "广州塔地标海报 02" },
      { src: posterAsset("city_03.jpg"), title: "五羊城市地标海报 01" },
      { src: posterAsset("city_04.jpg"), title: "五羊城市地标海报 02" },
    ],
  },
  {
    title: "美食海报",
    tag: "Food Poster",
    copy: "围绕食物主体、食欲色彩和促销氛围组织画面，强化美食主题的视觉吸引力与传播记忆点。",
    items: [
      { src: posterAsset("food_01.jpg"), title: "美食炒蛋海报" },
      { src: posterAsset("food_02.jpg"), title: "美食蛋糕海报" },
      { src: posterAsset("food_03.jpg"), title: "美食青提汽水海报" },
      { src: posterAsset("food_04.jpg"), title: "美食面条海报" },
    ],
  },
  {
    title: "文字排版海报",
    tag: "Typography Poster",
    copy: "以字体大小、方向、节奏和几何块面建立信息秩序，展示文字作为画面主体的表现力。",
    items: [
      { src: posterAsset("typography_01.jpg"), title: "文字排版解构 01" },
      { src: posterAsset("typography_02.jpg"), title: "大学生发疯文学 01" },
      { src: posterAsset("typography_03.jpg"), title: "大学生发疯文学 02" },
      { src: posterAsset("typography_04.jpg"), title: "文字排版解构 02" },
    ],
  },
  {
    title: "宣传海报",
    tag: "Promotion Poster",
    copy: "以明确主题、醒目标题和视觉氛围建立传播记忆点，强化宣传信息的识别度与吸引力。",
    items: [
      { src: posterAsset("promo_01.jpg"), title: "宣传海报 01" },
      { src: posterAsset("promo_02.jpg"), title: "宣传海报 02" },
      { src: posterAsset("promo_03.jpg"), title: "宣传海报 03" },
      { src: posterAsset("promo_04.jpg"), title: "宣传海报 04" },
    ],
  },
];

const packagingSections = [
  {
    title: "糖果礼盒包装",
    tag: "Candy Gift Box",
    copy: "以甜蜜、梦幻、节日感为核心，将礼盒包装、品牌定位、视觉元素和应用延展整合成完整包装方案。",
    items: [
      { src: packagingAsset("candy_01.jpg"), title: "糖果礼盒包装展板 01" },
      { src: packagingAsset("candy_02.jpg"), title: "糖果礼盒包装展板 02" },
      { src: packagingAsset("candy_03.jpg"), title: "糖果礼盒包装展板 03" },
      { src: packagingAsset("candy_04.jpg"), title: "糖果礼盒包装展板 04" },
    ],
  },
  {
    title: "猫粮包装",
    tag: "Cat Food Package",
    copy: "围绕萌宠、国潮灵感与猫咪陪伴感建立包装视觉，完成品牌设定、IP 形象、色彩系统与包装应用。",
    items: [
      { src: packagingAsset("catfood_01.jpg"), title: "猫粮包装展板 01" },
      { src: packagingAsset("catfood_02.jpg"), title: "猫粮包装展板 02" },
    ],
  },
];

const gameConceptBoards = [
  { src: gameConceptAsset("board_01.jpg"), title: "游戏概念展板 01" },
  { src: gameConceptAsset("board_02.jpg"), title: "游戏概念展板 02" },
  { src: gameConceptAsset("board_03.jpg"), title: "游戏概念展板 03" },
];

const gameConceptPages = Array.from({ length: 16 }, (_, index) => {
  const pageNo = String(index + 1).padStart(2, "0");
  return {
    src: gameConceptAsset(`concept_page_${pageNo}.jpg`),
    title: `项目介绍 P${pageNo}`,
  };
});

const characterIllustrationSections = [
  {
    title: "二次元风",
    tag: "Anime Style",
    copy: "以清晰线稿、轻盈色彩和角色情绪为核心，强调人物姿态、服饰细节与可爱感表达。",
    items: [
      { src: characterIllustrationAsset("anime_01.jpg"), title: "二次元人物插画 01" },
      { src: characterIllustrationAsset("anime_02.jpg"), title: "二次元人物插画 02" },
    ],
  },
  {
    title: "厚涂风",
    tag: "Painterly Style",
    copy: "通过更强的明暗塑造、笔触层次和面部刻画，呈现偏写实与氛围化的人物视觉。",
    items: [
      { src: characterIllustrationAsset("painterly_01.jpg"), title: "厚涂人物插画 01" },
      { src: characterIllustrationAsset("painterly_02.jpg"), title: "厚涂人物插画 02" },
    ],
  },
  {
    title: "蜡笔风",
    tag: "Crayon Style",
    copy: "以蜡笔质感、童话夜色和温柔笔触建立画面氛围，突出角色的童真情绪与叙事感。",
    items: [
      { src: characterIllustrationAsset("crayon_01.jpg"), title: "蜡笔风人物插画 01" },
    ],
  },
];

const culturalIpSections = [
  {
    title: "鸡小健健身日记 IP",
    tag: "Fitness IP",
    copy: "以拟人化角色建立健身主题 IP，延展角色三视图、表情动作、应用界面与周边物料。",
    items: [
      { src: culturalIpAsset("fitness_01.jpg"), title: "鸡小健 IP 形象设计" },
      { src: culturalIpAsset("fitness_02.jpg"), title: "鸡小健 IP 延展设计" },
      { src: culturalIpAsset("fitness_03.jpg"), title: "鸡小健 IP 应用设计" },
    ],
  },
  {
    title: "鼎湖山文旅 IP",
    tag: "Cultural Tourism IP",
    copy: "结合鼎湖山自然景观与地域文化，完成文旅角色形象、视觉延展和应用物料设计。",
    items: [
      { src: culturalIpAsset("dinghu_01.jpg"), title: "鼎湖山 IP 形象设计" },
      { src: culturalIpAsset("dinghu_02.jpg"), title: "鼎湖山 IP 延展设计" },
      { src: culturalIpAsset("dinghu_03.jpg"), title: "鼎湖山 IP 应用设计" },
    ],
  },
];

const projects = [
  {
    title: "海报设计",
    tag: "Poster System",
    image: posterAsset("city_01.jpg"),
    summary: "覆盖城市地标、美食海报、文字排版与宣传海报，围绕信息层级、视觉冲击和传播效率建立画面秩序。",
    detail: "项目包含四组海报方向：城市地标强调地域识别与构图张力，美食海报突出食物主体与促销氛围，文字排版聚焦字体节奏和版面秩序，宣传海报则以醒目主题和传播氛围形成系列表达。",
    skills: ["城市地标", "美食海报", "文字排版", "宣传海报"],
    posterSections,
  },
  {
    title: "游戏概念设计",
    tag: "Game Concept",
    image: gameConceptAsset("board_01.jpg"),
    summary: "「星月与弗弗」低像素叙事游戏概念设计，以亲情、陪伴与治愈为核心，构建角色、场景、世界观和视觉叙事系统。",
    detail: "项目围绕一只流浪猫重新连接两个不敢靠近的家人展开，通过樱花、旧屋、车站、月光与四季变化建立柔和的故事氛围，并延展出角色设定、场景概念、交互界面和项目介绍页。",
    skills: ["世界观设定", "角色场景", "叙事视觉", "界面概念"],
    gameConceptBoards,
    gameConceptPages,
  },
  {
    title: "人物插画",
    tag: "Character Illustration",
    image: characterIllustrationAsset("anime_01.jpg"),
    summary: "包含二次元风、厚涂风与蜡笔风三组人物插画，围绕角色造型、面部情绪、色彩氛围和画面完成度展开。",
    detail: "人物插画板块聚焦角色表现力。二次元风更强调线稿、比例和可爱感，厚涂风通过光影、笔触和面部塑造强化视觉冲击，蜡笔风则突出温柔质感与童话叙事氛围，展示不同风格下的人物绘制能力。",
    skills: ["角色造型", "色彩氛围", "面部刻画", "风格表达"],
    characterIllustrationSections,
  },
  {
    title: "VI设计",
    tag: "Visual Identity",
    image: "/assets/projects/vi/vi_board_01.webp?v=20260714",
    summary: "「i弗游戏」VI 视觉识别系统，以像素游戏、低饱和粉紫色系与情感叙事为核心，完成品牌标识、规范手册和多场景应用延展。",
    detail: "项目包含品牌理念、Logo 标准化规范、色彩与字体系统、辅助图形、办公物料、宣传物料、空间导视与文创衍生应用，形成一套完整的像素风游戏品牌视觉系统。",
    skills: ["品牌识别", "VI手册", "像素视觉", "应用延展"],
    boards: [
      { src: "/assets/projects/vi/vi_board_01.webp?v=20260714", title: "品牌基础视觉识别系统" },
      { src: "/assets/projects/vi/vi_board_02.webp?v=20260714", title: "品牌应用视觉识别系统" },
    ],
    manualPages: viManualPages,
  },
  {
    title: "包装设计",
    tag: "Package Design",
    image: packagingAsset("candy_01.jpg"),
    summary: "包含糖果礼盒与猫粮包装两组完整方案，从品牌定位、视觉元素到包装应用，展示产品视觉落地能力。",
    detail: "包装设计板块聚焦产品包装的品牌识别和场景表达。糖果礼盒以甜蜜花园、节日送礼和情绪价值为核心，猫粮包装则结合国潮灵感、萌宠形象与年轻化色彩，形成更具记忆点的货架视觉。",
    skills: ["包装系统", "品牌定位", "IP形象", "应用延展"],
    packagingSections,
  },
  {
    title: "文创IP设计",
    tag: "Cultural IP",
    image: culturalIpAsset("dinghu_01.jpg"),
    summary: "包含「鸡小健」健身日记 IP 与「鼎湖山」文旅 IP 两组方案，从角色设定、视觉延展到应用物料形成完整文创表达。",
    detail: "文创 IP 设计板块聚焦主题概念到角色系统的转译能力。项目通过人物化/拟人化设定建立记忆点，并延展到界面、海报、票卡、包装、徽章、钥匙扣等多种应用场景。",
    skills: ["IP形象", "角色延展", "文旅视觉", "周边应用"],
    culturalIpSections,
  },
];

const strengths = [
  {
    icon: Palette,
    title: "审美稳定",
    copy: "关注品牌调性、版式秩序与阅读体验，能够把复杂信息收束成清晰、有辨识度的视觉表达。",
  },
  {
    icon: Layers,
    title: "多方向执行",
    copy: "覆盖海报、包装、文创IP、VI、人物插画与 C4D 基础，可从概念、排版推进到物料落地。",
  },
  {
    icon: Sparkles,
    title: "AI 辅助创作",
    copy: "熟悉 GPT、Codex、Lovart、Banana、即梦等工具，能把 AI 作为灵感生成、图像扩展和效率提升的一部分。",
  },
  {
    icon: BadgeCheck,
    title: "细节与协同",
    copy: "有宣传部门统筹与实习经验，能处理封面、配图、校对、规范整理等真实工作流里的细节。",
  },
];

function HeroMedia() {
  return (
    <div className="hero-media" aria-hidden="true">
      <img src="/assets/rainy_pixel_loop.webp?v=20260714" alt="" decoding="async" fetchPriority="high" />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#hero" aria-label="返回首页">
        <span>昇</span>
      </a>
      <nav className="site-nav" aria-label="主导航">
        {navItems.map(([label, href]) => (
          <a className="nav-pill" key={href} href={href} aria-label={label}>
            <span className="hover-circle" aria-hidden="true" />
            <span className="label-stack">
              <span className="pill-label">{label}</span>
              <span className="pill-label-hover" aria-hidden="true">
                {label}
              </span>
            </span>
          </a>
        ))}
      </nav>
      <a className="header-contact nav-pill" href={`mailto:${contact.email}`} aria-label="联系我">
        <span className="hover-circle" aria-hidden="true" />
        <span className="label-stack">
          <span className="pill-label">
            <Mail size={18} />
            联系我
          </span>
          <span className="pill-label-hover" aria-hidden="true">
            <Mail size={18} />
            联系我
          </span>
        </span>
      </a>
    </header>
  );
}

function OpeningAnimation() {
  return (
    <div className="opening-animation" aria-hidden="true">
      <div className="opening-panel opening-panel-left" />
      <div className="opening-panel opening-panel-right" />
      <div className="opening-mark">
        <i />
      </div>
      <div className="opening-scan" />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="hero">
      <HeroMedia />
      <div className="hero-glass" />
      <div className="hero-overlay" />
      <Header />
      <div className="hero-content shell">
        <p className="section-kicker">Internship Portfolio / 2026</p>
        <h1 className="hero-title">
          陈裕昇
          <span>个人作品集</span>
        </h1>
        <p className="hero-copy">
          正在寻找设计实习机会，方向聚焦周边设计、平面海报、包装设计与品牌视觉。用稳定审美、细节执行和 AI
          辅助流程，把创意推进到可交付的视觉成果。
        </p>
        <div className="hero-actions">
          <a className="primary-action" href={`mailto:${contact.email}`}>
            <Send size={19} />
            发邮件联系
          </a>
          <a className="secondary-action" href="#projects">
            查看作品方向
            <ArrowRight size={19} />
          </a>
        </div>
      </div>
      <div className="hero-signal shell">
        <span>Guangzhou</span>
        <span>Personal Portfolio</span>
        <span>Poster / VI / Packaging / Cultural IP</span>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="shell experience-layout">
        <div className="portrait-panel">
          <GlowFrame className="portrait-glow">
            <div className="portrait-frame">
            <img src="/assets/portrait.webp?v=20260714" alt="陈裕昇头像" loading="lazy" decoding="async" />
            </div>
          </GlowFrame>
          <div className="contact-stack" aria-label="联系方式">
            <GlowFrame className="compact-glow" compact>
              <a href={`tel:${contact.phone}`}>
              <Phone size={18} />
              {contact.phone}
              </a>
            </GlowFrame>
            <GlowFrame className="compact-glow" compact>
              <a href={`mailto:${contact.email}`}>
              <Mail size={18} />
              {contact.email}
              </a>
            </GlowFrame>
            <GlowFrame className="compact-glow" compact>
              <span>
              <MapPin size={18} />
              {contact.location}
              </span>
            </GlowFrame>
          </div>
        </div>

        <div className="experience-content">
          <p className="section-kicker">Profile</p>
          <h2>从视觉秩序到传播落地</h2>
          <p className="section-lead">
            我是广州应用科技学院视觉传达设计本科在读学生，主修海报、包装、文创、VI、人物插画、C4D
            建模与摄影。熟悉 PS、Illustrator、C4D 及 AI 辅助生成图片/视频流程，关注品牌调性、版式秩序与用户阅读体验。
          </p>

          <div className="profile-meta">
            <GlowFrame className="compact-glow" compact>
              <span>{contact.school}</span>
            </GlowFrame>
            <GlowFrame className="compact-glow" compact>
              <span>{contact.major}</span>
            </GlowFrame>
            <GlowFrame className="compact-glow" compact>
              <span>{contact.target}</span>
            </GlowFrame>
          </div>

          <div className="stats-grid">
            {stats.map((item) => (
              <GlowFrame className="stat-glow" key={item.label}>
                <div className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </GlowFrame>
            ))}
          </div>

          <div className="timeline-groups">
            {experienceGroups.map((group) => (
              <section className="timeline-group" key={group.title} aria-label={group.title}>
                <div className="timeline-group-header">
                  <h3>{group.title}</h3>
                  <span>{group.meta}</span>
                </div>
                <div className="timeline-list">
                  {group.items.map((item) => (
                    <GlowFrame className="timeline-glow" key={`${item.date}-${item.title}`}>
                      <article className="timeline-item">
                        <time>{item.date}</time>
                        <div>
                          <h3>{item.title}</h3>
                          <p className="timeline-role">{item.role}</p>
                          <p>{item.copy}</p>
                        </div>
                      </article>
                    </GlowFrame>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltedProjectCard({ project, displayIndex, isFeatured, onOpen }) {
  const cardRef = useRef(null);
  const Icon = projectIconMap[project.title] ?? Sparkles;
  const rotateAmplitude = isFeatured ? 7.5 : 10.5;

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("is-tilted");
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
    card.style.setProperty("--tilt-scale", "1");
    card.style.setProperty("--tilt-x", "50%");
    card.style.setProperty("--tilt-y", "50%");
    card.style.setProperty("--caption-rotate", "0deg");
    card.dataset.lastY = "0";
  };

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    const lastY = Number(card.dataset.lastY || 0);
    const velocityY = offsetY - lastY;

    card.classList.add("is-tilted");
    card.style.setProperty("--tilt-rx", `${rotationX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-ry", `${rotationY.toFixed(2)}deg`);
    card.style.setProperty("--tilt-scale", isFeatured ? "1.035" : "1.055");
    card.style.setProperty("--tilt-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--tilt-y", `${event.clientY - rect.top}px`);
    card.style.setProperty("--caption-rotate", `${Math.max(-12, Math.min(12, -velocityY * 0.45)).toFixed(2)}deg`);
    card.dataset.lastY = String(offsetY);
  };

  return (
    <GlowFrame className={`project-glow ${isFeatured ? "project-glow-featured" : "project-glow-compact"}`}>
      <button
        ref={cardRef}
        className={`project-card tilted-project-card ${isFeatured ? "project-card-featured" : ""}`}
        type="button"
        onClick={() => onOpen(project)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseMove}
        onMouseLeave={resetTilt}
        onFocus={() => cardRef.current?.classList.add("is-tilted")}
        onBlur={resetTilt}
        style={{
          "--tilt-rx": "0deg",
          "--tilt-ry": "0deg",
          "--tilt-scale": 1,
          "--tilt-x": "50%",
          "--tilt-y": "50%",
          "--caption-rotate": "0deg",
        }}
      >
        <span className="tilted-card-inner project-card-inner">
          <img
            className="tilted-card-img"
            src={project.image}
            alt={`${project.title}作品视觉`}
            loading="lazy"
            decoding="async"
          />
          <span className="project-index">{String(displayIndex).padStart(2, "0")}</span>
          <span className="project-text tilted-card-overlay">
            <span>
              <Icon size={18} />
              {project.tag}
            </span>
            <strong>{project.title}</strong>
            <em>
              展开作品
              <ArrowUpRight size={18} />
            </em>
          </span>
        </span>
        <span className="tilted-card-caption" aria-hidden="true">
          {project.title}
        </span>
      </button>
    </GlowFrame>
  );
}

function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const featuredProjectTitle = "游戏概念设计";
  const displayProjects = [
    projects.find((project) => project.title === featuredProjectTitle),
    ...projects.filter((project) => project.title !== featuredProjectTitle),
  ].filter(Boolean);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject]);

  return (
    <section className="section projects-section" id="projects">
      <div className="shell">
        <div className="section-heading">
          <p className="section-kicker">Selected Works</p>
          <h2>精选项目方向</h2>
        </div>

        <div className="project-grid">
          {displayProjects.map((project, index) => (
            <TiltedProjectCard
              key={project.title}
              project={project}
              displayIndex={index + 1}
              isFeatured={project.title === featuredProjectTitle}
              onOpen={setActiveProject}
            />
          ))}
        </div>
      </div>

      {activeProject && <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  );
}

function ProjectDetail({ project, onClose }) {
  const Icon = projectIconMap[project.title] ?? Sparkles;
  const hasStructuredWorks = Boolean(
    project.culturalIpSections?.length ||
      project.characterIllustrationSections?.length ||
      project.gameConceptBoards?.length ||
      project.gameConceptPages?.length ||
      project.posterSections?.length ||
      project.packagingSections?.length ||
      project.boards?.length ||
      project.manualPages?.length,
  );
  const featuredManualPages = project.manualPages?.filter((item) => item.featured) ?? [];
  const compactManualPages = project.manualPages?.filter((item) => !item.featured) ?? [];

  return createPortal(
    <div className="project-detail" role="dialog" aria-modal="true" aria-label={`${project.title}详情`}>
      <div className="detail-actionbar" aria-label="作品详情操作">
        <button className="detail-return-button" type="button" onClick={onClose} aria-label="返回作品集">
          <span aria-hidden="true">←</span>
          返回作品集
        </button>
        <button className="close-button" type="button" onClick={onClose} aria-label="关闭作品详情">
          <X size={18} />
          <span>关闭</span>
        </button>
      </div>
      <div className="project-detail-scroll">
        <div className="project-detail-top shell">
          <div className="detail-hero">
            <div>
              <p className="section-kicker">{project.tag}</p>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </div>
            <GlowFrame className="detail-icon-glow" compact>
              <div className="detail-icon">
              <Icon size={42} />
              </div>
            </GlowFrame>
          </div>
          {!hasStructuredWorks && (
            <img
              className="detail-cover"
              src={project.image}
              alt={`${project.title}详情封面`}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="detail-grid">
            <GlowFrame className="detail-copy-glow">
              <article>
              <h3>项目叙述</h3>
              <p>{project.detail}</p>
              </article>
            </GlowFrame>
            <GlowFrame className="detail-copy-glow">
              <article>
              <h3>能力标签</h3>
              <div className="skill-tags">
                {project.skills.map((skill) => (
                  <GlowFrame className="compact-glow" compact key={skill}>
                    <span>{skill}</span>
                  </GlowFrame>
                ))}
              </div>
              </article>
            </GlowFrame>
            <GlowFrame className="detail-copy-glow">
              <article>
              <h3>{hasStructuredWorks ? "项目范围" : "后续素材"}</h3>
              {project.culturalIpSections ? (
                <p>分为健身主题 IP 与文旅主题 IP 两组，展示从角色形象、动作表情到界面和周边物料的完整延展。</p>
              ) : project.characterIllustrationSections ? (
                <p>分为二次元风、厚涂风与蜡笔风三组，每张作品单独成行展示，保留人物造型、笔触和画面氛围的观看空间。</p>
              ) : project.gameConceptBoards ? (
                <p>展板呈现游戏概念、角色关系与视觉系统，项目介绍页进一步补充世界观、交互界面和叙事氛围。</p>
              ) : project.posterSections ? (
                <p>四组系列分别对应城市传播、美食推广、字体训练和宣传主题，呈现不同类型海报的视觉组织能力。</p>
              ) : project.packagingSections ? (
                <p>两组系列分别对应礼盒包装与宠物食品包装，呈现从品牌概念到产品视觉落地的设计能力。</p>
              ) : hasStructuredWorks ? (
                <p>展板呈现品牌基础与应用延展，VI 手册覆盖标志规范、色彩字体、辅助图形与场景物料。</p>
              ) : (
                <p>可加入作品大图、草图推导、局部细节、应用 mockup 与项目复盘，让这个方向变成完整案例页。</p>
              )}
              </article>
            </GlowFrame>
          </div>
          {project.culturalIpSections?.map((section) => (
            <section className="project-work-section" aria-label={`${project.title}${section.title}`} key={section.title}>
              <div className="work-section-heading">
                <div>
                  <p className="section-kicker">{section.tag}</p>
                  <h3>{section.title}</h3>
                </div>
                <span>{section.items.length} 张</span>
              </div>
              <p className="work-section-copy">{section.copy}</p>
              <div className="cultural-ip-gallery">
                {section.items.map((item) => (
                  <figure className="cultural-ip-card" key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
          {project.characterIllustrationSections?.map((section) => (
            <section className="project-work-section" aria-label={`${project.title}${section.title}`} key={section.title}>
              <div className="work-section-heading">
                <div>
                  <p className="section-kicker">{section.tag}</p>
                  <h3>{section.title}</h3>
                </div>
                <span>{section.items.length} 张</span>
              </div>
              <p className="work-section-copy">{section.copy}</p>
              <div className="character-illustration-gallery">
                {section.items.map((item) => (
                  <figure className="character-illustration-card" key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
          {project.gameConceptBoards && (
            <section className="project-work-section" aria-label={`${project.title}展板`}>
              <div className="work-section-heading">
                <div>
                  <p className="section-kicker">Concept Boards</p>
                  <h3>概念展板</h3>
                </div>
                <span>{project.gameConceptBoards.length} 张</span>
              </div>
              <div className="game-board-gallery">
                {project.gameConceptBoards.map((item) => (
                  <figure className="game-board-card" key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
          {project.gameConceptPages && (
            <section className="project-work-section" aria-label={`${project.title}项目介绍`}>
              <div className="work-section-heading">
                <div>
                  <p className="section-kicker">Project Introduction</p>
                  <h3>项目介绍</h3>
                </div>
                <span>{project.gameConceptPages.length} 页</span>
              </div>
              <div className="game-concept-gallery">
                {project.gameConceptPages.map((item) => (
                  <figure className="game-concept-page" key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
          {project.posterSections?.map((section) => (
            <section className="project-work-section" aria-label={`${project.title}${section.title}`} key={section.title}>
              <div className="work-section-heading">
                <div>
                  <p className="section-kicker">{section.tag}</p>
                  <h3>{section.title}</h3>
                </div>
                <span>{section.items.length} 张</span>
              </div>
              <p className="work-section-copy">{section.copy}</p>
              <div className="poster-gallery">
                {section.items.map((item) => (
                  <figure className="poster-card" key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
          {project.packagingSections?.map((section) => (
            <section className="project-work-section" aria-label={`${project.title}${section.title}`} key={section.title}>
              <div className="work-section-heading">
                <div>
                  <p className="section-kicker">{section.tag}</p>
                  <h3>{section.title}</h3>
                </div>
                <span>{section.items.length} 张</span>
              </div>
              <p className="work-section-copy">{section.copy}</p>
              <div className="packaging-gallery">
                {section.items.map((item) => (
                  <figure className="packaging-card" key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
          {project.boards && (
            <section className="project-work-section" aria-label={`${project.title}展板`}>
              <div className="work-section-heading">
                <div>
                  <p className="section-kicker">Display Boards</p>
                  <h3>展板</h3>
                </div>
                <span>{project.boards.length} 张</span>
              </div>
              <div className="board-gallery">
                {project.boards.map((item) => (
                  <figure className="board-card" key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
          {project.manualPages && (
            <section className="project-work-section" aria-label={`${project.title}VI手册`}>
              <div className="work-section-heading">
                <div>
                  <p className="section-kicker">VI Manual</p>
                  <h3>VI 手册</h3>
                </div>
                <span>{project.manualPages.length} 页</span>
              </div>
              <div className="manual-featured-gallery">
                {featuredManualPages.map((item) => (
                  <figure className={`manual-page ${item.featured ? "is-featured" : "is-compact"}`} key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="manual-compact-gallery">
                {compactManualPages.map((item) => (
                  <figure className="manual-page is-compact" key={item.src}>
                    <img src={item.src} alt={`${project.title} - ${item.title}`} loading="lazy" decoding="async" />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Strengths() {
  return (
    <section className="section strengths-section" id="strengths">
      <div className="shell">
        <div className="section-heading">
          <p className="section-kicker">Strengths</p>
          <h2>个人优势</h2>
          <p>把学生阶段的训练、校园实践和真实实习经验整合成可进入团队协作的设计能力。</p>
        </div>

        <div className="strength-grid">
          {strengths.map((item) => {
            const Icon = item.icon;
            return (
              <GlowFrame className="strength-glow" key={item.title}>
                <article className="strength-card">
                  <Icon size={27} />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              </GlowFrame>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-layout">
        <div>
          <p className="section-kicker">Contact</p>
          <h2>期待一次实习面谈。</h2>
          <p>
            我希望进入真实项目环境继续训练视觉判断、交付效率与跨团队协作。欢迎通过电话或邮件联系，我会尽快回复。
          </p>
        </div>
        <div className="footer-contact-grid">
          <GlowFrame className="footer-contact-glow">
            <a href={`mailto:${contact.email}`}>
            <Mail size={22} />
            <span>邮箱</span>
              <strong>{contact.email}</strong>
            </a>
          </GlowFrame>
          <GlowFrame className="footer-contact-glow">
            <a href={`tel:${contact.phone}`}>
            <Phone size={22} />
            <span>电话</span>
              <strong>{contact.phone}</strong>
            </a>
          </GlowFrame>
          <GlowFrame className="footer-contact-glow">
            <span>
            <MapPin size={22} />
            <span>所在地</span>
              <strong>{contact.location}</strong>
            </span>
          </GlowFrame>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  usePortfolioMotion();

  return (
    <>
      <OpeningAnimation />
      <Hero />
      <div className="post-hero-area">
        <Grainient
          className="post-hero-grainient"
          color1="#000000"
          color2="#3f0606"
          color3="#000000"
          timeSpeed={0.65}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
          frameInterval={66}
          maxDpr={1}
          maxCanvasWidth={1400}
          maxCanvasHeight={900}
        />
        <main className="post-hero-content">
          <Experience />
          <Projects />
          <Strengths />
          <ContactFooter />
        </main>
      </div>
    </>
  );
}
