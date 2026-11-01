// Central place to wire up real links as they become available —
// edit the `url` fields below and every page on the site updates.

export type SocialLink = {
  name: string;
  emoji: string;
  url: string; // leave empty until the handle exists — renders as "coming soon"
};

export const SOCIALS: SocialLink[] = [
  { name: "Instagram", emoji: "📷", url: "https://instagram.com/UnicoOnline" },
  { name: "TikTok", emoji: "🎵", url: "https://tiktok.com/@UnicoOnline" },
  { name: "YouTube", emoji: "▶️", url: "https://youtube.com/@UnicoOnline" },
  { name: "X", emoji: "✕", url: "https://x.com/UnicoOnline" },
  { name: "LinkedIn", emoji: "💼", url: "https://linkedin.com/in/UnicoOnline" },
  { name: "Facebook", emoji: "📘", url: "https://facebook.com/UnicoOnline" },
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
    desc: "The all-in-one platform I built to run every part of a business — CRM, AI receptionist, even its own social network — from one login.",
    url: "https://unicoos.app",
    logo: "/unicoos-logo.jpg",
    accent: "rgba(79,70,229,0.28)",
  },
  {
    name: "UnicoJam",
    tag: "AI Music Studio · Launching Soon",
    desc: "Turn a prompt into a finished song. Every genre welcome.",
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
  {
    name: "UnicoCard",
    tag: "Tap-to-Share Smart Business Card",
    desc: "One tap sends your contact and links to any phone and captures the lead.",
    url: "https://unicocard.com",
    emoji: "💳",
    accent: "rgba(14,165,233,0.28)",
  },
  {
    name: "UnicoTrust",
    tag: "Security & Compliance Automation",
    desc: "SOC 2, HIPAA, GDPR and ISO 27001 automation for growing businesses.",
    url: "https://unicotrust.com",
    emoji: "🛡️",
    accent: "rgba(16,185,129,0.28)",
  },
  {
    name: "Unico Wireless",
    tag: "Business Phone Lines · Coming Soon",
    desc: "Team phone lines managed inside UnicoOS.",
    url: "https://unicowireless.com",
    emoji: "📶",
    accent: "rgba(56,189,248,0.28)",
  },
  {
    name: "Feast and Fun",
    tag: "Feast and Fun LLC",
    desc: "One of my companies.",
    url: "https://feastandfun.com",
    emoji: "🎉",
    accent: "rgba(244,114,182,0.28)",
  },
];
