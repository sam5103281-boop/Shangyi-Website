import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import postpartumCover from "@/assets/postpartum-care.png.asset.json";
import earlyAmbulationImg from "@/assets/early-ambulation.jpg.asset.json";
import compressionStockingsImg from "@/assets/compression-stockings-v2.jpg.asset.json";
import hydrationImg from "@/assets/hydration-woman.jpg.asset.json";

const ACCENT = "rgb(229, 136, 179)";

export const Route = createFileRoute("/education/postpartum/pe-prevention")({
  head: () => ({
    meta: [
      { title: "產後肺栓塞風險與靜脈血栓預防｜醫療保健專欄｜上怡生醫" },
      {
        name: "description",
        content:
          "產後肺栓塞為孕產期最嚴重的併發症之一。本文說明高風險成因（Virchow's Triad）、早期活動、醫療級壓力襪與 IPC 間歇充氣加壓系統等實證預防方式與警訊辨識。",
      },
      { property: "og:title", content: "產後肺栓塞風險與靜脈血栓預防" },
      {
        property: "og:description",
        content: "從血栓形成機制到實證預防方法，建立產後媽媽的靜脈血栓自我照護觀念。",
      },
      { property: "og:image", content: postpartumCover.url },
      { name: "twitter:image", content: postpartumCover.url },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "產後肺栓塞風險與靜脈血栓預防",
          description:
            "產後肺栓塞為孕產期最嚴重的併發症之一。本文說明高風險成因、早期活動、醫療級壓力襪與 IPC 等實證預防方式。",
          image: postpartumCover.url,
          datePublished: "2025-01-15",
          dateModified: "2025-01-15",
          inLanguage: "zh-Hant",
          author: { "@type": "Organization", name: "上怡生技醫藥有限公司" },
          publisher: {
            "@type": "Organization",
            name: "上怡生技醫藥有限公司",
            logo: { "@type": "ImageObject", url: "https://www.shangyi-care.com/favicon.png" },
          },
          mainEntityOfPage: "https://www.shangyi-care.com/education/postpartum/pe-prevention",
        }),
      },
    ],
  }),

  component: ArticlePage,
});

// 婦科柔粉，作為次要點綴；主色仍走全站 primary / accent
const BLUSH = "#f4dde6";
const BLUSH_SOFT = "#fbf4f7";
const BLUSH_INK = "#9b5a78";

