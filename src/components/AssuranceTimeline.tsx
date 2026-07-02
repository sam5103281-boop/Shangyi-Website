import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

type Item = { n: string; t: string; d: string };

function StepCircle({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative">
      {isActive && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-accent animate-[stepPing_0.9s_ease-out_forwards]"
        />
      )}
      <div
        className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
          isActive
            ? "border-accent bg-accent text-white shadow-[0_10px_30px_-10px] shadow-accent/60"
            : "border-hairline bg-surface"
        }`}
      >
        <Check
          strokeWidth={3.5}
          className={`h-8 w-8 text-white transition-all duration-500 ${
            isActive ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-45"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        />
      </div>
    </div>
  );
}

export function AssuranceTimeline({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            items.forEach((_, i) => {
              timers.push(
                window.setTimeout(() => setActive(i), 350 + i * 600),
              );
            });
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [items.length]);

  const progress = active < 0 ? 0 : ((active + 1) / items.length) * 100;

  return (
    <div ref={ref} className="mt-14">
      <style>{`
        @keyframes stepPing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      {/* Desktop horizontal timeline */}
      <div className="relative hidden lg:block">
        <div className="absolute left-8 right-8 top-8 h-[2px] bg-hairline" />
        <div
          className="absolute left-8 top-8 h-[2px] bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `calc((100% - 4rem) * ${progress / 100})` }}
        />
        <ol className="relative grid grid-cols-5 gap-6">
          {items.map((a, idx) => {
            const isActive = idx <= active;
            return (
              <li key={a.n} className="flex flex-col items-start">
                <StepCircle isActive={isActive} />
                <div
                  className={`mt-7 transition-all duration-500 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"
                  }`}
                >
                  <span className="font-display text-sm lg:text-base xl:text-[17px] tracking-[0.2em] text-accent">
                    {a.n}
                  </span>
                  <p className="mt-3 font-display text-lg lg:text-xl xl:text-[22px] leading-snug text-foreground text-balance min-h-[3.5rem] lg:min-h-[3.75rem] xl:min-h-[4rem]">
                    {a.t}
                  </p>
                  <p className="mt-3 text-[15px] lg:text-base xl:text-[17px] leading-[1.85] text-muted-foreground">
                    {a.d}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile / tablet vertical timeline */}
      <ol className="relative lg:hidden">
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-hairline" />
        <div
          className="absolute left-8 top-0 w-[2px] bg-accent transition-[height] duration-500 ease-out"
          style={{ height: `${progress}%` }}
        />
        {items.map((a, idx) => {
          const isActive = idx <= active;
          return (
            <li key={a.n} className="relative flex gap-5 pb-10 last:pb-0">
              <StepCircle isActive={isActive} />
              <div
                className={`flex-1 pt-2 transition-all duration-500 ${
                  isActive ? "opacity-100" : "opacity-50"
                }`}
              >
                <span className="font-display text-sm sm:text-base tracking-[0.2em] text-accent">{a.n}</span>
                <p className="mt-3 font-display text-lg sm:text-xl md:text-2xl leading-snug text-foreground">{a.t}</p>
                <p className="mt-3 text-[15px] sm:text-base md:text-[17px] leading-[1.85] text-muted-foreground">{a.d}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
