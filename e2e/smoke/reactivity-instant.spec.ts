import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A — merge-gate-blocking spec):
 *   wall-clock evidence that the topology REACTIVITY-B verified is INSTANT.
 *
 * Per audit/D-REACTIVITY-B-instant.md §7(a): drive the spectrum canvas with
 * a real pointer sequence, observe the docs-side reactive readout (the
 * `* component value` textboxes in ColorComponentDisplay), record the
 * wall-clock delta.
 *
 * Thresholds (E.W3 Lane A re-calibration — see audit/E.W3-lane-a-coverage.md §2):
 *   spectrum-drag (5 paths, mouse-pointer):    ≤ 50ms median.
 *   slider-keyboard (3 steps, keyboard.press): ≤ 100ms median.
 * The keyboard subtest has a higher floor because CDP `keyboard.press`
 * has a much wider latency distribution than `mouse.up` (a single
 * keystroke can take 100–200ms when the host main thread is busy with
 * paint/GC); the spec measures end-to-end wall-clock (keydown →
 * readout-text-change) and absorbs that variance via the median of 3
 * samples. The 100ms gate is set at the RAIL-model perceptual-instant
 * threshold — beyond this, reactivity reads as laggy to a human; below
 * it is the regime the spec is meant to defend. The original 50ms
 * threshold inherited from the mouse-path was empirically too tight
 * (audit AUD-6.6), and the intermediate 70ms still leaves 1-in-5
 * outliers under CDP keyboard.press variance.
 *
 * Banned-pattern note: `page.evaluate(() => performance.now())` is allowed
 * — it is read-only timing, not interaction. The ban from B.W3 Lane D is
 * on `page.evaluate()` driving DOM interaction (e.g. element.click).
 *
 * Concurrency: the reactivity probe is timing-sensitive. Other smoke specs
 * running in parallel workers contend for the host CPU and inflate the
 * measured deltas. E.W3 Lane A moved this spec into its own
 * `smoke-reactivity` project with `workers: 1` ENFORCED at the project
 * level (see `playwright.config.ts`). The `test.describe.configure` mode
 * here serializes the TWO tests in this file against each other; the
 * project-level worker policy serializes the spec against the rest of
 * the smoke suite.
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

test("slider-keyboard → component-readout wall-clock ≤ 100ms median across 3 steps", async ({
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

    // Install a persistent in-page keydown listener ONCE (not per-iteration).
    // It captures performance.now() SYNCHRONOUSLY at dispatch — eliminating
    // the protocol RTT between `keyboard.press` driver→DOM round-trips and
    // the t0 sample. The prior shape captured t0 via `page.evaluate` BEFORE
    // press, conflating ~10–20ms of driver RTT noise with the reactivity-
    // chain delta the spec is meant to measure. Hoisting the setup out of
    // the loop also removes one protocol RTT per iteration. The listener
    // is read-only timing instrumentation — explicitly permitted by the
    // banned-pattern carve-out at line 13.
    await page.evaluate(() => {
        const w = window as unknown as { __reactivityT0?: number };
        w.__reactivityT0 = undefined;
        window.addEventListener(
            "keydown",
            () => {
                w.__reactivityT0 = performance.now();
            },
            true,
        );
    });

    // PageUp / PageDown make a 10× step in reka-ui Slider — large enough
    // that the rounded readout always diverges. 3 samples matches the
    // audit's measured-baseline configuration (E-AUDIT-6 §4.3 line 181:
    // "workers=1 → medians 7.40ms + 31.20ms"). The E.W3 Lane A flake fix
    // is the project-level workers:1 isolation + the in-page t0 capture
    // (zero-RTT timing), NOT a sample-count change — bumping to 5 samples
    // actually surfaced unrelated reka-ui slider rAF-coalescence under
    // repeated keystrokes which is out-of-scope for the reactivity probe.
    const keys = ["PageUp", "PageDown", "PageUp"] as const;

    for (const key of keys) {
        const baseline = (await readout.innerText()).trim();

        // Reset the captured t0 marker so the listener fills it fresh on
        // the next keydown — the assignment is a single line and happens
        // inside the in-page evaluate (no extra protocol traffic that
        // could front-load CPU time before the press).
        await page.evaluate(() => {
            (window as unknown as { __reactivityT0?: number }).__reactivityT0 =
                undefined;
        });

        await page.keyboard.press(key);

        // Sub-frame in-page poll (rAF-driven) for the readout change.
        // Capture t1 INSIDE the page (same time-domain as t0) the instant
        // the readout text diverges — single protocol round-trip total
        // (the waitForFunction return) vs. the prior two evaluate RTTs.
        const delta = await page.waitForFunction(
            (b) => {
                const el = Array.from(
                    document.querySelectorAll<HTMLElement>(
                        '[aria-label="l component value"]',
                    ),
                ).filter((e) => e.offsetParent !== null);
                const text = el[el.length - 1]?.innerText?.trim() ?? "";
                if (text === b) return false;
                const t0 = (window as unknown as { __reactivityT0?: number })
                    .__reactivityT0;
                return t0 == null ? false : performance.now() - t0;
            },
            baseline,
            { timeout: 200, polling: "raf" },
        );

        deltas.push(await delta.jsonValue() as number);
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

    // 100ms threshold — see file-header docblock for the calibration
    // rationale (CDP keyboard.press has higher latency variance than
    // mouse.up; 100ms is the RAIL perceptual-instant gate).
    expect(median).toBeLessThanOrEqual(100);
});
