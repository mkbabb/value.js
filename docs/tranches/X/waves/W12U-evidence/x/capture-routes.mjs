// SERVED MODEL: claude-opus-5-5
// X.W12U.x · §2.4-2.6 — every route at the given viewports, both themes,
// headed Chromium on :9000 (admin token + saved palettes + remote browse seed).
// Reads measure-x.js plus the consumer ActionButton seats (A2-VA-L2-6 value
// half): each `.action-button-wrapper` box and whether a tap 6 px outside its
// edge still reaches it (a coarse hit-slop would).
// Usage: node capture-routes.mjs <out.json> <vpTags> [frames dir]
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { prepare, VIEWPORTS, isPhone } from "./seed-x.mjs";

const HERE = dirname(new URL(import.meta.url).pathname);
const BASE = process.env.BASE ?? "http://localhost:9000";
const MX = readFileSync(join(HERE, "measure-x.js"), "utf8");
const OUT = process.argv[2];
const TAGS = (process.argv[3] ?? "t768,t1024").split(",");
const FR = process.argv[4];
if (FR) mkdirSync(FR, { recursive: true });
const ROUTES = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob",
    "/admin/users", "/admin/names", "/admin/audit", "/admin/flagged", "/admin/tags", "/no-such-page"];

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const res = [];
for (const tag of TAGS) {
    const [w, h] = VIEWPORTS[tag];
    for (const theme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: isPhone(tag) || tag.startsWith("t"), isMobile: isPhone(tag) });
        await prepare(ctx, { theme, admin: true, palettes: true, user: true, browse: "ok" });
        await ctx.addInitScript(MX);
        const page = await ctx.newPage();
        for (const route of ROUTES) {
            try {
                await page.goto(BASE + "/#" + route);
                await page.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
                await page.waitForTimeout(1500);
                const m = await page.evaluate(() => window.__mx());
                const seats = await page.evaluate(() => [...document.querySelectorAll(".action-button-wrapper")].filter((b) => b.getBoundingClientRect().width > 0).map((b) => {
                    const r = b.getBoundingClientRect();
                    const probe = document.elementFromPoint(r.right + 6, r.top + r.height / 2);
                    return { l: b.getAttribute("aria-label"), w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, slop6: !!probe && (probe === b || b.contains(probe)) };
                }));
                const layout = await page.evaluate(() => ({
                    panes: [...document.querySelectorAll(".pane-wrapper")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.left)}+${Math.round(r.width)}x${Math.round(r.height)}`; }),
                    dock: (() => { const d = document.querySelector(".glass-dock"); if (!d) return null; const r = d.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), state: d.getAttribute("data-state"), sw: d.querySelector(".dock-run")?.scrollWidth, cw: d.querySelector(".dock-run")?.clientWidth }; })(),
                }));
                res.push({ tag, theme, route, m, seats, layout });
                if (FR) await page.screenshot({ path: join(FR, `${tag}-${theme}-${route === "/" ? "picker" : route.slice(1).replace(/\//g, "-")}.jpg`), type: "jpeg", quality: 45 });
            } catch (e) {
                res.push({ tag, theme, route, unreached: String(e.message).split("\n")[0].slice(0, 160) });
            }
        }
        await ctx.close();
    }
    console.log(tag, "done");
}
await browser.close();
writeFileSync(OUT, JSON.stringify(res, null, 1));
