import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A — merge-gate-blocking spec):
 *   wall-clock evidence that the topology REACTIVITY-B verified is INSTANT.
 *
 * Per audit/D-REACTIVITY-B-instant.md §7(a): drive the spectrum canvas with
 * a real pointer sequence, observe the docs-side reactive readout (the
 * `* component value` textboxes in ColorComponentDisplay), record the
 * wall-clock delta. ≤ 50 ms median across paths is the threshold (one Vue
 * tick + one frame + DOM commit, with 3× slack for CI jitter).
 *
 * Banned-pattern note: `page.evaluate(() => performance.now())` is allowed
 * — it is read-only timing, not interaction. The ban from B.W3 Lane D is
 * on `page.evaluate()` driving DOM interaction (e.g. element.click).
 *
 * Concurrency: the reactivity probe is timing-sensitive. Other smoke specs
 * running in parallel workers contend for the host CPU and inflate the
 * measured deltas. `fullyParallel: false` (default at the file level) +
 * `test.describe.configure({ mode: 'serial' })` plus the use of one test
 * worker for this file guarantees an isolated measurement.
 */
test.describe.configure({ mode: "serial" });
test("spectrum-drag → component-readout wall-clock ≤ 50ms median across 5 paths", async ({
    page,
}) => {
    await page.goto("/");

    const spectrum = page
        .getByRole("img", { name: /Color spectrum/ })
        .last();
    await expect(spectrum).toBeVisible();

    // ColorComponentDisplay textboxes carry the live reactive readout —
    // their innerText changes as the model commits. Pick the L component
    // (always present across spaces); .last() picks the visible copy.
    const readout = page.getByRole("textbox", { name: /component value/ }).last();
    await expect(readout).toBeVisible();

    const box = await spectrum.boundingBox();
    if (!box) throw new Error("spectrum not laid out");

    // 5 pointer paths across the spectrum — varies start/end to catch
    // outliers + ensure the readout actually changes (not a no-op).
    const paths: Array<{ from: [number, number]; to: [number, number] }> = [
        { from: [0.1, 0.1], to: [0.9, 0.5] },
        { from: [0.5, 0.5], to: [0.3, 0.7] },
        { from: [0.2, 0.8], to: [0.8, 0.2] },
        { from: [0.4, 0.4], to: [0.6, 0.6] },
        { from: [0.1, 0.9], to: [0.9, 0.1] },
    ];

    const deltas: number[] = [];

    for (const path of paths) {
        const baseline = (await readout.innerText()).trim();

        const fx = box.x + box.width * path.from[0];
        const fy = box.y + box.height * path.from[1];
        const tx = box.x + box.width * path.to[0];
        const ty = box.y + box.height * path.to[1];
        await page.mouse.move(fx, fy);
        await page.mouse.down();
        await page.mouse.move(tx, ty);

        // t0 captured AFTER the pointer interaction protocol completes
        // and BEFORE pointer-up commits — measures the reactivity chain
        // delta (pointerup → model write → computed → DOM commit) without
        // including Playwright protocol overhead from mouse.move calls.
        const t0 = await page.evaluate(() => performance.now());
        await page.mouse.up();

        // Sub-frame poll INSIDE the page (no Playwright protocol round-trips
        // per check). Returns once the readout text diverges from baseline;
        // Playwright then captures performance.now() for the delta. If the
        // chain isn't instant, the 200ms outer timeout fails the test
        // LOUDLY rather than measuring a spuriously-fast no-op.
        await page.waitForFunction(
            (b) => {
                const el = Array.from(
                    document.querySelectorAll<HTMLElement>(
                        '[role="textbox"][aria-label$="component value"]',
                    ),
                ).filter((e) => e.offsetParent !== null);
                const text = el[el.length - 1]?.innerText?.trim() ?? "";
                return text !== b;
            },
            baseline,
            { timeout: 200, polling: "raf" },
        );

        const t1 = await page.evaluate(() => performance.now());
        deltas.push(t1 - t0);
    }

    deltas.sort((a, b) => a - b);
    const median = deltas[Math.floor(deltas.length / 2)];

    console.log(
        "[reactivity-instant] spectrum-drag deltas (ms):",
        deltas.map((d) => d.toFixed(2)).join(", "),
    );
    console.log(
        "[reactivity-instant] spectrum-drag median (ms):",
        median.toFixed(2),
    );

    expect(median).toBeLessThanOrEqual(50);
});

test("slider-keyboard → component-readout wall-clock ≤ 50ms median across 3 steps", async ({
    page,
}) => {
    // Second axis: keyboard on a channel slider → the component-readout
    // textbox innerText. The `aria-valuenow` on the slider and the
    // ColorComponentDisplay readout both re-render from the same model;
    // a divergent readout proves the reactivity chain committed.
    await page.goto("/");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

    const slider = page.getByRole("slider", { name: "L channel" });
    await expect(slider).toBeVisible();

    const readout = page
        .getByRole("textbox", { name: /l component value/ })
        .last();
    await expect(readout).toBeVisible();

    const deltas: number[] = [];
    await slider.focus();

    // PageUp / PageDown make a 10× step in reka-ui Slider — large enough
    // that the rounded readout always diverges.
    const keys = ["PageUp", "PageDown", "PageUp"] as const;

    for (const key of keys) {
        const baseline = (await readout.innerText()).trim();
        const t0 = await page.evaluate(() => performance.now());

        await page.keyboard.press(key);

        // Sub-frame in-page poll (rAF-driven) for the readout change.
        await page.waitForFunction(
            (b) => {
                const el = Array.from(
                    document.querySelectorAll<HTMLElement>(
                        '[aria-label="l component value"]',
                    ),
                ).filter((e) => e.offsetParent !== null);
                const text = el[el.length - 1]?.innerText?.trim() ?? "";
                return text !== b;
            },
            baseline,
            { timeout: 200, polling: "raf" },
        );

        const t1 = await page.evaluate(() => performance.now());
        deltas.push(t1 - t0);
    }

    deltas.sort((a, b) => a - b);
    const median = deltas[Math.floor(deltas.length / 2)];

    console.log(
        "[reactivity-instant] slider-keyboard deltas (ms):",
        deltas.map((d) => d.toFixed(2)).join(", "),
    );
    console.log(
        "[reactivity-instant] slider-keyboard median (ms):",
        median.toFixed(2),
    );

    expect(median).toBeLessThanOrEqual(50);
});
