import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getMedicalCategory, getMedicalProduct } from "@/data/medical";
import { MedicalProductDetail } from "@/components/MedicalProductDetail";
import { socialImageMeta } from "@/lib/seo";

export const Route = createFileRoute("/products/$category/$slug")({
  loader: ({ params }) => {
    const category = getMedicalCategory(params.category);
    if (!category) throw notFound();
    const product = getMedicalProduct(params.category, params.slug);
    if (!product) throw notFound();
    return { category, product };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.product;
    const c = loaderData?.category;
    const title = p
      ? `${p.name} ${p.en}｜${c?.label}｜上怡生醫`
      : "產品｜上怡生醫";
    const desc = p?.tagline ?? c?.heroDesc ?? "上怡醫療相關產品。";
    const url = `https://www.shangyi-care.com/products/${params.category}/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        ...socialImageMeta(p?.imageUrl),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                url,
                name: title,
                description: desc,
                isPartOf: { "@id": "https://www.shangyi-care.com/#website" },
                publisher: { "@id": "https://www.shangyi-care.com/#organization" },
              }),
            },
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
                    name: c?.label ?? "產品",
                    item: `https://www.shangyi-care.com/products/${params.category}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: `${p.name} ${p.en}`,
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
      <p className="font-display text-2xl">找不到此產品</p>
      <Link
        to="/products"
        className="mt-6 inline-block border border-primary px-5 py-3 text-xs tracking-wider"
      >
        返回產品中心
      </Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { category, product } = Route.useLoaderData();
  return <MedicalProductDetail category={category} product={product} />;
}
