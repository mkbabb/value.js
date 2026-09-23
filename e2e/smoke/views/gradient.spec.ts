import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView, paneSettled } from "../fixtures/dock";
import { regionSettled } from "../fixtures/settle";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { inflateSync } from "node:zlib";

/**
 * Smoke (D.W5 Lane A) + the S.W5 §6.1 gradient interaction spec (Lane C),
 * EXTENDED at T.W6-2 (the §6.1 extension the O-21 gate names): stop add /
 * drag / remove, the atomic round-trip with its explicit failure surface
 * (W5-11), the easing row's live ramp (W5-9), the hue-swept envelope plate
 * (T.W6-2, ex the W5-8 slice), the rail-normalization/render-tile job split
 * (T-21b), and the at-rest no-compositing-transform audit (W5-10).
 */

async function openGradient(page: Page): Promise<Locator> {
    await page.goto("/");
    await openView(page, "Gradient");
    const main = page.getByRole("main", { name: "Gradient" });
    await expect(main.getByRole("heading", { name: "Gradient" }).last()).toBeVisible();
    // The swap spring must be at rest before interactions — the cold-load
    // stall-then-resume enter transition defeats Playwright's bounding-box
    // stability check (see paneSettled).
    await paneSettled(page);
    // Repair 1 (X-W6, Check 1 → a13) — `paneSettled` counts running Animations
    // only, so it hands back a stage pane still parked in its pre-start
    // `vj-enter-enter-from` pose (0 Animations). Measured: `:210`'s grab read the
    // handle's centre in that pose and the pane then travelled 586 px under the
    // pointer. Every test here reads rail geometry, so the rail's region is
    // settled once, at the door, by the one region settle (§0ba).
    await regionSettled(bar(main));
    return main;
}

const bar = (main: Locator) => main.getByTestId("gradient-stop-bar").last();
const handles = (main: Locator) => bar(main).locator("[data-stop-id]");

async function typeIntoEditor(main: Locator, page: Page, css: string) {
    const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
    await editor.scrollIntoViewIfNeeded();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type(css, { delay: 3 });
}

test("gradient view renders direction slider with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    const main = await openGradient(page);
    // The visualizer's "Interpolation" section heading proves the visualizer
    // shell mounted (reka-ui slider thumbs are 0×0 spans so role="slider"
    // checks miss; the heading is a stable visible anchor).
    await expect(
        main.getByRole("heading", { name: "Interpolation" }).last(),
    ).toBeVisible();
    // X-W1 · R2 (minted at that seat): `/Perceived-space plate/` is an
    // accessible name that appears in NO product byte; the tile's live name is
    // "Gradient render with type and direction applied" and it carries the
    // stable test id `gradient-render-tile`.
    const plate = main.getByTestId("gradient-render-tile").last();
    await expect(plate).toBeVisible();
    // X-W6 · X.W6.a (a13) — the two `toContainText` assertions that stood here
    // targeted RETIRED DOM. They read the W5-8 envelope plate's condition line
    // ("H 145–265°", "C ≤ 0.18"); the tile is a `role="img"` surface with no
    // text at all and no successor element carries that line. Measured
    // 2026-09-19: `grep -rn 'C ≤' demo | wc -l` → 0. R2's second arm applies —
    // DELETED with the measurement, never `test.skip()`, which G-6 names as
    // the same deferral under a new name. What the tile DOES state is asserted
    // by the T-21b test below (it carries type + direction) and by o21's paint
    // contract; the plate's condition line belongs to the wave that re-mints it.
    await expect(plate).toHaveAttribute(
        "aria-label",
        "Gradient render with type and direction applied",
    );

    expect(consoleErrors).toEqual([]);
});

