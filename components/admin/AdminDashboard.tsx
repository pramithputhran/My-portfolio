"use client";

import {
  BookOpen,
  BriefcaseBusiness,
  Check,
  ExternalLink,
  GraduationCap,
  Home,
  Loader2,
  LogOut,
  Mail,
  Plus,
  Save,
  Settings,
  Trash2,
  UserRound,
  Wrench,
  X,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { ContactCard, EducationEntry, PortfolioData, ProjectItem, SocialLink, ToolItem } from "@/lib/portfolio-types";

type AdminDashboardProps = {
  initialData: PortfolioData;
  username: string;
};

function CustomToast({ t, title, description, type = "success" }: { t: any; title: string; description: string; type: "success" | "error" }) {
  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;
  const colorBase = isSuccess ? "bg-[#22c55e]" : "bg-[#ef4444]";
  const iconBg = isSuccess ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#ef4444]/15 text-[#ef4444]";

  return (
    <div
      className={`pointer-events-auto relative flex w-[340px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5 dark:bg-[#1c2225] dark:ring-white/10 ${t.visible ? "toast-enter" : "toast-leave"
        }`}
    >
      <div className="flex w-full items-start p-4 pb-5">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1 pt-0.5">
          <p className="text-[15px] font-bold text-gray-900 dark:text-gray-100">{title}</p>
          <p className="mt-1 text-[13px] font-semibold text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-4 flex shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-gray-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className={`absolute bottom-0 left-4 right-4 h-1.5 overflow-hidden rounded-t-md bg-gray-100 dark:bg-white/5 ${!t.visible ? "opacity-0 transition-opacity duration-200" : ""}`}>
        <div className={`h-full w-full origin-left ${colorBase} toast-progress`} />
      </div>
    </div>
  );
}

const sections = [
  { id: "site", label: "Site", icon: Settings },
  { id: "hero", label: "Hero", icon: Home },
  { id: "about", label: "About", icon: UserRound },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "projects", label: "Projects", icon: BriefcaseBusiness },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "footer", label: "Footer", icon: BookOpen }
] as const;

type SectionId = (typeof sections)[number]["id"];

const socialIcons = ["Github", "Linkedin", "Instagram", "Code2", "LeetCode"] as const;
const contactIcons = ["Mail", "Phone", "MapPin"] as const;
const toolIcons = ["Cloud", "Code2", "Database", "Figma", "GitBranch", "Layers3", "Server", "Sparkles", "Terminal", "Wind"] as const;

const blankEducation: EducationEntry = {
  title: "New education item",
  institution: "Institution name",
  year: "2026",
  score: 80,
  label: "80%",
  subjects: ["Subject"]
};

const blankTool: ToolItem = {
  name: "New Tool",
  category: "Frontend",
  level: 80,
  years: "1+",
  icon: "Code2"
};

const blankProject: ProjectItem = {
  title: "New Project",
  label: "Featured project",
  image: "/images/hero-image.png",
  description: "Short project description.",
  stack: ["Next.js"],
  highlights: ["Clean UI"],
  metric: "Portfolio-ready",
  status: "Demo ready",
  type: "Web app",
  liveHref: "#",
  sourceHref: "#"
};

const blankSocial: SocialLink = { label: "GitHub", href: "https://github.com", icon: "Github" };
const blankContact: ContactCard = { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com", icon: "Mail" };

function csvToArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToCsv(value: string[]) {
  return value.join(", ");
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded border border-line bg-bg px-3 text-sm font-semibold text-text"
      />
    </label>
  );
}

function TextBox({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="block min-w-0">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-y rounded border border-line bg-bg px-3 py-3 text-sm font-semibold leading-6 text-text"
      />
    </label>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="block min-w-0">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</span>
      <select
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value as T)}
        className="mt-2 h-11 w-full rounded border border-line bg-bg px-3 text-sm font-semibold text-text"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-line bg-surface p-5 shadow-sm">
      <h2 className="font-display text-4xl leading-none text-text">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function ItemShell({ title, onDelete, children }: { title: string; onDelete: () => void; children: ReactNode }) {
  return (
    <article className="rounded border border-line bg-bg p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-bold text-text">{title}</h3>
        <button type="button" onClick={onDelete} className="grid h-9 w-9 place-items-center rounded-full border border-line text-accent2 hover:border-accent2">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {children}
    </article>
  );
}

