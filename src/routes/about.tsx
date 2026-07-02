import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { CountUp } from "@/components/CountUp";
import { AssuranceTimeline } from "@/components/AssuranceTimeline";
import { MilestonesGrid } from "@/components/MilestonesGrid";
import { VisionCard } from "@/components/VisionCard";

import heroLab from "@/assets/hero-lab.jpg";
import qualityHero from "@/assets/quality-assurance-lab.png.asset.json";
import intertekImg from "@/assets/certs/intertek-v2.jpg.asset.json";
import sgsImg from "@/assets/certs/sgs-fresenius.jpg.asset.json";
import gmpImg from "@/assets/certs/gmp-germany.jpg.asset.json";
import importImg from "@/assets/certs/import-permit.jpg.asset.json";
import shangyiPharmaImg from "@/assets/licenses/shangyi-pharma.jpg.asset.json";
import shangyiPharmaPdf from "@/assets/licenses/shangyi-pharma.pdf.asset.json";
import comwellScdImg from "@/assets/licenses/comwell-scd.jpg.asset.json";
import comwellScdPdf from "@/assets/licenses/comwell-scd.pdf.asset.json";
import muxinPatchImg from "@/assets/licenses/muxin-patch.jpg.asset.json";
import muxinPatchPdf from "@/assets/licenses/muxin-patch.pdf.asset.json";
import muxinDistImg from "@/assets/licenses/muxin-distributor.jpg.asset.json";
import muxinDistPdf from "@/assets/licenses/muxin-distributor.pdf.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "關於上怡｜實力與承諾" },
      {
        name: "description",
        content:
          "上怡生技作為臨床醫療與居家照護的橋樑，遵循 ISO 13485 品質管理與在地法規，提供合規且可追溯的醫療器材與機能產品。",
      },
      { property: "og:title", content: "關於上怡｜實力與承諾" },
      { property: "og:description", content: "鏈結臨床醫療與居家照護的生醫企業。" },
    ],
  }),
  component: AboutPage,
});

const licenses = [
  {
    type: "上怡生技醫藥有限公司",
    no: "南市醫器販 字第 MD6205034486 號",
    img: shangyiPharmaImg.url,
    pdf: shangyiPharmaPdf.url,
  },
  {
    type: "沐欣國際有限公司",
    no: "南市醫器販 字第 MD6205032493 號",
    img: muxinDistImg.url,
    pdf: muxinDistPdf.url,
    imgScale: 0.93,
  },
  {
    type: "Comwell 攜帶式間歇充氣加壓系統",
    no: "衛部醫器製字第 008496 號",
    img: comwellScdImg.url,
    pdf: comwellScdPdf.url,
  },
  {
    type: "沐欣醫療用黏性貼片（未滅菌）",
    no: "衛部醫器輸壹字第 023604 號",
    img: muxinPatchImg.url,
    pdf: muxinPatchPdf.url,
  },
];

const assurance = [
  {
    n: "01",
    t: "販賣廠商的資格",
    d: "需向政府申請營業資格與相關許可，從源頭把關，對品牌與消費者負責。",
  },
  {
    n: "02",
    t: "國外原製造工廠合法製售",
    d: "確認國外原廠為當地合法登記之製造與販售工廠，文件齊備、來源可追溯。",
  },
  {
    n: "03",
    t: "產品成分配方符合規範",
    d: "每項產品配方依台灣法規審查與核備，符合在地標準後才上市，消費者安心使用。",
  },
  {
    n: "04",
    t: "政府查驗登記文件",
    d: "取得主管機關之查驗登記／販賣許可文件後，才於台灣販售，對品牌與消費者負責。",
  },
  {
    n: "05",
    t: "合法合規報關進口",
    d: "依法完成海關報關與進口程序，與政府一同把關，讓專業通路與消費者多一層安心。",
  },
];

const safetyStats = [
  { label: "藥局", value: 300 },
  { label: "醫院", value: 42 },
  { label: "診所", value: 330 },
  { label: "醫學中心", value: 18 },
];



