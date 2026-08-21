import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, BookOpen, Building2, FileText, Heart } from "lucide-react";
import { submitContactForm } from "@/lib/contact.functions";

type ContactTopic = "b2b" | "spec" | "comwell";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { topic?: ContactTopic } => {
    const t = search.topic;
    return t === "b2b" || t === "spec" || t === "comwell" ? { topic: t } : {};
  },
  head: () => ({
    meta: [
      { property: "og:url", content: "https://www.shangyi-care.com/contact" },
      { title: "聯絡我們｜上怡生醫" },
      {
        name: "description",
        content:
          "上怡生醫聯絡窗口：提供醫療機構與經銷通路 B2B 合作洽詢、產品規格與型錄索取，以及康威爾 Comwell 間歇性氣動加壓器等居家照護產品的使用諮詢與售後服務。",
      },
      { property: "og:title", content: "聯絡我們｜上怡生醫" },
      {
        property: "og:description",
        content:
          "醫療機構合作、經銷通路洽詢、產品規格索取與居家照護使用諮詢，B2B / B2C 精準分流的專業服務窗口。",
      },

    ],
    links: [{ rel: "canonical", href: "https://www.shangyi-care.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          name: "上怡生技醫藥有限公司",
          alternateName: "SHANG YI BIOPHARMA",
          url: "https://www.shangyi-care.com/contact",
          telephone: "+886-6-222-0070",
          faxNumber: "+886-6-222-0050",
          email: "shangyi@shangyi-care.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "國華街一段98號",
            addressLocality: "南區",
            addressRegion: "臺南市",
            addressCountry: "TW",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
        }),
      },
    ],
  }),

  component: ContactPage,
});

const topics = [
  { v: "b2b", label: "醫療機構與通路合作洽談", icon: Building2, route: "B2B 合作團隊" },
  { v: "spec", label: "產品規格與專業資料索取", icon: FileText, route: "業務 / 客服窗口" },
  { v: "comwell", label: "康威爾 Comwell 居家照護諮詢與評估", icon: Heart, route: "居家照護專員" },
];

function ContactPage() {
  const { topic: initialTopic } = Route.useSearch();
  const [topic, setTopic] = useState<string>(initialTopic ?? "b2b");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const sendContact = useServerFn(submitContactForm);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) {
      setError("請先勾選同意隱私權保護政策");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await sendContact({
        data: {
          topic: topic as ContactTopic,
          name: String(formData.get("name") ?? ""),
          org: String(formData.get("org") ?? ""),
          title: String(formData.get("title") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        },
      });
      setSent(true);
      form.reset();
      setAgreed(false);
      // Allow another submission after a short confirmation window.
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失敗，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <>
      <section className="border-b border-hairline bg-surface-muted">
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">
            <span className="inline-block h-px w-6 bg-accent" />
            Contact
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">
            精準分流的專業諮詢窗口
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground lg:whitespace-nowrap">
            為讓您的需求能由最適合的團隊回覆，請於下方選擇對應的諮詢類別，我們將於 1 – 2 個工作日內回覆。
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="grid gap-px bg-hairline md:grid-cols-3">
              {topics.map((t) => {
                const Icon = t.icon;
                const active = topic === t.v;
                return (
                  <button
                    key={t.v}
                    type="button"
                    onClick={() => setTopic(t.v)}
                    className={`flex flex-col items-start gap-3 p-5 text-left transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface text-foreground hover:bg-surface-muted"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium leading-snug">{t.label}</span>
                    <span
                      className={`text-[11px] tracking-wider ${
                        active ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      轉介至：{t.route}
                    </span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={onSubmit} className="mt-10 grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="姓名" name="name" required />
                <Field label="單位 / 機構" name="org" />
                <Field label="職稱" name="title" />
                <Field label="聯絡電話" name="phone" required />
                <div className="md:col-span-2">
                  <Field label="電子郵件" name="email" type="email" required />
                </div>
              </div>

              <label className="grid gap-2">
                <span className="text-xs font-medium tracking-wider text-foreground">
                  諮詢內容 <span className="text-destructive">*</span>
                </span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="請簡述您的需求，例如：產品規格、適應症、合作模式或評估時間。"
                  className="border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                />
              </label>

              <label className="flex items-start gap-3 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-[var(--color-accent)]"
                />
                我已了解所提供之個人資料將僅用於本次諮詢回覆，並同意上怡生醫之隱私權保護政策。
              </label>


              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sent || isSubmitting || !agreed}
                aria-disabled={!agreed}
                className={`group inline-flex items-center justify-center gap-2 self-start px-6 py-3 text-sm font-medium tracking-wider transition-colors ${
                  !agreed
                    ? "bg-surface-muted text-muted-foreground cursor-not-allowed border border-hairline"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                } disabled:opacity-60`}
              >
                {sent ? "已送出，感謝您的聯繫" : isSubmitting ? "送出中..." : "送出諮詢"}
                {!sent && !isSubmitting && agreed && (
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </button>
            </form>

            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
              ※ 本表單僅作為上怡生醫之合作、產品與居家照護諮詢用途。
              所有醫療器材使用前，請先洽詢專業醫療人員之建議。
            </p>
          </div>

          {/* Info */}
          <aside className="space-y-6 lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-hairline bg-gradient-to-br from-surface to-muted/30 p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
              <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
              <a
                href="https://www.muxin-care.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="前往學術資源"
                className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full bg-primary p-2.5 text-primary-foreground transition-all duration-300 ease-out hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:right-5 sm:top-5"
              >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="flex items-start gap-4 pr-12 sm:gap-5 sm:pr-14">
                <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Academic Resources
                  </span>
                  <h4 className="mt-1 font-display text-lg text-foreground">學術資源</h4>
                  <p className="mt-3 text-sm font-medium leading-relaxed tracking-wide text-foreground">
                    研究文獻與延伸閱讀
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    提供相關臨床研究、期刊文獻與外部學術資料連結。
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-hairline bg-surface-muted p-8">
              <h3 className="font-display text-xl text-foreground">公司聯絡資訊</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                SHANG YI BIOPHARMA
              </p>
              <dl className="mt-6 space-y-5 text-sm">
                <Row k="公司名稱" v="上怡生技醫藥有限公司" />
                <Row k="公司地址" v="臺南市南區新昌里國華街一段 98 號" />
                <Row k="電話" v="06-222-0070" />
                <Row k="傳真" v="06-222-0050" />
                <Row k="免付費" v="0800-222-215" />
                <Row k="Email" v="shangyi@shangyi-care.com" />
                <Row k="服務時間" v="週一至週五 09:00 – 18:00" />
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-medium tracking-wider text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
      <dd className="col-span-2 text-foreground">{v}</dd>
    </div>
  );
}
