import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import cover from "@/assets/diabetic-glucose-check.jpg.asset.json";

const ACCENT = "#eb572a";
const ACCENT_SOFT = "#fef2ed";

export const Route = createFileRoute("/education/diabetes/complication-risks")({
  head: () => ({
    meta: [
      { title: "不可輕忽糖尿病帶來的併發症風險｜醫療保健專欄｜上怡生醫" },
      {
        name: "description",
        content:
          "長期血糖控制不良會傷害人體周邊微血管系統，引發視力、腎臟、神經、腦血管與心血管等多系統病變。本文說明糖尿病成因、AGEs 對微血管的傷害，以及六大常見併發症。",
      },
      { property: "og:title", content: "不可輕忽糖尿病帶來的併發症風險" },
      {
        property: "og:description",
        content: "糖尿病長期血糖控制不良，將引發視力、腎、神經、下肢、腦與心血管等六大病變。",
      },
      { property: "og:image", content: cover.url },
      { name: "twitter:image", content: cover.url },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "不可輕忽糖尿病帶來的併發症風險",
          description:
            "長期血糖控制不良會傷害人體周邊微血管系統，引發視力、腎臟、神經、腦血管與心血管等多系統病變。",
          image: cover.url,
          datePublished: "2025-01-15",
          dateModified: "2025-01-15",
          inLanguage: "zh-Hant",
          author: { "@type": "Organization", name: "上怡生醫醫藥有限公司" },
          publisher: {
            "@type": "Organization",
            name: "上怡生醫醫藥有限公司",
            logo: { "@type": "ImageObject", url: "https://www.shangyi-care.com/favicon.png" },
          },
          mainEntityOfPage: "https://www.shangyi-care.com/education/diabetes/complication-risks",
        }),
      },
    ],
  }),

  component: ArticlePage,
});

const lesions = [
  {
    zh: "視力病變",
    en: "Vision",
    items: ["剝離", "失明", "白內障"],
  },
  {
    zh: "腎病變",
    en: "Kidney",
    items: ["蛋白尿", "尿毒", "洗腎"],
  },
  {
    zh: "神經病變",
    en: "Nerves",
    items: ["酸", "抽", "麻", "痛"],
  },
  {
    zh: "下肢病變",
    en: "Lower limbs",
    items: ["發炎及蜂窩性壞死", "截肢"],
  },
  {
    zh: "腦血管病變",
    en: "Cerebrovascular",
    items: ["腦中風", "腦栓塞"],
  },
  {
    zh: "心血管病變",
    en: "Cardiovascular",
    items: ["心肌梗塞", "心衰竭"],
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
                style={{ color: ACCENT, borderColor: ACCENT }}
              >
                不可輕忽的併發症風險
              </span>
              <h1 className="mt-6 font-display text-3xl leading-tight text-[#1f2c3a] md:text-[42px]">
                不可輕忽糖尿病
                <br />帶來的併發症風險
              </h1>
              <p
                className="mt-7 border-l-[3px] pl-5 text-base leading-relaxed text-[#475569] md:text-lg"
                style={{ borderColor: ACCENT }}
              >
                身體會將碳水化合物轉換成葡萄糖，成為我們身體能量的來源；
                胰臟會分泌胰島素幫助葡萄糖進入細胞，產生能量。
              </p>
            </Reveal>
            <Reveal
              direction="left"
              delay={60}
              className="overflow-hidden rounded-tl-[4px] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[4px] transition-transform duration-700 ease-out hover:-translate-y-1"
              style={{ boxShadow: `15px 15px 0px ${ACCENT_SOFT}` }}
            >
              <img src={cover.url} alt="糖尿病併發症風險" className="block h-auto w-full transition-transform duration-[1200ms] ease-out hover:scale-[1.03]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Detailed intro */}
      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal direction="up">
              <p className="text-xs tracking-[0.25em]" style={{ color: ACCENT }}>WHY IT HAPPENS</p>
              <h2 className="mt-3 font-display text-2xl text-[#1f2c3a] md:text-3xl">糖尿病是怎麼形成的？</h2>
            </Reveal>
            <Reveal direction="up" delay={60} className="mt-6 space-y-5 text-base leading-relaxed text-[#475569]">
              <p>
                糖尿病患者因無法產生足夠的胰島素（胰島素缺乏），或胰島素功能變差（胰島素阻抗性），
                造成葡萄糖無法進入細胞，血糖濃度就會升高，形成糖尿病。
              </p>
              <p>
                經研究顯示，人體周邊微血管系統（腎臟、眼睛視網膜、神經及肢端末梢）的退化病變，
                主要元凶是 <strong className="text-[#1f2c3a]">AGEs（糖化蛋白終產物）</strong>的生成堆積，尤其傷害微血管最為明顯。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Complications grid */}
      <section className="section-pad bg-[#fef2ed]">
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Complications</p>
            <h2 className="mt-4 font-display text-2xl leading-tight text-[#1f2c3a] md:text-[34px]">
              糖尿病血糖若長期控制不良將引發下列病變
            </h2>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full" style={{ background: ACCENT }} />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {lesions.map((l, i) => (
              <Reveal
                key={l.zh}
                direction="up"
                delay={i * 50}
                className="group relative overflow-hidden rounded-2xl border border-[#eb572a]/15 bg-white p-8 shadow-[0_10px_40px_-15px_rgba(235,87,42,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(235,87,42,0.22)]"
              >
                <span
                  className="absolute left-0 top-0 h-0 w-[3px] rounded-tl-2xl rounded-bl-2xl transition-all duration-500 group-hover:h-full"
                  style={{ background: ACCENT }}
                />
                <p className="text-[11px] font-semibold tracking-[0.25em] text-slate-400">
                  {`0${i + 1}`} · {l.en.toUpperCase()}
                </p>
                <h3 className="mt-4 font-display text-[22px] text-[#1f2c3a] md:text-2xl">{l.zh}</h3>
                <div className="mt-5 h-px w-10 transition-all duration-500 group-hover:w-20" style={{ background: ACCENT }} />
                <ul className="mt-5 flex flex-wrap gap-2">
                  {l.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center rounded-md border border-[#eb572a]/15 px-3 py-1 text-[13px] font-medium"
                      style={{ color: ACCENT, background: ACCENT_SOFT }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal
            direction="up"
            className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[#eb572a]/20 pt-8 text-sm text-[#475569] md:flex-row md:items-center"
          >
            <div className="flex items-center gap-3">
              <span className="inline-block h-4 w-[3px]" style={{ background: ACCENT }} />
              <span>如有相關症狀，請儘速尋求專科醫師協助。</span>
            </div>
            <span className="text-xs font-medium tracking-wide text-muted-foreground">參考來源：台中榮民總醫院</span>
          </Reveal>
        </div>
      </section>

      {/* Back to column */}
      <section className="border-t border-hairline bg-white">
        <div className="container-page py-16 text-center md:py-20">
          <Link
            to="/education"
            hash="diabetes"
            className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-6 py-3 text-sm tracking-wider text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-soft"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
            返回醫療保健專欄
          </Link>
        </div>
      </section>
    </article>
  );
}
