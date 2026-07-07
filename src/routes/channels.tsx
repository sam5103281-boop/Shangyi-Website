import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { AlertTriangle, CheckCircle2, ShieldCheck, Stethoscope } from "lucide-react";
import qualityLab from "@/assets/quality-assurance-lab.png.asset.json";

export const Route = createFileRoute("/channels")({
  head: () => ({
    meta: [
      { title: "合作通路｜上怡生技" },
      {
        name: "description",
        content:
          "上怡產品僅透過公私立醫院、專科診所、杏一與維康等醫療相關通路供應；醫療設備限授權醫療院所使用，未於任何網路平台販售。",
      },
      { property: "og:title", content: "合作通路｜上怡生技" },
      {
        property: "og:description",
        content: "醫療相關通路據點與醫療設備授權合作說明。",
      },
    ],
  }),
  component: ChannelsPage,
});

const authorizedChannels = [
  { name: "公私立醫院", note: "區域醫院、地區醫院、醫學中心" },
  { name: "專科診所", note: "依產品適用之專科診所" },
  { name: "杏一醫療用品", note: "全台連鎖醫療用品通路" },
  { name: "維康醫療用品", note: "全台連鎖醫療用品通路" },
];

const channelGroups = {
  "醫學中心 / 區域醫院": [
    "臺大醫院體系",
    "榮民總醫院體系",
    "長庚醫療財團體系",
    "馬偕紀念醫院",
    "新光吳火獅紀念醫院",
    "國泰綜合醫院",
    "亞東紀念醫院",
    "中國醫藥大學附設醫院",
  ],
  "專科診所聯網": [
    "北部指標醫美聯盟",
    "中部皮膚專科診所群",
    "南部眼科專科聯盟",
    "復健科 / 骨科專科聯網",
  ],
  "連鎖醫療用品通路": [
    "杏一醫療用品",
    "維康醫療用品",
    "區域型獨立藥局聯網",
    "居家照護器材通路",
  ],
};

function ChannelsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-hairline">
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">
            <span className="inline-block h-px w-6 bg-accent" />
            Authorized Channels
          </span>
          <h1 className="mt-5 max-w-5xl font-display text-4xl leading-tight text-foreground md:text-5xl whitespace-nowrap">
            合作通路　僅於指定醫療相關通路供應
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            上怡所有保健品、貼片與醫療設備皆為原廠設計之配方與成分，僅透過具備合法執照之醫療單位
            與連鎖醫療用品通路合作供應，以確保產品品質、來源可追溯與使用安全。
          </p>
        </div>
      </section>

      {/* Quality & Safety Commitment */}
      <section className="section-pad bg-surface-muted">
        <div className="container-page">
          <div className="max-w-none">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              Quality & Safety Commitment
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              品質與安全承諾
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:whitespace-nowrap">
              醫院診所通路產品皆為原廠設計之配方與成分，無「不同包裝、相同成分」或「類似成分劑型」之授權流通。
            </p>
          </div>

          <div className="mt-10 grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-4">
            {authorizedChannels.map((c) => (
              <div
                key={c.name}
                className="flex flex-col gap-3 bg-surface p-7"
              >
                <ShieldCheck className="h-6 w-6 text-accent" />
                <p className="font-display text-lg text-foreground">{c.name}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {c.note}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs tracking-[0.22em] text-muted-foreground">
            醫療相關通路據點 · 僅限具備合法執照之醫療單位與連鎖醫療用品通路
          </p>
        </div>
      </section>

      {/* Important Warning */}
      <section className="section-pad bg-surface-muted">
        <div className="container-page">
          <div className="relative overflow-hidden border-l-4 border-accent bg-primary p-8 shadow-elevated md:p-12">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 translate-y-[-50%] rounded-full bg-accent/10 blur-3xl" />
            <div className="relative flex items-start gap-5 md:gap-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                <AlertTriangle className="h-7 w-7 text-accent" />
              </div>
              <div className="flex-1 space-y-5">
                <h2 className="font-display text-2xl leading-tight text-primary-foreground md:text-3xl">
                  重要警示．請務必留意
                </h2>
                <div className="space-y-4 text-sm leading-relaxed text-primary-foreground/85 md:text-base">
                  <p>
                    本公司之保健品與貼片類產品，完全不在任何網路平台銷售，
                    亦未授權任何網站、電商平台、社群頁面或個人帳號進行販售、代購、展示、報價或產品資訊說明。
                  </p>
                  <p className="text-primary-foreground/70">
                    目前網路上偶有以本公司產品名義進行販售之情形，其中不乏仿冒、來源不明或刻意誤導之不實銷售資訊，
                    此類行為與本公司無任何關聯。
                  </p>
                </div>
                <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 md:p-5">
                  <p className="text-sm leading-relaxed text-primary-foreground md:text-base">
                    <span className="font-semibold text-accent">請特別留意：</span>
                    透過網路平台購買之產品，可能存在來源不明、保存條件不符、內容物不一致或使用風險，
                    恐嚴重影響您的使用安全與消費者權益。為保障您的健康與消費權益，請勿於網路上購買或詢價。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Device Distribution */}
      <section className="section-pad bg-surface-muted">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl border border-hairline bg-surface shadow-elevated lg:flex">
            {/* Image side */}
            <div className="relative lg:w-1/2 min-h-[380px] lg:min-h-[600px]">
              <img
                src={qualityLab.url}
                alt="醫療設備品質管理與專業檢驗"
                width={1200}
                height={800}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <span className="eyebrow mb-4 text-primary-foreground">
                  <span className="inline-block h-px w-8 bg-accent" />
                  Medical Device Distribution
                </span>
                <h2 className="font-display text-3xl font-bold leading-tight text-primary-foreground md:text-4xl">
                  醫療設備通路
                  <br />
                  與使用聲明
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80 md:text-base">
                  本公司所提供之醫療設備屬專業醫用器材，導入、操作、使用與後續管理皆須依循相關醫療器材法規及臨床安全指引。
                </p>
              </div>
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:w-1/2">
              <div className="mb-10 md:mb-12">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                    授權合作通路
                  </h3>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="border-l-2 border-accent/20 pl-4">
                    <p className="text-sm font-medium text-foreground md:text-base">
                      醫療院所
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      包含大型醫院、專科診所等合法醫療機構。
                    </p>
                  </div>
                  <div className="border-l-2 border-accent/20 pl-4">
                    <p className="text-sm font-medium text-foreground md:text-base">
                      專業評估與導入
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      設備須經醫師或合格醫療人員進行適用性評估，並由專業人員完成設備設定、操作說明與使用衛教。
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                    通路與販售限制
                  </h3>
                </div>
                <div className="mt-5 space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    基於醫療安全與專業管理原則，本公司醫療設備未開放於一般零售通路陳列或販售，
                    亦未授權於任何網路平台進行販售、展示、報價或交易行為。
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    凡經由非本公司授權通路取得之醫療設備，可能因來源、保存或運輸條件，以及專業評估與操作指導資訊不足，
                    影響使用安全與相關權益。
                    <span className="font-medium text-destructive">
                      本公司將不提供相關維修與後續技術支援服務。
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing channel list */}
      <section className="section-pad">
        <div className="container-page space-y-16">
          <SectionHeading
            eyebrow="Channel Partners"
            title="主要合作據點"
            description="上怡產品已陸續導入下列指標醫療院所、診所聯盟與連鎖醫療用品通路。"
          />

          {Object.entries(channelGroups).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs tracking-[0.25em] text-accent">{group}</p>
              <div className="mt-6 grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-4">
                {items.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 bg-surface p-6"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent" />
                    <p className="text-sm font-medium text-foreground">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="text-xs leading-relaxed text-muted-foreground">
            ※ 部分通路依合作協議以類別呈現，正式合作清單請洽上怡業務團隊。
            醫療器材使用前請先洽詢專業人員。
          </p>
        </div>
      </section>
    </>
  );
}
