import { useEffect, useRef, useState } from "react";

type Item = { y: string; h: string; t: string };

export function MilestonesGrid({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [yearShown, setYearShown] = useState(-1);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const timers: number[] = [];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            // start curve drawing immediately
            timers.push(window.setTimeout(() => setDrawn(true), 100));
            // years emerge in sync with the curve advancing (~2200ms total)
            items.forEach((_, i) => {
              timers.push(
                window.setTimeout(() => setYearShown(i), 250 + i * 420),
              );
            });
            items.forEach((_, i) => {
              timers.push(window.setTimeout(() => setActive(i), 350 + i * 260));
            });
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [items.length]);


  return (
    <div ref={ref} className="relative mt-12">
      {/* Flowing growth curve (desktop only) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 -top-6 hidden h-[260px] w-full lg:block"
      >
        <defs>
          <linearGradient id="ms-curve" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* faint guide */}
        <path
          d="M 0 170 C 180 170, 220 60, 400 90 S 720 200, 1000 40"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeOpacity="0.08"
          strokeWidth="2"
        />
        {/* animated drawing line */}
        <path
          d="M 0 170 C 180 170, 220 60, 400 90 S 720 200, 1000 40"
          fill="none"
          stroke="url(#ms-curve)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2400,
            strokeDashoffset: drawn ? 0 : 2400,
            transition: "stroke-dashoffset 2200ms cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        />
        {/* trailing arrowhead */}
        <circle
          cx="1000"
          cy="40"
          r="4"
          fill="hsl(var(--accent))"
          style={{
            opacity: drawn ? 1 : 0,
            transition: "opacity 600ms ease 2000ms",
          }}
        />
      </svg>

      {/* Mobile: flowing vertical timeline */}
      <ol className="relative md:hidden">
        {/* vertical growing path */}
        <span
          aria-hidden
          className="absolute left-4 top-2 w-[2px] rounded-full bg-gradient-to-b from-accent/20 via-accent/60 to-accent origin-top"
          style={{
            bottom: 8,
            transform: drawn ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 2000ms cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        />
        {items.map((m, idx) => {
          const shown = idx <= active;
          const isLast = idx === items.length - 1;
          return (
            <li key={m.y} className="relative pb-10 pl-12 last:pb-0">
              {/* node dot */}
              <span
                aria-hidden
                className={`absolute left-[9px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-accent/10 transition-all duration-500 ${
                  isLast
                    ? "bg-accent animate-pulse"
                    : "border-2 border-accent bg-surface"
                }`}
                style={{
                  opacity: idx <= yearShown ? 1 : 0,
                  transform: idx <= yearShown ? "scale(1)" : "scale(0.4)",
                }}
              />
              <div
                className={isLast ? "rounded-xl border border-accent/20 bg-surface p-4 shadow-sm shadow-accent/10" : ""}
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <span
                  className="block font-display text-xs font-bold uppercase tracking-widest text-accent"
                  style={{
                    opacity: idx <= yearShown ? 1 : 0,
                    transform:
                      idx <= yearShown ? "translateY(0)" : "translateY(8px)",
                    transition: "all 600ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {m.y}
                </span>
                <span className="mt-1 block font-display text-base font-bold text-foreground">
                  {m.h}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                  {m.t}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: original 5-column grid */}
      <ol className="relative hidden gap-px bg-hairline md:grid md:grid-cols-5">
        {items.map((m, idx) => {
          const shown = idx <= active;
          return (
            <li
              key={m.y}
              className="group relative flex flex-col gap-3 bg-surface p-6 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px] hover:shadow-accent/40"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown
                  ? "translateY(0) scale(1)"
                  : `translateY(${28 + (idx % 2) * 6}px) scale(0.96)`,
                transitionProperty: "opacity, transform, box-shadow",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDuration: "900ms",
              }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-[2px] bg-accent transition-all duration-700 ease-out"
                style={{
                  width: shown ? "100%" : "0%",
                  transitionDelay: shown ? "120ms" : "0ms",
                }}
              />
              <span className="font-display text-2xl text-accent">
                <span
                  className="inline-block"
                  style={{
                    opacity: idx <= yearShown ? 1 : 0,
                    transform:
                      idx <= yearShown
                        ? "translateY(0) scale(1)"
                        : "translateY(14px) scale(0.85)",
                    filter: idx <= yearShown ? "blur(0)" : "blur(4px)",
                    transition:
                      "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1), filter 700ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {m.y}
                </span>
              </span>

              <span
                className="font-display text-base font-bold text-foreground transition-all duration-700"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: shown ? "280ms" : "0ms",
                }}
              >
                {m.h}
              </span>
              <span
                className="text-sm leading-relaxed text-muted-foreground transition-all duration-700"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: shown ? "380ms" : "0ms",
                }}
              >
                {m.t}
              </span>
            </li>
          );
        })}
      </ol>

    </div>
  );
}
