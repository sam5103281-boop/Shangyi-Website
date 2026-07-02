import { useEffect, useRef, useState } from "react";

interface VisionCardProps {
  index: number;
  eyebrow: string;
  title: string;
  desc: string;
  delay?: number;
}

export function VisionCard({ eyebrow, title, desc, delay = 0 }: VisionCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative pt-8 group">
      {/* Blue-green gradient line: thin, dark→light with soft alpha for a less rigid feel */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[2px] overflow-hidden rounded-full bg-border/30"
      >
        <div
          className="absolute inset-y-0 left-0 origin-left w-full"
          style={{
            transform: shown ? "scaleX(1)" : "scaleX(0)",
            opacity: shown ? 0.9 : 0,
            transition: `transform 1800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 1200ms ease ${delay}ms`,
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--vision-line-blue) 95%, transparent) 0%, color-mix(in srgb, var(--vision-line-teal) 60%, transparent) 55%, color-mix(in srgb, var(--vision-line-green) 8%, transparent) 100%)",
          }}
        />
      </div>

      {/* Eyebrow */}
      <div
        className="flex items-baseline"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 700ms ease ${delay + 250}ms, transform 700ms ease ${delay + 250}ms`,
        }}
      >
        <span className="text-[11px] tracking-[0.28em] text-accent uppercase">{eyebrow}</span>
      </div>

      <h3
        className="mt-4 font-display text-2xl text-foreground"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 700ms ease ${delay + 380}ms, transform 700ms ease ${delay + 380}ms`,
        }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 700ms ease ${delay + 500}ms, transform 700ms ease ${delay + 500}ms`,
        }}
      >
        {desc}
      </p>

    </div>
  );
}

