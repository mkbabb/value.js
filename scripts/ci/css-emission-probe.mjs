#!/usr/bin/env node
/**
 * css-emission-probe.mjs — the desktop-pane-visibility emission gate.
 *
 * Asserts that the load-bearing pane-visibility display rules survive into the
 * BUILT gh-pages stylesheet. These rules toggle the desktop dual-pane vs.
 * mobile single-slot layout; if any go unemitted the secondary panes blank
 * above ~1024px (the K.W2.6 / C9 §1.1 P0 — the P9 phantom-utility failure mode
 * for the build-output side, inv-N-7: a rule that "cannot error" in source
 * silently no-ops in the emitted CSS).
 *
 * MOB-1 (T round-4 — the C-5/D8-1 adjudication): the witnesses moved OFF the
 * width-only `lg:*` utilities ONTO the `[data-layout]` stamp. App.vue stamps
 * `data-layout="desktop|mobile"` on `.app-layout` from the single `isDesktop`
 * truth (width AND landscape), and `demo/@/styles/style.css` keys the display
 * witnesses on it, so the CSS witness IS the JS witness and the D6-03 portrait
 * display exception is gone. Two witness classes, two failure modes:
 *
 *   ATTR_WITNESSES — the hand-authored `[data-layout=…]` display rules. Their
 *     failure mode is pure emission loss (a build/minifier regression drops the
 *     rule); they must be PRESENT and are intentionally UN-media'd (the JS
 *     drives the breakpoint — a media wrapper would re-introduce the width-only
 *     disagreement the stamp exists to retire).
 *
 *   UTIL_WITNESSES — the mobile slot's `sm:max-w-lg` width clamp is the one
 *     surviving Tailwind responsive utility on the pane wrappers, so the
 *     original JIT concern (a scanned utility silently no-ops in the emitted
 *     CSS) survives for it alone, gated at 40rem.
 *
 * The structural fix is the explicit `@source` directive in
 * `demo/@/styles/style.css` (no longer relying on Tailwind's git-root
 * auto-detection). This probe is its loud backstop: a future scan/emission
 * regression fails CI here instead of shipping a blank desktop.
 *
 * Standalone node script: no proof-script grep
 * budget, just the build-output assertion wired as its own blocking CI step.
 *
 * Exit codes: 0 = every witness emitted (attr rules present, sm util gated);
 * non-zero = any witness missing or mis-gated (the offenders are printed).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const GH_PAGES_ASSETS = join(REPO_ROOT, "dist/gh-pages/assets");

// The `[data-layout]` display witnesses (source form) — must be PRESENT in the
// built CSS, un-media'd. Matched by normalized-selector substring so selector
// grouping (`a,b{…}`) and attribute-value quote-stripping by the minifier don't
// false-fail the gate.
const ATTR_WITNESSES = [
    '[data-layout="mobile"] .pane-slot-mobile', // mobile slot shows in mobile grammar
    '[data-layout="desktop"] .pane-wrapper--left', // desktop LEFT pane wrapper
    '[data-layout="desktop"] .pane-wrapper--right', // desktop RIGHT pane wrapper
    '[data-layout="desktop"] .dock-mobile-panes', // hide the mobile pane switcher on desktop
];

// The surviving Tailwind responsive utility on the pane wrappers (JIT-scanned):
// the mobile slot's ≥40rem width clamp. `64rem` = `lg` (1024px); `40rem` = `sm`.
// Accept the modern range form (`width>=40rem`) or classic `min-width:40rem`.
const UTIL_WITNESSES = [{ selector: ".sm\\:max-w-lg", remBreak: "40rem" }];

/** The widest emitted CSS bundle is the app shell's. Scan every built .css. */
function readBuiltCss() {
    let dirents;
    try {
        dirents = readdirSync(GH_PAGES_ASSETS);
    } catch {
        console.error(
            `[css-emission-probe] FAIL — no built CSS at ${GH_PAGES_ASSETS}.\n` +
                "  Run `npm run gh-pages` first (the probe asserts the BUILD output).",
        );
        process.exit(1);
    }
    const cssFiles = dirents
        .filter((n) => n.endsWith(".css"))
        .map((n) => join(GH_PAGES_ASSETS, n))
        .filter((p) => statSync(p).isFile());
    if (cssFiles.length === 0) {
        console.error(`[css-emission-probe] FAIL — zero .css files under ${GH_PAGES_ASSETS}.`);
        process.exit(1);
    }
    return cssFiles.map((p) => ({ path: p, text: readFileSync(p, "utf8") }));
}

