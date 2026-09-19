// SERVED MODEL: claude-opus-5[1m]
import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * X-W4 · X.W4.c — THE GRADIENT STOP RAIL'S KEYBOARD GRAMMAR (gates C1 · C2 · C3 · C4).
 *
 * W4.md §5 "X.W4.c": a keyboard-only user can create, select, move and remove a
 * gradient stop, and can see where focus is. §6's unit-c table gives the four
 * gates their falsifiers; this file IS those gates. The gate FORM is a Playwright
 * spec, never a `scripts/proof-*.mjs` (CC-019, L-19).
 *
 * THE MEASUREMENT LOCKS, transcribed from the authorities rather than invented:
 *
 *  · GRADSTOP-A §6 (READOUT-VACUITY, binding) — "the handle aria-label rounds to
 *    whole percent; any assertion of sub-percent precision against the accessible
 *    name is vacuous by construction; position-precision gates read `style.left`."
 *    EVERY position assertion below reads the handle's own `left` (the inline
 *    declaration is recorded, the used value in px is asserted). The accessible
 *    NAME is read for exactly one thing — C2's ordinal — never for a position.
 *
 *  · GRADSTOP-A §14/§15 — an ordinal REORDER cure (and any minimum-separation
 *    law) is banned until the model's normalise-on-write lands (X-W6 / CC-058).
 *    So the Space arm below measures the constitution's §5.2 grab/drop/cancel
 *    gesture at `style.left`, NOT an ordinal swap: see C3's own comment.
 *
 *  · W4.md §6 C1's falsifier — "also fails if the new keyboard seat breaks the
 *    pointer-add gesture (the spec keeps a pointer-add case beside it)". C1's
 *    second half is that live pointer case, in the same test, after the keyboard
 *    one.
 *
 *  · W4.md §4 File Bounds admits this unit ONE spec path, in `e2e/smoke/` — so
 *    the coarse cell of C4 is measured by an in-file `test.use` context (the
 *    idiom `e2e/smoke/oracles/o27-focus-affordance.spec.ts:169-196` already
 *    uses), never by inventing an out-of-bounds `e2e/smoke/mobile/` twin.
 */

// A cold load of a live-WebGL dev-served app, plus a Tab walk, does not fit the
// config's 30s default (measured at this unit's first run). The budget is raised
// HERE, per file, and NOT ONE ASSERTION IS RELAXED — the precedent X.W4.a's
// target specs and the W51 PNG specs set on shared runners.
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

const bar = (main: Locator) => main.getByTestId("gradient-stop-bar").last();
const handles = (main: Locator) => bar(main).locator("[data-stop-id]");
const caret = (main: Locator) => bar(main).getByTestId("gradient-stop-caret");

declare global {
    interface Window {
        __railPointerEvents?: string[];
    }
}

/**
 * Land `/#/gradient` COLD and wait for the rail to be painted and at rest.
 *
 * The demo routes through `createWebHashHistory()`, so a goto after a prior
 * navigation is a SAME-DOCUMENT hash change and a measurement taken on the way
 * samples the old view (X.W4.a measured exactly that). The `about:blank` hop
 * makes the destination the INITIAL route, so there is no swap to race — and it
 * reaches the gradient view with ZERO pointer events, which is what C1's
 * keyboard-only journey requires of its own setup.
 */
async function openGradient(page: Page): Promise<Locator> {
    await page.goto("about:blank");
    await page.goto("/#/gradient", { timeout: 60_000 });
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible({ timeout: 30_000 });
    await expect(
        main
            .getByRole("heading", { name: "Gradient" })
            .filter({ visible: true })
            .first(),
    ).toBeVisible({ timeout: 30_000 });
    await expect(bar(main)).toBeVisible({ timeout: 20_000 });
    await expect(handles(main).first()).toBeVisible({ timeout: 20_000 });
    await settle(page, main);
    return main;
}

