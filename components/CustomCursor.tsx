"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const pathname = usePathname();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || isAdmin) {
      document.body.classList.remove("hide-default-cursor");
      return;
    }

    document.body.classList.add("hide-default-cursor");

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentDotScale = 1;
    let targetDotScale = 1;
    let hasMoved = false;
    let raf = 0;
    let isHoveringInteractive = false;

    const show = () => {
      if (!isHoveringInteractive) {
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const hide = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!hasMoved) {
        hasMoved = true;
        /* Jump to mouse position on first move to avoid animating from (0,0) */
        ringX = mouseX;
        ringY = mouseY;
        dotX = mouseX;
        dotY = mouseY;
      }
      show();
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.04;
      ringY += (mouseY - ringY) * 0.04;
      dotX += (mouseX - dotX) * 0.8;
      dotY += (mouseY - dotY) * 0.8;
      currentDotScale += (targetDotScale - currentDotScale) * 0.15;
      ring.style.transform = `translate3d(${ringX - 24}px, ${ringY - 24}px, 0)`;
      dot.style.transform = `translate3d(${dotX - 8}px, ${dotY - 8}px, 0) scale(${currentDotScale})`;
      raf = requestAnimationFrame(animate);
    };

    const handleHover = (event: Event) => {
      const target = event.target as HTMLElement;
      isHoveringInteractive = Boolean(target.closest("a, button, input, textarea, select, label"));
      
      if (isHoveringInteractive) {
        ring.style.opacity = "0";
        dot.style.opacity = "0";
      } else {
        show();
        const expandDot = Boolean(target.closest("h1, h2, h3, h4, h5, h6, label, img, p.uppercase, .font-display"));
        targetDotScale = expandDot ? 3 : 1;
        ring.style.borderColor = expandDot ? "transparent" : "";
      }
    };

    const handleLeave = () => hide();
    const handleEnter = () => {
      if (hasMoved) show();
    };
    const handleFocus = () => {
      if (hasMoved) show();
    };
    const handleBlur = () => hide();

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("pageshow", handleFocus);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("pageshow", handleFocus);
      cancelAnimationFrame(raf);
      document.body.classList.remove("hide-default-cursor");
    };
  }, [isAdmin]);

  if (isAdmin) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden h-12 w-12 rounded-full border-[1.5px] border-white mix-blend-difference transition-all duration-150 ease-out md:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[301] hidden h-4 w-4 rounded-full bg-white mix-blend-difference transition-opacity duration-150 md:block"
      />
    </>
  );
}
