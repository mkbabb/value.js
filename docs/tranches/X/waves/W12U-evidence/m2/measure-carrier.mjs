// SERVED MODEL: claude-opus-5-5
// X.W12U.m2 — A2-VA-X-2 seat-0 measurement (READ-ONLY): every carrier host's
// box, its ::before box (host rect + computed insets), the card, the hero
// ornament and the region column, with docSW, at one width × route.
// Usage: node measure-carrier.mjs <w> <h> <route> [theme]
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H, R, T] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844), process.argv[4] ?? "/", process.argv[5] ?? "light"];
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true });
await prepare(ctx, { theme: T, admin: R.startsWith("/admin"), palettes: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#" + R, { timeout: 120000 });
await p.waitForTimeout(6000);
const out = await p.evaluate(() => {
    const r = (e) => { const x = e.getBoundingClientRect(); return [Math.round(x.left * 10) / 10, Math.round(x.right * 10) / 10, Math.round(x.top), Math.round(x.bottom)]; };
    const hosts = [...document.querySelectorAll(".pane-wrapper, .pane-wrapper > div")].filter((e) => getComputedStyle(e, "::before").content !== "none" && getComputedStyle(e, "::before").backdropFilter !== "none");
    const carriers = hosts.map((h) => { const s = getComputedStyle(h, "::before"); const x = h.getBoundingClientRect(); return { host: h.className.split(" ").slice(0, 3).join("."), hostBox: r(h), before: [x.left + parseFloat(s.left), x.right - parseFloat(s.right)].map((v) => Math.round(v * 10) / 10), inset: s.left, ovf: getComputedStyle(h).overflowX }; });
    const one = (sel) => [...document.querySelectorAll(sel)].map((e) => ({ sel, cls: String(e.className?.baseVal ?? e.className).slice(0, 50), box: r(e), pos: getComputedStyle(e).position }));
    return { vw: innerWidth, docSW: document.documentElement.scrollWidth, bodySW: document.body.scrollWidth,
        carriers, cards: one(".pane-wrapper .glass-resting").slice(0, 4), orn: [...one(".hero-blob-anchor"), ...one("canvas.goo-blob-canvas")],
        container: one(".pane-container"), layout: one(".app-layout") };
});
console.log(JSON.stringify({ W, H, R, T, ...out }));
await b.close();
