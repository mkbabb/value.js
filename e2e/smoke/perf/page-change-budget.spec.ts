/**
 * The FORTIETH order, B ("page changes ... are slow"): the one gate for the
 * page-change work, on the built bundle.
 *
 * The tour: twenty changes through every view, Back and Forward included, run
 * twice (the second run is all revisits). Per change the in-page rAF log gives
 * the first frame after the change and the longest frame in its window
 * (5 s on the phone, 3 s on the desk); the forced style and layout inside
 * scripts is read from the long-animation-frame entries
 * (`forcedStyleAndLayoutDuration`).
 *
 * | | production | gate |
 * |---|---|---|
 * | phone 4x, change to first frame | 290-1,623 ms | 100 ms or less on every change |
 * | phone 4x, longest frame on a revisit | median 583, worst 1,623 | median 200 or less, worst 500 or less |
 * | desk, longest frame | median 82, worst 208 | median 33 or less, worst 100 or less |
 * | forced layout inside scripts, 40 phone changes | 9,933 ms | 2,000 ms or less |
 *
 * THE LANE. The gate is asserted on the GPU lane (`C40_GPU=1`: the default
 * headless shell on ANGLE Metal, renderer checked to be hardware). On the
 * standing software-GL lane the frame numbers measure SwiftShader's raster,
 * not the page (`frame-budget.ts`): there every reading is logged and only the
 * freeze ceilings and the forced-layout total (a main-thread number, raster
 * aside) are asserted. Every frame over the law (33.4 ms phone, 16.7 ms desk)
 * is annotated with its change and offset.
 */
import { test, expect, type Browser } from "@playwright/test";
import { SOFT_CEIL, detectRenderer, isSoftwareGL, percentile } from "./frame-budget";

const GPU = process.env.C40_GPU === "1";
if (GPU) test.use({ launchOptions: { args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] } });

const STEPS = [
    "#/palettes", "#/", "#/palettes", "#/browse", "#/extract", "#/mix", "#/generate",
    "#/gradient", "#/atmosphere", "#/blob", "#/", "#/gradient", "#/palettes",
    "back", "back", "forward", "#/extract", "#/", "#/atmosphere", "#/palettes",
] as const;

interface Change {
    loop: number;
    to: string;
    first: number;
    longest: number;
    over: { at: number; d: number }[];
    forced: number;
}

const RECORDER = () => {
    const w = window as unknown as { __frames: number[]; __forced: { t: number; d: number }[] };
    w.__frames = [];
    w.__forced = [];
    const loop = (t: number) => {
        w.__frames.push(t);
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    try {
        new PerformanceObserver((list) => {
            for (const e of list.getEntries() as (PerformanceEntry & { scripts?: { forcedStyleAndLayoutDuration: number }[] })[])
                for (const s of e.scripts ?? []) if (s.forcedStyleAndLayoutDuration > 0) w.__forced.push({ t: e.startTime, d: s.forcedStyleAndLayoutDuration });
        }).observe({ type: "long-animation-frame", buffered: true });
    } catch {
        /* no LoAF: the forced total reads 0 and the spec says so */
    }
};

async function tour(browser: Browser, phone: boolean) {
    const ctx = await browser.newContext(
        phone
            ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }
            : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
    );
    const law = phone ? 33.4 : 16.7;
    const win = phone ? 5_000 : 3_000;
    const changes: Change[] = [];
    let renderer = "";
    try {
        await ctx.addInitScript(RECORDER);
        const page = await ctx.newPage();
        const cdp = await ctx.newCDPSession(page);
        await page.goto("/", { waitUntil: "load", timeout: 60_000 });
        renderer = await detectRenderer(page);
        if (GPU) expect(isSoftwareGL(renderer), `the GPU lane landed on '${renderer}'`).toBe(false);
        if (phone) await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
        await page.waitForTimeout(phone ? 10_000 : 6_000);
        for (let loop = 0; loop < 2; loop++) {
            for (const to of STEPS) {
                const t0 = await page.evaluate((to) => {
                    const t = performance.now();
                    if (to === "back") history.back();
                    else if (to === "forward") history.forward();
                    else location.hash = to;
                    return t;
                }, to);
                await page.waitForTimeout(win);
                const read = await page.evaluate(
                    ({ t0, win }) => {
                        const w = window as unknown as { __frames: number[]; __forced: { t: number; d: number }[] };
                        return {
                            frames: w.__frames.filter((t) => t >= t0 && t <= t0 + win),
                            forced: w.__forced.filter((f) => f.t >= t0 - 5 && f.t <= t0 + win).reduce((a, f) => a + f.d, 0),
                        };
                    },
                    { t0, win },
                );
                const f = read.frames;
                const gaps = f.slice(1).map((t, i) => ({ at: Math.round(f[i]! - t0), d: +(t - f[i]!).toFixed(1) }));
                changes.push({
                    loop,
                    to,
                    first: f.length ? +(f[0]! - t0).toFixed(1) : win,
                    longest: gaps.length ? Math.max(...gaps.map((g) => g.d)) : win,
                    over: gaps.filter((g) => g.d > law),
                    forced: Math.round(read.forced),
                });
            }
        }
    } finally {
        await ctx.close();
    }
    return { changes, renderer };
}

