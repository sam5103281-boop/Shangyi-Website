import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { FontSizeToggle } from "../components/FontSizeToggle";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow justify-center">404 · Not Found</p>
        <h1 className="mt-4 font-display text-4xl text-foreground">找不到頁面</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          您所瀏覽的頁面不存在，或已被移動。
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-foreground">頁面載入發生問題</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          請嘗試重新整理，或返回首頁。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            重新嘗試
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border-strong bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
          >
            返回首頁
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "上怡生醫醫藥有限公司 SHANG YI BIOPHARMA｜合規品質．鏈結臨床與居家照護" },
      {
        name: "description",
        content:
          "上怡生醫醫藥有限公司以符合國際法規之品質管理為核心，代理醫療器材、特殊機能保健品、德國舒護貼與眼部清淨綿，鏈結醫療院所與居家照護專業通路。",
      },
      { name: "author", content: "SHANG YI BIOPHARMA" },
      { name: "google-site-verification", content: "JbxdCIPCjyx13peqOPyHSA27IAU9j0zVYagINYB71SQ" },
      { property: "og:title", content: "上怡生醫醫藥有限公司 SHANG YI BIOPHARMA" },
      {
        property: "og:description",
        content: "以合規品質為核心，鏈結臨床與居家照護的生醫專家。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap",
      },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-7JQLXHB3NP",
        async: true,
      },
      {
        children: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-7JQLXHB3NP', { send_page_view: false });`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://shangyi-care.com/#organization",
              name: "上怡生醫醫藥有限公司",
              alternateName: "SHANG YI BIOPHARMA",
              url: "https://shangyi-care.com/",
              logo: "https://shangyi-care.com/favicon.png",
              description:
                "以合規品質為核心，代理醫療器材、特殊機能保健品、德國舒護貼與眼部清淨綿，鏈結醫療院所與居家照護專業通路。",
            },
            {
              "@type": "WebSite",
              "@id": "https://shangyi-care.com/#website",
              url: "https://shangyi-care.com/",
              name: "上怡生醫醫藥有限公司 SHANG YI BIOPHARMA",
              publisher: { "@id": "https://shangyi-care.com/#organization" },
              inLanguage: "zh-Hant",
            },
          ],
        }),
      },
    ],

  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const currentHref = useRouterState({ select: (state) => state.location.href });
  const isLoading = useRouterState({ select: (state) => state.status !== "idle" });
  const lastSentRef = useRef<string | null>(null);

  // 首次載入與每次 SPA 路由切換都發送完整網址，包含產品分類與產品詳情頁。
  // 等路由載入完成（loader 結束、head() 套用）後再送，避免詳情頁被記成上層頁面標題。
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isLoading) return;
    if (lastSentRef.current === currentHref) return;

    let tries = 0;
    let timer = 0;

    const send = () => {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag !== "function") {
        if (tries++ < 20) {
          timer = window.setTimeout(send, 150);
        }
        return;
      }

      lastSentRef.current = currentHref;
      gtag("event", "page_view", {
        page_path: window.location.pathname + window.location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    };

    timer = window.setTimeout(send, 120);

    return () => window.clearTimeout(timer);
  }, [currentHref, isLoading]);



  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <FontSizeToggle />
      </div>
    </QueryClientProvider>
  );
}
