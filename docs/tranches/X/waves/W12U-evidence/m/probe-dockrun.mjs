// SERVED MODEL: claude-opus-5-5
// X.W12U.m · addendum (d) — the dock run on /atmosphere vs other routes at 1440: every
// element of the dock whose scroll box exceeds its client box (any overflow value),
// the run's own seats, at DPR 1 and 2, both themes. Real Chrome, new headless (§0ei).
// Usage: node probe-dockrun.mjs <theme> <dpr> [routes] [W] [H]
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const [theme = "light", dpr = "1", routes = "/atmosphere,/,/blob,/gradient", W = "1440", H = "900"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: +W, height: +H }, deviceScaleFactor: +dpr, colorScheme: theme });
await prepare(ctx, { theme, palettes: true, admin: process.env.ADMIN === "1" });
const p = await ctx.newPage();
for (const r of routes.split(",")) {
    await p.goto(BASE + "/#" + r, { timeout: 240000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(3000);
    const o = await p.evaluate(() => {
        const d = document.querySelector(".glass-dock");
        const over = [...d.querySelectorAll("*")].filter((e) => e.scrollWidth > e.clientWidth + 0.5 && e.clientWidth > 0).map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(" ").slice(0, 4).join(".")}[ox=${getComputedStyle(e).overflowX}]:${e.scrollWidth}/${e.clientWidth}`);
        const run = [...d.querySelectorAll(".dock-run")].map((e) => ({ cls: String(e.className).slice(0, 80), sw: e.scrollWidth, cw: e.clientWidth, kids: [...e.children].map((k) => `${(k.getAttribute("aria-label") ?? k.textContent.trim()).slice(0, 22)}:${Math.round(k.getBoundingClientRect().width * 10) / 10}`) }));
        return { dockW: Math.round(d.getBoundingClientRect().width * 10) / 10, over, run };
    });
    console.log(r, JSON.stringify(o));
}
await b.close();
