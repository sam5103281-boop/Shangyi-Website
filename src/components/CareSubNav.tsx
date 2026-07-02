import { Link } from "@tanstack/react-router";

const items = [
  { to: "/care", label: "總覽", en: "Overview" },
  { to: "/care/professional", label: "專業照護", en: "Professional" },
  { to: "/care/faq", label: "衛教 Q&A", en: "Education Q&A" },
  { to: "/care/referral", label: "轉介流程", en: "Referral" },
] as const;


export function CareSubNav() {
  return (
    <nav className="border-b border-hairline bg-background">
      <div className="container-page flex gap-x-8 overflow-x-auto whitespace-nowrap py-4">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/care" }}

            className="group flex flex-col text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-primary" }}
          >
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground/70 group-hover:text-accent">
              {item.en}
            </span>
            <span className="mt-1 font-medium tracking-wide">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
