import { test, expect, type Page, type CDPSession } from "@playwright/test";
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
} from "./perf/frame-budget";
import { REAL_GPU, useRealGpuCell } from "./perf/real-gpu";

/**
 * X.W12U.p — the drag frame budget, re-profiled on glass 10.1.0
 * (W12U.md addendum (b) `.p` + addendum (c) I-59; W12.md addendum (f)).
 *
 * Falsifier for three readings on the real-GPU cell (`W12_REAL_GPU=1`; read
 * headed on the 120 Hz panel until §0ei, in the background on Metal since,
 * whose rAF clock is 60 Hz — `perf/real-gpu.ts`):
 *   1. drag p50 ≤ 1·T and p95 ≤ 2·T (+ ε) of the measured display clock T on
 *      the colour-changing drags (surface, L, a, b, alpha) — X.W12U.t,
 *      addendum (e) §0en: the 120 Hz figure of record (16.7 ms = 2 intervals)
 *      stated in refresh intervals (`refreshBudget`, perf/frame-budget);
 *   2. the dock run's roving MutationObserver (glass `useDockRun`, which calls
 *      `syncRoving` on childList-subtree / `aria-current` mutations) is not fed
 *      every frame by a dock seat's text re-render during the drag;
 *   3. the attribution of what is left: top self time, the callers of every
 *      forced layout (`getBoundingClientRect`), and the consumer (`/demo/`)
 *      frames by inclusive time — the O-80 addendum's evidence if (1) is RED.
 * Off the real GPU the p95 gate is not asserted (software raster is not the
 * eye's frame — the `w12-drag` precedent); (2) holds on every renderer.
 */

const ORIGIN = process.env.W12_ORIGIN;
/**
 * The consumer bisect (W12.md addendum (f); W12U.md addendum (b) gate 2):
 * `W12U_P_BISECT=root` freezes every custom-property write on `<html>` after
 * boot, so the reading is the frame WITHOUT the consumer's root recolour — the
 * residual the drag pays to everything else. A measuring instrument only; the
 * product path never reads it.
 */
const BISECT = process.env.W12U_P_BISECT;
const DRAG_MS = 2000;
/** syncRoving may fire on a real structural change; never on most frames. */
const ROVING_MAX_FRACTION = 0.1;

useRealGpuCell();
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

type ProfileNode = {
    id: number;
    callFrame: { functionName: string; url: string; lineNumber: number };
    children?: number[];
};

function key(n: ProfileNode): string {
    const cf = n.callFrame;
    const file = cf.url.split("/").pop()?.split("?")[0] ?? "";
    return `${cf.functionName || "(anon)"}@${file}:${cf.lineNumber + 1}`;
}

async function attribute(cdp: CDPSession): Promise<{ self: string; layout: string; demo: string }> {
    const { profile } = await cdp.send("Profiler.stop");
    const nodes = profile.nodes as ProfileNode[];
    const dt = profile.timeDeltas ?? [];
    const selfUs = new Map<number, number>();
    (profile.samples ?? []).forEach((id, i) => selfUs.set(id, (selfUs.get(id) ?? 0) + (dt[i] ?? 0)));
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const parent = new Map<number, number>();
    for (const n of nodes) for (const c of n.children ?? []) parent.set(c, n.id);
    const inclusive = new Map<number, number>();
    const incl = (id: number): number => {
        const hit = inclusive.get(id);
        if (hit !== undefined) return hit;
        const n = byId.get(id)!;
        const v = (selfUs.get(id) ?? 0) + (n.children ?? []).reduce((s, c) => s + incl(c), 0);
        inclusive.set(id, v);
        return v;
    };
    const top = (m: Map<string, number>, k: number) =>
        [...m.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, k)
            .map(([name, us]) => `${name}=${(us / 1000).toFixed(0)}ms`)
            .join(" · ");
    const self = new Map<string, number>();
    const layout = new Map<string, number>();
    const demo = new Map<string, number>();
    for (const n of nodes) {
        const fn = n.callFrame.functionName;
        if (["(idle)", "(program)", "(root)", "(garbage collector)"].includes(fn)) continue;
        const k = key(n);
        self.set(k, (self.get(k) ?? 0) + (selfUs.get(n.id) ?? 0));
        if (fn === "getBoundingClientRect" || fn === "getComputedStyle") {
            // the JS caller two frames up names the forcing site
            const p1 = parent.get(n.id);
            const p2 = p1 !== undefined ? parent.get(p1) : undefined;
            const chain = [p1, p2].filter((x): x is number => x !== undefined).map((x) => key(byId.get(x)!));
            const ck = `${fn}<-${chain.join("<-")}`;
            layout.set(ck, (layout.get(ck) ?? 0) + incl(n.id));
        }
        if (n.callFrame.url.includes("/demo/")) demo.set(k, (demo.get(k) ?? 0) + incl(n.id));
    }
    return { self: top(self, 6), layout: top(layout, 5), demo: top(demo, 6) };
}