/**
 * Geometric rest, measured rather than assumed: four consecutive identical rail
 * signatures after a ≥1.5s dwell. `paneSettled` is deliberately NOT used — its
 * own docblock states it times out on a permanent resting transform, and
 * relaxing it would be the masking move this wave forbids.
 */
async function settle(page: Page, main: Locator): Promise<void> {
    const signature = () =>
        bar(main).evaluate((el) => {
            const r = el.getBoundingClientRect();
            const stops = Array.from(el.querySelectorAll("[data-stop-id]"))
                .map((h) => {
                    const hr = h.getBoundingClientRect();
                    return `${Math.round(hr.x * 10) / 10}:${Math.round(hr.width * 10) / 10}`;
                })
                .join("|");
            return `${Math.round(r.width * 10) / 10}/${stops}`;
        });
    const started = Date.now();
    let last = await signature();
    let stable = 0;
    for (let i = 0; i < 100; i++) {
        await page.waitForTimeout(250);
        const next = await signature();
        stable = next === last && next.length > 0 ? stable + 1 : 0;
        last = next;
        if (stable >= 4 && Date.now() - started >= 1500) return;
    }
    throw new Error("the gradient rail's geometry never settled");
}

/** The handle's own position, read the ONLY way GRADSTOP-A §6 allows. */
async function leftOf(handle: Locator): Promise<{ px: number; inline: string }> {
    return handle.evaluate((el) => ({
        px: parseFloat(getComputedStyle(el).left),
        inline: (el as HTMLElement).style.left,
    }));
}

/** Every pointer/mouse/touch event that reaches the document, in order. */
async function armPointerCensus(page: Page): Promise<void> {
    await page.evaluate(() => {
        window.__railPointerEvents = [];
        for (const type of [
            "pointerdown",
            "pointerup",
            "mousedown",
            "mouseup",
            "click",
            "touchstart",
        ]) {
            document.addEventListener(
                type,
                (e) => {
                    const t = e.target as Element | null;
                    window.__railPointerEvents?.push(`${e.type}@${t?.tagName ?? "?"}`);
                },
                true,
            );
        }
    });
}

const pointerCensus = (page: Page): Promise<string[]> =>
    page.evaluate(() => window.__railPointerEvents ?? []);

/** Tab until `predicate` holds for `document.activeElement`. */
async function tabUntil(
    page: Page,
    what: "caret" | "handle",
    limit = 140,
): Promise<void> {
    for (let i = 0; i < limit; i++) {
        await page.keyboard.press("Tab");
        const arrived = await page.evaluate((kind) => {
            const el = document.activeElement;
            if (!el) return false;
            return kind === "caret"
                ? el.getAttribute("data-testid") === "gradient-stop-caret"
                : el.hasAttribute("data-stop-id");
        }, what);
        if (arrived) return;
    }
    throw new Error(`Tab never reached the ${what} in ${limit} presses`);
}

