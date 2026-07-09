import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import dvtInfographic from "@/assets/varicose-veins-leg.png.asset.json";
import symEdema from "@/assets/dvt/sym-edema.png.asset.json";
import symBloodyCough from "@/assets/dvt/sym-bloody-cough.jpg.asset.json";
import symChestPain from "@/assets/dvt/sym-chest-pain.jpg.asset.json";
import symCalfPain from "@/assets/dvt/sym-calf-pain.png.asset.json";
import symDyspnea from "@/assets/dvt/sym-dyspnea.jpg.asset.json";
import symLegInflammation from "@/assets/dvt/sym-leg-inflammation.png.asset.json";
import prevAnticoag from "@/assets/dvt/prev-anticoag.jpg.asset.json";
import prevStockings from "@/assets/dvt/prev-stockings.png.asset.json";
import prevIpc from "@/assets/dvt/prev-ipc.jpg.asset.json";

const TEAL = "#7fc4c2";
const TEAL_SOFT = "#eaf6f5";
const TEAL_INK = "#2f7a78";
const ALERT_INK = "#c0392b";

export const Route = createFileRoute("/education/circulation/dvt-pe-symptoms")({
  head: () => ({
    meta: [
      { title: "認識深層靜脈栓塞與肺栓塞症狀｜醫療保健專欄｜上怡生醫" },
      {
        name: "description",
        content:
          "認識深層靜脈栓塞（DVT）與肺栓塞（PE）的成因、症狀、好發族群與預防方式，協助高風險族群提早辨識與就醫。",
      },
      { property: "og:title", content: "認識深層靜脈栓塞與肺栓塞症狀" },
      {
        property: "og:description",
        content: "DVT 與 PE 的警訊、好發族群、預防方式與分級照護建議。",
      },
      { property: "og:image", content: dvtInfographic.url },
      { name: "twitter:image", content: dvtInfographic.url },
    ],
  }),
  component: ArticlePage,
});

const symptoms = [
  { img: symLegInflammation, t: "下肢水腫", d: "單側腿部腫脹、按壓有凹陷感" },
  { img: symBloodyCough, t: "咳嗽時帶血", d: "咳出帶血或粉紅色泡沫狀痰液" },
  { img: symChestPain, t: "胸痛或壓迫感", d: "深呼吸時胸口疼痛、悶痛", imgClass: "scale-[1.25]" },
  { img: symCalfPain, t: "小腿疼痛", d: "有抽痛和緊繃的感覺" },
  { img: symDyspnea, t: "呼吸急促或呼吸困難", d: "活動或靜止時皆可能出現" },
  { img: symEdema, t: "腿部有紅腫或發炎", d: "局部皮膚發紅、發熱" },
];

const riskGroups = [
  "心血管疾病",
  "中風",
  "凝血功能異常",
  "長期臥床、久坐或久站不動",
  "癌症或正在接受化學治療",
  "下肢受傷或癱瘓",
  "體重過重或肥胖",
  "靜脈曲張",
  "接受外科手術（如骨科、泌尿科）手術時間超過 45 分鐘",
  "年齡超過 40 歲",
  "懷孕或長期服用避孕藥、接受人工生殖或安胎治療",
];

const prevention = [
  {
    img: prevAnticoag,
    t: "抗凝血藥物",
    d: "可降低血栓風險，但同時也可能增加出血機率，須經醫師專業評估後決定。",
  },
  {
    img: prevStockings,
    t: "穿著梯度壓力襪 (GCS)",
    d: "由腳踝向上遞減的壓力設計，協助靜脈回流，減少下肢血流鬱滯。",
  },
  {
    img: prevIpc,
    t: "使用間歇充氣加壓裝置（IPC）",
    d: "模擬肌肉幫浦的醫療設備，規律充氣排氣，主動推動下肢血液回流。",
    
  },
];

type CareTone = "low" | "mid" | "high" | "max";
type CareLevel = {
  level: string;
  badge: string;
  tone: CareTone;
  height: string;
  /** Mode controls how the treatment list reads:
   * - single: 一句話
   * - choose-one: 三選一
   * - one-plus-or: 必選一項 + 二擇一
   * - all-three: 三者皆用 */
  mode: "single" | "choose-one" | "one-plus-or" | "all-three";
  primary?: string;
  options?: string[];
  hint?: string;
};

