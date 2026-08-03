// AF·L·r2 — PROBE 1: the tone-axis fork, measured in live bytes.
//
// Claim under test (L-1): `ActionFeedback.vue:8` renders its SUCCESS rung from raw
// Tailwind palette literals (`bg-green-500/10 text-green-600 dark:text-green-400`)
// while `ActionFeedback.vue:9`, ONE LINE LATER, renders its ERROR rung from the
// producer tone token (`bg-destructive/10 text-destructive`). glass-ui 7.0.0 seals
// the tone axis in `dist/components/_shared/axes.d.ts`:
//     TONES = ["neutral","success","warning","info","destructive"]
//     "The tone axis — the semantic status register; NEVER a `variant` member."
// and bridges it to Tailwind in `dist/styles/theme/bridges.css`:
//     --color-success: var(--success);
//
// Falsifier: if the success ink resolves to the SAME colour as the live `--success`
// token, there is no fork and L-1 is REFUTED.
//
// Run:  node docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-tone-fork.mjs
// Needs: dev stack up on :9000 (demo).

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ORIGIN = "http://localhost:9000";

// Seed two LOCAL palettes so PalettesPane renders two PaletteCards without auth.
// (Browser-side seeding only — no repo source is touched.)
const now = new Date().toISOString();
const mk = (id, name) => ({
    id,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    colors: [
        { css: "#e11d48", name: "rose" },
        { css: "#0ea5e9", name: "sky" },
        { css: "#22c55e", name: "green" },
    ],
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

await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "networkidle" });
await page.waitForSelector('[role="article"]', { timeout: 20000 });

// Drive the chip through the EXACT public surface the panes use: PaletteCard's
// `defineExpose({ showFeedback })` (PaletteCard.vue:244), reached via the
// `cardRefs` registry at BrowsePane.vue:230/239/249/264 and PalettesPane.vue:207.
const measured = await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('[role="article"]')];
    const exposedKeys = Object.keys(cards[0].__vueParentComponent.exposed ?? {});
    const read = async (i, variant, msg) => {
        cards[i].__vueParentComponent.exposed.showFeedback(msg, variant);
        await new Promise((r) => setTimeout(r, 200));
        const chip = cards[i].querySelector(".feedback-chip");
        const cs = getComputedStyle(chip);
        return {
            classes: chip.className,
            role: chip.getAttribute("role"),
            ariaLive: chip.getAttribute("aria-live"),
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            borderRadius: cs.borderRadius,
            padding: cs.padding,
            gap: cs.gap,
            fontSize: cs.fontSize,
        };
    };
    const success = await read(0, "success", "Saved!");
    const error = await read(1, "error", "Publish failed");

    // Resolve the producer's live tone tokens by painting a probe node.
    const probe = document.createElement("div");
    probe.style.cssText =
        "position:fixed;left:-9999px;color:var(--success);background-color:var(--destructive)";
    document.body.appendChild(probe);
    const pcs = getComputedStyle(probe);
    const tokens = { success: pcs.color, destructive: pcs.backgroundColor };
    probe.remove();

    // DARK ARM. `--success` is already `light-dark(...)`, so the token handles the
    // dark scheme by itself. The leaf instead hand-rolls a SECOND dark mechanism
    // (`dark:text-green-400`, ActionFeedback.vue:8). Compare the two.
    document.documentElement.classList.add("dark");
    await new Promise((r) => setTimeout(r, 120));
    cards[0].__vueParentComponent.exposed.showFeedback("Saved!", "success");
    await new Promise((r) => setTimeout(r, 200));
    const darkChip = getComputedStyle(cards[0].querySelector(".feedback-chip")).color;
    const dprobe = document.createElement("div");
    dprobe.style.cssText = "position:fixed;left:-9999px;color:var(--success)";
    document.body.appendChild(dprobe);
    const darkToken = getComputedStyle(dprobe).color;
    dprobe.remove();
    document.documentElement.classList.remove("dark");

    return { exposedKeys, success, error, tokens, dark: { chip: darkChip, token: darkToken } };
});

// Hold both chips up (they self-dismiss at autoDismissMs=2500) for the witness shot.
await page.evaluate(() => {
    const arm = () => {
        const cards = [...document.querySelectorAll('[role="article"]')];
        cards[0]?.__vueParentComponent?.exposed?.showFeedback("Saved!", "success");
        cards[1]?.__vueParentComponent?.exposed?.showFeedback("Publish failed", "error");
    };
    arm();
    setInterval(arm, 500);
});
await page.waitForTimeout(700);
await page.screenshot({ path: path.join(HERE, "AF-L-r2-01-both-tones.png") });
const chips = await page.$$(".feedback-chip");
if (chips[0]) await chips[0].screenshot({ path: path.join(HERE, "AF-L-r2-02-success-chip.png") });
if (chips[1]) await chips[1].screenshot({ path: path.join(HERE, "AF-L-r2-03-error-chip.png") });

const norm = (s) => String(s).replace(/\s+/g, " ").trim();
const successTokenBacked = norm(measured.success.color) === norm(measured.tokens.success);
const errorTokenBacked = norm(measured.error.color) === norm(measured.tokens.destructive);

console.log(JSON.stringify(measured, null, 2));
console.log("\n--- VERDICT ---");
console.log("PaletteCard exposed surface :", measured.exposedKeys);
console.log("success ink   :", measured.success.color);
console.log("--success     :", measured.tokens.success, "| token-backed?", successTokenBacked);
console.log("error ink     :", measured.error.color);
console.log("--destructive :", measured.tokens.destructive, "| token-backed?", errorTokenBacked);
console.log("chip role / aria-live :", measured.success.role, "/", measured.success.ariaLive);
console.log(
    "DARK arm — chip:",
    measured.dark.chip,
    "| --success dark arm:",
    measured.dark.token,
    "| token-backed?",
    norm(measured.dark.chip) === norm(measured.dark.token),
);
console.log(
    "\nL-1",
    !successTokenBacked && errorTokenBacked
        ? "CONFIRMED — asymmetric fork: the error rung honours the tone token, the success rung does not."
        : "REFUTED / inconclusive.",
);

await browser.close();
