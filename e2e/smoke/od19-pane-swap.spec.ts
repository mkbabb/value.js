import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { detectRenderer, isSoftwareGL } from "./perf/frame-budget";
import { REAL_GPU, useRealGpuCell } from "./perf/real-gpu";

/**
 * OD19-V5 / OD19-V7 / OD19-ALL (owner docket 2026-10-19, packet P3) — the
 * complex routes load slowly, and the card/pane swap is janky and slow.
 *
 * BEFORE (docs/tranches/X/execution/OD19/value.md, `value/before/`):
 *   · V5 — no intent prefetch: a lazy pane's chunk was requested only at swap
 *     commit, and nothing warmed the lazy panes after first paint, so the
 *     first in-app visit to /gradient or /mix paid the whole chunk fan-out;
 *   · V7 — Home → Mix: the inspector left to x1548 (`translateX(110%)
 *     rotate(2deg)`), THEN the incoming pane travelled back in. Moving window
 *     305 → 1161 ms at 1440, worst frame 214 ms.
 *
 * The witness drives an IN-APP hop (hash navigation, the router's own path)
 * after the page has gone idle, and samples every animation frame from the
 * input: the two region roots' boxes and opacity, and the route's `main h1`.
 *   · title  — input → the frame the destination's title is in the DOM;
 *   · window — the first → the last frame in which a region root moved
 *              (≥ 1 px or ≥ 0.02 opacity): the swap's moving window;
 *   · frame  — the longest frame inside [input, last move].
 * Budgets (P3 falsifier): title ≤ 400 ms, window ≤ 450 ms; at 390 no swap
 * frame > 50 ms is RECORDED (software GL frame times are host-bound; the
 * built-bundle long-task gate is `perf/view-switch-frame-budget.spec.ts`).
 *
 * §0gp.2 / §0fr.2-.3 (the real-GPU cell law): the title and window budgets are
 * frame-production budgets, so their gate is the real-GPU cell of record —
 * headless real Chrome, `channel: "chrome"`, ANGLE-Metal (`W12_REAL_GPU=1`,
 * `perf/real-gpu.ts`; the machine law's named need: a GPU/ANGLE-Metal
 * measurement), ×2. On SwiftShader (the `smoke` project's software rasteriser)
 * the incoming pane's mount/draw is the CPU rastering the scene (OD19 C1-V-05,
 * C3-V-05: `ltMax 0`, the long frames are not script), so that leg asserts
 * liveness only — the title paints and the swap moves — and banks the reading
 * as INFORMATIONAL: the form ruled LAWFUL at §0fr.3 (`w12-drag.spec.ts`).
 */

useRealGpuCell();

const TITLE_BUDGET_MS = 400;
const WINDOW_BUDGET_MS = 450;
const OUT = process.env.OD19_OUT ?? "docs/tranches/X/execution/OD19/value/after/P3";

interface Hop {
    title: number | null;
    firstMove: number | null;
    lastMove: number | null;
    window: number | null;
    maxFrame: number;
    frames: number;
    loaf: [number, number, string[]][];
    movedBy: [number, unknown][];
}

