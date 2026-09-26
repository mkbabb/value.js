// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-30 (+ A2-VA-L3-8 at 1440) falsifier (:9000). /browse, stubbed wall of 8
// remote palettes (tags 2, 5 colours, one long name). Per card head row: GREEN iff the colour
// count badge is fully visible (inside the head's clip box) and overlaps no other control,
// and the name shows min(its full text, 16ch) — the name is the row's primary.
// Usage: node probe-card-head.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, browse: "ok" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1500);
const rows = await p.evaluate(() => [...document.querySelectorAll("[role=article]")].slice(0, 4).map((card) => {
    const name = card.querySelector("[data-palette-name]");
    const head = name.parentElement;
    const badge = card.querySelector("[data-count=colors]").closest("[data-slot=badge]") ?? card.querySelector("[data-count=colors]").parentElement;
    const hb = head.getBoundingClientRect(), bb = badge.getBoundingClientRect();
    const clipped = bb.right > hb.right + 0.5 || bb.left < hb.left - 0.5 || bb.width === 0;
    const others = [...card.querySelectorAll("button")].filter((x) => x.getBoundingClientRect().width > 0 && !badge.contains(x));
    const hit = others.find((x) => { const r = x.getBoundingClientRect(); return r.left < bb.right - 0.5 && r.right > bb.left + 0.5 && r.top < bb.bottom - 0.5 && r.bottom > bb.top + 0.5; });
    const ch = parseFloat(getComputedStyle(name).fontSize) * 0.5;
    const need = Math.min(name.scrollWidth, 16 * ch * 1.0);
    const nameOk = name.clientWidth + 1 >= need;
    return { name: name.textContent.trim().slice(0, 14), nameW: Math.round(name.clientWidth), full: name.scrollWidth, badge: [Math.round(bb.left), Math.round(bb.right)], headR: Math.round(hb.right), clipped, overlap: hit?.getAttribute("aria-label") ?? null, nameOk };
}));
const bad = rows.filter((r) => r.clipped || r.overlap || !r.nameOk);
console.log(`[${W}x${H} ${theme}] ${bad.length ? "RED " : "PASS"} ${rows.length} cards\n` + rows.map((r) => JSON.stringify(r)).join("\n"));
await b.close();
process.exit(bad.length ? 1 : 0);
