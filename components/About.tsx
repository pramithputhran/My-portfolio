"use client";

import { Code2, Mail, MapPin, Phone, Sparkles, Terminal } from "lucide-react";
import { useEffect, useRef } from "react";
import type { PortfolioData } from "@/lib/portfolio-types";

const contactIcons = { MapPin, Mail, Phone };

export default function About({ data }: { data: PortfolioData["about"] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup = () => {};

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.to(".about-float-a", { y: -18, rotate: 8, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".about-float-b", { y: 16, rotate: -8, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".about-float-c", { y: -12, x: 8, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".about-visual-wrapper", { y: -12, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 88%",
            once: true
          }
        });

        timeline
          .fromTo(".about-visual", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "power4.out", immediateRender: false })
          .fromTo(".about-frame", { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, transformOrigin: "top left", duration: 0.55, ease: "power3.out", immediateRender: false }, "-=0.35")
          .fromTo(".about-copy > *", { y: 16 }, { y: 0, stagger: 0.05, duration: 0.42, ease: "power2.out", immediateRender: false }, "-=0.42")
          .fromTo(".about-side-card", { scale: 0.98, y: 10 }, { scale: 1, y: 0, duration: 0.38, ease: "power3.out", immediateRender: false }, "-=0.22");

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
    <section id="about" ref={rootRef} className="section-pad relative isolate overflow-hidden bg-surface">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="about-visual-wrapper relative mx-auto w-full max-w-[420px] lg:mx-0">
            <div className="about-frame absolute left-3 top-3 h-full w-full border-2 border-accent" />
            <div className="about-visual relative overflow-hidden rounded border border-line bg-bg p-5 shadow-sharp">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgb(var(--accent)/0.20),transparent_32%),radial-gradient(circle_at_85%_90%,rgb(var(--accent-3)/0.16),transparent_34%)]" />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-accent2" />
                    <span className="h-3 w-3 rounded-full bg-accent3" />
                    <span className="h-3 w-3 rounded-full bg-accent" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">about.tsx</p>
                </div>

              <div className="mt-6 rounded border border-line bg-surface/70 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded bg-text text-bg">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-muted">{data.profileLabel}</p>
                    <h3 className="text-xl font-bold text-text">{data.profileName}</h3>
                  </div>
                </div>

                <div className="mt-6 space-y-3 font-mono text-sm leading-7 break-all sm:break-normal">
                  <p>
                    <span className="text-accent">const</span> focus = <span className="text-accent2">&quot;{data.codeFocus}&quot;</span>;
                  </p>
                  <p>
                    <span className="text-accent">const</span> style = <span className="text-accent2">&quot;{data.codeStyle}&quot;</span>;
                  </p>
                  <p>
                    <span className="text-accent">return</span> polishedProducts;
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {data.stack.map((item) => (
                  <div key={item} className="rounded border border-line bg-surface/75 px-3 py-3 text-center text-xs font-bold text-muted backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="about-float-a absolute right-8 top-20 grid h-14 w-14 place-items-center rounded-full border border-accent/45 bg-bg/70 text-accent backdrop-blur">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="about-float-c absolute bottom-8 right-10 h-3 w-3 rounded-full bg-accent" />
          </div>
          </div>

        <div className="about-copy min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">{data.overline}</p>
          <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[0.95] text-text sm:text-6xl">
            {data.heading}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          </div>
        </div>

        <div className="about-side-card mt-12 rounded-xl border border-line bg-bg p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Quick details</p>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {data.quickDetails.map(({ icon, label, value }) => {
              const Icon = contactIcons[icon] || Mail;
              return (
              <div key={label} className="flex min-w-0 items-center gap-4 rounded border border-line bg-surface p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-bg text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
                  <p className="mt-1 whitespace-nowrap text-sm font-bold leading-6 text-text">{value}</p>
                </div>
              </div>
            )})}
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.07] px-5 py-2.5 text-sm font-bold text-accent">
          <Code2 className="h-4 w-4" />
          {data.availabilityText}
        </div>
      </div>
    </section>
  );
}
