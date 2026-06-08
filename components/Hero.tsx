"use client";

import { ArrowDown, Code2, Download, ExternalLink, Github, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PortfolioData, SocialLink } from "@/lib/portfolio-types";

const blur =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0iI2RkY2ZiZiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIi8+PC9zdmc+";
const socialIcons: Record<string, any> = { Github, Linkedin, Instagram, Code2, LeetCode: Code2 };

export default function Hero({ data, socialLinks }: { data: PortfolioData["hero"]; socialLinks: SocialLink[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [role, setRole] = useState(0);
  const roles = data.roles.length ? data.roles : ["Developer"];
  const greetWords = data.greeting.split(" ");
  const nameWords = data.name.split(" ");

  useEffect(() => {
    const interval = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 1800);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let mm: { add: (query: string, callback: () => void | (() => void)) => void; revert: () => void } | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          gsap.set(".hero-word", { yPercent: 110, opacity: 0 });
          gsap.fromTo(
            ".hero-word",
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.08 }
          );
          gsap.to(imageRef.current, {
            y: -14,
            rotate: 1.5,
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }, rootRef);
        return () => ctx.revert();
      });
    })();
    return () => mm?.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="mesh-bg relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 animate-mesh lg:h-[100svh]">
      <div className="container-shell grid max-h-full items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-6">
        <div className="flex min-w-0 flex-col gap-5 lg:pr-6">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm font-bold text-text backdrop-blur">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--success))] opacity-60 animate-pulseDot" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[rgb(var(--success))]" />
            </span>
            {data.availableLabel}
          </div>

          <h1 className="max-w-[740px] font-display leading-[1.1] tracking-tight text-text">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)]">
              {greetWords.map((word) => (
                <span key={word} className="mr-2 inline-block overflow-hidden pb-1 last:mr-0 sm:mr-3">
                  <span className="hero-word inline-block">{word}</span>
                </span>
              ))}
            </span>
            <span className="mt-1 block whitespace-nowrap text-[clamp(2.25rem,5.5vw,4.75rem)]">
              {nameWords.map((word) => (
                <span key={word} className="mr-2 inline-block overflow-hidden pb-1 last:mr-0 sm:mr-4">
                  <span className="hero-word inline-block bg-gradient-to-r from-text via-accent to-accent bg-clip-text text-transparent">{word}</span>
                </span>
              ))}
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-base font-bold text-muted sm:text-lg">
            <span>I shape products as a</span>
            <span className="min-w-28 rounded-full bg-text px-5 py-2 text-center text-sm text-bg sm:text-base">{roles[role]}</span>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {data.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={data.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-bg shadow-sharp transition-transform hover:scale-[1.03] hover:bg-accent2 sm:px-7 sm:text-base">
              {data.primaryCta.label} <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <a href={data.resumeCta.href} download className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-6 py-3 text-sm font-bold text-text transition-transform hover:scale-[1.03] hover:border-accent sm:px-7 sm:text-base">
              {data.resumeCta.label} <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>

          <div className="flex items-center gap-3 pt-1" aria-label="Social profile links">
            {socialLinks.map(({ label, href, icon }) => {
              const Icon = socialIcons[icon] || Code2;
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="group grid h-12 w-12 place-items-center rounded-full border border-line bg-surface/70 text-text backdrop-blur transition-all hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-bg"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[min(20rem,72vw)] lg:max-h-[calc(100svh-11rem)] lg:max-w-[22rem]">
          <div className="absolute -inset-3 rotate-2 border-2 border-accent" />
          <div ref={imageRef} className="relative h-full overflow-hidden rounded shadow-sharp">
            <Image
              src={data.image}
              alt={`Portrait of ${data.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 380px, 72vw"
              placeholder="blur"
              blurDataURL={blur}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <Link href="#about" aria-label="Scroll to about" className="absolute bottom-5 left-1/2 hidden h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-line bg-surface/80 animate-bounceSoft lg:grid">
        <ArrowDown className="h-5 w-5" />
      </Link>
    </section>
  );
}
