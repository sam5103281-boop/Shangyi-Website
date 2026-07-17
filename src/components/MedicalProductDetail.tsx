import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Hand, Package, Sparkles, Eye } from "lucide-react";
import type { MedicalCategory, MedicalProduct, UsageStep } from "@/data/medical";

const usageIconMap = { hand: Hand, package: Package, sparkles: Sparkles, eye: Eye } as const;


type Props = {
  category: MedicalCategory;
  product: MedicalProduct;
};

export function MedicalProductDetail({ category, product }: Props) {
  const related = category.products.filter((p) => p.slug !== product.slug).slice(0, 3);
  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-12 md:py-16">
          <nav className="text-xs tracking-[0.22em] text-muted-foreground">
            <Link to="/products" className="hover:text-foreground">
              PRODUCTS
            </Link>
            <span className="mx-2 text-accent">/</span>
            <Link
              to="/products/$category"
              params={{ category: category.slug }}
              className="hover:text-foreground"
            >
              {category.slug.toUpperCase()}
            </Link>
            <span className="mx-2 text-accent">/</span>
            <span className="text-foreground">{product.en}</span>
          </nav>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
                <img
                  src={product.imageUrl}
                  srcSet={product.imageSrcSet}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={`${product.name} ${product.en}`}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full ${product.imageFit === "contain" ? "object-contain p-8" : "object-cover"}`}
                />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                <span className="text-[11px] tracking-[0.28em] text-accent">{product.code}</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {category.label}
                </span>
              </div>
            </div>
          </div>


          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.25em] text-accent">{product.code}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {category.label}
            </p>
            <h1 className="mt-4 font-display text-2xl leading-tight text-foreground md:text-3xl">
              {product.name}
            </h1>
            {!product.name.toLowerCase().includes(product.en.toLowerCase()) && (
              <p className="mt-2 font-display text-xl text-muted-foreground">
                {product.en}
              </p>
            )}

            {product.tagline && (
              <p className="mt-6 text-base leading-relaxed text-foreground/80">
                {product.tagline}
              </p>
            )}

            {product.intro && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.22em] text-accent">產品介紹</p>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/80">
                  {product.intro}
                </p>
              </div>
            )}

            {product.featureIcons && product.featureIcons.length > 0 && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.22em] text-accent">四大核心特色</p>
                <div className="mt-4 grid grid-cols-2 gap-px bg-hairline sm:grid-cols-4">
                  {product.featureIcons.map((f, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 bg-surface p-5 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/20 bg-accent/5 p-3">
                        <img src={f.src} alt={f.title} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{f.title}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{f.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.highlights.length > 0 && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.22em] text-accent">產品特色</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.uses && product.uses.length > 0 && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.22em] text-accent">適應症</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {product.uses.map((u, i) => {
                    const item = typeof u === "string" ? { text: u } : u;
                    return (
                      <li
                        key={i}
                        className="group relative overflow-hidden border border-hairline bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
                      >
                        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent to-accent/30 transition-all duration-300 group-hover:w-1.5" />
                        <div className="flex items-start gap-3">
                          <span className="font-display text-xs tracking-[0.2em] text-accent/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm leading-relaxed text-foreground/85">
                            {item.text}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {product.usage && product.usage.length > 0 && (
              <div className="mt-10">
                <p className="text-xs tracking-[0.22em] text-accent">使用方法</p>
                <ol className="mt-4 grid gap-px bg-hairline sm:grid-cols-2">
                  {product.usage.map((step: UsageStep, i) => {
                    const Icon = usageIconMap[step.icon];
                    return (
                      <li key={i} className="flex gap-4 bg-surface p-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent/30 bg-accent/5 text-foreground">
                          {step.image ? (
                            <img
                              src={step.image}
                              alt=""
                              aria-hidden
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Icon className="h-6 w-6" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] tracking-[0.28em] text-accent">
                            STEP {String(i + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}


            {product.spec && (
              <div className="mt-10">
                <p className="text-xs tracking-[0.22em] text-accent">規格說明</p>
                <dl className="mt-3 divide-y divide-hairline border-t border-b border-hairline text-sm">
                  {product.spec.size && (
                    <Row label="規格" value={product.spec.size} />
                  )}
                  {product.spec.origin && (
                    <Row label="原產地" value={product.spec.origin} />
                  )}
                  {product.spec.material && (
                    <Row label="主成分／材質" value={product.spec.material} />
                  )}
                  {product.spec.storage && (
                    <Row label="保存條件" value={product.spec.storage} />
                  )}
                  {product.spec.cert && (
                    <Row label="許可字號" value={product.spec.cert} />
                  )}
                  {product.spec.deviceClass && (
                    <Row label="醫療器材級數" value={product.spec.deviceClass} />
                  )}
                </dl>
              </div>
            )}

            {product.notes && product.notes.length > 0 && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.22em] text-accent">注意事項</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/70">
                  {product.notes.map((n, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-accent" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.tutorials && product.tutorials.length > 0 && (
              <div className="mt-10">
                <p className="text-xs tracking-[0.22em] text-accent">使用教學</p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  {product.tutorials.map((v) => (
                    <div key={v.id}>
                      <div className="relative aspect-video w-full overflow-hidden border border-hairline bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${v.id}`}
                          title={v.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                        />
                      </div>
                      <p className="mt-2 text-xs tracking-wide text-muted-foreground">
                        {v.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.faq && product.faq.length > 0 && (
              <div className="mt-10">
                <p className="text-xs tracking-[0.22em] text-accent">產品常見問題 Q&amp;A</p>
                <dl className="mt-4 divide-y divide-hairline border-t border-b border-hairline">
                  {product.faq.map((item, i) => (
                    <div key={i} className="py-5">
                      <dt className="flex gap-3 text-sm font-medium text-foreground">
                        <span className="text-accent">Q.</span>
                        <span>{item.q}</span>
                      </dt>
                      <dd className="mt-2 flex gap-3 text-sm leading-relaxed text-foreground/75">
                        <span className="text-accent">A.</span>
                        <span>{item.a}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.videos && product.videos.length > 0 && (
              <div className="mt-10">
                <p className="text-xs tracking-[0.22em] text-accent">產品影片</p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  {product.videos.map((v) => (
                    <div key={v.id}>
                      <div className="relative aspect-video w-full overflow-hidden border border-hairline bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${v.id}`}
                          title={v.title ?? "Product video"}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                        />
                      </div>
                      {v.title && (
                        <p className="mt-2 text-xs tracking-wide text-muted-foreground">
                          {v.title}
                        </p>
                      )}
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
                to="/products/$category"
                params={{ category: category.slug }}
                className="inline-flex items-center gap-2 border border-hairline px-5 py-3 text-sm tracking-wider text-foreground hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                返回 {category.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-hairline bg-surface-muted py-16">
          <div className="container-page">
            <h2 className="font-display text-xl text-foreground md:text-2xl">
              其他 {category.label}
            </h2>
            <div className="mt-6 grid gap-px bg-hairline sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/products/$category/$slug"
                  params={{ category: category.slug, slug: r.slug }}
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-4 gap-4 py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="col-span-3 text-foreground/80 leading-relaxed">{value}</dd>
    </div>
  );
}
