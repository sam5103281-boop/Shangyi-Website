import type { MedicalCategory, MedicalProduct } from "@/data/medical";

type MedicalProductGroup = {
  id: string;
  title?: string;
  brands?: string;
  products: MedicalProduct[];
  standalone?: boolean;
};

export function getMedicalProductGroups(category: MedicalCategory): MedicalProductGroup[] {
  if (category.slug !== "devices") {
    return [{ id: category.slug, products: category.products }];
  }

  return [
    {
      id: "comwell",
      title: "ComWell 康威爾",
      products: category.products.filter((product) => product.slug === "comwell"),
      standalone: true,
    },
    {
      id: "clinical-devices",
      title: "院所照護器材",
      brands: "Cardinal Health 康德樂 · Covidien 柯惠",
      products: category.products.filter((product) => product.slug !== "comwell"),
    },
  ].filter((group) => group.products.length > 0);
}