/**
 * GA4 event helpers. Reuses the single gtag instance initialised in __root.tsx
 * (Measurement ID G-7JQLXHB3NP). No second GA4 tag is created here.
 * On non-production hostnames gtag is never loaded, so every helper no-ops.
 */

type GtagFn = (...args: unknown[]) => void;

/** Max time we hold a navigation waiting for GA4 to acknowledge the hit. */
const NAV_EVENT_TIMEOUT_MS = 400;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

/** ?ga_debug=1 時才輸出（旗標由 __root.tsx 的 GA 初始化腳本設定）。 */
function gaLog(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (!(window as unknown as { __shangyiGaDebug?: boolean }).__shangyiGaDebug) return;
  console.log("[ga]", ...args);
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = getGtag();
  if (!gtag) return;
  gaLog("custom event", name, params);
  gtag("event", name, {
    page_path:
      typeof window !== "undefined"
        ? window.location.pathname
        : undefined,
    ...params,
  });
}

/**
 * Send an event and run `onDone` once GA4 confirms delivery (event_callback),
 * or after NAV_EVENT_TIMEOUT_MS at the latest. Used for clicks that leave the
 * page, so the hit is not dropped — and the user is never blocked for long.
 */
function trackEventThen(
  name: string,
  params: Record<string, unknown>,
  onDone: () => void,
) {
  const gtag = getGtag();
  if (!gtag) {
    onDone();
    return;
  }

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    onDone();
  };

  gtag("event", name, {
    page_path: window.location.pathname,
    ...params,
    transport_type: "beacon",
    event_callback: finish,
    event_timeout: NAV_EVENT_TIMEOUT_MS,
  });

  window.setTimeout(finish, NAV_EVENT_TIMEOUT_MS);
}

const INQUIRY_SOURCE_KEY = "shangyi_inquiry_source";
const MAX_TEXT = 100;

function cleanText(s: string | null | undefined): string {
  return (s ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_TEXT);
}

function pageContext() {
  return { page_location: window.location.href, page_title: document.title };
}

/** tel:/mailto: → protocol + target only (no query). Others: href as-is. */
function sanitizeLinkUrl(href: string): string {
  if (/^(tel|mailto):/i.test(href)) return href.split("?")[0].split("#")[0];
  return href;
}

type InquirySource = { product_name: string; product_category: string; source_page: string };

function readInquirySource(): InquirySource | null {
  try {
    const raw = window.sessionStorage.getItem(INQUIRY_SOURCE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<InquirySource>;
    if (!v.product_name) return null;
    return {
      product_name: String(v.product_name),
      product_category: String(v.product_category ?? ""),
      source_page: String(v.source_page ?? ""),
    };
  } catch {
    return null;
  }
}

/** Call only after the server confirmed success. Sends no form content. */
export function trackGenerateLead(formName: string) {
  if (typeof window === "undefined") return;
  const source = readInquirySource();
  trackEvent("generate_lead", { form_name: formName, ...(source ?? {}) });
  try {
    window.sessionStorage.removeItem(INQUIRY_SOURCE_KEY);
  } catch {
    /* ignore */
  }
}

export function trackProductInquiry(
  productName: string,
  productCategory: string,
  link?: HTMLAnchorElement | null,
) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      INQUIRY_SOURCE_KEY,
      JSON.stringify({
        product_name: productName,
        product_category: productCategory,
        source_page: window.location.pathname,
      }),
    );
  } catch {
    /* ignore */
  }
  // In-app (SPA) navigation: no unload, so no callback gating needed.
  trackEvent("product_inquiry", {
    product_name: productName,
    product_category: productCategory,
    link_url: link ? link.href : undefined,
    link_text: cleanText(link?.textContent),
    ...pageContext(),
  });
}

function classifyLink(href: string): { event: string; params: Record<string, unknown> } | null {
  if (href.startsWith("tel:")) return { event: "click_phone", params: {} };
  if (href.startsWith("mailto:")) return { event: "click_email", params: {} };
  if (/^https?:\/\/(www\.)?(line\.me|lin\.ee)\//i.test(href))
    return { event: "click_line", params: {} };
  return null;
}

/**
 * Document-level delegated listener for tel: / mailto: / LINE links.
 * Installed once; survives SPA route changes. Returns a cleanup fn.
 */
export function installContactLinkTracking(): () => void {
  if (typeof document === "undefined") return () => {};
  const w = window as unknown as { __shangyiContactTracking?: boolean };
  if (w.__shangyiContactTracking) return () => {};
  w.__shangyiContactTracking = true;

  const onClick = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    const hit = classifyLink(href);
    if (!hit) return;
    hit.params = {
      link_url: sanitizeLinkUrl(href),
      link_text: cleanText(link.textContent || link.getAttribute("aria-label")),
      ...pageContext(),
    };

    // Modified clicks / new-tab links do not unload this page: fire and forget.
    const opensElsewhere =
      link.target === "_blank" ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0;
    if (opensElsewhere) {
      trackEvent(hit.event, hit.params);
      return;
    }

    if (e.defaultPrevented) return;

    // Hold the navigation until GA4 acknowledges, or the short timeout fires.
    e.preventDefault();
    trackEventThen(hit.event, hit.params, () => {
      window.location.href = link.href;
    });
  };

  document.addEventListener("click", onClick, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    w.__shangyiContactTracking = false;
  };
}
