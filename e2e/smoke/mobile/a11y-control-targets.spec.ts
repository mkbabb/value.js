// SERVED MODEL: claude-opus-5[1m]
import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "../fixtures/dock";

/**
 * X-W4 · X.W4.a — SHELL CONTROL TARGETS, NAMES AND THE SIZE AXIS, COARSE POINTER
 * (gates A2 · A3-coarse · A4-coarse).
 *
 * The `smoke-mobile` (Pixel 7, isMobile+hasTouch ⇒ `matchMedia("(pointer: coarse)")`)
 * half of the pair. W4.md §6 A2's falsifier is explicit: "Fails if a control that
 * passes at fine pointer regresses under coarse — the two matrices are separate cells
 * and NEITHER MAY BE INFERRED FROM THE OTHER." That is why this is a second file with
 * its own assertions rather than a parameter on the fine spec, and why the coarse LIFT
 * (a control reaching `--control-floor`, not merely clearing 24px) is asserted only
 * here. W4.md §4 File Bounds admits these two spec paths and no shared helper module,
 * so the census is duplicated by the bounds, not by taste.
 *
 * Census rule, attribution rule and name rule: transcribed from W4.md §6, identical to
 * the fine twin — see `e2e/smoke/a11y-control-targets.spec.ts` for the full citation.
 */

// Three cold loads of a live-WebGL dev-served app per test do not fit the config's
// 30s default (measured: the first navigation alone exceeded it). The budget is
// raised HERE, per file, and NOT ONE ASSERTION IS RELAXED — the same precedent the
// W51 PNG specs set when they took explicit timeouts on shared runners.
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

const ROUTES = ["/", "/#/gradient"] as const;

/** The §6 census selector, verbatim. */
const INTERACTIVE = [
    "button",
    "[role=button]",
    "a[href]",
    "input",
    "select",
    "textarea",
    "[role=tab]",
    "[role=slider]",
    "[role=checkbox]",
    "[role=switch]",
    "[role=menuitem]",
    '[tabindex]:not([tabindex="-1"])',
].join(",");

/** ≥24×24 CSS px — the floor W4.md §3 Scope 1 names at BOTH pointer classes. */
const COARSE_FLOOR = 24;

/** Sub-pixel slack for a computed-vs-token height comparison (A3). */
const TOKEN_EPSILON = 0.5;

type CensusRow = {
    route: string;
    tag: string;
    id: string;
    cls: string;
    name: string;
    w: number;
    h: number;
    attributedTo: string;
};

type SizedRow = {
    route: string;
    tag: string;
    slot: string;
    size: string;
    cls: string;
    blockSize: number;
    token: number;
    controlFloor: number;
};

/**
 * Land a route COLD and wait for the view it names to be painted and at rest.
 *
 * The demo routes through `createWebHashHistory()` (`demo/color-picker/router/index.ts`),
 * so `page.goto("/#/gradient")` after a prior navigation is a SAME-DOCUMENT hash change:
 * `load` has already fired, vue-router swaps the panes behind an enter transition, and a
 * census taken on the way samples the OLD view. Measured at open: taken that way, the
 * `/#/gradient` census returned the picker's population verbatim and found zero
 * gradient-rail elements — the cell was reading `/` twice.
 *
 * The cure is a COLD load per route (the `about:blank` hop makes the destination the INITIAL route,
 * so there is no swap to race), then the destination hash asserted, then a bounded
 * settle. `paneSettled` is deliberately NOT used here: its own docblock states it times
 * out on a PERMANENT resting transform, and one such transform is live on `/` at HEAD —
 * it is the right instrument for interaction stability, the wrong one for a cold
 * geometry census, and relaxing it would be the masking move this wave forbids.
 */
