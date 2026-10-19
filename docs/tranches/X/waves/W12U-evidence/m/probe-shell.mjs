// SERVED MODEL: claude-opus-5-5
// X.W12U.m — the shell read per route: docSH vs innerHeight, the route H1 (is it
// the topmost paint at its own centre? A2-VA-L2-2), the band/stage/inspector
// geometry (A2-VA-L2-4, L2-5), every dock run's overflow (addendum (d)), and the
// safe-area env() values under the CDP override (A2-VA-L2-12).
// Real Chrome, new headless (§0ei). isMobile+hasTouch at phone widths.
// Usage: node probe-shell.mjs <tag> <theme> <inset:none|portrait|landscape> [routes] [out.json]
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { prepare, VIEWPORTS, isPhone } from "../x/seed-x.mjs";

const BASE = process.env.BASE ?? "http://localhost:9000";
const [tag = "v390", theme = "light", inset = "none"] = process.argv.slice(2, 5);
const ROUTES = (process.argv[5] || "/,/palettes,/browse,/extract,/mix,/generate,/gradient,/atmosphere,/blob,/admin/users,/admin/names,/admin/audit,/admin/flagged,/admin/tags,/no-such-route").split(",");
const OUT = process.argv[6];
const [W, H] = VIEWPORTS[tag];
const INSETS = { none: { top: 0, bottom: 0, left: 0, right: 0 }, portrait: { top: 0, bottom: 34, left: 0, right: 0 }, landscape: { top: 0, bottom: 21, left: 47, right: 47 } };

const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: isPhone(tag), hasTouch: isPhone(tag), colorScheme: theme });
await prepare(ctx, { theme, admin: true, palettes: true, browse: "ok" });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: INSETS[inset] });
const res = { tag, theme, inset, W, H, base: BASE, at: new Date().toISOString(), routes: {} };
for (const r of ROUTES) {
    await p.goto(BASE + "/#" + r, { timeout: 180000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(2500);
    res.routes[r] = await p.evaluate(() => {
        const box = (e) => { if (!e) return null; const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top + scrollY), Math.round(q.width), Math.round(q.height)]; };
        const de = document.documentElement;
        const h1 = document.querySelector("h1.route-title");
        let h1Top = null;
        if (h1) { const q = h1.getBoundingClientRect(); const hit = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2); h1Top = hit ? (h1.contains(hit) ? "h1" : `${hit.tagName.toLowerCase()}.${String(hit.className?.baseVal ?? hit.className).split(" ")[0]}`) : "none"; }
        const probe = document.createElement("div");
        probe.style.cssText = "position:fixed;inset:0;pointer-events:none;visibility:hidden;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)";
        document.body.append(probe);
        const pcs = getComputedStyle(probe); const env = [pcs.paddingTop, pcs.paddingRight, pcs.paddingBottom, pcs.paddingLeft].map(parseFloat); probe.remove();
        const runs = [...document.querySelectorAll(".dock-run, [class*='dock-run'], .dock-layer")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => `${String(e.className).split(" ").slice(0, 3).join(".")}:${e.scrollWidth}/${e.clientWidth}`);
        const ml = (s) => box(document.querySelector(s));
        return { docSH: de.scrollHeight, ih: innerHeight, docSW: de.scrollWidth, iw: innerWidth, h1: box(h1), h1Top, band: ml(".dock-band"), stage: ml(".pane-wrapper--stage"), inspector: ml(".pane-wrapper--inspector"), env, runs, appPad: getComputedStyle(document.querySelector(".app-layout")).padding, notFound: document.body.innerText.includes("Not Found"), plate: /Loading the scene|couldn.t load|PaneChunkError/i.test(document.body.innerText) };
    });
    console.log(r, JSON.stringify(res.routes[r]));
}
if (OUT) writeFileSync(OUT, JSON.stringify(res, null, 1));
await b.close();
