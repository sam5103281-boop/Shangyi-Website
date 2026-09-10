export const SITE_URL = "https://www.shangyi-care.com";

/** Turn a site-relative asset path into an absolute https URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** og:image + twitter:image meta entries with an absolute https URL. */
export function socialImageMeta(path?: string | null) {
  if (!path) return [] as const;
  const url = absoluteUrl(path);
  return [
    { property: "og:image", content: url },
    { name: "twitter:image", content: url },
  ];
}
