import { createFileRoute, Link } from "@tanstack/react-router";
import { medicalCategories } from "@/data/medical";
import { supplements } from "@/data/supplements";

const URL = "https://www.shangyi-care.com/site-index";
const TITLE = "網站地圖｜上怡生技醫藥有限公司 SHANG YI BIOPHARMA";
const DESC =
  "上怡生技醫藥全站頁面總覽：關於上怡、產品中心（醫療器材、德國舒護貼、眼部清淨綿、特殊機能保健品）、醫療保健專欄、居家循環照護與專業通路。";

export const Route = createFileRoute("/site-index")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: SiteIndexPage,
});

const mainPages: { to: string; label: string }[] = [
  { to: "/", label: "首頁" },
  { to: "/about", label: "關於上怡" },
  { to: "/products", label: "產品中心" },
  { to: "/education", label: "醫療保健專欄" },
  { to: "/care", label: "居家循環照護" },
  { to: "/channels", label: "專業通路" },
  { to: "/contact", label: "聯絡我們" },
];

const educationPages: { to: string; label: string }[] = [
  { to: "/education/postpartum/pe-prevention", label: "產後肺栓塞預防" },
  { to: "/education/diabetes/eye-complications", label: "糖尿病眼部併發症" },
  { to: "/education/diabetes/complication-risks", label: "糖尿病併發症風險" },
  { to: "/education/device/compression-sock-faq", label: "壓力襪常見問題" },
  { to: "/education/circulation/leg-vein-care", label: "下肢靜脈保養" },
  { to: "/education/circulation/dvt-pe-symptoms", label: "深層靜脈栓塞與肺栓塞徵兆" },
];

const carePages: { to: string; label: string }[] = [
  { to: "/care", label: "居家循環照護總覽" },
  { to: "/care/referral", label: "轉介服務" },
  { to: "/care/professional", label: "專業照護" },
  { to: "/care/faq", label: "常見問題" },
];

function Section({
  title,
  items,
}: {
  title: string;
  items: { to: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.to}>
            <a href={i.to} className="hover:text-accent">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SiteIndexPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-16 md:py-20">
          <span className="eyebrow">
            <span className="inline-block h-px w-6 bg-accent" />
            Site Index
          </span>
          <h1 className="mt-5 font-display text-4xl text-foreground">網站地圖</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            全站頁面總覽，方便您快速找到需要的產品資訊與衛教內容。
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <Section title="主要頁面" items={mainPages} />
          <Section title="醫療保健專欄" items={educationPages} />
          <Section title="居家循環照護" items={carePages} />

          {medicalCategories.map((c) => (
            <Section
              key={c.slug}
              title={c.label}
              items={[
                { to: `/products/${c.slug}`, label: `${c.label}總覽` },
                ...c.products.map((p) => ({
                  to: `/products/${c.slug}/${p.slug}`,
                  label: `${p.name} ${p.en}`,
                })),
              ]}
            />
          ))}

          <Section
            title="特殊機能保健品"
            items={[
              { to: "/products/supplements", label: "特殊機能保健品總覽" },
              ...supplements.map((s) => ({
                to: `/products/supplements/${s.slug}`,
                label: `${s.name}`,
              })),
            ]}
          />
        </div>

        <div className="container-page mt-16">
          <Link
            to="/"
            className="inline-flex items-center border border-primary px-5 py-3 text-xs tracking-wider text-primary hover:bg-primary hover:text-primary-foreground"
          >
            返回首頁
          </Link>
        </div>
      </section>
    </>
  );
}
