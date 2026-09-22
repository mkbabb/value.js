/**
 * R.W2.4 — the in-tree 1440 region CSSOM probe (D8-1 gate split), RE-POINTED
 * at X.W5.c.
 *
 * ── WHAT THIS PROBE WAS, AND WHY IT COULD NOT STAY ──────────────────────────
 * It recorded a DEFECT and its cascade root: both desktop `.pane-wrapper`s
 * carried `hidden lg:flex` / `hidden lg:block`, and glass-ui's build-emitted
 * UNLAYERED `@import "./components.css"` pulled in a bare
 * `.hidden{display:none}` that — being unlayered — beat the demo's LAYERED
 * responsive `lg:flex`/`lg:block` (css-cascade-5), so the dual pane rendered
 * blank at 1440. Its defect branch asserted `visibleCount < 2`, refuted a
 * demo-side layered cure, and proved that only `display:flex !important`
 * out-shouted the foreign rule.
 *
 * Every one of those assertions was about a mechanism the demo no longer uses.
 * `App.vue` renders the scene's `regions[]` once, with no display utility and
 * no breakpoint predicate anywhere on the wrapper; the `[data-layout]` display
 * witnesses that replaced `lg:*` at T round-4 went with the fork at X.W5.c. A
 * pane's visibility is not decided by a `display` cascade at all any more, so
 * the old defect branch would fail for the RIGHT reason — which is not a thing
 * a probe may do silently.
 *
 * ── WHAT IT IS NOW: the IMMUNITY probe, same two halves ─────────────────────
 *   1 · the RUNTIME half — at 1440 every region of the scene is mounted AND
 *       visible with NO shim, and no `.pane-wrapper` carries a `hidden` or
 *       `lg:*` display utility. The second clause is the load-bearing one: it
 *       is what makes the first clause structural rather than lucky. A future
 *       seat that re-introduces a responsive display utility on a pane wrapper
 *       re-enters the D8-1 blast radius, and this assertion is what says so.
 *   2 · the SOURCE half — the producer's cascade state is still READ and still
 *       RECORDED (layered vs unlayered import, the bare `.hidden`, the import
 *       site, the live CSSOM's layer context for every `.hidden` rule). D8-1 is
 *       a producer book and this is still its verify-at-consume instrument;
 *       what changed is that the demo's PANE AXIS no longer depends on the
 *       answer, so the reading is recorded as evidence and is no longer allowed
 *       to gate the render assertion.
 *
 * DEFECT-TOLERANT BY CONSTRUCTION (kept from the re-authoring): the probe never
 * waits on the `role="main"` landmark — a cascade collapse of that class takes
 * the landmark with it, so a landmark wait times out exactly when something is
 * wrong. It waits on the Vue mount signal that survives (`#app` has children +
 * the dock renders) and then measures.
 *
 * GATE SPLIT (per `dispatch-homes.md B.2` / `SYNTHESIS-v2.md §3 R.W2`):
 *   - INTERNAL (this probe): the regions render, and the pane axis is immune by
 *     construction to the foreign-utility cascade.
 *   - EXTERNAL (BOOKED, D8-1): the producer's `layer(components)` cure is still
 *     owed and is still read here at every run.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test, type Page } from "@playwright/test";

// The 1440 dual-pane viewport — the width at which the defect was reported
// (desktop ≥ lg = 1024). Overrides the `smoke` project's 1280×720 default.
test.use({ viewport: { width: 1440, height: 900 } });

const HERE = dirname(fileURLToPath(import.meta.url));
const GLASS_STYLES = resolve(HERE, "../../node_modules/@mkbabb/glass-ui/dist/styles");

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
    const components = readFileSync(resolve(GLASS_STYLES, "components.css"), "utf8");
    const deferredPath = resolve(GLASS_STYLES, "deferred.css");
    const deferred = existsSync(deferredPath) ? readFileSync(deferredPath, "utf8") : "";

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
    /** Tailwind display utilities found on the region wrappers — must be []. */
    displayUtilities: string[];
    /** Each region's accessible name, straight off the schema. */
    roles: (string | null)[];
}