/** Renderer main-thread time by trace event (style, layout, paint — what a JS profile cannot see). */
async function traceStart(cdp: CDPSession): Promise<() => Promise<string>> {
    type TraceEvent = { name: string; ph: string; dur?: number; tid: number; args?: { name?: string } };
    const events: TraceEvent[] = [];
    const onData = (e: { value: object[] }) => {
        events.push(...(e.value as TraceEvent[]));
    };
    cdp.on("Tracing.dataCollected", onData);
    await cdp.send("Tracing.start", {
        categories: "devtools.timeline,disabled-by-default-devtools.timeline",
        transferMode: "ReportEvents",
    });
    return async () => {
        const done = new Promise<void>((r) => cdp.once("Tracing.tracingComplete", () => r()));
        await cdp.send("Tracing.end");
        await done;
        cdp.off("Tracing.dataCollected", onData);
        const main = new Set(
            events
                .filter((e) => e.ph === "M" && e.args?.name === "CrRendererMain")
                .map((e) => e.tid),
        );
        const by = new Map<string, number>();
        for (const e of events)
            if (e.ph === "X" && main.has(e.tid) && e.dur)
                by.set(e.name, (by.get(e.name) ?? 0) + e.dur);
        return ["UpdateLayoutTree", "Layout", "PrePaint", "Paint", "Layerize", "Commit", "FunctionCall", "RunTask"]
            .map((n) => `${n}=${((by.get(n) ?? 0) / 1000).toFixed(0)}ms`)
            .join(" · ");
    };
}

