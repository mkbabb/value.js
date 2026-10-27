import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { detectRenderer, isSoftwareGL } from "./perf/frame-budget";
import { REAL_GPU, useRealGpuCell } from "./perf/real-gpu";

/**
 * OD19-V3 (owner docket 2026-10-19) — "the colour change is slow": the picker
 * channel slider's input → paint latency. Budget p50 ≤ 25 ms, p95 ≤ 50 ms.
 *
 * Instrument (the OD19 `latency-load.mjs` probe, made a spec): 41 pointer
 * moves across the first picker `.channel-slider`; each `pointermove` stamps
 * its `timeStamp` and reads the second animation frame after it (the frame
 * that has painted the input). The double-rAF metric cannot read below one
 * refresh interval (≈ 16.7 ms on the 60 Hz headless clock).
 *
 * §0gp.2 / §0fr.2-.3 (the real-GPU cell law): the budget is a frame-production
 * budget, so its gate is the real-GPU cell of record — headless real Chrome,
 * `channel: "chrome"`, ANGLE-Metal (`W12_REAL_GPU=1`, `perf/real-gpu.ts`; the
 * machine law's named need: a GPU/ANGLE-Metal measurement), ×2. On SwiftShader
 * (the `smoke` project's software rasteriser) the 1440 frame is the CPU
 * rastering the scene and its canvases (OD19 repair 3, C3-V-04: 0.3–1.2 ms of
 * consumer script per frame against a ~43 ms rAF cadence), so that leg asserts
 * liveness only and banks the reading as INFORMATIONAL — the form ruled
 * LAWFUL at §0fr.3 (`w12-drag.spec.ts`).
 *
 * The instrument's floor is banked beside every reading (OD19 residue, §0gp):
 * the same double-rAF read over 41 hover moves across the page's inert left
 * gutter (no drag, no colour write). On the real-GPU cell that floor reads
 * p50 29.5–31.1 ms, and a synthetic 12 ms of main-thread work per move LOWERS
 * it to 18.8 ms (`OD19/value/residue/anatomy/floor-spin-r{1,2}.json`): the read is
 * phase-locked to the harness's input acknowledgement, not only to the
 * product's paint. The floor is recorded, never asserted.
 */

useRealGpuCell();

const P50_BUDGET_MS = 25;
const P95_BUDGET_MS = 50;
const OUT = process.env.OD19_OUT ?? "docs/tranches/X/execution/OD19/value/residue";

