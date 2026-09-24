// SERVED MODEL: claude-opus-5-5
// KF.W13V.s — OA-40 mobile controls sheet geometry on the served page.
// Usage: node sheet.mjs <baseUrl> [vps=390x844,360x740] [themes=light,dark] [shotPrefix]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", vps = "390x844,360x740", th = "light,dark", shot] = process.argv.slice(2);
const b = await chromium.launch({ headless: false });
for (const theme of th.split(",")) for (const vp of vps.split(",")) {
    const [w, h] = vp.split("x").map(Number);
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: false });
    const p = await ctx.newPage();
    await p.goto(base.replace(/#.*$/, "") + "#/cube", { waitUntil: "networkidle" });
    await p.waitForTimeout(2500);
    await p.locator("[data-dock-tether=top]").hover({ force: true });
    await p.waitForTimeout(700);
    // open the shared pane on Controls through its dock item (a press on an
    // item already showing would close it, so press only when not pressed)
    const item = p.locator('[data-dock-tether=top] [aria-label="Controls"]');
    if ((await item.getAttribute("aria-pressed")) !== "true") await item.click();
    await p.mouse.move(w / 2, h / 3);
    await p.waitForTimeout(1800);
    const m = await p.evaluate(() => {
        const R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; };
        const sheet = document.querySelector('[data-slot="sheet-content"]');
        // the sheet's inner card: the first descendant whose box is narrower than the sheet and carries a card surface
        const cand = sheet ? [...sheet.querySelectorAll("*")].filter((e) => { const cs = getComputedStyle(e); return (e.className.toString().match(/card|glass/i)) && e.getBoundingClientRect().width > 150; }) : [];
        const card = cand[0];
        const trans = [...document.querySelectorAll("[data-dock-tether]")].filter((e) => e.getAttribute("data-dock-tether") !== "top").flatMap((e) => [...e.querySelectorAll(".glass-dock, button")].filter((x) => x.getBoundingClientRect().width > 0).map(R));
        const rows = sheet ? [...sheet.querySelectorAll("label, [data-slot=label], .labeled-field-label, dt")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => ({ text: e.textContent.trim().slice(0, 16), ...R(e) })) : [];
        const topDock = document.querySelector("[data-dock-tether=top] .glass-dock");
        const cs = sheet ? getComputedStyle(sheet) : null;
        return { pos: cs?.position, lift: cs ? parseFloat(cs.bottom) : null, sheet: R(sheet), card: R(card), cardClass: card?.className.toString().slice(0, 60), trans, rows, topDock: R(topDock), vw: innerWidth, vh: innerHeight };
    });
    const inter = (a, c) => a && c && !(a.r <= c.l || c.r <= a.l || a.b <= c.t || c.b <= a.t);
    const li = m.card && m.sheet ? m.card.l - m.sheet.l : null, ri = m.card && m.sheet ? m.sheet.r - m.card.r : null;
    const hit = m.trans.filter((t) => inter(t, m.sheet));
    const occluded = m.rows.filter((r) => m.trans.some((t) => inter(t, r)));
    const offscreen = m.rows.filter((r) => r.b > m.vh || r.t < 0);
    console.log(`${theme} ${vp} sheet=[${m.sheet?.l.toFixed(0)},${m.sheet?.t.toFixed(0)},${m.sheet?.r.toFixed(0)},${m.sheet?.b.toFixed(0)}] card(${m.cardClass})=[${m.card?.l.toFixed(0)},${m.card?.r.toFixed(0)}] insetL=${li?.toFixed(1)} insetR=${ri?.toFixed(1)} Δ=${li != null ? Math.abs(li - ri).toFixed(1) : "-"} | transport∩sheet=${hit.length} rowsOccluded=${occluded.map((r) => r.text).join("/") || 0} rows=${m.rows.length} offscreen=${offscreen.length} | sheet position=${m.pos} (SHEET-POSITION while not fixed) declared bottom edge=${m.lift != null ? (m.vh - m.lift).toFixed(1) : "-"} vs transport top=${Math.min(...m.trans.map((t) => t.t)).toFixed(1)} clear=${m.lift != null && m.vh - m.lift <= Math.min(...m.trans.map((t) => t.t))} | topDockH=${m.topDock ? (m.topDock.b - m.topDock.t).toFixed(0) : "-"}`);
    if (shot) await p.screenshot({ path: `${shot}-${vp}-${theme}.png` });
    await ctx.close();
}
await b.close();