/**
 * Read the RUNTIME half: computed `display` of every region wrapper, plus the
 * display utilities each one carries.
 *
 * `displayUtilities` is the immunity reading. The D8-1 blast radius is exactly
 * "a demo element whose visibility is decided by a Tailwind display utility a
 * foreign unlayered rule can out-rank"; a region wrapper that carries none is
 * outside it, whatever the producer emits.
 */
function measurePanes(page: Page): Promise<PaneMeasure> {
    return page.evaluate(() => {
        const wrappers = Array.from(
            document.querySelectorAll<HTMLElement>(".pane-wrapper"),
        );
        const displays = wrappers.map((el) => getComputedStyle(el).display);
        const DISPLAY_UTILITY =
            /^(?:(?:sm|md|lg|xl|2xl):)?(?:hidden|block|flex|grid|inline|inline-block|inline-flex|contents|table)$/;
        return {
            count: wrappers.length,
            displays,
            visible: displays.filter((d) => d !== "none").length,
            displayUtilities: wrappers.flatMap((el) =>
                el.className.split(/\s+/).filter((c) => DISPLAY_UTILITY.test(c)),
            ),
            roles: wrappers.map((el) => el.getAttribute("aria-label")),
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

test("D8-1 · regions at 1440 — both render, and the pane axis is cascade-immune", async ({
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

    // Both of the default scene's regions must exist in the DOM. They are not
    // display-toggled and never were v-if'd off by a breakpoint after X.W5.c —
    // the probe measures COMPUTED display, not class presence (emission ≠
    // effect; the P9 second life).
    const baseline = await measurePanes(page);
    expect(baseline.count).toBe(2);

    const cssom = await walkCssom(page);

    const record: Record<string, unknown> = {
        probe: "R.W2.4 regions-1440 (re-pointed X.W5.c)",
        viewport: "1440×900",
        cascadeRoot: root,
        importSiteCite: `dist/styles/index.css:${root.importSite ?? "?"}`,
        cssom,
        baseline,
    };

    // ── THE RUNTIME HALF — both regions render, with no shim of any kind ──
    expect(
        baseline.visible,
        "every region of the scene must render at 1440 — no shim, no !important",
    ).toBe(2);

    // ── THE IMMUNITY HALF — and they render because nothing decides it ──
    // A region wrapper carrying `hidden`/`lg:flex`/`lg:block` is back inside
    // D8-1's blast radius: an unlayered foreign `.hidden` out-ranks every
    // layered responsive utility regardless of specificity, which is precisely
    // how the dual pane went blank. Zero is the assertion.
    expect(
        baseline.displayUtilities,
        "no region wrapper may carry a display utility — that is what made the pane axis cascade-dependent",
    ).toEqual([]);

    // ── THE SOURCE HALF — recorded, never gating ──
    // D8-1 is a PRODUCER book and stays open until `layer(components)` lands.
    // The reading is taken at every run so the day it lands is dated; it no
    // longer decides what this test asserts about the demo, because the demo's
    // pane axis no longer depends on the answer.
    const rootIsUnlayered = root.indexUnlayered && root.componentsHasBareHidden;
    const rootIsLayered = root.indexLayered && !root.indexUnlayered;
    record.d8_1 = rootIsUnlayered
        ? "PRODUCER-DEFECT-PRESENT (unlayered @import + bare .hidden) — demo pane axis IMMUNE by construction since X.W5.c"
        : rootIsLayered
          ? "PRODUCER-CURE-OBSERVED (layer(components) present in dist) — D8-1 verified at consume"
          : "PRODUCER-STATE-INDETERMINATE — neither a clean unlayered nor a clean layered import";
    record.anyUnlayeredHidden = cssom.anyUnlayeredHidden;
    record.verdict = "REGIONS_RENDER_CASCADE_IMMUNE";
    record.note =
        `Both regions render at 1440 with zero display utilities on the wrappers. Producer state: ${String(record.d8_1)} ` +
        `(import at dist/styles/index.css:${root.importSite ?? "?"}).`;

    const json = JSON.stringify(record, null, 2);
    console.log(`[dual-pane-1440] ${json}`);
    await testInfo.attach("dual-pane-1440-record.json", {
        body: json,
        contentType: "application/json",
    });
});
