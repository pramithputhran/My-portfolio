"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import Tools from "@/components/Tools";
import type { PortfolioData } from "@/lib/portfolio-types";

export default function PageContent({ data }: { data: PortfolioData }) {
  const [loaded, setLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  /* After loader completes, reveal all scroll-triggered elements using IntersectionObserver */
  useEffect(() => {
    if (!loaded) return;

    const revealElements = document.querySelectorAll(".reveal-up, .reveal-fade, .reveal-scale");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));

    /* Also refresh any GSAP ScrollTriggers */
    (async () => {
      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        ScrollTrigger.refresh();
      } catch { /* gsap may not be loaded yet */ }
    })();

    return () => observer.disconnect();
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={handleLoaderComplete} />
      <Navbar site={data.site} />
      <div ref={mainRef}>
        <main>
          <Hero data={data.hero} socialLinks={data.contact.socialLinks} />
          <About data={data.about} />
          <Education data={data.education} />
          <Tools data={data.tools} />
          <Projects data={data.projects} />
          <Contact data={data.contact} />
        </main>
        <Footer site={data.site} footer={data.footer} contact={data.contact} />
      </div>
    </>
  );
}
