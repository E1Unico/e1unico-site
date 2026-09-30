// Run: npm run test:notify-unicoos   (node --experimental-strip-types) — Fable, 2026-09-30
// The waitlist → UnicoOS hand-off: off unless both env vars are set, https
// only, only products + emails UnicoOS accepts, never throws, gives up fast.
import { unicoosLeadsUrl, unicoosLeadBody, notifyUnicoOS, TIMEOUT_MS } from "../lib/notify-unicoos.ts";

let fails = 0;
const ok = (name, cond) => { if (!cond) { fails++; console.log(`FAIL ${name}`); } else console.log(`ok   ${name}`); };
const ON = { UNICOOS_LEADS_ENABLED: "1", UNICOOS_URL: "https://unicoos.app" };

// ── The switch ──────────────────────────────────────────────────────────
ok("off by default (no env)", unicoosLeadsUrl({}) === null);
ok("URL alone does nothing", unicoosLeadsUrl({ UNICOOS_URL: "https://unicoos.app" }) === null);
ok("flag alone does nothing", unicoosLeadsUrl({ UNICOOS_LEADS_ENABLED: "1" }) === null);
ok("flag must be exactly '1'", unicoosLeadsUrl({ ...ON, UNICOOS_LEADS_ENABLED: "true" }) === null);
ok("on → <origin>/api/leads", unicoosLeadsUrl(ON) === "https://unicoos.app/api/leads");
ok("a path or trailing slash in UNICOOS_URL is ignored", unicoosLeadsUrl({ ...ON, UNICOOS_URL: "https://unicoos.app/some/path/" }) === "https://unicoos.app/api/leads");
ok("plain http refused", unicoosLeadsUrl({ ...ON, UNICOOS_URL: "http://unicoos.app" }) === null);
ok("http://localhost allowed for development", unicoosLeadsUrl({ ...ON, UNICOOS_URL: "http://localhost:3000" }) === "http://localhost:3000/api/leads");
ok("garbage URL refused", unicoosLeadsUrl({ ...ON, UNICOOS_URL: "not a url" }) === null);

// ── What gets sent ─────────────────────────────────────────────────────
const b = unicoosLeadBody({ product: "unicojam", email: "  fan@example.com ", name: "Ana", useCase: "Use case: church", source: "unicojam-waitlist" });
ok("body: product, trimmed email, name, use case, tagged source", JSON.stringify(b) === JSON.stringify({ product: "unicojam", email: "fan@example.com", name: "Ana", useCase: "Use case: church", source: "e1unico-site:unicojam-waitlist" }));
ok("body: no name → the name key is left out (UnicoOS derives one)", !("name" in unicoosLeadBody({ product: "unicotube", email: "a@b.co" })));
ok("body: empty use case is left out", !("useCase" in unicoosLeadBody({ product: "unicotube", email: "a@b.co", useCase: "   " })));
ok("body: a phone number as the 'email' (Ask Unico) → nothing sent", unicoosLeadBody({ product: "askunico", email: "281-555-0100" }) === null);
ok("body: unknown product → nothing sent", unicoosLeadBody({ product: "unicoguard", email: "a@b.co" }) === null);
ok("body: long fields are capped", unicoosLeadBody({ product: "askunico", email: "a@b.co", name: "x".repeat(500), useCase: "y".repeat(5000) }).name.length === 120);
ok("body: nothing but these keys ever leaves the site", Object.keys(unicoosLeadBody({ product: "askunico", email: "a@b.co", name: "N", useCase: "U", source: "S", phone: "1", transcript: "t" })).sort().join() === "email,name,product,source,useCase");

// ── Sending ────────────────────────────────────────────────────────────
const calls = [];
const fakeFetch = (status) => async (url, init) => { calls.push({ url, init }); return { ok: status >= 200 && status < 300, status }; };
calls.length = 0;
ok("off → false and no request", (await notifyUnicoOS({ product: "unicojam", email: "a@b.co" }, {}, fakeFetch(200))) === false && calls.length === 0);
ok("invalid lead → false and no request", (await notifyUnicoOS({ product: "unicojam", email: "nope" }, ON, fakeFetch(200))) === false && calls.length === 0);
ok("on + valid → true on 200", (await notifyUnicoOS({ product: "unicojam", email: "a@b.co" }, ON, fakeFetch(200))) === true);
const sent = calls.at(-1);
ok("POST JSON to /api/leads with an abort signal", sent.url === "https://unicoos.app/api/leads" && sent.init.method === "POST" && sent.init.headers["Content-Type"] === "application/json" && !!sent.init.signal && JSON.parse(sent.init.body).product === "unicojam");
ok("UnicoOS 400/500 → false", (await notifyUnicoOS({ product: "unicojam", email: "a@b.co" }, ON, fakeFetch(500))) === false);
ok("network error → false, never throws", (await notifyUnicoOS({ product: "unicojam", email: "a@b.co" }, ON, async () => { throw new Error("down"); })) === false);
const hang = (url, init) => new Promise((_, reject) => init.signal.addEventListener("abort", () => reject(new Error("aborted"))));
const t0 = Date.now();
const slow = await notifyUnicoOS({ product: "unicojam", email: "a@b.co" }, ON, hang);
const took = Date.now() - t0;
ok(`a hanging UnicoOS gives up after ~${TIMEOUT_MS}ms and returns false`, slow === false && took >= TIMEOUT_MS - 50 && took < TIMEOUT_MS + 1500);

if (fails) { console.log(`\n${fails} notify-unicoos test(s) failed`); process.exit(1); }
console.log("\nall notify-unicoos tests passed");
