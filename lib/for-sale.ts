// "This domain is for sale" pages (2026-10-26).
//
// A few domain names can be pointed at this project and show ONE plain page: the name, "for sale",
// and a private offer form. The page is a self-contained HTML document built here (no site layout,
// no analytics or ads script, no chat widget, no favicon, no mention of who owns it), and an offer
// goes to the owner's private channels (see app/api/forsale-offer/route.ts); the owner's name,
// company and email are never on the page or in any response.
//
// THE DOMAIN NAMES ARE NOT IN THIS REPOSITORY (it is public). They come from the environment:
//   FOR_SALE_HOSTS         comma list, e.g. "first.example,second.example=Second.example"
//                          ("host" or "host=Display": the display form may only change letter case).
//                          The www. form of each is served too.
//   FOR_SALE_ALIAS_LOCAL   optional, e.g. "offers": the page then also shows offers@<the domain>
//                          (only set it once mail to that address is forwarded somewhere).
// With FOR_SALE_HOSTS empty nothing changes anywhere: no rewrite exists and the routes answer 404.
//
// Pure helpers only (no Next imports) so tests/for-sale.test.mjs can run them directly.

export type ForSaleHost = { host: string; display: string };

type Env = Record<string, string | undefined>;

const HOST_RE = /^(?=.{3,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁠-⁤⁦-⁩﻿]/g;

export const OFFER_LIMITS = { email: 160, message: 1000, minAmount: 1, maxAmount: 100_000_000 } as const;

/** The domains named in FOR_SALE_HOSTS (apex form, lower case, valid host names only, no repeats). */
export function parseForSaleHosts(raw: string | undefined): ForSaleHost[] {
  const out: ForSaleHost[] = [];
  for (const part of String(raw ?? "").split(",")) {
    const [hostPart, displayPart] = part.split("=");
    const host = String(hostPart ?? "").trim().toLowerCase().replace(/^www\./, "");
    if (!HOST_RE.test(host) || out.some((h) => h.host === host)) continue;
    const display = String(displayPart ?? "").trim();
    out.push({ host, display: display && display.toLowerCase() === host ? display : host });
  }
  return out;
}

export function forSaleHostsFromEnv(env: Env = process.env): ForSaleHost[] {
  return parseForSaleHosts(env.FOR_SALE_HOSTS);
}

/** The listed domain a Host header (or an Origin's host) belongs to, with or without www. and a port; null when it is none of them. */
export function matchForSaleHost(hostHeader: string | null | undefined, hosts: ForSaleHost[]): ForSaleHost | null {
  const h = String(hostHeader ?? "").trim().toLowerCase().replace(/:\d+$/, "").replace(/^www\./, "");
  return hosts.find((x) => x.host === h) ?? null;
}

/** The path the visitor asked for: the rewrite keeps their URL, and a request that arrives already under /forsale is read the same way. */
export function visitorPath(pathname: string): string {
  const p = String(pathname || "/").replace(/^\/forsale(?=\/|$)/, "");
  return p.replace(/\/+$/, "") || "/";
}

type Rewrite = { source: string; destination: string; has: { type: "host"; value: string }[] };

/** The next.config.ts rewrites that send every path on a listed domain (and its www.) to the for-sale handler, except the offer endpoint. */
export function forSaleRewrites(raw: string | undefined): Rewrite[] {
  const out: Rewrite[] = [];
  for (const { host } of parseForSaleHosts(raw)) {
    for (const name of [host, `www.${host}`]) {
      const has = [{ type: "host" as const, value: name.replace(/\./g, "\\.") }];
      out.push({ source: "/", destination: "/forsale", has });
      out.push({ source: "/:path((?!api/forsale-offer$).+)", destination: "/forsale/:path", has });
    }
  }
  return out;
}

// ── What an offer looks like ─────────────────────────────────────────────────

export type Offer = { email: string; amount: number; message: string };
export type OfferResult = { ok: true; offer: Offer } | { ok: false; error: string; silent?: boolean };

const clean = (v: unknown, max: number) => String(v ?? "").replace(CONTROL_RE, " ").replace(/[ \t]+/g, " ").trim().slice(0, max);

/** An offer from the page's form: a real email to answer, an amount in dollars, an optional note. A filled-in hidden field marks a robot and is dropped without an answer. */
export function parseOffer(body: unknown): OfferResult {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  if (String(b.website ?? "").trim() !== "") return { ok: false, error: "", silent: true };
  const email = clean(b.email, OFFER_LIMITS.email);
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter an email address where you can be reached." };
  const rawAmount = typeof b.offer === "number" ? String(b.offer) : String(b.offer ?? "").replace(/[$,\s]/g, "");
  const amount = /^\d{1,9}(\.\d{1,2})?$/.test(rawAmount) ? Number(rawAmount) : NaN;
  if (!Number.isFinite(amount) || amount < OFFER_LIMITS.minAmount || amount > OFFER_LIMITS.maxAmount) {
    return { ok: false, error: "Please enter your offer in US dollars, for example 2500." };
  }
  const message = String(b.message ?? "").replace(/\r\n?/g, "\n").replace(CONTROL_RE, " ").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, OFFER_LIMITS.message);
  return { ok: true, offer: { email, amount: Math.round(amount * 100) / 100, message } };
}

