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
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { FontSizeToggle } from "../components/FontSizeToggle";
import { installContactLinkTracking } from "../lib/analytics";

/**
 * GA4 初始化：直接輸出在 <head>，於 HTML 解析初期同步執行。
 * 順序：debug 旗標 → internal 旗標 → dataLayer/gtag → traffic_type
 *      → gtag('js') → config(send_page_view:false) → 首次 page_view → 清理參數 → 載入 gtag.js
 */
const GA_INIT_SCRIPT = `(function(){
  var GA_ID = 'G-7JQLXHB3NP';
  var PROD_HOST = 'www.shangyi-care.com';
  var params;
  try { params = new URLSearchParams(window.location.search); } catch (e) { params = null; }

  // 0) 診斷模式：?ga_debug=1（僅 console.log，不進 GA4）
  var debug = false;
  try { debug = !!params && params.get('ga_debug') === '1'; } catch (e) {}
  window.__shangyiGaDebug = debug;
  function log(){ if (!window.__shangyiGaDebug) return; try { console.log.apply(console, ['[ga]'].concat([].slice.call(arguments))); } catch (e) {} }

  // 1) 內部流量旗標：?internal=1 / 0
  var isInternal = false;
  try {
    if (params && params.get('internal') === '1') {
      window.localStorage.setItem('shangyi_internal_user', 'true');
    } else if (params && params.get('internal') === '0') {
      window.localStorage.removeItem('shangyi_internal_user');
    }
    isInternal = window.localStorage.getItem('shangyi_internal_user') === 'true';
  } catch (e) {}

  // 送往 GA4 的網址：移除 internal / ga_debug，完整保留 utm_*、gclid 等其他參數
  function cleanUrl(){
    try {
      var q = new URLSearchParams(window.location.search);
      q.delete('internal');
      q.delete('ga_debug');
      var qs = q.toString();
      return window.location.origin + window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    } catch (e) { return window.location.href; }
  }
  function stripTrackingParams(){
    try {
      var q = new URLSearchParams(window.location.search);
      if (!q.has('internal') && !q.has('ga_debug')) return;
      q.delete('internal');
      q.delete('ga_debug');
      var qs = q.toString();
      window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
    } catch (e) {}
  }

  log('init', { time: Date.now(), hostname: window.location.hostname, traffic_type: isInternal ? 'internal' : 'external' });

  // 2) 只在正式網域載入正式 GA4 Property
  if (window.location.hostname !== PROD_HOST) {
    log('skip: non-production hostname');
    stripTrackingParams();
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  if (isInternal) { gtag('set', { traffic_type: 'internal' }); }

  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false });

  // 3) 首次 page_view：在清除 internal / ga_debug 之前取得網址與 referrer
  var initialLocation = cleanUrl();
  var initialReferrer = document.referrer || undefined;
  gtag('event', 'page_view', {
    page_location: initialLocation,
    page_referrer: initialReferrer,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title
  });
  window.__shangyiInitialPageViewSent = true;
  window.__shangyiLastPageViewHref = initialLocation;
  log('initial page_view queued', { time: Date.now(), page_location: initialLocation, page_referrer: initialReferrer });

  // 4) 送出後才清理參數
  stripTrackingParams();

  // 5) bfcache 還原：僅 persisted 才補送，且以網址去重，避免與一般載入重複
  window.addEventListener('pageshow', function (event) {
    log('pageshow', { persisted: event.persisted });
    if (!event.persisted) return;
    var href = cleanUrl();
    if (window.__shangyiLastPageViewHref === href && window.__shangyiLastPageViewFromBfcache === href) return;
    window.__shangyiLastPageViewHref = href;
    window.__shangyiLastPageViewFromBfcache = href;
    gtag('event', 'page_view', {
      page_location: href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title
    });
    log('bfcache page_view sent', { page_location: href });
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
})();`;

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
      { title: "上怡生技醫藥有限公司 SHANG YI BIOPHARMA｜合規品質．鏈結臨床與居家照護" },
      {
        name: "description",
        content:
          "上怡生技醫藥有限公司以符合國際法規之品質管理為核心，代理醫療器材、特殊機能保健品、德國舒護貼與眼部清淨綿，鏈結醫療院所與居家照護專業通路。",
      },
      { name: "author", content: "SHANG YI BIOPHARMA" },
      { name: "google-site-verification", content: "JbxdCIPCjyx13peqOPyHSA27IAU9j0zVYagINYB71SQ" },
      { property: "og:title", content: "上怡生技醫藥有限公司 SHANG YI BIOPHARMA" },
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
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.shangyi-care.com/#organization",
              name: "上怡生技醫藥有限公司",
              alternateName: "SHANG YI BIOPHARMA",
              url: "https://www.shangyi-care.com/",
              logo: "https://www.shangyi-care.com/favicon.png",
              description:
                "以合規品質為核心，代理醫療器材、特殊機能保健品、德國舒護貼與眼部清淨綿，鏈結醫療院所與居家照護專業通路。",
            },
            {
              "@type": "WebSite",
              "@id": "https://www.shangyi-care.com/#website",
              url: "https://www.shangyi-care.com/",
              name: "上怡生技醫藥有限公司 SHANG YI BIOPHARMA",
              publisher: { "@id": "https://www.shangyi-care.com/#organization" },
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
        <script dangerouslySetInnerHTML={{ __html: GA_INIT_SCRIPT }} />
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
  const initialSkippedRef = useRef(false);

  // 全站委派監聽 tel: / mailto: / LINE 連結，SPA 換頁後仍有效，且只安裝一次。
  useEffect(() => installContactLinkTracking(), []);

  // 首次 page_view 已由 head 內嵌腳本於 GA4 初始化後立即送出，
  // 這裡只負責 SPA 路由切換，並避免首次 mount 重複送出。
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isLoading) return;

    if (!initialSkippedRef.current) {
      initialSkippedRef.current = true;
      if ((window as unknown as { __shangyiInitialPageViewSent?: boolean }).__shangyiInitialPageViewSent) {
        lastSentRef.current = currentHref;
        return;
      }
    }

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
      const w = window as unknown as {
        __shangyiLastPageViewHref?: string;
        __shangyiLastPageViewFromBfcache?: string;
        __shangyiGaDebug?: boolean;
      };
      w.__shangyiLastPageViewHref = window.location.href;
      w.__shangyiLastPageViewFromBfcache = undefined;
      gtag("event", "page_view", {
        page_path: window.location.pathname + window.location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
      if (w.__shangyiGaDebug) {
        console.log("[ga] SPA page_view", { page_location: window.location.href });
      }
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