/** Counts the mutations glass's roving observer sees on the dock run, plus text writes. */
async function armDockObserver(page: Page): Promise<void> {
    await page.evaluate(() => {
        const w = window as unknown as { __w12up: { roving: number; text: number; rovingFrames: Set<number>; sites: Map<string, number> } };
        const run = document.querySelector(".dock-layer--full.dock-run");
        w.__w12up = { roving: 0, text: 0, rovingFrames: new Set(), sites: new Map() };
        if (!run) return;
        let frame = 0;
        const tick = () => {
            frame++;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        // the exact options glass's `useDockRun` observes with → one callback = one syncRoving
        const site = (n: Node) => {
            const el = n instanceof Element ? n : n.parentElement;
            const seat = el?.closest("[data-dock-seat], .dock-seat, [role='toolbar'] > *");
            const label = (x: Element | null | undefined) =>
                x ? `${x.tagName.toLowerCase()}.${[...x.classList].slice(0, 2).join(".")}` : "?";
            return `${label(seat)}>${label(el)}`;
        };
        new MutationObserver((rs) => {
            for (const r of rs) {
                const k = `${r.type}:${site(r.target)}`;
                w.__w12up.sites.set(k, (w.__w12up.sites.get(k) ?? 0) + 1);
            }
            w.__w12up.roving++;
            w.__w12up.rovingFrames.add(frame);
        }).observe(run, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-current"] });
        new MutationObserver((rs) => {
            w.__w12up.text += rs.length;
        }).observe(run, { characterData: true, subtree: true });
    });
}

async function readDockObserver(
    page: Page,
): Promise<{ roving: number; rovingFrames: number; text: number; sites: string }> {
    return page.evaluate(() => {
        const w = window as unknown as { __w12up: { roving: number; text: number; rovingFrames: Set<number>; sites: Map<string, number> } };
        const sites = [...w.__w12up.sites.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([k, n]) => `${k}=${n}`)
            .join(" · ");
        const r = { roving: w.__w12up.roving, rovingFrames: w.__w12up.rovingFrames.size, text: w.__w12up.text, sites };
        w.__w12up.sites.clear();
        w.__w12up.roving = 0;
        w.__w12up.text = 0;
        w.__w12up.rovingFrames.clear();
        return r;
    });
}

test("w12u-p — colour drags hold frame budget; the dock run is not re-rendered per frame", async ({ page }) => {
    test.setTimeout(150_000);
    const budget = refreshBudget(await measureRefreshInterval(page));
    await installFrameCollector(page);
    await page.addInitScript(() => localStorage.setItem("vueuse-color-scheme", "dark"));
    await page.goto((ORIGIN ?? "/") + "#/?space=lab");
    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Profiler.enable");
    await cdp.send("Profiler.setSamplingInterval", { interval: 200 });
    await page.waitForTimeout(3000); // boot overture settles before measuring
    await expect(page.locator(".dock-layer--full.dock-run")).toHaveCount(1);
    await armDockObserver(page);
    if (BISECT === "root")
        await page.evaluate(() => {
            const set = CSSStyleDeclaration.prototype.setProperty;
            CSSStyleDeclaration.prototype.setProperty = function (n: string, v: string | null, pr?: string) {
                if (this === document.documentElement.style && n.startsWith("--")) return;
                return set.call(this, n, v, pr);
            };
        });

    const results: Array<{ name: string; p50: number; p95: number; frames: number; roving: number; rovingFrames: number }> = [];
    for (const t of TARGETS) {
        const target = t.locate(page);
        await expect(target).toBeVisible();
        const b = await target.boundingBox();
        if (!b) throw new Error(`w12u-p: ${t.name} not laid out`);
        const y0 = b.y + (t.axis === "xy" ? b.height * 0.15 : b.height / 2);
        const y1 = b.y + (t.axis === "xy" ? b.height * 0.85 : b.height / 2);
        const x0 = b.x + b.width * 0.08;
        const x1 = b.x + b.width * 0.92;
        await page.mouse.move(x0, y0);
        await page.mouse.down();
        await resetFrames(page);
        await readDockObserver(page);
        await cdp.send("Profiler.start");
        const traceStop = await traceStart(cdp);
        const start = Date.now();
        let i = 0;
        while (Date.now() - start < DRAG_MS) {
            const u = ((Date.now() - start) / DRAG_MS) * 2; // there and back
            const f = u <= 1 ? u : 2 - u;
            await page.mouse.move(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f);
            i++;
        }
        const frames = (await readFrames(page)).slice(1);
        const longtasks = await readLongTasks(page);
        const dock = await readDockObserver(page);
        const att = await attribute(cdp);
        const rendering = await traceStop();
        await page.mouse.up();
        const p95 = percentile(frames, 95);
        const p50 = percentile(frames, 50);
        const maxTask = longtasks.length ? Math.max(...longtasks) : 0;
        results.push({ name: t.name, p50, p95, frames: frames.length, ...dock });
        console.log(
            `[w12u-p ${soft ? "SOFTWARE-GL" : "REAL-GPU"}] ${t.name}: moves=${i} frames=${frames.length} p50=${p50.toFixed(1)} p95=${p95.toFixed(1)} longTasks=${longtasks.length} maxTask=${maxTask.toFixed(0)} dockRoving=${dock.roving}/${dock.rovingFrames}f dockText=${dock.text}\n    dock: ${dock.sites}\n    main: ${rendering}\n    self: ${att.self}\n    layout: ${att.layout}\n    demo: ${att.demo}`,
        );
        await page.waitForTimeout(400);
    }
    console.log(`[w12u-p] renderer=${renderer} origin=${ORIGIN ?? "dev"} bisect=${BISECT ?? "none"} T=${budget.T.toFixed(2)} budget p50<=${budget.p50Ms.toFixed(2)} p95<=${budget.p95Ms.toFixed(2)}`);
    for (const r of results) {
        expect(r.frames, `${r.name}: collector dead`).toBeGreaterThan(10);
        expect(
            r.rovingFrames,
            `${r.name}: the dock run's roving observer fired on ${r.rovingFrames} of ${r.frames} frames`,
        ).toBeLessThanOrEqual(Math.ceil(r.frames * ROVING_MAX_FRACTION));
        if (!soft) {
            expect(r.p50, `${r.name}: drag frame p50 over 1·T (T=${budget.T.toFixed(2)} ms)`).toBeLessThanOrEqual(budget.p50Ms);
            expect(r.p95, `${r.name}: drag frame p95 over 2·T (T=${budget.T.toFixed(2)} ms)`).toBeLessThanOrEqual(budget.p95Ms);
        }
    }
});
