// MOTION QUARANTINE probe 4 — the last two REAL on-screen motion carriers.
//
//  (a) ActionToolbar's children: `.action-icon` carries
//      `transition-[transform,stroke]` (ActionButton.vue:25) and the
//      `action-pulse` / rotate keyframes (:122-135). Backs the
//      `shell-dock-actiontoolbar/challenge-D-design.md:21` "reduced motion" cell.
//  (b) ConsoleRail's live-color dot: `.rail-dot` renders only under
//      `v-if="active === component"` (ConsoleRail.vue:52-62), so a channel must
//      be clicked first. Backs `picker-componentsliders-consolerail/
//      challenge-D-design.md:21`.
//
//   node docs/tranches/V/megatranche/audit/codex-provenance/evidence-motion-quarantine/probe4-real-elements.mjs

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFileSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DEV = "http://localhost:9000";
const out = {};
const log = (k, v) => { out[k] = v; console.log(`\n── ${k} ──\n` + JSON.stringify(v, null, 2)); };

const browser = await chromium.launch();

for (const mode of ["no-preference", "reduce"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: mode });
    const page = await ctx.newPage();
    page.setDefaultTimeout(90_000);
    page.setDefaultNavigationTimeout(90_000);
    await page.goto(`${DEV}/`, { timeout: 90_000 });
    await page.waitForTimeout(3500);

    // activate a channel so the WatercolorDot seat mounts
    let clicked = null;
    try {
        const item = page.locator(".channel-rail-item").first();
        await item.click({ timeout: 8000 });
        await page.waitForTimeout(700);
        clicked = await item.getAttribute("aria-label");
    } catch (e) {
        clicked = "CLICK-FAILED: " + String(e).slice(0, 120);
    }

    log(
        `real.${mode}`,
        await page.evaluate((m) => {
            const pick = (sel) => {
                const el = document.querySelector(sel);
                if (!el) return { sel, present: false };
                const cs = getComputedStyle(el);
                return {
                    sel,
                    present: true,
                    animationName: cs.animationName,
                    animationDuration: cs.animationDuration,
                    animationIterationCount: cs.animationIterationCount,
                    transitionProperty: cs.transitionProperty,
                    transitionDuration: cs.transitionDuration,
                    transform: cs.transform,
                };
            };
            return {
                mode: m,
                actionIcon: pick(".action-icon"),
                railDotSeat: pick(".rail-dot-seat"),
                railDot: pick(".rail-dot"),
                railLetters: pick(".rail-letters"),
                staggerChild: pick(".stagger-children > *"),
            };
        }, mode),
    );
    out[`real.${mode}`].clickedChannel = clicked;
    await ctx.close();
}

await browser.close();
writeFileSync(join(HERE, "RESULTS-real.json"), JSON.stringify(out, null, 2));
console.log("\nwrote " + join(HERE, "RESULTS-real.json"));