test("the rail is a normalized 90° projection; the render tile carries type + direction (T-21b)", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    const railImage = () =>
        bar(main).evaluate((el) => getComputedStyle(el).backgroundImage);
    const tileImage = () =>
        main
            .getByTestId("gradient-render-tile")
            .last()
            .evaluate((el) => getComputedStyle(el).backgroundImage);

    // Angled linear: the rail NEVER rotates (the ramp completes the full
    // strip — "too short" is dead); the tile carries the angle.
    await typeIntoEditor(main, page, "linear-gradient(30deg, red, blue)");
    await expect.poll(tileImage, { timeout: 3000 }).toMatch(/^linear-gradient\(30deg/);
    expect(await railImage()).toMatch(/^linear-gradient\(90deg/);

    // Reversed direction: the rail axis NEVER flips against the handles.
    await typeIntoEditor(main, page, "linear-gradient(270deg, red, blue)");
    await expect.poll(tileImage, { timeout: 3000 }).toMatch(/^linear-gradient\(270deg/);
    expect(await railImage()).toMatch(/^linear-gradient\(90deg/);

    // Conic: an angular sweep can NOT live in the editing strip — the tile
    // renders it; the rail stays the normalized projection.
    await typeIntoEditor(main, page, "conic-gradient(from 45deg, red, blue)");
    await expect
        .poll(tileImage, { timeout: 3000 })
        .toMatch(/^conic-gradient\(from 45deg/);
    expect(await railImage()).toMatch(/^linear-gradient\(90deg/);

    expect(consoleErrors).toEqual([]);
});

/**
 * X-W6 · X.W6.a (a13) — RE-ANCHORED, not deleted. This spec's SUBSTANCE is
 * P7-R1: a selection has two exits (Escape and a re-tap) and neither destroys
 * a stop. Its REFERENT was the retired envelope-plate condition line, which no
 * element carries any more (`grep -rn 'C ≤' demo | wc -l` → 0, measured
 * 2026-09-19). The live referent for "this stop is selected" is the handle's
 * own `data-selected` state — a product byte, not a test-only hook — so the
 * three plate readings are re-pointed there and the capability stays gated.
 */
test("selecting a stop marks it; Escape and re-tap release it without destroying it (P7-R1)", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    const selected = () => bar(main).locator("[data-stop-id][data-selected]");
    const first = handles(main).first();

    // Default seed: nothing is selected.
    await expect(selected()).toHaveCount(0);

    // Pin: a pointer selection marks the handle AND seats focus on it, so the
    // pointer user and the keyboard user address the same control (a6).
    await first.click();
    await expect(selected()).toHaveCount(1);
    await expect(first).toBeFocused();

    // Release leg A (P7-R1 — the EXIT the sweep regime lacked): Escape on the
    // focused handle clears the selection WITHOUT destroying a stop.
    await page.keyboard.press("Escape");
    await expect(selected()).toHaveCount(0);
    await expect(handles(main)).toHaveCount(2);

    // Release leg B: a re-tap on the already-selected handle (the pointer twin
    // of Escape — touch has no Escape key) toggles the selection off.
    await first.click(); // re-pin
    await expect(selected()).toHaveCount(1);
    await first.click(); // re-tap → deselect
    await expect(selected()).toHaveCount(0);
    await expect(handles(main)).toHaveCount(2);

    expect(consoleErrors).toEqual([]);
});

/**
 * X-W6 · X.W6.a — ADDED (a2): the neighbour-crossing round trip. A drag past a
 * neighbour used to emit `… 74.9%, … 50%, … 100%`, a descending string the
 * model's OWN parser rejects; re-feeding the readout produced a verdict where
 * the user expected a gradient. The model now normalises on write, so the
 * round trip closes: drag across, re-feed the emitted CSS, get no verdict.
 */
test("neighbour-crossing drag round-trips: the emitted CSS re-applies with no verdict", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    // Three stops, so there is an interior neighbour to cross.
    await bar(main).scrollIntoViewIfNeeded();
    const box = (await bar(main).boundingBox())!;
    await bar(main).click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(handles(main)).toHaveCount(3);

    // Drag the LEFTMOST handle to ~75% — past both of its neighbours.
    const left = handles(main).first();
    const draggedId = (await left.getAttribute("data-stop-id"))!;
    const lb = (await left.boundingBox())!;
    const railY = lb.y + lb.height / 2;
    const rightwardRelease = box.x + box.width * 0.75;
    await page.mouse.move(lb.x + lb.width / 2, railY);
    await page.mouse.down();
    await page.mouse.move(rightwardRelease, railY, { steps: 10 });
    await page.mouse.up();

    // The model re-sorted on the write: the ordinals the DOM carries ascend.
    const ordinals = await handles(main).evaluateAll((els) =>
        els.map((el) => Number(el.getAttribute("aria-valuenow"))),
    );
    expect(ordinals).toEqual([...ordinals].sort((a, b) => a - b));
    expect(Math.max(...ordinals)).toBeGreaterThan(60);

    // X-W6 · X.W6.a3 (COHESION §0bb R-v1) — ADDED: the dragged stop TRACKS the
    // pointer through the crossing and settles where it was released: its final
    // ordinal is within 2% of the release x mapped onto the rail's own axis. The
    // ascending read above is satisfied by a stop that stops tracking the moment
    // it crosses (the `.v` frame: released at ~10%, settled at 27.4%), so the
    // round trip is asserted in BOTH directions — the leftward crossing is the one
    // whose keyed re-order moved the captured handle and dropped the gesture.
    const ordinalAt = (clientX: number) =>
        bar(main).evaluate((el, x) => {
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            const inset = parseFloat(cs.getPropertyValue("--rail-inset"));
            const origin = r.left + parseFloat(cs.borderLeftWidth) + inset;
            const track =
                r.width -
                parseFloat(cs.borderLeftWidth) -
                parseFloat(cs.borderRightWidth) -
                inset * 2;
            return ((x - origin) / track) * 100;
        }, clientX);
    const draggedOrdinal = async () =>
        Number(
            await main
                .locator(`[data-stop-id="${draggedId}"]`)
                .getAttribute("aria-valuenow"),
        );
    expect(
        Math.abs((await draggedOrdinal()) - (await ordinalAt(rightwardRelease))),
    ).toBeLessThanOrEqual(2);

    // …and back LEFTWARD past its neighbour to ~25%.
    const db = (await main.locator(`[data-stop-id="${draggedId}"]`).boundingBox())!;
    const leftwardRelease = box.x + box.width * 0.25;
    await page.mouse.move(db.x + db.width / 2, railY);
    await page.mouse.down();
    await page.mouse.move(leftwardRelease, railY, { steps: 10 });
    await page.mouse.up();
    const back = await handles(main).evaluateAll((els) =>
        els.map((el) => Number(el.getAttribute("aria-valuenow"))),
    );
    expect(back).toEqual([...back].sort((a, b) => a - b));
    expect(
        Math.abs((await draggedOrdinal()) - (await ordinalAt(leftwardRelease))),
    ).toBeLessThanOrEqual(2);

    // …and the CSS it emitted is CSS it accepts: re-feed the readout verbatim
    // and the Fira verdict line stays absent.
    const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
    const emitted = ((await editor.textContent()) ?? "").trim();
    expect(emitted).toMatch(/^linear-gradient\(/);
    await typeIntoEditor(main, page, emitted);
    await page.waitForTimeout(250);
    await expect(main.getByTestId("gradient-parse-verdict")).toHaveCount(0);
    await expect(handles(main)).toHaveCount(3);

    expect(consoleErrors).toEqual([]);
});

/**
 * X-W6 · X.W6.a — ADDED (a5/a7): a grab is not a teleport, and only the
 * primary button mints. Both were live, reproducible gestures: an 8px-off-centre
 * press plus 1px of travel moved the handle 10.11px, and a middle- or
 * right-press on the bare rail minted a stop with no caveat.
 */
test("a grab is not a teleport, and no secondary button mints", async ({ page }) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await bar(main).scrollIntoViewIfNeeded();
    const box = (await bar(main).boundingBox())!;
    const first = handles(main).first();
    const fb = (await first.boundingBox())!;
    const centreX = fb.x + fb.width / 2;
    const centreY = fb.y + fb.height / 2;

    // Grab 8px right of centre, travel 1px: the stop must not jump to the
    // pointer. 1px of travel is inside the 4px dead zone, so it must not move
    // at all — and it may never move by the grab offset.
    await page.mouse.move(centreX + 8, centreY);
    await page.mouse.down();
    await page.mouse.move(centreX + 9, centreY);
    await page.waitForTimeout(120);
    const after = (await handles(main).first().boundingBox())!;
    await page.mouse.up();
    expect(Math.abs(after.x + after.width / 2 - centreX)).toBeLessThanOrEqual(2);

    // Middle- and right-press on the bare rail mint NOTHING.
    const before = await handles(main).count();
    await page.mouse.click(box.x + box.width * 0.3, box.y + 4, { button: "middle" });
    await page.waitForTimeout(150);
    await page.mouse.click(box.x + box.width * 0.62, box.y + 4, { button: "right" });
    await page.waitForTimeout(150);
    await page.keyboard.press("Escape"); // dismiss any native context menu
    expect(await handles(main).count()).toBe(before);

    expect(consoleErrors).toEqual([]);
});

test("stop add (bar click mints the ramp color), drag, and touch-true remove", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await expect(handles(main)).toHaveCount(2);

    // ── add: a single bar click at ~50% (the warp-on-pointerdown is dead).
    //    locator.click = actionability-checked (auto-scroll; an intercepting
    //    overlay fails loudly instead of silently swallowing the click). ──
    await bar(main).scrollIntoViewIfNeeded();
    // X.W6.s (§0ba) — the drag below targets `box`, so `box` must be read off
    // a pane at rest. Bisected: a stage pane parked in `vj-enter-enter-from`
    // (`translateX(-110%)`, 0 running Animations) measures the rail at x = −430,
    // the drag aims left of the rail and the handle lands at left 12 — the
    // "Received 12" reading exactly.
    await regionSettled(bar(main));
    const box = await bar(main).boundingBox();
    if (!box) throw new Error("stop bar not visible");
    await bar(main).click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(handles(main)).toHaveCount(3);

    // ── drag: the middle handle moves; its accessible position follows ──
    const mid = handles(main).nth(1);
    await mid.hover();
    const midBox = await mid.boundingBox();
    if (!midBox) throw new Error("middle handle not visible");
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.75, midBox.y + midBox.height / 2, {
        steps: 8,
    });
    await page.mouse.up();
    // X-W4 · X.W4.c RE-ANCHOR. The handle's accessible NAME now carries its
    // identity and ordinal ("Gradient stop 2 of 3") while its VALUE carries the
    // percentage — the slider semantics gate C2 landed. The position is read
    // where GRADSTOP-A §6 says a position must be read: the handle's own `left`,
    // never the whole-percent name. `aria-valuenow` is banked beside it because
    // it is the model's exact value, not a rounded readout.
    const moved = await mid.evaluate((el) => ({
        left: parseFloat(getComputedStyle(el).left),
        inline: (el as HTMLElement).style.left,
        valueNow: Number(el.getAttribute("aria-valuenow")),
    }));
    const railWidth = (await bar(main).boundingBox())!.width;
    expect(moved.left).toBeGreaterThan(railWidth * 0.6);
    expect(moved.valueNow).toBeGreaterThan(60);

    // ── remove: selecting the handle reveals the remove chip (W5-11 — the
    //    right-click-only gesture is dead; remove is a visible control).
    //    The chip is a SIBLING of the bar (its glass-wash contain:paint
    //    clips children outside the box), so locate from the pane. ──
    const chip = main.getByRole("button", {
        name: "Remove selected stop",
    });
    await expect(chip).toBeVisible();
    await chip.click();
    await expect(handles(main)).toHaveCount(2);

    expect(consoleErrors).toEqual([]);
});

test("round-trip: authored CSS applies atomically with literals preserved", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await typeIntoEditor(main, page, "linear-gradient(45deg, red, rebeccapurple 80%)");

    // The debounced parse applies the WHOLE model: a stop lands at 80%.
    // X-W4 · X.W4.c RE-ANCHOR: bound to the handle's VALUE (the model's own
    // number) rather than to the whole-percent accessible name, which now
    // carries the stop's ordinal instead (gate C2).
    await expect(bar(main).locator('[data-stop-id][aria-valuenow="80"]')).toBeVisible({
        timeout: 3000,
    });
    await expect(handles(main)).toHaveCount(2);
    // No verdict — the failure surface is silent on success.
    await expect(main.getByTestId("gradient-parse-verdict")).toHaveCount(0);
    // The truce: the user's literals were NOT rewritten under the caret.
    const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
    await expect(editor).toContainText("rebeccapurple");

    // On blur the clean text settles to the canonical serialization —
    // authored literals survive (P2-15).
    await main.getByRole("heading", { name: "Gradient" }).last().click();
    await expect(editor).toContainText("red 0%, rebeccapurple 80%");

    expect(consoleErrors).toEqual([]);
});

