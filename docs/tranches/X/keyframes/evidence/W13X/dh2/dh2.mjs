// SERVED MODEL: claude-opus-5-5
// KF.W13X.dh2 served falsifier (KF-W13.md addendum (f) `.dh2`, method of (e) `.dh`;
// brief: value.js docs/tranches/X/execution/B/KF-W13X-dh2-brief.md). /#/sequence at
// 1440x900, 1024x768, 390x844, light and dark, headless real Chrome (COHESION §0ei).
//   D1 PURE STAGE (UIA-KF-098): the stage card `.seq-target` holds 0 controls
//      (button, role=button, role=slider) — the subject only.
//   D2 REEL HOMED (UIA-KF-098): exactly one Reel control in the document; it sits in
//      the Timeline pane's Stagger layer header beside the re-time Reset (same parent,
//      same height ±1, centres on one line ±2), visible and hit-testable as itself.
//   D3 ONE-LINE HEADER (UIA-KF-211 guard): the stage header's children share one line
//      (centres ±4 px); no text run in it is ellipsized or overflows its own box, and no
//      two text runs overlap.
//   D4 PREVIEW (UIA-KF-317): with the master parked, a keyboard re-time of row 3
//      moves row 3's stage traveller (>= 5 distinct --ball-p samples over 1.4 s) and
//      returns it to its master pose (|end - before| <= 0.02); row 1 holds still.
//   D5 PREVIEW ON RELEASE (UIA-KF-317): a pointer drag of row 4's handle, released,
//      moves row 4's traveller the same way.
// Usage: node dh2.mjs <base> <tag> [framesDir]   (env W="1440x900,..." to subset)
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const sizes = (process.env.W || "1440x900,1024x768,390x844").split(",").map((s) => s.split("x").map(Number));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = [];

const ballP = (p, row) => p.evaluate((row) => {
    const el = document.querySelectorAll(".seq-target .seq-row .seq-ball")[row - 1];
    return el ? Number(getComputedStyle(el).getPropertyValue("--ball-p")) : NaN;
}, row);
async function sample(p, row, ms = 1400) {
    const out = [];
    for (let t = 0; t < ms; t += 50) { out.push(await ballP(p, row)); await sleep(50); }
    return out;
}
const distinct = (a) => new Set(a.map((v) => v.toFixed(3))).size;

