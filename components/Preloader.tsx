"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    /* Wait for the page to be fully loaded, then start exit animation */
    const start = Date.now();
    const minDuration = 1400; /* ms — minimum time the loader stays visible */

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        setPhase("exit");
        /* After exit animation completes, remove from DOM */
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 700);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      /* Safety fallback — don't wait more than 4 seconds */
      const fallback = setTimeout(finish, 4000);
      return () => {
        window.removeEventListener("load", finish);
        clearTimeout(fallback);
      };
    }
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg transition-all duration-700 ${
        phase === "exit" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Initials */}
      <div className="relative">
        <h1
          className={`font-display text-7xl tracking-tight text-text transition-all duration-500 sm:text-8xl ${
            phase === "exit" ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <span className="bg-gradient-to-r from-text via-accent to-accent bg-clip-text text-transparent">
            PP
          </span>
        </h1>
      </div>

      {/* Loading bar */}
      <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-line/30 sm:w-52">
        <div className="h-full animate-[loaderBar_1.2s_ease-in-out_infinite] rounded-full bg-accent" />
      </div>

      {/* Subtitle */}
      <p
        className={`mt-5 text-xs font-bold uppercase tracking-[0.25em] text-muted transition-all delay-100 duration-500 ${
          phase === "exit" ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        Loading experience
      </p>
    </div>
  );
}
