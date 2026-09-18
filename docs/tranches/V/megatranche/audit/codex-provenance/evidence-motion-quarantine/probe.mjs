// MOTION QUARANTINE probe — the 46 Codex report-authored challenge files.
//
// Measures the TWO app-wide reduced-motion guards against every motion carrier
// named by those 46 files. Read-only: writes nothing outside this evidence dir.
//
//   node docs/tranches/V/megatranche/audit/codex-provenance/evidence-motion-quarantine/probe.mjs
//
// Requires: dev demo on http://localhost:9000 (scripts/dev/dev.sh), playwright.
//
// Guard 1: demo/styles/animations.css:184-193   (global `*` neutraliser)
// Guard 2: node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css:1
//          (`*:not([data-allow-motion])`, reached via glass-ui/styles →
//           accessibility.css → utilities/a11y-overrides.css; imported at
//           demo/styles/foundation.css:56)

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFileSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DEV = "http://localhost:9000";
const out = {};
const log = (k, v) => {
    out[k] = v;
    console.log(`\n── ${k} ──\n` + JSON.stringify(v, null, 2));
};

const browser = await chromium.launch();

/** Boot a page at a given reduced-motion setting. */
async function boot(reducedMotion, url = `${DEV}/`) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion,
    });
    const page = await ctx.newPage();
    page.setDefaultTimeout(90_000);
    page.setDefaultNavigationTimeout(90_000);
    await page.goto(url, { timeout: 90_000 });
    await page.waitForTimeout(3200);
    return { ctx, page };
}

// ── A · CSSOM: are BOTH guards actually in the SERVED bytes? ────────────────
{
    const { ctx, page } = await boot("no-preference");
    log(
        "A.servedGuards",
        await page.evaluate(() => {
            const hits = [];
            const walk = (rules, href) => {
                for (const r of rules) {
                    if (r.type === CSSRule.MEDIA_RULE) {
                        const q = r.conditionText || r.media.mediaText;
                        if (q.includes("prefers-reduced-motion")) {
                            hits.push({
                                sheet: href,
                                query: q,
                                selectors: [...r.cssRules].map((x) => x.selectorText || "(no-selector)"),
                                text: r.cssText.slice(0, 460),
                            });
                        }
                        walk(r.cssRules, href);
                    } else if (r.cssRules) {
                        walk(r.cssRules, href);
                    }
                }
            };
            for (const s of document.styleSheets) {
                try {
                    walk(s.cssRules, s.href || "(inline)");
                } catch {
                    hits.push({ sheet: s.href, error: "CORS-opaque" });
                }
            }
            const global = hits.filter(
                (h) =>
                    h.selectors &&
                    h.selectors.some((sel) => sel === "*" || /^\*:not\(\[data-allow-motion\]\)/.test(sel)),
            );
            const noPref = hits.filter((h) => h.query && h.query.includes("no-preference"));
            return {
                totalPrmMediaRules: hits.length,
                globalNeutralisers: global,
                noPreferenceGates: noPref.map((h) => ({ q: h.query, sel: h.selectors, t: h.text })),
                overlayCarveOut: hits.filter(
                    (h) => h.selectors && h.selectors.some((s) => s.includes('data-state="open"')),
                ),
            };
        }),
    );
    await ctx.close();
}

// ── B · cascade effect on every motion carrier the 46 files name ────────────
// Carriers are injected as the EXACT class strings / declarations found in the
// live component bytes, into the LIVE document, so the real served cascade runs.
const CARRIERS = {
    // PointerDebugOverlay.vue:179 `.debug-frozen { animation: blink 0.5s infinite }`
    "debugFrozen.blink": { style: "animation: probe-blink 0.5s infinite;" },
    // ActionFeedback.vue:3 <Transition name="vj-celebrate"> → animations.css:142-166
    "actionFeedback.celebrateEnter": {
        cls: "vj-celebrate-enter-active feedback-chip",
        style: "--vj-celebrate-collapse:0px;--vj-celebrate-expanded:2.5rem;--vj-celebrate-scale:1;",
    },
    "actionFeedback.celebrateLeave": { cls: "vj-celebrate-leave-active" },
    // PaletteRenameInput.vue:20 / :26 (verbatim class string)
    "paletteRenameInput.confirmBtn": {
        cls: "p-0.5 rounded-sm hover:bg-accent/50 active:scale-95 active:bg-accent/70 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
    },
    // PaletteCardMeta.vue:45 (verbatim class string)
    "paletteCardMeta.voteBtn": {
        cls: "flex items-center gap-1 px-1.5 py-0.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer shrink-0",
    },
    // TagEditPopover.vue:12 `animate-spin` + :25 `transition-colors`
    "tagEditPopover.spinner": { cls: "animate-spin h-4 w-4" },
    "tagEditPopover.tagRow": {
        cls: "flex items-center gap-2 rounded-md px-2 py-1 text-small cursor-pointer hover:bg-accent/50 transition-colors",
    },
    // ConsoleRail.vue:254-261 (verbatim declaration)
    "consoleRail.channelItem": {
        style:
            "transition: color var(--duration-normal) var(--ease-standard), background-color var(--duration-normal) var(--ease-standard), transform var(--spring-press-duration) var(--spring-press);",
    },
    // control: a bare transform transition — proves the property clamp
    "control.transformTransition": { style: "transition: transform 300ms linear;" },
    // control: an element that opts OUT via [data-allow-motion]
    "control.allowMotion": { style: "animation: probe-blink 0.5s infinite;", attr: "data-allow-motion" },
};

