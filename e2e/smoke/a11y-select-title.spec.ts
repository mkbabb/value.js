// SERVED MODEL: claude-opus-5[1m]
import { test, expect, type Page } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * X-W4 · X.W4.b — PRODUCER CONTROL AXES: COMPOSED SELECT TITLES AND THE SLIDER
 * DIRECTION SEAM (gates B1 · B2 · B3).
 *
 * The gate FORM is a Playwright spec, never a `scripts/proof-*.mjs` (CC-019, L-19).
 * `W4.md` §6 names `--project=smoke` for both B1 and B2, and `W4.md` §4 File Bounds
 * admits exactly ONE new spec path for this unit — this file — so there is no
 * `e2e/smoke/mobile/` twin here and none is invented. The coarse rung is therefore
 * measured IN THIS PROJECT by driving the producer's own size-axis variables, which is
 * the mechanism the coarse media query itself uses (see B2 below).
 *
 * ── THE POPULATION, and why it is scoped the way it is ──────────────────────────
 *
 * `W4.md:389` names B2's population in its own words: "all Select triggers in
 * **mix / generate / gradient**". Unit b's §4 writable set is exactly those three SFCs
 * (`MixConfigBar.vue`, `GenerateControls.vue`, `GradientVisualizer.vue`). So the census
 * is scoped to THE PANE THE ROUTE NAMES — resolved structurally at run time from the
 * pane's own title (`h3.pane-header-title` whose text is the view label, then its pane
 * card), never from a hand-fitted element allowlist and never by naming an element to
 * skip.
 *
 * That scope is load-bearing and is stated rather than hidden: at 1280×720 the app is in
 * its DESKTOP dual-pane layout (`viewSchema.ts` VIEW_MAP), so `/#/mix` also mounts the
 * picker pane — whose `ColorSpaceSelector` trigger is in NO open-partition W4 bound (it
 * appears only in §4's trigger-gated `X.W4.g` table, and that unit is CLOSED by
 * X-W0.j's census FAIL). Every trigger the scope excludes is COUNTED and LOGGED by each
 * test, so an out-of-bounds population can never be silently dropped; it simply is not
 * asserted by a unit that cannot lawfully cure it.
 *
 * ── WHAT EACH GATE READS ────────────────────────────────────────────────────────
 *
 * B1 (`W4.md:388`) — "each affected combobox's accessible name derives from a rendered
 * title element (not a hardcoded `aria-label`), and that title's box is inside the field
 * composition". Read as five conjuncts, so neither of the gate's two named failure
 * directions can pass: (1) no `aria-label` survives on the trigger; (2) an
 * `aria-labelledby` resolves to a RENDERED element with non-empty text; (3) that title
 * and the trigger share one `[data-slot="labeled-field"]` composition root — the
 * producer's own published slot stamp, read off `dist/labeled-field.js`; (4) the title's
 * painted box is inside that root's painted box (the gate says "box"); and (5) the
 * BROWSER's computed accessible name equals the title text — asserted with
 * `toHaveAccessibleName`, so the gate rests on the real AX tree and not on this file's
 * re-implementation of the name rule. Deleting the caption instead of associating it
 * fails (2)–(5); leaving the literal `aria-label` fails (1) and (5).
 *
 * B2 (`W4.md:389`) — "`blockSize` of each trigger == the resolved `--control-h-sm`, and
 * no `h-9` utility on the element", with the falsifier's second arm: "(as in A3) when
 * the coarse rung does not lift — the trigger is a touch target too". Both arms are
 * measured. The lift arm drives `--ui-scale` / `--control-floor` to the values the
 * producer's OWN coarse block sets (`dist/styles/tokens/light-dark.css`:
 * `@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5);
 * --control-floor: var(--touch-target, 2.75rem); } }`) and re-measures: a trigger whose
 * height rides the axis follows the token, a re-pinned `h-9` does not move. This is a
 * mechanism test, not a viewport emulation, and it is the arm a single-project bound
 * makes available honestly.
 *
 * B3 (`W4.md:390`) — the recorded-re-test-plus-regression-fence. It is GREEN before the
 * cure by the spec's own declaration, so it is written here as a FENCE a later slider
 * edit must keep green: the A-16 receipt exists and is dated, and the consumer surface
 * reads ZERO producer-internal slider variables. "Producer-internal" is given a
 * re-runnable definition rather than a list — a variable the producer DECLARES is its
 * own state; one it only READS through `var()` is a consumer feed seam (measured in the
 * receipt: `--slider-range-origin` is declared 3× by the producer; `--slider-track-bg`,
 * `--slider-thumb-bg` and `--slider-thumb-border-color` are declared 0×).
 *
 * `--slider-track-bg`'s consumer reads are NOT this gate's failure: `W4.md:89-90` books
 * them (CC-105) to `X.W4.g`, "never before, never by shim", and that unit is closed. The
 * fence reads the producer-DECLARED set, which is the set CC-046 is about.
 */

