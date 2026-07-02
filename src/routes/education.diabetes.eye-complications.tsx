import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import cover from "@/assets/elderly-eye-closeup.jpg.asset.json";
import normalRetina from "@/assets/normal-retina-anatomy.jpg.asset.json";
import diabeticRetina from "@/assets/diabetic-retina-diagram-v2.jpg.asset.json";

const ACCENT = "#2b8a8a";
const ACCENT_SOFT = "#e6f1f1";

export const Route = createFileRoute("/education/diabetes/eye-complications")({
  head: () => ({
    meta: [
      { title: "糖尿病恐併發眼睛病變｜醫療保健專欄｜上怡生技" },
      {
        name: "description",
        content:
          "糖尿病是一種血管病變，容易併發視網膜病變。本文說明成因、常見眼底病灶（眼底出血、硬性滲出物、毛細血管擴張異常、新生血管）與日常照護重點。",
      },
      { property: "og:title", content: "糖尿病恐併發眼睛病變" },
      {
        property: "og:description",
        content: "認識糖尿病視網膜病變的成因、警訊與日常照護重點，及早發現及早治療。",
      },
      { property: "og:image", content: cover.url },
      { name: "twitter:image", content: cover.url },
    ],
  }),
  component: ArticlePage,
});

const lesions = [
  { zh: "眼底出血", en: "Hemorrhages", desc: "血液滲漏到視網膜組織中，形成點狀或斑塊狀出血。" },
  { zh: "硬性滲出物", en: "Hard exudates", desc: "蛋白質與脂肪從受損血管漏出，沉積於視網膜形成黃白色斑點。" },
  { zh: "毛細血管擴張異常", en: "Microaneurysms", desc: "微血管壁膨出形成小囊泡，是糖尿病視網膜病變最早的徵兆。" },
  { zh: "新生血管", en: "Abnormal growth of blood vessels", desc: "缺氧誘發新生血管生長，脆弱易破裂，可能造成玻璃體出血或視網膜剝離。" },
];

const dailyCare = [
  "避免劇烈運動",
  "控制血壓",
  "定期追蹤",
  "治療高血脂",
  "視力變化時應儘速就診",
  "戒菸",
  "保持正常而穩定的血糖值",
];

const careGroups = [
  {
    title: "日常自我管理",
    subtitle: "Daily self-management",
    items: ["避免劇烈運動", "控制血壓", "治療高血脂", "戒菸", "保持正常而穩定的血糖值"],
  },
  {
    title: "眼科主動照護",
    subtitle: "Proactive eye care",
    items: ["定期追蹤", "視力變化時應儘速就診"],
  },
];