const thirdParty = [
  {
    t: "Intertek 全國公證",
    d: "化學與微生物實驗室出具之公證測試報告，涵蓋重金屬（鉛、鎘、汞）等項目。",
    img: intertekImg.url,
  },
  {
    t: "SGS Institut Fresenius",
    d: "德國 SGS 實驗室針對原料與成品的成分、維生素及污染物進行檢驗。",
    img: sgsImg.url,
  },
  {
    t: "德國 GMP 證書",
    d: "原廠依 EU GMP Directive 2001/83/EC 接受官方查核，符合製造品質規範。",
    img: gmpImg.url,
  },
  {
    t: "進口報單與原廠授權",
    d: "保留每批貨之進口報單、原廠授權書與出廠證明，提供合作院所稽核。",
    img: importImg.url,
  },
];


const milestones = [
  {
    y: "2018",
    h: "企業奠基與核心定位",
    t: "公司正式創立，明確落實「立足臨床通路、深耕專業照護」之企業核心發展定位。",
  },
  {
    y: "2019",
    h: "臨床醫療通路突破",
    t: "成功將「Kendall SCD 間歇充氣加壓系統」導入全台多家指標性醫學中心，奠定臨床信任基礎。",
  },
  {
    y: "2020",
    h: "多元布局與卓越進展",
    t: "產品線延伸至特殊機能保健食品，憑藉嚴謹品質、醫學專業知識與全方位服務，順利進軍大型醫學中心體系。",
  },
  {
    y: "2024",
    h: "國際嚴選產品引進",
    t: "積極拓展照護耗材市場，正式引進「德國舒護貼」，提供更全面的臨床延伸照護選擇。",
  },
  {
    y: "2025",
    h: "自主研發與品牌升級",
    t: "攜手產業夥伴合作開發「ComWell 間歇性氣動加壓系統」，正式跨足居家延伸照護，建立全方位循環支援生態系。",
  },
];

