import type { MetadataRoute } from "next";

// PWA web manifest — makes the site installable and gives Android/Chrome a
// proper name, theme, and icons (the icon PNGs already live in /public).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "E1 Unico Corporation",
    short_name: "E1 Unico",
    description:
      "BBB Accredited business launch & consulting, and the Unico app ecosystem — UnicoOS, UnicoJam, UnicoClip, UnicoMusic, UnicoTube, and UnicoMobile.",
    start_url: "/",
    display: "standalone",
    background_color: "#05050a",
    theme_color: "#05050a",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
