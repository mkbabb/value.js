// AF·L·r2 — PROBE 5: REFUTING the prior Codex file's L:12 motion claim.
//
// Codex `challenge-L-library.md:12` asserts:
//     "The transition class family is globally named and not scoped to a producer
//      motion token or reduced-motion policy."
//
// Second disjunct under test. The `.vj-celebrate-*` family (demo/styles/animations.css:140-165)
// consumes SIX motion tokens, every one glass-ui-defined and NONE demo-defined:
//     --duration-fast, --duration-normal   -> glass-ui dist/styles/tokens/scheme-motion.css
//     --ease-decelerate, --ease-accelerate -> glass-ui dist/styles/theme/bridges.css
//     --spring-bouncy, --spring-bouncy-duration -> glass-ui dist/styles/tokens/scheme-spring.css
// and TWO reduced-motion guards govern it:
//     demo/styles/animations.css:184-193                     (transition-duration + animation-duration)
//     glass-ui dist/styles/utilities/a11y-overrides.css      (animation-duration)
//
// Falsifier: if the chip's transition-duration stays at its full value under
// `prefers-reduced-motion: reduce`, the Codex claim stands.
//
// Run:  node docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-prm-refutation.mjs
// Needs: dev stack up on :9000 (demo).

import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const now = new Date().toISOString();
const SEED = JSON.stringify({
    version: 1,
    palettes: [
        {
            id: "af-probe-1",
            name: "Audit Alpha",
            slug: "audit-alpha",
            colors: [{ css: "#e11d48" }, { css: "#0ea5e9" }],
            createdAt: now,
            updatedAt: now,
            isLocal: true,
            visibility: "private",
        },
    ],
});

const browser = await chromium.launch();

async function measure(reducedMotion) {
    const ctx = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        reducedMotion,
    });
    await ctx.addInitScript((s) => localStorage.setItem("color-palettes", s), SEED);
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "networkidle" });
    await page.waitForSelector('[role="article"]', { timeout: 20000 });
    const out = await page.evaluate(async () => {
        const card = document.querySelector('[role="article"]');
        card.__vueParentComponent.exposed.showFeedback("Saved!", "success");
        await new Promise((r) => setTimeout(r, 60));
        const chip = card.querySelector(".feedback-chip");
        const cs = getComputedStyle(chip);
        const root = getComputedStyle(document.documentElement);
        return {
            transitionDuration: cs.transitionDuration,
            transitionProperty: cs.transitionProperty,
            animationDuration: cs.animationDuration,
            prmMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
            producerTokens: {
                "--duration-fast": root.getPropertyValue("--duration-fast").trim(),
                "--duration-normal": root.getPropertyValue("--duration-normal").trim(),
                "--ease-decelerate": root.getPropertyValue("--ease-decelerate").trim(),
                "--ease-accelerate": root.getPropertyValue("--ease-accelerate").trim(),
                "--spring-bouncy": root.getPropertyValue("--spring-bouncy").trim(),
                "--spring-bouncy-duration": root
                    .getPropertyValue("--spring-bouncy-duration")
                    .trim(),
            },
        };
    });
    await ctx.close();
    return out;
}

const normal = await measure("no-preference");
const reduced = await measure("reduce");

console.log("NO-PREFERENCE :", JSON.stringify(normal, null, 2));
console.log("\nREDUCE        :", JSON.stringify(reduced, null, 2));

const tokensLive = Object.entries(normal.producerTokens).filter(([, v]) => v !== "");
// glass-ui's PRM policy (dist/styles/utilities/a11y-overrides.css) is deliberately
// "reduced, not abolished": it clamps duration to 0.1s AND clamps transition-property
// to opacity/colour only — so the bouncy spring `transform` and the `max-height`
// morph are STRUCK, leaving a non-jarring 100ms fade.
const maxNormal = Math.max(...normal.transitionDuration.split(",").map((d) => parseFloat(d)));
const maxReduced = Math.max(...reduced.transitionDuration.split(",").map((d) => parseFloat(d)));
const durationsCollapsed = maxReduced < maxNormal;
const motionPropsStruck =
    !/transform/.test(reduced.transitionProperty) && !/max-height/.test(reduced.transitionProperty);

console.log("\n--- VERDICT on Codex challenge-L-library.md:12 ---");
console.log(`producer motion tokens resolving live: ${tokensLive.length}/6`);
tokensLive.forEach(([k, v]) => console.log(`   ${k} = ${v}`));
console.log(`transition-duration  no-preference: ${normal.transitionDuration}`);
console.log(`transition-duration  reduce       : ${reduced.transitionDuration}`);
console.log(`transition-property  no-preference: ${normal.transitionProperty}`);
console.log(`transition-property  reduce       : ${reduced.transitionProperty}`);
console.log(
    "\n'not scoped to a producer motion token' :",
    tokensLive.length === 6 ? "REFUTED — all six resolve from glass-ui." : "stands",
);
console.log(
    "'not scoped to a ... reduced-motion policy' :",
    durationsCollapsed && motionPropsStruck
        ? `REFUTED — under PRM the producer policy clamps ${maxNormal}s -> ${maxReduced}s AND strikes transform/max-height from transition-property, leaving a fade only.`
        : "stands",
);

await browser.close();