function ArticlePage() {
  return (
    <article>
      {/* Hero */}
      <section className="border-b border-hairline">
        <div className="container-page py-14 md:py-20">
          <nav className="mb-6 text-xs tracking-[0.18em] text-muted-foreground">
            <Link to="/education" className="hover:text-accent">醫療保健專欄</Link>
            <span className="mx-2">/</span>
            <Link to="/education" hash="diabetes" className="hover:text-accent">糖尿病併發</Link>
          </nav>
          <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr]">
            <Reveal direction="up" className="min-w-0">
              <span
                className="inline-block border px-4 py-1 text-sm font-medium"
                style={{ color: "#d98a2b", borderColor: "#d98a2b" }}
              >
                糖尿病併發症
              </span>
              <h1 className="mt-6 font-display text-3xl leading-tight text-[#1f2c3a] md:text-[42px]">
                糖尿病恐併發
                <br />眼睛病變
              </h1>
              <p
                className="mt-7 border-l-[3px] pl-5 text-base leading-relaxed text-[#475569] md:text-lg"
                style={{ borderColor: "#d98a2b" }}
              >
                糖尿病是一種「血管病變」，使人體無法保存血液中重要成分的糖尿病症狀，
                如水分、血分及蛋白質、脂肪等，在微小血管方面尤其嚴重。
              </p>

            </Reveal>
            <Reveal
              direction="left"
              delay={60}
              className="overflow-hidden rounded-tl-[4px] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[4px] transition-transform duration-700 ease-out hover:-translate-y-1"
              style={{ boxShadow: `15px 15px 0px #fde3c2` }}
            >
              <img src={cover.url} alt="糖尿病眼睛病變" className="block h-auto w-full transition-transform duration-[1200ms] ease-out hover:scale-[1.03]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Detailed intro */}
      <section className="section-pad bg-[#fafafa]">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal direction="up">
              <p className="text-xs tracking-[0.25em]" style={{ color: ACCENT }}>WHY IT HAPPENS</p>
              <h2 className="mt-3 font-display text-2xl text-[#1f2c3a] md:text-3xl">為什麼糖尿病會影響視力？</h2>
            </Reveal>
            <Reveal direction="up" delay={60} className="mt-6 space-y-5 text-base leading-relaxed text-[#475569]">
              <p>
                糖尿病導致的視網膜病變主要就是微細血管病變，如果水分跑出來，就形成黃斑部水腫；
                而血跑到血管外面，就會造成視網膜出血；當蛋白質、脂肪溢出血管外，也會造成視網膜滲出物。
              </p>
              <p>
                另外血管內血糖太高，也會造成血管管壁增厚或形狀變形，而造成血管阻塞，
                最後就會造成視網膜缺氧而更加的影響視力。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Retina comparison */}
      <section className="section-pad">

        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-2xl text-center">
            <p className="text-xs tracking-[0.25em]" style={{ color: ACCENT }}>RETINAL COMPARISON</p>
            <h2 className="mt-3 font-display text-2xl text-[#1f2c3a] md:text-3xl">正常視網膜 vs. 糖尿病性視網膜病變</h2>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Reveal
              direction="up"
              className="overflow-hidden border border-hairline bg-background"
              style={{ boxShadow: `12px 12px 0px #fde3c2` }}
            >
              <div className="relative flex h-[500px] items-center justify-center bg-white px-8 pb-8 pt-16 md:px-10 md:pb-10 md:pt-16">
                <div
                  className="absolute left-4 top-4 z-10 inline-block px-3 py-1 text-[15px] font-medium text-white"
                  style={{ background: ACCENT }}
                >
                  正常視網膜
                </div>
                <img
                  src={normalRetina.url}
                  alt="正常視網膜解剖圖，標示視神經與玻璃體腔"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8">
                <ul className="space-y-4 text-[15px] leading-relaxed text-[#1f2c3a]">
                  <li className="border-l-[3px] pl-4" style={{ borderColor: ACCENT }}>
                    <p className="font-semibold text-[#1f2c3a]">
                      視神經
                      <span className="ml-2 text-xs font-normal text-muted-foreground">Optic nerve</span>
                    </p>
                    <p className="mt-1 text-sm text-[#475569]">負責將視網膜訊號傳送至大腦。</p>
                  </li>
                  <li className="border-l-[3px] pl-4" style={{ borderColor: ACCENT }}>
                    <p className="font-semibold text-[#1f2c3a]">
                      玻璃體腔
                      <span className="ml-2 text-xs font-normal text-muted-foreground">Vitreous cavity</span>
                    </p>
                    <p className="mt-1 text-sm text-[#475569]">填充於眼球內的透明膠狀組織，維持眼球結構。</p>
                  </li>
                  <li className="border-l-[3px] pl-4" style={{ borderColor: ACCENT }}>
                    <p className="font-semibold text-[#1f2c3a]">健康視網膜特徵</p>
                    <p className="mt-1 text-sm text-[#475569]">血管排列規則、無滲漏、視網膜組織完整。</p>
                  </li>
                </ul>
              </div>

            </Reveal>

            <Reveal
              direction="up"
              delay={80}
              className="overflow-hidden border border-hairline bg-background"
              style={{ boxShadow: `12px 12px 0px #fde3c2` }}
            >
              <div className="relative flex h-[500px] items-center justify-center bg-white px-8 pb-8 pt-16 md:px-10 md:pb-10 md:pt-16">

                <div
                  className="absolute left-4 top-4 z-10 inline-block px-3 py-1 text-[15px] font-medium text-white"
                  style={{ background: "#d98a2b" }}
                >
                  糖尿病性視網膜病變
                </div>
                <img
                  src={diabeticRetina.url}
                  alt="糖尿病性視網膜病變示意圖，標示眼底出血、硬性滲出物、毛細血管擴張異常與新生血管"
                  className="max-h-full max-w-full object-contain"
                  style={{ transform: "scale(1.19)" }}
                />
              </div>
              <div className="p-6 md:p-8">
                <ul className="space-y-4 text-[15px] leading-relaxed text-[#1f2c3a]">
                  {lesions.map((l) => (
                    <li key={l.zh} className="border-l-[3px] pl-4" style={{ borderColor: "#d98a2b" }}>
                      <p className="font-semibold text-[#1f2c3a]">
                        {l.zh}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">{l.en}</span>
                      </p>
                      <p className="mt-1 text-[14px] text-[#475569]">{l.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Daily care */}
      <section className="section-pad bg-[#fafafa]">
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-2xl text-center">
            <p className="text-xs tracking-[0.25em]" style={{ color: ACCENT }}>EYE CARE</p>
            <h2 className="mt-3 font-display text-2xl text-[#1f2c3a] md:text-3xl">糖尿病患者應如何照護眼睛？</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {careGroups.map((g, gi) => (
              <Reveal
                key={g.title}
                direction="up"
                delay={gi * 80}
                className="border border-hairline bg-background p-7 md:p-8"
              >
                <div className="flex items-baseline justify-between border-b border-hairline pb-4">
                  <h3 className="font-display text-lg text-[#1f2c3a]">{g.title}</h3>
                  <span className="text-[11px] tracking-[0.22em]" style={{ color: ACCENT }}>
                    {g.subtitle}
                  </span>
                </div>
                <ul className="mt-5 space-y-4">
                  {g.items.map((it, i) => (
                    <li key={it} className="flex items-baseline gap-4">
                      <span className="font-display text-sm tabular-nums" style={{ color: ACCENT }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] leading-relaxed text-[#1f2c3a]">{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal direction="up" className="mt-10 border-l-[3px] pl-5 text-sm leading-relaxed text-[#475569]" style={{ borderColor: ACCENT }}>
            如有相關症狀，請儘速尋求專科醫師協助。<br />
            <span className="text-muted-foreground">參考來源：林雅雯醫師</span>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