test("C1 · a keyboard-only journey mints a stop — and the pointer-add gesture still mints", async ({
    page,
}) => {
    const main = await openGradient(page);
    await expect(handles(main)).toHaveCount(2);

    // ── the keyboard arm: not one pointer event from here to the new stop ──
    await armPointerCensus(page);
    await tabUntil(page, "caret");

    const seat = caret(main);
    // The seat is a REAL control: a role and a non-empty name, not a div with a
    // tabindex (W4.md §6 C1's RED input is "a bare <div> with no role, no
    // tabindex").
    expect(
        await seat.evaluate(
            (el) => el.getAttribute("role") ?? el.tagName.toLowerCase(),
        ),
        "the keyboard add seat's role",
    ).toMatch(/^(button)$/);
    const seatName = await seat.getAttribute("aria-label");
    expect(seatName ?? "", "the keyboard add seat's accessible name").not.toBe("");

    // Move the caret off its resting position, then mint.
    for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight");
    const caretLeft = parseFloat(
        await seat.evaluate((el) => getComputedStyle(el).left),
    );
    await page.keyboard.press("Enter");
    await expect(handles(main), "a keyboard journey minted a stop").toHaveCount(3);

    // The stop landed AT the caret — read at `left`, never at the rounded name.
    const minted = await handles(main)
        .nth(1)
        .evaluate((el) => ({
            px: parseFloat(getComputedStyle(el).left),
            inline: (el as HTMLElement).style.left,
        }));
    console.log(
        `[W4-C1] caretLeft=${caretLeft} mintedLeft=${minted.px} inline="${minted.inline}"`,
    );
    expect(Math.abs(minted.px - caretLeft)).toBeLessThan(1);

    const pointerEvents = await pointerCensus(page);
    console.log(`[W4-C1] pointerEventsDuringKeyboardJourney=${pointerEvents.length}`);
    expect(pointerEvents, "the keyboard journey fired pointer events").toEqual([]);

    // ── Space mints too (the platform's second activation key) ──
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press(" ");
    await expect(handles(main), "Space on the add seat mints").toHaveCount(4);

    // ── the pointer arm, ALIVE beside the keyboard one (C1's own falsifier) ──
    const box = await bar(main).boundingBox();
    if (!box) throw new Error("stop bar not visible");
    await bar(main).click({ position: { x: box.width * 0.25, y: box.height / 2 } });
    await expect(handles(main), "the pointer add gesture still mints").toHaveCount(5);
});

test("C2 · every stop handle is a slider in the a11y tree — role, value triple, valuetext, ordinal", async ({
    page,
}) => {
    const main = await openGradient(page);

    // Three stops, so an ordinal is more than a tautology.
    const box = await bar(main).boundingBox();
    if (!box) throw new Error("stop bar not visible");
    await bar(main).click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(handles(main)).toHaveCount(3);

    const rows = await handles(main).evaluateAll((els) =>
        els.map((el) => ({
            role: el.getAttribute("role"),
            min: el.getAttribute("aria-valuemin"),
            max: el.getAttribute("aria-valuemax"),
            now: el.getAttribute("aria-valuenow"),
            text: el.getAttribute("aria-valuetext"),
            name: el.getAttribute("aria-label"),
        })),
    );
    console.log(`[W4-C2] ${JSON.stringify(rows)}`);

    const defects: string[] = [];
    rows.forEach((row, i) => {
        const who = `handle ${i + 1}`;
        if (row.role !== "slider") defects.push(`${who}: role="${row.role}" ≠ slider`);
        if (row.min !== "0") defects.push(`${who}: aria-valuemin="${row.min}" ≠ 0`);
        if (row.max !== "100") defects.push(`${who}: aria-valuemax="${row.max}" ≠ 100`);
        const now = Number(row.now);
        if (!Number.isFinite(now) || now < 0 || now > 100)
            defects.push(`${who}: aria-valuenow="${row.now}" is not a 0–100 number`);
        // Human-readable, unit-aware, and NOT a raw float (o27 BR-4's grammar,
        // applied to this rail's own value).
        if (!row.text || !/^[A-Za-z]/.test(row.text) || !/%/.test(row.text))
            defects.push(`${who}: aria-valuetext="${row.text}" is not human-readable`);
        if (row.text && /\d\.\d{10,}/.test(row.text))
            defects.push(`${who}: aria-valuetext carries a raw float`);
        // The ordinal, in the NAME (this is the one thing the name is read for).
        const ordinal = row.name?.match(/\b(\d+)\s+of\s+(\d+)\b/);
        if (!ordinal) defects.push(`${who}: name "${row.name}" carries no ordinal`);
        else if (Number(ordinal[1]) !== i + 1 || Number(ordinal[2]) !== rows.length)
            defects.push(
                `${who}: name "${row.name}" states ${ordinal[1]} of ${ordinal[2]}`,
            );
    });
    expect(defects, "stop handles that are not sliders in the a11y tree").toEqual([]);

    // …and the a11y TREE agrees, not just the attributes: every handle is
    // reachable as a named slider.
    await expect(bar(main).getByRole("slider", { name: /\d+\s+of\s+\d+/ })).toHaveCount(
        3,
    );
});

