// AF·L·r2 — PROBE 3: the public surface carries no VERDICT IDENTITY.
//
// ActionFeedback's contract is three independent props (`message`, `variant`,
// `visible`) plus `update:visible`. The dismissal CLOCK lives in the child
// (ActionFeedback.vue:37-47) while the visibility STATE lives in the parent
// (PaletteCard.vue:234-236). The child's re-arm trigger is:
//
//     watch(() => props.visible, (v) => { ... })      // ActionFeedback.vue:39-47
//
// — a change-watcher on a BOOLEAN. `showFeedback()` (PaletteCard.vue:238-242) sets
// `feedbackVisible.value = true` unconditionally, so when a SECOND verdict arrives
// while the first chip is still up, `visible` does not CHANGE, the watcher does not
// fire, and the 2500ms clock is NOT re-armed. The second verdict inherits whatever
// remains of the first verdict's lifetime.
//
// Claim under test (L-4): a second verdict delivered while the first is showing is
// displayed for the FIRST verdict's remaining time, not its own `autoDismissMs`.
//
// Falsifier: if verdict B survives ~2500ms from ITS OWN arrival, L-4 is REFUTED.
//
// Run:  node docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-no-verdict-identity.mjs
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
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", s), SEED);
const page = await ctx.newPage();
await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "networkidle" });
await page.waitForSelector('[role="article"]', { timeout: 20000 });

const trace = await page.evaluate(async () => {
    const card = document.querySelector('[role="article"]');
    const show = (m, v) => card.__vueParentComponent.exposed.showFeedback(m, v);
    const sample = () => {
        const chip = card.querySelector(".feedback-chip");
        return chip ? chip.textContent.trim() : null;
    };
    const t0 = performance.now();
    const log = [];
    const at = (label) => log.push({ label, tMs: Math.round(performance.now() - t0), chip: sample() });

    show("VERDICT-A", "success"); // t=0 -> clock armed for 2500ms
    await new Promise((r) => setTimeout(r, 100));
    at("A shown (t≈100)");

    await new Promise((r) => setTimeout(r, 1900)); // t≈2000
    show("VERDICT-B", "error"); // visible is ALREADY true -> watcher does not fire
    await new Promise((r) => setTimeout(r, 150));
    at("B shown (t≈2150)");

    await new Promise((r) => setTimeout(r, 700)); // t≈2850 — past A's 2500ms deadline
    at("t≈2850 (A's clock expired)");

    await new Promise((r) => setTimeout(r, 1000)); // t≈3850 — B would still be up if re-armed
    at("t≈3850 (B's own clock would still be running)");

    return log;
});

console.log(JSON.stringify(trace, null, 2));

const bShown = trace.find((r) => r.label.startsWith("B shown"));
const afterAClock = trace.find((r) => r.label.startsWith("t≈2850"));
const bOwnClock = trace.find((r) => r.label.startsWith("t≈3850"));

console.log("\n--- VERDICT ---");
console.log("B displayed at t≈2150 :", bShown.chip);
console.log("B at t≈2850 (A's clock expired) :", afterAClock.chip);
console.log("B at t≈3850 (B's own clock)     :", bOwnClock.chip);
const confirmed =
    bShown.chip === "VERDICT-B" && afterAClock.chip === null && bOwnClock.chip === null;
console.log(
    "\nL-4",
    confirmed
        ? `CONFIRMED — VERDICT-B lived ~${afterAClock.tMs - bShown.tMs}ms (A's remainder), not its own 2500ms. The contract has no verdict identity, so the child cannot tell a NEW verdict from the one already on screen.`
        : "REFUTED / inconclusive.",
);

await browser.close();
