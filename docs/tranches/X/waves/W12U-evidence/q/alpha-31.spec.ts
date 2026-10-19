// SERVED MODEL: claude-opus-5-5
// X.W12U.q — the `.t` r2 alpha leg, re-read by COHESION §0ev.1's protocol:
// >= 31 drags of the alpha slider (more, in blocks of 10 up to 101, while the
// bootstrap bound straddles the budget), each read in refresh intervals of the
// page's own measured clock T (W12U.md addendum (e); `refreshBudget`).
//
// The drag is `e2e/smoke/w12u-p-drag.spec.ts`'s alpha leg, restated without
// edits to that spec: same boot (T on the blank document, the frame collector,
// dark scheme, `#/?space=lab`, 3 s settle), same 2000 ms there-and-back pointer
// path over 8 % -> 92 % of the slider, the same CDP profiler (200 us) and
// timeline trace running through every drag (so the cost this reads includes
// the committed spec's own instruments), 400 ms rest between drags. The one
// difference: the committed spec drags surface, L, a, b before alpha once;
// this drags alpha N times.
import { test, expect } from "@playwright/test";
import { loadavg } from "node:os";
import { writeFileSync } from "node:fs";
import {
    detectRenderer,
    isSoftwareGL,
    installFrameCollector,
    resetFrames,
    readFrames,
    readLongTasks,
    percentile,
    measureRefreshInterval,
    refreshBudget,
} from "../../../../../../e2e/smoke/perf/frame-budget";

const DRAG_MS = 2000;
const MIN_ROUNDS = 31;
const MAX_ROUNDS = 101;
const BLOCK = 10;
const BOOT = 10_000;
const OUT = process.env.Q_ALPHA_OUT ?? "alpha.json";

