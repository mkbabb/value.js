/**
 * R.W2.4 — the in-tree 1440 dual-pane CSSOM probe (D8-1 gate split).
 *
 * The SHIM oracle, re-authored in-tree (the discarded `.w6a-audit*.mjs` scratch
 * never returns as tracked source). This probe records, on the live built-graph
 * demo at the 1440 dual-pane viewport, TWO facts and the causal link between
 * them:
 *
 *   1 · the DEFECT (runtime): both desktop `.pane-wrapper`s
 *       (`App.vue` — `hidden lg:flex` / `hidden lg:block`) compute
 *       `display:none` at 1440, so the desktop dual-pane is blank.
 *
 *   2 · the CASCADE ROOT (source): glass-ui's build-emitted, UNLAYERED
 *       `@import "./components.css"` (`dist/styles/index.css:266` — the NEW
 *       site after the 15:10 producer rebuild moved `/styles` onto the emitted
 *       tree) pulls in bare Tailwind utilities whose `.hidden{display:none}` —
 *       being UNLAYERED — beats the demo's LAYERED responsive `lg:flex`/
 *       `lg:block` (css-cascade-5: an unlayered rule wins over every `@layer`'d
 *       rule regardless of specificity).
 *
 * DEFECT-TOLERANT BY CONSTRUCTION (the re-authoring, R.W2 completion lane): the
 * probe never waits on the `role="main"` landmark — the defect COLLAPSES it
 * (the bare `.hidden` white-screens the demo at ≥ lg), so a landmark wait times
 * out exactly when the defect is present (the failure the prior probe hit). It
 * instead waits on the Vue mount signal that SURVIVES the collapse (`#app` has
 * children + the dock renders), then walks the live `document.styleSheets` CSSOM
 * to record the `.hidden` rule's layer context and the winning stylesheet href.
 * It records TRUTH in BOTH worlds:
 *   - DEFECT-PRESENT → records the defect (visibleCount < 2), the unlayered root
 *     (the `:266` site), and the SHIM/REFUTE oracle.
 *   - DEFECT-CURED  → records visibleCount 2 with NO `!important` shim (the D8-1
 *     verify-at-consume instrument firing early).
 *
 * GATE SPLIT (per `dispatch-homes.md B.2` / `SYNTHESIS-v2.md §3 R.W2`):
 *   - INTERNAL (this probe, blocks R.W2): the defect + its cascade root are
 *     confirmed in-tree. R.W2 confirms the defect; it does NOT own the cure.
 *   - EXTERNAL (BOOKED, D8-1): the no-shim render gate retires when glass-ui's
 *     `layer(components)` dist lands. This probe VERIFIES-AT-CONSUME.
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
    /** 1-indexed line of the `@import "./components.css"` in index.css. */
    importSite: number | null;
    indexUnlayered: boolean;
    indexLayered: boolean;
    deferredUnlayered: boolean;
    deferredLayered: boolean;
    componentsHasBareHidden: boolean;
    componentsLayerCount: number;
}

/**
 * Read the glass-ui dist to establish the SOURCE half of the attribution:
 * whether the `components.css` import is emitted layered or unlayered, whether
 * `components.css` carries a bare (unlayered) `.hidden`, and — for the record —
 * the 1-indexed import SITE (the `:266` the escalation names).
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

    const importLineIdx = index
        .split("\n")
        .findIndex((l) => /@import\s+"\.\/components\.css"/.test(l));

    return {
        importSite: importLineIdx >= 0 ? importLineIdx + 1 : null,
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

interface HiddenRuleSite {
    href: string | null;
    /** True if the `.hidden` rule sits inside an `@layer` block. */
    layered: boolean;
    /** The enclosing layer name, if layered (else null). */
    layerName: string | null;
}

interface CssomWalk {
    /** Every stylesheet-resident `.hidden{display:none}` rule and its layer context. */
    hiddenRuleSites: HiddenRuleSite[];
    /**
     * The WINNING `.hidden`: on a coherent substrate the cascade winner is the
     * LAST unlayered `.hidden` (unlayered beats layered), or — once cured — a
     * layered one. Recorded for the artifact (the "winning stylesheet href").
     */
    winningHref: string | null;
    winningLayered: boolean;
    anyUnlayeredHidden: boolean;
}

/**
 * Walk the live `document.styleSheets` CSSOM to record every `.hidden`
 * `{display:none}` rule, whether it sits inside an `@layer` block, and the href
 * of the sheet it lives in — the runtime confirmation of the SOURCE attribution
 * (source says "unlayered import"; the CSSOM proves the rule is unlayered AND
 * which sheet carries it).
 */
