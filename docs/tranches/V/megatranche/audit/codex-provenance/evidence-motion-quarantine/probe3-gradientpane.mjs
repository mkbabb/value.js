// MOTION QUARANTINE probe 3 — GradientPane.vue's motion surface.
//
// Two questions raised by `wb-gradient-pane/challenge-D-design.md`:
//   D:16 "`h-full`, `overflow-y-auto`, and a BOTTOM FADE create a scroll
//        affordance…"          → does a bottom fade actually exist?
//   D:33 "closes only when … reduced-motion … proofs"
//                              → what motion does this pane actually carry?
//
// GradientPane.vue:20 puts `.pane-scroll-fade` on the Card root. That class is
// defined UNSCOPED in demo/shared/ui/PaneHeader.vue:54-57 and sets only
// `contain` + `scroll-timeline: --pane-scroll block` — it is the SCROLL-TIMELINE
// HOST, not a mask. PaneHeader.vue:177-194 hangs three scroll-driven animations
// off that timeline. Scroll-driven animations take progress from the timeline,
// not from `animation-duration`, so the global PRM guard's duration clamp may
// not reach them. This probe measures both.
//
//   node docs/tranches/V/megatranche/audit/codex-provenance/evidence-motion-quarantine/probe3-gradientpane.mjs

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
    await page.goto(`${DEV}/#/gradient`, { timeout: 90_000 });
    await page.waitForTimeout(3500);

    const rec = await page.evaluate((m) => {
        const res = { mode: m };
        const host = document.querySelector(".pane-scroll-fade");
        res.hostPresent = !!host;
        if (host) {
            const cs = getComputedStyle(host);
            res.host = {
                maskImage: cs.maskImage,
                webkitMaskImage: cs.webkitMaskImage,
                scrollTimeline: cs.scrollTimeline || cs.getPropertyValue("scroll-timeline"),
                contain: cs.contain,
                overflowY: cs.overflowY,
                animationName: cs.animationName,
                animationDuration: cs.animationDuration,
                beforeContent: getComputedStyle(host, "::before").content,
                beforeBackground: getComputedStyle(host, "::before").backgroundImage.slice(0, 90),
                afterContent: getComputedStyle(host, "::after").content,
                afterBackground: getComputedStyle(host, "::after").backgroundImage.slice(0, 90),
            };
            res.scrollable = { scrollHeight: host.scrollHeight, clientHeight: host.clientHeight };
        }
        const readTitle = () => {
            const t = document.querySelector(".pane-header-title");
            if (!t) return null;
            const cs = getComputedStyle(t);
            return {
                animationName: cs.animationName,
                animationDuration: cs.animationDuration,
                animationTimeline: cs.animationTimeline,
                animationRange: cs.animationRange,
                transform: cs.transform,
                fontSize: cs.fontSize,
                height: +t.getBoundingClientRect().height.toFixed(2),
            };
        };
        res.headerTitleAtScroll0 = readTitle();
        res._readTitle = true;
        return res;
    }, mode);

    // scroll the pane and re-measure the scroll-driven title
    if (rec.hostPresent) {
        await page.evaluate(() => {
            const h = document.querySelector(".pane-scroll-fade");
            h.scrollTop = 200;
        });
        await page.waitForTimeout(600);
        rec.headerTitleAtScroll200 = await page.evaluate(() => {
            const t = document.querySelector(".pane-header-title");
            if (!t) return null;
            const cs = getComputedStyle(t);
            return {
                animationName: cs.animationName,
                animationDuration: cs.animationDuration,
                animationTimeline: cs.animationTimeline,
                transform: cs.transform,
                height: +t.getBoundingClientRect().height.toFixed(2),
                veilOpacity: getComputedStyle(document.querySelector(".pane-header"), "::before").opacity,
            };
        });
    }
    log(`gradientPane.${mode}`, rec);
    await ctx.close();
}

await browser.close();
writeFileSync(join(HERE, "RESULTS-gradientpane.json"), JSON.stringify(out, null, 2));
console.log("\nwrote " + join(HERE, "RESULTS-gradientpane.json"));