for (const mode of ["no-preference", "reduce"]) {
    const { ctx, page } = await boot(mode);
    log(
        `B.${mode}`,
        await page.evaluate((carriers) => {
            const kf = document.createElement("style");
            kf.textContent = "@keyframes probe-blink { 50% { opacity: 0.3 } }";
            document.head.appendChild(kf);
            const host = document.createElement("div");
            document.body.appendChild(host);
            const res = {};
            for (const [k, spec] of Object.entries(carriers)) {
                const el = document.createElement("div");
                if (spec.cls) el.className = spec.cls;
                if (spec.style) el.setAttribute("style", spec.style);
                if (spec.attr) el.setAttribute(spec.attr, "");
                host.appendChild(el);
                const cs = getComputedStyle(el);
                res[k] = {
                    animationName: cs.animationName,
                    animationDuration: cs.animationDuration,
                    animationIterationCount: cs.animationIterationCount,
                    transitionProperty: cs.transitionProperty,
                    transitionDuration: cs.transitionDuration,
                };
            }
            return res;
        }, CARRIERS),
    );
    await ctx.close();
}

// ── C · REAL elements, real states ─────────────────────────────────────────
// C1 · PointerDebugOverlay `.debug-frozen` with the frozen state genuinely
//      induced (pointerdown held past FREEZE_THRESHOLD_MS = 2500).
for (const mode of ["no-preference", "reduce"]) {
    const { ctx, page } = await boot(mode, `${DEV}/?debug=1`);
    let rec = { mode, reached: false };
    try {
        await page.locator(".debug-header").click();
        await page.waitForTimeout(350);
        const box = await page.locator(".spectrum-picker, canvas").first().boundingBox();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(4200);
        rec = await page.evaluate((m) => {
            const el = document.querySelector(".debug-frozen");
            if (!el) return { mode: m, reached: false, note: "no .debug-frozen in DOM" };
            const cs = getComputedStyle(el);
            const samples = [];
            for (let i = 0; i < 5; i++) samples.push(getComputedStyle(el).opacity);
            return {
                mode: m,
                reached: true,
                text: el.textContent.trim(),
                animationName: cs.animationName,
                animationDuration: cs.animationDuration,
                animationIterationCount: cs.animationIterationCount,
                opacity: cs.opacity,
                samples,
            };
        }, mode);
        await page.mouse.up();
    } catch (e) {
        rec.error = String(e).slice(0, 200);
    }
    log(`C1.debugFrozen.${mode}`, rec);
    await ctx.close();
}

// C2 · ConsoleRail real `.channel-rail-item` + `.rail-dot` / WatercolorDot
for (const mode of ["no-preference", "reduce"]) {
    const { ctx, page } = await boot(mode);
    log(
        `C2.consoleRail.${mode}`,
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
                railItem: pick(".channel-rail-item"),
                railDotSeat: pick(".rail-dot-seat"),
                railDot: pick(".rail-dot"),
                watercolor: pick(".watercolor-swatch"),
            };
        }, mode),
    );
    await ctx.close();
}

// C3 · glass-ui Skeleton scan animation (AdminListSkeleton's primitive).
//      The `.skeleton::after` scan is gated by `no-preference`; measure the
//      ::after pseudo directly on a real Skeleton if one is on screen, else
//      inject the producer class (real served rule, real cascade).
for (const mode of ["no-preference", "reduce"]) {
    const { ctx, page } = await boot(mode);
    log(
        `C3.skeleton.${mode}`,
        await page.evaluate((m) => {
            const real = document.querySelector(".skeleton");
            const read = (el) => ({
                after: {
                    animationName: getComputedStyle(el, "::after").animationName,
                    animationDuration: getComputedStyle(el, "::after").animationDuration,
                    animationIterationCount: getComputedStyle(el, "::after").animationIterationCount,
                    transform: getComputedStyle(el, "::after").transform,
                },
            });
            const out = { mode: m, realSkeletonOnScreen: !!real };
            if (real) out.real = read(real);
            const probe = document.createElement("div");
            probe.className = "skeleton";
            probe.style.cssText = "width:80px;height:12px";
            document.body.appendChild(probe);
            out.injected = read(probe);
            return out;
        }, mode),
    );
    await ctx.close();
}

await browser.close();
writeFileSync(join(HERE, "RESULTS.json"), JSON.stringify(out, null, 2));
console.log("\nwrote " + join(HERE, "RESULTS.json"));