async function hop(page: Page, hash: string, label: string): Promise<Hop> {
    return page.evaluate(
        async ({ hash, label }) => {
            const SELS = [".pane-wrapper--stage > *", ".pane-wrapper--inspector > *"];
            type Box = [number, number, number];
            const read = (): Box[] =>
                SELS.flatMap((s) =>
                    [...document.querySelectorAll(s)].map((el): Box => {
                        const r = el.getBoundingClientRect();
                        return [r.x, r.y, Number(getComputedStyle(el).opacity)];
                    }),
                );
            const moved = (a: Box[], b: Box[]) =>
                a.length !== b.length ||
                a.some((p, i) => {
                    const q = b[i]!;
                    return (
                        Math.abs(p[0] - q[0]) >= 1 ||
                        Math.abs(p[1] - q[1]) >= 1 ||
                        Math.abs(p[2] - q[2]) >= 0.02
                    );
                });
            const frame = () => new Promise<number>((r) => requestAnimationFrame(r));
            const loaf: [number, number, string[]][] = [];
            const po = new PerformanceObserver((list) => {
                for (const e of list.getEntries() as (PerformanceEntry & {
                    renderStart?: number;
                    styleAndLayoutStart?: number;
                    scripts?: { invoker?: string; sourceURL?: string; duration: number }[];
                })[])
                    loaf.push([
                        Math.round(e.startTime - t0),
                        Math.round(e.duration),
                        [
                            `render@${Math.round((e.renderStart ?? 0) - e.startTime)}`,
                            `style+layout@${Math.round((e.styleAndLayoutStart ?? 0) - e.startTime)}`,
                        ].concat([...(e.scripts ?? [])] // LoAF `scripts` is a frozen array: sort a copy
                            .sort((a, b) => b.duration - a.duration)
                            .slice(0, 3)
                            .map((x) => `${x.invoker}|${(x.sourceURL ?? "").split("/").slice(-2).join("/").split("?")[0]}|${Math.round(x.duration)}`)),
                    ]);
            });
            po.observe({ type: "long-animation-frame", buffered: true });
            const t0 = performance.now();
            location.hash = hash;
            let prev = read();
            let title: number | null = null;
            let firstMove: number | null = null;
            let lastMove: number | null = null;
            let last = t0;
            const deltas: [number, number][] = [];
            const movedBy: [number, unknown][] = [];
            while (performance.now() - t0 < 6000) {
                const ts = await frame();
                const t = ts - t0;
                deltas.push([t, ts - last]);
                last = ts;
                if (
                    title === null &&
                    [...document.querySelectorAll("main h1")].some((h) => h.textContent?.trim() === label)
                )
                    title = Math.max(0, t);
                const now = read();
                if (moved(prev, now)) {
                    movedBy.push([Math.round(t), now.map((b, i) => (prev[i] ? [Math.round(b[0] - prev[i]![0]), Math.round(b[1] - prev[i]![1]), +(b[2] - prev[i]![2]).toFixed(2)] : null))]);
                    firstMove ??= Math.max(0, t);
                    lastMove = Math.max(0, t);
                    prev = now;
                }
                if (title !== null && lastMove !== null && t - lastMove > 700) break;
            }
            po.disconnect();
            const end = lastMove ?? 0;
            const inSwap = deltas.filter(([t]) => t <= end + 1);
            return {
                title: title === null ? null : Math.round(title),
                firstMove: firstMove === null ? null : Math.round(firstMove),
                lastMove: lastMove === null ? null : Math.round(lastMove),
                window:
                    firstMove === null || lastMove === null ? null : Math.round(lastMove - firstMove),
                maxFrame: Math.round(Math.max(0, ...inSwap.map(([, d]) => d))),
                frames: inSwap.length,
                loaf: loaf.filter(([t, d]) => t + d >= 0 && t <= end + 1).slice(0, 6),
                movedBy: movedBy.slice(0, 12),
            };
        },
        { hash, label },
    );
}

for (const width of [1440, 390]) {
    test(`OD19 P3 · ${width}: first in-app visit to Gradient and Mix — title ≤ ${TITLE_BUDGET_MS} ms, moving window ≤ ${WINDOW_BUDGET_MS} ms`, async ({
        page,
    }) => {
        test.setTimeout(240_000);
        await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
        const requested: string[] = [];
        page.on("request", (r) => requested.push(r.url()));
        await page.goto("/#/");
        await expect(page.getByRole("main")).toBeVisible();
        // The page goes idle: whatever the app warms after first paint, it
        // warms here; a cold chunk the app never warmed is still cold.
        // A cold dev server transforms each lazy pane's graph on first request,
        // so "idle" is read from the page's own requests (the resource-timing
        // buffer overflows on a dev load): the two destination panes requested,
        // or 90 s pass, which is the BEFORE arm — nothing warms them; then the
        // network quiet.
        const deadline = Date.now() + 90_000;
        while (
            ![/\/GradientPane[.-]/, /\/MixPane[.-]/].every((p) => requested.some((u) => p.test(u))) &&
            Date.now() < deadline
        )
            await page.waitForTimeout(500);
        const warmed = Date.now() < deadline;
        await page.waitForLoadState("networkidle", { timeout: 60_000 });
        await page.waitForTimeout(1500);

        const before = requested.length;
        const gradient = await hop(page, "#/gradient", "Gradient");
        const coldDuringGradient = requested
            .slice(before)
            .map((u) => u.replace(/^https?:\/\/[^/]+/, "").slice(-80))
            .slice(0, 20);
        await page.waitForTimeout(800);
        const home = await hop(page, "#/", "Home");
        await page.waitForTimeout(800);
        const mix = await hop(page, "#/mix", "Mix");

        const renderer = await detectRenderer(page);
        const soft = isSoftwareGL(renderer);
        const record = { width, renderer, realGpu: REAL_GPU, warmed, coldDuringGradient, gradient, home, mix, at: new Date().toISOString() };
        mkdirSync(OUT, { recursive: true });
        writeFileSync(`${OUT}/pane-swap-${process.env.OD19_PHASE ?? "run"}-${width}-${Date.now()}.json`, JSON.stringify(record, null, 2));
        console.log(`[od19-p3] ${JSON.stringify(record)}`);

        for (const [name, h] of [
            ["gradient", gradient],
            ["mix", mix],
        ] as const) {
            // Liveness, every renderer: the title paints and the swap moves.
            expect(h.title, `${width} ${name}: title paints`).not.toBeNull();
            expect(h.window, `${width} ${name}: the swap moves`).not.toBeNull();
            if (soft) continue; // INFORMATIONAL on a software rasteriser (§0gp.2): banked above.
            expect(h.title!, `${width} ${name}: input → title (ms)`).toBeLessThanOrEqual(TITLE_BUDGET_MS);
            expect(h.window!, `${width} ${name}: moving window (ms)`).toBeLessThanOrEqual(WINDOW_BUDGET_MS);
        }
    });
}
