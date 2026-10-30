// SERVED MODEL: claude-opus-5-5 — X.W11.ink (COHESION §0gw.4): the ink
// certify walk's main-thread cost, traced before and after the cut. A
// derivative of `.v1g`'s drag-profile.mjs (evidence/browser/v1g-2026-10-29/,
// E-3: that file is untouched): the same drive and the same real-GPU cell
// (installed Chrome, new headless, ANGLE Metal, DPR 2: perf/real-gpu.ts's
// named witness), plus a SETTLE_MS hold after mouse-up so the ink referent's
// settle (useAtmosphereBoot.ts INK_SETTLE_MS) lands inside the trace. It sums,
// over every sampled main-thread ms from drag start to the end of the hold,
// the inclusive time under demo/color-session/ink.ts, and reports the longest
// RunTask that carries ink.ts samples with its ink share.
// One browser, one context; both closed in `finally`.
// argv: <dist dir (a sourcemapped gh-pages build)> <out.json> [port]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { TraceMap, originalPositionFor } from "@jridgewell/trace-mapping";

const [DIST, OUT, PORT_ARG] = process.argv.slice(2);
const PORT = Number(PORT_ARG ?? 8477);
// TASK_MS (default 50): the RunTask floor the trace attributes; a lower floor characterises the sub-bar tasks too.
const TASK_MS = Number(process.env.TASK_MS ?? 50);
const SETTLE_MS = Number(process.env.SETTLE_MS ?? 600);
const INK = /demo\/color-session\/ink\.ts:/;
const TYPES = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".woff2": "font/woff2",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".webp": "image/webp",
    ".wasm": "application/wasm",
};

function serve() {
    const server = http.createServer((req, res) => {
        const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
        let file = path.join(DIST, url);
        if (
            !file.startsWith(DIST) ||
            !fs.existsSync(file) ||
            fs.statSync(file).isDirectory()
        )
            file = path.join(DIST, "index.html");
        res.writeHead(200, {
            "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
        });
        fs.createReadStream(file).pipe(res);
    });
    return new Promise((r) => server.listen(PORT, "127.0.0.1", () => r(server)));
}