test("garbage input fails LOUD and leaves the model untouched", async ({ page }) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await typeIntoEditor(main, page, "linear-gradient(90deg, notacolor, ???)");

    // The explicit failure surface (W5-11): a one-line verdict naming the
    // offending token + the destructive border on a real border.
    const verdict = main.getByTestId("gradient-parse-verdict").last();
    await expect(verdict).toBeVisible({ timeout: 3000 });
    await expect(verdict).toContainText("notacolor");
    const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
    await expect(editor).toHaveClass(/border-destructive/);
    // The WIP text is never destroyed.
    await expect(editor).toContainText("notacolor");

    // The model is UNTOUCHED — no partial apply, and the Easing section
    // (P0-1's vanishing witness) is still standing.
    await expect(handles(main)).toHaveCount(2);
    await expect(main.getByRole("heading", { name: "Easing" }).last()).toBeVisible();

    expect(consoleErrors).toEqual([]);
});

test("radial geometry is model-or-reject, never a silent drop", async ({ page }) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await typeIntoEditor(main, page, "radial-gradient(circle at 30% 30%, red, blue)");

    const verdict = main.getByTestId("gradient-parse-verdict").last();
    await expect(verdict).toBeVisible({ timeout: 3000 });
    await expect(verdict).toContainText(/radial geometry/);
    await expect(handles(main)).toHaveCount(2);

    expect(consoleErrors).toEqual([]);
});