test("C3 · the full keyboard grammar moves the stop — every key measured at style.left", async ({
    page,
}) => {
    const main = await openGradient(page);

    const box = await bar(main).boundingBox();
    if (!box) throw new Error("stop bar not visible");
    await bar(main).click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(handles(main)).toHaveCount(3);
    const mid = handles(main).nth(1);
    await mid.focus();

    const press = async (key: string) => {
        await mid.press(key);
        return (await leftOf(mid)).px;
    };

    // The rail's own unit of 1%, DERIVED from the rail rather than hardcoded:
    // Home is 0%, End is 100%, so one percent is a hundredth of their distance.
    const atHome = await press("Home");
    const homeAgain = await press("ArrowLeft"); // clamped at the floor → 0% proven
    const atEnd = await press("End");
    const endAgain = await press("ArrowRight"); // clamped at the ceiling → 100%
    const unit = (atEnd - atHome) / 100;
    console.log(
        `[W4-C3] home=${atHome} end=${atEnd} unit=${unit.toFixed(4)}px/% inline="${
            (await leftOf(mid)).inline
        }"`,
    );
    const near = (a: number, b: number) => Math.abs(a - b) < Math.max(0.6, unit * 0.2);

    const defects: string[] = [];
    const check = (name: string, got: number, want: number) => {
        if (!near(got, want)) defects.push(`${name}: left=${got} expected ≈${want}`);
    };
    check("Home is the floor (ArrowLeft cannot pass it)", homeAgain, atHome);
    check("End is the ceiling (ArrowRight cannot pass it)", endAgain, atEnd);
    if (!(atEnd > atHome))
        defects.push(`End (${atEnd}) is not right of Home (${atHome})`);

    // From a known interior position, each key moves by its own documented step.
    let at = await press("Home");
    at = await press("PageUp");
    check("PageUp = +10%", at, atHome + 10 * unit);
    const afterPageUp = at;
    at = await press("PageDown");
    check("PageDown = −10%", at, afterPageUp - 10 * unit);
    const base = at;
    at = await press("ArrowUp");
    check("ArrowUp = +1%", at, base + unit);
    at = await press("ArrowDown");
    check("ArrowDown = −1%", at, base);
    at = await press("ArrowRight");
    check("ArrowRight = +1% (still behaves)", at, base + unit);
    at = await press("ArrowLeft");
    check("ArrowLeft = −1% (still behaves)", at, base);

    // Space — the constitution's §5.2 grab/drop gesture (row 131: "after Space
    // grabs … Space drops, Escape cancels"). It is measured HERE at style.left
    // across the whole gesture, in both arms, because a Space that teleported the
    // stop on its own keypress would be the grab-teleport species C11/G5 books as
    // a defect, and an ordinal swap is banned by GRADSTOP-A §14/§15 until X-W6's
    // normalise-on-write lands. The arms are NOT vacuous: with no grab state,
    // Escape cannot restore, so the cancel arm reds on today's bytes.
    const grabOrigin = await press(" "); // grab: the position is untouched
    check("Space grabs without moving the stop", grabOrigin, base);
    const grabbedText = await mid.getAttribute("aria-valuetext");
    if (!/grab/i.test(grabbedText ?? ""))
        defects.push(`Space grabbed silently: aria-valuetext="${grabbedText}"`);
    at = await press("ArrowRight");
    at = await press("ArrowRight");
    at = await press("ArrowRight");
    check("a grabbed stop still moves", at, grabOrigin + 3 * unit);
    at = await press("Escape");
    check("Escape CANCELS the grab back to its origin", at, grabOrigin);

    at = await press(" "); // grab again
    at = await press("ArrowRight");
    at = await press("ArrowRight");
    const dropped = await press(" "); // drop: the move is committed
    check("Space drops the grab where it stands", dropped, grabOrigin + 2 * unit);
    at = await press("Escape"); // ungrabbed Escape clears selection, never position
    check("Escape after the drop does not move the stop", at, dropped);
    await expect(
        main.getByRole("button", { name: "Remove selected stop" }),
        "Escape still clears the selection (the remove chip retires)",
    ).toHaveCount(0);

    // Delete still behaves.
    await mid.press("Delete");
    await expect(handles(main), "Delete still removes the stop").toHaveCount(2);

    console.log(`[W4-C3] defects=${defects.length}\n${defects.join("\n")}`);
    expect(defects, "keys whose measured effect on style.left is wrong").toEqual([]);
});

