import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
const reqs = [];
const errs = [];
page.on("request", (r) => { const u = new URL(r.url()); if (u.origin !== "http://localhost:9000") reqs.push(r.url()); });
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 180)); });
await page.goto("http://localhost:9000/", { waitUntil: "load" });
await page.waitForSelector(".glass-dock");
await page.waitForTimeout(2500);
// which env keys does the served bundle see?
const env = await page.evaluate(async () => {
    // Vite serves /@vite/env-ish; instead read from a module the app already loaded.
    const m = await import("/demo/platform/transport/client.ts");
    return { BASE_URL: m.BASE_URL };
});
const cancel = await page.evaluate(() => {
    const b = [...document.querySelectorAll("nav.dock-band button")].find((x) => x.getAttribute("aria-label") === "Cancel");
    if (!b) return null;
    const anc = [];
    let e = b;
    while (e && e !== document.body) {
        const cs = getComputedStyle(e);
        anc.push({ cls: (e.className?.toString?.() ?? "").slice(0, 45), display: cs.display, visibility: cs.visibility, opacity: cs.opacity, pe: cs.pointerEvents });
        e = e.parentElement;
    }
    const r = b.getBoundingClientRect();
    return { box: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: r.width, h: r.height }, ancestors: anc.slice(0, 5) };
});
// reduced-motion check
const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const p2 = await ctx2.newPage();
await p2.goto("http://localhost:9000/", { waitUntil: "load" });
await p2.waitForSelector(".glass-dock");
await p2.waitForTimeout(800);
const rm = await p2.evaluate(() => {
    const d = document.querySelector(".dock-status-lamp .lamp-dot");
    return d ? d.getAnimations().map((a) => ({ n: a.animationName, s: a.playState })) : "no lamp";
});
await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/shell-dock-dockstatuslamp/probe/lamp-390.png" });
await p2.screenshot({ path: "docs/tranches/V/megatranche/audit/components/shell-dock-dockstatuslamp/probe/lamp-1440.png" });
console.log(JSON.stringify({ BASE_URL: env.BASE_URL, crossOriginRequests: [...new Set(reqs)].slice(0, 12), consoleErrors: errs.slice(0, 6), cancel, reducedMotionAnims: rm }, null, 2));
await browser.close();