// Three cold loads of a live-WebGL dev-served app per test do not fit the config's 30s
// default. The budget is raised HERE, per file, and NOT ONE ASSERTION IS RELAXED — the
// same precedent `a11y-control-targets.spec.ts` set one unit earlier in this wave.
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

/** The three surfaces `W4.md:389` names, each at the route that mounts it. */
const ROUTES = [
    { path: "/#/mix", view: "Mix" },
    { path: "/#/generate", view: "Generate" },
    { path: "/#/gradient", view: "Gradient" },
] as const;

/** The producer's own stamp on a Select trigger root (`dist/select-BcBAyLXA.js`). */
const TRIGGER = '[data-slot="select-trigger"]';

/** The producer's own stamp on a LabeledField composition root (`dist/labeled-field.js`). */
const FIELD = '[data-slot="labeled-field"]';

/** Sub-pixel slack for a computed-vs-token height comparison. */
const TOKEN_EPSILON = 0.5;

/** The values the producer's own `(pointer: coarse)` block installs. */
const COARSE_UI_SCALE = "1.5";
const COARSE_CONTROL_FLOOR = "2.75rem";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..", "..");

type TriggerRow = {
    route: string;
    inScope: boolean;
    cls: string;
    ariaLabel: string | null;
    labelledBy: string | null;
    titleText: string;
    sharesFieldRoot: boolean;
    titleBoxInsideField: boolean;
    blockSize: number;
    tokenSm: number;
};

/**
 * Land a route COLD, wait for the pane it names to be painted and at rest, and stamp the
 * view on `<body>` so the in-page scope resolver has one truth to read.
 *
 * The demo routes through `createWebHashHistory()`, so a `goto("/#/mix")` after a prior
 * navigation is a SAME-DOCUMENT hash change and a census taken on the way samples the
 * OLD view. The `about:blank` hop makes the destination the INITIAL route, so there is
 * no swap to race — the idiom this wave's unit a established and measured.
 */
