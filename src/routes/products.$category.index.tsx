import { createFileRoute, notFound } from "@tanstack/react-router";
import { getMedicalCategory } from "@/data/medical";
import { MedicalCategoryList } from "@/components/MedicalCategoryList";

export const Route = createFileRoute("/products/$category/")({
  loader: ({ params }) => {
    const category = getMedicalCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    const c = loaderData?.category;
    const title = c
      ? `${c.label}｜上怡生醫 SHANG YI BIOPHARMA`
      : "產品｜上怡生醫";
    const desc = c?.heroDesc ?? "上怡醫療相關產品線。";
    const url = `https://www.shangyi-care.com/products/${params.category}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: c
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "產品中心",
                    item: "https://www.shangyi-care.com/products",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: c.label,
                    item: url,
                  },
                ],
              }),
            },
          ]
        : [],
    };
  },

  notFoundComponent: () => (
    <div className="container-page section-pad text-center">
      <p className="font-display text-2xl">找不到此產品分類</p>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  return <MedicalCategoryList category={category} />;
}
