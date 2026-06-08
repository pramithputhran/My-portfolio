"use client";

import { Check, Code2, Copy, Github, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import type { PortfolioData } from "@/lib/portfolio-types";

import { SiGithub, SiInstagram, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const contactIcons = { Mail, Phone, MapPin };
const brandMapping: Record<string, { icon: any; color: string }> = {
  Github: { icon: SiGithub, color: "#FFFFFF" },
  Linkedin: { icon: FaLinkedin, color: "#0A66C2" },
  Instagram: { icon: SiInstagram, color: "#E4405F" },
  LeetCode: { icon: SiLeetcode, color: "#FFA116" },
  Code2: { icon: Code2, color: "#FFFFFF" }
};

export default function Contact({ data }: { data: PortfolioData["contact"] }) {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    ["name", "email", "message"].forEach((field) => {
      if (!String(form.get(field) || "").trim()) nextErrors[field] = "Required";
    });
    if (!String(form.get("email") || "").includes("@")) nextErrors.email = "Invalid";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
      event.currentTarget.reset();
      window.setTimeout(() => setSent(false), 2800);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(data.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="contact" className="section-pad relative isolate overflow-hidden bg-bg">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgb(var(--accent)/0.14),transparent_28%),radial-gradient(circle_at_88%_80%,rgb(var(--accent-3)/0.12),transparent_30%)]" />
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-xl reveal-up">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{data.overline}</p>
            <h2 className="mt-4 font-display text-6xl leading-none text-text sm:text-7xl lg:text-8xl">
              {data.heading}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted reveal-up reveal-delay-1">
            {data.summary}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 reveal-up reveal-delay-2">
          {data.cards.map(({ icon, label, value, href }) => {
            const Icon = contactIcons[icon] || Mail;
            return (
            <a key={label} href={href} className="group cursor-pointer flex min-h-28 items-center gap-4 rounded border border-line bg-surface p-5 hover:border-accent">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded bg-bg text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
                <p className="mt-2 break-words text-base font-bold text-text">{value}</p>
              </div>
            </a>
          )})}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 reveal-up reveal-delay-3">
          <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-bold text-text hover:border-accent">
            {copied ? "Email copied" : "Copy email"} {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
          {data.socialLinks.map(({ label, href, icon }) => {
            const brand = brandMapping[icon] || brandMapping["Github"];
            const Icon = brand.icon;
            return (
              <a 
                key={label} 
                href={href} 
                className="group relative grid h-12 w-12 place-items-center rounded-full border border-line bg-surface transition-colors duration-300" 
                aria-label={label}
                style={{ "--hover-border": brand.color } as React.CSSProperties}
              >
                <div className="absolute inset-0 rounded-full border border-transparent transition-colors duration-300 group-hover:border-[var(--hover-border)]" />
                <Icon 
                  className="relative z-10 h-5 w-5 transition-colors duration-300 group-hover:text-[var(--hover-border)]" 
                />
              </a>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch reveal-up">
          <div className="flex flex-col justify-between rounded border border-line bg-surface p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Availability</p>
              <h3 className="mt-4 text-2xl font-bold text-text">{data.availabilityHeading}</h3>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                {data.availabilitySummary}
              </p>
              <div className="mt-6 rounded border border-line bg-bg/50 p-4">
                <div className="space-y-2 font-mono text-sm text-muted">
                  <p><span className="text-accent">&rsaquo;</span> timezone: {data.timezone}</p>
                  <p><span className="text-accent">&rsaquo;</span> preference: {data.preference}</p>
                  <p><span className="text-accent">&rsaquo;</span> status: {data.status}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-full border border-line bg-bg px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[rgb(var(--success))] animate-pulse" />
              <span className="text-sm font-bold text-text">{data.replyText}</span>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="rounded border border-line bg-surface p-6 shadow-sharp sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" }
              ].map((field) => (
                <label key={field.name} className="group relative block">
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder=" "
                    className={`peer h-14 w-full rounded border bg-bg px-4 pt-4 font-semibold text-text ${errors[field.name] ? "border-accent2" : "border-line"}`}
                  />
                  <span className="pointer-events-none absolute left-4 top-1 text-xs font-bold text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">
                    {field.label}
                  </span>
                </label>
              ))}
            </div>

            <label className="group relative mt-5 block">
              <textarea
                name="message"
                placeholder=" "
                rows={7}
                className={`peer w-full resize-none rounded border bg-bg px-4 pt-6 font-semibold text-text ${errors.message ? "border-accent2" : "border-line"}`}
              />
              <span className="pointer-events-none absolute left-4 top-2 text-xs font-bold text-muted transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                Message
              </span>
            </label>

            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-bold text-bg hover:bg-accent2">
              {sent ? "Message ready" : "Send message"} {sent ? <Check className="h-5 w-5" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
