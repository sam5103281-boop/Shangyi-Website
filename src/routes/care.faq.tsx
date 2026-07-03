import { createFileRoute, Link } from "@tanstack/react-router";
import { CareSubNav } from "@/components/CareSubNav";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import careFaq from "@/assets/care-faq.jpg";

export const Route = createFileRoute("/care/faq")({
  head: () => ({
    meta: [
      { title: "衛教 Q&A｜下肢循環照護｜上怡生技" },
      {
        name: "description",
        content:
          "下肢循環衛教 Q&A：認識血栓、下肢腫脹成因、IPC 間歇性氣壓循環原理、適應症、漸進式壓力與常見疑問。",
      },
      { property: "og:title", content: "衛教 Q&A｜下肢循環照護" },
      {
        property: "og:description",
        content: "從照護觀念、安心指引到常見問題，建立對 IPC 與下肢循環的正確認知。",
      },
    ],
  }),
  component: FaqPage,
});

const anchors = [
  { id: "concept", label: "照護觀念", en: "Care Concept" },
  { id: "guide", label: "安心指引", en: "Safety Guide" },
  { id: "questions", label: "常見問題", en: "FAQ" },
] as const;

function FaqPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
          <div>
            <nav className="text-xs tracking-[0.22em] text-muted-foreground">
              <Link to="/care" className="hover:text-foreground">
                CARE
              </Link>
              <span className="mx-2 text-accent">/</span>
              <span className="text-foreground">EDUCATION Q&A</span>
            </nav>
            <span className="eyebrow mt-5">
              <span className="inline-block h-px w-6 bg-accent" />
              Education Q&A
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">
              衛教 Q&A
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              從基礎照護觀念、IPC 安心指引，到醫療現場最常被問到的問題，
              一次幫您建立完整的下肢循環照護認知。內容僅供衛教參考，實際使用請依專業醫療人員建議。
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {anchors.map((a) => (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  className="border border-hairline bg-surface px-5 py-3 text-base text-foreground hover:border-accent hover:text-accent"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-hairline bg-surface">
            <img
              src={careFaq}
              alt="下肢循環衛教"
              width={1600}
              height={900}
              className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <CareSubNav />

      {/* 照護觀念 */}
      <section id="concept" className="section-pad scroll-mt-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="01 · Care Concept"
            title="照護觀念"
            description="從血液循環的基本原理，理解下肢腫脹的成因與何時應該就醫。建立正確認知，是照護行動的第一步。"
          />



          {/* Core Concept · asymmetric editorial */}
          <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-12">

            <article className="col-span-12 md:col-span-7">
              <div className="border-t border-hairline pt-8">
                <span className="text-[11px] tracking-[0.28em] text-accent">DEFINITION · 01</span>
                <h3 className="mt-3 font-display text-3xl leading-snug text-foreground">
                  什麼是「血栓」？
                </h3>
                <figure className="relative mt-8 overflow-hidden rounded-sm bg-gradient-to-br from-accent/12 via-accent/6 to-transparent">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-1 bg-accent"
                  />
                  <div className="flex items-start gap-5 px-7 py-8 md:px-9 md:py-10">
                    <span
                      aria-hidden
                      className="font-display text-5xl leading-none text-accent/60"
                    >
                      “
                    </span>
                    <blockquote className="flex-1">
                      <p className="font-display text-2xl leading-snug text-foreground md:text-[26px]">
                        血液回流不順，就像停滯的水流。
                      </p>
                      <figcaption className="mt-4 flex items-center gap-3 text-[11px] tracking-[0.28em] text-accent">
                        <span className="h-px w-6 bg-accent" />
                        CORE INSIGHT · 循環的本質
                      </figcaption>
                    </blockquote>
                  </div>
                </figure>

                <div className="mt-6 space-y-4 text-base leading-loose text-muted-foreground">
                  <p>
                    血栓就是血管內異常凝結的血塊。當活動量不足時，血流速度變慢，
                    就像河流淤積沉澱物，容易形成血塊堵塞血管。
                  </p>
                  <p>
                    如果血栓脫落並隨著血液流動，可能會堵塞肺部或心臟等重要部位。因此，
                    <strong className="border-b-2 border-accent pb-0.5 font-medium text-foreground">
                      讓血液保持流動
                    </strong>
                    是預防血栓最核心的照護重點。
                  </p>
                </div>
              </div>
            </article>

            <article className="col-span-12 md:col-span-4 md:col-start-9 md:mt-16">
              <div className="relative border-t border-hairline pt-8">
                <span className="absolute -top-2.5 right-0 bg-background px-2 text-[10px] tracking-[0.28em] text-accent">
                  MECHANISM · 02
                </span>
                <h3 className="font-display text-2xl leading-snug text-foreground">
                  為什麼下肢容易腫脹？
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  雙腳回流心臟，必須對抗強大的地心引力。
                </p>
                <dl className="mt-8 space-y-6">
                  <div className="border-l border-accent/40 pl-4">
                    <dt className="font-display text-base text-foreground">
                      小腿肌肉幫浦
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      被稱為「第二個心臟」，透過收縮擠壓靜脈血液向上回流。
                    </dd>
                  </div>
                  <div className="border-l border-accent/40 pl-4">
                    <dt className="font-display text-base text-foreground">
                      靜脈瓣膜導流
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      像單向閥門防止血液倒流。當這兩個機制減弱，血液就會淤積在下肢。
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>

          {/* Warning Signs · editorial numbered list */}
          <div className="mt-20 grid grid-cols-12 gap-x-8 gap-y-10 border-y border-hairline py-16">
            <div className="col-span-12 md:col-span-4">
              <div className="md:sticky md:top-24">
                <span className="text-[11px] tracking-[0.28em] text-accent">
                  MEDICAL RED FLAGS
                </span>
                <h3 className="mt-3 font-display text-3xl leading-snug text-foreground">
                  腿腫 ≠ 小事？
                  <br />
                  <span className="text-accent">四大醫療警訊</span>
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  雖然多數浮腫源於生理性疲勞，但若伴隨以下狀況，
                  請以溫柔且謹慎的心情尋求專業協助。
                </p>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">
                  ※ 若符合上述情況，建議諮詢家庭醫師或心臟血管科。
                </p>
              </div>
            </div>
            <ol className="col-span-12 md:col-span-8">
              {[
                { title: "腫脹持續不退", desc: "休息後仍無明顯改善，睡眠一夜後仍舊沉重。" },
                { title: "單側明顯腫脹", desc: "左右腿粗細明顯不對稱，觸感差異可辨。" },
                { title: "合併疼痛與發熱", desc: "皮膚發紅、緊繃或發燙，出現局部發炎徵兆。" },
                { title: "活動減少後加重", desc: "長期臥床或久坐後惡化，起身時感到麻脹。" },
              ].map((w, i) => (
                <li
                  key={w.title}
                  className="group flex gap-8 border-b border-hairline py-7 first:pt-0 last:border-b-0"
                >
                  <span className="font-display text-4xl leading-none text-hairline transition-colors duration-500 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-display text-xl text-foreground">{w.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {w.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Methods · layered cards */}
          <div className="mt-20">
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-hairline pb-5">
              <div>
                <span className="text-[11px] tracking-[0.28em] text-accent">
                  CARE METHODS
                </span>
                <h3 className="mt-3 font-display text-2xl leading-snug text-foreground md:text-[26px]">
                  三種循環照護途徑
                </h3>
              </div>

              <span className="hidden text-xs tracking-[0.25em] text-muted-foreground md:inline">
                From daily habit to clinical support
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-6">
              {[
                {
                  k: "METHOD 01",
                  t: "活動與姿勢調整",
                  d: "最基礎且有效。透過定時抬腿、腳踝運動協助肌肉幫浦運作，從源頭促進血液回流。",
                  tone: "light",
                },
                {
                  k: "METHOD 02",
                  t: "彈性壓力輔具",
                  d: "如醫療級彈性襪，利用漸進式壓力支撐靜脈，減少血液淤積並減緩組織液滲出。",
                  tone: "tint",
                },
                {
                  k: "METHOD 03",
                  t: "間歇性氣壓循環 (IPC)",
                  d: "模擬肌肉收縮的物理效果。透過規律的充氣與放氣，為下肢提供動態循環，是臨床上預防血栓的常用輔助方案。",
                  tone: "dark",
                },
              ].map((m, i) => {
                const isDark = m.tone === "dark";
                const isTint = m.tone === "tint";
                return (
                  <article
                    key={m.k}
                    className={
                      "group relative flex h-full flex-col overflow-hidden rounded-sm transition-transform duration-300 hover:-translate-y-1 " +
                      (isDark
                        ? "bg-primary text-primary-foreground shadow-elevated"
                        : isTint
                          ? "bg-accent/8 border border-accent/20"
                          : "bg-surface border border-hairline")
                    }
                  >
                    <div
                      aria-hidden
                      className={
                        "flex items-center justify-between px-6 pt-5 pb-4 md:px-7 " +
                        (isDark ? "border-b border-primary-foreground/15" : "border-b border-hairline")
                      }
                    >
                      <span
                        className={
                          "text-[11px] tracking-[0.28em] " +
                          (isDark ? "text-accent" : "text-accent")
                        }
                      >
                        {m.k}
                      </span>
                      <span
                        className={
                          "font-display text-2xl leading-none " +
                          (isDark ? "text-primary-foreground/40" : "text-hairline")
                        }
                        style={{ fontFeatureSettings: '"tnum"' }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-6 pb-8 pt-6 md:px-7">
                      <h4
                        className={
                          "font-display text-xl leading-snug " +
                          (isDark ? "text-primary-foreground" : "text-foreground")
                        }
                      >
                        {m.t}
                      </h4>
                      <p
                        className={
                          "mt-4 text-sm leading-relaxed " +
                          (isDark ? "text-primary-foreground/75" : "text-muted-foreground")
                        }
                      >
                        {m.d}
                      </p>
                    </div>
                    <div
                      aria-hidden
                      className={
                        "h-1.5 w-full transition-colors duration-300 " +
                        (isDark
                          ? "bg-accent"
                          : isTint
                            ? "bg-accent/70 group-hover:bg-accent"
                            : "bg-foreground/80 group-hover:bg-accent")
                      }
                    />
                  </article>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 安心指引 */}
      <section id="guide" className="border-t border-hairline bg-surface-muted section-pad scroll-mt-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="02 · Safety Guide"
            title="安心指引"
            description="醫師何時會建議使用 IPC？醫療人員又會評估哪些重點？"
          />

          <div className="mt-12 overflow-hidden rounded-sm border border-[#28bfb0]/25 bg-gradient-to-br from-[#28bfb0]/10 via-surface to-[#28bfb0]/5 shadow-soft">

            <div className="grid gap-y-0 md:grid-cols-[minmax(0,320px)_1fr]">
              <div className="relative border-b border-[#28bfb0]/20 bg-gradient-to-br from-[#28bfb0]/25 via-[#28bfb0]/10 to-transparent p-7 md:border-b-0 md:border-r md:p-9">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-1 bg-[#28bfb0]"
                />
                <span className="text-[11px] tracking-[0.28em] text-[#0e6b61]">
                  CLINICAL INDICATIONS
                </span>
                <h3 className="mt-4 font-display text-2xl leading-snug text-foreground md:text-[26px]">
                  醫師在什麼情況下<br className="hidden md:block" />會建議使用 IPC？
                </h3>
                <div className="mt-5 h-px w-10 bg-[#28bfb0]" />
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  以下為臨床常見的建議情境，實際適用仍需依醫師專業評估。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {[
                  {
                    n: "I",
                    t: "活動量明顯下降或長時間不動",
                    d: "例如手術後、臥床休養或行動受限期間，下肢肌肉收縮減少導致回流效率降低。",
                  },
                  {
                    n: "II",
                    t: "下肢循環不佳、反覆腫脹沉重",
                    d: "腿部長期感到緊繃、沉重，經醫師評估與循環功能相關時，協助血液回流。",
                  },
                  {
                    n: "III",
                    t: "有血栓風險，需要加強預防",
                    d: "對於高風險族群，在無法單靠日常活動改善循環時，作為預防性循環輔助的一環。",
                  },
                  {
                    n: "IV",
                    t: "需要銜接居家循環照護時",
                    d: "在醫師與護理專業指導下，將臨床照護延伸至居家的輔助選項。",
                  },
                ].map((c) => (
                  <div
                    key={c.t}
                    className="flex gap-5 border-t border-[#28bfb0]/15 p-6 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(odd)]:border-r md:p-7"
                  >
                    <div className="flex-shrink-0">
                      <span className="font-display text-2xl leading-none text-[#0e6b61]">
                        {c.n}
                      </span>
                      <div className="mt-2 h-px w-6 bg-[#28bfb0]/60" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-base leading-snug text-foreground">
                        {c.t}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {c.d}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-[#28bfb0]/20 bg-gradient-to-r from-[#28bfb0]/15 to-[#28bfb0]/5 px-7 py-5 sm:flex-row sm:items-start sm:gap-4 md:px-9">
              <span className="mt-0.5 text-xs font-semibold tracking-[0.25em] text-[#28bfb0]">
                重要提醒
              </span>
              <p className="text-sm leading-relaxed text-foreground">
                是否適合使用 IPC，仍需依個人健康狀況而定。重點在於
                <strong className="text-[#28bfb0]">「什麼時候用、怎麼用、用得是否安全」</strong>。
              </p>
            </div>

          </div>

          <div className="mt-20">
            <div className="mb-10 flex flex-col gap-4 border-b border-hairline pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[11px] tracking-[0.28em] text-accent">
                  PRE-USE ASSESSMENT
                </span>
                <h3 className="mt-3 font-display text-2xl leading-snug text-foreground md:text-[26px]">
                  使用 IPC 前，醫療人員會評估哪些重點？
                </h3>
              </div>

              <span className="hidden text-xs tracking-[0.25em] text-muted-foreground md:inline">
                Four clinical checkpoints
              </span>
            </div>
            <ol className="grid gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-4 xl:gap-8">
              {[
                {
                  n: "01",
                  t: "是否符合禁忌症狀",
                  d: "排除急性血栓、嚴重血管阻塞或未癒合傷口等不適合情況。",
                },
                {
                  n: "02",
                  t: "下肢與整體健康評估",
                  d: "包含目前腿部循環表現、既往疾病與目前的治療狀態。",
                },
                {
                  n: "03",
                  t: "使用目的與照護階段",
                  d: "依據術後、預防性照護或居家需求，動態調整使用方式。",
                },
                {
                  n: "04",
                  t: "操作與照護支援能力",
                  d: "確認使用者能正確操作，並備有順暢的追蹤與諮詢管道。",
                },
              ].map((e) => (
                <li
                  key={e.n}
                  className="group relative flex h-full flex-col rounded-sm border border-hairline bg-surface px-7 pt-8 pb-9 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-elevated md:px-8 md:pt-10 md:pb-10"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[3px] w-12 bg-accent"
                  />

                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      aria-hidden
                      className="font-display text-5xl leading-none text-accent md:text-[56px]"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {e.n}
                    </span>
                    <span className="text-[10px] tracking-[0.28em] text-muted-foreground">
                      CHECKPOINT
                    </span>
                  </div>
                  <div className="mt-6 h-px w-10 bg-accent/40 transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
                  <h4 className="mt-6 font-display text-lg leading-snug text-foreground md:text-xl">
                    {e.t}
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {e.d}
                  </p>

                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 常見問題 */}
      <section id="questions" className="section-pad scroll-mt-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="03 · FAQ"
            title="常見問題"
            description="關於 IPC 醫療級循環治療最常被詢問的疑問。"
          />

          <Accordion type="single" collapsible defaultValue="0" className="mt-12 space-y-6">
            {[
              {
                q: "醫師常提到的 IPC 是什麼？跟按摩一樣嗎？",
                a: [
                  "IPC 是「間歇性氣壓循環治療」（Intermittent Pneumatic Compression），是一種協助下肢血液回流的非侵入式醫療循環輔助方式，與一般以放鬆或舒壓為目的的按摩機並不相同。",
                  "IPC 的原理，是利用氣壓套包覆雙腿，透過有順序、規律的「充氣與放氣」，像幫浦一樣，將腿部血液與淋巴液由下往上推回身體循環。它不是為了放鬆肌肉或震動舒壓，而是臨床上經過驗證，專門用來改善下肢循環、消除水腫、預防血液滯留的正規治療方式。",
                ],
              },
              {
                q: "醫療級 IPC vs. 一般按摩椅／美腿機，差別在哪？",
                a: [
                  "最大的差別在於：一個是「揉肌肉」，一個是「推血管」。如果您是為了改善腫脹或循環問題，必須選擇醫療級設備才能達到生理上的回流效果。",
                ],
                table: {
                  head: ["比較項目", "一般按摩器材 / 美腿機", "醫療級 IPC 循環治療"],
                  rows: [
                    ["作用標的", "肌肉骨骼系統", "血管淋巴系統"],
                    ["運作原理", "震動、揉捏、定點指壓", "序列式充氣 / 梯度加壓"],
                    ["流體動力", "無特定方向性", "單向推進（由遠心端至近心端）"],
                    ["臨床適應症", "肌肉疲勞、痠痛、緊繃", "肢體水腫、靜脈曲張、預防血栓"],
                  ],
                },
              },
              {
                q: "什麼狀況，會適合使用這類設備？",
                a: ["若符合以下臨床適應症，IPC 將是有效的輔助治療選擇："],
                lists: [
                  {
                    h: "慢性靜脈功能不全 (CVI)",
                    items: [
                      "下肢沉重、痠麻或有漲痛感。",
                      "觀察到明顯的靜脈曲張（青筋浮現）或皮膚色素沉澱。",
                    ],
                  },
                  {
                    h: "體位性與功能性水腫",
                    items: [
                      "晨輕暮重：早起時正常，但下午或傍晚腳踝明顯腫脹。",
                      "職業性久站久坐：如護理人員、教職、櫃檯或辦公室族群。",
                    ],
                  },
                  {
                    h: "淋巴系統回流受損",
                    items: [
                      "經醫師診斷之淋巴水腫 (Lymphedema)。",
                      "手術後（如癌症術後）或創傷後的組織腫脹控制。",
                    ],
                  },
                  {
                    h: "活動受限者的循環照護",
                    items: ["長期臥床、行動不便或中風患者，需預防深層靜脈血栓 (DVT)。"],
                  },
                ],
              },
              {
                q: "為什麼一定要「漸進式壓力」？對我有什麼好處？",
                a: [
                  "因為這關係到「血液能不能真的流回去」。人體下肢血液回流必須對抗地心引力，專業設備會模擬人體生理機制，採用「下緊上鬆」的梯度設計：腳踝壓力最大、小腿壓力遞減、大腿壓力最小。",
                  "有壓力梯度，才能創造單向引流，讓血液與淋巴液穩定往心臟移動。",
                ],
              },
              {
                q: "機器的壓力會不會很大？會不會不舒服？",
                a: [
                  "高規格的醫療級 IPC 具備自動偵測機制，會依照身體實際的回流狀況進行溫和、分段的推動：",
                ],
                steps: [
                  ["偵測回流", "系統會偵測下肢的回流狀況"],
                  ["等待充盈", "讓新的血液重新回填至腿部血管"],
                  ["再次推動", "確認回填完成後才進行下一次加壓"],
                ],
              },
              {
                q: "我只有一邊腳腫，為什麼醫師建議雙腳一起做？",
                a: [
                  "下肢的血液與淋巴循環是整體系統。即使症狀只在一側，臨床多半建議雙下肢同步處理，以避免水分轉移到不適當部位，並提升整體回流效率與治療穩定度。",
                ],
                note: {
                  label: "DOCTOR'S NOTE｜醫師提醒",
                  text: "即使水腫只出現在一側，治療仍以「整體循環平衡」為原則。雙下肢同步處理，是基於醫療安全與實際效果的專業建議。",
                },
              },
            ].map((qa, i) => (
              <AccordionItem
                key={i}
                value={String(i)}
                className="border border-hairline bg-surface p-7 md:p-9 overflow-hidden"
              >
                <AccordionTrigger className="py-0 font-display text-lg leading-snug text-foreground md:text-xl hover:no-underline [&>svg]:text-accent">
                  <span className="flex-1 pr-4 text-left">
                    <span className="mr-3 text-accent">Q.</span>
                    {qa.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="mt-5 space-y-4 text-sm leading-relaxed">
                    {qa.a.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>

                  {qa.table && (
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full border border-hairline text-sm">
                        <thead className="bg-surface-muted">
                          <tr>
                            {qa.table.head.map((h) => (
                              <th
                                key={h}
                                className="border-b border-hairline px-4 py-3 text-left text-xs tracking-wider text-foreground"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {qa.table.rows.map((row, ri) => (
                            <tr key={ri} className="border-t border-hairline">
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={`px-4 py-3 ${
                                    ci === 0
                                      ? "font-medium text-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {qa.lists && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {qa.lists.map((l) => (
                        <div
                          key={l.h}
                          className="border-l-2 border-accent bg-surface-muted p-4"
                        >
                          <h4 className="font-display text-base text-foreground">{l.h}</h4>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                            {l.items.map((it) => (
                              <li key={it}>{it}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {qa.steps && (
                    <ol className="mt-6 grid gap-3 sm:grid-cols-3">
                      {qa.steps.map(([h, d], si) => (
                        <li
                          key={h}
                          className="border border-hairline bg-surface-muted p-4"
                        >
                          <span className="text-[10px] tracking-[0.25em] text-accent">
                            {String(si + 1).padStart(2, "0")}
                          </span>
                          <p className="mt-2 font-display text-base text-foreground">{h}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {d}
                          </p>
                        </li>
                      ))}
                    </ol>
                  )}

                  {qa.note && (
                    <div className="mt-6 border border-accent/40 bg-accent/5 p-5">
                      <p className="text-[11px] tracking-[0.25em] text-accent">
                        {qa.note.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        {qa.note.text}
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
            ※ 本頁內容為衛教資訊，不取代醫師之診斷、治療或臨床決策。是否適用，仍以醫師臨床判斷與護理師到府評估結果為準。
          </p>
        </div>
      </section>
    </>
  );
}
