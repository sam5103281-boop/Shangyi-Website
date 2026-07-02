import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  threshold?: number;
}

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  duration = 450,
  direction = "up",
  distance = 12,
  className,
  style,
  once = true,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
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
            if (once) obs.disconnect();
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);

  const offset = (() => {
    if (shown || direction === "none") return "translate3d(0,0,0)";
    switch (direction) {
      case "up": return `translate3d(0, ${distance}px, 0)`;
      case "down": return `translate3d(0, -${distance}px, 0)`;
      case "left": return `translate3d(${distance}px, 0, 0)`;
      case "right": return `translate3d(-${distance}px, 0, 0)`;
    }
  })();

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: offset,
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