/** mulberry32 — a seeded generator, so the bootstrap is reproducible from the committed rows. */
function rng(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
function median(v: number[]): number {
    const s = [...v].sort((x, y) => x - y);
    const m = s.length >> 1;
    return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}
/** Percentile bootstrap of the median: the 95th (one-sided) and 97.5th (two-sided 95 % CI upper end) percentiles. */
function bootstrapMedian(v: number[], seed: number): { u95: number; u975: number; l025: number } {
    const r = rng(seed);
    const meds: number[] = [];
    for (let b = 0; b < BOOT; b++) {
        const s: number[] = [];
        for (let i = 0; i < v.length; i++) s.push(v[Math.floor(r() * v.length)]!);
        meds.push(median(s));
    }
    meds.sort((x, y) => x - y);
    const q = (p: number) => meds[Math.min(BOOT - 1, Math.floor(p * BOOT))]!;
    return { u95: q(0.95), u975: q(0.975), l025: q(0.025) };
}

test("alpha-31 — the alpha drag, >= 31 rounds, median and bootstrap bound in refresh intervals", async ({ page }) => {
    const load0 = loadavg()[0]!;
    const t0 = new Date().toISOString();
    const T = await measureRefreshInterval(page);
    const budget = refreshBudget(T);
    await installFrameCollector(page);
    await page.addInitScript(() => localStorage.setItem("vueuse-color-scheme", "dark"));
    await page.goto("/#/?space=lab", { timeout: 120_000 });
    const renderer = await detectRenderer(page);
    expect(isSoftwareGL(renderer), `software renderer: '${renderer}'`).toBe(false);
    expect(renderer).toMatch(/Apple.*Metal|Metal.*Apple/);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Profiler.enable");
    await cdp.send("Profiler.setSamplingInterval", { interval: 200 });
    await page.waitForTimeout(3000);
    const target = page.getByRole("slider", { name: "alpha channel" }).first();
    await expect(target).toBeVisible({ timeout: 60_000 });

    type Row = { i: number; moves: number; frames: number; p50: number; p95: number; longTasks: number; maxTask: number; load1: number };
    const rows: Row[] = [];
    const verdict = () => {
        const p95 = rows.map((r) => r.p95);
        const p50 = rows.map((r) => r.p50);
        return {
            n: rows.length,
            p95: { median: median(p95), ...bootstrapMedian(p95, 0x51ab + rows.length) },
            p50: { median: median(p50), ...bootstrapMedian(p50, 0x9e37 + rows.length) },
        };
    };
    while (rows.length < MAX_ROUNDS) {
        const b = await target.boundingBox();
        if (!b) throw new Error("alpha slider not laid out");
        const y = b.y + b.height / 2;
        const x0 = b.x + b.width * 0.08;
        const x1 = b.x + b.width * 0.92;
        await page.mouse.move(x0, y);
        await page.mouse.down();
        await resetFrames(page);
        await cdp.send("Profiler.start");
        const done = new Promise<void>((r) => cdp.once("Tracing.tracingComplete", () => r()));
        await cdp.send("Tracing.start", {
            categories: "devtools.timeline,disabled-by-default-devtools.timeline",
            transferMode: "ReportEvents",
        });
        const start = Date.now();
        let moves = 0;
        while (Date.now() - start < DRAG_MS) {
            const u = ((Date.now() - start) / DRAG_MS) * 2;
            const f = u <= 1 ? u : 2 - u;
            await page.mouse.move(x0 + (x1 - x0) * f, y);
            moves++;
        }
        const frames = (await readFrames(page)).slice(1);
        const longtasks = await readLongTasks(page);
        await cdp.send("Profiler.stop");
        await cdp.send("Tracing.end");
        await done;
        await page.mouse.up();
        const row: Row = {
            i: rows.length + 1,
            moves,
            frames: frames.length,
            p50: percentile(frames, 50),
            p95: percentile(frames, 95),
            longTasks: longtasks.length,
            maxTask: longtasks.length ? Math.max(...longtasks) : 0,
            load1: loadavg()[0]!,
        };
        rows.push(row);
        console.log(`[alpha-31] ${row.i}: moves=${row.moves} frames=${row.frames} p50=${row.p50.toFixed(1)} p95=${row.p95.toFixed(1)} longTasks=${row.longTasks} maxTask=${row.maxTask.toFixed(0)} load1=${row.load1.toFixed(0)}`);
        await page.waitForTimeout(400);
        if (rows.length >= MIN_ROUNDS && (rows.length - MIN_ROUNDS) % BLOCK === 0) {
            const cur = verdict();
            const straddle = cur.p95.median <= budget.p95Ms && cur.p95.u975 > budget.p95Ms;
            const straddle50 = cur.p50.median <= budget.p50Ms && cur.p50.u975 > budget.p50Ms;
            if (!straddle && !straddle50) break;
        }
    }
    const fin = verdict();
    const green =
        fin.p95.median <= budget.p95Ms && fin.p95.u975 <= budget.p95Ms &&
        fin.p50.median <= budget.p50Ms && fin.p50.u975 <= budget.p50Ms;
    const out = {
        started: t0,
        ended: new Date().toISOString(),
        load1Start: load0,
        load1End: loadavg()[0]!,
        renderer,
        T,
        budget,
        rounds: rows.length,
        intervals: {
            p95Median: fin.p95.median / T, p95U95: fin.p95.u95 / T, p95U975: fin.p95.u975 / T,
            p50Median: fin.p50.median / T, p50U95: fin.p50.u95 / T, p50U975: fin.p50.u975 / T,
        },
        ms: fin,
        over: { p95: rows.filter((r) => r.p95 > budget.p95Ms).length, p50: rows.filter((r) => r.p50 > budget.p50Ms).length },
        verdict: green ? "GREEN" : "RED",
        rows,
    };
    writeFileSync(OUT, JSON.stringify(out, null, 1));
    console.log(`[alpha-31] renderer=${renderer} T=${T.toFixed(2)} budget p50<=${budget.p50Ms.toFixed(2)} p95<=${budget.p95Ms.toFixed(2)} rounds=${rows.length} load1 ${load0.toFixed(0)}->${out.load1End.toFixed(0)}`);
    console.log(`[alpha-31] p95 median=${fin.p95.median.toFixed(2)} u95=${fin.p95.u95.toFixed(2)} u97.5=${fin.p95.u975.toFixed(2)} | p50 median=${fin.p50.median.toFixed(2)} u95=${fin.p50.u95.toFixed(2)} u97.5=${fin.p50.u975.toFixed(2)} | over p95 ${out.over.p95}/${rows.length} p50 ${out.over.p50}/${rows.length} | ${out.verdict}`);
    expect(out.verdict, "median or its 95 % bootstrap bound over the refresh-relative budget").toBe("GREEN");
});
