// Central place to wire up real links as they become available —
// edit the `url` fields below and every page on the site updates.

export type SocialLink = {
  name: string;
  emoji: string;
  url: string; // leave empty until the handle exists — renders as "coming soon"
};

export const SOCIALS: SocialLink[] = [
  { name: "Instagram", emoji: "📷", url: "" },
  { name: "TikTok", emoji: "🎵", url: "" },
  { name: "YouTube", emoji: "▶️", url: "" },
  { name: "X", emoji: "✕", url: "" },
  { name: "LinkedIn", emoji: "💼", url: "" },
  { name: "Facebook", emoji: "📘", url: "" },
];

export const CONTACT_EMAIL = "unicoonline@gmail.com";

export type Venture = {
  name: string;
  tag: string;
  desc: string;
  url: string;
  logo?: string;
  emoji?: string;
  accent: string;
};

export const VENTURES: Venture[] = [
  {
    name: "E1 Unico Corporation",
    tag: "Business Launch & Consulting · BBB Accredited",
    desc: "The company I founded to help everyday people launch real, registered businesses — fast.",
    url: "https://e1unico.com",
    logo: "/e1unico-logo.jpg",
    accent: "rgba(201,168,76,0.28)",
  },
  {
    name: "UnicoOS",
    tag: "Business Operating System · SaaS Platform",
    desc: "The all-in-one platform I built to run every part of a business from one login.",
    url: "https://unicoos.app",
    logo: "/unicoos-logo.jpg",
    accent: "rgba(79,70,229,0.28)",
  },
  {
    name: "UnicoJam",
    tag: "AI Music Studio · Launching Soon",
    desc: "Turn a prompt into a finished song. Faith-friendly by design.",
    url: "https://e1unico.com/unicojam",
    emoji: "🎵",
    accent: "rgba(124,58,237,0.28)",
  },
  {
    name: "Industrial Drip",
    tag: "PPE & Safety Gear · E-Commerce",
    desc: "Premium protective equipment for industrial workers.",
    url: "https://IndustrialDrip.Net",
    logo: "/industrial-drip-logo.jpg",
    accent: "rgba(185,28,28,0.28)",
  },
];
