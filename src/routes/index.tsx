import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, FlaskConical, Stethoscope, Eye } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import heroVideo from "@/assets/homepage-hero.mp4.asset.json";
import comwellHome from "@/assets/comwell-雙機器-特寫-2.jpg.asset.json";
import productsFlatlay from "@/assets/products-flatlay.jpg";
import catSupplements from "@/assets/categories/cat-supplements-v4.png.asset.json";
import catPatches from "@/assets/patch-demo.png.asset.json";
import catEye from "@/assets/categories/cat-eye-v2.png.asset.json";
import catDevices from "@/assets/categories/cat-devices-v5.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "上怡生醫醫藥有限公司 SHANG YI BIOPHARMA｜合規品質．鏈結臨床與居家照護" },
      {
        name: "description",
        content:
          "上怡生醫醫藥有限公司是專注於醫療器材代理與特殊機能保健品的生醫企業，產品符合國際電氣安全與電磁相容測試規範，深受全台指標醫療機構與專業通路信賴。",
      },
      { property: "og:title", content: "上怡生醫醫藥有限公司 SHANG YI BIOPHARMA" },
      {
        property: "og:description",
        content: "以合規品質為核心，鏈結臨床與居家照護的生醫專家。",
      },
    ],
  }),
  component: HomePage,
});

const certifications = [
  { code: "EN IEC 60601-1-2", label: "醫用電氣設備電磁相容性測試" },
  { code: "IEC EN BS 60601-1", label: "醫電設備電性安全測試" },
  { code: "IEC EN BS 60601-1-11", label: "家用醫療設備安全測試" },
  { code: "TFDA", label: "醫療器材查驗登記" },
  { code: "SGS", label: "產品成份、西藥、放射線、細胞毒性測試" },
  { code: "SuperLab", label: "重金屬、塑化劑、腸桿菌、不含動物性、農藥殘留檢驗" },
];

const categories = [
  {
    n: "01",
    code: "SUP.",
    title: "特殊機能保健品",
    desc: "成分透明、第三方檢驗，針對臨床營養補充需求設計。",
    icon: FlaskConical,
    image: catSupplements.url,
    imagePosition: "center 65%",
    to: "/products/supplements" as const,
    params: undefined,
  },
  {
    n: "02",
    code: "PATCH",
    title: "德國舒護貼",
    desc: "醫療等級親膚低敏貼片溫和守護，提供日常生活支持。",
    icon: ShieldCheck,
    image: catPatches.url,
    to: "/products/$category" as const,
    params: { category: "patches" },
  },
  {
    n: "03",
    code: "DEVICE",
    title: "醫療器材",
    desc: "涵蓋間歇加壓系統、醫療級壓力襪等多元循環照護產品。",
    icon: Stethoscope,
    image: catDevices.url,
    imagePosition: "22% 65%",
    to: "/products/$category" as const,
    params: { category: "devices" },
  },
  {
    n: "04",
    code: "OPHTH.",
    title: "眼部清淨綿",
    desc: "100%精製水，無添加配方，提供日常與術前術後眼睛周圍護理之安全選項。",
    icon: Eye,
    image: catEye.url,
    imagePosition: "75% center",
    to: "/products/$category/$slug" as const,
    params: { category: "eye-pads", slug: "visiony" },
  },
];

