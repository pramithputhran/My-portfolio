"use client";

import { Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import type { PortfolioData } from "@/lib/portfolio-types";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#tools", label: "Tools" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

export default function Navbar({ site }: { site: PortfolioData["site"] }) {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((session) => setAdminLoggedIn(Boolean(session.authenticated)))
      .catch(() => setAdminLoggedIn(false));
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        links.forEach((link) => {
          ScrollTrigger.create({
            trigger: link.href,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActive(link.href)
          });
        });

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const current = self.scroll();
            setScrolled(current > 16);
            if (current > lastY && self.getVelocity() > 80 && current > 120) {
              gsap.to(navRef.current, { y: -96, duration: 0.28, ease: "power2.out" });
            } else if (self.getVelocity() < -40) {
              gsap.to(navRef.current, { y: 0, duration: 0.28, ease: "power2.out" });
            }
            lastY = current;
          }
        });
      });

      ctx = mm;
    })();

    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        gsap.to(menuRef.current, {
          autoAlpha: open ? 1 : 0,
          y: open ? 0 : -16,
          duration: 0.35,
          ease: "power3.out",
          pointerEvents: open ? "auto" : "none"
        });
      });
    })();
    return () => ctx?.revert();
  }, [open]);

  return (
    <header
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-50 border-b ${
        scrolled ? "border-line/70 bg-bg/76 shadow-sm backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="container-shell flex h-20 items-center justify-between">
        <Link href="#home" className="font-display text-4xl leading-none tracking-normal text-text" aria-label="Home">
          {site.initials}
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-line/60 bg-surface/55 px-2 py-2 backdrop-blur-xl lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-2 text-xs font-semibold xl:px-4 xl:text-sm ${
                active === link.href ? "bg-text text-bg" : "text-muted hover:text-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {adminLoggedIn && (
            <Link
              href="/admin"
              className="hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm font-bold text-text hover:border-accent md:inline-flex"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          )}
          <Link
            href="#contact"
            className="hidden rounded-full bg-text px-5 py-3 text-sm font-bold text-bg shadow-sm hover:bg-accent md:inline-flex"
          >
            {site.navCtaLabel}
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="invisible absolute left-4 right-4 top-24 rounded border border-line bg-surface p-4 opacity-0 shadow-sharp md:hidden"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="block rounded px-4 py-4 text-lg font-bold text-text hover:bg-elevated"
          >
            {link.label}
          </Link>
        ))}
        {adminLoggedIn && (
          <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded px-4 py-4 text-lg font-bold text-text hover:bg-elevated">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        )}
      </div>
    </header>
  );
}
