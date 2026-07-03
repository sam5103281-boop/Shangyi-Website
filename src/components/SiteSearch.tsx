import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Entry = {
  title: string;
  group: string;
  keywords?: string;
  to: string;
  hash?: string;
};

const entries: Entry[] = [
  // 主要頁面
  { group: "主要頁面", title: "首頁", to: "/", keywords: "home index" },
  { group: "主要頁面", title: "關於上怡", to: "/about", keywords: "about company" },
  { group: "主要頁面", title: "產品中心", to: "/products", keywords: "products" },
  { group: "主要頁面", title: "醫療保健專欄", to: "/education", keywords: "education column" },
  { group: "主要頁面", title: "下肢循環照護", to: "/care", keywords: "care circulation" },
  { group: "主要頁面", title: "專業通路", to: "/channels", keywords: "channels" },
  { group: "主要頁面", title: "聯絡我們", to: "/contact", keywords: "contact" },

  // 下肢循環照護
  { group: "下肢循環照護", title: "總覽", to: "/care", keywords: "overview" },
  { group: "下肢循環照護", title: "專業照護", to: "/care/professional", keywords: "professional" },
  { group: "下肢循環照護", title: "衛教 Q&A", to: "/care/faq", keywords: "faq education" },
  { group: "下肢循環照護", title: "轉介流程", to: "/care/referral", keywords: "referral" },

  // 衛教專欄章節
  { group: "衛教專欄", title: "產後照護", to: "/education", hash: "postpartum", keywords: "postpartum" },
  { group: "衛教專欄", title: "下肢循環與靜脈", to: "/education", hash: "circulation", keywords: "circulation veins" },
  { group: "衛教專欄", title: "糖尿病併發", to: "/education", hash: "diabetes", keywords: "diabetes" },
  { group: "衛教專欄", title: "醫療輔具使用", to: "/education", hash: "device", keywords: "device" },

  // 衛教文章
  {
    group: "衛教文章",
    title: "產後肺栓塞預防",
    to: "/education/postpartum/pe-prevention",
    keywords: "pe pulmonary embolism postpartum",
  },
  {
    group: "衛教文章",
    title: "深層靜脈栓塞與肺栓塞症狀",
    to: "/education/circulation/dvt-pe-symptoms",
    keywords: "dvt pe symptoms",
  },
  {
    group: "衛教文章",
    title: "腿部靜脈保養與照護",
    to: "/education/circulation/leg-vein-care",
    keywords: "leg vein care",
  },
  {
    group: "衛教文章",
    title: "糖尿病恐併發眼睛病變",
    to: "/education/diabetes/eye-complications",
    keywords: "diabetes eye",
  },
  {
    group: "衛教文章",
    title: "糖尿病併發症風險",
    to: "/education/diabetes/complication-risks",
    keywords: "diabetes complications",
  },
  {
    group: "衛教文章",
    title: "醫用輔助襪常見問題",
    to: "/education/device/compression-sock-faq",
    keywords: "compression sock faq",
  },
];

export function SiteSearch({
  className,
  label = "搜尋",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const groups = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const e of entries) {
      const list = map.get(e.group) ?? [];
      list.push(e);
      map.set(e.group, list);
    }
    return Array.from(map.entries());
  }, []);

  const go = (e: Entry) => {
    setOpen(false);
    navigate({ to: e.to, hash: e.hash }).then(() => {
      if (e.hash) {
        // ensure scroll to section after navigation
        requestAnimationFrame(() => {
          document.getElementById(e.hash!)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    });
  };

  return (
    <>
      <button
        type="button"
        aria-label="開啟搜尋"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-hairline bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground",
          className,
        )}
      >
        <Search className="h-4 w-4" />
        <span>{label}</span>
        <kbd className="ml-2 hidden rounded border border-hairline bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜尋頁面或章節…" />
        <CommandList>
          <CommandEmpty>找不到相符的結果</CommandEmpty>
          {groups.map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((e) => (
                <CommandItem
                  key={`${e.group}-${e.title}-${e.to}${e.hash ?? ""}`}
                  value={`${e.group} ${e.title} ${e.keywords ?? ""} ${e.to}`}
                  onSelect={() => go(e)}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>{e.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {e.to}
                    {e.hash ? `#${e.hash}` : ""}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
