// 將「第一/二/三等級」轉成「第X等級醫療器材」
export function formatDeviceClass(value?: string): string | null {
  if (!value) return null;
  const map: Record<string, string> = {
    第一等級: "第一等級醫療器材",
    第二等級: "第二等級醫療器材",
    第三等級: "第三等級醫療器材",
  };
  for (const k of Object.keys(map)) {
    if (value.includes(k)) return map[k];
  }
  return value;
}

// 過濾掉廣告字號（含「廣字」），僅保留產品許可字號
export function formatCert(value?: string): string | null {
  if (!value) return null;
  const parts = value
    .split(/[｜|]/)
    .map((s) => s.trim())
    .filter((s) => s && !s.includes("廣字"));
  return parts.length ? parts.join("｜") : null;
}
