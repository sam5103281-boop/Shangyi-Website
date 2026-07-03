import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { CareSubNav } from "@/components/CareSubNav";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import careReferral from "@/assets/care-referral.jpg";

export const Route = createFileRoute("/care/referral")({
  head: () => ({
    meta: [
      { title: "轉介流程｜下肢循環照護｜上怡生技 ComWell" },
      {
        name: "description",
        content:
          "ComWell 居家下肢循環照護轉介流程：前置聯繫、實地評估、設定衛教、追蹤回饋與在地設備支援，五步驟確保臨床延續。",
      },
      { property: "og:title", content: "轉介流程｜下肢循環照護" },
      {
        property: "og:description",
        content: "五步驟轉介流程＋ComWell 護理團隊在地支援，讓臨床照護安全延伸至居家。",
      },
    ],
  }),
  component: ReferralPage,
});

const steps = [
  {
    n: "1",
    t: "前置聯繫",
    items: ["確認基本狀況與禁忌症", "說明到府評估流程"],
  },
  {
    n: "2",
    t: "實地評估",
    items: ["評估下肢皮膚與循環表現", "排除高風險情境流程"],
  },
  {
    n: "3",
    t: "設定與衛教",
    items: ["完成個別化設備設定", "指導病人與家屬操作"],
  },
  {
    n: "4",
    t: "追蹤與回饋",
    items: ["使用初期主動追蹤狀況", "協助記錄並提醒回診"],
  },
  {
    n: "5",
    t: "支援與維護",
    items: ["在地團隊處理設備問題", "確保臨床照護連續性"],
  },
];

const faqs = [
  {
    q: "適用的臨床情境與轉介對象？",
    a: "適用於有下肢或淋巴循環相關居家照護需求之病人，如術後恢復期、慢性循環問題，或需延續循環輔助照護者。",
  },
  {
    q: "是否有居家介入前的安全篩選？",
    a: "有。轉介後由護理師進行前置聯繫與到府安全評估，以標準流程確認皮膚狀況、循環表現與潛在風險。",
  },
  {
    q: "如何確保居家執行與臨床建議一致？",
    a: "透過護理師到府導入、標準化操作流程與初期追蹤，協助降低居家執行與臨床建議間的落差。",
  },
  {
    q: "居家使用期間若出現不適如何處理？",
    a: "護理團隊將協助記錄病人反應，並建議病人回診與醫師討論；必要時將暫停使用並回歸臨床評估。",
  },
  {
    q: "設備維修與技術支援方式？",
    a: "提供台灣在地化技術支援與維修服務，關鍵問題於 48 小時內回應處理，確保居家照護不中斷。",
  },
];

function ReferralPage() {
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
              <span className="text-foreground">REFERRAL</span>
            </nav>
            <span className="eyebrow mt-5">
              <span className="inline-block h-px w-6 bg-accent" />
              Referral Process
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">
              轉介流程
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              臨床照護之延伸執行支援機制，五個步驟確保居家循環照護的安全與連續性。
              本流程不取代醫師之診斷、治療或臨床決策。
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-hairline bg-surface">
            <img
              src={careReferral}
              alt="醫療專業轉介"
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

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Service Steps"
            title="服務執行步驟"
            description="從前置聯繫到在地支援，每一步都有標準作業流程。"
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative flex flex-col gap-4 border border-hairline bg-surface p-7"
              >
                <span className="font-display text-5xl leading-none text-accent">
                  {s.n}
                </span>
                <h3 className="font-display text-lg text-foreground">{s.t}</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface-muted section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="FAQ" title="常見問答" />

          <Accordion type="single" collapsible className="mt-12 border-t border-hairline">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="border-b border-hairline"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base leading-snug text-foreground hover:no-underline">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 text-accent">Q.</span>
                    <span>{f.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-8 pr-4 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="container-page section-pad">
          <div className="border border-hairline bg-surface p-8 md:p-10">
            <p className="text-xs tracking-[0.25em] text-accent">
              聯繫窗口資訊｜Referral Contact
            </p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
              轉介窗口．ComWell 護理團隊
            </h2>
            <div className="mt-8 grid gap-px bg-hairline md:grid-cols-1">
              <a
                href="tel:0800222215"
                className="group flex items-center gap-5 bg-surface p-6 transition-colors hover:bg-surface-muted"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-hairline bg-background text-accent">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] tracking-[0.22em] text-muted-foreground">
                    免付費服務專線
                  </p>
                  <p className="mt-1 font-display text-xl text-foreground group-hover:text-accent">
                    0800-222-215
                  </p>
                </div>
              </a>
            </div>

            <Link
              to="/contact"
              search={{ topic: "comwell" }}
              className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              填寫線上聯絡表單
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
              ※ 本流程為臨床照護之延伸執行支援機制，不取代醫師之診斷、治療或臨床決策。
              是否適用，仍以醫師臨床判斷與護理師到府評估結果為準。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
