import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getMedicalCategory, getMedicalProduct } from "@/data/medical";
import { MedicalProductDetail } from "@/components/MedicalProductDetail";

export const Route = createFileRoute("/products/$category/$slug")({
  loader: ({ params }) => {
    const category = getMedicalCategory(params.category);
    if (!category) throw notFound();
    const product = getMedicalProduct(params.category, params.slug);
    if (!product) throw notFound();
    return { category, product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const c = loaderData?.category;
    const title = p
      ? `${p.name} ${p.en}｜${c?.label}｜上怡生醫`
      : "產品｜上怡生醫";
    const desc = p?.tagline ?? c?.heroDesc ?? "上怡醫療相關產品。";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p?.imageUrl ? [{ property: "og:image", content: p.imageUrl }] : []),
      ],
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