export const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

/** The plain-text note the owner receives. Only what the buyer typed, the domain they wrote to and the time. */
export function offerText(domain: string, offer: Offer, when: string): string {
  return [
    `Domain offer for ${domain}`,
    `Offer: ${usd(offer.amount)}`,
    `Reply to: ${offer.email}`,
    offer.message ? `Message: ${offer.message}` : "Message: (none)",
    `When: ${when}`,
  ].join("\n");
}

export const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// ── A small per-instance limiter (best effort on serverless: it slows a flood, the real limits are the channels') ──

export function createLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return {
    /** True when this call is allowed; false once `max` calls have been made inside the window. */
    hit(key: string, now: number = Date.now()): boolean {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (hits.size > 5000) hits.clear();
      if (recent.length >= max) { hits.set(key, recent); return false; }
      recent.push(now);
      hits.set(key, recent);
      return true;
    },
  };
}

export function clientIp(headers: { get(name: string): string | null }): string {
  const fwd = headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : headers.get("x-real-ip") || "unknown").trim().slice(0, 64) || "unknown";
}

// ── The page ─────────────────────────────────────────────────────────────────

const STYLE = `
:root{color-scheme:light dark;--bg:#f6f7f9;--card:#fff;--fg:#14171c;--muted:#4a5260;--line:#c9ced8;--accent:#1d4ed8;--accent-fg:#fff;--ok:#0b6b3a;--err:#a11a1a}
@media(prefers-color-scheme:dark){:root{--bg:#0d1016;--card:#161a22;--fg:#f1f3f7;--muted:#aab2c0;--line:#343b48;--accent:#6ea0ff;--accent-fg:#06122b;--ok:#6ee7a0;--err:#ff9a9a}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px;background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
main{width:100%;max-width:520px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:24px}
.tag{display:inline-block;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);border:1px solid var(--accent);border-radius:999px;padding:2px 12px}
h1{margin:12px 0 4px;font-size:clamp(26px,8vw,38px);line-height:1.15;overflow-wrap:anywhere}
p{margin:8px 0;color:var(--muted)}
label{display:block;margin-top:16px;font-weight:600;color:var(--fg)}
input,textarea{display:block;width:100%;margin-top:6px;min-height:48px;padding:10px 12px;font:inherit;color:var(--fg);background:transparent;border:2px solid var(--line);border-radius:10px}
textarea{min-height:104px;resize:vertical}
input:focus-visible,textarea:focus-visible,button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.hint{font-size:14px;font-weight:400;color:var(--muted)}
button{margin-top:20px;width:100%;min-height:52px;font:inherit;font-weight:700;color:var(--accent-fg);background:var(--accent);border:0;border-radius:10px;cursor:pointer}
button:disabled{opacity:.6;cursor:wait}
#status{margin-top:16px;font-weight:600}.ok{color:var(--ok)}.err{color:var(--err)}
.hp{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}
.also{margin-top:20px;font-size:14px}
`;

