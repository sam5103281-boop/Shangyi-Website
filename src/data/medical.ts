// Medical / device product data. Image URLs reference the original
// 上怡 shangyi-care CDN (Cloudflare R2-style store-assets bucket) which is
// publicly hot-linkable and matches the official product photography.

import indVenousFlow from "@/assets/indications/venous-flow.png";
import indDvtPrevent from "@/assets/indications/dvt-prevent.png";
import indVenousStasis from "@/assets/indications/venous-stasis.png";
import indLegUlcer from "@/assets/indications/leg-ulcer.png";
import indCvi from "@/assets/indications/cvi.png";
import indEdema from "@/assets/indications/edema.png";
const patchStep1 = "/patch-step-1-fit.svg";
const patchStep2 = "/patch-step-2.svg";
const patchStep3 = "/patch-step-3.svg";
const patchStep4 = "/patch-step-4.svg";

export type MedicalSpec = {
  size?: string;
  origin?: string;
  material?: string;
  storage?: string;
  cert?: string;
  deviceClass?: string;
};

export type UsageStep = { icon: "hand" | "package" | "sparkles" | "eye"; text: string; image?: string };
export type FaqItem = { q: string; a: string };

export type UseItem = { text: string; icon?: string };

export type MedicalProduct = {
  slug: string;
  code: string;
  name: string;
  en: string;
  tagline: string;
  imageUrl: string;
  imageSrcSet?: string;
  imageFit?: "contain" | "cover";
  highlights: string[];
  intro?: string;
  uses?: (string | UseItem)[];
  usage?: UsageStep[];
  spec?: MedicalSpec;
  notes?: string[];
  channels?: string[];
  faq?: FaqItem[];
  videos?: { id: string; title?: string }[];
  tutorials?: { id: string; title: string }[];
  featureIcons?: { src: string; title: string; en: string }[];
};


export type MedicalCategory = {
  slug: "patches" | "eye-pads" | "devices";
  label: string;
  en: string;
  code: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDesc: string;
  products: MedicalProduct[];
};

const HOSP_NOTE = "本品為醫療相關用品，僅於醫院、診所、藥局通路販售，不開放網路零售。";

