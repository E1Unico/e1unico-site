import type { NextRequest } from "next/server";
import { forSaleHostsFromEnv, matchForSaleHost, renderForSalePage, visitorPath } from "../../../lib/for-sale";

// The "this domain is for sale" page (2026-10-26). Only reached through the host rewrites in
// next.config.ts, which exist only for the domains named in FOR_SALE_HOSTS; anywhere else
// (e1unico.com/forsale, a preview URL) the host is not listed and this answers 404.
// A route handler returns a complete HTML document, so none of the site's layout, scripts,
// icons or chat widget is part of the page. What the visitor asked for is read from the URL
// (the rewrite keeps it), not from route parameters.

export const dynamic = "force-dynamic";

const SECURITY = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
};

const notFound = () => new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", ...SECURITY } });

export async function GET(req: NextRequest) {
  const hosts = forSaleHostsFromEnv();
  const site = matchForSaleHost(req.headers.get("host"), hosts);
  if (!site) return notFound();
  const path = visitorPath(req.nextUrl.pathname);
  if (path === "/") {
    return new Response(renderForSalePage(site, hosts, process.env.FOR_SALE_ALIAS_LOCAL), {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=600", ...SECURITY },
    });
  }
  if (path === "/robots.txt") {
    return new Response("User-agent: *\nAllow: /\n", { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, s-maxage=3600", ...SECURITY } });
  }
  return notFound();
}

export async function HEAD(req: NextRequest) {
  const r = await GET(req);
  return new Response(null, { status: r.status, headers: r.headers });
}
