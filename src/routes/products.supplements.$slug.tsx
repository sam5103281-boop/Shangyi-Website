import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getIngredient, getSupplementBenefits, getSupplementBySlug, getSupplementImageScale, supplements } from "@/data/supplements";
import veganLeafAsset from "@/assets/vegan-leaf.jpg.asset.json";

export const Route = createFileRoute("/products/supplements/$slug")({
  loader: ({ params }) => {
    const product = getSupplementBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p
      ? `${p.name} ${p.en}｜特殊機能保健品｜上怡生醫`
      : "產品｜上怡生醫";
    const desc = p
      ? `${p.name} (${p.en})．${p.origin}製造進口。主要成份：${p.ingredients
          .map((id) => getIngredient(id)?.label)
          .filter(Boolean)
          .join("、")}。`
      : "上怡特殊機能保健品。";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="container-page section-pad">
      <p role="alert">產品載入失敗：{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page section-pad text-center">
      <p className="font-display text-2xl">找不到此產品</p>
      <Link
        to="/products/supplements"
        className="mt-6 inline-block border border-primary px-5 py-3 text-xs tracking-wider"
      >
        返回保健品列表
      </Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();

  const related = supplements
    .filter(
      (s) =>
        s.slug !== product.slug &&
        s.ingredients.some((i) => product.ingredients.includes(i)),
    )
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-12 md:py-16">
          <nav className="text-xs tracking-[0.22em] text-muted-foreground">
            <Link to="/products" className="hover:text-foreground">
              PRODUCTS
            </Link>
            <span className="mx-2 text-accent">/</span>
            <Link to="/products/supplements" className="hover:text-foreground">
              SUPPLEMENTS
            </Link>
            <span className="mx-2 text-accent">/</span>
            <span className="text-foreground">{product.en}</span>
          </nav>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  srcSet={product.imageSrcSet}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={`${product.name} ${product.en}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                  style={{ transform: `scale(${getSupplementImageScale(product.slug)})` }}
                />
              ) : (
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground">
                    PRODUCT IMAGE
                  </p>
                  <p className="mt-3 font-display text-2xl text-foreground/40">
                    {product.en}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.25em] text-accent">{product.code}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {product.origin}製造進口 · Made in {product.origin}
            </p>
            <h1 className="mt-4 flex flex-wrap items-center gap-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
              <span>{product.name}</span>
              {product.vegan && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 px-3 py-1 text-xs font-medium tracking-wider text-emerald-700"
                  title="全素可食"
                  aria-label="全素可食"
                >
                  <img
                    src={veganLeafAsset.url}
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 object-contain"
                  />
                  全素可食
                </span>
              )}
            </h1>

            <p className="mt-2 font-display text-xl text-muted-foreground">
              {product.en}
            </p>
            {product.capsule && (
              <p className="mt-4 text-sm text-muted-foreground">
                規格｜{product.capsule}
              </p>
            )}

            <div className="mt-8 border-l border-accent pl-5">
              <p className="text-xs tracking-[0.22em] text-accent">主要成份</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.ingredients.map((id: string) => {
                  const ing = getIngredient(id);
                  if (!ing) return null;
                  return (
                    <li key={id}>
                      <Link
                        to="/products/supplements"
                        search={{ ingredient: id }}
                        className="border border-hairline bg-surface px-3 py-1 text-xs text-foreground hover:border-accent hover:text-accent"
                      >
                        {ing.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {product.tagline && (
              <p className="mt-6 text-base leading-relaxed text-foreground/80">
                {product.tagline}
              </p>
            )}

            {product.awards && product.awards.length > 0 && (
              <div className="mt-6 border-l-2 border-accent bg-surface-muted px-4 py-3">
                {product.awards.map((a: string) => (
                  <p
                    key={a}
                    className="text-xs tracking-wide text-foreground/80"
                  >
                    🏆 {a}
                  </p>
                ))}
              </div>
            )}

            {product.intro && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.22em] text-accent">產品介紹</p>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/80">
                  {product.intro}
                </p>
              </div>
            )}

            {(() => {
              const highlights = product.highlights ?? [];
              const benefits = getSupplementBenefits(product.slug);
              if (highlights.length === 0 && benefits.length === 0) return null;
              return (
                <div className="mt-8">
                  <p className="text-xs tracking-[0.22em] text-accent">產品特色</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
                    {highlights.map((h: string, i: number) => (
                      <li key={`h-${i}`} className="flex gap-3">
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                    {benefits.map((b, i) => (
                      <li key={`b-${i}`} className="flex gap-3">
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            {!product.intro && !product.highlights && (
              <p className="mt-8 border border-hairline bg-surface-muted p-5 text-xs text-muted-foreground">
                完整產品介紹、適應症與原廠規格文件將於下一階段自原廠資料庫匯入。
                如需專業諮詢、規格書或採購評估，請聯絡上怡業務團隊。
              </p>
            )}

            {product.spec && (
              <div className="mt-10">
                <p className="text-xs tracking-[0.22em] text-accent">規格說明</p>
                <dl className="mt-3 divide-y divide-hairline border-t border-b border-hairline text-sm">
                  {product.spec.name && (
                    <div className="grid grid-cols-4 gap-4 py-3">
                      <dt className="text-muted-foreground">品名</dt>
                      <dd className="col-span-3 text-foreground">{product.spec.name}</dd>
                    </div>
                  )}
                  {product.spec.size && (
                    <div className="grid grid-cols-4 gap-4 py-3">
                      <dt className="text-muted-foreground">規格</dt>
                      <dd className="col-span-3 text-foreground">{product.spec.size}</dd>
                    </div>
                  )}
                  {product.spec.origin && (
                    <div className="grid grid-cols-4 gap-4 py-3">
                      <dt className="text-muted-foreground">原產地</dt>
                      <dd className="col-span-3 text-foreground">{product.spec.origin}</dd>
                    </div>
                  )}
                  {product.spec.form && (
                    <div className="grid grid-cols-4 gap-4 py-3">
                      <dt className="text-muted-foreground">劑型</dt>
                      <dd className="col-span-3 text-foreground">{product.spec.form}</dd>
                    </div>
                  )}
                  {product.spec.mainIngredients && (
                    <div className="grid grid-cols-4 gap-4 py-3">
                      <dt className="text-muted-foreground">主成分</dt>
                      <dd className="col-span-3 text-foreground/80 leading-relaxed">
                        {product.spec.mainIngredients}
                      </dd>
                    </div>
                  )}
                  {product.spec.storage && (
                    <div className="grid grid-cols-4 gap-4 py-3">
                      <dt className="text-muted-foreground">保存條件</dt>
                      <dd className="col-span-3 text-foreground/80 leading-relaxed">
                        {product.spec.storage}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {product.usage && product.usage.length > 0 && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.22em] text-accent">食用方式</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
                  {product.usage.map((u: string, i: number) => (
                    <li key={`u-${i}`} className="flex gap-3">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-accent" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.notes && product.notes.length > 0 && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.22em] text-accent">注意事項</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/70">
                  {product.notes.map((n: string, i: number) => (
                    <li key={`n-${i}`} className="flex gap-3">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-accent" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.faq && product.faq.length > 0 && (
              <div className="mt-10">
                <p className="text-xs tracking-[0.22em] text-accent">常見問題 Q&amp;A</p>
                <div className="mt-3 space-y-4">
                  {product.faq.map((item: { q: string; a: string }, i: number) => (
                    <div key={i} className="border-l-2 border-hairline pl-4">
                      <p className="font-display text-sm text-foreground">
                        Q. {item.q}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.channels && product.channels.length > 0 && (
              <div className="mt-10 border border-hairline bg-surface-muted p-5">
                <p className="text-xs tracking-[0.22em] text-accent">合作通路</p>
                <p className="mt-2 text-sm text-foreground/80">
                  {product.channels.join("｜")}
                </p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  本系列產品不開放網路銷售，僅限授權醫療或專業機構提供。
                </p>
              </div>
            )}




            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                search={{ topic: "spec" }}
                className="group inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-sm tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                規格與通路諮詢
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/products/supplements"
                className="inline-flex items-center gap-2 border border-hairline px-5 py-3 text-sm tracking-wider text-foreground hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                返回保健品列表
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-hairline bg-surface-muted py-16">
          <div className="container-page">
            <h2 className="font-display text-xl text-foreground md:text-2xl">
              相關成份產品
            </h2>
            <div className="mt-6 grid gap-px bg-hairline sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/products/supplements/$slug"
                  params={{ slug: r.slug }}
                  className="group bg-surface p-6 hover:bg-surface-muted"
                >
                  <p className="text-xs tracking-[0.25em] text-accent">{r.code}</p>
                  <p className="mt-3 font-display text-lg text-foreground">{r.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {r.en}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