const maps = new Map();
function original(url, line, col) {
    const m = /\/assets\/([^/?#]+\.js)/.exec(url ?? "");
    if (!m) return null;
    const mapFile = path.join(DIST, "assets", `${m[1]}.map`);
    if (!maps.has(mapFile))
        maps.set(
            mapFile,
            fs.existsSync(mapFile)
                ? new TraceMap(fs.readFileSync(mapFile, "utf8"))
                : null,
        );
    const tm = maps.get(mapFile);
    if (!tm) return null;
    const o = originalPositionFor(tm, { line: line + 1, column: col });
    if (!o.source) return null;
    return `${o.name ?? "?"} @ ${o.source.replace(/^.*?(node_modules\/|demo\/|src\/)/, "$1")}:${o.line}`;
}

function frameLabel(cf) {
    const o = original(cf.url, cf.lineNumber, cf.columnNumber);
    const min = cf.functionName || "(anonymous)";
    if (o) return `${min} → ${o}`;
    if (!cf.url) return min;
    return `${min} @ ${cf.url.replace(/^https?:\/\/[^/]+\//, "")}:${cf.lineNumber + 1}`;
}

/** Build per-sample (ts, nodeId) from the trace's ProfileChunk events. */
function samplesFrom(events) {
    const nodes = new Map();
    const samples = [];
    const profiles = new Map();
    for (const e of events) {
        if (e.name === "Profile") profiles.set(e.id, { ts: e.args.data.startTime });
        if (e.name !== "ProfileChunk") continue;
        const d = e.args.data;
        const prof = profiles.get(e.id) ?? { ts: e.ts };
        profiles.set(e.id, prof);
        for (const n of d.cpuProfile?.nodes ?? [])
            nodes.set(`${e.id}:${n.id}`, {
                cf: n.callFrame,
                parent: n.parent ? `${e.id}:${n.parent}` : null,
            });
        const ids = d.cpuProfile?.samples ?? [];
        const deltas = d.timeDeltas ?? [];
        for (let i = 0; i < ids.length; i++) {
            prof.ts += deltas[i] ?? 0;
            samples.push({ ts: prof.ts, node: `${e.id}:${ids[i]}` });
        }
    }
    return { nodes, samples };
}

function attribute(task, nodes, samples) {
    const self = new Map();
    const incl = new Map();
    const stacks = new Map();
    let n = 0;
    for (const s of samples) {
        if (s.ts < task.ts || s.ts > task.ts + task.dur) continue;
        n++;
        let id = s.node;
        const leaf = nodes.get(id);
        if (!leaf) continue;
        const l = frameLabel(leaf.cf);
        self.set(l, (self.get(l) ?? 0) + 1);
        const seen = new Set();
        const chain = [];
        while (id) {
            const node = nodes.get(id);
            if (!node) break;
            const lab = frameLabel(node.cf);
            if (!seen.has(lab) && node.cf.url) {
                seen.add(lab);
                incl.set(lab, (incl.get(lab) ?? 0) + 1);
            }
            if (node.cf.url && !/node_modules\/@vue\//.test(lab))
                chain.push(lab.replace(/^.* → /, ""));
            id = node.parent;
        }
        const sig = chain.slice(0, 7).join(" ⟵ ");
        stacks.set(sig, (stacks.get(sig) ?? 0) + 1);
    }
    const top = (m, k) =>
        [...m.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, k)
            .map(([f, c]) => ({
                fn: f,
                samples: c,
                pct: n ? +((100 * c) / n).toFixed(1) : 0,
            }));
    return {
        samples: n,
        selfTop: top(self, 8),
        inclusiveTop: top(incl, 10),
        demoCallers: top(new Map([...incl].filter(([f]) => / @ demo\//.test(f))), 12),
        appStacks: top(stacks, 4),
    };
}

/** Inclusive main-thread ms under ink.ts across [start, holdEnd], and the
 *  longest RunTask carrying ink.ts samples. A sample's time is the gap to
 *  the next sample. */
function inkCost(events, start, holdEnd, mainTid, nodes, samples) {
    const inWindow = samples.filter((s) => s.ts >= start.ts && s.ts <= holdEnd.ts);
    const underInk = (node) => {
        let id = node;
        while (id) {
            const n = nodes.get(id);
            if (!n) return false;
            if (n.cf.url && INK.test(frameLabel(n.cf))) return true;
            id = n.parent;
        }
        return false;
    };
    const marks = inWindow.map((s, i) => ({
        ts: s.ts,
        ms: i + 1 < inWindow.length ? (inWindow[i + 1].ts - s.ts) / 1000 : 0,
        ink: underInk(s.node),
    }));
    const inkMs = marks.reduce((a, m) => a + (m.ink ? m.ms : 0), 0);
    const tasks = events.filter(
        (e) => e.name === "RunTask" && e.ph === "X" && e.pid === start.pid
            && e.tid === mainTid && e.ts >= start.ts && e.ts <= holdEnd.ts,
    );
    let worst = null;
    for (const t of tasks) {
        const within = marks.filter((m) => m.ts >= t.ts && m.ts <= t.ts + t.dur);
        const ink = within.reduce((a, m) => a + (m.ink ? m.ms : 0), 0);
        if (ink > 0 && (!worst || ink > worst.inkMs))
            worst = { durMs: +(t.dur / 1000).toFixed(1), inkMs: +ink.toFixed(1) };
    }
    return {
        windowMs: +((holdEnd.ts - start.ts) / 1000).toFixed(1),
        samples: inWindow.length,
        inkInclusiveMs: +inkMs.toFixed(1),
        worstInkTask: worst,
    };
}

const CATEGORIES = [
    "devtools.timeline",
    "disabled-by-default-devtools.timeline",
    "blink.user_timing",
    "v8.execute",
    "disabled-by-default-v8.cpu_profiler",
    "toplevel",
];

const server = await serve();
const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--use-angle=metal", "--force-device-scale-factor=2"],
});
try {
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
    });
    try {
        const page = await context.newPage();
        await page.addInitScript(() => {
            const w = window;
            w.__lt = [];
            new PerformanceObserver((l) => {
                for (const e of l.getEntries())
                    w.__lt.push({ start: e.startTime, dur: e.duration });
            }).observe({ entryTypes: ["longtask"] });
            w.__loaf = [];
            try {
                new PerformanceObserver((l) => {
                    for (const e of l.getEntries())
                        if (e.duration > 50)
                            w.__loaf.push({
                                start: e.startTime,
                                dur: e.duration,
                                blocking: e.blockingDuration,
                                scripts: e.scripts.map((s) => ({
                                    invoker: s.invoker,
                                    fn: s.sourceFunctionName,
                                    url: s.sourceURL,
                                    char: s.sourceCharPosition,
                                    dur: s.duration,
                                })),
                            });
                }).observe({ type: "long-animation-frame", buffered: false });
            } catch {
                /* LoAF absent */
            }
        });
        await page.goto(`http://127.0.0.1:${PORT}/#/`);
        const renderer = await page.evaluate(() => {
            const gl = document.createElement("canvas").getContext("webgl2");
            const ext = gl?.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "none";
        });
        const slider = page.getByRole("slider", { name: "L channel" }).first();
        await slider.waitFor({ state: "visible", timeout: 30_000 });
        const box = await slider.boundingBox();
        const y = box.y + box.height / 2;
        const x0 = box.x + box.width * 0.08;
        const x1 = box.x + box.width * 0.92;
        await browser.startTracing(page, { categories: CATEGORIES });
        await page.mouse.move(x0, y);
        await page.mouse.down();
        await page.evaluate(() => {
            window.__lt = [];
            window.__loaf = [];
            performance.mark("v1g-drag-start");
        });
        const STEPS = 24;
        for (let i = 1; i <= STEPS; i++) {
            await page.mouse.move(x0 + ((x1 - x0) * i) / STEPS, y, { steps: 3 });
            await page.waitForTimeout(30);
        }
        const inPage = await page.evaluate(() => {
            performance.mark("v1g-drag-end");
            return { lt: window.__lt.slice(), loaf: window.__loaf.slice() };
        });
        await page.mouse.up();
        await page.waitForTimeout(SETTLE_MS);
        await page.evaluate(() => performance.mark("ink-hold-end"));
        const buf = await browser.stopTracing();
        const events = JSON.parse(buf.toString()).traceEvents;
        const start = events.find((e) => e.name === "v1g-drag-start");
        const end = events.find((e) => e.name === "v1g-drag-end");
        const mainTid = events.find(
            (e) =>
                e.name === "thread_name" &&
                e.args?.name === "CrRendererMain" &&
                e.pid === start?.pid,
        )?.tid;
        const tasks = events
            .filter(
                (e) =>
                    e.name === "RunTask" &&
                    e.ph === "X" &&
                    e.pid === start?.pid &&
                    e.tid === mainTid &&
                    e.ts >= start.ts &&
                    e.ts <= end.ts &&
                    e.dur > TASK_MS * 1000,
            )
            .map((e) => ({ ts: e.ts, dur: e.dur }));
        const { nodes, samples } = samplesFrom(
            events.filter((e) => e.pid === start?.pid),
        );
        const longTasks = tasks.map((t) => ({
            offsetMs: +((t.ts - start.ts) / 1000).toFixed(1),
            durMs: +(t.dur / 1000).toFixed(1),
            ...attribute(t, nodes, samples),
        }));
        const holdEnd = events.find((e) => e.name === "ink-hold-end");
        const inkTrace = inkCost(events, start, holdEnd, mainTid, nodes, samples);
        const out = {
            renderer,
            inkTrace,
            dragMs: +((end.ts - start.ts) / 1000).toFixed(1),
            observerLongTasksMs: inPage.lt.map((t) => +t.dur.toFixed(0)),
            traceLongTasks: longTasks,
            loaf: inPage.loaf,
        };
        fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
        console.log(
            JSON.stringify(
                {
                    renderer,
                    dragMs: out.dragMs,
                    inkTrace,
                    observer: out.observerLongTasksMs,
                    trace: longTasks.map((t) => [
                        t.durMs,
                        t.selfTop[0]?.fn,
                        t.inclusiveTop.slice(0, 3).map((x) => x.fn),
                    ]),
                },
                null,
                1,
            ),
        );
    } finally {
        await context.close();
    }
} finally {
    await browser.close();
    server.close();
}