test("easing row carries its live ramp; steps mode lands in the literal", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    // The first row is open on arrival and carries the interval's own ramp
    // strip (W5-9 — the row's "ball").
    await expect(
        main.getByRole("img", { name: /Eased ramp for interval/ }).last(),
    ).toBeVisible();

    // Flip the interval to steps. T.W6-3 (the interval specimen bench)
    // retired the SegmentedTabs mode pill — selection now lives on the
    // specimen strip's aria-pressed tiles; `exact` dodges the
    // step-start/step-end siblings. The authored literal follows into the
    // row's ONE readout rail (the one-literal law), byte-exact to the
    // catalogue's mint (`stepsLiteral(4, "end")`).
    const strip = main.getByRole("group", { name: "Easing curve specimens" }).first();
    await strip.getByRole("button", { name: "steps", exact: true }).click();
    // X-W6 · X.W6.a (a13): `steps(4, end)` is a RETIRED literal — the shipped
    // catalogue mints `steps(4, jump-end)` (`easingCatalogue.ts:187`, measured
    // 2026-09-19), the CSS-spec spelling. The assertion is re-pointed at the
    // literal the product actually emits, not weakened to a substring.
    await expect(main.locator(".readout-rail code").first()).toContainText(
        "steps(4, jump-end)",
        { timeout: 3000 },
    );
    // The closed-row identity law: the row head speaks the steps family.
    await expect(main.locator(".interval-head").first()).toContainText("steps");

    expect(consoleErrors).toEqual([]);
});

