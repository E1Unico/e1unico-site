// Run: npm run test:for-sale   (node --experimental-strip-types)
// The "this domain is for sale" pages: which hosts count, what the rewrites cover, what an offer must look like,
// and that the page names nobody. Example hosts only: no real domain is written in this repository.
import {
  parseForSaleHosts, matchForSaleHost, forSaleRewrites, visitorPath, parseOffer, offerText, usd, renderForSalePage, renderMessagePage, createLimiter, clientIp, escapeHtml,
} from "../lib/for-sale.ts";

let fails = 0;
const ok = (name, cond) => { if (!cond) { fails++; console.log(`FAIL ${name}`); } else console.log(`ok   ${name}`); };

// ── Which hosts ─────────────────────────────────────────────────────────
const RAW = "alpha-sale.test=Alpha-Sale.test, www.beta-sale.test ,bad host,nodot,alpha-sale.test,gamma.test=Different.test,-x.test";
const hosts = parseForSaleHosts(RAW);
ok("hosts: valid names only, www. dropped, no repeats", hosts.map((h) => h.host).join() === "alpha-sale.test,beta-sale.test,gamma.test");
ok("hosts: a display form may only change letter case", hosts[0].display === "Alpha-Sale.test" && hosts[1].display === "beta-sale.test" && hosts[2].display === "gamma.test");
ok("hosts: nothing set → nothing listed", parseForSaleHosts(undefined).length === 0 && parseForSaleHosts("").length === 0 && parseForSaleHosts(" , ,").length === 0);
ok("match: exact, www., upper case and a port all find the same entry", ["alpha-sale.test", "www.alpha-sale.test", "ALPHA-SALE.TEST", "alpha-sale.test:3000"].every((h) => matchForSaleHost(h, hosts)?.host === "alpha-sale.test"));
ok("match: any other host, an empty one and a look-alike are not listed", [null, undefined, "", "e1unico.test", "xalpha-sale.test", "alpha-sale.test.evil.test", "sub.alpha-sale.test"].every((h) => matchForSaleHost(h, hosts) === null));

// ── Rewrites ────────────────────────────────────────────────────────────
const rw = forSaleRewrites(RAW);
ok("rewrites: none when nothing is listed", forSaleRewrites(undefined).length === 0 && forSaleRewrites("").length === 0);
ok("rewrites: four per domain (root and every other path, with and without www.)", rw.length === 12);
ok("rewrites: the host value escapes its dots", rw.every((r) => r.has[0].type === "host" && !/[^\\]\./.test(r.has[0].value)));
ok("rewrites: everything goes to the for-sale handler", rw.every((r) => r.destination === "/forsale" || r.destination === "/forsale/:path"));
const pathRule = rw.find((r) => r.source !== "/");
const re = new RegExp(`^${pathRule.source.replace("/:path(", "/(").replace(/^\//, "\\/")}$`);
ok("rewrites: the offer endpoint is the one path that is not rewritten", !re.test("/api/forsale-offer") && re.test("/api/checkout") && re.test("/robots.txt") && re.test("/favicon.ico") && re.test("/a/b/c") && re.test("/_next/static/x.js"));

ok("visitor path: root, robots and other paths read the same with or without /forsale in front", visitorPath("/") === "/" && visitorPath("/forsale") === "/" && visitorPath("/forsale/") === "/" && visitorPath("/robots.txt") === "/robots.txt" && visitorPath("/forsale/robots.txt") === "/robots.txt" && visitorPath("/forsalex") === "/forsalex" && visitorPath("/a/b/") === "/a/b" && visitorPath("") === "/");

