// SERVED MODEL: claude-opus-5-5
// X.W12U.x — A2-VA-X-3 root-cause read: which cascade rules set `position` on the
// open Version History SheetContent (Browse card menu → Versions)? Headed, :9000.
// Usage: node probe-sheet-position.mjs [width] [height]
import { chromium } from "@playwright/test";
import { prepare } from "./seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: W < 900, hasTouch: W < 900 });
await prepare(ctx, { user: true, browse: "ok" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse");
await p.getByRole("button", { name: "Palette menu" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(800);
await p.getByRole("button", { name: "Palette menu" }).first().click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: /Versions/ }).first().click();
await p.waitForTimeout(1200);
console.log(JSON.stringify(await p.evaluate(() => {
    const d = [...document.querySelectorAll("[role=dialog]")].find((e) => e.getBoundingClientRect().width > 0);
    const hits = [];
    const walk = (rules, layer) => {
        for (const r of rules) {
            if (r instanceof CSSStyleRule) {
                if (r.style.position) { try { if (d.matches(r.selectorText)) hits.push(`${layer ?? "unlayered"} | ${r.selectorText.slice(0, 90)} => ${r.style.position}`); } catch { /* nested selector */ } }
                if (r.cssRules?.length) walk(r.cssRules, layer);
            } else if (r.cssRules) walk(r.cssRules, r.name !== undefined ? `layer:${r.name}` : r.conditionText ? `${layer ?? ""}@${r.conditionText.slice(0, 30)}` : layer);
        }
    };
    for (const s of document.styleSheets) { try { walk(s.cssRules, null); } catch { /* cross-origin sheet */ } }
    const r = d.getBoundingClientRect();
    return { slot: d.getAttribute("data-slot"), side: d.getAttribute("data-side"), cls: d.className, computed: getComputedStyle(d).position, top: Math.round(r.top), vh: innerHeight, hits };
}), null, 1));
await b.close();