function arm(): void {
    const S = ((window as unknown as { __v3: unknown }).__v3 = {
        on: false,
        inputs: [] as number[],
        frames: [] as number[],
        loaf: [] as number[],
    });
    addEventListener(
        "pointermove",
        (e) => {
            if (!S.on) return;
            const t = e.timeStamp;
            requestAnimationFrame(() => requestAnimationFrame((f2) => S.inputs.push(f2 - t)));
        },
        { capture: true },
    );
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (S.on) S.loaf.push(Math.round(e.duration));
        }).observe({ type: "long-animation-frame", buffered: false });
    } catch {
        /* LoAF absent: the latency read stands without attribution */
    }
    const tick = (t: number) => {
        if (S.on) S.frames.push(t);
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

const q = (a: number[], p: number) => {
    const s = [...a].sort((x, y) => x - y);
    return +s[Math.min(s.length - 1, Math.floor(p * s.length))]!.toFixed(1);
};

async function drag(page: Page) {
    const handle = page.locator(".channel-slider").first();
    await handle.scrollIntoViewIfNeeded();
    const box = (await handle.boundingBox())!;
    await page.evaluate(() => {
        const S = (window as unknown as { __v3: { on: boolean; inputs: number[]; frames: number[]; loaf: number[] } }).__v3;
        S.inputs = [];
        S.frames = [];
        S.loaf = [];
        S.on = true;
    });
    const y = box.y + box.height / 2;
    await page.mouse.move(box.x + box.width * 0.2, y);
    await page.mouse.down();
    for (let i = 0; i <= 40; i++) await page.mouse.move(box.x + box.width * (0.2 + 0.6 * (i / 40)), y);
    await page.mouse.up();
    await page.waitForTimeout(400);
    return page.evaluate(() => {
        const S = (window as unknown as { __v3: { on: boolean; inputs: number[]; frames: number[]; loaf: number[] } }).__v3;
        S.on = false;
        return { inputs: S.inputs, frames: S.frames, loaf: S.loaf };
    });
}

/** The instrument's floor: the same read over hover moves across the inert left gutter (recorded only). */
async function hoverFloor(page: Page, height: number): Promise<number[]> {
    await page.evaluate(() => {
        const S = (window as unknown as { __v3: { on: boolean; inputs: number[]; frames: number[]; loaf: number[] } }).__v3;
        S.inputs = [];
        S.on = true;
    });
    const y = height - 120;
    await page.mouse.move(2, y);
    for (let i = 0; i <= 40; i++) await page.mouse.move(2 + 8 * (i / 40), y);
    await page.waitForTimeout(400);
    return page.evaluate(() => {
        const S = (window as unknown as { __v3: { on: boolean; inputs: number[] } }).__v3;
        S.on = false;
        return S.inputs.slice();
    });
}

for (const width of [1440, 390]) {
    for (const scheme of ["light", "dark"] as const) {
        test(`OD19-V3 · ${scheme}-${width}: picker channel slider input → paint p50 ≤ ${P50_BUDGET_MS} ms, p95 ≤ ${P95_BUDGET_MS} ms`, async ({
            page,
        }) => {
            test.setTimeout(180_000);
            await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
            await page.emulateMedia({ colorScheme: scheme });
            await page.addInitScript((th) => {
                try {
                    localStorage.setItem("vueuse-color-scheme", th);
                } catch {
                    /* storage blocked: the media query carries the scheme */
                }
            }, scheme);
            await page.addInitScript(arm);
            await page.goto("/#/");
            await page.locator(".channel-slider").first().waitFor({ timeout: 120_000 });
            await page.waitForTimeout(3000);

            const renderer = await detectRenderer(page);
            const soft = isSoftwareGL(renderer);
            const floor = await hoverFloor(page, width === 390 ? 844 : 900);
            const r = await drag(page);
            const dts = r.frames.slice(1).map((f, i) => f - r.frames[i]!);
            const record = {
                cell: `${scheme}-${width}`,
                renderer,
                realGpu: REAL_GPU,
                n: r.inputs.length,
                p50: r.inputs.length ? q(r.inputs, 0.5) : null,
                p95: r.inputs.length ? q(r.inputs, 0.95) : null,
                max: r.inputs.length ? +Math.max(...r.inputs).toFixed(1) : null,
                rafP50: dts.length ? q(dts, 0.5) : null,
                floorP50: floor.length ? q(floor, 0.5) : null,
                floorP95: floor.length ? q(floor, 0.95) : null,
                loafN: r.loaf.length,
                loafMax: Math.max(0, ...r.loaf),
                at: new Date().toISOString(),
            };
            mkdirSync(OUT, { recursive: true });
            writeFileSync(
                `${OUT}/v3-${process.env.OD19_PHASE ?? "run"}-${scheme}-${width}-${Date.now()}.json`,
                JSON.stringify(record, null, 2),
            );
            console.log(`[od19-v3] ${JSON.stringify(record)}`);

            // Liveness, every renderer: the drag was painted, input by input.
            expect(r.inputs.length, `${scheme}-${width}: inputs painted`).toBeGreaterThan(10);
            if (soft) return; // INFORMATIONAL on a software rasteriser (§0gp.2): banked above.
            expect(record.p50!, `${scheme}-${width}: input → paint p50 (ms)`).toBeLessThanOrEqual(P50_BUDGET_MS);
            expect(record.p95!, `${scheme}-${width}: input → paint p95 (ms)`).toBeLessThanOrEqual(P95_BUDGET_MS);
        });
    }
}
