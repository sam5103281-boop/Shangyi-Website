import { useEffect, useState } from "react";

type Scale = "small" | "medium" | "large";
const STORAGE_KEY = "shangyi-font-scale";
const OPTIONS: { value: Scale; label: string; aria: string }[] = [
  { value: "small", label: "小", aria: "小字級" },
  { value: "medium", label: "中", aria: "中字級（預設）" },
  { value: "large", label: "大", aria: "大字級" },
];

export function FontSizeToggle() {
  const [scale, setScale] = useState<Scale>("medium");

  useEffect(() => {
    const saved = (typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEY)
      : null) as Scale | null;
    if (saved && (saved === "small" || saved === "medium" || saved === "large")) {
      setScale(saved);
      document.documentElement.setAttribute("data-font-scale", saved);
    } else {
      document.documentElement.setAttribute("data-font-scale", "medium");
    }
  }, []);

  const apply = (value: Scale) => {
    setScale(value);
    document.documentElement.setAttribute("data-font-scale", value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex items-center gap-1 border border-hairline bg-background/95 px-2 py-1.5 shadow-soft backdrop-blur md:bottom-6 md:right-6"
      role="group"
      aria-label="文字大小調整"
    >
      <span className="hidden pr-1 text-xs text-muted-foreground sm:inline">
        字級
      </span>
      {OPTIONS.map((opt) => {
        const active = scale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => apply(opt.value)}
            aria-label={opt.aria}
            aria-pressed={active}
            className={`grid h-8 w-8 place-items-center font-display text-base transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-surface-muted"
            } ${opt.value === "small" ? "text-sm" : ""} ${
              opt.value === "large" ? "text-lg" : ""
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
