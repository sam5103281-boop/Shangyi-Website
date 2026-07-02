import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/shangyi-logo.png.asset.json";

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
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-24 items-center justify-between gap-8 py-3 md:h-28">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logoAsset.url}
            alt="上怡生技 ShangYi Biotech"
            className="h-14 w-auto md:h-16 lg:h-[72px]"
          />
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-x-8 overflow-x-auto whitespace-nowrap lg:gap-x-12">
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
      </div>

    </header>
  );
}
