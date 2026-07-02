import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import { ingredients, supplements, getIngredient, getSupplementImageScale } from "@/data/supplements";

const searchSchema = z.object({
  ingredient: z.string().optional(),
});

export const Route = createFileRoute("/products/supplements/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "特殊機能保健品｜上怡生技 SHANG YI BIOPHARMA" },
      {
        name: "description",
        content:
          "上怡生技特殊機能保健品 16 項，依成份分類檢索：葉黃素、魚油 Omega-3、維生素 B12／C／D3／K2、Q10、益生菌、鈣、鎂、硒、蔓越莓等，皆通過第三方檢驗。",
      },
      { property: "og:title", content: "特殊機能保健品｜上怡生技" },
      { property: "og:description", content: "依成份分類，快速找到對的保健配方。" },
    ],
  }),
  component: SupplementsPage,
});

function SupplementsPage() {
  const { ingredient: active } = Route.useSearch();
  const navigate = useNavigate({ from: "/products/supplements" });

  const filtered = active
    ? supplements.filter((s) => s.ingredients.includes(active))
    : supplements;

  const setIngredient = (id?: string) => {
    navigate({ search: { ingredient: id } });
  };

  const activeMeta = active ? getIngredient(active) : undefined;

  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-16 md:py-20">
          <nav className="text-xs tracking-[0.22em] text-muted-foreground">
            <Link to="/products" className="hover:text-foreground">
              PRODUCTS
            </Link>
            <span className="mx-2 text-accent">/</span>
            <span className="text-foreground">SUPPLEMENTS</span>
          </nav>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="eyebrow">
                <span className="inline-block h-px w-6 bg-accent" />
                Functional Clinical Supplements
              </span>
              <h1 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-5xl">
                特殊機能保健品．依成份檢索
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                上怡精選 16 項機能保健配方，全數依臨床營養需求設計、原料皆通過第三方檢驗。
                點選下方成份即可篩選對應產品；點入產品可查看完整規格與適應症。
              </p>
            </div>
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.22em] text-muted-foreground">
                CURRENT FILTER
              </p>
              <p className="mt-2 font-display text-2xl text-foreground">
                {activeMeta ? activeMeta.label : "全部成份"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {filtered.length} 項產品
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="container-page py-8">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIngredient(undefined)}
              className={`border px-4 py-2 text-xs tracking-wider transition-colors ${
                !active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-hairline bg-surface text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              全部 · ALL ({supplements.length})
            </button>
            {ingredients.map((ing) => {
              const count = supplements.filter((s) =>
                s.ingredients.includes(ing.id),
              ).length;
              if (count === 0) return null;
              const isActive = active === ing.id;
              return (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => setIngredient(ing.id)}
                  className={`border px-4 py-2 text-xs tracking-wider transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-hairline bg-surface text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {ing.label}
                  <span className="ml-1.5 text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted-foreground">
              此成份目前尚無對應產品。
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  to="/products/supplements/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-col justify-between border border-hairline bg-surface transition-colors hover:bg-surface-muted"
                >
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        srcSet={p.imageSrcSet}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        alt={`${p.name} ${p.en}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                        style={{ transform: `scale(${getSupplementImageScale(p.slug)})` }}
                      />
                    ) : (
                      <span className="font-display text-2xl text-foreground/20">
                        {p.en}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-[0.25em] text-accent">
                        {p.code}
                      </span>
                      <span className="text-[10px] tracking-wider text-muted-foreground">
                        {p.origin}製造進口
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-2xl leading-tight text-foreground">
                      {p.name}
                    </h2>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {p.en}
                    </p>
                    {p.capsule && (
                      <p className="mt-3 text-xs text-muted-foreground">{p.capsule}</p>
                    )}
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {p.ingredients.map((id) => {
                        const ing = getIngredient(id);
                        if (!ing) return null;
                        return (
                          <li
                            key={id}
                            className="border-l border-accent bg-surface-muted px-2 py-0.5 text-[11px] text-foreground/80"
                          >
                            {ing.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="container-page mt-12">
          <p className="text-xs leading-relaxed text-muted-foreground">
            ※ 本頁產品圖文僅供專業參考。詳細產品規格、許可證字號、原廠資料與適應症，
            請洽上怡業務團隊取得正式文件。本品非藥品，不具療效，請依說明使用。
          </p>
        </div>
      </section>
    </>
  );
}