/**
 * C4's two arms: the handle's attributed target box, and a focus ring that is
 * PAINTED and not clipped.
 *
 * The clipping arm reads the painted geometry, never a CSS declaration in the
 * source: the ring's own outer box is derived from the computed `box-shadow`
 * spread and tested against every ancestor that actually clips (a non-visible
 * `overflow`, a paint/strict/content `contain`, or a `clip-path`).
 */
async function ringReport(page: Page, handle: Locator) {
    return handle.evaluate((el) => {
        const cs = getComputedStyle(el);
        const shadow = cs.boxShadow;
        const spreads = Array.from(
            shadow.matchAll(/0px 0px 0px (\d+(?:\.\d+)?)px/g),
        ).map((m) => parseFloat(m[1] ?? "0"));
        const spread = spreads.length ? Math.max(...spreads) : 0;
        const r = el.getBoundingClientRect();
        const ring = {
            left: r.left - spread,
            top: r.top - spread,
            right: r.right + spread,
            bottom: r.bottom + spread,
        };
        const clippers: string[] = [];
        let node: Element | null = el.parentElement;
        while (node && node !== document.documentElement) {
            const s = getComputedStyle(node);
            const clipsPaint =
                /paint|strict|content/.test(s.contain) ||
                s.overflowX !== "visible" ||
                s.overflowY !== "visible" ||
                s.clipPath !== "none";
            if (clipsPaint) {
                const b = node.getBoundingClientRect();
                if (
                    ring.left < b.left - 0.5 ||
                    ring.top < b.top - 0.5 ||
                    ring.right > b.right + 0.5 ||
                    ring.bottom > b.bottom + 0.5
                ) {
                    clippers.push(
                        `${node.tagName.toLowerCase()}.${(
                            node.getAttribute("class") ?? ""
                        )
                            .trim()
                            .split(/\s+/)
                            .slice(0, 2)
                            .join(".")} [contain=${s.contain} overflow=${s.overflowX}/${
                            s.overflowY
                        } clip-path=${s.clipPath}]`,
                    );
                }
            }
            node = node.parentElement;
        }
        return { shadow, spread, clippers, focusVisible: el.matches(":focus-visible") };
    });
}

