#!/usr/bin/env node
/**
 * css-emission-probe.mjs — the N.W2.B desktop-pane-visibility emission gate.
 *
 * Asserts that the load-bearing responsive display utilities used ONLY on
 * App.vue's pane wrappers survive into the BUILT gh-pages stylesheet. These
 * utilities toggle the desktop dual-pane vs. mobile single-slot layout:
 *
 *   .lg\:flex   — App.vue:44  the desktop LEFT pane wrapper (`hidden lg:flex`)
 *   .lg\:block  — App.vue:57  the desktop RIGHT pane wrapper (`hidden lg:block`)
 *   .lg\:hidden — App.vue:33  the mobile slot, which must vanish at desktop
 *   .sm\:max-w-lg — App.vue:33 the mobile slot's ≥40rem width clamp
 *
 * If any go unemitted (the K.W2.6 / C9 §1.1 P0), the base `hidden` wins on both
 * desktop wrappers (`display:none` ≥1024px) and the mobile slot leaks onto
 * desktop — the secondary panes blank above ~1024px. This is the P9
 * phantom-utility failure mode (inv-N-7) for the build-output side: a utility
 * that "cannot error" in source silently no-ops in the emitted CSS.
 *
 * The structural fix is the explicit `@source` directive in
 * `demo/@/styles/style.css` (no longer relying on Tailwind's git-root
 * auto-detection). This probe is its loud backstop: a future scan regression
 * fails CI here instead of shipping a blank desktop.
 *
 * Each lg: witness is additionally asserted to sit under a `min-width:64rem`
 * (≥1024px) media query and the sm: witness under `min-width:40rem` — an
 * un-gated bare rule would apply at every width and is itself a regression.
 *
 * Standalone node script (the abrogation-sweep idiom): no proof-script grep
 * budget, just the build-output assertion wired as its own blocking CI step.
 *
 * Exit codes: 0 = every witness emitted under its breakpoint; non-zero = any
 * witness missing or mis-gated (the offending witnesses are printed).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const GH_PAGES_ASSETS = join(REPO_ROOT, "dist/gh-pages/assets");

// The witness utilities (escaped CSS-selector form) + the breakpoint each MUST
// sit under. `64rem` = Tailwind's `lg` (1024px); `40rem` = `sm` (640px). The
// build emits `@media (width>=64rem)` (range syntax); accept either the modern
// range form or the classic `min-width:` form so a Tailwind serializer change
// doesn't false-fail this gate.
const WITNESSES = [
    { selector: ".lg\\:flex", display: "flex", remBreak: "64rem" },
    { selector: ".lg\\:block", display: "block", remBreak: "64rem" },
    { selector: ".lg\\:hidden", display: "none", remBreak: "64rem" },
    { selector: ".sm\\:max-w-lg", display: null, remBreak: "40rem" },
];

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

function main() {
    const bundles = readBuiltCss();
    const failures = [];

    for (const w of WITNESSES) {
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
                `  • ${w.selector} — NOT EMITTED (desktop panes blank: the @source scan ` +
                    "dropped an App.vue-only utility)",
            );
            continue;
        }
        // Verify the breakpoint gate. Accept range syntax (`width>=64rem`) or
        // the classic `min-width:64rem`. A bare (un-media'd) rule is a regression.
        const m = hit.mediaText.replace(/\s+/g, "");
        const gated =
            m.includes(`>=${w.remBreak}`) || m.includes(`min-width:${w.remBreak}`);
        if (!gated) {
            failures.push(
                `  • ${w.selector} — emitted but NOT gated at ${w.remBreak} ` +
                    `(found media: "${hit.mediaText.trim() || "(none — bare rule)"}")`,
            );
        }
    }

    if (failures.length > 0) {
        console.error(
            `[css-emission-probe] FAIL — ${failures.length} witness utility regression(s):\n` +
                failures.join("\n") +
                "\n\nThe desktop-pane-visibility @source scan (demo/@/styles/style.css) " +
                "no longer covers App.vue's responsive display utilities.",
        );
        process.exit(1);
    }

    console.log(
        "[css-emission-probe] PASS — desktop-pane witnesses emitted under their breakpoints: " +
            WITNESSES.map((w) => w.selector).join(", "),
    );
}

main();
