import { ArrowUpRight, Code2, Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import type { PortfolioData } from "@/lib/portfolio-types";
import { SiGithub, SiInstagram, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const nav = ["about", "education", "tools", "projects", "contact"];
const brandMapping: Record<string, { icon: any; color: string }> = {
  Github: { icon: SiGithub, color: "#FFFFFF" },
  Linkedin: { icon: FaLinkedin, color: "#0A66C2" },
  Instagram: { icon: SiInstagram, color: "#E4405F" },
  LeetCode: { icon: SiLeetcode, color: "#FFA116" },
  Code2: { icon: SiGithub, color: "#FFFFFF" }
};

export default function Footer({
  site,
  footer,
  contact
}: {
  site: PortfolioData["site"];
  footer: PortfolioData["footer"];
  contact: PortfolioData["contact"];
}) {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-text py-12 text-bg">
      <div className="pointer-events-none absolute left-0 top-0 flex w-full justify-center overflow-hidden opacity-[0.06]">
        <span
          className="font-display leading-none whitespace-nowrap"
          style={{ fontSize: `clamp(4rem, ${220 / Math.max(site.ownerName.length, 1)}vw, 25rem)` }}
        >
          {site.ownerName}
        </span>
      </div>
      <div className="container-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <Link href="#home" className="font-display text-6xl leading-none">
              {site.initials}
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-bg/70">
              {footer.description}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bg/50">Navigate</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {nav.map((item) => (
                <Link key={item} href={`#${item}`} className="inline-flex items-center gap-2 text-sm font-bold capitalize text-bg/75 hover:text-bg">
                  {item} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bg/50">Contact</p>
            <div className="mt-4 space-y-3 text-sm font-bold text-bg/75">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-bg">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-bg">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            </div>
            <div className="mt-5 flex gap-3">
              {contact.socialLinks.map(({ label, href, icon }) => {
                const brand = brandMapping[icon] || brandMapping["Github"];
                const Icon = brand.icon;
                return (
                  <a 
                    key={label} 
                    href={href} 
                    aria-label={label} 
                    className="group relative grid h-10 w-10 place-items-center rounded-full border border-bg/25 transition-colors duration-300"
                    style={{ "--hover-border": brand.color } as React.CSSProperties}
                  >
                    <div className="absolute inset-0 rounded-full border border-transparent transition-colors duration-300 group-hover:border-[var(--hover-border)]" />
                    <Icon className="relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-[var(--hover-border)]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-bg/15 pt-6 text-sm text-bg/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p>{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
