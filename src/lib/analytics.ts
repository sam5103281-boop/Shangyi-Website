/**
 * GA4 event helpers. Reuses the existing gtag instance loaded in __root.tsx
 * (Measurement ID G-7JQLXHB3NP). No second GA4 tag is created here.
 */

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", name, {
    page_path:
      typeof window !== "undefined"
        ? window.location.pathname
        : undefined,
    ...params,
  });
}

export function trackGenerateLead(formName: string) {
  trackEvent("generate_lead", { form_name: formName });
}

export function trackProductInquiry(productName: string) {
  trackEvent("product_inquiry", { product_name: productName });
}

/**
 * Document-level delegated listener for tel: / mailto: links.
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
    if (href.startsWith("tel:")) trackEvent("click_phone");
    else if (href.startsWith("mailto:")) trackEvent("click_email");
  };

  document.addEventListener("click", onClick, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    w.__shangyiContactTracking = false;
  };
}