export default function AdminDashboard({ initialData, username }: AdminDashboardProps) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [active, setActive] = useState<SectionId>("site");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const activeLabel = useMemo(() => sections.find((section) => section.id === active)?.label || "Settings", [active]);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    const response = await fetch("/api/admin/data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setSaving(false);

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setError(result.message || "Could not save changes. Please check the data and try again.");
      toast.custom((t) => (
        <CustomToast t={t} title="Error Occurred" description="Unable to connect to the server at present" type="error" />
      ), { duration: 3500 });
      return;
    }

    setSaved(true);
    toast.custom((t) => (
      <CustomToast t={t} title="Saved Successfully" description="Your changes have been saved successfully" type="success" />
    ), { duration: 3500 });
    window.setTimeout(() => setSaved(false), 2000);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const updateHero = <K extends keyof PortfolioData["hero"]>(key: K, value: PortfolioData["hero"][K]) => {
    setData((current) => ({ ...current, hero: { ...current.hero, [key]: value } }));
  };

  const updateAbout = <K extends keyof PortfolioData["about"]>(key: K, value: PortfolioData["about"][K]) => {
    setData((current) => ({ ...current, about: { ...current.about, [key]: value } }));
  };

  const updateContact = <K extends keyof PortfolioData["contact"]>(key: K, value: PortfolioData["contact"][K]) => {
    setData((current) => ({ ...current, contact: { ...current.contact, [key]: value } }));
  };

  return (
    <main className="min-h-screen bg-bg text-text">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/86 backdrop-blur-xl">
        <div className="container-shell flex min-h-20 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Admin dashboard</p>
            <h1 className="font-display text-5xl leading-none text-text">Portfolio settings</h1>
            <p className="mt-1 text-sm font-semibold text-muted">Logged in as {username}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-bold text-text hover:border-accent">
              View site <ExternalLink className="h-4 w-4" />
            </a>
            <button type="button" onClick={save} disabled={saving} className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition-all duration-300 ease-out border shadow-sm min-w-[160px] ${saving ? "bg-surface text-accent border-accent/30 cursor-wait opacity-80" : saved ? "bg-[rgb(var(--success))] text-white border-[rgb(var(--success))] shadow-lg shadow-[rgb(var(--success))]/20" : "bg-accent text-bg border-accent hover:bg-accent2 hover:border-accent2 hover:shadow-lg hover:-translate-y-0.5"}`}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-accent2 px-5 py-3 font-bold text-bg hover:bg-accent2/90 focus-visible:ring-4 focus-visible:ring-accent2/30 transition-colors"
            >
              Logout <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <Toaster
        position="bottom-right"
        pauseOnHover={false}
        toastOptions={{
          duration: 3500,
          style: {
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 16px',
            letterSpacing: '0.5px'
          },
          success: {
            iconTheme: {
              primary: 'rgb(var(--success))',
              secondary: 'transparent'
            }
          },
          error: {
            iconTheme: {
              primary: 'rgb(var(--accent-2))',
              secondary: 'transparent'
            }
          },
          loading: {
            iconTheme: {
              primary: 'rgb(var(--accent))',
              secondary: 'transparent'
            }
          }
        }}
      />

      <div className="container-shell grid gap-6 py-8 lg:grid-cols-[250px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <nav className="rounded-xl border border-line bg-surface p-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold last:mb-0 ${active === id ? "bg-accent text-bg" : "text-muted hover:bg-bg hover:text-text"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
          {error && <p className="mt-4 rounded border border-accent2/40 bg-accent2/10 p-3 text-sm font-bold text-accent2">{error}</p>}
        </aside>

        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Editing</p>
            <h2 className="mt-2 font-display text-5xl leading-none text-text">{activeLabel}</h2>
          </div>

          {active === "site" && (
            <Panel title="Site settings">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Initials / Logo" value={data.site.initials} onChange={(value) => setData({ ...data, site: { ...data.site, initials: value } })} />
                <Field label="Owner name" value={data.site.ownerName} onChange={(value) => setData({ ...data, site: { ...data.site, ownerName: value } })} />
                <Field label="Browser title" value={data.site.title} onChange={(value) => setData({ ...data, site: { ...data.site, title: value } })} />
                <Field label="Navbar CTA label" value={data.site.navCtaLabel} onChange={(value) => setData({ ...data, site: { ...data.site, navCtaLabel: value } })} />
              </div>
              <TextBox label="Meta description" value={data.site.description} onChange={(value) => setData({ ...data, site: { ...data.site, description: value } })} />
            </Panel>
          )}

          {active === "hero" && (
            <Panel title="Hero section">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Available label" value={data.hero.availableLabel} onChange={(value) => updateHero("availableLabel", value)} />
                <Field label="Greeting" value={data.hero.greeting} onChange={(value) => updateHero("greeting", value)} />
                <Field label="Name" value={data.hero.name} onChange={(value) => updateHero("name", value)} />
                <Field label="Image path / URL" value={data.hero.image} onChange={(value) => updateHero("image", value)} />
                <Field label="Roles, comma separated" value={arrayToCsv(data.hero.roles)} onChange={(value) => updateHero("roles", csvToArray(value))} />
              </div>
              <TextBox label="Hero summary" value={data.hero.summary} onChange={(value) => updateHero("summary", value)} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Primary CTA label" value={data.hero.primaryCta.label} onChange={(value) => updateHero("primaryCta", { ...data.hero.primaryCta, label: value })} />
                <Field label="Primary CTA link" value={data.hero.primaryCta.href} onChange={(value) => updateHero("primaryCta", { ...data.hero.primaryCta, href: value })} />
                <Field label="Resume label" value={data.hero.resumeCta.label} onChange={(value) => updateHero("resumeCta", { ...data.hero.resumeCta, label: value })} />
                <Field label="Resume link" value={data.hero.resumeCta.href} onChange={(value) => updateHero("resumeCta", { ...data.hero.resumeCta, href: value })} />
              </div>
            </Panel>
          )}

          {active === "about" && (
            <Panel title="About section">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Overline" value={data.about.overline} onChange={(value) => updateAbout("overline", value)} />
                <Field label="Heading" value={data.about.heading} onChange={(value) => updateAbout("heading", value)} />
                <Field label="Profile label" value={data.about.profileLabel} onChange={(value) => updateAbout("profileLabel", value)} />
                <Field label="Profile name" value={data.about.profileName} onChange={(value) => updateAbout("profileName", value)} />
                <Field label="Code focus" value={data.about.codeFocus} onChange={(value) => updateAbout("codeFocus", value)} />
                <Field label="Code style" value={data.about.codeStyle} onChange={(value) => updateAbout("codeStyle", value)} />
                <Field label="Stack, comma separated" value={arrayToCsv(data.about.stack)} onChange={(value) => updateAbout("stack", csvToArray(value))} />
                <Field label="Currently building label" value={data.about.currentBuildingLabel} onChange={(value) => updateAbout("currentBuildingLabel", value)} />
              </div>
              <TextBox label="About summary paragraphs, one per line" value={data.about.paragraphs.join("\n")} onChange={(value) => updateAbout("paragraphs", value.split("\n").filter(Boolean))} rows={5} />
              <Field label="Open-to pill text" value={data.about.availabilityText} onChange={(value) => updateAbout("availabilityText", value)} />
              <ContactEditor title="Quick details cards" items={data.about.quickDetails} setItems={(items) => updateAbout("quickDetails", items)} />
            </Panel>
          )}

          {active === "education" && (
            <Panel title="Education">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Overline" value={data.education.overline} onChange={(value) => setData({ ...data, education: { ...data.education, overline: value } })} />
                <Field label="Heading" value={data.education.heading} onChange={(value) => setData({ ...data, education: { ...data.education, heading: value } })} />
              </div>
              <ListHeader label="Education entries" onAdd={() => setData({ ...data, education: { ...data.education, entries: [...data.education.entries, blankEducation] } })} />
              {data.education.entries.map((entry, index) => (
                <ItemShell key={`${entry.title}-${index}`} title={entry.title} onDelete={() => setData({ ...data, education: { ...data.education, entries: data.education.entries.filter((_, itemIndex) => itemIndex !== index) } })}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Title" value={entry.title} onChange={(value) => updateEducation(index, { title: value })} />
                    <Field label="Institution" value={entry.institution} onChange={(value) => updateEducation(index, { institution: value })} />
                    <Field label="Year" value={entry.year} onChange={(value) => updateEducation(index, { year: value })} />
                    <Field label="Score" type="number" value={entry.score} onChange={(value) => updateEducation(index, { score: Number(value), label: `${Number(value)}%` })} />
                    <Field label="Label" value={entry.label} onChange={(value) => updateEducation(index, { label: value })} />
                    <Field label="Subjects, comma separated" value={arrayToCsv(entry.subjects)} onChange={(value) => updateEducation(index, { subjects: csvToArray(value) })} />
                  </div>
                </ItemShell>
              ))}
              <ListHeader label="Certifications" onAdd={() => setData({ ...data, education: { ...data.education, certifications: [...data.education.certifications, { name: "New Certification", body: "Issuer", year: "2026", verifyHref: "#" }] } })} />
              {data.education.certifications.map((cert, index) => (
                <ItemShell key={`${cert.name}-${index}`} title={cert.name} onDelete={() => setData({ ...data, education: { ...data.education, certifications: data.education.certifications.filter((_, itemIndex) => itemIndex !== index) } })}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Name" value={cert.name} onChange={(value) => updateCert(index, { name: value })} />
                    <Field label="Issuing body" value={cert.body} onChange={(value) => updateCert(index, { body: value })} />
                    <Field label="Year" value={cert.year} onChange={(value) => updateCert(index, { year: value })} />
                    <Field label="Verify link" value={cert.verifyHref} onChange={(value) => updateCert(index, { verifyHref: value })} />
                  </div>
                </ItemShell>
              ))}
            </Panel>
          )}

          {active === "tools" && (
            <Panel title="Tools and technologies">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Overline" value={data.tools.overline} onChange={(value) => setData({ ...data, tools: { ...data.tools, overline: value } })} />
                <Field label="Heading" value={data.tools.heading} onChange={(value) => setData({ ...data, tools: { ...data.tools, heading: value } })} />
                <Field label="Tabs, comma separated" value={arrayToCsv(data.tools.tabs)} onChange={(value) => setData({ ...data, tools: { ...data.tools, tabs: csvToArray(value) } })} />
                <Field label="Exploring label" value={data.tools.exploringLabel} onChange={(value) => setData({ ...data, tools: { ...data.tools, exploringLabel: value } })} />
                <Field label="Exploring, comma separated" value={arrayToCsv(data.tools.exploring)} onChange={(value) => setData({ ...data, tools: { ...data.tools, exploring: csvToArray(value) } })} />
              </div>
              <ListHeader label="Tool grid items" onAdd={() => setData({ ...data, tools: { ...data.tools, items: [...data.tools.items, blankTool] } })} />
              {data.tools.items.map((tool, index) => (
                <ItemShell key={`${tool.name}-${index}`} title={tool.name} onDelete={() => setData({ ...data, tools: { ...data.tools, items: data.tools.items.filter((_, itemIndex) => itemIndex !== index) } })}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Name" value={tool.name} onChange={(value) => updateTool(index, { name: value })} />
                    <Field label="Category" value={tool.category} onChange={(value) => updateTool(index, { category: value })} />
                    <Field label="Level" type="number" value={tool.level} onChange={(value) => updateTool(index, { level: Number(value) })} />
                    <Field label="Years used" value={tool.years} onChange={(value) => updateTool(index, { years: value })} />
                    <SelectField label="Icon" value={tool.icon} options={toolIcons} onChange={(value) => updateTool(index, { icon: value })} />
                  </div>
                </ItemShell>
              ))}
              <ListHeader label="Skill bars" onAdd={() => setData({ ...data, tools: { ...data.tools, bars: [...data.tools.bars, { label: "New skill", value: 80 }] } })} />
              {data.tools.bars.map((bar, index) => (
                <ItemShell key={`${bar.label}-${index}`} title={bar.label} onDelete={() => setData({ ...data, tools: { ...data.tools, bars: data.tools.bars.filter((_, itemIndex) => itemIndex !== index) } })}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Label" value={bar.label} onChange={(value) => updateBar(index, { label: value })} />
                    <Field label="Value" type="number" value={bar.value} onChange={(value) => updateBar(index, { value: Number(value) })} />
                  </div>
                </ItemShell>
              ))}
            </Panel>
          )}

          {active === "projects" && (
            <Panel title="Projects">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Overline" value={data.projects.overline} onChange={(value) => setData({ ...data, projects: { ...data.projects, overline: value } })} />
                <Field label="Heading" value={data.projects.heading} onChange={(value) => setData({ ...data, projects: { ...data.projects, heading: value } })} />
              </div>
              <TextBox label="Project section summary" value={data.projects.summary} onChange={(value) => setData({ ...data, projects: { ...data.projects, summary: value } })} />
              <ListHeader label="Project cards" onAdd={() => setData({ ...data, projects: { ...data.projects, items: [...data.projects.items, blankProject] } })} />
              {data.projects.items.map((project, index) => (
                <ItemShell key={`${project.title}-${index}`} title={project.title} onDelete={() => setData({ ...data, projects: { ...data.projects, items: data.projects.items.filter((_, itemIndex) => itemIndex !== index) } })}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Title" value={project.title} onChange={(value) => updateProject(index, { title: value })} />
                    <Field label="Label" value={project.label} onChange={(value) => updateProject(index, { label: value })} />
                    <Field label="Image" value={project.image} onChange={(value) => updateProject(index, { image: value })} />
                    <Field label="Status" value={project.status} onChange={(value) => updateProject(index, { status: value })} />
                    <Field label="Type" value={project.type} onChange={(value) => updateProject(index, { type: value })} />
                    <Field label="Metric" value={project.metric} onChange={(value) => updateProject(index, { metric: value })} />
                    <Field label="Live link" value={project.liveHref} onChange={(value) => updateProject(index, { liveHref: value })} />
                    <Field label="Source link" value={project.sourceHref} onChange={(value) => updateProject(index, { sourceHref: value })} />
                    <Field label="Stack, comma separated" value={arrayToCsv(project.stack)} onChange={(value) => updateProject(index, { stack: csvToArray(value) })} />
                    <Field label="Highlights, comma separated" value={arrayToCsv(project.highlights)} onChange={(value) => updateProject(index, { highlights: csvToArray(value) })} />
                  </div>
                  <div className="mt-4">
                    <TextBox label="Description" value={project.description} onChange={(value) => updateProject(index, { description: value })} />
                  </div>
                </ItemShell>
              ))}
            </Panel>
          )}

          {active === "contact" && (
            <Panel title="Contact">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Overline" value={data.contact.overline} onChange={(value) => updateContact("overline", value)} />
                <Field label="Heading" value={data.contact.heading} onChange={(value) => updateContact("heading", value)} />
                <Field label="Email" value={data.contact.email} onChange={(value) => updateContact("email", value)} />
                <Field label="Phone" value={data.contact.phone} onChange={(value) => updateContact("phone", value)} />
                <Field label="Location" value={data.contact.location} onChange={(value) => updateContact("location", value)} />
                <Field label="Availability heading" value={data.contact.availabilityHeading} onChange={(value) => updateContact("availabilityHeading", value)} />
                <Field label="Timezone" value={data.contact.timezone} onChange={(value) => updateContact("timezone", value)} />
                <Field label="Preference" value={data.contact.preference} onChange={(value) => updateContact("preference", value)} />
                <Field label="Status" value={data.contact.status} onChange={(value) => updateContact("status", value)} />
                <Field label="Reply text" value={data.contact.replyText} onChange={(value) => updateContact("replyText", value)} />
              </div>
              <TextBox label="Contact summary" value={data.contact.summary} onChange={(value) => updateContact("summary", value)} />
              <TextBox label="Availability summary" value={data.contact.availabilitySummary} onChange={(value) => updateContact("availabilitySummary", value)} />
              <ContactEditor title="Contact cards" items={data.contact.cards} setItems={(items) => updateContact("cards", items)} />
              <FixedSocialEditor items={data.contact.socialLinks} setItems={(items) => updateContact("socialLinks", items)} />
            </Panel>
          )}

          {active === "footer" && (
            <Panel title="Footer">
              <TextBox label="Footer description" value={data.footer.description} onChange={(value) => setData({ ...data, footer: { ...data.footer, description: value } })} />
              <Field label="Copyright" value={data.footer.copyright} onChange={(value) => setData({ ...data, footer: { ...data.footer, copyright: value } })} />
              <Field label="Built with text" value={data.footer.builtWith} onChange={(value) => setData({ ...data, footer: { ...data.footer, builtWith: value } })} />
            </Panel>
          )}
        </div>
      </div>
    </main>
  );

  function updateEducation(index: number, patch: Partial<EducationEntry>) {
    setData((current) => ({
      ...current,
      education: {
        ...current.education,
        entries: current.education.entries.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
      }
    }));
  }

  function updateCert(index: number, patch: Partial<PortfolioData["education"]["certifications"][number]>) {
    setData((current) => ({
      ...current,
      education: {
        ...current.education,
        certifications: current.education.certifications.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
      }
    }));
  }

  function updateTool(index: number, patch: Partial<ToolItem>) {
    setData((current) => ({
      ...current,
      tools: {
        ...current.tools,
        items: current.tools.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
      }
    }));
  }

  function updateBar(index: number, patch: Partial<PortfolioData["tools"]["bars"][number]>) {
    setData((current) => ({
      ...current,
      tools: {
        ...current.tools,
        bars: current.tools.bars.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
      }
    }));
  }

  function updateProject(index: number, patch: Partial<ProjectItem>) {
    setData((current) => ({
      ...current,
      projects: {
        ...current.projects,
        items: current.projects.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
      }
    }));
  }
}

function ListHeader({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
      <h3 className="text-lg font-bold text-text">{label}</h3>
      <button type="button" onClick={onAdd} className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm font-bold text-text hover:border-accent">
        Add <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function FixedSocialEditor({ items, setItems }: { items: SocialLink[]; setItems: (items: SocialLink[]) => void }) {
  const requiredIcons = ["Github", "Linkedin", "Instagram", "LeetCode"] as const;

  const fixedItems = requiredIcons.map(icon => {
    return items.find(item => item.icon === icon) || { label: icon, href: "https://", icon };
  });

  return (
    <div>
      <h3 className="text-lg font-bold text-text border-t border-line pt-5 mt-5">Global Social Links</h3>
      <div className="mt-4 space-y-4">
        {fixedItems.map((item, index) => (
          <div key={item.icon} className="rounded border border-line bg-bg p-4 flex items-center gap-4">
            <span className="w-24 font-bold text-text">{item.label}</span>
            <div className="flex-1">
              <input
                type="text"
                value={item.href}
                onChange={(e) => {
                  const newItems = [...fixedItems];
                  newItems[index] = { ...newItems[index], href: e.target.value };
                  setItems(newItems);
                }}
                placeholder="https://"
                className="h-11 w-full rounded border border-line bg-bg px-3 text-sm font-semibold text-text"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactEditor({ title, items, setItems }: { title: string; items: ContactCard[]; setItems: (items: ContactCard[]) => void }) {
  return (
    <div>
      <ListHeader label={title} onAdd={() => setItems([...items, blankContact])} />
      <div className="space-y-4">
        {items.map((item, index) => (
          <ItemShell key={`${item.label}-${index}`} title={item.label} onDelete={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Label" value={item.label} onChange={(value) => setItems(items.map((entry, itemIndex) => (itemIndex === index ? { ...entry, label: value } : entry)))} />
              <Field label="Value" value={item.value} onChange={(value) => setItems(items.map((entry, itemIndex) => (itemIndex === index ? { ...entry, value } : entry)))} />
              <Field label="Link" value={item.href} onChange={(value) => setItems(items.map((entry, itemIndex) => (itemIndex === index ? { ...entry, href: value } : entry)))} />
              <SelectField label="Icon" value={item.icon} options={contactIcons} onChange={(value) => setItems(items.map((entry, itemIndex) => (itemIndex === index ? { ...entry, icon: value } : entry)))} />
            </div>
          </ItemShell>
        ))}
      </div>
    </div>
  );
}