for (const [w, h] of sizes) for (const scheme of ["light", "dark"]) {
    const touch = w < 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: touch, hasTouch: touch, colorScheme: scheme });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, scheme);
    const p = await ctx.newPage();
    await p.goto(`${base}#/sequence`, { waitUntil: "networkidle" });
    await p.waitForSelector(".seq-target", { timeout: 30000 });
    await sleep(3000);
    // The Timeline pane is pressed by default on /sequence; on a collapsed dock, expand first.
    const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first();
    if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
    const item = p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first();
    if ((await item.count()) && (await item.getAttribute("aria-pressed")) !== "true") { await item.click({ force: true }); await sleep(1300); }
    await sleep(600);
    const g = await p.evaluate(() => {
        const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
        const card = document.querySelector(".seq-target");
        const controls = card ? [...card.querySelectorAll('button,[role=button],[role=slider]')].filter(vis) : [];
        const reels = [...document.querySelectorAll('button[aria-label^="Reel"]')].filter(vis);
        const reset = [...document.querySelectorAll('button[aria-label^="Reset the sequence items"]')].find(vis);
        let D2 = false, d2 = "";
        if (reels.length === 1 && reset) {
            const a = reels[0].getBoundingClientRect(), r = reset.getBoundingClientRect();
            const cx = (a.left + a.right) / 2, cy = (a.top + a.bottom) / 2;
            const hit = document.elementFromPoint(cx, cy);
            const same = reels[0].parentElement === reset.parentElement;
            const hOk = Math.abs(a.height - r.height) <= 1;
            const yOk = Math.abs(cy - (r.top + r.bottom) / 2) <= 2;
            const hitOk = !!hit && reels[0].contains(hit);
            D2 = same && hOk && yOk && hitOk && !card.contains(reels[0]);
            d2 = `same=${same} h=${a.height.toFixed(1)}/${r.height.toFixed(1)} y=${cy.toFixed(1)}/${((r.top + r.bottom) / 2).toFixed(1)} hit=${hitOk}`;
        } else d2 = `reels=${reels.length} reset=${!!reset}`;
        const hdr = card?.querySelector(".seq-header");
        const kids = hdr ? [...hdr.querySelectorAll(":scope > *")].filter(vis) : [];
        const cys = kids.map((k) => { const r = k.getBoundingClientRect(); return (r.top + r.bottom) / 2; });
        // No header text run is ellipsized or overflows its own box (the 390 title: a 33 px box holding 82 px of "Sequence").
        const ell = hdr ? [...hdr.querySelectorAll("*")].filter((e) => vis(e) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && e.scrollWidth > e.clientWidth + 1) : [];
        // No two text runs of the header overlap (the 390 frame: "Sequence" over "CLOCK").
        const leaves = hdr ? [...hdr.querySelectorAll("*")].filter((e) => vis(e) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) : [];
        const ov = [];
        for (let i = 0; i < leaves.length; i++) for (let j = i + 1; j < leaves.length; j++) {
            const a = leaves[i].getBoundingClientRect(), c = leaves[j].getBoundingClientRect();
            if (leaves[i].contains(leaves[j]) || leaves[j].contains(leaves[i])) continue;
            const ix = Math.min(a.right, c.right) - Math.max(a.left, c.left), iy = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top);
            if (ix > 1 && iy > 1) ov.push(`${leaves[i].textContent.trim()}×${leaves[j].textContent.trim()}`);
        }
        const D3 = !!hdr && cys.length > 0 && Math.max(...cys) - Math.min(...cys) <= 4 && ell.length === 0 && ov.length === 0;
        return {
            D1: !!card && controls.length === 0,
            d1: controls.map((c) => c.getAttribute("aria-label") || c.textContent.trim()).join("|").slice(0, 120),
            D2, d2, D3, d3: `ov=${ov.join(",")} kids=${kids.length} spread=${cys.length ? (Math.max(...cys) - Math.min(...cys)).toFixed(1) : "-"} ell=${ell.length}`,
        };
    });
    if (outDir) await p.screenshot({ path: `${outDir}/${tag}-sequence-${w}-${scheme}.png` });
    // D4 — keyboard re-time of row 3, master parked.
    const pre3 = await ballP(p, 3), pre1 = await ballP(p, 1);
    const h3 = p.locator('[aria-label^="Re-time row 3"]').first();
    let D4 = false, d4 = "no handle";
    if (await h3.count()) {
        await h3.focus(); await p.keyboard.press("ArrowRight");
        const s3 = await sample(p, 3); const s1 = (await ballP(p, 1));
        await sleep(400); const end3 = await ballP(p, 3);
        D4 = distinct(s3) >= 5 && Math.abs(end3 - pre3) <= 0.02 && Math.abs(s1 - pre1) <= 0.001;
        d4 = `distinct=${distinct(s3)} pre=${pre3.toFixed(3)} end=${end3.toFixed(3)} row1 ${pre1.toFixed(3)}->${s1.toFixed(3)}`;
    }
    // D5 — pointer drag of row 4's handle, released.
    const h4 = p.locator('[aria-label^="Re-time row 4"]').first();
    let D5 = false, d5 = "no handle";
    if (await h4.count()) {
        await h4.scrollIntoViewIfNeeded().catch(() => {});
        const hb = await h4.boundingBox();
        if (hb) {
            const y = hb.y + hb.height / 2; let x = hb.x + hb.width / 2;
            await p.mouse.move(x, y); await p.mouse.down(); await sleep(50);
            for (let i = 0; i < 3; i++) { x -= 8; await p.mouse.move(x, y); await sleep(60); }
            await sleep(300); const pre4 = await ballP(p, 4);
            await p.mouse.up();
            const s4 = await sample(p, 4); await sleep(400); const end4 = await ballP(p, 4);
            D5 = distinct(s4) >= 5 && Math.abs(end4 - pre4) <= 0.02;
            d5 = `distinct=${distinct(s4)} pre=${pre4.toFixed(3)} end=${end4.toFixed(3)}`;
        }
    }
    res.push({ cell: `sequence@${w}/${scheme}`, ...g, D4, d4, D5, d5 });
    await ctx.close();
}
await b.close();
const G = (v) => (v ? "GREEN" : "RED  ");
for (const r of res) console.log(`${r.cell.padEnd(20)} D1 ${G(r.D1)} D2 ${G(r.D2)} D3 ${G(r.D3)} D4 ${G(r.D4)} D5 ${G(r.D5)} | ${r.d1} ; ${r.d2} ; ${r.d3} ; ${r.d4} ; ${r.d5}`);
const all = res.flatMap((r) => [r.D1, r.D2, r.D3, r.D4, r.D5]);
console.log(`TOTAL ${all.filter(Boolean).length}/${all.length} GREEN`);
fs.writeFileSync(new URL(`./${tag}.json`, import.meta.url), JSON.stringify(res, null, 1));
