"use client";

import { ArrowUpRight, CheckCircle2, Github, Layers3, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PortfolioData, ProjectItem } from "@/lib/portfolio-types";

const blur =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PHJlY3QgZmlsbD0iI2QwZDZkMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIi8+PC9zdmc+";

export default function Projects({ data }: { data: PortfolioData["projects"] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup = () => {};

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".project-image-inner").forEach((image) => {
          gsap.to(image, {
            y: -36,
            ease: "none",
            scrollTrigger: { trigger: image.closest(".project-card"), start: "top bottom", end: "bottom top", scrub: 1.2 }
          });
        });

        gsap
          .timeline({
            scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true }
          })
          .fromTo(".project-heading > *", { y: 18 }, { y: 0, stagger: 0.06, duration: 0.45, ease: "power2.out", immediateRender: false })
          .fromTo(".project-card", { y: 28, scale: 0.99 }, { y: 0, scale: 1, duration: 0.65, ease: "power3.out", stagger: 0.12, immediateRender: false }, "-=0.18")
          .fromTo(".project-detail", { y: 12 }, { y: 0, stagger: 0.035, duration: 0.32, ease: "power2.out", immediateRender: false }, "-=0.3");

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
    <section id="projects" ref={rootRef} className="section-pad relative isolate overflow-hidden bg-bg">
      <div className="container-shell">
        <div className="project-heading max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">{data.overline}</p>
          <h2 className="mt-4 font-display text-6xl leading-none text-text sm:text-7xl lg:text-8xl">{data.heading}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{data.summary}</p>
        </div>

        <div className="mt-12 space-y-8">
          {data.items.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="project-card overflow-hidden rounded border border-line bg-surface shadow-sharp">
      <div className="grid lg:grid-cols-[0.45fr_0.55fr]">
        <div className="relative min-h-[260px] overflow-hidden bg-elevated sm:min-h-[340px]">
          <div className="project-image-inner absolute inset-x-0 -top-8 h-[calc(100%+80px)]">
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              placeholder="blur"
              blurDataURL={blur}
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg)/0.74)] via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-3">
            <div className="project-detail rounded border border-line bg-bg/80 px-4 py-3 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Status</p>
              <p className="mt-1 font-bold text-text">{project.status}</p>
            </div>
            <div className="project-detail rounded border border-line bg-bg/80 px-4 py-3 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Type</p>
              <p className="mt-1 font-bold text-text">{project.type}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="project-detail inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm font-bold text-accent">
              <Sparkles className="h-4 w-4" />
              {project.label}
            </div>
            <h3 className="project-detail mt-5 font-display text-5xl leading-none text-text sm:text-6xl">{project.title}</h3>
            <p className="project-detail mt-5 text-base leading-7 text-muted">{project.description}</p>

            <div className="project-detail mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-line bg-bg px-3 py-1 text-xs font-bold text-muted">
                  {item}
                </span>
              ))}
            </div>

            <div className="project-detail mt-7 grid gap-3">
              {project.highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-text">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  {item}
                </div>
              ))}
            </div>

            <div className="project-detail mt-7 rounded border border-line bg-bg p-4">
              <div className="flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-accent" />
                <p className="font-bold text-text">{project.metric}</p>
              </div>
            </div>
          </div>

          <div className="project-detail mt-8 flex flex-wrap gap-3">
            <a href={project.liveHref} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-bg hover:bg-accent2">
              Live demo <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href={project.sourceHref} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-bold text-text hover:border-accent">
              Source code <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
