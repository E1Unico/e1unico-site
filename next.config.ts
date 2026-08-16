import type { NextConfig } from "next";
import { MANUEL_HOSTS } from "./lib/hosts";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return {
      // Runs before filesystem routes so /manuel/* stays reachable
      // directly on the primary e1unico.com domain too (useful for previews).
      // Skip API routes, Next internals, requests already under /manuel
      // (avoids double-prefixing, e.g. the auto-generated opengraph-image
      // route), and anything that looks like a static asset (has a dot) so
      // files in /public keep resolving normally.
      beforeFiles: MANUEL_HOSTS.map((host) => ({
        source: "/:path((?!api/|_next/|manuel(?:/|$)|.*\\..*).*)",
        has: [{ type: "host" as const, value: host }],
        destination: "/manuel/:path",
      })),
    };
  },
};

export default nextConfig;