const careLevels: CareLevel[] = [
  {
    level: "低風險族群",
    badge: "LOW RISK",
    tone: "low",
    height: "md:min-h-[300px]",
    mode: "single",
    hint: "基礎處置",
    primary: "儘早開始活動",
  },
  {
    level: "中風險族群",
    badge: "MEDIUM RISK",
    tone: "mid",
    height: "md:min-h-[340px]",
    mode: "choose-one",
    hint: "三項擇一",
    options: ["梯度壓力襪", "間歇充氣加壓", "抗凝血藥物"],
  },
  {
    level: "高風險族群",
    badge: "HIGH RISK",
    tone: "high",
    height: "md:min-h-[380px]",
    mode: "one-plus-or",
    hint: "必選 + 二擇一",
    primary: "梯度壓力襪",
    options: ["間歇充氣加壓", "抗凝血藥物"],
  },
  {
    level: "極高風險族群",
    badge: "VERY HIGH RISK",
    tone: "max",
    height: "md:min-h-[420px]",
    mode: "all-three",
    hint: "三者並用",
    options: ["梯度壓力襪", "間歇充氣加壓", "抗凝血藥物"],
  },
];

const TONE_COLOR: Record<CareTone, string> = {
  low: "#5ec2b3",
  mid: "#5a9fd4",
  high: "#7a82c9",
  max: "#f56b5d",
};

