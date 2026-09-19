// SERVED MODEL: claude-opus-5[1m]
import { test, expect, type Page } from "@playwright/test";

/**
 * X-W4 · X.W4.a — SHELL CONTROL TARGETS, NAMES AND THE SIZE AXIS (gates A1 · A3 · A4).
 *
 * This is the `smoke` (FINE pointer, 1280×720) half of the pair; the coarse half is
 * `e2e/smoke/mobile/a11y-control-targets.spec.ts` (project `smoke-mobile`, Pixel 7).
 * W4.md §6 is explicit that the two matrices are SEPARATE CELLS and "neither may be
 * inferred from the other", so the two files are deliberately twins rather than one
 * parametrised spec — and W4.md §4 File Bounds admits exactly these two paths and no
 * shared helper module, so the census below is duplicated by the bounds, not by taste.
 *
 * The gate FORM is a Playwright spec, never a `scripts/proof-*.mjs` (CC-019, L-19).
 *
 * THE CENSUS RULE — transcribed verbatim from W4.md §6 "Baseline provenance":
 *
 *   selector: button,[role=button],a[href],input,select,textarea,[role=tab],[role=slider],
 *             [role=checkbox],[role=switch],[role=menuitem],[tabindex]:not([tabindex="-1"])
 *   visible:  rect.w>0 && rect.h>0 && visibility!=hidden && display!=none
 *   name:     aria-label > aria-labelledby text > textContent > title > img[alt]
 *             (placeholder is NOT a name)
 *
 * THE ATTRIBUTION RULE (W4.md §6, binding on A1/A2) — "For a composite widget the
 * measured target is the element that owns the pointer and keyboard contract, not its
 * visual sub-part. The four `.slider-thumb` spans ... resolve to their `.channel-slider`
 * root". Implemented against the PRODUCER's own seam rather than a hand-fitted
 * selector list: glass-ui 7.0.0's Slider stamps `data-slot="slider"` on the range
 * root (`dist/slider-DzqeQmMu.js`), and that root owns the pointer contract — a
 * pointerdown anywhere on the track drives the value. A `role="slider"` sub-part
 * inside such a root therefore measures at the root. NOTHING else is re-attributed:
 * a tab trigger, a menuitem or a dock control owns its own contract and is measured
 * where it stands. This is the o19 receipt's A-7 exoneration APPLIED, not re-litigated.
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

/** ≥24×24 CSS px — the fine-pointer floor W4.md §3 Scope 1 names. */
const FINE_FLOOR = 24;

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
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible({
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
            page
                .getByRole("main", { name: "Color tool panes" })
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

/**
 * The census, run in page context. Returns EVERY visible interactive element with its
 * attributed target box and its computed accessible name under the §6 name rule.
 */
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

            // §6 name rule, in its stated precedence. `placeholder` is NOT a name and
            // appears nowhere below; `title` ranks last, ahead only of img[alt].
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

            // The attribution rule — see the file header.
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
 * A3's population: every visible, INTERACTIVE producer control that rides the
 * `--control-h-*` size axis.
 *
 * Both halves of that sentence are read off the producer, never off a list of demo
 * instances. glass-ui 7.0.0 stamps `data-slot="<control>"` + `data-size="<rung>"` on
 * a control's own root, and a component that rides the size axis declares its OWN
 * height variable from the axis — measured at `node_modules/@mkbabb/glass-ui/dist`:
 *
 *   components/button/styles.css        --button-size:             var(--control-h-{xs,sm,md,lg})
 *   components/toggle-group/styles.css  --toggle-group-item-size:  var(--control-h-{sm,md,lg})
 *   search.js                           --control-pill-h:          var(--control-h-{sm,lg})
 *   components/_shared/field-control.css --field-control-height:   var(--control-h-{sm,md,lg})
 *
 * A control that resolves none of the four does NOT ride the axis and is not this
 * gate's subject — measured at open: `card` (a surface, and not interactive) and
 * `slider` (a control whose track geometry is its own, 27.6px against a 40px md
 * token) both resolve none, and asserting the axis over them would red this gate on
 * producer geometry rather than on a consumer re-pin. `--field-control-height` is
 * probed LAST because it is declared on a field ROOT and inherits into whatever sits
 * inside it, while the other three are declared by the control on itself.
 *
 * The expected height is read by mounting a zero-impact, out-of-flow probe INSIDE the
 * control and measuring what the variable resolves to in that control's own cascade —
 * never a number this spec hard-codes.
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

test("A1 · fine-pointer target size — every attributed target box is ≥24×24", async ({
    page,
}) => {
    const undersized: string[] = [];
    for (const route of ROUTES) {
        await ready(page, route);
        const rows = await census(page, route);
        console.log(`[W4-CENSUS] ${JSON.stringify({ route, rows })}`);
        expect(
            rows.length,
            `census found no interactive elements on ${route}`,
        ).toBeGreaterThan(0);
        for (const row of rows) {
            if (row.w < FINE_FLOOR || row.h < FINE_FLOOR) {
                undersized.push(
                    `${route} · <${row.tag}> "${row.name || "(nameless)"}" ` +
                        `${row.w}×${row.h} [class="${row.cls}"] attributedTo=${row.attributedTo}`,
                );
            }
        }
    }
    console.log(`[W4-A1] undersized=${undersized.length}\n${undersized.join("\n")}`);
    expect(undersized, `sub-24×24 interactive targets (fine pointer)`).toEqual([]);
});

test("A3 · the size axis owns control height — computed blockSize == the producer size token", async ({
    page,
}) => {
    const mismatches: string[] = [];
    let measured = 0;
    for (const route of ROUTES) {
        await ready(page, route);
        const rows = await sizedControls(page, route);
        console.log(`[W4-SIZED] ${JSON.stringify({ route, rows })}`);
        for (const row of rows) {
            if (row.token <= 0) continue; // the rung publishes no --control-h-* token
            measured += 1;
            if (Math.abs(row.blockSize - row.token) > TOKEN_EPSILON) {
                mismatches.push(
                    `${route} · ${row.slot}[size=${row.size}] blockSize=${row.blockSize} ` +
                        `token=${row.token} [class="${row.cls}"]`,
                );
            }
        }
    }
    console.log(
        `[W4-A3] measured=${measured} mismatches=${mismatches.length}\n${mismatches.join("\n")}`,
    );
    // A gate that measures nothing is decorative — the population must be non-empty.
    expect(
        measured,
        "no sized producer control was reached on the probed routes",
    ).toBeGreaterThan(0);
    expect(
        mismatches,
        "controls whose height is re-pinned off the producer size axis",
    ).toEqual([]);
});

test("A4 · zero nameless interactive elements", async ({ page }) => {
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
    console.log(`[W4-A4] nameless=${nameless.length}\n${nameless.join("\n")}`);
    expect(nameless, "interactive elements with an empty computed name").toEqual([]);
});