const SCRIPT = `
var f=document.getElementById('offer'),s=document.getElementById('status'),b=f.querySelector('button');
f.addEventListener('submit',function(e){e.preventDefault();s.textContent='';s.className='';b.disabled=true;
var d={};new FormData(f).forEach(function(v,k){d[k]=v});
fetch('/api/forsale-offer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
.then(function(r){return r.json().catch(function(){return{}}).then(function(j){return{r:r,j:j}})})
.then(function(x){if(x.r.ok&&x.j.ok){f.hidden=true;s.textContent='Thank you. Your offer was sent. If it is a fit, you will get a reply at the email you gave.';s.className='ok'}
else{s.textContent=x.j.error||'Something went wrong. Please try again.';s.className='err';b.disabled=false}})
.catch(function(){s.textContent='Could not send. Check your connection and try again.';s.className='err';b.disabled=false})});
`;

/** The complete HTML document for one listed domain. `others` are the other listed domains (shown as "also for sale"); `alias` is the optional forwarded address. */
export function renderForSalePage(site: ForSaleHost, others: ForSaleHost[] = [], aliasLocal?: string): string {
  const name = escapeHtml(site.display);
  const also = others.filter((o) => o.host !== site.host);
  const aliasOk = aliasLocal && /^[a-z0-9._-]{1,40}$/i.test(aliasLocal) ? `${aliasLocal.toLowerCase()}@${site.host}` : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>${name} is for sale</title>
<meta name="description" content="${name} is for sale. Make an offer.">
<link rel="icon" href="data:,">
<style>${STYLE}</style>
</head>
<body>
<main>
<span class="tag">For sale</span>
<h1>${name}</h1>
<p>This domain name is for sale. Send your offer below. Offers are private and go straight to the owner.</p>
<form id="offer" method="post" action="/api/forsale-offer" novalidate>
<label for="email">Your email<span class="hint"> (so the owner can reply)</span></label>
<input id="email" name="email" type="email" autocomplete="email" inputmode="email" maxlength="${OFFER_LIMITS.email}" required>
<label for="offer-amount">Your offer in US dollars</label>
<input id="offer-amount" name="offer" type="text" inputmode="decimal" autocomplete="off" placeholder="2500" maxlength="14" required>
<label for="message">Message<span class="hint"> (optional)</span></label>
<textarea id="message" name="message" maxlength="${OFFER_LIMITS.message}"></textarea>
<div class="hp" aria-hidden="true"><label>Leave this empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label></div>
<button type="submit">Send my offer</button>
</form>
<p id="status" role="status" aria-live="polite"></p>${aliasOk ? `\n<p class="also">Or email your offer to ${escapeHtml(aliasOk)}.</p>` : ""}${also.length ? `\n<p class="also">Also for sale: ${also.map((o) => escapeHtml(o.display)).join(", ")}</p>` : ""}
</main>
<script>${SCRIPT}</script>
</body>
</html>
`;
}

/** A tiny page for a visitor whose browser posted the form without scripts. */
export function renderMessagePage(site: ForSaleHost, title: string, text: string): string {
  const name = escapeHtml(site.display);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="referrer" content="no-referrer">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)}</title>
<link rel="icon" href="data:,">
<style>${STYLE}</style>
</head>
<body>
<main>
<span class="tag">${name}</span>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(text)}</p>
<p><a href="/">Back</a></p>
</main>
</body>
</html>
`;
}
