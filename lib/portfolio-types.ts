export type LinkItem = {
  label: string;
  href: string;
};

export type SocialLink = LinkItem & {
  icon: "Github" | "Linkedin" | "Instagram" | "Code2" | "LeetCode";
};

export type ContactCard = {
  icon: "Mail" | "Phone" | "MapPin";
  label: string;
  value: string;
  href: string;
};

export type EducationEntry = {
  title: string;
  institution: string;
  year: string;
  score: number;
  label: string;
  subjects: string[];
};

export type Certification = {
  name: string;
  body: string;
  year: string;
  verifyHref: string;
};

export type ToolItem = {
  name: string;
  category: string;
  level: number;
  years: string;
  icon: "Cloud" | "Code2" | "Database" | "Figma" | "GitBranch" | "Layers3" | "Server" | "Sparkles" | "Terminal" | "Wind";
};

export type SkillBar = {
  label: string;
  value: number;
};

export type ProjectItem = {
  title: string;
  label: string;
  image: string;
  description: string;
  stack: string[];
  highlights: string[];
  metric: string;
  status: string;
  type: string;
  liveHref: string;
  sourceHref: string;
};

export type PortfolioData = {
  site: {
    initials: string;
    ownerName: string;
    title: string;
    description: string;
    navCtaLabel: string;
  };
  hero: {
    availableLabel: string;
    greeting: string;
    name: string;
    roles: string[];
    summary: string;
    image: string;
    primaryCta: LinkItem;
    resumeCta: LinkItem;
  };
  about: {
    overline: string;
    heading: string;
    paragraphs: string[];
    profileLabel: string;
    profileName: string;
    codeFocus: string;
    codeStyle: string;
    stack: string[];
    currentBuildingLabel: string;
    quickDetails: ContactCard[];
    availabilityText: string;
  };
  education: {
    overline: string;
    heading: string;
    entries: EducationEntry[];
    certifications: Certification[];
  };
  tools: {
    overline: string;
    heading: string;
    tabs: string[];
    items: ToolItem[];
    bars: SkillBar[];
    exploringLabel: string;
    exploring: string[];
  };
  projects: {
    overline: string;
    heading: string;
    summary: string;
    items: ProjectItem[];
  };
  contact: {
    overline: string;
    heading: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    cards: ContactCard[];
    socialLinks: SocialLink[];
    availabilityHeading: string;
    availabilitySummary: string;
    timezone: string;
    preference: string;
    status: string;
    replyText: string;
  };
  footer: {
    description: string;
    copyright: string;
    builtWith: string;
  };
};
