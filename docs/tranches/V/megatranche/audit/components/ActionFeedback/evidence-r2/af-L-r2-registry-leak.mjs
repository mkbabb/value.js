// AF·L·r2 — PROBE 2: the imperative channel has no teardown contract.
//
// ActionFeedback is NOT exported by any barrel. Its ONLY drive path is
// `PaletteCard`'s `defineExpose({ showFeedback })` (PaletteCard.vue:244), reached
// through a hand-rolled template-ref registry in the panes:
//
//   PalettesPane.vue:84   :ref="(el: any) => el && (cardRefs[palette.id] = el)"
//   BrowsePane.vue:94     :ref="(el: any) => el && (cardRefs[palette.slug] = el)"
//
// Vue invokes a function ref with `null` on unmount. The `el &&` guard SWALLOWS
// that null call, so the registry entry is never deleted.
//
// Claims under test:
//   L-3a  the registry retains unmounted PaletteCard instances (unbounded, no release)
//   L-3b  a verdict addressed to a retained-but-unmounted card is SILENTLY LOST
//         (no chip, no throw, no console warning) — the operation's outcome vanishes
//
// Falsifier: if the entry disappears on unmount, or if the addressed feedback still
// surfaces to the user somewhere, L-3 is REFUTED.
//
// Run:  node docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-registry-leak.mjs
// Needs: dev stack up on :9000 (demo).

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ORIGIN = "http://localhost:9000";

const now = new Date().toISOString();
const mk = (id, name) => ({
    id,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    colors: [{ css: "#e11d48" }, { css: "#0ea5e9" }, { css: "#22c55e" }],
    createdAt: now,
    updatedAt: now,
    isLocal: true,
    visibility: "private",
});
const SEED = JSON.stringify({
    version: 1,
    palettes: [mk("af-probe-1", "Audit Alpha"), mk("af-probe-2", "Audit Beta")],
});

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await ctx.addInitScript((seed) => {
    localStorage.setItem("color-palettes", seed);
}, SEED);
const page = await ctx.newPage();

const consoleLog = [];
page.on("console", (m) => consoleLog.push(`${m.type()}: ${m.text()}`.slice(0, 200)));
page.on("pageerror", (e) => consoleLog.push(`pageerror: ${e.message}`.slice(0, 200)));

await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "networkidle" });
await page.waitForSelector('[role="article"]', { timeout: 20000 });

// Reach PalettesPane's setup scope (dev build exposes `setupState`).
const findPane = () => {
    const card = document.querySelector('[role="article"]');
    let n = card.__vueParentComponent;
    while (n && !(n.setupState && "cardRefs" in n.setupState)) n = n.parent;
    return n;
};

const before = await page.evaluate(
    (src) => {
        const findPane = new Function("return " + src)();
        const pane = findPane();
        return {
            paneName: pane.type.__name || pane.type.name,
            cardRefKeys: Object.keys(pane.setupState.cardRefs),
            mountedCards: document.querySelectorAll('[role="article"]').length,
        };
    },
    findPane.toString(),
);

// Unmount ONE card by filtering it out through the pane's own search box.
await page.fill('input[type="search"], input[placeholder*="Search"]', "Alpha");
await page.waitForFunction(() => document.querySelectorAll('[role="article"]').length === 1, {
    timeout: 10000,
});
await page.waitForTimeout(400);

const after = await page.evaluate(
    (src) => {
        const findPane = new Function("return " + src)();
        const pane = findPane();
        const refs = pane.setupState.cardRefs;
        const keys = Object.keys(refs);
        // `defineExpose` hands the template ref the PUBLIC instance proxy, so
        // liveness is `$el.isConnected` and the method is reached directly.
        const retainedDead = keys.filter((k) => {
            const inst = refs[k];
            return !inst || !inst.$el || !inst.$el.isConnected;
        });
        return {
            cardRefKeys: keys,
            mountedCards: document.querySelectorAll('[role="article"]').length,
            retainedDead,
        };
    },
    findPane.toString(),
);

// Address a verdict to the retained-but-unmounted card — exactly what
// PalettesPane.vue:205-207 / BrowsePane.vue:249 do after an async round-trip.
const lost = await page.evaluate(
    async (src) => {
        const findPane = new Function("return " + src)();
        const pane = findPane();
        const refs = pane.setupState.cardRefs;
        const deadKey = Object.keys(refs).find((k) => {
            const i = refs[k];
            return i && i.$el && !i.$el.isConnected;
        });
        if (!deadKey) return { deadKey: null };
        let threw = null;
        try {
            // EXACTLY the call PalettesPane.vue:207 / BrowsePane.vue:249 make.
            refs[deadKey].showFeedback("Published!", "success");
        } catch (e) {
            threw = e.message;
        }
        await new Promise((r) => setTimeout(r, 300));
        return {
            deadKey,
            threw,
            chipsOnScreen: document.querySelectorAll(".feedback-chip").length,
            bodyMentionsVerdict: document.body.innerText.includes("Published!"),
        };
    },
    findPane.toString(),
);

await page.screenshot({ path: path.join(HERE, "AF-L-r2-04-verdict-lost.png") });

console.log("BEFORE filter :", JSON.stringify(before));
console.log("AFTER  filter :", JSON.stringify(after));
console.log("LOST verdict  :", JSON.stringify(lost));
console.log("console/page errors:", consoleLog.filter((l) => /error|warn/i.test(l)).slice(0, 6));

console.log("\n--- VERDICT ---");
const leaked = after.cardRefKeys.length > after.mountedCards;
console.log(
    "L-3a",
    leaked
        ? `CONFIRMED — ${after.cardRefKeys.length} registry entries vs ${after.mountedCards} mounted card(s); retained-dead: ${JSON.stringify(after.retainedDead)}`
        : "REFUTED — the registry released the unmounted entry.",
);
console.log(
    "L-3b",
    lost.deadKey && !lost.threw && lost.chipsOnScreen === 0 && !lost.bodyMentionsVerdict
        ? "CONFIRMED — the verdict was addressed to a dead instance: no chip, no throw, no warning. Outcome silently lost."
        : "REFUTED / inconclusive.",
);

await browser.close();
