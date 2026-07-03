import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import cover from "@/assets/compression-socks.png.asset.json";
import pressureImg from "@/assets/sock-pressure-gradient.png.asset.json";
import circulationImg from "@/assets/sock-circulation.png.asset.json";
import sockBlack from "@/assets/sock-black.png.asset.json";
import sockWhite from "@/assets/sock-white.png.asset.json";

const ACCENT = "#2c8a9e";
const ACCENT_SOFT = "#e6f2f4";

export const Route = createFileRoute("/education/device/compression-sock-faq")({
  head: () => ({
    meta: [
      { title: "醫用輔助襪常見問題｜醫療保健專欄｜上怡生技" },
      {
        name: "description",
        content:
          "醫用輔助襪的壓力單位、漸進式壓力分佈原理、與一般彈性襪的差異，以及為什麼下肢循環會被稱為人體第二個心臟。整理使用前必懂的三大常見問題。",
      },
      { property: "og:title", content: "醫用輔助襪常見問題" },
      {
        property: "og:description",
        content: "從壓力單位、循環原理到產品差異，整理醫用輔助襪挑選與使用的關鍵觀念。",
      },
      { property: "og:image", content: cover.url },
      { name: "twitter:image", content: cover.url },
    ],
  }),
  component: ArticlePage,
});

type FaqImage = { src: string; alt: string };

const faqs: Array<{
  eyebrow: string;
  title: string;
  paragraphs: string[];
  callout?: string;
  images: FaqImage[];
}> = [
  {
    eyebrow: "PRESSURE PROFILE // 01",
    title: "壓力襪單位是丹尼數？還是毫米汞柱呢？",
    paragraphs: [
      "丹尼（Den）數代表「紡織品密度」，是每固定單位內纖維材質的重量，也就是「均壓」。",
      "醫用輔助襪則是以壓力等級來區分，壓力的單位為毫米汞柱（mmHg），利用肌肉收縮循環原理，依據腿部不同位置給予不同的壓力點，以腳踝為基點，壓力往上遞減，是「漸進式」地給予靜脈適當壓力，使血液循環較順暢，順利回流至心臟。",
    ],
    callout: "丹尼數 ≠ 壓力值。消費者常以丹尼數大小選擇壓力襪，以為丹尼數越大效果越好，其實是錯誤觀念！",
    images: [{ src: pressureImg.url, alt: "漸進式壓力分佈圖" }],
  },
  {
    eyebrow: "CIRCULATORY DYNAMICS // 02",
    title: "為什麼常聽醫師說腳的血液循環很重要？",
    paragraphs: [
      "腳是人體的第二個心臟。",
      "心臟將血液打送到全身各處，當離心臟最遠的腿部血液要回流至心臟時，需藉著腿部肌肉與周邊血管收縮，擠壓下肢靜脈裡的血液回流。因此若腳部的微血管顧好了，身體其他部位的血液循環也會跟著改善。",
    ],
    callout: "若腿部症狀嚴重，請盡速就醫，聽從醫師指示。",
    images: [{ src: circulationImg.url, alt: "下肢血液循環示意圖" }],
  },
  {
    eyebrow: "CLINICAL SPECIFICATION // 03",
    title: "醫用輔助襪與一般棉彈性襪有什麼不同？",
    paragraphs: [
      "醫用輔助襪由彈性物質製成，可對腿部施以適當壓力，用以防止腿部血液蓄積。",
      "與一般棉彈性襪不同，醫用輔助襪採用漸進式壓力設計，並通過醫療法規檢驗，需依醫師或專業人員建議選擇壓力等級與尺寸。",
    ],
    images: [
      { src: sockBlack.url, alt: "黑色醫用輔助襪" },
      { src: sockWhite.url, alt: "白色醫用輔助襪" },
    ],
  },
];

function ArticlePage() {
  return (
    <article>
      <section className="border-b border-hairline">
        <div className="container-page py-14 md:py-20">
          <nav className="mb-6 text-xs tracking-[0.18em] text-muted-foreground">
            <Link to="/education" className="hover:text-accent">醫療保健專欄</Link>
            <span className="mx-2">/</span>
            <Link to="/education" hash="device" className="hover:text-accent">醫療輔具使用</Link>
          </nav>
          <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr]">
            <Reveal direction="up" className="min-w-0">
              <span
                className="inline-block border px-4 py-1 text-sm font-medium"
                style={{ color: ACCENT, borderColor: ACCENT }}
              >
                醫用輔具知識
              </span>
              <h1 className="mt-6 font-display text-3xl leading-tight text-[#1f2c3a] md:text-[42px]">
                醫用輔助襪常見問題
              </h1>
              <p
                className="mt-7 border-l-[3px] pl-5 text-base leading-relaxed text-[#475569] md:text-lg"
                style={{ borderColor: ACCENT }}
              >
                從壓力單位、循環原理到產品差異，整理選購與使用醫用輔助襪前
                必須先了解的關鍵觀念，避免買錯、穿錯，得不到應有效果。
              </p>
            </Reveal>
            <Reveal
              direction="left"
              delay={60}
              className="overflow-hidden rounded-tl-[4px] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[4px] transition-transform duration-700 ease-out hover:-translate-y-1"
              style={{ boxShadow: `15px 15px 0px ${ACCENT_SOFT}` }}
            >
              <img src={cover.url} alt="醫用輔助襪" className="block h-auto w-full transition-transform duration-[1200ms] ease-out hover:scale-[1.03]" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#fafafa]">
        <div className="container-page space-y-10">
          {faqs.map((f, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <Reveal key={f.title} direction="up" className="border border-hairline bg-background p-8 md:p-10 transition-shadow duration-500 hover:shadow-lg">
                <p className="text-xs tracking-[0.22em]" style={{ color: ACCENT }}>{f.eyebrow}</p>
                <h2 className="mt-3 font-display text-2xl text-[#1f2c3a] md:text-[28px]">{f.title}</h2>
                <div className={`mt-6 gap-8 ${f.images.length > 1 ? "grid items-center md:grid-cols-[1fr_1.5fr]" : "grid items-center md:grid-cols-[1.1fr_1fr]"} ${f.images.length > 1 ? "" : reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div>
                    <div className="space-y-4 text-[15.5px] leading-relaxed text-[#475569]">
                      {f.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    {f.callout && (
                      <div
                        className="mt-6 border-l-[3px] py-2 pl-5 text-[15px] leading-relaxed text-[#1f2c3a]"
                        style={{ borderColor: ACCENT, background: ACCENT_SOFT }}
                      >
                        {f.callout}
                      </div>
                    )}
                  </div>
                  <div className="grid gap-8">
                    {f.images.map((img) => (
                      <div
                        key={img.src}
                        className="flex items-center justify-center"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className={`block h-auto w-full object-contain ${f.images.length > 1 ? "max-h-[300px]" : ""}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}


          <Reveal direction="up" className="border-l-[3px] pl-5 text-sm leading-relaxed text-[#475569]" style={{ borderColor: ACCENT }}>
            本文為一般衛教資訊，不能取代醫師之診斷與治療。若有腿部症狀，請尋求專業醫療人員協助。
          </Reveal>
        </div>
      </section>
    </article>
  );
}
