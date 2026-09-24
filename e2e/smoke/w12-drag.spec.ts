import { test, expect, type Page, type CDPSession } from "@playwright/test";
import {
    detectRenderer,
    isSoftwareGL,
    installFrameCollector,
    resetFrames,
    readFrames,
    readLongTasks,
    percentile,
} from "./perf/frame-budget";

/**
 * X.W12.a · OA-4 / OA-19 — "the colour selection and dragging is slow".
 *
 * A 2 s pointer drag on the picker surface and on each channel slider, read by
 * the rAF frame collector (frame intervals, long tasks) and a CDP sampling
 * profile (the per-input work, named by self time). The gate is p95 frame
 * ≤ 16.7 ms on the headed real-GPU cell (§0ax D1's instrument:
 * `W12_REAL_GPU=1 … --headed`); the SwiftShader reading is banked beside and
 * held only to the freeze ceiling, because software raster is not the eye's
 * frame (the standing `drag-frame-budget` precedent).
 */

const REAL_GPU = process.env.W12_REAL_GPU === "1";
const ORIGIN = process.env.W12_ORIGIN;
const P95_BUDGET_MS = 16.7;
const SOFT_MAX_TASK_MS = 3000;
const DRAG_MS = 2000;

/**
 * X-W12 Repair 1 (H-1): the display the window paints on sets the rAF clock.
 * On a 60 Hz panel a BLANK page reads rAF p95 17.6 ms (vsync timestamps land
 * at 16.7-17.7 ms), so the 16.7 ms budget sits below the instrument's floor
 * there; on the 120 Hz panel a blank page reads p95 9.2 ms, and 16.7 ms is
 * the "never two refreshes late" budget the gate means. `W12_WINDOW_POSITION`
 * ("x,y") places the headed window on the named panel; the record names it.
 */
const WINDOW_POSITION = process.env.W12_WINDOW_POSITION;

if (REAL_GPU)
    test.use({
        launchOptions: { args: WINDOW_POSITION ? [`--window-position=${WINDOW_POSITION}`] : [] },
        headless: false,
    });
test.use({ viewport: { width: 1440, height: 900 } });

type Target = { name: string; locate: (p: Page) => ReturnType<Page["locator"]>; axis: "xy" | "x" };
const TARGETS: Target[] = [
    { name: "surface", locate: (p) => p.locator(".spectrum-picker").first(), axis: "xy" },
    ...["L", "a", "b", "alpha"].map((c) => ({
        name: `slider ${c}`,
        locate: (p: Page) => p.getByRole("slider", { name: `${c} channel` }).first(),
        axis: "x" as const,
    })),
];

async function topSelf(cdp: CDPSession): Promise<string> {
    const { profile } = await cdp.send("Profiler.stop");
    const dt = profile.timeDeltas ?? [];
    const self = new Map<number, number>();
    (profile.samples ?? []).forEach((id, i) => self.set(id, (self.get(id) ?? 0) + (dt[i] ?? 0)));
    const byName = new Map<string, number>();
    for (const n of profile.nodes) {
        const cf = n.callFrame;
        if (["(idle)", "(program)", "(root)"].includes(cf.functionName)) continue;
        const file = cf.url.split("/").pop()?.split("?")[0] ?? "";
        const k = `${cf.functionName || "(anon)"}@${file}:${cf.lineNumber + 1}`;
        byName.set(k, (byName.get(k) ?? 0) + (self.get(n.id) ?? 0));
    }
    return [...byName.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([k, us]) => `${k}=${(us / 1000).toFixed(0)}ms`)
        .join(" · ");
}

test("w12-drag — 2 s drag on the surface and each slider holds frame budget", async ({ page }) => {
    test.setTimeout(120_000);
    await installFrameCollector(page);
    await page.addInitScript(() => localStorage.setItem("vueuse-color-scheme", "dark"));
    await page.goto((ORIGIN ?? "/") + "#/?space=lab");
    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Profiler.enable");
    await cdp.send("Profiler.setSamplingInterval", { interval: 200 });
    await page.waitForTimeout(3000); // boot overture settles before measuring

    const results: Array<{ name: string; p95: number; p50: number; frames: number; maxTask: number }> = [];
    for (const t of TARGETS) {
        const target = t.locate(page);
        await expect(target).toBeVisible();
        const b = await target.boundingBox();
        if (!b) throw new Error(`w12-drag: ${t.name} not laid out`);
        const y0 = b.y + (t.axis === "xy" ? b.height * 0.15 : b.height / 2);
        const y1 = b.y + (t.axis === "xy" ? b.height * 0.85 : b.height / 2);
        const x0 = b.x + b.width * 0.08;
        const x1 = b.x + b.width * 0.92;
        await page.mouse.move(x0, y0);
        await page.mouse.down();
        await resetFrames(page);
        await cdp.send("Profiler.start");
        const start = Date.now();
        let i = 0;
        while (Date.now() - start < DRAG_MS) {
            const u = ((Date.now() - start) / DRAG_MS) * 2; // there and back
            const f = u <= 1 ? u : 2 - u;
            await page.mouse.move(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f);
            i++;
        }
        const frames = (await readFrames(page)).slice(1); // drop the reset partial
        const longtasks = await readLongTasks(page);
        const hot = await topSelf(cdp);
        await page.mouse.up();
        const p95 = percentile(frames, 95);
        const p50 = percentile(frames, 50);
        const maxTask = longtasks.length ? Math.max(...longtasks) : 0;
        results.push({ name: t.name, p95, p50, frames: frames.length, maxTask });
        console.log(
            `[w12-drag ${soft ? "SOFTWARE-GL" : "REAL-GPU"}] ${t.name}: moves=${i} frames=${frames.length} p50=${p50.toFixed(1)} p95=${p95.toFixed(1)} longTasks=${longtasks.length} maxTask=${maxTask.toFixed(0)}\n    hot: ${hot}`,
        );
        await page.waitForTimeout(400);
    }
    console.log(`[w12-drag] renderer=${renderer} origin=${ORIGIN ?? "dev"}`);
    for (const r of results) {
        expect(r.frames, `${r.name}: collector dead`).toBeGreaterThan(10);
        if (soft) {
            expect(r.maxTask, `${r.name}: in-drag freeze`).toBeLessThanOrEqual(SOFT_MAX_TASK_MS);
        } else {
            expect(r.p95, `${r.name}: drag frame p95 over ${P95_BUDGET_MS} ms`).toBeLessThanOrEqual(
                P95_BUDGET_MS,
            );
        }
    }
});
