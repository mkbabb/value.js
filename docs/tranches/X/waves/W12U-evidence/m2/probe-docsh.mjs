// SERVED MODEL: claude-opus-5-5
// X.W12U.m2 — A2-VA-L2-10 under the RESTATED gate (COHESION §0et, ESC-W12Um-1):
// on every route × phone width, docSH = the end of the last region + the
// shell's bottom padding (±1 px), AND no out-of-flow box contributes to the
// scrollable overflow. Box-level, not document dimensions alone:
//   end      = max bottom of every `.pane-wrapper` (document coords)
//   pad      = `.app-layout` padding-bottom + border-bottom, plus every box
//              edge between the region column and the layout's content edge
//              (read as the column→layout bottom gap, then checked == pad)
//   expected = max(innerHeight, end + pad)   (a short scene fills the viewport)
//   culprits = every element whose box bottom (document coords) passes
//              end + pad + 1 and that no clipping or layout-contained ancestor
//              reduces to ink overflow — the keyframes-class inflating box.
// GREEN iff |docSH − expected| ≤ 1 AND culprits = 0 AND docSW == vw.
// Usage: node probe-docsh.mjs <w> <h> <theme> [routes] [out.json]
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { prepare } from "../x/seed-x.mjs";

const [W, H, THEME] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844), process.argv[4] ?? "light"];
const ROUTES = (process.argv[5] || "/,/palettes,/browse,/extract,/mix,/generate,/gradient,/atmosphere,/blob,/admin/users,/admin/names,/admin/audit,/admin/flagged,/admin/tags,/no-such-route").split(",");
const OUT = process.argv[6];
const b = await chromium.launch({ channel: "chrome", headless: true });
const rows = []; let red = 0;
for (const route of ROUTES) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true, colorScheme: THEME });
    await prepare(ctx, { theme: THEME, admin: route.startsWith("/admin"), palettes: true, browse: "ok" });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#" + route, { timeout: 180000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(3000);
    const s = await p.evaluate(() => {
        const de = document.documentElement, y = scrollY;
        const bot = (e) => e.getBoundingClientRect().bottom + y;
        const regions = [...document.querySelectorAll(".pane-wrapper")];
        const end = Math.max(...regions.map(bot));
        const lay = document.querySelector(".app-layout"), ls = getComputedStyle(lay);
        const pad = parseFloat(ls.paddingBottom) + parseFloat(ls.borderBottomWidth);
        const colGap = bot(lay) - pad - bot(document.querySelector(".pane-container"));
        const contained = (e) => { for (let a = e.parentElement; a && a !== de; a = a.parentElement) {
            const c = getComputedStyle(a); if (c.overflowX !== "visible" || c.overflowY !== "visible" || /layout|paint|strict|content/.test(c.contain)) return true; } return false; };
        const limit = Math.max(innerHeight, end + pad) + 1, culprits = [];
        for (const e of document.querySelectorAll("body *")) {
            if (e instanceof SVGElement && e.tagName !== "svg") continue;
            const c = getComputedStyle(e); if (c.position === "fixed" || c.display === "none") continue;
            const r = e.getBoundingClientRect(); if (r.width === 0 && r.height === 0) continue;
            if (r.bottom + y > limit && !contained(e)) culprits.push(`${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).split(" ")[0]}[${c.position}]:${Math.round(r.bottom + y)}`);
        }
        return { docSH: de.scrollHeight, ih: innerHeight, docSW: de.scrollWidth, vw: de.clientWidth, end: Math.round(end * 10) / 10, pad, colGap: Math.round(colGap * 10) / 10, culprits: culprits.slice(0, 6), nCulprits: culprits.length, regions: regions.length };
    });
    const expected = Math.max(s.ih, s.end + s.pad);
    const ok = Math.abs(s.docSH - expected) <= 1 && s.nCulprits === 0 && s.docSW === W;
    if (!ok) red++;
    rows.push({ W, H, THEME, route, expected: Math.round(expected * 10) / 10, ok, ...s });
    console.log(`${W}x${H} ${THEME} ${route} docSH=${s.docSH} expected=${Math.round(expected)} (end ${s.end} + pad ${s.pad}; ih ${s.ih}; colGap ${s.colGap}) culprits=${s.nCulprits}${s.nCulprits ? " " + s.culprits.join(" | ") : ""} docSW=${s.docSW} → ${ok ? "GREEN" : "RED"}`);
    await ctx.close();
}
await b.close();
if (OUT) writeFileSync(OUT, JSON.stringify(rows, null, 1));
console.log(red ? `RED ${red}/${ROUTES.length}` : `GREEN ${ROUTES.length}/${ROUTES.length}`);
