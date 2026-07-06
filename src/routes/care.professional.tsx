import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { CareSubNav } from "@/components/CareSubNav";
import { SectionHeading } from "@/components/SectionHeading";
import careProfessional from "@/assets/care-professional-nurse.jpg.asset.json";

export const Route = createFileRoute("/care/professional")({
  head: () => ({
    meta: [
      { title: "專業照護｜下肢循環照護｜上怡生技 ComWell" },
      {
        name: "description",
        content:
          "ComWell 居家下肢循環照護專業模式：護理師評估把關、四步驟導入流程與在地團隊長期陪伴，讓醫師放心轉介。",
      },
      { property: "og:title", content: "專業照護｜下肢循環照護" },
      {
        property: "og:description",
        content: "標準化流程＋臨床護理師把關，建立讓醫師放心轉介的居家循環照護模式。",
      },
    ],
  }),
  component: ProfessionalCarePage,
});

const features = [
  {
    title: "不只是銷售設備",
    desc: "提供完整的循環照護方案，而非單一產品。從評估、導入、追蹤到維護，全程由專業團隊負責。",
  },
  {
    title: "專業評估把關",
    desc: "由具臨床經驗的護理師依 SOP 進行完整評估，確認「適合使用」後才導入；不適合的個案我們會主動建議暫緩。",
  },
  {
    title: "在地團隊持續陪伴",
    desc: "台灣在地專業團隊提供維護、衛教與技術支援，讓照護不因距離而中斷。",
  },
];

const steps = [
  {
    step: "STEP 01",
    title: "專業評估",
    desc: "由具臨床照護經驗之護理師，依照 SOP 進行完整評估，確認適用性並完成風險篩選。",
  },
  {
    step: "STEP 02",
    title: "到府導入",
    desc: "護理師到府執行設備安裝與操作指導，首次使用全程陪同，確保安全銜接。",
  },
  {
    step: "STEP 03",
    title: "使用追蹤",
    desc: "導入後納入追蹤流程，持續確認居家使用狀況，並適時調整衛教指引。",
  },
  {
    step: "STEP 04",
    title: "在地支援",
    desc: "台灣專業團隊持續提供維護與諮詢，確保照護能穩定延續並符合臨床指引。",
  },
];

function ProfessionalCarePage() {
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
              <span className="text-foreground">PROFESSIONAL</span>
            </nav>
            <span className="eyebrow mt-5">
              <span className="inline-block h-px w-6 bg-accent" />
              Professional Care
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">
              為何選擇 ComWell？
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              安全，永遠比方便更重要。許多人以為只要有設備，就能改善下肢循環；
              但 ComWell 深知 —— 設備只是工具，真正讓人安心的，是專業是否到位。
              我們透過標準化流程與在地支援，建立一套讓醫師放心轉介、讓病人安心使用的模式。
            </p>
          </div>
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-hairline bg-surface p-6">
            <img
              src={careProfessional.url}
              alt="ComWell 居家循環照護設備"
              width={1600}
              height={900}
              className="h-auto max-h-[420px] w-auto max-w-full object-contain"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <CareSubNav />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why ComWell"
            title="專業模式的三個核心"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="relative flex flex-col gap-3 overflow-hidden rounded-[0.5pt] border border-hairline bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
              >
                <h3 className="font-display text-xl text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent/80 via-[#28bfb0] to-[#2dd4bf]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface-muted">
        <div className="container-page section-pad">
          <SectionHeading
            eyebrow="Care Pathway"
            title="ComWell 如何陪您開始？"
            description="四個安心關卡，確保居家照護安全無虞。"
          />
          <div className="mt-12">
            {/* Desktop / tablet horizontal flow */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-4">
              {steps.map((s, index) => (
                <Fragment key={s.step}>
                  <li
                    className="group relative flex flex-col justify-center gap-3 overflow-hidden rounded-[0.5pt] border border-hairline bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                  >
                    <span className="text-[11px] font-medium tracking-[0.25em] text-accent">
                      {s.step}
                    </span>
                    <h4 className="font-display text-lg text-foreground">{s.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent/80 via-[#28bfb0] to-[#2dd4bf]" />
                    <span className="absolute right-3 top-3 font-display text-2xl font-medium text-foreground/[0.04]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </li>
                  {index < steps.length - 1 && (
                    <div className="flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-accent shadow-sm">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            {/* Mobile vertical flow */}
            <ol className="grid gap-4 md:hidden">
              {steps.map((s, index) => (
                <li key={s.step} className="flex flex-col items-center gap-4">
                  <div className="group relative flex w-full flex-col gap-3 overflow-hidden rounded-[0.5pt] border border-hairline bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                    <span className="text-[11px] font-medium tracking-[0.25em] text-accent">
                      {s.step}
                    </span>
                    <h4 className="font-display text-lg text-foreground">{s.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent/80 via-[#28bfb0] to-[#2dd4bf]" />
                    <span className="absolute right-3 top-3 font-display text-2xl font-medium text-foreground/[0.04]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-accent shadow-sm">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 rounded-[0.5pt] border border-accent/40 bg-accent/5 p-8 md:p-10">
            <p className="text-xs tracking-[0.25em] text-accent">
              重要提醒｜適用性說明
            </p>
            <p className="mt-4 font-display text-xl text-foreground md:text-2xl">
              病人安全，優先於商業考量。
            </p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/85 md:text-base">
              <p>
                並非每一位個案都適合進行居家下肢循環照護。ComWell 秉持
                <strong>「病人安全優先於商業考量」</strong>
                的原則，所有服務在導入前，皆須經由護理師完整評估並清楚說明。
              </p>
              <p>若評估不適合，我們將主動建議暫緩或不予使用。</p>
              <p className="text-muted-foreground">
                不推薦不適合的方案，是我們對專業判斷的堅持，也是對病人安全的承諾。
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/care/referral"
                className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                查看轉介流程
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                search={{ topic: "comwell" }}
                className="inline-flex items-center gap-2 border border-border-strong bg-background px-5 py-3 text-sm font-medium tracking-wider text-foreground hover:bg-surface-muted"
              >
                預約居家照護評估
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