function ArticlePage() {
  return (
    <article>
      {/* Header */}
      <section className="border-b border-hairline">
        <div className="container-page py-14 md:py-20">
          <nav className="mb-6 text-xs tracking-[0.18em] text-muted-foreground">
            <Link to="/education" className="hover:text-accent">
              醫療保健專欄
            </Link>
            <span className="mx-2">/</span>
            <Link to="/education" hash="postpartum" className="hover:text-accent">
              產後照護
            </Link>
          </nav>
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <Reveal direction="up" className="min-w-0">
              <span
                className="inline-block border px-4 py-1 text-sm font-medium"
                style={{ color: BLUSH_INK, borderColor: BLUSH_INK }}
              >
                產後醫療照護重要指引
              </span>
              <h1 className="mt-6 font-display text-3xl leading-tight text-[#2c3e50] md:text-[40px]">
                產後肺栓塞風險與
                <br />
                靜脈血栓預防
              </h1>
              <p
                className="mt-7 border-l-[3px] pl-5 text-base leading-relaxed text-[#64748b] md:text-lg"
                style={{ borderColor: BLUSH_INK }}
              >
                產後肺栓塞（Pulmonary Embolism, PE）是孕產期最嚴重、也最具致命風險的併發症之一。雖然聽起來可怕，但它是「可預防、可監測」的。
              </p>
              <p className="mt-5 text-base leading-relaxed text-[#475569]">
                本文將帶您了解為何產後是高風險期，以及如何透過醫學實證的方法保護自己。
              </p>
            </Reveal>
            <Reveal
              direction="left"
              delay={60}
              className="overflow-hidden rounded-tl-[4px] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[4px] transition-transform duration-700 ease-out hover:-translate-y-1"
              style={{ boxShadow: `15px 15px 0px ${BLUSH}` }}
            >
              <img
                src={postpartumCover.url}
                alt="產後照護"
                width={1600}
                height={1067}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
              />
            </Reveal>
          </div>
        </div>
      </section>


      {/* Virchow's Triad */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-2xl text-center">
            <span className="eyebrow" style={{ color: BLUSH_INK }}>
              <span className="inline-block h-px w-6" style={{ background: BLUSH_INK }} />
              Virchow's Triad
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              為什麼產後是血栓的高風險期？
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              臨床上以菲爾紹三要素解釋血栓形成的機制。對於產後媽媽，這三項條件剛好同時存在。
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "高凝狀態",
                en: "Hypercoagulability",
                d: "身體為了避免分娩時失血過多，懷孕與產後的凝血因子會自然上升。",
              },
              {
                t: "血流鬱滯",
                en: "Hemodynamic Changes",
                d: "增大的子宮壓迫骨盆腔靜脈，加上坐月子期間活動減少、臥床時間長，下肢靜脈回流變慢。",
              },
              {
                t: "血管內皮變化",
                en: "Endothelial Injury",
                d: "分娩的推擠或剖腹產手術切口，都可能造成血管內壁微小損傷，誘發血栓反應。",
              },
            ].map((c, i) => (
              <Reveal
                key={c.t}
                direction="up"
                delay={i * 40}
                className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#e4cad6] hover:shadow-soft"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                  style={{
                    background: `linear-gradient(90deg, ${BLUSH}, ${BLUSH_INK})`,
                  }}
                />
                <h3 className="font-display text-xl text-foreground">{c.t}</h3>
                <p className="mt-1 text-xs tracking-[0.18em] text-muted-foreground">{c.en}</p>
                <div className="my-5 h-px w-10 bg-hairline transition-all duration-500 group-hover:w-16" style={{}} />
                <p className="text-[15px] leading-relaxed text-muted-foreground">{c.d}</p>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            即使沒有明顯症狀，產後女性本身即屬於血栓高風險族群。
          </p>
        </div>
      </section>

      {/* Prevention */}
      <section className="section-pad relative overflow-hidden" style={{ background: BLUSH_SOFT }}>
        <div className="container-page relative">
          <Reveal direction="up" as="div" className="mx-auto max-w-2xl text-center">
            <span
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: BLUSH_INK }}
            >
              <span className="inline-block h-px w-6" style={{ background: BLUSH_INK }} />
              Prevention
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              產後血栓預防的核心原則
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              三個層次的照護，從活動、物理輔具到日常水分，循序建立母親的循環防護。
            </p>
          </Reveal>

          <div className="mt-14 space-y-5">
            {[
              {
                n: "01",
                icon: Stethoscope,
                img: earlyAmbulationImg.url,
                imgAlt: "產後媽媽進行平板支撐活動下肢肌肉",
                t: "早期活動（Early Ambulation）",
                items: [
                  "在麻醉退去、身體狀況允許下，鼓勵儘早下床走動。",
                  "若無法下床，可在床上進行規律的踝關節運動（Ankle Pumping），模擬走路時的肌肉收縮。",
                ],
              },
              {
                n: "02",
                icon: ShieldCheck,
                img: compressionStockingsImg.url,
                imgAlt: "孕婦穿著醫療級漸進式壓力襪於沙發上休息",
                t: "物理性預防措施（Mechanical Prophylaxis）",
                items: [
                  "醫療級漸進式壓力襪（GCS）：由腳踝向上遞減的壓力設計，提供持續性物理壓迫以促進靜脈回流。",
                  "間歇充氣加壓系統（IPC）：模擬肌肉幫浦作用的醫療設備，透過規律充氣與排氣，主動將血液推回心臟。",
                ],
              },
              {
                n: "03",
                icon: HeartPulse,
                img: hydrationImg.url as string | undefined,
                imgAlt: "產後媽媽飲水補充水分維持循環健康" as string | undefined,
                t: "水分補充與生活提醒",
                items: [
                  "維持足夠水分攝取，有助於避免血液過度濃稠，是產後照護中常被忽略、卻相當重要的一環。",
                ],
              },
            ].map((s, i) => (
              <Reveal
                key={s.n}
                direction="up"
                delay={i * 40}
                className="group flex overflow-hidden rounded-2xl border border-hairline bg-surface p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#e4cad6] hover:shadow-soft md:min-h-[260px] md:p-10"
              >
                <div className="flex w-full flex-col gap-5 md:flex-row md:items-stretch md:gap-8">
                  {s.img ? (
                    <div className="-mx-7 -mt-7 overflow-hidden md:-mb-10 md:-ml-10 md:-mt-10 md:mx-0 md:mr-0 md:w-80 md:shrink-0">
                      <img
                        src={s.img}
                        alt={s.imgAlt ?? s.t}
                        width={1200}
                        height={800}
                        className={`aspect-[3/2] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] md:h-full md:aspect-auto ${s.n === "02" ? "object-bottom" : ""}`}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 768px) 320px, 100vw"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 md:w-56 md:flex-col md:items-start">
                      <span
                        className="font-display text-3xl"
                        style={{ color: BLUSH_INK }}
                      >
                        {s.n}
                      </span>
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
                        style={{ background: BLUSH }}
                      >
                        <s.icon className="h-5 w-5" style={{ color: BLUSH_INK }} />
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-foreground md:text-2xl">{s.t}</h3>
                    <ul className="mt-5 space-y-3">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                        >
                          <span
                            className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: BLUSH_INK }}
                          />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alert */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-4xl rounded-2xl border border-hairline bg-surface p-8 md:p-12">
            <div className="flex items-center gap-3 border-b border-hairline pb-5">
              <span className="relative inline-flex h-6 w-6 items-center justify-center">
                <AlertTriangle
                  className="h-6 w-6"
                  style={{ color: BLUSH_INK, fill: BLUSH_INK }}
                />
                <span
                  aria-hidden
                  className="absolute font-bold leading-none text-white"
                  style={{ fontSize: "11px", top: "9px" }}
                >
                  !
                </span>
              </span>
              <h3 className="font-display text-xl text-foreground md:text-2xl">
                重要警訊：需即刻就醫的情況
              </h3>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              無論是否已採取預防措施，仍須高度警覺以下症狀：
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "單側下肢不明原因腫脹、疼痛或緊繃感",
                "突然出現的呼吸困難、胸悶、胸痛",
                "不明原因心悸、頭暈或低血氧表現",
              ].map((it, i) => (
                <li
                  key={it}
                  className="flex translate-x-0 items-start gap-3 rounded-lg bg-[#fdf2f5] px-4 py-3 text-[15px] leading-relaxed text-foreground transition-all duration-300 hover:translate-x-1 hover:bg-[#fbe6ec]"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: BLUSH_INK }}
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              一旦出現上述情形，應立即就醫評估，切勿延誤。
            </p>
          </Reveal>
        </div>
      </section>

      {/* Final */}
      <section className="relative overflow-hidden border-t border-hairline bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] animate-[blushPulse_9s_ease-in-out_infinite] rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(circle, ${BLUSH} 0%, transparent 70%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-[320px] w-[320px] animate-[blushPulse_11s_ease-in-out_infinite_1.5s] rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${BLUSH} 0%, transparent 70%)` }}
        />
        <Reveal direction="up" className="container-page relative py-20 text-center md:py-24">
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            這些提醒，來自無數臨床經驗的累積，
            <br className="hidden md:block" />
            也是醫療人員在一次次遺憾之後，最希望能被提前落實的照護共識。
          </p>
          <p className="mt-6 text-base text-muted-foreground">在關注新生命的同時，請務必記得 ——</p>
          <h4
            className="mt-6 font-display text-2xl leading-snug md:text-3xl"
            style={{ color: BLUSH_INK }}
          >
            照顧好母親，本身就是對孩子最重要的保護。
          </h4>
          <p className="mt-10 text-xs tracking-[0.18em] text-muted-foreground">
            參考資料：American College of Obstetricians and Gynecologists (ACOG) Guidelines
          </p>

          <div className="mt-10">
            <Link
              to="/education"
              hash="postpartum"
              className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-6 py-3 text-sm tracking-wider text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-soft"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              返回醫療保健專欄
            </Link>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
