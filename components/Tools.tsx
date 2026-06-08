"use client";

import { Code2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioData } from "@/lib/portfolio-types";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiExpress, SiMongodb, SiPostgresql, SiFigma, SiGreensock, 
  SiGit, SiVercel 
} from "react-icons/si";

const brandMapping: Record<string, { icon: any; color: string }> = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express": { icon: SiExpress, color: "#FFFFFF" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Postgres": { icon: SiPostgresql, color: "#4169E1" },
  "Figma": { icon: SiFigma, color: "#F24E1E" },
  "GSAP": { icon: SiGreensock, color: "#88CE02" },
  "Git": { icon: SiGit, color: "#F05032" },
  "Vercel": { icon: SiVercel, color: "#FFFFFF" }
};

export default function Tools({ data }: { data: PortfolioData["tools"] }) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("All");
  const visible = useMemo(() => data.items.filter((tool) => active === "All" || tool.category === active), [active, data.items]);

  useEffect(() => {
    let cleanup = () => {};

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.set(".tool-bar-fill", { scaleX: 0, transformOrigin: "left center" });
        gsap.to(".tool-bar-fill", {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".tool-bars", start: "top 85%", once: true }
        });
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section id="tools" ref={rootRef} className="section-pad relative isolate overflow-hidden bg-surface">
      <div className="container-shell">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">{data.overline}</p>
        <h2 className="mt-4 font-display text-7xl leading-none text-text sm:text-8xl">{data.heading}</h2>

        <div className="mt-10 flex flex-wrap gap-5 border-b border-line">
          {data.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`relative pb-4 text-sm font-bold ${active === tab ? "text-text" : "text-muted hover:text-text"}`}
            >
              {tab}
              {active === tab && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {visible.map(({ name, level, years }) => {
            const brand = brandMapping[name];
            const Icon = brand?.icon || Code2;
            const color = brand?.color || "currentColor";
            
            return (
              <div 
                key={name} 
                className="tool-item group relative grid aspect-square place-items-center rounded border border-line bg-bg p-4 text-center transition-colors duration-300"
                style={{ "--hover-border": color } as React.CSSProperties}
              >
                <div className="absolute inset-0 rounded border border-transparent transition-colors duration-300 group-hover:border-[var(--hover-border)]" />
                <div className="relative z-10">
                  <Icon 
                    className="mx-auto h-10 w-10 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color }} 
                  />
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-text transition-colors duration-300 group-hover:text-[var(--hover-border)]">
                    {name}
                  </p>
                </div>
                <div className="pointer-events-none absolute -top-20 left-1/2 z-20 w-44 -translate-x-1/2 rounded border border-line bg-elevated p-3 text-left opacity-0 shadow-sharp transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-bold text-text">{name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {level}% proficiency - {years} years
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="tool-bars mt-10 grid gap-4 lg:grid-cols-3">
          {data.bars.map((bar) => (
            <div key={bar.label} className="rounded border border-line bg-bg p-4">
              <div className="flex justify-between text-sm font-bold">
                <span>{bar.label}</span>
                <span className="text-accent">{bar.value}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-line/50">
                <div className="tool-bar-fill h-full rounded-full bg-accent" style={{ width: `${bar.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded border border-line bg-bg p-4">
          <span className="font-bold text-muted">{data.exploringLabel}</span>
          {data.exploring.map((item) => (
            <span key={item} className="explore-pill relative rounded-full border border-accent px-4 py-2 text-sm font-bold text-text">
              {item}
            </span>
          ))}
          <span className="h-5 w-[2px] animate-pulse bg-accent" />
        </div>
      </div>
    </section>
  );
}
