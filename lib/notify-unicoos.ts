// Waitlist → UnicoOS lead inbox (S14, 2026-09-30).
//
// When UNICOOS_LEADS_ENABLED=1 and UNICOOS_URL are set, a waitlist signup
// (or an Ask Unico lead that left an email) is also POSTed to UnicoOS's
// /api/leads, where it lands in the /leads inbox and — only if UnicoOS has
// LEADS_TO_CRM=1 — in E1 Unico's own CRM. Off by default: with either env
// missing this does nothing and every waitlist works exactly as before.
//
// Rules this helper keeps:
//   - never throws, never slows a signup down by more than TIMEOUT_MS;
//   - never contacts the lead (UnicoOS doesn't either — it only files it);
//   - only an https URL (http only for localhost while developing);
//   - only the products UnicoOS's /api/leads accepts, and only with an email.
// — Fable

export const UNICOOS_LEAD_PRODUCTS = ["unicojam", "unicomusic", "unicotube", "unicoclip", "unicomobile", "askunico"] as const;
export type UnicoOSLeadProduct = (typeof UNICOOS_LEAD_PRODUCTS)[number];

export const TIMEOUT_MS = 4000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type UnicoOSLead = {
  product: UnicoOSLeadProduct;
  email: string;
  name?: string;
  useCase?: string;
  source?: string;
};

type Env = Record<string, string | undefined>;

/** The /api/leads URL to post to, or null when the hand-off is off or misconfigured. */
export function unicoosLeadsUrl(env: Env = process.env): string | null {
  if (env.UNICOOS_LEADS_ENABLED !== "1") return null;
  const raw = (env.UNICOOS_URL || "").trim();
  if (!raw) return null;
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  const local = u.hostname === "localhost" || u.hostname === "127.0.0.1";
  if (u.protocol !== "https:" && !(u.protocol === "http:" && local)) return null;
  return `${u.origin}/api/leads`;
}

/** The exact body sent to UnicoOS, or null when this lead can't be sent. */
export function unicoosLeadBody(lead: UnicoOSLead): Record<string, string> | null {
  if (!(UNICOOS_LEAD_PRODUCTS as readonly string[]).includes(lead.product)) return null;
  const email = String(lead.email || "").trim().slice(0, 160);
  if (!EMAIL_RE.test(email)) return null;
  const body: Record<string, string> = { product: lead.product, email };
  const name = String(lead.name || "").trim().slice(0, 120);
  if (name) body.name = name; // UnicoOS derives one from the email when missing
  const useCase = String(lead.useCase || "").trim().slice(0, 500);
  if (useCase) body.useCase = useCase;
  body.source = `e1unico-site:${String(lead.source || lead.product).trim().slice(0, 80)}`;
  return body;
}

/** POST the lead to UnicoOS. True only when UnicoOS answered 2xx; false when off, invalid, slow or failing. */
export async function notifyUnicoOS(lead: UnicoOSLead, env: Env = process.env, fetchImpl: typeof fetch = fetch): Promise<boolean> {
  try {
    const url = unicoosLeadsUrl(env);
    const body = url ? unicoosLeadBody(lead) : null;
    if (!url || !body) return false;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const r = await fetchImpl(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      return r.ok;
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return false;
  }
}