const partners: { name: string; tag: string }[] = [
  { name: "台大醫院", tag: "Medical Center" },
  { name: "新光醫院", tag: "Medical Center" },
  { name: "台東馬偕醫院", tag: "Regional" },
  { name: "長庚醫療體系", tag: "Medical Center" },
  { name: "慈濟醫療體系", tag: "Medical Center" },
  { name: "中國附醫", tag: "Medical Center" },
  { name: "中山附醫", tag: "Medical Center" },
  { name: "秀傳醫療體系", tag: "Medical Center" },
  { name: "成大醫院", tag: "Medical Center" },
  { name: "奇美醫院", tag: "Medical Center" },
  { name: "義大醫院", tag: "Medical Center" },
  { name: "榮院醫療體系", tag: "Medical Center" },
  { name: "高醫體系", tag: "Medical Center" },
  { name: "嘉義基督教醫院", tag: "Regional" },
  { name: "屏東基督教醫院", tag: "Regional" },
  { name: "杏一 維康醫療用品通路", tag: "Retail Network" },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="container-page grid items-center gap-12 py-10 md:py-14 lg:grid-cols-12 lg:gap-16">
          <Reveal as="div" direction="up" className="lg:col-span-6">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              SHANG YI BIOPHARMA
            </span>
            <h1 className="mt-6 font-display text-2xl leading-[1.25] text-foreground md:text-[28px] lg:text-[32px]">
              以<span className="text-accent">國際合規品質</span>為基石<br />
              鏈結<span className="text-accent">臨床醫療與居家延伸照護</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              上怡生醫醫藥有限公司遴選符合國際法規之醫療器材與特殊機能產品，攜手指標醫療院所與專業通路，
              為臨床端與居家端提供可信賴的延伸照護解決方案。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                探索產品線
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                search={{ topic: "b2b" }}
                className="inline-flex items-center gap-2 border border-border-strong px-6 py-3 text-sm font-medium tracking-wider text-foreground transition-colors hover:bg-surface-muted"
              >
                醫療機構合作洽詢
              </Link>
            </div>
          </Reveal>

          <Reveal as="div" direction="left" delay={120} className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-muted">
              <video
                src={heroVideo.url}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-[center_70%] transition-transform duration-[1400ms] ease-out hover:scale-[1.03]"
              />
              <div className="absolute bottom-6 right-6 hidden border border-hairline bg-background/90 px-4 py-2 backdrop-blur md:block">
                <p className="whitespace-nowrap text-sm leading-snug text-foreground">
                  <span className="mr-2 text-[11px] uppercase tracking-[0.22em] text-accent">Quality First</span>
                  <span>臨床高標準嚴選，守護健康安全。</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Compliance bar */}
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow">
                <span className="inline-block h-px w-6 bg-accent" />
                Regulatory Compliance
              </p>
              <h2 className="mt-5 font-display text-2xl leading-tight text-foreground md:text-3xl">
                嚴格落實多重法規審驗
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                每項產品均通過國際與在地多重法規審驗，落實高標準的安全、品質與可追溯性。
              </p>
            </div>


            <div className="lg:col-span-8">
              <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((c, i) => (
                  <Reveal
                    as="li"
                    key={c.code}
                    delay={i * 80}
                    direction="right"

                    className="group relative flex flex-col border-l-2 border-accent/70 pl-5 transition-colors hover:border-accent"
                  >
                    <span className="text-[10px] tracking-[0.28em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} · CERT
                    </span>
                    <span className="mt-2 font-display text-base font-medium leading-snug text-primary">
                      {c.code}
                    </span>
                    <span className="mt-2 text-[13px] leading-relaxed text-foreground/70">
                      {c.label}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Four categories */}
      <section className="section-pad">
        <div className="container-page">
          <div className="max-w-none">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              Product Portfolio
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
              {"四大專業產品線\u00a0 覆蓋臨床與居家"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:whitespace-nowrap">
              從日常健康支持到專業循環照護，我們始終提供醫療專業人員與長期照護家庭一致的品質承諾。
            </p>
          </div>


          <div className="mt-14 grid grid-cols-1 auto-rows-fr gap-x-10 gap-y-12 md:grid-cols-2">
            {categories.map((cat, i) => (
              <Reveal
                key={cat.n}
                as="div"
                direction="up"
                delay={i * 100}
                distance={16}
                className="h-full"
              >
                <Link
                  to={cat.to}
                  params={cat.params as never}
                  className="group flex h-full bg-surface transition-all duration-300"
                >
                  <div className="aspect-[3/4] w-[45%] shrink-0 overflow-hidden bg-surface-muted md:w-1/3">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      width={640}
                      height={832}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${
                        (cat as { imageFit?: string }).imageFit === "contain" ? "object-contain" : "object-cover"
                      }`}
                      style={{ objectPosition: (cat as { imagePosition?: string }).imagePosition ?? "center" }}
                    />
                  </div>
                  <div className="flex w-[55%] flex-col justify-between border-y border-r border-hairline p-8 md:w-2/3">
                    <div>
                      <div className="mb-6 flex items-center gap-3">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-accent">{cat.n}</span>
                        <span className="h-px w-4 bg-hairline transition-all duration-500 group-hover:w-10 group-hover:bg-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          {cat.code}
                        </span>
                      </div>
                      <h3 className="mb-3 font-display text-xl font-medium tracking-tight text-foreground">
                        {cat.title}
                      </h3>
                      <p className="max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
                        {cat.desc}
                      </p>
                    </div>
                    <div className="pt-6">
                      <span className="inline-block border-b border-foreground pb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                        查看詳情
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* Comwell feature */}
      <section className="border-y border-hairline bg-surface-muted">
        <div className="container-page grid items-center gap-12 py-20 md:py-24 lg:grid-cols-12 lg:gap-16">
          <Reveal as="div" direction="right" className="lg:col-span-6">
            <div className="overflow-hidden">
              <img
                src={comwellHome.url}
                alt="康威爾 Comwell 居家循環照護情境"
                width={852}
                height={639}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <Reveal as="div" direction="left" delay={120} className="lg:col-span-6">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              COMWELL · 居家延伸照護
            </span>
            <h2 className="mt-5 font-display text-3xl leading-tight text-foreground md:text-4xl">
              將臨床等級的循環照護帶回家中
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              專為下肢循環支持設計的康威爾間歇加壓系統，符合醫療級高標準，是長期臥床、術後恢復與行動不便者的安心選擇。
              人性化的操作介面讓居家照護更省力，並由上怡專業團隊為您提供精準評估與靈活租賃選項。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                search={{ topic: "comwell" }}
                className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                居家照護評估諮詢
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products/$category/$slug"
                params={{ category: "devices", slug: "comwell" }}
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wider text-foreground underline decoration-hairline underline-offset-4 hover:decoration-accent"
              >
                查看產品規格
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal as="div" direction="up" className="max-w-none">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              Trusted by Clinical Channels
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl lg:whitespace-nowrap">
              深受全台多所指標醫療機構與專業通路信賴
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:whitespace-nowrap">
              上怡產品已導入醫學中心、區域醫院、多元專科診所及全台連鎖藥局，作為臨床與居家照護的延伸選擇。
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, i) => (
              <Reveal as="div" key={p.name} delay={i * 80} direction="right" distance={40} className="group">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {p.tag}
                </p>
                <div className="mt-2 border-t border-hairline pt-3">
                  <h3 className="font-display text-lg text-foreground transition-colors group-hover:text-accent md:text-xl">
                    {p.name}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>


          <p className="mt-10 text-xs text-muted-foreground">
            ※ 部分通路名稱依合作協議以類別形式呈現；詳細通路清單請參考「專業通路」頁面。
          </p>
        </div>
        <img
          src={productsFlatlay}
          alt=""
          aria-hidden
          className="h-2 w-full object-cover opacity-0"
          loading="lazy"
          decoding="async"
        />
      </section>
    </>
  );
}
