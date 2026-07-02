import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import postpartumCover from "@/assets/parenthood-pregnancy.jpg.asset.json";


export const Route = createFileRoute("/education/")({
  head: () => ({
    meta: [
      { title: "醫療保健專欄｜上怡生技" },
      {
        name: "description",
        content:
          "上怡生技醫療保健專欄：依主題區分產後照護、下肢循環與靜脈、糖尿病併發、醫療輔具使用等衛教內容。",
      },
      { property: "og:title", content: "醫療保健專欄｜上怡生技" },
      {
        property: "og:description",
        content: "依主題瀏覽下肢循環、靜脈栓塞、糖尿病併發與醫療輔具衛教文章。",
      },
    ],
  }),
  component: EducationPage,
});

type Article = {
  title: string;
  excerpt: string;
  href: string;
  image: string;
};

type Topic = {
  slug: string;
  name: string;
  en: string;
  desc: string;
  cover: string;
  articles: Article[];
};

const topics: Topic[] = [
  {
    slug: "postpartum",
    name: "產後照護",
    en: "Postpartum Care",
    desc: "產後因臥床與凝血機能改變，是肺栓塞與深層靜脈栓塞的高風險族群。",
    cover: postpartumCover.url,
    articles: [
      {
        title: "產後肺栓塞預防",
        excerpt:
          "介紹 IPC 間歇充氣加壓系統等非藥物方式，降低產後血栓與肺栓塞風險。",
        href: "/education/postpartum/pe-prevention",
        image: postpartumCover.url,
      },
    ],
  },
  {
    slug: "circulation",
    name: "下肢循環與靜脈",
    en: "Lower-Limb Circulation",
    desc: "認識深層靜脈栓塞、肺栓塞與日常腿部靜脈保養的觀念。",
    cover: "/__l5e/assets-v1/00f997db-e6f2-4a09-92cb-784832412cf1/circulation-veins.png",
    articles: [
      {
        title: "深層靜脈栓塞與肺栓塞症狀",
        excerpt:
          "認識 DVT 與 PE 的警訊、好發族群與就醫時機，協助高風險族群提早辨識。",
        href: "/education/circulation/dvt-pe-symptoms",
        image: "/__l5e/assets-v1/00f997db-e6f2-4a09-92cb-784832412cf1/circulation-veins.png",
      },
      {
        title: "腿部靜脈保養與照護",
        excerpt: "從日常活動、姿勢、壓力襪到循環輔具，整理腿部靜脈健康保養重點。",
        href: "/education/circulation/leg-vein-care",
        image: "/__l5e/assets-v1/755162bb-721f-4b78-960f-127a86a6d43e/leg-massage.jpg",
      },
    ],
  },
  {
    slug: "diabetes",
    name: "糖尿病併發",
    en: "Diabetes Complications",
    desc: "長期血糖控制不佳可能引發多項併發症，認識症狀與自我照護觀念。",
    cover: "https://cdn.store-assets.com/s/764545/f/16661591.jpg",
    articles: [
      {
        title: "糖尿病恐併發眼睛病變",
        excerpt: "介紹糖尿病視網膜病變等眼部併發症與定期檢查的重要性。",
        href: "/education/diabetes/eye-complications",
        image: "/__l5e/assets-v1/07ccdc9c-a2e1-4aef-98dd-baddff212bc8/elderly-eye-closeup.jpg",
      },
      {
        title: "糖尿病併發症風險",
        excerpt: "整理心血管、腎臟、神經與下肢併發症風險，建立日常自我照護觀念。",
        href: "/education/diabetes/complication-risks",
        image: "/__l5e/assets-v1/0b27573f-cdb3-4359-9ebd-ae8d9ba3cec4/diabetic-glucose-check.jpg",
      },
    ],
  },
  {
    slug: "device",
    name: "醫療輔具使用",
    en: "Medical Device Use",
    desc: "醫療輔具的挑選、穿著與日常使用注意事項。",
    cover: "/__l5e/assets-v1/22904886-003f-46ae-9050-6d1bee0e202b/compression-socks.png",
    articles: [
      {
        title: "醫用輔助襪常見問題",
        excerpt: "醫用輔助襪如何挑選、正確穿著步驟、適用對象與注意事項。",
        href: "/education/device/compression-sock-faq",
        image: "/__l5e/assets-v1/22904886-003f-46ae-9050-6d1bee0e202b/compression-socks.png",
      },
    ],
  },
];

function EducationPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">
            <span className="inline-block h-px w-6 bg-accent" />
            Medical Health Column
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">
            醫療保健專欄
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            依主題瀏覽下肢循環、靜脈栓塞、糖尿病併發與醫療輔具相關衛教內容。
            內容僅供參考，實際處置請依您的醫療專業人員建議。
          </p>
          <nav className="mt-8 flex flex-wrap gap-2">
            {topics.map((t) => (
              <a
                key={t.slug}
                href={`#${t.slug}`}
                className="border border-hairline bg-surface px-5 py-3 text-base text-foreground hover:border-accent hover:text-accent"
              >
                {t.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page space-y-20">
          {topics.map((topic) => (
            <div key={topic.slug} id={topic.slug} className="scroll-mt-24">
              <div className="grid gap-8 border-b border-hairline pb-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <SectionHeading
                    eyebrow={topic.en}
                    title={topic.name}
                    description={topic.desc}
                  />
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <p className="text-xs tracking-[0.22em] text-muted-foreground">
                    {topic.articles.length} 篇文章
                  </p>
                </div>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topic.articles.map((a) => {
                  const isInternal = a.href.startsWith("/");
                  const commonClass =
                    "group flex flex-col border border-hairline bg-surface transition-colors hover:bg-surface-muted";
                  const inner = (
                    <>
                      <div className="aspect-[16/9] w-full overflow-hidden border-b border-hairline bg-surface-muted">
                        <img
                          src={a.image}
                          alt={a.title}
                          width={1600}
                          height={900}
                          loading="lazy"
                          decoding="async"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-4 p-7">
                        <span className="text-[11px] tracking-[0.22em] text-accent">
                          {topic.name}
                        </span>
                        <h3 className="font-display text-lg leading-snug text-foreground md:text-xl">
                          {a.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {a.excerpt}
                        </p>
                      </div>
                    </>
                  );
                  if (isInternal) {
                    return (
                      <Link key={a.title} to={a.href} className={commonClass}>
                        {inner}
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={a.title}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={commonClass}
                    >
                      {inner}
                    </a>
                  );
                })}
              </div>

            </div>
          ))}

          <p className="text-xs leading-relaxed text-muted-foreground">
            ※ 本專欄連結至上怡生技官方衛教文章，內容僅供參考，不取代專業醫療診斷與建議。
          </p>
        </div>
      </section>
    </>
  );
}