async function ready(page: Page, route: string, view: string) {
    await page.goto("about:blank");
    await page.goto(route, { timeout: 60_000 });
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible({
        timeout: 20_000,
    });
    await expect
        .poll(
            () =>
                page.evaluate(
                    () => location.hash.replace(/^#/, "").split("?")[0] || "/",
                ),
            { timeout: 10_000 },
        )
        .toBe(route.slice(2));
    // The pane the route names must be MOUNTED, not merely routed to: its own title
    // (`PaneHeader`'s `h3.pane-header-title`) is the product's own signal, and it is also
    // the anchor the census scope is resolved from.
    await expect
        .poll(
            () =>
                page.evaluate(
                    (v) =>
                        Array.from(
                            document.querySelectorAll("h3.pane-header-title"),
                        ).filter((h) => (h.textContent ?? "").trim() === v).length,
                    view,
                ),
            { timeout: 25_000 },
        )
        .toBeGreaterThan(0);
    await page.evaluate((v) => {
        document.body.dataset.w4bView = v;
    }, view);

    // Then geometric rest, measured rather than assumed: four consecutive identical
    // trigger-geometry signatures after a ≥2.5 s dwell. The pane-swap enter transition is
    // shorter than that window, so a mid-flight sample cannot pass.
    const signature = () =>
        page.evaluate(
            (sel) =>
                Array.from(document.querySelectorAll(sel))
                    .map((el) => {
                        const r = el.getBoundingClientRect();
                        return `${Math.round(r.width * 10) / 10}x${Math.round(r.height * 10) / 10}`;
                    })
                    .join("|"),
            TRIGGER,
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
    throw new Error(`select-trigger geometry never settled on ${route}`);
}

/**
 * Every visible Select trigger on the route, each tagged with whether it sits inside the
 * pane the route names. Nothing is filtered away in page context — the exclusion is
 * REPORTED, so each test can log what it did not assert.
 */
async function triggerCensus(
    page: Page,
    route: string,
    axisOverride: { uiScale: string; controlFloor: string } | null = null,
): Promise<TriggerRow[]> {
    return page.evaluate(
        ({ routeArg, triggerSel, fieldSel, override }) => {
            const OVERRIDE_ID = "w4b-axis-override";
            document.getElementById(OVERRIDE_ID)?.remove();
            if (override) {
                const style = document.createElement("style");
                style.id = OVERRIDE_ID;
                // The producer's own coarse block, replayed at fine pointer. `!important`
                // because the base `:root` declaration ships inside the producer's
                // cascade layers, and this probe is a mechanism test, not a theme.
                style.textContent = `:root{--ui-scale:${override.uiScale} !important;--control-floor:${override.controlFloor} !important;}`;
                document.head.appendChild(style);
                void document.documentElement.offsetHeight; // force a style flush
            }

            const isVisible = (el: Element): boolean => {
                const r = el.getBoundingClientRect();
                if (!(r.width > 0 && r.height > 0)) return false;
                const cs = getComputedStyle(el);
                return cs.visibility !== "hidden" && cs.display !== "none";
            };

            // The scope: the pane card whose OWN title is the view's label.
            const view = document.body.dataset.w4bView ?? "";
            let scope: Element | null = null;
            for (const h of Array.from(
                document.querySelectorAll("h3.pane-header-title"),
            )) {
                if ((h.textContent ?? "").trim() !== view) continue;
                scope = h.closest(".pane-scroll-fade") ?? h.closest(".pane-wrapper");
                if (scope) break;
            }

            // Resolve a CSS expression in the element's OWN cascade with a zero-impact,
            // out-of-flow probe — never a number this spec hard-codes.
            const resolveLen = (host: Element, expr: string): number => {
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

            const inside = (inner: DOMRect, outer: DOMRect): boolean =>
                inner.left >= outer.left - 0.5 &&
                inner.right <= outer.right + 0.5 &&
                inner.top >= outer.top - 0.5 &&
                inner.bottom <= outer.bottom + 0.5;

            const out: Array<Record<string, unknown>> = [];
            for (const el of Array.from(document.querySelectorAll(triggerSel))) {
                if (!isVisible(el)) continue;
                const labelledBy = el.getAttribute("aria-labelledby");
                const titles = (labelledBy ? labelledBy.trim().split(/\s+/) : [])
                    .map((id) => document.getElementById(id))
                    .filter((n): n is HTMLElement => n !== null);
                const titleText = titles
                    .map((n) => (n.textContent ?? "").trim())
                    .join(" ")
                    .trim();

                const fieldRoot = el.closest(fieldSel);
                const sharesFieldRoot =
                    titles.length > 0 &&
                    fieldRoot !== null &&
                    titles.every((n) => fieldRoot.contains(n));

                let titleBoxInsideField = false;
                if (sharesFieldRoot && fieldRoot) {
                    const outer = fieldRoot.getBoundingClientRect();
                    titleBoxInsideField = titles.every((n) =>
                        inside(n.getBoundingClientRect(), outer),
                    );
                }

                out.push({
                    route: routeArg,
                    inScope: scope !== null && scope.contains(el),
                    cls: el.getAttribute("class") ?? "",
                    ariaLabel: el.getAttribute("aria-label"),
                    labelledBy,
                    titleText,
                    sharesFieldRoot,
                    titleBoxInsideField,
                    blockSize:
                        Math.round(parseFloat(getComputedStyle(el).blockSize) * 100) /
                        100,
                    tokenSm: resolveLen(el, "var(--control-h-sm)"),
                });
            }

            document.getElementById(OVERRIDE_ID)?.remove();
            return out;
        },
        {
            routeArg: route,
            triggerSel: TRIGGER,
            fieldSel: FIELD,
            override: axisOverride,
        },
    ) as Promise<TriggerRow[]>;
}

test("B1 · composed trigger title — the combobox name derives from a rendered title inside the field composition", async ({
    page,
}) => {
    const defects: string[] = [];
    let asserted = 0;
    let excluded = 0;

    for (const { path, view } of ROUTES) {
        await ready(page, path, view);
        const rows = await triggerCensus(page, path);
        console.log(`[W4-B1-CENSUS] ${JSON.stringify({ route: path, rows })}`);

        const scoped = rows.filter((r) => r.inScope);
        excluded += rows.length - scoped.length;
        expect(
            scoped.length,
            `no Select trigger was reached inside the ${view} pane on ${path}`,
        ).toBeGreaterThan(0);

        for (const row of scoped) {
            asserted += 1;
            const where = `${path} · trigger [class="${row.cls}"]`;
            if (row.ariaLabel !== null) {
                defects.push(
                    `${where}: still carries a literal aria-label="${row.ariaLabel}"`,
                );
            }
            if (!row.labelledBy) {
                defects.push(`${where}: no aria-labelledby — nothing names it`);
                continue;
            }
            if (row.titleText === "") {
                defects.push(
                    `${where}: aria-labelledby="${row.labelledBy}" resolves to no rendered text`,
                );
            }
            if (!row.sharesFieldRoot) {
                defects.push(
                    `${where}: the title is not inside the same ${FIELD} composition as the trigger`,
                );
            }
            if (!row.titleBoxInsideField) {
                defects.push(
                    `${where}: the title's painted box is not inside the field composition's box`,
                );
            }
        }

        // The BROWSER's own accessible-name computation, per scoped trigger — the gate
        // rests on the real AX tree, not on this file's reading of the name rule.
        for (const handle of await page.locator(TRIGGER).all()) {
            const expected = await handle.evaluate((el) => {
                const view2 = document.body.dataset.w4bView ?? "";
                const title = Array.from(
                    document.querySelectorAll("h3.pane-header-title"),
                ).find((h) => (h.textContent ?? "").trim() === view2);
                const root =
                    title?.closest(".pane-scroll-fade") ??
                    title?.closest(".pane-wrapper") ??
                    null;
                const r = el.getBoundingClientRect();
                if (!root || !root.contains(el) || !(r.width > 0 && r.height > 0)) {
                    return "";
                }
                return (el.getAttribute("aria-labelledby") ?? "")
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((id) => document.getElementById(id)?.textContent ?? "")
                    .join(" ")
                    .trim();
            });
            if (expected === "") continue;
            await expect(
                handle,
                "the browser's computed accessible name must be the composed title",
            ).toHaveAccessibleName(expected);
        }
    }

    console.log(
        `[W4-B1] asserted=${asserted} excluded=${excluded} defects=${defects.length}\n${defects.join("\n")}`,
    );
    expect(
        asserted,
        "no Select trigger was reached on the probed routes",
    ).toBeGreaterThan(0);
    expect(defects, "Select triggers whose name is not a composed title").toEqual([]);
});

test("B2 · trigger height rides the size axis — and lifts with the coarse rung", async ({
    page,
}) => {
    const defects: string[] = [];
    let asserted = 0;

    for (const { path, view } of ROUTES) {
        await ready(page, path, view);

        const fine = (await triggerCensus(page, path)).filter((r) => r.inScope);
        const coarse = (
            await triggerCensus(page, path, {
                uiScale: COARSE_UI_SCALE,
                controlFloor: COARSE_CONTROL_FLOOR,
            })
        ).filter((r) => r.inScope);

        console.log(`[W4-B2-FINE] ${JSON.stringify({ route: path, rows: fine })}`);
        console.log(`[W4-B2-COARSE] ${JSON.stringify({ route: path, rows: coarse })}`);

        expect(
            fine.length,
            `no Select trigger was reached inside the ${view} pane on ${path}`,
        ).toBeGreaterThan(0);
        expect(
            coarse.length,
            `the coarse-axis pass lost the ${view} pane's triggers on ${path}`,
        ).toBe(fine.length);

        for (let i = 0; i < fine.length; i++) {
            const row = fine[i]!;
            const lifted = coarse[i]!;
            asserted += 1;
            const where = `${path} · trigger [class="${row.cls}"]`;

            if (/(^|\s)h-9(\s|$)/.test(row.cls)) {
                defects.push(`${where}: a hand-pinned h-9 utility survives`);
            }
            if (row.tokenSm <= 0) {
                defects.push(
                    `${where}: --control-h-sm resolved to 0 — the producer size axis is not in this element's cascade`,
                );
                continue;
            }
            if (Math.abs(row.blockSize - row.tokenSm) > TOKEN_EPSILON) {
                defects.push(
                    `${where}: blockSize=${row.blockSize} != --control-h-sm=${row.tokenSm} (fine)`,
                );
            }
            // The coarse arm: the token must actually LIFT, and the box must follow it.
            if (!(lifted.tokenSm > row.tokenSm)) {
                defects.push(
                    `${where}: --control-h-sm did not lift under the coarse axis (${row.tokenSm} → ${lifted.tokenSm})`,
                );
            }
            if (Math.abs(lifted.blockSize - lifted.tokenSm) > TOKEN_EPSILON) {
                defects.push(
                    `${where}: blockSize=${lifted.blockSize} != --control-h-sm=${lifted.tokenSm} under the coarse axis — the height does not ride the axis`,
                );
            }
        }
    }

    console.log(
        `[W4-B2] asserted=${asserted} defects=${defects.length}\n${defects.join("\n")}`,
    );
    expect(asserted, "no Select trigger was measured").toBeGreaterThan(0);
    expect(
        defects,
        "Select triggers whose height is off the producer size axis",
    ).toEqual([]);
});

/** Every file under `demo/` and `src/`, minus the binary leaves a text scan cannot read. */
const BINARY = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".avif",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".mp4",
    ".webm",
]);

function textFiles(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            textFiles(full, out);
            continue;
        }
        const dot = entry.name.lastIndexOf(".");
        const ext = dot >= 0 ? entry.name.slice(dot).toLowerCase() : "";
        if (!BINARY.has(ext)) out.push(full);
    }
    return out;
}

