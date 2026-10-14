import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import type { MedicalCategory } from "@/data/medical";
import { MEDICAL_NOTE } from "@/data/medical";
import { formatDeviceClass, formatCert } from "@/lib/medical-format";
import { getMedicalProductGroups, DEVICES_FOOTER_NOTES } from "@/lib/medical-groups";

type Props = {
  category: MedicalCategory;
};

export function MedicalCategoryList({ category }: Props) {
  const groups = getMedicalProductGroups(category);
  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-16 md:py-20">
          <nav className="text-xs tracking-[0.22em] text-muted-foreground">
            <Link to="/products" className="hover:text-foreground">
              PRODUCTS
            </Link>
            <span className="mx-2 text-accent">/</span>
            <span className="text-foreground">
              {category.slug.toUpperCase()}
            </span>
          </nav>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="eyebrow">
                <span className="inline-block h-px w-6 bg-accent" />
                {category.heroEyebrow}
              </span>
              <h1 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-5xl">
                {category.heroTitle}
              </h1>
              {category.heroSubtitle && (
                <p className="mt-3 text-base text-foreground/80 md:text-lg">{category.heroSubtitle}</p>
              )}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {category.heroDesc}
              </p>
            </div>
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.22em] text-muted-foreground">
                CATEGORY
              </p>
              <p className="mt-2 font-display text-2xl text-foreground">
                {category.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {category.products.length} 項產品
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="space-y-14 md:space-y-20">
            {groups.map((group, index) => (
              <div key={group.id} className={[index > 0 ? "border-t-2 border-hairline pt-14 md:pt-20" : "", group.boxed ? "bg-surface-muted p-6 md:p-10" : ""].join(" ")}>
                {group.title && (
                  <div className="mb-6 border-l-2 border-accent pl-4 md:mb-8">
                    <h2 className="font-display text-2xl leading-tight text-foreground md:text-3xl">{group.title}</h2>
                    {group.brands && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.brands}</p>}
                  </div>
                )}
                <div className={category.slug === "devices" ? "grid gap-6 sm:grid-cols-2" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
            {group.products.map((p) => { const o = group.cards?.[p.slug]; return (
              <Link
                key={p.slug}
                to="/products/$category/$slug"
                params={{ category: category.slug, slug: p.slug }}
                className={`group border border-hairline bg-surface transition-colors hover:bg-surface-muted ${group.standalone ? "flex flex-col sm:col-span-2 md:grid md:grid-cols-2 md:items-center" : "flex flex-col justify-between"}`}
              >
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-white">
                  <img
                    src={p.imageUrl}
                    srcSet={p.imageSrcSet}
                    sizes={category.slug === "devices" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                    alt={`${p.name} ${p.en}`}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${
                      p.imageFit === "contain" ? "object-contain p-6" : "object-cover"
                    }`}
                  />
                </div>
                {o ? (
                  <div className="flex flex-1 flex-col p-8">
                    <ul className="flex flex-wrap gap-1.5">
                      {o.badges.map((b) => (
                        <li key={b} className="border border-accent/30 bg-accent/5 px-2 py-0.5 text-[11px] tracking-wider text-accent">{b}</li>
                      ))}
                    </ul>
                    <h3 className="mt-5 font-display text-2xl leading-tight text-foreground">{p.name}</h3>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{o.en}</p>
                    <p className="mt-4 text-sm text-foreground/80">產品定位｜{o.positioning}</p>
                    <p className="mt-4 border-t border-hairline pt-3 text-[11px] leading-relaxed text-muted-foreground">{o.certLine}</p>
                  </div>
                ) : (
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-[0.25em] text-accent">
                        {p.code}
                      </span>
                      {formatDeviceClass(p.spec?.deviceClass) && (
                        <span className="inline-flex items-center gap-1 border border-accent/30 bg-accent/5 px-2 py-0.5 text-[10px] tracking-wider text-accent">
                          <ShieldCheck className="h-3 w-3" />
                          {formatDeviceClass(p.spec?.deviceClass)}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-6 font-display text-2xl leading-tight text-foreground">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {p.en}
                    </p>
                    {(p.spec?.size || p.spec?.origin) && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        {[p.spec?.origin && `產地｜${p.spec.origin}`, p.spec?.size && `規格｜${p.spec.size}`]
                          .filter(Boolean)
                          .join("　")}
                      </p>
                    )}
                    {p.tagline && (
                      <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                        {p.tagline}
                      </p>
                    )}
                    {formatCert(p.spec?.cert) && (
                      <p className="mt-4 border-t border-hairline pt-3 text-[11px] leading-relaxed text-muted-foreground">
                        {formatCert(p.spec?.cert)}
                      </p>
                    )}
                    {p.channels && p.channels.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {p.channels.map((c) => (
                          <li
                            key={c}
                            className="border-l border-accent bg-surface-muted px-2 py-0.5 text-[11px] text-foreground/80"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                )}
              </Link>
            ); })}
                </div>
                {group.disclaimer && (
                  <blockquote className="mt-6 border-l-2 border-hairline pl-4 text-xs leading-relaxed text-muted-foreground">
                    {group.disclaimer}
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {category.slug === "devices" ? (
            <div className="mt-12 space-y-2 text-xs leading-relaxed text-muted-foreground">
              {DEVICES_FOOTER_NOTES.map((note) => (
                <p key={note}>※ {note}</p>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
              ※ {MEDICAL_NOTE} 詳細產品規格、許可證字號、原廠資料與適應症，請洽上怡業務團隊取得正式文件。
            </p>
          )}
        </div>
      </section>
    </>
  );
}