test("C4 · handle target ≥24×24 and a focus ring that paints, unclipped (fine pointer)", async ({
    page,
}) => {
    const main = await openGradient(page);

    const geom = await handles(main).evaluateAll((els) =>
        els.map((el) => {
            const r = el.getBoundingClientRect();
            const before = getComputedStyle(el, "::before");
            const face = el.querySelector(".rail-handle-face");
            const fr = face?.getBoundingClientRect();
            return {
                w: Math.round(r.width * 10) / 10,
                h: Math.round(r.height * 10) / 10,
                hitW: parseFloat(before.width) || 0,
                hitH: parseFloat(before.height) || 0,
                faceW: fr ? Math.round(fr.width * 10) / 10 : null,
                faceH: fr ? Math.round(fr.height * 10) / 10 : null,
                // Both boxes are rem-derived, so the root size is recorded with
                // them: it is what makes the same source read 24.0 here and
                // 24.8 in the coarse cell.
                rootFontSize: parseFloat(
                    getComputedStyle(document.documentElement).fontSize,
                ),
            };
        }),
    );
    console.log(`[W4-C4-FINE] ${JSON.stringify(geom)}`);

    const undersized = geom
        .filter((g) => g.w < 24 || g.h < 24)
        .map((g) => `${g.w}×${g.h}`);
    expect(undersized, "stop handles under the 24×24 target floor").toEqual([]);
    // The always-on hit inflation (U-F27) survives the box growth, and the 20px
    // VISUAL silhouette is held (W4.md §5: "its 20×20 visual silhouette may stay
    // — the target is what must grow").
    for (const g of geom) {
        expect(g.hitW, "the ::before hit region").toBeGreaterThanOrEqual(24);
        expect(g.hitH, "the ::before hit region").toBeGreaterThanOrEqual(24);
        expect(g.faceW, "the painted 20px silhouette").toBeGreaterThan(18);
        expect(g.faceW, "the painted 20px silhouette").toBeLessThan(22);
    }

    // The focus ring: a real Tab (the only thing that gives true :focus-visible
    // modality), the resting shadow for the delta, then the painted ring.
    const first = handles(main).first();
    const rest = await first.evaluate((el) => getComputedStyle(el).boxShadow);
    await tabUntil(page, "handle");
    const focused = page.locator("[data-stop-id]:focus");
    await expect(focused).toHaveCount(1);
    // The ring rides the handle's own `box-shadow` TRANSITION, so a read taken
    // the instant focus lands returns the interpolation's first frame (measured
    // here: two transparent zero-spread layers). The settle is POLLED rather
    // than frozen — o27 overrides the transition with `!important` to make its
    // read deterministic, which is the right aid for that oracle but would mean
    // this gate never measures the affordance the user actually sees.
    await expect
        .poll(async () => (await ringReport(page, focused)).shadow, { timeout: 5000 })
        .toMatch(/0px 0px 0px 3px/);
    const report = await ringReport(page, focused);
    console.log(`[W4-C4-RING] ${JSON.stringify(report)}`);

    expect(report.focusVisible, ":focus-visible did not match the tabbed handle").toBe(
        true,
    );
    expect(report.shadow, "the outer ring layer").toMatch(/0px 0px 0px 3px/);
    expect(report.shadow, "the inner hairline layer").toMatch(/0px 0px 0px 1px/);
    expect(report.shadow).not.toBe(rest);
    expect(
        report.clippers,
        "ancestors whose paint clip cuts the focus ring off",
    ).toEqual([]);
});

test.describe("C4 coarse pointer", () => {
    // W4.md §4 gives this unit ONE spec path; the coarse cell is measured in an
    // in-file context, the o27 idiom, never in an out-of-bounds mobile twin.
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 412, height: 915 } });

    test("C4 · handle target ≥24×24 with the producer's coarse hit rung (coarse pointer)", async ({
        page,
    }) => {
        const main = await openGradient(page);
        expect(
            await page.evaluate(() => matchMedia("(pointer: coarse)").matches),
            "emulated coarse pointer",
        ).toBe(true);

        const geom = await handles(main).evaluateAll((els) =>
            els.map((el) => {
                const r = el.getBoundingClientRect();
                const before = getComputedStyle(el, "::before");
                return {
                    w: Math.round(r.width * 10) / 10,
                    h: Math.round(r.height * 10) / 10,
                    hitW: parseFloat(before.width) || 0,
                    hitH: parseFloat(before.height) || 0,
                };
            }),
        );
        console.log(`[W4-C4-COARSE] ${JSON.stringify(geom)}`);

        const undersized = geom
            .filter((g) => g.w < 24 || g.h < 24)
            .map((g) => `${g.w}×${g.h}`);
        expect(
            undersized,
            "stop handles under the 24×24 target floor (coarse)",
        ).toEqual([]);
        for (const g of geom) {
            expect(g.hitW, "the coarse hit rung").toBeGreaterThanOrEqual(44);
            expect(g.hitH, "the coarse hit rung").toBeGreaterThanOrEqual(44);
        }
    });
});
