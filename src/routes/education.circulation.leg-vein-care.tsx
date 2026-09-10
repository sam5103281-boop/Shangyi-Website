import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import cover from "@/assets/leg-vein-care-hero-v3.png.asset.json";
import legsUp from "@/assets/leg-vein-legs-up.jpg.asset.json";
import legsStand from "@/assets/leg-vein-legs-stand.jpg.asset.json";
import legsMassage from "@/assets/leg-vein-legs-massage.jpg.asset.json";
import foodImg from "@/assets/leg-vein-food.jpg.asset.json";
import warningRedness from "@/assets/leg-vein-warning-redness-v3.png.asset.json";
import warningVaricose from "@/assets/leg-vein-warning-varicose-v2.png.asset.json";
import warningSwelling from "@/assets/leg-vein-warning-swelling-v2.jpg.asset.json";
import warningUlcer from "@/assets/warning-ulcer-v2.png.asset.json";
import { absoluteUrl } from "@/lib/seo";

const TEAL = "#7fc4c2";
const TEAL_SOFT = "#eaf6f5";
const TEAL_INK = "#2f7a78";
const ALERT_INK = "#c0392b";

export const Route = createFileRoute("/education/circulation/leg-vein-care")({
  head: () => ({
    meta: [
      { property: "og:url", content: "https://www.shangyi-care.com/education/circulation/leg-vein-care" },
      { title: "腿部靜脈保養與照護指引｜醫療保健專欄｜上怡生醫" },
      {
        name: "description",
        content:
          "從日常活動與姿勢、穿著、飲食與生活管理，到專業輔助建議與就醫時機，整理腿部靜脈保養完整指引。",
      },
      { property: "og:title", content: "腿部靜脈保養與照護指引" },
      {
        property: "og:description",
        content:
          "活動、姿勢、穿著、飲食與專業輔助，建立完整腿部靜脈日常保養與就醫指引。",
      },
      { property: "og:image", content: absoluteUrl(cover.url) },
      { name: "twitter:image", content: absoluteUrl(cover.url) },
    ],
    links: [{ rel: "canonical", href: "https://www.shangyi-care.com/education/circulation/leg-vein-care" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "腿部靜脈保養與照護指引",
          description:
            "從日常活動與姿勢、穿著、飲食與生活管理，到專業輔助建議與就醫時機，整理腿部靜脈保養完整指引。",
          image: cover.url,
          datePublished: "2025-01-15",
          dateModified: "2025-01-15",
          inLanguage: "zh-Hant",
          author: { "@type": "Organization", name: "上怡生技醫藥有限公司" },
          publisher: {
            "@type": "Organization",
            name: "上怡生技醫藥有限公司",
            logo: { "@type": "ImageObject", url: "https://www.shangyi-care.com/favicon.png" },
          },
          mainEntityOfPage: "https://www.shangyi-care.com/education/circulation/leg-vein-care",
        }),
      },
    ],
  }),

  component: ArticlePage,
});

const POSES = [
  {
    img: legsUp,
    t: "抬高雙腳",
    d: "每日抬腿 3–5 次，使腿部高於心臟，促進血液與淋巴回流。",
  },
  {
    img: legsStand,
    t: "避免久坐久站",
    d: "避免久坐、久站或盤腿姿勢，減少下肢靜脈壓力。",
  },
  {
    img: legsMassage,
    t: "活絡腳踝循環",
    d: "長時間乘車或工作時，間歇伸展、踮腳尖、轉動腳踝幫助循環。",
  },
];

const habits = [
  "避免穿著過緊衣物，以免影響靜脈回流。",
  "保持腿部皮膚清潔乾爽，避免長時間泡熱水或受寒。",
  "睡眠時可使用小枕墊高雙腳，幫助夜間回流。",
];

const dietTips = [
  "保持理想體重與規律運動，有助於下肢循環。",
  "維持均衡飲食，少油、少鹽、少糖。",
  "避免過量咖啡與酒精，並補充足夠水分。",
];

const warningSigns: { text: string; img?: { url: string }; zoom?: number }[] = [
  { text: "腿部出現持續性紅腫、疼痛或灼熱感", img: warningRedness, zoom: 1.3 },
  { text: "靜脈明顯突出、扭曲或皮膚變色", img: warningVaricose },
  { text: "單側腿部腫脹、按壓有凹陷感", img: warningSwelling },
  { text: "下肢出現潰瘍或久未癒合的傷口", img: warningUlcer, zoom: 1.18 },
];