function AboutPage() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="container-page grid items-center gap-12 py-20 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              About ShangYi
            </span>
            <h1 className="mt-6 font-display text-2xl leading-[1.25] text-foreground md:text-[28px] lg:text-[32px]">
              在<span className="text-accent">臨床嚴謹</span>與<span className="text-accent">居家溫度</span>之間<br />
              我們選擇成為最值得信賴的<span className="text-accent">照護橋樑</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              上怡生技自創立以來，專注於醫療器材代理與機能性產品的引進。我們以「合規品質」作為遴選與營運的核心準則──
              每一項產品皆完成原廠資料審閱、在地法規驗證與通路適配評估，才會進入醫療院所與專業通路。
            </p>
          </div>
          <div className="lg:col-span-6">
            <img
              src={heroLab}
              alt="上怡生技品質管理"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-pad bg-surface-muted">
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {[
              { eb: "Compliance", t: "合規優先", d: "所有引進產品皆通過原廠資料審閱、TFDA 文件審驗與內部品質會議。" },
              { eb: "Channel", t: "通路專業", d: "深耕醫學中心、各級醫院、多元專科診所及連鎖藥局，建立值得信賴的穩定供應鏈。" },
              { eb: "Home Care", t: "居家延伸", d: "以 Comwell 為核心，將臨床等級照護方案延伸至居家環境。" },
            ].map((b, i) => (
              <VisionCard key={b.t} index={i + 1} eyebrow={b.eb} title={b.t} desc={b.d} delay={i * 220} />
            ))}
          </div>
        </div>
      </section>



      {/* 病患安全第一 */}
      <section className="section-pad">
        <div className="container-page">
          <div className="max-w-5xl">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              Patient Safety First
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl xl:whitespace-nowrap">
              病患安全第一．是我們對醫療品質堅定的承諾
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              二十年的旅程中，我們見證醫療科技的快速發展，也感受到人們對健康的期待與需求。市場上產品繁多，難免出現誇大宣傳；我們選擇以謹慎的態度，為病患與家屬提供真正可靠的選擇。
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                我們專注於引進國際認可的醫療品牌，每一件醫療儀器、外科耗材與特殊功能食品，皆經過嚴格的測試與驗證，旨在為每一位台灣的消費者提供安心的醫療保障。
              </p>
              <p>
                目標不僅是提供高品質的產品，更是對每位病患的細心關懷。憑藉多年累積的經驗，我們的團隊已為許多醫學中心、大型醫院、診所與藥局提供穩定支援。
              </p>

              <p className="font-display text-base text-foreground md:text-lg">
                每位病患的健康，都寄託著家庭的希望與未來
              </p>
              <p>
                希望在面對困難時，病患能感受到我們的關懷與支持。每當看到病患因我們的努力而重獲健康，這份成就感讓我們倍感珍惜。
              </p>
              <p>
                我們相信真正的醫療服務應根植於關愛，以專業作為依據，並以實效回報每一份信任。
              </p>
              <p>
                病患的安全與健康，是我們共同的責任，也是我們最大的承諾。我們將持續努力，讓每位病患感受到我們的真誠與奉獻，攜手迎接更加健康的明天。
              </p>
            </div>

            <ol className="grid grid-cols-2 gap-px self-start bg-hairline">
              {safetyStats.map((s) => (
                <li key={s.label} className="flex flex-col gap-2 bg-surface p-8">
                  <span className="text-xs tracking-[0.3em] text-accent">| {s.label}</span>
                  <CountUp end={s.value} className="font-display text-5xl text-foreground" />
                  <span className="text-xs text-muted-foreground">合作據點數</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 安心認證 */}
      <section className="section-pad bg-surface-muted">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Quality Assurance"
                title="國外品牌或國外製造之膠囊錠狀食品輸入台灣販賣．5大把關"
                description="從販賣廠商資格、國外原廠合法製售、配方符合規範、政府查驗登記到合法合規報關進口，每一道環節皆有文件可循，與政府一同把關，讓醫療院所、藥局與消費者多一份安心。"
              />
            </div>
            <div className="lg:col-span-5">
              <img
                src={qualityHero.url}
                alt="品質與合規把關示意"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="aspect-[3/2] w-full rounded-sm object-cover"
              />
            </div>
          </div>

          <AssuranceTimeline items={assurance} />

          <div className="mt-16 grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-4">
            {thirdParty.map((c) => (
              <div key={c.t} className="flex flex-col gap-4 bg-surface p-6">
                <div className="aspect-[1/1.414] w-full overflow-hidden border border-hairline bg-white">
                  <img
                    src={c.img}
                    alt={c.t}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-xs tracking-[0.25em] text-accent">CERTIFIED</p>
                <p className="font-display text-lg text-foreground">{c.t}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            ※ 為保障消費者權益，本公司產品僅於專業實體通路及指定合作對象販售，未授權任何拍賣網站進行販售。
          </p>
        </div>
      </section>

      {/* Compliance gallery */}

      <section className="section-pad">
        <div className="container-page">
          <div>
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              Licenses &amp; Permits
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              合法經營許可與產品查驗登記
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:whitespace-nowrap">
              集中展示公司販賣藥商、醫療器材商許可執照與代理產品之查驗登記證，提供經銷夥伴與院所採購最直接的合法性檢視。
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-4">
            {licenses.map((l) => (
              <div
                key={l.type}
                className="flex flex-col gap-4 bg-surface p-6"
              >
                <div
                  className="relative aspect-[1/1.414] w-full overflow-hidden border border-hairline bg-white select-none"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <img
                    src={l.img}
                    alt={l.type}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="pointer-events-none h-full w-full object-contain select-none"
                    style={l.imgScale ? { transform: `scale(${l.imgScale})` } : undefined}
                  />
                  {/* 浮水印：對角斜向重複，半透明 */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex flex-wrap content-around items-center justify-around overflow-hidden opacity-[0.18] mix-blend-multiply"
                    style={{ transform: "rotate(-28deg) scale(1.4)", transformOrigin: "center" }}
                  >
                    {Array.from({ length: 18 }).map((_, idx) => (
                      <span
                        key={idx}
                        className="whitespace-nowrap px-3 py-2 text-[11px] font-medium tracking-[0.25em] text-foreground/70"
                      >
                        SHANGYI · 上怡生技醫藥
                      </span>
                    ))}
                  </div>
                  {/* 透明覆蓋層阻擋滑鼠右鍵存取原圖 */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div>
                  <p className="text-xs tracking-[0.25em] text-accent">LICENSE</p>
                  <p className="mt-2 text-sm font-medium leading-snug text-foreground">{l.type}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l.no}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-t border-hairline bg-surface-muted">
        <div className="container-page py-20">
          <SectionHeading eyebrow="Milestones" title="企業里程碑．近十年專業通路耕耘" />
          <MilestonesGrid items={milestones} />
        </div>
      </section>
    </>
  );
}