function walkCssom(page: Page): Promise<CssomWalk> {
    return page.evaluate(() => {
        const sites: HiddenRuleSite[] = [];

        // Is a rule enclosed by a `@layer {…}` block? Walk the parentRule chain
        // looking for a CSSLayerBlockRule (the layer context the cascade honors).
        const layerOf = (rule: CSSRule): string | null => {
            let cur: CSSRule | null = rule;
            while (cur) {
                // CSSLayerBlockRule carries a `.name`; feature-detect by shape so
                // this stays robust across engines that lack the constructor.
                const asLayer = cur as CSSRule & { name?: string };
                if (
                    cur.constructor?.name === "CSSLayerBlockRule" &&
                    typeof asLayer.name === "string"
                ) {
                    return asLayer.name || "(anonymous)";
                }
                cur = cur.parentRule;
            }
            return null;
        };

        const matchesHidden = (sel: string): boolean =>
            /(^|,)\s*\.hidden\s*(,|$)/.test(sel);

        const scan = (rules: CSSRuleList, href: string | null): void => {
            for (const rule of Array.from(rules)) {
                const style = rule as CSSStyleRule;
                if (
                    style.selectorText &&
                    matchesHidden(style.selectorText) &&
                    style.style?.getPropertyValue("display") === "none"
                ) {
                    const layerName = layerOf(rule);
                    sites.push({ href, layered: layerName !== null, layerName });
                }
                // Recurse into grouping rules (@layer, @media, @supports).
                const grouping = rule as CSSGroupingRule;
                if (grouping.cssRules) scan(grouping.cssRules, href);
            }
        };

        for (const sheet of Array.from(document.styleSheets)) {
            let rules: CSSRuleList | null = null;
            try {
                rules = sheet.cssRules;
            } catch {
                // cross-origin sheet — cannot introspect; skip (all app CSS is
                // same-origin under the dev/built graph).
                continue;
            }
            if (rules) scan(rules, sheet.href);
        }

        const unlayered = sites.filter((s) => !s.layered);
        // Cascade winner: an unlayered `.hidden` beats every layered rule; if
        // none is unlayered (cured), the last layered `.hidden` is the winner.
        const winner =
            unlayered.length > 0
                ? unlayered[unlayered.length - 1]!
                : (sites[sites.length - 1] ?? null);

        return {
            hiddenRuleSites: sites,
            winningHref: winner?.href ?? null,
            winningLayered: winner ? winner.layered : false,
            anyUnlayeredHidden: unlayered.length > 0,
        };
    });
}

test("D8-1 · dual-pane at 1440 — defect + cascade root confirmed in-tree", async ({
    page,
}, testInfo) => {
    const root = readCascadeRoot();

    await page.goto("/", { waitUntil: "load" });

    // Mount signal that SURVIVES the defect collapse: `#app` has children (Vue
    // mounted) and the glass dock renders. The `role="main"` landmark is NOT
    // waited on — the defect white-screens it at ≥ lg, so a landmark wait would
    // time out exactly when the defect is present (the re-authoring's whole
    // point). The dock is not gated by the `lg:*`/`.hidden` cascade under test.
    await page.waitForFunction(
        () => {
            const app = document.getElementById("app");
            return !!app && app.children.length > 0;
        },
        { timeout: 30_000 },
    );
    await page
        .locator(".glass-dock, [data-dock], nav")
        .first()
        .waitFor({ state: "attached", timeout: 30_000 });

    // Both desktop pane-wrappers must exist in the DOM (they are display-toggled,
    // never v-if'd off at ≥ lg) — the probe measures COMPUTED display, not class
    // presence (emission ≠ effect; the P9 second life).
    const baseline = await measurePanes(page);
    expect(baseline.count).toBe(2);

    const cssom = await walkCssom(page);

    const record: Record<string, unknown> = {
        probe: "R.W2.4 dual-pane-1440",
        viewport: "1440×900",
        cascadeRoot: root,
        importSiteCite: `dist/styles/index.css:${root.importSite ?? "?"}`,
        cssom,
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

        // The CSSOM must corroborate the SOURCE: an unlayered `.hidden` exists.
        expect(
            cssom.anyUnlayeredHidden,
            "the CSSOM walk must find an UNLAYERED .hidden (the runtime confirmation of the unlayered @import root)",
        ).toBe(true);

        // REFUTE: a demo-side LAYERED cure does not restore the panes (it loses
        // to the unlayered rule) — this is why the cure is producer-owned.
        await page.addStyleTag({
            content:
                "@layer r-w2-probe-refute { .pane-wrapper { display: flex; } }",
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
            "D8-1 defect + cascade root confirmed in-tree (unlayered @import at " +
            `dist/styles/index.css:${root.importSite ?? "?"}); no-shim render gate stays EXTERNAL-booked (glass-ui layer(components) producer cure).`;
    } else if (rootIsLayered) {
        // ── CURE-OBSERVED branch (D8-1 verify-at-consume fired early) ──
        // The producer's `layer(components)` cure has landed in the resolved
        // `file:` dist — the foreign `.hidden` is now layered and outranked, so
        // the panes render with NO shim.
        expect(
            baseline.visible,
            "layered components import — both panes must render with no shim (no !important)",
        ).toBe(2);

        record.verdict = "CURE_OBSERVED";
        record.note =
            "glass-ui layer(components) cure present in dist — D8-1 no-shim render book verified at consume (visibleCount 2, no !important; retire the w6a shim knowledge from the gate wording).";
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