test("B3 · slider seam consumed as published — the A-16 receipt exists and the fence holds", async () => {
    // (i) The receipt, filed BEFORE any slider prop edit (CC-046's own condition).
    const receipt = readFileSync(
        resolve(REPO_ROOT, "docs/tranches/X/waves/evidence/W4/a16-retest-receipt.md"),
        "utf8",
    );
    expect(
        receipt.split("\n")[0],
        "every artefact this tranche creates carries its served model on line 1",
    ).toMatch(/^SERVED MODEL: /);
    expect(
        receipt,
        "the receipt must record the INSTALLED producer version it re-tested against",
    ).toMatch(/7\.0\.0/);
    expect(
        receipt,
        "the receipt must quote the published direction seam it re-tested",
    ).toMatch(/dir\?: Direction/);
    expect(receipt, "the receipt must be dated at its measuring clock").toMatch(
        /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
    );

    // (ii) Zero consumer reads of a PRODUCER-DECLARED slider variable. The set is read
    // off the installed producer at run time rather than hard-coded, so a producer that
    // grows a new internal grows this fence with it.
    const producerCss = readFileSync(
        resolve(REPO_ROOT, "node_modules/@mkbabb/glass-ui/dist/glass-ui.css"),
        "utf8",
    );
    const sliderVars = Array.from(
        new Set(producerCss.match(/--slider[a-zA-Z0-9_-]*/g) ?? []),
    );
    expect(
        sliderVars.length,
        "the producer's slider vocabulary must be readable",
    ).toBeGreaterThan(0);

    const declared = sliderVars.filter((v) =>
        new RegExp(`[;{]\\s*${v}\\s*:`).test(producerCss),
    );
    expect(
        declared,
        "the producer must still declare the A-16 direction variable — the fence's subject",
    ).toContain("--slider-range-origin");

    const consumerHits: string[] = [];
    for (const file of [
        ...textFiles(resolve(REPO_ROOT, "demo")),
        ...textFiles(resolve(REPO_ROOT, "src")),
    ]) {
        const body = readFileSync(file, "utf8");
        const lines = body.split("\n");
        for (const v of declared) {
            lines.forEach((line, i) => {
                if (line.includes(v)) {
                    consumerHits.push(
                        `${file.slice(REPO_ROOT.length + 1)}:${i + 1}: ${v}`,
                    );
                }
            });
        }
    }
    console.log(
        `[W4-B3] producerSliderVars=${sliderVars.length} declaredInternal=${declared.length} consumerReads=${consumerHits.length}\n${consumerHits.join("\n")}`,
    );
    expect(
        consumerHits,
        "consumer reads of a producer-DECLARED (internal) slider variable",
    ).toEqual([]);
});