/**
 * Find the nearest enclosing `@media` opener preceding the selector's emitted
 * rule and confirm it carries the expected rem breakpoint. Returns
 * { found, mediaText } — `found:false` means the selector's rule is absent.
 */
function locateUnderMedia(text, selector) {
    const ruleStart = text.indexOf(`${selector}{`);
    if (ruleStart < 0) return { found: false };
    // The last `@media (...)` opener before this rule is its enclosing query.
    // Tailwind emits each responsive utility inside its own breakpoint block,
    // so the nearest preceding opener is authoritative.
    const before = text.slice(0, ruleStart);
    const medias = [...before.matchAll(/@media[^{]*\{/g)];
    const mediaText = medias.length ? medias[medias.length - 1][0] : "";
    return { found: true, mediaText };
}

// Minifiers strip quotes around identifier attribute values (`[data-layout=mobile]`)
// and collapse insignificant whitespace; normalize both sides before matching so
// the selector substring compares stably.
function normalizeCss(text) {
    return text.replace(/["']/g, "").replace(/\s+/g, " ");
}

function main() {
    const bundles = readBuiltCss();
    const normalized = bundles.map((b) => ({ ...b, norm: normalizeCss(b.text) }));
    const failures = [];

    // ATTR witnesses: present (un-media'd hand-authored rules).
    for (const sel of ATTR_WITNESSES) {
        const needle = normalizeCss(sel);
        const hit = normalized.some((b) => b.norm.includes(needle));
        if (!hit) {
            failures.push(
                `  • ${sel} — NOT EMITTED (the [data-layout] pane-visibility witness ` +
                    "was dropped from the build; the mounted slot has no display rule)",
            );
        }
    }

    // UTIL witnesses: present AND gated at their breakpoint.
    for (const w of UTIL_WITNESSES) {
        let hit = null;
        for (const b of bundles) {
            const loc = locateUnderMedia(b.text, w.selector);
            if (loc.found) {
                hit = { ...loc, path: b.path };
                break;
            }
        }
        if (!hit) {
            failures.push(
                `  • ${w.selector} — NOT EMITTED (the mobile slot's width clamp ` +
                    "was dropped by the @source scan)",
            );
            continue;
        }
        const m = hit.mediaText.replace(/\s+/g, "");
        const gated = m.includes(`>=${w.remBreak}`) || m.includes(`min-width:${w.remBreak}`);
        if (!gated) {
            failures.push(
                `  • ${w.selector} — emitted but NOT gated at ${w.remBreak} ` +
                    `(found media: "${hit.mediaText.trim() || "(none — bare rule)"}")`,
            );
        }
    }

    if (failures.length > 0) {
        console.error(
            `[css-emission-probe] FAIL — ${failures.length} witness regression(s):\n` +
                failures.join("\n") +
                "\n\nThe pane-visibility witnesses (demo/@/styles/style.css [data-layout] rules " +
                "+ the mobile slot's sm:max-w-lg) no longer survive into the built CSS.",
        );
        process.exit(1);
    }

    console.log(
        "[css-emission-probe] PASS — pane-visibility witnesses emitted: " +
            ATTR_WITNESSES.concat(UTIL_WITNESSES.map((w) => w.selector)).join(", "),
    );
}

main();