function OptionRow({
  tone,
  isMax,
  label,
  emphasis,
}: {
  tone: string;
  isMax: boolean;
  label: string;
  emphasis?: boolean;
}) {
  if (isMax) {
    return (
      <span className="flex items-center gap-2.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[13px] font-semibold text-white">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
        {label}
      </span>
    );
  }
  return (
    <span
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] ${
        emphasis
          ? "border font-semibold text-foreground"
          : "border border-hairline bg-surface font-medium text-foreground/85"
      }`}
      style={
        emphasis
          ? { borderColor: `${tone}40`, background: `${tone}0d` }
          : undefined
      }
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: tone }}
      />
      {label}
    </span>
  );
}


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
                認識深層靜脈栓塞
                <br />
                與肺栓塞症狀
              </h1>
              <p
                className="mt-7 border-l-[3px] pl-5 text-base leading-relaxed text-[#64748b] md:text-lg"
                style={{ borderColor: TEAL_INK }}
              >
                深層靜脈栓塞（DVT）若血栓脫落隨血流進入肺部，可能造成致命的肺栓塞（PE）。
              </p>
              <p className="mt-5 text-base leading-relaxed text-[#475569]">
                認識症狀、警訊與好發族群，才能及早辨識、及早就醫。
              </p>
            </Reveal>
            <Reveal
              direction="left"
              delay={60}
              className="overflow-hidden rounded-tl-[4px] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[4px] transition-transform duration-700 ease-out hover:-translate-y-1"
              style={{ boxShadow: `15px 15px 0px ${TEAL}` }}
            >
              <img
                src={dvtInfographic.url}
                alt="腿部靜脈曲張示意圖"
                width={1536}
                height={1024}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What is DVT */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-3xl">
            <span className="eyebrow" style={{ color: TEAL_INK }}>
              <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
              What is DVT
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              何謂深層靜脈栓塞（DVT）？
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              長期臥床或術後患者，由於下肢血液循環不良，容易在腿部深層靜脈形成血栓。
              深層靜脈血栓在早期常不易察覺，但數日後可能出現：
            </p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/90">
              {["腿部痠痛、腫脹", "局部皮膚發紅、發熱", "長期下來可能導致慢性靜脈功能不全，影響生活品質。"].map(
                (it) => (
                  <li key={it} className="flex gap-3">
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: TEAL_INK }}
                    />
                    <span>{it}</span>
                  </li>
                ),
              )}
            </ul>
            <div className="mt-10 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.35em]"
                  style={{ color: ALERT_INK }}
                >
                  Critical
                </span>
                <span
                  className="hidden h-px w-12 md:block"
                  style={{ background: ALERT_INK }}
                />
              </div>
              <div
                className="relative border-t pt-5"
                style={{ borderColor: `${ALERT_INK}33` }}
              >
                <span
                  className="absolute left-0 top-0 h-px w-16 -translate-y-px"
                  style={{ background: ALERT_INK }}
                />
                <p
                  className="font-display text-xl leading-snug md:text-2xl"
                  style={{ color: ALERT_INK }}
                >
                  若血栓脫落並隨血液流入肺部，<br className="hidden sm:block" />
                  可能造成<span className="font-bold">肺栓塞</span>，嚴重時危及生命。
                </p>
                <p
                  className="mt-3 text-[13px] tracking-wide text-muted-foreground"
                >
                  Pulmonary Embolism · 緊急醫療警示
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Symptoms */}
      <section className="section-pad" style={{ background: TEAL_SOFT }}>
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-2xl text-center">
            <span className="eyebrow" style={{ color: TEAL_INK }}>
              <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
              Symptoms
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              DVT 及肺栓塞的症狀
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              出現以下任一症狀時，特別是高風險族群，應提高警覺並盡速就醫評估。
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {symptoms.map((s, i) => (
              <Reveal
                key={s.t}
                direction="up"
                delay={i * 40}
                className="group overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#eaf6f5]">
                  <img
                    src={s.img.url}
                    alt={s.t}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] ${s.imgClass ?? ""}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* High risk groups */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            {/* Left: editorial heading column */}
            <Reveal direction="up" className="lg:sticky lg:top-28 lg:self-start">
              <span className="eyebrow" style={{ color: TEAL_INK }}>
                <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
                High Risk · 01
              </span>
              <h2 className="mt-5 font-display text-3xl leading-[1.15] text-foreground md:text-[2.6rem]">
                哪些人<br />容易發生<br />
                <span style={{ color: TEAL_INK }}>深層靜脈栓塞？</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-muted-foreground">
                以下族群因血流速度、凝血機制或活動能力受限，是 DVT 的高關注對象。如符合任一項，建議與醫療人員討論個人化的預防計畫。
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-5xl leading-none" style={{ color: TEAL_INK }}>
                  {riskGroups.length}
                </span>
                <span className="text-[12px] uppercase tracking-[0.32em] text-muted-foreground">
                  Risk Factors
                </span>
              </div>
            </Reveal>

            {/* Right: numbered editorial list */}
            <div className="relative">
              <ul className="divide-y" style={{ borderColor: `${TEAL}25` }}>
                {riskGroups.map((g, i) => (
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

              <Reveal direction="up" delay={120} className="mt-10">
                <div className="flex items-start gap-4 border-l-2 pl-5" style={{ borderColor: ALERT_INK }}>
                  <p className="text-[12px] uppercase tracking-[0.32em] shrink-0 pt-1" style={{ color: ALERT_INK }}>
                    Advice
                  </p>
                  <p className="text-[15px] leading-[1.9] text-muted-foreground">
                    如具以上危險因子，請務必<span className="text-foreground">諮詢醫師或護理人員</span>，以利後續評估與照護規劃。
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="section-pad" style={{ background: TEAL_SOFT }}>
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-2xl text-center">
            <span className="eyebrow" style={{ color: TEAL_INK }}>
              <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
              Prevention
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              DVT 預防方式
            </h2>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-6xl gap-px overflow-hidden rounded-2xl border bg-surface md:grid-cols-3" style={{ borderColor: `${TEAL}30`, background: `${TEAL}20` }}>
            {prevention.map((p, i) => (
              <Reveal
                key={p.t}
                direction="up"
                delay={i * 80}
                className="group relative flex flex-col bg-surface p-8 transition-colors duration-500 hover:bg-[color:var(--hover)] md:p-10"
                style={{ ["--hover" as never]: TEAL_INK }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-display text-[13px] tabular-nums tracking-[0.32em] text-[#2f7a78] transition-colors group-hover:text-white"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-8 bg-[#2f7a78] transition-all duration-500 group-hover:w-16 group-hover:bg-white"
                  />
                </div>
                <h3 className="mt-8 font-display text-[22px] leading-snug text-foreground transition-colors group-hover:text-white md:text-2xl">
                  {p.t}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.85] text-muted-foreground transition-colors group-hover:text-white/90">
                  {p.d}
                </p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="flex items-start gap-4 border-l-2 pl-5" style={{ borderColor: ALERT_INK }}>
              <p className="text-[13px] uppercase tracking-[0.28em] shrink-0 pt-1" style={{ color: ALERT_INK }}>
                Note
              </p>
              <p className="text-[15px] leading-[1.9] text-muted-foreground">
                抗凝血藥物可降低血栓風險，但同時也可能增加出血機率，並非所有病人皆適合使用，須經<span className="text-foreground">醫師專業評估</span>後決定。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Care plan by risk level */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal direction="up" className="mx-auto max-w-2xl text-center">
            <span className="eyebrow" style={{ color: TEAL_INK }}>
              <span className="inline-block h-px w-6" style={{ background: TEAL_INK }} />
              Care Plan
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              依風險分級的照護建議
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-end gap-5 sm:grid-cols-2 md:grid-cols-4">
            {careLevels.map((c, i) => {
              const color = TONE_COLOR[c.tone];
              const isMax = c.tone === "max";
              return (
                <Reveal
                  key={c.level}
                  direction="up"
                  delay={i * 60}
                  className={`group relative flex w-full flex-col overflow-hidden rounded-2xl p-7 transition-all ${c.height} ${
                    isMax
                      ? "text-white shadow-xl"
                      : "border border-hairline bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                  }`}
                  style={{
                    background: isMax ? color : undefined,
                  }}
                >
                  {/* top accent bar */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: isMax ? "rgba(255,255,255,0.5)" : color }}
                  />

                  {/* header */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.14em]"
                      style={
                        isMax
                          ? { background: "rgba(255,255,255,0.18)", color: "#fff" }
                          : { background: `${color}14`, color }
                      }
                    >
                      {c.badge}
                    </span>
                    <span
                      className={`font-mono text-[11px] tabular-nums ${isMax ? "text-white/60" : "text-foreground/40"}`}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <h3
                    className={`mt-4 font-display text-[1.3rem] font-bold leading-tight ${isMax ? "text-white" : "text-foreground"}`}
                  >
                    {c.level}
                  </h3>

                  {c.hint && (
                    <div
                      className={`mt-1.5 text-[11px] font-medium tracking-wide ${isMax ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {c.hint}
                    </div>
                  )}

                  {/* divider */}
                  <div
                    className={`my-5 h-px w-full ${isMax ? "bg-white/20" : "bg-hairline"}`}
                  />

                  {/* options */}
                  <div className="flex flex-col gap-2">
                    {c.mode === "single" && c.primary && (
                      <OptionRow tone={color} isMax={false} label={c.primary} emphasis />
                    )}

                    {c.mode === "choose-one" && c.options &&
                      c.options.map((o) => (
                        <OptionRow key={o} tone={color} isMax={false} label={o} />
                      ))}

                    {c.mode === "one-plus-or" && c.primary && c.options && (
                      <>
                        <OptionRow tone={color} isMax={false} label={c.primary} emphasis />
                        <div className="my-1 flex items-center gap-2">
                          <span className="h-px flex-1 bg-hairline" />
                          <span className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground">
                            + OR
                          </span>
                          <span className="h-px flex-1 bg-hairline" />
                        </div>
                        {c.options.map((o) => (
                          <OptionRow key={o} tone={color} isMax={false} label={o} />
                        ))}
                      </>
                    )}

                    {c.mode === "all-three" && c.options &&
                      c.options.map((o) => (
                        <OptionRow key={o} tone={color} isMax label={o} />
                      ))}
                  </div>
                </Reveal>
              );
            })}
          </div>


          {/* Risk progression bar */}
          <div className="mx-auto mt-10 flex max-w-5xl items-center gap-5 px-4">
            <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
              Risk · 風險遞增
            </span>
            <div className="relative h-[3px] flex-1 rounded-full bg-foreground/10">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${TONE_COLOR.low} 0%, ${TONE_COLOR.mid} 33%, ${TONE_COLOR.high} 66%, ${TONE_COLOR.max} 100%)`,
                }}
              />
              {[0, 33, 66, 100].map((p, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-foreground/30"
                  style={{ left: `${p}%` }}
                />
              ))}
            </div>
            <div
              className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent"
              style={{ borderLeftColor: TONE_COLOR.max }}
            />
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden border-t border-hairline bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] animate-[blushPulse_9s_ease-in-out_infinite] rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(circle, ${TEAL} 0%, transparent 70%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-[320px] w-[320px] animate-[blushPulse_11s_ease-in-out_infinite_1.5s] rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${TEAL} 0%, transparent 70%)` }}
        />
        <Reveal direction="up" className="container-page relative py-20 text-center md:py-24">
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            血栓的發生往往悄無聲息，
            <br className="hidden md:block" />
            提早辨識症狀與落實預防，是守護循環健康最關鍵的一步。
          </p>
          <p className="mt-6 text-base text-muted-foreground">在出現警訊時，請務必記得 ——</p>
          <h4
            className="mt-6 font-display text-2xl leading-snug md:text-3xl"
            style={{ color: TEAL_INK }}
          >
            及早就醫評估，是對自己循環健康最重要的保護。
          </h4>
          <p className="mt-10 text-xs tracking-[0.18em] text-muted-foreground">
            本資訊僅供衛教參考，實際預防及治療方式請遵照醫師或專業醫療人員指示進行。
          </p>
          <div className="mt-10">
            <Link
              to="/education"
              hash="circulation"
              className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-6 py-3 text-sm tracking-wider text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-soft"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              返回醫療保健專欄
            </Link>
          </div>
        </Reveal>
      </section>

    </article>
  );
}