test("no pane subtree rests on a permanent compositing transform (W5-10)", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    // Let the view-switch spring fully settle — every region of the scene,
    // read by the shared settle (X.W6.s, §0ba), which also sees a pane parked
    // in its pre-start enter pose, instead of a fixed 1.2 s sleep.
    for (const region of await main.locator('.pane-wrapper[role="region"]').all())
        await regionSettled(region);

    const transforms = await page.evaluate(() => {
        const out: { sel: string; transform: string }[] = [];
        for (const sel of [".pane-container", ".pane-wrapper", ".pane-wrapper > *"]) {
            for (const el of document.querySelectorAll(sel)) {
                const t = getComputedStyle(el).transform;
                if (t && t !== "none") out.push({ sel, transform: t });
            }
        }
        return out;
    });
    expect(transforms).toEqual([]);

    expect(consoleErrors).toEqual([]);
});

/**
 * X-W6 · X.W6.e — gate **e1** (CC-064 · MT-F041): "the selector's ramp animates
 * under the shared law". TWO-WAY, the d2 falsifier's shape (`W6.md` X.W6.e: "If
 * the wave mechanism proves to belong inside the glass gradient/aurora
 * primitive, it leaves as a marked BJ ask (same two-way falsifier as d2)").
 *
 *   L1 · THE CENSUS, re-run here against the INSTALLED producer: does glass
 *        publish a strip-scale aurora motion primitive — an export or subpath
 *        named for a strip/ramp/band/wave/veil aurora, or any `@keyframes`
 *        of the aurora family in its stylesheet?
 *   L2 · IF ONE FITS, the rail must COMPOSE it and the ramp must MOVE: a
 *        settled-frame delta over N frames at the same colour, above zero.
 *   L3 · IF NONE FITS, the dated ask must exist and CARRY this census (the
 *        producer version, the `./aurora` declaration hash, every export row),
 *        and the ramp must NOT move locally — no animation on the rail and a
 *        zero settled-frame delta. A local wave would be a new animation
 *        species, which the wave bans.
 *
 * It navigates by the hash route and the rail's own test id, never through the
 * shell's `main` landmark, so it measures the rail and nothing the shell owns.
 *
 * MOTION-SOURCED · PENDING-QUARANTINE (`W6.md` H2): cites
 * `docs/tranches/V/megatranche/audit/codex-provenance/motion-quarantine.md`
 * (9812f951), re-derived against the two guards (`demo/styles/animations.css`,
 * glass's `a11y-overrides.css`): this assertion reads a STILL on the ask
 * branch, which neither guard can manufacture or mask.
 */
