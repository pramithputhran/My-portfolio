"use client";

import { Award, BookOpen, ExternalLink, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import type { EducationEntry, PortfolioData } from "@/lib/portfolio-types";

const RING_LENGTH = 157;

function Ring({ score, label }: { score: number; label: string }) {
  const offset = RING_LENGTH - (score / 100) * RING_LENGTH;

  return (
    <svg viewBox="0 0 64 64" className="edu-ring h-16 w-16 shrink-0" data-score={score} aria-label={`${label} score`}>
      <circle cx="32" cy="32" r="25" fill="none" stroke="rgb(var(--line))" strokeWidth="6" />
      <circle
        className="edu-ring-path"
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeLinecap="round"
        strokeWidth="6"
        strokeDasharray={RING_LENGTH}
        strokeDashoffset={offset}
        transform="rotate(-90 32 32)"
      />
      <text x="32" y="36" textAnchor="middle" className="fill-text text-[13px] font-bold">
        {label}
      </text>
    </svg>
  );
}

export default function Education({ data }: { data: PortfolioData["education"] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup = () => {};

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".education-title",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: rootRef.current, start: "top 72%", once: true }
          }
        );

        gsap.fromTo(
          ".timeline-line-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: { trigger: ".education-timeline", start: "top 75%", end: "bottom 45%", scrub: 1 }
          }
        );

        gsap.utils.toArray<HTMLElement>(".education-row").forEach((row, index) => {
          const card = row.querySelector(".education-card");
          const dot = row.querySelector(".timeline-dot");
          const ring = row.querySelector<SVGCircleElement>(".edu-ring-path");
          const direction = index % 2 === 0 ? -48 : 48;
          const score = Number(ring?.closest(".edu-ring")?.getAttribute("data-score") || 0);
          const offset = RING_LENGTH - (score / 100) * RING_LENGTH;

          const timeline = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 82%", once: true }
          });

          timeline
            .fromTo(card, { x: direction, immediateRender: false }, { x: 0, duration: 0.65, ease: "power3.out" })
            .fromTo(dot, { scale: 0, immediateRender: false }, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.5)" }, "-=0.45");

          if (ring) {
            timeline.fromTo(ring, { strokeDashoffset: RING_LENGTH, immediateRender: false }, { strokeDashoffset: offset, duration: 1.15, ease: "power2.inOut" }, "-=0.35");
          }
        });



        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh, { once: true });
        cleanup = () => {
          window.removeEventListener("load", refresh);
          ctx.revert();
        };
      }, rootRef);
    })();

    return () => cleanup();
  }, []);

  return (
    <section id="education" ref={rootRef} className="section-pad relative isolate overflow-hidden bg-bg">
      <div className="container-shell">
        <p className="education-title text-sm font-bold uppercase tracking-[0.22em] text-accent reveal-up">{data.overline}</p>
        <h2 className="education-title mt-4 max-w-5xl font-display text-6xl leading-none text-text sm:text-7xl lg:text-8xl reveal-up reveal-delay-1">
          {data.heading}
        </h2>

        <div className="education-timeline relative mt-12">
          <div className="absolute left-4 top-0 h-full w-px bg-line md:left-1/2">
            <div className="timeline-line-fill h-full w-full origin-top bg-accent" />
          </div>

          <div className="space-y-10">
            {data.entries.map((item, index) => (
              <div key={item.title} className="education-row relative grid gap-6 pl-12 md:grid-cols-[1fr_72px_1fr] md:items-center md:gap-0 md:pl-0">
                <div className={index % 2 === 0 ? "md:col-start-1 md:row-start-1" : "md:col-start-3 md:row-start-1"}>
                  <EducationCard item={item} />
                </div>
                <div className="timeline-dot absolute left-0 top-8 z-10 grid h-8 w-8 place-items-center rounded-full border border-accent bg-bg shadow-[0_0_0_8px_rgb(var(--bg))] md:static md:col-start-2 md:row-start-1 md:mx-auto">
                  <span className="h-3 w-3 rounded-full bg-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 reveal-up reveal-delay-2">
          {data.certifications.map((cert) => (
            <article key={cert.name} className="cert-card rounded border border-line bg-surface p-5 shadow-sm reveal-up">
              <div className="grid h-12 w-12 place-items-center rounded bg-bg text-accent">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-bold text-text">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted">
                {cert.body} - {cert.year}
              </p>
              <a href={cert.verifyHref} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
                Verify <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ item }: { item: EducationEntry }) {
  return (
    <article className="education-card rounded border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-5">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded bg-bg text-accent">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.institution}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-line px-3 py-1 text-xs font-bold text-accent">{item.year}</span>
      </div>

      <div className="mt-6 flex items-end justify-between gap-5">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold text-muted">
            <BookOpen className="h-4 w-4 text-accent" /> Key subjects
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.subjects.map((subject) => (
              <span key={subject} className="rounded-full bg-bg px-3 py-1 text-xs font-bold text-muted">
                {subject}
              </span>
            ))}
          </div>
        </div>
        <Ring score={item.score} label={item.label} />
      </div>
    </article>
  );
}
