// MOTION QUARANTINE probe 2 — the glass-ui Skeleton scan animation.
//
// AdminListSkeleton.vue:13,15,16,18 renders four glass-ui <Skeleton> nodes.
// The producer's scan lives on `.skeleton[data-v-cd03d0b0]:after` and is gated
// by `@media (prefers-reduced-motion: no-preference)` (glass-ui.css @ 23789).
// Probe 1's injected `.skeleton` lacked the SFC scope attribute, so it read
// `animationName: none` in both modes — inconclusive. This probe carries the
// real scope attr AND hunts a real on-screen Skeleton under a throttled load.
//
//   node docs/tranches/V/megatranche/audit/codex-provenance/evidence-motion-quarantine/probe2-skeleton.mjs

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

    // Throttle the palette API so real skeletons stay on screen long enough.
    await page.route("**/api/**", async (r) => {
        await new Promise((res) => setTimeout(res, 4000));
        await r.continue();
    });

    await page.goto(`${DEV}/#/browse`, { timeout: 90_000 });
    await page.waitForTimeout(1500);

    log(
        `skeleton.${mode}`,
        await page.evaluate((m) => {
            const read = (el) => {
                const a = getComputedStyle(el, "::after");
                return {
                    animationName: a.animationName,
                    animationDuration: a.animationDuration,
                    animationIterationCount: a.animationIterationCount,
                    transform: a.transform,
                    willChange: a.willChange,
                };
            };
            const res = { mode: m };

            // (a) a REAL on-screen producer Skeleton, if the throttle caught one
            const real = document.querySelector(".skeleton");
            res.realSkeletonOnScreen = !!real;
            if (real) {
                res.realScopeAttrs = [...real.attributes].map((a) => a.name).filter((n) => n.startsWith("data-v"));
                res.real = read(real);
            }

            // (b) the producer class WITH its SFC scope attribute — the rule's
            //     actual selector `.skeleton[data-v-cd03d0b0]:after`
            const scoped = document.createElement("div");
            scoped.className = "skeleton";
            scoped.setAttribute("data-v-cd03d0b0", "");
            scoped.style.cssText = "width:80px;height:12px";
            document.body.appendChild(scoped);
            res.scopedInjection = read(scoped);

            // (c) AdminListSkeleton.vue's exact node — inert surface/variant attrs
            const admin = document.createElement("div");
            admin.className = "skeleton w-8 h-8 rounded-full shrink-0";
            admin.setAttribute("data-v-cd03d0b0", "");
            admin.setAttribute("surface", "glass");
            admin.setAttribute("variant", "breath");
            document.body.appendChild(admin);
            res.adminListSkeletonNode = read(admin);

            return res;
        }, mode),
    );
    await ctx.close();
}

await browser.close();
writeFileSync(join(HERE, "RESULTS-skeleton.json"), JSON.stringify(out, null, 2));
console.log("\nwrote " + join(HERE, "RESULTS-skeleton.json"));