export const medicalCategories: MedicalCategory[] = [
  {
    slug: "patches",
    label: "德國舒護貼",
    en: "BeCare Medical Adhesive Patches",
    code: "P · 02",
    heroEyebrow: "Medical Adhesive Patch · Germany",
    heroTitle: "德國舒護貼．醫療等級黏性貼片",
    heroDesc:
      "源自德國原廠，採醫療等級黏著與防水膠底層，提供日常照護所需的穩定貼附力。",
    products: [
      {
        slug: "beaid",
        code: "BE · 01",
        name: "BeAid 支持貼",
        en: "BeAid",
        tagline: "【德國進口】．BeAid 支持貼醫療用黏性貼片。",
        imageUrl: "/__l5e/assets-v1/86b292b3-4ef3-4496-9755-929e24a9aea6/beaid-product-v2.webp",
        imageSrcSet: "/__l5e/assets-v1/86b292b3-4ef3-4496-9755-929e24a9aea6/beaid-product-v2.webp 1200w",
        imageFit: "contain",
        intro:
          "本產品為德國進口之 InnForce BeAid 支持貼醫療用黏性貼片。採用醫療等級黏著防水膠，具有輕薄舒適、防水效果佳、低敏性之產品特性。外觀採用清爽簡約的「明亮水藍底色搭配幾何雙圓弧線條」設計，視覺風格經典且具專業感，專為家庭日常儲備、一般防護與注重高效日常管理之族群貼心打造。",
        highlights: [
          "幾何線條極簡視覺：採用明亮清爽的水藍底色與簡約幾何雙圓弧線條設計，外觀具高度辨識度。",
          "醫療等級黏著底層：選用高規格醫療等級黏著防水膠底層，日常貼附穩定，安心不易脫落。",
          "輕薄舒適防水膠面：具備優質防水效果，洗手、淋浴或日常活動後均可免更換，有效延長使用時間。",
          "物理防護純淨無藥：本產品無添加藥品或生物性製劑，不含抑菌成分與動物來源材料，成分純淨溫和。",
          "用途：能精準以支撐組織保護傷口，方便診間與居家使用。",
        ],
        usage: [
          { icon: "hand", text: "撕下外層：撕下外層透明塑膠膜。", image: patchStep1 },
          { icon: "package", text: "浸水濕潤：將貼片浸入水中至完全濕潤。", image: patchStep2 },
          { icon: "sparkles", text: "置於位置：將貼片置於欲支撐組織之位置，並輕輕按壓以確保黏合皮膚。", image: patchStep3 },
          { icon: "eye", text: "維持完整：慢慢撕下離型紙以保持貼片完整附著。", image: patchStep4 },
        ],
        spec: {
          size: "6 入／盒",
          origin: "德國",
          material: "外層 透明塑膠膜｜貼片 醫療等級黏著防水膠底層｜底層 離型紙",
          storage: "請放置於孩童不易取得之處，避免陽光直射、潮濕或高溫環境。",
          cert: "衛部醫器輸壹字第 023604 號",
          deviceClass: "第一等級",
        },
        notes: [
          "本產品為一次性使用，非重複使用之產品。",
          "若使用後皮膚有任何不適的現象，請立即停止使用。",
          "本產品只限外用。不適用於嚴重燒傷（3 級）、不可取代外科縫線。",
          "請放置在孩童不易拿取的地方，並避免放置在陽光直射、潮濕或高溫處。",
        ],
        channels: ["醫院／診所", "醫院所屬藥局"],
      },
      {
        slug: "bezen",
        code: "BE · 02",
        name: "BeZen 悠然貼",
        en: "BeZen",
        tagline: "【德國進口】．BeZen 悠然貼醫療用黏性貼片。",
        imageUrl: "/__l5e/assets-v1/2be601f5-1ec8-496b-b728-9c15d0ad5758/bezen-product-v4.webp",
        imageSrcSet: "/__l5e/assets-v1/2be601f5-1ec8-496b-b728-9c15d0ad5758/bezen-product-v4.webp 1200w",
        imageFit: "contain",
        intro:
          "本產品為德國進口之 InnForce BeZen 悠然貼醫療用黏性貼片。採用醫療等級黏著防水膠，具有輕薄舒適、防水效果佳、低敏性之產品特性。外觀設計巧妙融合「湖水綠藍底色與漸層鵝黃圓弧」，營造出大自然般和諧、平靜的沉穩視覺，專為熱愛戶外休閒、瑜珈伸展、冥想靜修與追求身心悠然平衡之族群量身打造。",
        highlights: [
          "悠然沉穩漸層設計：採用獨特的湖水綠藍底色，搭配一抹漸層鵝黃的優雅圓弧線條，視覺感和諧放鬆。",
          "低敏親膚穩定貼附：醫療等級防水膠底層輕薄舒適，即使長時間貼附亦能維持溫和與低敏特性。",
          "洗手淋浴免予更換：優質防水防汗設計，無論是淋浴洗沐或日常出汗均免更換，可延長使用時間。",
          "純物理防護無負擔：100% 無添加中西藥物、生物性製劑與抑菌成分，帶來最純淨的局部物理防護。",
          "用途：能精準以支撐組織保護傷口，提供穩固的結構支撐。",
        ],
        usage: [
          { icon: "hand", text: "撕下外層：撕下外層透明塑膠膜。", image: patchStep1 },
          { icon: "package", text: "浸水濕潤：將貼片浸入水中至完全濕潤。", image: patchStep2 },
          { icon: "sparkles", text: "置於位置：將貼片置於欲支撐組織之位置，並輕輕按壓以確保黏合皮膚。", image: patchStep3 },
          { icon: "eye", text: "維持完整：慢慢撕下離型紙以保持貼片完整附著。", image: patchStep4 },
        ],
        spec: {
          size: "6 入／盒",
          origin: "德國",
          material: "外層 透明塑膠膜｜貼片 醫療等級黏著防水膠底層｜底層 離型紙",
          storage: "請放置於孩童不易取得之處，避免陽光直射、潮濕或高溫環境。",
          cert: "衛部醫器輸壹字第 023604 號",
          deviceClass: "第一等級",
        },
        notes: [
          "本產品為一次性使用，非重複使用之產品。",
          "若使用後皮膚有任何不適的現象，請立即停止使用。",
          "本產品只限外用。不適用於嚴重燒傷（3 級）、不可取代外科縫線。",
          "請放置在孩童不易拿取的地方，並避免放置在陽光直射、潮濕或高溫處。",
        ],
        channels: ["醫院／診所", "醫院所屬藥局"],
      },
      {
        slug: "bebright",
        code: "BE · 03",
        name: "beBright 女性貼",
        en: "beBright",
        tagline: "【德國進口】．beBright 女性貼醫療用黏性貼片。",
        imageUrl: "/__l5e/assets-v1/bc2ee4a2-14ff-4bcd-acee-60295a05b7ca/bebright-product-v2.webp",
        imageSrcSet: "/__l5e/assets-v1/bc2ee4a2-14ff-4bcd-acee-60295a05b7ca/bebright-product-v2.webp 1200w",
        imageFit: "contain",
        intro:
          "本產品為德國進口之 InnForce beBright 女性貼醫療用黏性貼片。採用醫療等級黏著防水膠，具有輕薄舒適、防水效果佳、低敏性之產品特性。外觀採用浪漫柔美的「玫瑰粉紅底色搭配同心光芒漣漪圈」設計，展現溫柔、絢麗與自信的獨特氣質，專為現代女性日常穿搭保養、注重精緻細節與美學美感之族群精緻打造。",
        highlights: [
          "光芒漣漪美學設計：採用溫柔優雅的玫瑰粉紅底色，搭配如同水面漣漪、層層擴散的同心光芒線條，精緻且極具美感。",
          "細緻穿搭隱形服貼：柔和淺色系外觀適合各式日常貼身衣物穿搭，貼附舒適，細緻隱形不突兀。",
          "高效防水免予更換：醫療等級黏著防水膠防水效果佳，洗手或沐浴均不受影響，安心延長使用時間。",
          "純淨配方溫和低敏：產品不含任何中西藥物成分、動物來源材料或抑菌成分，給予肌膚最純粹的物理護理。",
          "用途：以支撐組織保護傷口，優雅守護您每一天的自在步伐。",
        ],
        usage: [
          { icon: "hand", text: "撕下外層：撕下外層透明塑膠膜。", image: patchStep1 },
          { icon: "package", text: "浸水濕潤：將貼片浸入水中至完全濕潤。", image: patchStep2 },
          { icon: "sparkles", text: "置於位置：將貼片置於欲支撐組織之位置，並輕輕按壓以確保黏合皮膚。", image: patchStep3 },
          { icon: "eye", text: "維持完整：慢慢撕下離型紙以保持貼片完整附著。", image: patchStep4 },
        ],
        spec: {
          size: "6 入／盒",
          origin: "德國",
          material: "外層 透明塑膠膜｜貼片 醫療等級黏著防水膠底層｜底層 離型紙",
          storage: "請放置於孩童不易取得之處，避免陽光直射、潮濕或高溫環境。",
          cert: "衛部醫器輸壹字第 023604 號",
          deviceClass: "第一等級",
        },
        notes: [
          "本產品為一次性使用，非重複使用之產品。",
          "若使用後皮膚有任何不適的現象，請立即停止使用。",
          "本產品只限外用。不適用於嚴重燒傷（3 級）、不可取代外科縫線。",
          "請放置在孩童不易拿取的地方，並避免放置在陽光直射、潮濕或高溫處。",
        ],
        channels: ["醫院／診所", "醫院所屬藥局"],
      },
      {
        slug: "belight",
        code: "BE · 04",
        name: "beLight 兒童貼",
        en: "beLight",
        tagline: "【德國進口】．beLight 兒童貼醫療用黏性貼片。",
        imageUrl: "/__l5e/assets-v1/313cd21d-c359-4150-b215-4b1521b761b6/belight-product-v3.webp",
        imageSrcSet: "/__l5e/assets-v1/313cd21d-c359-4150-b215-4b1521b761b6/belight-product-v3.webp 1200w",
        imageFit: "contain",
        intro:
          "本產品為德國進口之 InnForce beLight 兒童貼醫療用黏性貼片。採用醫療等級黏著防水膠，具有輕薄舒適、防水效果佳、低敏性之產品特性。外觀設計別出心裁地採用「粉紫薰衣草底色搭配活潑氣泡圓圈」，呈現如同泡泡般輕盈跳躍、歡樂和諧的童趣意象，能有效降低施貼時的緊張感，專為學童、青少年以及喜愛活潑趣味風格之族群量身定做。",
        highlights: [
          "輕盈活潑氣泡設計：採用療癒和諧的粉紫薰衣草底色，搭配由大小圓點巧妙排列而成的氣泡圓圈，視覺效果溫和且富有朝氣。",
          "極致舒適低敏服貼：醫療等級底層具備絕佳的低敏性與輕薄度，溫和服貼細嫩肌膚，不易引發抗拒感。",
          "高耐水性無懼玩耍：防水效果佳，即使孩童日常洗手、淋浴或活動流汗均免更換，完美延長使用時間。",
          "不添加藥家長安心：無添加西藥、中藥、生長激素或任何抑菌成分，純物理機制家長最放心。",
          "用途：能精準以支撐組織保護傷口，提供溫柔且穩固的局部防護。",
        ],
        usage: [
          { icon: "hand", text: "撕下外層：撕下外層透明塑膠膜。", image: patchStep1 },
          { icon: "package", text: "浸水濕潤：將貼片浸入水中至完全濕潤。", image: patchStep2 },
          { icon: "sparkles", text: "置於位置：將貼片置於欲支撐組織之位置，並輕輕按壓以確保黏合皮膚。", image: patchStep3 },
          { icon: "eye", text: "維持完整：慢慢撕下離型紙以保持貼片完整附著。", image: patchStep4 },
        ],
        spec: {
          size: "6 入／盒",
          origin: "德國",
          material: "外層 透明塑膠膜｜貼片 醫療等級黏著防水膠底層｜底層 離型紙",
          storage: "請放置於孩童不易取得之處，避免陽光直射、潮濕或高溫環境。",
          cert: "衛部醫器輸壹字第 023604 號",
          deviceClass: "第一等級",
        },
        notes: [
          "本產品為一次性使用，非重複使用之產品。",
          "若使用後皮膚有任何不適的現象，請立即停止使用。",
          "本產品只限外用。不適用於嚴重燒傷（3 級）、不可取代外科縫線。",
          "請放置在孩童不易拿取的地方，並避免放置在陽光直射、潮濕或高溫處。",
        ],
        channels: ["醫院／診所", "醫院所屬藥局"],
      },
    ],
  },
  {
    slug: "eye-pads",
    label: "眼部清淨綿",
    en: "Ophthalmic Cleansing Pads",
    code: "P · 03",
    heroEyebrow: "Ophthalmic Cleansing Pads",
    heroTitle: "眼部清淨綿．溫和精製，適合敏感肌使用",
    heroDesc:
      "為眼周日常護理、術前後清潔與敏感肌膚設計。採醫療脫脂綿搭配精製水，獨立鋁箔包裝確保衛生與便利。",
    products: [
      {
        slug: "visiony",
        code: "VS · 01",
        name: "Visiony 和豐清淨綿",
        en: "Visiony Cleansing Pads",
        tagline: "【日本進口】．高溫高壓滅菌脫脂棉防護清淨棉。",
        imageUrl: "/__l5e/assets-v1/27fdfbf4-f598-4540-a603-d09adfb7e434/visiony-1600.webp",
        imageSrcSet: "/__l5e/assets-v1/e7ae3e99-1103-42e6-9768-f127cf93e227/visiony-800.webp 800w, /__l5e/assets-v1/27fdfbf4-f598-4540-a603-d09adfb7e434/visiony-1600.webp 1600w",
        intro:
          "本產品為日本進口精純清淨棉，採高溫高壓滅菌處理，嚴選優質天然脫脂棉製成，僅含滅菌純水，不添加香料、酒精及防腐劑，溫和不刺激。\n\n每片皆採獨立鋁箔包裝，一包兩片，方便攜帶並維持清潔衛生。主要適用於眼周及眼部日常清潔，可溫和擦拭眼周分泌物與髒污，也適合嬰幼兒及肌膚較敏感者日常使用，提供安心、便利的潔淨照護。",
        highlights: [
          "高溫高壓滅菌處理：採用高規格高溫高壓滅菌製程，確保清淨棉符合潔淨與安全標準。",
          "純淨無瑕成分配方：僅含純水與天然棉體，不添加酒精、香料、螢光劑及化學防腐劑。",
          "天然柔軟脫脂棉體：精選天然脫脂棉，質地細緻、不傷肌膚，輕柔落實局部潔淨。",
          "獨立鋁箔雙片包裝：每包採用雙片獨立鋁箔包裝設計，攜帶便利，且能維持棉體濕潤。",
          "眼部日常清潔護理：適用於嬰幼兒及成人眼周擦拭，可溫和清潔眼周分泌物與髒污，作為日常眼部衛生照護使用。",
        ],
        usage: [
          { icon: "hand", image: "/__l5e/assets-v1/492102b0-1404-4f5c-894d-e7a5f8f188b3/visiony-step-1-wash.png", text: "使用前請先洗手，取出單包清淨棉後，沿著虛線處撕開，開封後請盡速用完。" },
          { icon: "package", image: "/__l5e/assets-v1/28117c1d-adbf-48a2-8023-a90d131e39ba/visiony-step-2-open.png", text: "每包含 2 枚折疊的清淨棉，內含充足的精製水以保持濕潤，必要時可稍微擠乾後再使用。" },
          { icon: "sparkles", image: "/__l5e/assets-v1/12795842-d541-4a0d-813f-09e31268fed5/visiony-step-3-wipe.png", text: "用清淨棉擦拭分泌物或清潔用，請勿來回擦拭或重複使用，用後應立即丟棄。" },
          { icon: "eye", image: "/__l5e/assets-v1/08babd31-9208-4b48-8547-87bd511cbefa/visiony-step-4-drops.png", text: "點眼藥水時，可把清淨棉放在下眼皮處輕輕往下拉，點完後可用清淨棉輕拭溢出的眼藥水。" },
        ],
        spec: {
          size: "2 枚 × 40 包／盒，單片約 7.5 × 7.5 cm",
          origin: "日本 Osaki Medical Corporation",
          material: "日本醫療脫脂綿、精製水",
          storage: "置於陰涼乾燥處，避免受潮及陽光直射。",
        },
        notes: [
          "本產品為單次消耗性衛生用品，一經拆封請立即使用，切勿重複使用。",
          "內含豐富滅菌純水，包裝若有破損或漏水現象請勿使用。",
          "若在寒冷季節需要溫熱感，可在未拆封前將鋁箔袋浸泡於溫水中稍加溫（請勿使用沸水），即可享受溫和舒適的擦拭體驗。",
        ],
        channels: ["醫院／診所", "醫院所屬藥局", "眼科指定通路"],
        faq: [
          {
            q: "請問這款清淨棉裡面有添加化學藥劑或殺菌劑嗎？",
            a: "沒有。本產品成分僅有天然脫脂棉與滅菌純水，其潔淨度全靠高溫高壓滅菌製程完成。不含酒精、不含化學防腐劑與香料，完全無化學殘留顧慮。",
          },
          {
            q: "嬰幼兒或成人的眼周需要使用清淨棉擦拭嗎？",
            a: "當眼周有分泌物、淚痕或髒污時，可使用獨立包裝的清淨棉，由內眼角向外輕柔擦拭，協助維持眼周清潔。建議左右眼分開使用，避免來回擦拭；如有明顯紅腫、疼痛或持續分泌物，應諮詢醫療專業人員。",
          },
          {
            q: "產品裡面有時候會看到非常微小的黑色或黃色小點，那是正常的嗎？",
            a: "請放心，這是正常現象。因為採用的是未經化學強力漂白的天然脫脂棉，那些微小的小點是棉花植物本身的殼或種子殘留物，對人體肌膚完全無害，敬請安心使用。",
          },
        ],
      },

    ],
  },
  {
    slug: "devices",
    label: "醫療器材",
    en: "Lower-Limb Circulation Care",
    code: "P · 04",
    heroEyebrow: "Medical Devices",
    heroTitle: "間歇性氣動加壓系統與醫療級壓力襪",
    heroDesc:
      "醫療等級下肢循環照護產品線，涵蓋康威爾 ComWell 間歇性氣動加壓系統與醫療級壓力襪，適用於長期臥床、術後恢復、行動不便與日常循環支援。",
    products: [
      {
        slug: "comwell",
        code: "CW · 01",
        name: "「康威爾」攜帶式間歇充氣加壓系統",
        en: "\"ComWell\" Portable Intermittent Pneumatic Compression System",
        tagline: "【台灣製造】．IPC 間歇充氣加壓系統。",
        imageUrl: "/__l5e/assets-v1/bde11b60-2c11-4949-a0ba-a7a2e054aac9/comwell-official.jpg",
        imageSrcSet: "/__l5e/assets-v1/bde11b60-2c11-4949-a0ba-a7a2e054aac9/comwell-official.jpg 1200w",
        imageFit: "contain",
        featureIcons: [
          { src: "/__l5e/assets-v1/87f215e4-3e09-4a3f-a60d-f9226365a9de/comwell-icon-refill.png", title: "智能回填量測", en: "Smart Refill Sensing" },
          { src: "/__l5e/assets-v1/c405b08f-0799-4fa5-a27d-47c64dba5d03/comwell-icon-gradient.png", title: "梯度加壓循環", en: "Gradient Pressure Cycling" },
          { src: "/__l5e/assets-v1/d5c87bdb-190b-4a37-b0d9-c3c2867fda70/comwell-icon-battery.png", title: "電池長效續航", en: "Long-Lasting Battery Life" },
          { src: "/__l5e/assets-v1/c8277d37-2a0f-44f4-8e84-a899c7392ed4/comwell-icon-compact.png", title: "輕巧無線易用", en: "Compact, Cord-Free" },
        ],
        intro:
          "IPC間歇充氣加壓系統\n本系統用於提供間歇性充氣加壓治療，通過施加順序和梯度壓力，以增加具潛在風險性病患的靜脈血流量，並協助預防深層靜脈血栓及肺栓塞。",
        highlights: [
          "血液回填時間測量 Smart Refill Sensing / VRD, Venous Refill Detection：系統偵測下肢靜脈血液回填時間（Venous Refill Time, VRT），於靜脈血液全部回填完畢後再進行加壓，以達最佳血液循環效果。",
          "依使用者當下的生理狀態，系統量測靜脈血液回填時間。",
          "當下肢靜脈經氣囊加壓後，血液被向上推送，於氣囊洩氣時，靜脈再次充滿血所需的時間，即為血液回填時間（VRT）。",
          "測量所得時間將用於加壓循環之洩氣等待時間，當靜脈血液全部回填後再進行加壓，以達最佳血液循環效果。",
          "血液回填時間測量僅於開機後第一次加壓時執行，VRD（Venous Refill Detection）每次加壓時間不會短於20秒 或 長於60秒。",
          "｜順序梯度加壓：透過充氣套由腳踝、小腿至大腿逐步加壓，模擬靜脈血流方向，促進血液流動，以提高血液循環之效果。",
          "｜透氣舒適 穿脫便利：充氣套採用透氣材質與魔鬼氈設計，穿戴方便，膝蓋處可彎曲，提升病人活動舒適性。",
        ],
        uses: [
          { text: "加強靜脈血液流動", icon: indVenousFlow },
          { text: "預防深層靜脈血栓", icon: indDvtPrevent },
          { text: "減緩靜脈淤滯", icon: indVenousStasis },
          { text: "靜脈淤滯性或糖尿病性腿部潰瘍", icon: indLegUlcer },
          { text: "慢性靜脈功能不全", icon: indCvi },
          { text: "減少下肢水腫", icon: indEdema },
        ],
        spec: {
          cert:
            "南市衛醫器廣字第 1150400008 號｜衛部醫器製字第 008496 號",
          deviceClass: "第二等級",
        },
        notes: [
          "通過家用醫療設備安全測試。",
          "通過醫電設備電性安全測試。",
          "通過醫用電氣設備電磁相容性測試。",
          "醫療器材應依專業人員指示使用，並請詳閱說明書。",
        ],
        channels: ["醫院／診所", "居家照護租賃方案"],
      },

      {
        slug: "ted",
        code: "TE · 01",
        name: "「康德樂」頂提醫用輔助襪",
        en: "\"Cardinal Health\" T.E.D. Anti-Embolism Stockings",
        tagline: "【美國進口】．醫用輔助襪",
        imageUrl: "/__l5e/assets-v1/d7766baf-c219-4c9e-b7bd-d14f9200b8fc/ted-1600.webp",
        imageSrcSet: "/__l5e/assets-v1/1aa411b1-204a-475a-8380-89650daabe19/ted-800.webp 800w, /__l5e/assets-v1/d7766baf-c219-4c9e-b7bd-d14f9200b8fc/ted-1600.webp 1600w",
        highlights: [
          "二級醫療等級抗血栓輔助襪，需於專業人員指示下使用",
          "短襪與長襪兩款，依使用情境與下肢長度選擇",
          "梯度壓力設計，協助下肢靜脈回流",
        ],
        spec: {
          cert: "衛署醫器輸字第 013703 號",
          deviceClass: "第二等級",
        },
        notes: [
          "請諮詢專業醫護人員後選擇合適尺寸與款式。",
          "請依使用說明正確穿著，並注意皮膚狀況。",
        ],
        tutorials: [
          { id: "_Tvz8HyNh60", title: "短襪穿著教學" },
          { id: "P9IosJk41ow", title: "長襪穿著教學" },
        ],
        channels: ["醫院／診所"],
      },
      {
        slug: "scd",
        code: "SC · 01",
        name: "「柯惠」連續加壓系統 Kendall SCD™ 700",
        en: "\"Covidien\" Kendall SCD 700 Sequential Compression System",
        tagline: "【美國進口】．臨床用順序性加壓系統。",
        imageUrl: "/__l5e/assets-v1/a059633e-8d15-4ee4-8a65-68580836c981/scd-700.webp",
        imageSrcSet: "/__l5e/assets-v1/a059633e-8d15-4ee4-8a65-68580836c981/scd-700.webp 800w, /__l5e/assets-v1/a059633e-8d15-4ee4-8a65-68580836c981/scd-700.webp 1600w",
        imageFit: "contain",
        intro:
          "本產品為美國進口之 Kendall SCD™ 700 順序間歇性加壓系統，專為醫療機構與院所環境設計的專業級間歇氣壓循環設備。機體採用高標準全自動壓力監控機制，搭配多段式順序加壓硬體設計，能提供規律、穩定且溫和的充氣與放氣循環。全機面板設計直覺直觀，操作簡單便利，由內而外提供符合醫院規格的硬體防護技術，輕鬆落實專業環境下的機能加壓管理。",
        highlights: [
          "醫療機構專用規格：本機型專為醫院及相關醫療機構環境設計，符合院所硬體防護標準與專業設備規範。",
          "間歇氣壓循環系統：採用間歇性充氣與放氣之全自動氣壓循環技術，提供穩定、規律的規律性加壓防護。",
          "順序性梯度調壓設計：具備多段式順序性加壓機能，能由下而上、循序漸進地調節各區段的加壓壓力。",
          "智慧型自動感應調節：內建智慧壓力監控偵測系統，能根據個體裝配狀態自動調節最適加壓範圍，確保運作安全性。",
          "高透氣低敏加壓套件：加壓套採用輕量化、高透氣、低敏性之特殊材質製成，質地親膚且不含任何動物來源材料。",
          "直覺式一鍵操作介面：機體面板設計清晰直覺，方便操作設定與即時監控系統運作狀態。",
        ],
        spec: {
          cert: "衛部醫器輸字第 036995 號",
          deviceClass: "第二等級",
        },
        notes: [
          "本產品僅供外用，且嚴禁由非經受訓之一般人員進行居家自主操作。",
          "請放置在孩童與非專業人員不易拿取的地方，並避免放置在陽光直射、潮濕或高溫環境。",
          "特殊體質、肌膚局部有發紅或破損現象，或目前正接受特定健康調理者，使用前必須經由專業醫藥人員評估。",
        ],
        channels: ["醫院／診所"],
        videos: [
          { id: "S1JNaQUn2T4", title: "Kendall SCD™ 700 產品介紹" },
          { id: "dVOJeMNaVA8", title: "Kendall SCD™ 700 操作示範" },
        ],
      },
    ],
  },
];

export const getMedicalCategory = (slug: string) =>
  medicalCategories.find((c) => c.slug === slug);

export const getMedicalProduct = (categorySlug: string, slug: string) => {
  const cat = getMedicalCategory(categorySlug);
  return cat?.products.find((p) => p.slug === slug);
};

export const MEDICAL_NOTE = HOSP_NOTE;