// ── An offer ────────────────────────────────────────────────────────────
const good = parseOffer({ email: " buyer@example.test ", offer: "$2,500", message: "  Line one\r\n\r\n\r\n\r\nLine two  " });
ok("offer: trimmed email, dollars with $ and commas read, note tidied", good.ok && good.offer.email === "buyer@example.test" && good.offer.amount === 2500 && good.offer.message === "Line one\n\nLine two");
ok("offer: a number and cents are fine", parseOffer({ email: "a@b.co", offer: 99.5 }).offer.amount === 99.5 && parseOffer({ email: "a@b.co", offer: "1000.25" }).offer.amount === 1000.25);
ok("offer: no email, a bad email or a phone number is refused", ["", "nope", "281-555-0100", "a@b"].every((e) => !parseOffer({ email: e, offer: "100" }).ok));
ok("offer: zero, negative, words, too many digits and too much are refused", ["0", "-5", "lots", "1e6", "1,0000000000", "100000001", "12.345", ""].every((o) => !parseOffer({ email: "a@b.co", offer: o }).ok));
ok("offer: the hidden field filled in marks a robot, dropped silently", (() => { const r = parseOffer({ email: "a@b.co", offer: "100", website: "http://spam.test" }); return !r.ok && r.silent === true; })());
ok("offer: a note is cut at its limit and loses control and direction characters", (() => { const r = parseOffer({ email: "a@b.co", offer: "100", message: "x".repeat(5000) + "‮\u0000" }); return r.ok && r.offer.message.length === 1000; })());
ok("offer: odd bodies never throw", [null, undefined, 5, "text", [], {}].every((b) => parseOffer(b).ok === false));
ok("offer text: the domain, the amount, the reply address, the note and the time — nothing else", (() => { const t = offerText("Alpha-Sale.test", good.offer, "2026-10-26T00:00:00.000Z"); return t === "Domain offer for Alpha-Sale.test\nOffer: $2,500\nReply to: buyer@example.test\nMessage: Line one\n\nLine two\nWhen: 2026-10-26T00:00:00.000Z"; })());
ok("usd: whole dollars have no cents, others have two", usd(2500) === "$2,500" && usd(99.5) === "$99.50");

// ── The page names nobody ───────────────────────────────────────────────
const page = renderForSalePage(hosts[0], hosts, "offers");
ok("page: a whole document with the domain in the title and the heading", page.startsWith("<!doctype html>") && page.includes("<title>Alpha-Sale.test is for sale</title>") && page.includes("<h1>Alpha-Sale.test</h1>"));
ok("page: a form that posts an email, an offer and a note (and a hidden field)", ["name=\"email\"", "name=\"offer\"", "name=\"message\"", "name=\"website\"", "action=\"/api/forsale-offer\""].every((s) => page.includes(s)));
ok("page: no outside script, stylesheet, font, image or link, and no icon of the site", !/<script[^>]*\ssrc=/i.test(page) && !/<link[^>]*rel="(stylesheet|preload|manifest|apple-touch-icon)"/i.test(page) && !/https?:\/\//i.test(page.replace(/<[^>]*>/g, (m) => m)) && page.includes('rel="icon" href="data:,"'));
ok("page: no owner, company, brand, address or ad id anywhere", !/unico|e1 |e1unico|manuel|montemayor|ca-pub|adsbygoogle|ninja|@e1|gmail|llc|corporation|inc\./i.test(page));
ok("page: the optional address is offers@<this domain> only when asked for, the other domain is listed", page.includes("offers@alpha-sale.test") && page.includes("Also for sale: beta-sale.test, gamma.test") && !renderForSalePage(hosts[0], [hosts[0]]).includes("@alpha-sale.test") && !renderForSalePage(hosts[0], [hosts[0]]).includes("Also for sale"));
ok("page: an odd alias is ignored", !renderForSalePage(hosts[0], hosts, "a b<script>").includes("<script>a") && !renderForSalePage(hosts[0], hosts, "x@y").includes("@alpha"));
ok("page: markup in a display name cannot get out", !renderForSalePage({ host: "x.test", display: '<img src=x onerror=alert(1)>' }).includes("<img"));
const msg = renderMessagePage(hosts[0], "Thank you", "Your offer <b>was</b> sent.");
ok("message page: escaped, not indexed, no owner", msg.includes("&lt;b&gt;") && msg.includes('name="robots" content="noindex"') && !/unico|e1/i.test(msg));
ok("escapeHtml: the five characters", escapeHtml(`<>&"'`) === "&lt;&gt;&amp;&quot;&#39;");

// ── The limiter and the address ─────────────────────────────────────────
const lim = createLimiter(2, 1000);
ok("limiter: two pass, the third waits, and it frees after the window", lim.hit("a", 0) && lim.hit("a", 10) && !lim.hit("a", 20) && lim.hit("b", 20) && lim.hit("a", 1100));
const hdr = (o) => ({ get: (n) => o[n] ?? null });
ok("client ip: the first forwarded address, else real-ip, else unknown", clientIp(hdr({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" })) === "1.2.3.4" && clientIp(hdr({ "x-real-ip": "9.9.9.9" })) === "9.9.9.9" && clientIp(hdr({})) === "unknown");

console.log(fails ? `\n${fails} FAILED` : "\nall for-sale tests passed");
process.exit(fails ? 1 : 0);
