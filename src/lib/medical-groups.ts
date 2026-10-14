import type { MedicalCategory, MedicalProduct } from "@/data/medical";

export type MedicalCardOverride = {
  badges: string[];
  en: string;
  positioning: string;
  certLine: string;
};

export type MedicalProductGroup = {
  id: string;
  title?: string;
  brands?: string;
  products: MedicalProduct[];
  standalone?: boolean;
  boxed?: boolean;
  disclaimer?: string;
  cards?: Record<string, MedicalCardOverride>;
};

export const DEVICES_FOOTER_NOTES = [
  "本站所載醫療器材資訊僅供合法醫療院所、藥局及醫事人員參考，不具網路販售功能。產品詳細規格、作用原理與核准適應症，請依主管機關核定仿單標示或洽詢上怡生醫業務團隊。",
];

const pick = (c: MedicalCategory, slugs: string[]) =>
  slugs.map((s) => c.products.find((p) => p.slug === s)).filter((p): p is MedicalProduct => !!p);

export function getMedicalProductGroups(category: MedicalCategory): MedicalProductGroup[] {
  if (category.slug !== "devices") {
    return [{ id: category.slug, products: category.products }];
  }

  const groups: MedicalProductGroup[] = [
    {
      id: "international-brands",
      title: "國際原廠授權代理｜氣動加壓與醫用輔助設備",
      brands: "嚴選國際醫療品牌之順序性氣動加壓系統與物理性漸進減壓輔助襪。",
      products: pick(category, ["scd", "ted"]),
      disclaimer:
        "本專區設備與耗材由原廠（Covidien llc / Cardinal Health 200, LLC）製造。產品商標及智慧財產權均屬原製造廠所有。",
      cards: {
        scd: {
          badges: ["【原廠代理】Covidien", "【美國進口】"],
          en: "\"Covidien\" Kendall SCD 700 Sequential Compression System",
          positioning: "臨床用順序性加壓系統",
          certLine: "衛部醫器輸字第036995號｜第二等級醫療器材｜醫院／診所通路",
        },
        ted: {
          badges: ["【原廠代理】Cardinal Health", "【美國進口】"],
          en: "\"Cardinal Health\" T.E.D. Anti-Embolism Stockings",
          positioning: "漸進式壓力醫用輔助襪",
          certLine: "衛署醫器輸字第013703號｜第二等級醫療器材｜醫院／診所通路",
        },
      },
    },
    {
      id: "comwell",
      title: "康威爾 ComWell 專區｜攜帶式間歇充氣加壓系統",
      brands: "台灣自主研發製造，具備輕量便攜特點之充氣加壓系統與循環輔助方案。",
      products: pick(category, ["comwell"]),
      standalone: true,
      boxed: true,
      cards: {
        comwell: {
          badges: ["【自主品牌】ComWell 康威爾", "【台灣製造 MIT】"],
          en: "\"ComWell\" Portable Intermittent Pneumatic Compression System",
          positioning: "間歇充氣加壓系統（IPC）",
          certLine: "衛部醫器製字第008496號｜第二等級醫療器材｜醫院／診所、居家照護租賃方案",
        },
      },
    },
  ];
  return groups.filter((g) => g.products.length > 0);
}
