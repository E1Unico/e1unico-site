import type { NextConfig } from "next";
import { MANUEL_HOSTS } from "./lib/hosts";
import { forSaleRewrites } from "./lib/for-sale";

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
      beforeFiles: [
        ...MANUEL_HOSTS.map((host) => ({
          source: "/:path((?!api/|_next/|manuel(?:/|$)|.*\\..*).*)",
          has: [{ type: "host" as const, value: host }],
          destination: "/manuel/:path",
        })),
        // The "for sale" domains named in the FOR_SALE_HOSTS environment variable (none in this
        // file on purpose: the repository is public). Every path on them, assets and API included,
        // goes to the one for-sale handler; only the offer endpoint passes through. Empty = no rules.
        ...forSaleRewrites(process.env.FOR_SALE_HOSTS),
      ],
    };
  },
};

export default nextConfig;