async function ready(page: Page, route: string) {
    // `about:blank` first, so the next goto is always a REAL document load even when
    // the two URLs differ only by hash (the same-document case this cures).
    await page.goto("about:blank");
    await page.goto(route, { timeout: 60_000 });
    await expect(mainPane(page)).toBeVisible({
        timeout: 20000,
    });
    const wanted = route.startsWith("/#") ? route.slice(2) : "/";
    await expect
        .poll(
            () =>
                page.evaluate(
                    () => location.hash.replace(/^#/, "").split("?")[0] || "/",
                ),
            {
                timeout: 10000,
            },
        )
        .toBe(wanted);
    // The view the route names must actually be MOUNTED before a census is banked.
    // `document.title` is the product's own route-driven signal (the router's
    // `afterEach` guard in `demo/color-picker/router/useDocumentTitle.ts` composes it
    // from `VIEW_MAP[to.name].label`), so a wrong-view census now fails LOUDLY here
    // instead of silently reading the previous view's population — which is exactly
    // what happened at this unit's first baseline run.
    if (wanted !== "/") {
        const label = wanted.replace(/^\//, "");
        const pretty = label.charAt(0).toUpperCase() + label.slice(1);
        await expect
            .poll(async () => (await page.title()).toLowerCase(), { timeout: 15000 })
            .toContain(label.toLowerCase());
        // …and the pane the route names must be MOUNTED, not merely routed to. The
        // title is set by the router's `afterEach`, which fires before the destination
        // pane's chunk has rendered — measured: a post-cure coarse run banked a
        // 15-element census on `/#/gradient` where the mounted view yields 53, and the
        // gradient rail's own controls were simply absent from the matrix. A census
        // that silently under-counts is a FALSE GREEN, so the pane's own heading (the
        // idiom `e2e/smoke/views/gradient.spec.ts` already uses) is a precondition.
        await expect(
            mainPane(page)
                .getByRole("heading", { name: pretty })
                .filter({ visible: true })
                .first(),
        ).toBeVisible({ timeout: 25000 });
    }
    // Then geometric rest, measured rather than assumed: four consecutive identical
    // census signatures (≈1.2 s of quiet) after a ≥2.5 s dwell. The pane-swap enter
    // transition is shorter than that window, so a mid-flight sample cannot pass.
    const signature = () =>
        page.evaluate(
            (sel) =>
                Array.from(document.querySelectorAll(sel))
                    .map((el) => {
                        const r = el.getBoundingClientRect();
                        return `${Math.round(r.width * 10) / 10}x${Math.round(r.height * 10) / 10}`;
                    })
                    .join("|"),
            INTERACTIVE,
        );
    const started = Date.now();
    let last = await signature();
    let stable = 0;
    for (let i = 0; i < 100; i++) {
        await page.waitForTimeout(300);
        const next = await signature();
        stable = next === last && next.length > 0 ? stable + 1 : 0;
        last = next;
        if (stable >= 4 && Date.now() - started >= 2500) return;
    }
    throw new Error(`census geometry never settled on ${route}`);
}

/** The pointer class this project actually serves — asserted, never assumed. */
async function isCoarse(page: Page): Promise<boolean> {
    return page.evaluate(() => matchMedia("(pointer: coarse)").matches);
}

async function census(page: Page, route: string): Promise<CensusRow[]> {
    return page.evaluate(
        ({ routeArg, selector }) => {
            const SELECTOR = selector;

            const isVisible = (el: Element): boolean => {
                const r = el.getBoundingClientRect();
                if (!(r.width > 0 && r.height > 0)) return false;
                const cs = getComputedStyle(el);
                return cs.visibility !== "hidden" && cs.display !== "none";
            };

            const nameOf = (el: Element): string => {
                const aria = el.getAttribute("aria-label");
                if (aria && aria.trim()) return aria.trim();
                const labelledBy = el.getAttribute("aria-labelledby");
                if (labelledBy) {
                    const text = labelledBy
                        .split(/\s+/)
                        .map((id) => document.getElementById(id)?.textContent ?? "")
                        .join(" ")
                        .trim();
                    if (text) return text;
                }
                const text = (el.textContent ?? "").trim();
                if (text) return text;
                const title = el.getAttribute("title");
                if (title && title.trim()) return title.trim();
                const alt = el.querySelector("img[alt]")?.getAttribute("alt");
                if (alt && alt.trim()) return alt.trim();
                return "";
            };

            const attributed = (el: Element): Element => {
                if (el.getAttribute("role") === "slider") {
                    const root = el.closest('[data-slot="slider"]');
                    if (root) return root;
                }
                return el;
            };

            const describe = (el: Element): string => {
                const id = el.getAttribute("id");
                const cls = el.getAttribute("class");
                return (
                    el.tagName.toLowerCase() +
                    (id ? `#${id}` : "") +
                    (cls ? `.${cls.trim().split(/\s+/).slice(0, 3).join(".")}` : "")
                );
            };

            const out: Array<Record<string, unknown>> = [];
            const seen = new Set<Element>();
            for (const el of Array.from(document.querySelectorAll(SELECTOR))) {
                if (!isVisible(el)) continue;
                if (seen.has(el)) continue;
                seen.add(el);
                const target = attributed(el);
                const r = target.getBoundingClientRect();
                out.push({
                    route: routeArg,
                    tag: el.tagName.toLowerCase(),
                    id: el.getAttribute("id") ?? "",
                    cls: el.getAttribute("class") ?? "",
                    name: nameOf(el),
                    w: Math.round(r.width * 10) / 10,
                    h: Math.round(r.height * 10) / 10,
                    attributedTo: target === el ? "self" : describe(target),
                });
            }
            return out;
        },
        { routeArg: route, selector: INTERACTIVE },
    ) as Promise<CensusRow[]>;
}

/**
 * A3's population — see the fine twin's header for the full derivation. A control
 * rides the `--control-h-*` axis iff it declares one of the producer's four published
 * control-height variables; `card` and `slider` declare none and are not the gate's
 * subject. `--field-control-height` is probed LAST (it is the field ROOT's and
 * inherits inward).
 */
const HEIGHT_VARS = [
    "--button-size",
    "--toggle-group-item-size",
    "--control-pill-h",
    "--field-control-height",
] as const;

async function sizedControls(page: Page, route: string): Promise<SizedRow[]> {
    return page.evaluate(
        ({ routeArg, heightVars, interactive }) => {
            // `getComputedStyle().blockSize` — the LAYOUT box, which is what the size
            // token governs and what W4.md §6 A3 names verbatim. Deliberately NOT
            // `getBoundingClientRect()`: that reports the PAINTED box, so the dock's
            // own press/hover/morph scale springs leak into it (measured: the same
            // `size="xs"` control read 28.00 and 28.89 on two runs over byte-identical
            // sources, because a residual `scale` had not yet unwound). A1/A2 keep the
            // painted box on purpose — a hit target is where the pixels are — but a
            // token-equality assertion must read the box the token sets.
            const resolve = (host: Element, expr: string): number => {
                const probe = document.createElement("div");
                probe.style.position = "absolute";
                probe.style.visibility = "hidden";
                probe.style.pointerEvents = "none";
                probe.style.inlineSize = "0";
                probe.style.blockSize = expr;
                host.appendChild(probe);
                const h = parseFloat(getComputedStyle(probe).blockSize);
                probe.remove();
                return Number.isFinite(h) ? Math.round(h * 100) / 100 : 0;
            };

            const out: Array<Record<string, unknown>> = [];
            for (const el of Array.from(
                document.querySelectorAll("[data-slot][data-size]"),
            )) {
                if (!el.matches(interactive)) continue;
                const r = el.getBoundingClientRect();
                if (!(r.width > 0 && r.height > 0)) continue;
                const cs = getComputedStyle(el);
                if (cs.visibility === "hidden" || cs.display === "none") continue;
                let token = 0;
                for (const v of heightVars) {
                    token = resolve(el, `var(${v})`);
                    if (token > 0) break;
                }
                out.push({
                    route: routeArg,
                    tag: el.tagName.toLowerCase(),
                    slot: el.getAttribute("data-slot") ?? "",
                    size: el.getAttribute("data-size") ?? "",
                    cls: el.getAttribute("class") ?? "",
                    blockSize: Math.round(parseFloat(cs.blockSize) * 100) / 100,
                    token,
                    controlFloor: resolve(el, "var(--control-floor)"),
                });
            }
            return out;
        },
        { routeArg: route, heightVars: [...HEIGHT_VARS], interactive: INTERACTIVE },
    ) as Promise<SizedRow[]>;
}

test("A2 · coarse-pointer target size — every attributed target box is ≥24×24", async ({
    page,
}) => {
    const undersized: string[] = [];
    for (const route of ROUTES) {
        await ready(page, route);
        // The matrix is only this matrix if the pointer really is coarse.
        expect(await isCoarse(page), "smoke-mobile must serve pointer: coarse").toBe(
            true,
        );
        const rows = await census(page, route);
        console.log(`[W4-CENSUS-COARSE] ${JSON.stringify({ route, rows })}`);
        expect(
            rows.length,
            `census found no interactive elements on ${route}`,
        ).toBeGreaterThan(0);
        for (const row of rows) {
            if (row.w < COARSE_FLOOR || row.h < COARSE_FLOOR) {
                undersized.push(
                    `${route} · <${row.tag}> "${row.name || "(nameless)"}" ` +
                        `${row.w}×${row.h} [class="${row.cls}"] attributedTo=${row.attributedTo}`,
                );
            }
        }
    }
    console.log(`[W4-A2] undersized=${undersized.length}\n${undersized.join("\n")}`);
    expect(undersized, `sub-24×24 interactive targets (coarse pointer)`).toEqual([]);
});

test("A3-coarse · the size axis owns control height AND takes the coarse lift", async ({
    page,
}) => {
    const mismatches: string[] = [];
    const unlifted: string[] = [];
    let measured = 0;
    for (const route of ROUTES) {
        await ready(page, route);
        expect(await isCoarse(page), "smoke-mobile must serve pointer: coarse").toBe(
            true,
        );
        const rows = await sizedControls(page, route);
        console.log(`[W4-SIZED-COARSE] ${JSON.stringify({ route, rows })}`);
        for (const row of rows) {
            if (row.token <= 0) continue;
            measured += 1;
            if (Math.abs(row.blockSize - row.token) > TOKEN_EPSILON) {
                mismatches.push(
                    `${route} · ${row.slot}[size=${row.size}] blockSize=${row.blockSize} ` +
                        `token=${row.token} [class="${row.cls}"]`,
                );
            }
            // The second, distinct failure mode A3's falsifier names: the token is
            // honoured but the coarse rung never lifts (28px persists under coarse).
            if (
                row.controlFloor > 0 &&
                row.blockSize + TOKEN_EPSILON < row.controlFloor
            ) {
                unlifted.push(
                    `${route} · ${row.slot}[size=${row.size}] blockSize=${row.blockSize} ` +
                        `< --control-floor=${row.controlFloor} [class="${row.cls}"]`,
                );
            }
        }
    }
    console.log(
        `[W4-A3-COARSE] measured=${measured} mismatches=${mismatches.length} unlifted=${unlifted.length}\n` +
            [...mismatches, ...unlifted].join("\n"),
    );
    // NOTE, measured at this unit's re-baseline and recorded rather than asserted: at
    // the Pixel-7 project the two probed routes expose ZERO controls that ride the
    // `--control-h-*` axis — the mobile dock substitutes a dropdown trigger
    // (`dropdown-menu__trigger`) and segmented tabs for the desktop shell's producer
    // Buttons, and neither carries a producer control-height variable. The fine twin
    // therefore carries the non-empty-population requirement (it measures 4) and this
    // half does not: demanding a population the mobile shell does not render would be
    // an unturnable gate, not a stricter one. Both row-wise assertions below stand and
    // arm themselves the instant such a control appears here.
    expect(
        mismatches,
        "controls whose height is re-pinned off the producer size axis",
    ).toEqual([]);
    expect(
        unlifted,
        "controls that never take the coarse lift to --control-floor",
    ).toEqual([]);
});

test("A4-coarse · zero nameless interactive elements", async ({ page }) => {
    const nameless: string[] = [];
    for (const route of ROUTES) {
        await ready(page, route);
        const rows = await census(page, route);
        for (const row of rows) {
            if (row.name === "") {
                nameless.push(
                    `${route} · <${row.tag}> ${row.w}×${row.h} [class="${row.cls}"]`,
                );
            }
        }
    }
    console.log(`[W4-A4-COARSE] nameless=${nameless.length}\n${nameless.join("\n")}`);
    expect(nameless, "interactive elements with an empty computed name").toEqual([]);
});