function annotate(label: string, renderer: string, changes: Change[]) {
    test.info().annotations.push({ type: `${label} renderer`, description: renderer });
    for (const c of changes)
        test.info().annotations.push({
            type: `${label} L${c.loop} → ${c.to}`,
            description: `first ${c.first} · longest ${c.longest} · forced ${c.forced} · over the law: ${c.over.map((o) => `${o.d}@${o.at}`).join(" ") || "none"}`,
        });
}

const median = (v: number[]) => percentile(v, 50);

test.describe("c40 · the page-change gate (FORTIETH B)", () => {
    test("phone 4x: answered within 100 ms, revisits short, forced layout bounded", async ({ browser }) => {
        test.setTimeout(420_000);
        const { changes, renderer } = await tour(browser, true);
        annotate("phone", renderer, changes);
        const revisits = changes.filter((c) => c.loop === 1).map((c) => c.longest);
        const forced = changes.reduce((a, c) => a + c.forced, 0);
        test.info().annotations.push({
            type: "phone summary",
            description: `first max ${Math.max(...changes.map((c) => c.first))} · revisit longest median ${median(revisits)} worst ${Math.max(...revisits)} · forced total ${forced}`,
        });
        expect(forced, "forced style and layout inside scripts over the 40 changes (ms)").toBeLessThanOrEqual(2_000);
        if (GPU) {
            const late = changes.filter((c) => c.first > 100).map((c) => `L${c.loop} ${c.to}: ${c.first}`);
            expect(late, "changes whose first frame came after 100 ms").toEqual([]);
            expect(median(revisits), "revisit longest frame, median").toBeLessThanOrEqual(200);
            expect(Math.max(...revisits), "revisit longest frame, worst").toBeLessThanOrEqual(500);
        } else {
            expect(Math.max(...changes.map((c) => c.first)), "software lane: a change froze the first frame").toBeLessThanOrEqual(SOFT_CEIL.viewSwitchFirstFrameMs);
            expect(Math.max(...changes.map((c) => c.longest)), "software lane: a change froze a frame").toBeLessThanOrEqual(SOFT_CEIL.viewSwitchMaxTaskMs);
        }
    });

    test("desk: the longest frame of a change, median 33 ms or less, worst 100 or less", async ({ browser }) => {
        test.setTimeout(300_000);
        const { changes, renderer } = await tour(browser, false);
        annotate("desk", renderer, changes);
        const longest = changes.map((c) => c.longest);
        test.info().annotations.push({ type: "desk summary", description: `longest median ${median(longest)} worst ${Math.max(...longest)}` });
        if (GPU) {
            expect(median(longest), "desk longest frame, median").toBeLessThanOrEqual(33);
            expect(Math.max(...longest), "desk longest frame, worst").toBeLessThanOrEqual(100);
        } else {
            expect(Math.max(...longest), "software lane: a change froze a frame").toBeLessThanOrEqual(SOFT_CEIL.viewSwitchMaxTaskMs);
        }
    });
});
