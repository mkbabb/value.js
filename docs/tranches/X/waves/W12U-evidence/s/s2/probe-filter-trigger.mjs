// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-118 · V-310 · V-120 falsifier (:9000). /browse, one filter active
// (Featured). GREEN iff the Filters trigger is square, is not a kebab (⋮) glyph, sits inside
// the search bar's box (no overhang), and its count badge is painted whole (not clipped by
// an ancestor's overflow). Usage: node probe-filter-trigger.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, browse: "ok" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1200);
await p.getByRole("button", { name: "Filters" }).first().click();
await p.waitForTimeout(400);
await p.locator("[role=dialog]").getByText("Featured", { exact: true }).click();
await p.keyboard.press("Escape");
await p.waitForTimeout(500);
const r = await p.evaluate(() => {
    const t = document.querySelector('button[aria-label^="Filters"]');
    const bar = t.closest(".input-bar");
    const tb = t.getBoundingClientRect(), bb = bar.getBoundingClientRect();
    const glyph = t.querySelector("svg")?.getAttribute("class") ?? "";
    const badge = [...t.querySelectorAll("span")].find((s) => /\d/.test(s.textContent));
    let clipped = null;
    if (badge) {
        const k = badge.getBoundingClientRect();
        clipped = false;
        for (let e = badge.parentElement; e && e !== document.body; e = e.parentElement) {
            const cs = getComputedStyle(e);
            if (cs.overflow !== "visible" || cs.clipPath !== "none" || cs.contain.includes("paint")) {
                const c = e.getBoundingClientRect();
                if (k.left < c.left - 0.5 || k.right > c.right + 0.5 || k.top < c.top - 0.5 || k.bottom > c.bottom + 0.5) { clipped = e.className.toString().slice(0, 40); break; }
            }
        }
    }
    return { trig: [tb.width, tb.height].map(Math.round), square: Math.abs(tb.width - tb.height) < 1, kebab: /ellipsis-vertical/.test(glyph), overhang: [Math.round(bb.top - tb.top), Math.round(tb.bottom - bb.bottom), Math.round(tb.right - bb.right)], badge: badge?.textContent.trim() ?? null, clipped, label: t.getAttribute("aria-label") };
});
const ok = r.square && !r.kebab && r.overhang.every((v) => v <= 0) && r.badge && r.clipped === false;
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify(r)}`);
await b.close();
process.exit(ok ? 0 : 1);
