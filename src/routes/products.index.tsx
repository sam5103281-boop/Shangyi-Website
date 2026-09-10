import { createFileRoute, Link } from "@tanstack/react-router";
import { socialImageMeta } from "@/lib/seo";
import productsFlatlay from "@/assets/products-flatlay.jpg.asset.json";



export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { property: "og:url", content: "https://www.shangyi-care.com/products" },
      { title: "醫療照護與機能保健產品｜IPC・醫療用貼片・機能保健食品｜上怡生醫" },
      {
        name: "description",
        content:
          "瀏覽上怡生醫產品資訊，涵蓋 IPC 間歇性氣動加壓循環照護、醫療用黏性貼片與機能保健食品，提供產品特色、規格、使用資訊及專業諮詢。",
      },
      { property: "og:title", content: "醫療照護與機能保健產品｜IPC・醫療用貼片・機能保健食品｜上怡生醫" },
      { property: "og:description", content: "瀏覽上怡生醫產品資訊，涵蓋 IPC 間歇性氣動加壓循環照護、醫療用黏性貼片與機能保健食品，提供產品特色、規格、使用資訊及專業諮詢。" },
      ...socialImageMeta(productsFlatlay.url),
    ],
    links: [{ rel: "canonical", href: "https://www.shangyi-care.com/products" }],
  }),
  component: ProductsPage,
});

type ProductCard = {
  code: string;
  title: string;
  en: string;
  desc: string;
  points: string[];
  to: "/products/supplements" | "/products/$category" | "/products/$category/$slug";
  params?: { category: "patches" | "eye-pads" | "devices"; slug?: string };
  feature?: boolean;
};

const products: ProductCard[] = [
  {
    code: "P · 01",
    title: "特殊機能保健品",
    en: "Functional Clinical Supplements",
    desc: "依臨床營養需求設計之機能補充配方，所有原料均通過第三方檢驗，提供清晰的成分標示與適應症說明。",
    points: ["第三方檢驗報告", "GMP 認證製程", "清晰成分標示"],
    to: "/products/supplements",
  },
  {
    code: "P · 02",
    title: "德國舒護貼",
    en: "Medical Adhesive Patch · Germany",
    desc: "源自德國原廠之醫療等級黏性貼片，採低敏親膚材質，符合長時間貼附之安全規格，已導入醫療院所臨床使用。",
    points: ["第一等級醫療器材", "醫療等級材質", "親膚低敏配方"],
    to: "/products/$category",
    params: { category: "patches" },
  },
  {
    code: "P · 03",
    title: "醫療器材",
    en: "Lower-Limb Circulation Care",
    desc: "醫療等級之下肢循環照護產品線，涵蓋間歇性氣動加壓系統與醫療級壓力襪，針對長期臥床、術後恢復、行動不便與日常循環支援設計，操作介面已為居家照護者進行最佳化。",
    points: ["第二等級醫療器材", "加壓系統與壓力襪", "操作介面最佳化"],
    to: "/products/$category",
    params: { category: "devices" },
    feature: true,
  },
  {
    code: "P · 04",
    title: "眼部清淨綿",
    en: "Ophthalmic Cleansing Pads",
    desc: "為眼部日常護理與術前術後清潔設計，無添加香料、酒精，採獨立包裝確保使用衛生與安全性。",
    points: ["日本進口", "無添加配方", "獨立無菌包裝"],
    to: "/products/$category/$slug",
    params: { category: "eye-pads", slug: "visiony" },
  },
];

const CTA_LABEL = "查看產品詳情";

function CardLink({
  p,
  className,
  children,
}: {
  p: ProductCard;
  className: string;
  children: React.ReactNode;
}) {
  if (p.to === "/products/supplements") {
    return (
      <Link to="/products/supplements" className={className}>
        {children}
      </Link>
    );
  }
  if (p.to === "/products/$category/$slug") {
    return (
      <Link
        to="/products/$category/$slug"
        params={{ category: p.params!.category, slug: p.params!.slug! }}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      to="/products/$category"
      params={{ category: p.params!.category }}
      className={className}
    >
      {children}
    </Link>
  );
}


function ProductsPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-20 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">
              <span className="inline-block h-px w-6 bg-accent" />
              Product Portfolio
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
              規格導向的醫療等級產品線
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              上怡生醫不提供消費端購物車。所有產品均經由專業團隊評估後，以合規文件與技術規格
              供醫療院所、專業通路及合格照護者參考。
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page space-y-px bg-hairline">
          {products.map((p) => (
            <article
              key={p.code}
              className="grid gap-8 bg-surface p-8 md:grid-cols-12 md:p-12"
            >
              <div className="md:col-span-3">
                <p className="text-sm tracking-[0.25em] text-accent">{p.code}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {p.en}
                </p>
                {p.feature && (
                  <span className="mt-4 inline-block border border-accent px-2 py-1 text-xs tracking-wider text-accent">
                    居家照護方案
                  </span>
                )}
              </div>
              <div className="md:col-span-6">
                <CardLink
                  p={p}
                  className="group inline-flex items-baseline font-display text-2xl text-foreground hover:text-accent md:text-3xl"
                >
                  <h2>{p.title}</h2>
                </CardLink>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.desc}</p>
                <ul className="mt-5 grid gap-2 text-base text-foreground sm:grid-cols-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-end md:col-span-3 md:justify-end">
                <CardLink
                  p={p}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary bg-primary px-8 py-3 text-base font-medium tracking-wider text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[0_14px_30px_-12px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <span className="relative">{CTA_LABEL}</span>
                </CardLink>
              </div>
            </article>
          ))}
        </div>

        <div className="container-page mt-16">
          <p className="text-xs leading-relaxed text-muted-foreground">
            ※ 上述產品圖文僅供專業參考。詳細產品規格、許可證字號、原廠資料與適應症，請洽上怡業務團隊取得正式文件。
            醫療器材應依專業人員指示使用，並請詳閱說明書。
          </p>
        </div>
      </section>
    </>
  );
}
