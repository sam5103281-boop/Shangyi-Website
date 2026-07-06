import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CareSubNav } from "@/components/CareSubNav";
import { SectionHeading } from "@/components/SectionHeading";
import careProfessional from "@/assets/comwell-home-scene.jpg.asset.json";

export const Route = createFileRoute("/care/")({
  head: () => ({
    meta: [
      { title: "下肢循環照護｜上怡生技 ComWell" },
      {
        name: "description",
        content:
          "ComWell 居家下肢循環照護：護理師到府評估、IPC 設備導入與在地團隊持續陪伴，讓醫師放心轉介、病人安心使用。",
      },
      { property: "og:title", content: "下肢循環照護｜上怡生技 ComWell" },
      {
        property: "og:description",
        content: "標準化流程＋在地團隊支援，建立讓醫師放心轉介的居家循環照護模式。",
      },
    ],
  }),
  component: CareHubPage,
});

const reasons = [
  {
    title: "不只是銷售設備",
    desc: "提供完整的循環照護方案，而非單一產品。",
  },
  {
    title: "專業評估把關",
    desc: "由具臨床經驗的護理師評估，確認「適合使用」後才導入。",
  },
  {
    title: "在地團隊持續陪伴",
    desc: "台灣在地專業團隊支援，讓照護不因距離而中斷。",
  },
];

const steps = [
  {
    step: "STEP 01",
    title: "專業評估",
    desc: "由具臨床照護經驗之護理師，依 SOP 進行完整評估，確認適用性並完成風險篩選。",
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
    desc: "台灣專業團隊持續提供維護與諮詢，確保照護穩定延續並符合臨床指引。",
  },
];

const sections = [
  {
    to: "/care/professional",
    en: "Professional Care",
    title: "專業照護",
    desc: "認識 ComWell 的居家循環照護模式、四個安心關卡與適用性說明。",
  },
  {
    to: "/care/faq",
    en: "Education Q&A",
    title: "衛教 Q&A",
    desc: "從照護觀念、安心指引到常見問題，建立對下肢循環與 IPC 的正確認知。",
  },
  {
    to: "/care/referral",
    en: "Referral Process",
    title: "轉介流程",
    desc: "醫療專業端轉介流程、安全篩選、追蹤回饋與在地技術支援機制。",
  },
] as const;

function CareHubPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-20 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              ComWell Home Circulation Care
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
              下肢循環照護
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              安全，永遠比方便更重要。設備只是工具，真正讓人安心的，是專業是否到位。
              ComWell 透過標準化流程與在地支援，建立讓醫師放心轉介、讓病人安心使用的居家照護模式。
            </p>
          </div>
        </div>
      </section>

      <CareSubNav />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why ComWell"
            title="為何選擇 ComWell？"
            description="居家循環照護不該只是「把機器帶回家」，而是需要具備臨床經驗的專業人員，為每一位使用者把關。"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="flex flex-col gap-3 border border-hairline bg-surface p-8"
              >
                <h3 className="font-display text-xl text-foreground">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="container-page section-pad">
          <div className="relative aspect-[21/9] overflow-hidden border border-hairline bg-surface">
            <img
              src={careProfessional.url}
              alt="ComWell 居家循環照護設備"
              width={1600}
              height={685}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
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
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.step}
                className="flex flex-col gap-3 border border-hairline bg-surface p-8"
              >
                <span className="text-[11px] tracking-[0.25em] text-accent">{s.step}</span>
                <h4 className="font-display text-lg text-foreground">{s.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Explore"
            title="深入了解"
            description="依您的角色，選擇要進一步閱讀的章節。"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group flex flex-col justify-between border border-hairline bg-surface p-8 transition-colors hover:bg-surface-muted"
              >
                <div>
                  <span className="text-[11px] tracking-[0.25em] text-accent">{s.en}</span>
                  <h3 className="mt-4 font-display text-2xl text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1 text-xs tracking-wider text-foreground">
                  進入章節
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="container-page section-pad">
          <div className="border border-accent/40 bg-accent/5 p-8 md:p-10">
            <p className="text-xs tracking-[0.25em] text-accent">
              重要提醒｜適用性說明
            </p>
            <p className="mt-4 font-display text-xl text-foreground md:text-2xl">
              病人安全，優先於商業考量。
            </p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/85 md:text-base">
              <p>
                並非每一位個案都適合進行居家下肢循環照護。所有服務在導入前，皆須由護理師完整評估並清楚說明；
                若評估不適合，我們將主動建議暫緩或不予使用。
              </p>
              <p className="text-muted-foreground">
                不推薦不適合的方案，是我們對專業判斷的堅持，也是對病人安全的承諾。
              </p>
            </div>
            <Link
              to="/contact"
              search={{ topic: "comwell" }}
              className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              預約居家照護評估
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