/**
 * e1's `moved` instrument (COHESION §0bb, ESC-W6e1-1 — E-3 re-reading): raster
 * noise is not motion. Repair 2 measured the only frame delta under load as ONE
 * compositor tile re-rastered at 1/255 and restored the next frame; a byte
 * inequality reads that as the ramp moving. The PNG frames are therefore
 * DECODED (no perceptual library) and a later frame has moved only when at
 * least `MOVED_AREA` of the clip's pixels differ from frame 0 by at least
 * `MOVED_LSB` in some channel.
 */
const MOVED_LSB = 4;
const MOVED_AREA = 0.005;

/** Decode an 8-bit, non-interlaced RGB/RGBA PNG (what `page.screenshot` emits). */
function decodePng(png: Buffer): {
    width: number;
    height: number;
    channels: number;
    data: Buffer;
} {
    let off = 8;
    let width = 0;
    let height = 0;
    let channels = 0;
    const idat: Buffer[] = [];
    while (off < png.length) {
        const len = png.readUInt32BE(off);
        const type = png.toString("latin1", off + 4, off + 8);
        const body = png.subarray(off + 8, off + 8 + len);
        if (type === "IHDR") {
            width = body.readUInt32BE(0);
            height = body.readUInt32BE(4);
            const [depth, colorType, , , interlace] = body.subarray(8, 13);
            channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
            if (depth !== 8 || channels === 0 || interlace !== 0)
                throw new Error(
                    `unsupported PNG: depth ${depth} colorType ${colorType} interlace ${interlace}`,
                );
        } else if (type === "IDAT") idat.push(body);
        else if (type === "IEND") break;
        off += 12 + len;
    }
    const raw = inflateSync(Buffer.concat(idat));
    const stride = width * channels;
    const data = Buffer.alloc(stride * height);
    for (let y = 0; y < height; y++) {
        const filter = raw[y * (stride + 1)]!;
        const src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
        const row = y * stride;
        for (let x = 0; x < stride; x++) {
            const a = x >= channels ? data[row + x - channels]! : 0;
            const b = y > 0 ? data[row - stride + x]! : 0;
            const c = x >= channels && y > 0 ? data[row - stride + x - channels]! : 0;
            let pred = 0;
            if (filter === 1) pred = a;
            else if (filter === 2) pred = b;
            else if (filter === 3) pred = (a + b) >> 1;
            else if (filter === 4) {
                const p = a + b - c;
                const pa = Math.abs(p - a);
                const pb = Math.abs(p - b);
                const pc = Math.abs(p - c);
                pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
            } else if (filter !== 0)
                throw new Error(`unsupported PNG row filter ${filter}`);
            data[row + x] = (src[x]! + pred) & 0xff;
        }
    }
    return { width, height, channels, data };
}

