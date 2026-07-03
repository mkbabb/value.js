/**
 * R.W2.4 — the in-tree 1440 dual-pane CSSOM probe (D8-1 gate split).
 *
 * The SHIM oracle, re-authored in-tree (the discarded `.w6a-audit*.mjs` scratch
 * never returns as tracked source). This probe records, on the live built-graph
 * demo at the 1440 dual-pane viewport, TWO facts and the causal link between
 * them:
 *
 *   1 · the DEFECT (runtime): both desktop `.pane-wrapper`s
 *       (`App.vue:45,58` — `hidden lg:flex` / `hidden lg:block`) compute
 *       `display:none` at 1440, so the desktop dual-pane is blank.
 *
 *   2 · the CASCADE ROOT (source): glass-ui's build-emitted, UNLAYERED
 *       `@import "./components.css"` (in `dist/styles/index.css` +
 *       `dist/styles/deferred.css`) pulls in 53 KB of bare Tailwind utilities
 *       whose `.hidden{display:none}` — being UNLAYERED — beats the demo's
 *       LAYERED responsive `lg:flex`/`lg:block` (css-cascade-5: an unlayered
 *       rule wins over every `@layer`'d rule regardless of specificity).
 *
 * The causal link is proven by the SHIM oracle (the falsifiable before/after
 * bar) plus its REFUTE twin:
 *
 *   - REFUTE: a demo-side *layered* `.pane-wrapper{display:flex}` cure does NOT
 *     restore the panes — it loses to the unlayered `.hidden` exactly as the
 *     spec says every demo-side cure must (this is WHY the cure is
 *     producer-owned: the root is layer-precedence, not specificity).
 *   - SHIM: only a `display:flex !important` shim (the historical w6a
 *     technique) out-shouts the unlayered rule and renders both panes.
 *
 * GATE SPLIT (per `dispatch-homes.md B.2` / `SYNTHESIS-v2.md §3 R.W2`):
 *   - INTERNAL (this probe, blocks R.W2): the defect + its cascade root are
 *     confirmed in-tree. R.W2 confirms the defect; it does NOT own the cure.
 *   - EXTERNAL (BOOKED, D8-1): the no-shim render gate retires when glass-ui's
 *     `layer(components)` dist lands. This probe VERIFIES-AT-CONSUME: if the
 *     producer cure has already landed in the resolved `file:` dist, the defect
 *     no longer reproduces (visibleCount 2, no shim) — the probe records that as
 *     the D8-1 book firing early (CURE_OBSERVED), NOT as a probe failure.
 *
 * The probe therefore always passes on a COHERENT substrate; it FAILS only if
 * the source root and the runtime effect disagree (an unlayered root that does
 * NOT annihilate, or a layered root that does NOT render) — i.e. if the
 * cascade-root attribution is refuted (a §Triumvirate condition).
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test, type Page } from "@playwright/test";

// The 1440 dual-pane viewport — the width at which the defect was reported
// (desktop ≥ lg = 1024). Overrides the `smoke` project's 1280×720 default.
test.use({ viewport: { width: 1440, height: 900 } });

const HERE = dirname(fileURLToPath(import.meta.url));
const GLASS_STYLES = resolve(
    HERE,
    "../../node_modules/@mkbabb/glass-ui/dist/styles",
);

/** No-layer `@import "./components.css";` (the defect emission). */
const UNLAYERED_IMPORT = /@import\s+"\.\/components\.css"\s*;/;
/** `@import "./components.css" layer(...)` (the D8-1 producer cure). */
const LAYERED_IMPORT = /@import\s+"\.\/components\.css"\s+layer\(/;
/** Bare, unlayered `.hidden{display:none}` in the components dump. */
const BARE_HIDDEN = /\.hidden\{display:\s*none\}/;

interface CascadeRoot {
    indexUnlayered: boolean;
    indexLayered: boolean;
    deferredUnlayered: boolean;
    deferredLayered: boolean;
    componentsHasBareHidden: boolean;
    componentsLayerCount: number;
}

/**
 * Read the glass-ui dist to establish the SOURCE half of the attribution:
 * whether the `components.css` import is emitted layered or unlayered, and
 * whether `components.css` carries a bare (unlayered) `.hidden`.
 */
function readCascadeRoot(): CascadeRoot {
    const index = readFileSync(resolve(GLASS_STYLES, "index.css"), "utf8");
    const components = readFileSync(
        resolve(GLASS_STYLES, "components.css"),
        "utf8",
    );
    const deferredPath = resolve(GLASS_STYLES, "deferred.css");
    const deferred = existsSync(deferredPath)
        ? readFileSync(deferredPath, "utf8")
        : "";

    return {
        indexUnlayered: UNLAYERED_IMPORT.test(index),
        indexLayered: LAYERED_IMPORT.test(index),
        deferredUnlayered: UNLAYERED_IMPORT.test(deferred),
        deferredLayered: LAYERED_IMPORT.test(deferred),
        componentsHasBareHidden:
            BARE_HIDDEN.test(components) && !/@layer/.test(components),
        componentsLayerCount: (components.match(/@layer/g) ?? []).length,
    };
}

interface PaneMeasure {
    count: number;
    displays: string[];
    visible: number;
}

/** Read the RUNTIME half: computed `display` of every `.pane-wrapper`. */
function measurePanes(page: Page): Promise<PaneMeasure> {
    return page.evaluate(() => {
        const wrappers = Array.from(
            document.querySelectorAll<HTMLElement>(".pane-wrapper"),
        );
        const displays = wrappers.map((el) => getComputedStyle(el).display);
        return {
            count: wrappers.length,
            displays,
            visible: displays.filter((d) => d !== "none").length,
        };
    });
}

test("D8-1 · dual-pane at 1440 — defect + cascade root confirmed in-tree", async ({
    page,
}, testInfo) => {
    const root = readCascadeRoot();

    await page.goto("/");
    await page.getByRole("main", { name: "Color tool panes" }).waitFor();

    // Both desktop pane-wrappers must exist in the DOM (they are display-toggled,
    // never v-if'd off at ≥ lg) — the probe measures COMPUTED display, not class
    // presence (emission ≠ effect; the P9 second life).
    const baseline = await measurePanes(page);
    expect(baseline.count).toBe(2);

    const record: Record<string, unknown> = {
        probe: "R.W2.4 dual-pane-1440",
        viewport: "1440×900",
        cascadeRoot: root,
        baseline,
    };

    const rootIsUnlayered =
        root.indexUnlayered && root.componentsHasBareHidden;
    const rootIsLayered = root.indexLayered && !root.indexUnlayered;

    if (rootIsUnlayered) {
        // ── DEFECT-PRESENT branch (the pre-cure substrate) ──
        // The unlayered `.hidden` annihilates the layered `lg:flex`/`lg:block`.
        expect(
            baseline.visible,
            "unlayered glass-ui .hidden must annihilate the layered lg:flex — desktop blank",
        ).toBeLessThan(2);

        // REFUTE: a demo-side LAYERED cure does not restore the panes (it loses
        // to the unlayered rule) — this is why the cure is producer-owned.
        await page.addStyleTag({
            content: "@layer r-w2-probe-refute { .pane-wrapper { display: flex; } }",
        });
        const refuted = await measurePanes(page);
        record.refutedByLayeredCure = refuted;
        expect(
            refuted.visible,
            "a demo-side LAYERED cure must REFUTE — layered loses to unlayered",
        ).toBeLessThan(2);

        // SHIM oracle: only `display:flex !important` out-shouts the unlayered
        // rule (the historical w6a technique — the only thing that renders both
        // panes today).
        await page.addStyleTag({
            content: ".pane-wrapper { display: flex !important; }",
        });
        const shimmed = await measurePanes(page);
        record.renderedByImportantShim = shimmed;
        expect(
            shimmed.visible,
            "the !important shim is the ONLY thing that renders both panes",
        ).toBe(2);

        record.verdict = "DEFECT_CONFIRMED";
        record.note =
            "D8-1 defect + cascade root confirmed in-tree; no-shim render gate stays EXTERNAL-booked (glass-ui layer(components) producer cure).";
    } else if (rootIsLayered) {
        // ── CURE-OBSERVED branch (D8-1 verify-at-consume fired early) ──
        // The producer's `layer(components)` cure has landed in the resolved
        // `file:` dist — the foreign `.hidden` is now layered and outranked, so
        // the panes render with NO shim.
        expect(
            baseline.visible,
            "layered components import — both panes must render with no shim",
        ).toBe(2);

        record.verdict = "CURE_OBSERVED";
        record.note =
            "glass-ui layer(components) cure present in dist — D8-1 no-shim render book verified at consume (retire the w6a shim knowledge from the gate wording).";
    } else {
        throw new Error(
            `Incoherent cascade state — attribution refuted (a §Triumvirate condition). Root: ${JSON.stringify(
                root,
            )}`,
        );
    }

    const json = JSON.stringify(record, null, 2);
    console.log(`[dual-pane-1440] ${json}`);
    await testInfo.attach("dual-pane-1440-record.json", {
        body: json,
        contentType: "application/json",
    });
});