function ArticlePage() {
  return (
    <article data-article="leg-vein-care">
      {/* Header */}
      <section className="border-b border-hairline">
        <div className="container-page py-14 md:py-20">
          <nav className="mb-6 text-xs tracking-[0.18em] text-muted-foreground">
            <Link to="/education" className="hover:text-accent">
              醫療保健專欄
            </Link>
            <span className="mx-2">/</span>
            <Link to="/education" hash="circulation" className="hover:text-accent">
              下肢循環與靜脈
            </Link>
          </nav>
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <Reveal direction="up" className="min-w-0">
              <span
                className="inline-block border px-4 py-1 text-sm font-medium"
                style={{ color: TEAL_INK, borderColor: TEAL_INK }}
              >
                下肢循環衛教
              </span>
              <h1 className="mt-6 font-display text-3xl leading-tight text-[#2c3e50] md:text-[40px]">
                腿部靜脈保養
                <br />
                與照護指引
              </h1>
              <p
                className="mt-7 border-l-[3px] pl-5 text-base leading-relaxed text-[#64748b] md:text-lg"
                style={{ borderColor: TEAL_INK }}
              >
                從活動、姿勢、穿著到飲食習慣，搭配適當的專業輔助，
                就能有效減輕下肢靜脈負擔，預防靜脈曲張與深層靜脈栓塞。
              </p>
              <p className="mt-5 text-base leading-relaxed text-[#475569]">
                建立日常保養習慣，是保護下肢循環的第一步。
              </p>
            </Reveal>
            <Reveal
              direction="left"
              delay={60}
              className="overflow-hidden rounded-tl-[4px] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[4px] aspect-[16/10] bg-white transition-transform duration-700 ease-out hover:-translate-y-1"
              style={{ boxShadow: `15px 15px 0px ${TEAL}` }}
            >
              <img
                src={cover.url}
                alt="腿部靜脈保養"
                fetchPriority="high"
                decoding="async"
                className="block h-full w-full object-cover scale-x-[-1] transition-transform duration-[1200ms] ease-out hover:scale-x-[-1.03] hover:scale-y-[1.03]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Activity & poses */}
      <section className="section-pad" style={{ background: TEAL_SOFT }}>
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-2xl text-center">
            <span className="eyebrow" style={{ color: TEAL_INK }}>
              <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
              Activity &amp; Posture
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              活動與姿勢
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              建立每日簡單的活動習慣，就能有效減輕下肢靜脈壓力，促進血液回流。
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POSES.map((p, i) => (
              <Reveal
                key={p.t}
                direction="up"
                delay={i * 40}
                className="group overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-[#eaf6f5]">
                  <img
                    src={p.img.url}
                    alt={p.t}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-foreground">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Habits — editorial list */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <Reveal direction="up" className="lg:sticky lg:top-28 lg:self-start">
              <span className="eyebrow" style={{ color: TEAL_INK }}>
                <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
                Daily Habits · 02
              </span>
              <h2 className="mt-5 font-display text-3xl leading-[1.15] text-foreground md:text-[2.6rem]">
                穿著與<br />日常習慣
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-muted-foreground">
                日常的小習慣，會直接影響下肢靜脈的負擔。從衣著、保養到睡眠細節，
                都是維持腿部循環健康的重要環節。
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-5xl leading-none" style={{ color: TEAL_INK }}>
                  {habits.length}
                </span>
                <span className="text-[12px] uppercase tracking-[0.32em] text-muted-foreground">
                  Care Points
                </span>
              </div>
            </Reveal>

            <div className="relative">
              <ul className="divide-y" style={{ borderColor: `${TEAL}25` }}>
                {habits.map((g, i) => (
                  <Reveal
                    as="li"
                    key={g}
                    direction="up"
                    delay={i * 30}
                    className="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-5 border-b py-5 transition-colors hover:bg-[color:var(--hover)] sm:gap-7 sm:py-6"
                    style={{ borderColor: `${TEAL}22`, ["--hover" as never]: `${TEAL}08` }}
                  >
                    <span
                      className="font-display text-[18px] tabular-nums tracking-wider transition-colors group-hover:text-foreground"
                      style={{ color: `${TEAL_INK}80` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15.5px] leading-[1.7] text-foreground sm:text-base">
                      {g}
                    </span>
                    <span
                      aria-hidden
                      className="hidden h-px w-0 transition-all duration-500 ease-out group-hover:w-10 sm:block"
                      style={{ background: TEAL_INK }}
                    />
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diet — split image + list */}
      <section className="section-pad" style={{ background: TEAL_SOFT }}>
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal
              direction="up"
              className="overflow-hidden rounded-tl-[4px] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[4px] aspect-[16/10]"
              style={{ boxShadow: `15px 15px 0px ${TEAL}` }}
            >
              <img
                src={foodImg.url}
                alt="均衡飲食"
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover scale-[1.18] origin-center transition-transform duration-[1200ms] ease-out hover:scale-[1.22]"
              />

            </Reveal>
            <Reveal direction="up" delay={60}>
              <span className="eyebrow" style={{ color: TEAL_INK }}>
                <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
                Diet &amp; Lifestyle · 03
              </span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
                飲食與生活管理
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                體重與飲食習慣會直接影響血液循環。均衡且節制的生活型態，
                能減少下肢靜脈與心血管的負擔。
              </p>
              <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-foreground/90">
                {dietTips.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: TEAL_INK }}
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Professional aid */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-3xl">
            <span className="eyebrow" style={{ color: TEAL_INK }}>
              <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
              Professional Support · 04
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              專業輔助建議
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              在醫療人員評估及指導下，依個人狀況可使用
              <span className="text-foreground font-medium">醫療級彈性襪</span>
              或<span className="text-foreground font-medium">間歇充氣加壓系統</span>，
              有效促進靜脈回流、減輕腫脹與血液滯留。
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-2xl border border-hairline bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
              >
                <span
                  className="text-[11px] uppercase tracking-[0.32em]"
                  style={{ color: TEAL_INK }}
                >
                  Option A
                </span>
                <h3 className="mt-3 font-display text-lg text-foreground">醫療級彈性襪</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  由腳踝向上遞減的壓力設計，協助靜脈回流，減少下肢血流鬱滯。
                </p>
              </div>
              <div
                className="rounded-2xl border border-hairline bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
              >
                <span
                  className="text-[11px] uppercase tracking-[0.32em]"
                  style={{ color: TEAL_INK }}
                >
                  Option B
                </span>
                <h3 className="mt-3 font-display text-lg text-foreground">
                  間歇充氣加壓系統（IPC）
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  模擬肌肉幫浦的醫療設備，規律充氣排氣，主動推動下肢血液回流。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* When to see doctor — modern medical */}
      <section className="section-pad" style={{ background: TEAL_SOFT }}>
        <div className="container-page">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
              <Reveal direction="up" className="lg:sticky lg:top-28 lg:self-start">
                <span className="eyebrow" style={{ color: ALERT_INK }}>
                  <span className="inline-block h-px w-6" style={{ background: ALERT_INK }} />
                  When to See a Doctor · 05
                </span>
                <h2 className="mt-5 font-display text-3xl leading-[1.1] text-foreground md:text-[2.6rem]">
                  何時<br />應就醫
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-muted-foreground">
                  以下任一徵兆出現時，建議盡早諮詢專業醫療人員。
                  早期評估與處理，能有效降低後續併發症的風險。
                </p>
                <div
                  className="mt-8 inline-flex items-center gap-3 rounded-full border bg-white/70 px-4 py-2 backdrop-blur"
                  style={{ borderColor: `${ALERT_INK}30` }}
                >
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: ALERT_INK }}
                  >
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: ALERT_INK, opacity: 0.4 }}
                    />
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-[0.32em]"
                    style={{ color: ALERT_INK }}
                  >
                    Clinical Alert
                  </span>
                </div>
              </Reveal>

              <div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {warningSigns.map((s, i) => (
                    <Reveal
                      as="div"
                      key={s.text}
                      direction="up"
                      delay={i * 60}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                      style={{ borderColor: `${TEAL_INK}1f` }}
                    >
                      {/* Image slot */}
                      <div
                        className="relative aspect-[4/3] w-full overflow-hidden"
                        style={{ background: `${TEAL_INK}08` }}
                      >
                        {s.img ? (
                          <img
                            src={s.img.url}
                            alt={s.text}
                            loading="lazy"
                            decoding="async"
                            style={s.zoom ? { transform: `scale(${s.zoom})`, transformOrigin: "center" } : undefined}
                            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                          />


                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              viewBox="0 0 80 32"
                              aria-hidden
                              className="h-8 w-24 opacity-25 transition-opacity duration-500 group-hover:opacity-50"
                            >
                              <polyline
                                points="0,16 16,16 24,4 32,28 40,10 48,22 56,16 80,16"
                                fill="none"
                                stroke={ALERT_INK}
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="px-6 py-5">
                        <p className="text-[15.5px] leading-[1.7] text-foreground">
                          {s.text}
                        </p>
                      </div>


                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                        style={{ background: ALERT_INK }}
                      />
                    </Reveal>
                  ))}
                </div>


                <Reveal direction="up" delay={120} className="mt-8">
                  <div
                    className="relative overflow-hidden rounded-2xl bg-white/60 p-6 backdrop-blur"
                    style={{ border: `1px solid ${TEAL_INK}1f` }}
                  >
                    <div className="flex items-start gap-5">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{ background: `${ALERT_INK}12`, color: ALERT_INK }}
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M12 9v4" /><path d="M12 17h.01" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>
                      <div>
                        <p
                          className="text-[11px] uppercase tracking-[0.32em]"
                          style={{ color: ALERT_INK }}
                        >
                          Disclaimer
                        </p>
                        <p className="mt-2 text-[14.5px] leading-[1.85] text-muted-foreground">
                          本文整理為一般健康衛教資訊，不能取代醫師之診斷與治療。
                          如出現持續性腿部不適，請尋求專業醫療協助。
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to column */}
      <section className="border-t border-hairline bg-white">
        <div className="container-page py-16 text-center md:py-20">
          <Link
            to="/education"
            hash="circulation"
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