/** The fraction of pixels whose largest channel delta against `base` is ≥ `MOVED_LSB`. */
function movedFraction(
    base: ReturnType<typeof decodePng>,
    frame: ReturnType<typeof decodePng>,
): number {
    if (
        base.width !== frame.width ||
        base.height !== frame.height ||
        base.channels !== frame.channels
    )
        throw new Error("clip frames differ in geometry");
    const pixels = base.width * base.height;
    let changed = 0;
    for (let i = 0; i < pixels; i++) {
        const o = i * base.channels;
        for (let ch = 0; ch < base.channels; ch++) {
            if (Math.abs(base.data[o + ch]! - frame.data[o + ch]!) >= MOVED_LSB) {
                changed++;
                break;
            }
        }
    }
    return changed / pixels;
}

test("gradient selector aurora", async ({ page }) => {
    const pkg = join(process.cwd(), "node_modules/@mkbabb/glass-ui");
    const manifest = JSON.parse(readFileSync(join(pkg, "package.json"), "utf8")) as {
        version: string;
        exports: Record<string, unknown>;
    };
    const indexPath = join(pkg, "dist/components/aurora/index.d.ts");
    const index = readFileSync(indexPath, "utf8");
    const indexHash = createHash("sha256").update(index).digest("hex");
    const exported = [...index.matchAll(/(?:default as |\b)(\w+)(?=[,\s}])/g)]
        .map((m) => m[1]!)
        .filter((n) => /^[A-Za-z]/.test(n) && !/^(export|type|from|default|as)$/.test(n));
    const FIT = /Aurora(Strip|Ramp|Band|Wave|Veil)|(Strip|Ramp|Band|Wave|Veil)Aurora|aurora-(strip|ramp|band|wave|veil)/i;
    const cssFiles: string[] = [];
    const walk = (dir: string) => {
        for (const e of readdirSync(dir, { withFileTypes: true })) {
            const p = join(dir, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith(".css")) cssFiles.push(p);
        }
    };
    walk(join(pkg, "dist"));
    const auroraKeyframes = cssFiles.flatMap((f) =>
        [...readFileSync(f, "utf8").matchAll(/@keyframes\s+([\w-]*aurora[\w-]*)/gi)].map((m) => m[1]!),
    );
    const fitting = [
        ...exported.filter((n) => FIT.test(n)),
        ...Object.keys(manifest.exports).filter((k) => FIT.test(k)),
        ...auroraKeyframes,
    ];

    await page.goto("/#/gradient");
    const rail = page.locator('[data-testid="gradient-stop-bar"]:visible').first();
    await expect(rail).toBeVisible({ timeout: 15000 });
    await page.mouse.move(0, 0);
    await rail.scrollIntoViewIfNeeded();
    // The ramp's own motion is what is measured, never the box's: the pane may still
    // be settling after a cold boot (a locator screenshot then times out on "element
    // is not stable"), so the box is read until two reads 250ms apart agree, and the
    // frames are clipped to that settled box.
    let box = await rail.boundingBox();
    await expect
        .poll(
            async () => {
                const prev = box;
                await page.waitForTimeout(250);
                box = await rail.boundingBox();
                return JSON.stringify(prev) === JSON.stringify(box) && box !== null;
            },
            { timeout: 15000, message: "the rail's box never settled" },
        )
        .toBe(true);
    // The rail's card is translucent glass, so the ground behind it shows through the
    // clip: the atmosphere canvas's one-shot boot fade (`opacity 0.9s`, measured at the
    // repair-1 bisect still running for ~1 s after the box settles) repaints the clip by
    // 1/255 per channel between the first frame and the rest. That is the page arriving,
    // not the ramp moving — so the frames wait until no FINITE animation on the document
    // timeline is still running. Looping animations (an aurora, a lamp) and
    // scroll-driven ones never finish and are not arrivals; they stay in the frames.
    await expect
        .poll(
            () =>
                page.evaluate(() =>
                    document
                        .getAnimations()
                        .filter(
                            (a) =>
                                a.playState === "running" &&
                                a.timeline instanceof DocumentTimeline &&
                                a.effect?.getComputedTiming().endTime !== Infinity,
                        )
                        .map((a) => {
                            const t = (a.effect as KeyframeEffect | null)?.target;
                            const name =
                                (a as CSSAnimation).animationName ??
                                (a as CSSTransition).transitionProperty;
                            return `${name} on ${t?.tagName.toLowerCase()}.${[...(t?.classList ?? [])].slice(0, 2).join(".")}`;
                        })
                        .join("; "),
                ),
            { timeout: 15000, message: "the page never finished arriving" },
        )
        .toBe("");

    const frames: Buffer[] = [];
    for (let i = 0; i < 5; i++) {
        frames.push(await page.screenshot({ clip: box!, animations: "allow" }));
        await page.waitForTimeout(300);
    }
    const decoded = frames.map(decodePng);
    const moved = decoded
        .slice(1)
        .some((f) => movedFraction(decoded[0]!, f) >= MOVED_AREA);
    const railMotion = await rail.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { animation: cs.animationName, children: el.querySelectorAll("*").length };
    });

    if (fitting.length > 0) {
        // L2 — a primitive fits: composing it is the only lawful branch.
        expect(
            await rail.evaluate(
                (el, names) => names.some((n) => el.querySelector(`[class*="${n.toLowerCase()}"]`)),
                fitting,
            ),
            `glass ${manifest.version} publishes ${fitting.join(", ")} and the rail does not compose it`,
        ).toBe(true);
        expect(moved, "the composed aurora does not move the ramp").toBe(true);
    } else {
        // L3 — none fits: the dated ask carries the census, and nothing moves locally.
        const askPath = join(process.cwd(), "docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md");
        expect(existsSync(askPath), "no fitting primitive and no dated ask").toBe(true);
        const ask = readFileSync(askPath, "utf8");
        expect(ask).toContain(`\`@mkbabb/glass-ui\` **${manifest.version}**`);
        expect(ask, "the ask's census hash is stale — re-run the census").toContain(indexHash);
        for (const name of ["Aurora", "useAurora", "createAurora", "paletteToCssGradient", "auroraFallbackGround"]) {
            expect(exported, `the census row ${name} is no longer published`).toContain(name);
            expect(ask).toContain(`\`${name}\``);
        }
        expect(railMotion.animation, "the ramp carries a local animation species").toBe("none");
        expect(moved, "the ramp moves with no producer primitive composed").toBe(false);
    }
});
