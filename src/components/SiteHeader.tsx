import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import logoAsset from "@/assets/shangyi-logo.png.asset.json";
import { SiteSearch } from "@/components/SiteSearch";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "首頁" },
  { to: "/about", label: "關於上怡" },
  { to: "/products", label: "產品中心" },
  { to: "/education", label: "醫療保健專欄" },
  { to: "/care", label: "下肢循環照護" },
  { to: "/channels", label: "專業通路" },
  { to: "/contact", label: "聯絡我們" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between gap-8 py-3 lg:h-28">
        <Link to="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="上怡生技 ShangYi Biotech"
            className="h-12 w-auto lg:h-[72px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-end gap-x-6 whitespace-nowrap lg:gap-x-12">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-base tracking-wide text-muted-foreground transition-colors hover:text-primary lg:text-[17px]"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile / tablet toggle */}
        <button
          type="button"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-surface-muted"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile / tablet drawer */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-hairline bg-background transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-page flex flex-col py-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-hairline py-4 text-base text-muted-foreground transition-colors hover:text-primary last:border-b-0"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
