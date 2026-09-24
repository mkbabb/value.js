import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

/**
 * X.W12.b · OA-20 / OA-25 — ONE OWNER PER ELEMENT PER PROPERTY, ACROSS THE
 * WHOLE ENTER WINDOW.
 *
 * The owner's docket: "the startup animation and card animations are janky,
 * jittery, and buggy" (frame 1) and "pane/card transitions double-animated
 * and broken". The open's baseline read `document.getAnimations()` ONCE, at
 * t≈600 ms, and saw 0 multi-owner elements — a single instant cannot see two
 * owners that overlap for 200 ms somewhere else in a 2 s window. This census
 * samples CONTINUOUSLY from the first script on the page:
 *
 *   · every animation frame, `document.getAnimations()` — each Animation is
 *     identified once (WeakMap) and its element, owner, properties, delay and
 *     active duration recorded; its first/last-seen frame bounds its interval;
 *   · `transitionrun` / `animationstart` (capture) — so a transition that
 *     starts and is cancelled between two frames is still counted;
 *   · a MutationObserver — an element removed while one of its finite
 *     animations was more than a frame short of its end is CUT; a cut whose
 *     element shape then re-runs the same owner in the window is reported as
 *     a RE-MOUNT MID-ENTER (reported, not asserted: on a starved host Vue's
 *     fallback timer, measured from the class flip, can outrun a transition
 *     whose first frame is late — the census names it, the gate stays the
 *     spec's);
 *   · a `layout-shift` PerformanceObserver — boot CLS (hadRecentInput
 *     excluded), and the shifts inside each pane-switch window.
 *
 * OWNER: a CSS transition is owned by its `transition(<property>)`; a CSS
 * animation by its `@keyframes` name; a script (WAAPI) animation by its `id`
 * or "waapi". Two animations on ONE element whose intervals overlap and whose
 * property sets intersect (transform ≡ translate ≡ rotate ≡ scale) are a
 * MULTI-OWNER defect. Besides the gate, the census reports: per element, the
 * run count per window (an enter that runs twice), transform animated beside
 * top/left/width/height, and ancestor-stacked transform (a child and its
 * ancestor translating at once — the "card inside a pane" double travel).
 *
 * Windows: `boot` (cold load of `/#/` until the page is still for 1 s) and
 * three pane switches through the router — picker → palettes (inspector
 * swap), palettes → gradient (stage + inspector), gradient → picker (both,
 * back direction).
 *
 * Env: `W12_ORIGIN` (default the project baseURL, e.g. the gh-pages static
 * serve) · `W12_CENSUS_OUT` (a directory: census JSON + the pasted table) ·
 * `W12_WEBM_DIR` (records the run's WebM there).
 */

const ORIGIN = process.env.W12_ORIGIN ?? "";
const CENSUS_OUT = process.env.W12_CENSUS_OUT;
const WEBM_DIR = process.env.W12_WEBM_DIR;
const BOOT_CLS_MAX = 0.02;
const STILL_MS = 1_000;
const WINDOW_BOUND_MS = 12_000;
const SWITCHES = [
    { from: "picker", to: "palettes", hash: "#/palettes" },
    { from: "palettes", to: "gradient", hash: "#/gradient" },
    { from: "gradient", to: "picker", hash: "#/" },
] as const;

interface AnimRow {
    id: number;
    el: number;
    owner: string;
    kind: "transition" | "animation" | "waapi";
    props: string[];
    delay: number;
    duration: number;
    phase: string;
    /** document-timeline start (ms, performance.now basis) */
    start: number;
    /** the effect's fill applies its from-state through the delay */
    fillsBackwards: boolean;
    first: number;
    last: number;
    finite: boolean;
    remounted: boolean;
}
interface CensusDump {
    rows: AnimRow[];
    els: Record<number, { desc: string; parents: number[] }>;
    shifts: Array<{ t: number; value: number; phase: string; sources: string[] }>;
    phases: Array<{ name: string; t: number }>;
}

/** Runs before any page script (addInitScript): the continuous sampler. */
function installCensus() {
    const W = window as unknown as { __w12m: unknown };
    const GROUP: Record<string, string> = { translate: "transform", rotate: "transform", scale: "transform" };
    const META = new Set(["offset", "easing", "composite", "computedOffset"]);
    const elIds = new WeakMap<Element, number>();
    const els: Record<number, { desc: string; parents: number[] }> = {};
    const animIds = new WeakMap<Animation, number>();
    const live = new Map<number, { a: Animation; row: AnimRow; target: Element | null; end: number }>();
    const rows: AnimRow[] = [];
    const shifts: CensusDump["shifts"] = [];
    const phases: CensusDump["phases"] = [{ name: "boot", t: 0 }];
    let phase = "boot";
    let nextEl = 1;
    let nextAnim = 1;

    const describe = (el: Element) => {
        const tid = el.getAttribute("data-testid");
        const cls = Array.from(el.classList)
            .filter((c) => !/^(vj-[a-z]+|overture-appear)-/.test(c))
            .slice(0, 3)
            .join(".");
        return `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${tid ? `[${tid}]` : ""}${cls ? "." + cls : ""}`;
    };
    const idOf = (el: Element): number => {
        let id = elIds.get(el);
        if (id) return id;
        id = nextEl++;
        elIds.set(el, id);
        const parents: number[] = [];
        let p = el.parentElement;
        while (p) {
            parents.push(idOf(p));
            p = p.parentElement;
        }
        els[id] = { desc: describe(el), parents };
        return id;
    };
    const propsOf = (a: Animation): string[] => {
        const set = new Set<string>();
        if (a instanceof CSSTransition) set.add(a.transitionProperty);
        const eff = a.effect as KeyframeEffect | null;
        try {
            for (const kf of eff?.getKeyframes() ?? []) for (const k of Object.keys(kf)) if (!META.has(k)) set.add(k);
        } catch {
            /* a cancelled effect has no keyframes; the transition name above stands */
        }
        return Array.from(set, (p) => GROUP[p] ?? p.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()));
    };
    const observe = (a: Animation, now: number) => {
        let id = animIds.get(a);
        if (id) {
            const l = live.get(id);
            if (l) l.row.last = now;
            return;
        }
        id = nextAnim++;
        animIds.set(a, id);
        const target = ((a.effect as KeyframeEffect | null)?.target ?? null) as Element | null;
        const timing = a.effect?.getComputedTiming();
        const kind = a instanceof CSSTransition ? "transition" : a instanceof CSSAnimation ? "animation" : "waapi";
        const owner =
            a instanceof CSSTransition
                ? `transition(${a.transitionProperty})`
                : a instanceof CSSAnimation
                  ? `@keyframes ${a.animationName}`
                  : `waapi ${a.id || "anon"}`;
        const row: AnimRow = {
            id,
            el: target ? idOf(target) : 0,
            owner,
            kind,
            props: propsOf(a),
            delay: Math.round(Number(timing?.delay ?? 0)),
            duration: Math.round(Number(timing?.activeDuration ?? 0)),
            phase,
            start: typeof a.startTime === "number" ? a.startTime : now,
            fillsBackwards: ["backwards", "both"].includes(String(timing?.fill)),
            first: now,
            last: now,
            finite: Number.isFinite(Number(timing?.activeDuration ?? 0)),
            remounted: false,
        };
        rows.push(row);
        live.set(id, { a, row, target, end: row.start + row.delay + row.duration });
    };
    const sweep = () => {
        const now = performance.now();
        for (const a of document.getAnimations()) observe(a, now);
        for (const [id, l] of live) {
            if (l.a.playState === "finished" || l.a.playState === "idle" || !l.target?.isConnected) live.delete(id);
        }
    };
    const onEvent = (e: Event) => {
        const t = e.target as Element;
        for (const a of t.getAnimations?.() ?? []) observe(a, performance.now());
    };
    document.addEventListener("transitionrun", onEvent, true);
    document.addEventListener("animationstart", onEvent, true);
    const tick = () => {
        sweep();
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // CUT: an element leaves the document (the MutationObserver microtask
    // right after the removal — frame-exact, unlike a rAF sample) while one of
    // its finite animations is more than a frame short of its end. The
    // analysis names it a RE-MOUNT when the same element shape then re-runs
    // the same owner in the same window.
    new MutationObserver((records) => {
        const removed: Node[] = [];
        for (const rec of records) for (const n of Array.from(rec.removedNodes)) if (!n.isConnected) removed.push(n);
        if (removed.length) {
            const now = performance.now();
            for (const [, l] of live) {
                if (!l.target || !l.row.finite || now >= l.end - 17) continue;
                if (removed.some((n) => n === l.target || n.contains(l.target))) {
                    l.row.remounted = true;
                    l.row.last = now;
                }
            }
        }
        sweep();
    }).observe(document, { childList: true, subtree: true });
    try {
        new PerformanceObserver((list) => {
            for (const e of list.getEntries() as Array<PerformanceEntry & { value: number; hadRecentInput: boolean; sources?: Array<{ node?: Node | null; previousRect: DOMRectReadOnly; currentRect: DOMRectReadOnly }> }>) {
                if (e.hadRecentInput) continue;
                const r = (q: DOMRectReadOnly) => `${Math.round(q.x)},${Math.round(q.y)} ${Math.round(q.width)}×${Math.round(q.height)}`;
                const sources = (e.sources ?? []).map(
                    (s) => `${s.node instanceof Element ? describe(s.node) : String(s.node?.nodeName ?? "?")} ${r(s.previousRect)}→${r(s.currentRect)}`,
                );
                shifts.push({ t: e.startTime, value: e.value, phase, sources });
            }
        }).observe({ type: "layout-shift", buffered: true });
    } catch {
        /* layout-shift is Chromium-only; the census project is Chromium */
    }
    W.__w12m = {
        setPhase(name: string) {
            phase = name;
            phases.push({ name, t: performance.now() });
        },
        running() {
            return document.getAnimations().filter((a) => {
                const d = Number(a.effect?.getComputedTiming().activeDuration ?? 0);
                return Number.isFinite(d) && a.playState === "running";
            }).length;
        },
        dump(): CensusDump {
            sweep();
            return { rows, els, shifts, phases };
        },
    };
}

const LAYOUT_PROPS = new Set(["top", "left", "right", "bottom", "width", "height", "inset", "margin-top", "margin-bottom", "margin-left", "margin-right", "padding-top", "padding-bottom", "padding-left", "padding-right"]);
/** When the animation's effect holds the property: its active phase, plus the
 *  delay when it fills backwards; a cut animation ends at its removal. */
const held = (r: AnimRow): [number, number] => [
    r.fillsBackwards ? r.start : r.start + r.delay,
    r.remounted ? r.last : r.start + r.delay + r.duration,
];
/** When the animation MOVES: its active phase only (a backwards fill is a still pose). */
const moving = (r: AnimRow): [number, number] => [r.start + r.delay, r.remounted ? r.last : r.start + r.delay + r.duration];
const meet = ([a0, a1]: [number, number], [b0, b1]: [number, number]) => a0 < b1 && b0 < a1;
const overlaps = (a: AnimRow, b: AnimRow) => meet(held(a), held(b));
const travelsTogether = (a: AnimRow, b: AnimRow) => meet(moving(a), moving(b));

interface Analysis {
    multiOwner: string[];
    transformBesideLayout: string[];
    ancestorStacked: string[];
    remounts: string[];
    reruns: string[];
    table: string[];
    bootCls: number;
    switchCls: Record<string, number>;
}

function analyse(d: CensusDump): Analysis {
    const byEl = new Map<number, AnimRow[]>();
    for (const r of d.rows) if (r.el && r.finite) byEl.set(r.el, [...(byEl.get(r.el) ?? []), r]);
    const desc = (el: number) => d.els[el]?.desc ?? `#${el}`;
    const multiOwner: string[] = [];
    const transformBesideLayout: string[] = [];
    const ancestorStacked: string[] = [];
    const reruns: string[] = [];
    const table: string[] = ["| window | element | owner | props | runs | delay+duration ms |", "|---|---|---|---|---|---|"];
    for (const [el, list] of byEl) {
        for (let i = 0; i < list.length; i++)
            for (let j = i + 1; j < list.length; j++) {
                const [a, b] = [list[i], list[j]];
                if (a.owner === b.owner || !overlaps(a, b)) continue;
                const shared = a.props.filter((p) => b.props.includes(p));
                if (shared.length)
                    multiOwner.push(`${a.phase}: ${desc(el)} — ${shared.join(",")} by ${a.owner} + ${b.owner}`);
            }
        const tf = list.filter((r) => r.props.includes("transform"));
        const lay = list.filter((r) => r.props.some((p) => LAYOUT_PROPS.has(p)));
        for (const a of tf) for (const b of lay) if (travelsTogether(a, b)) transformBesideLayout.push(`${a.phase}: ${desc(el)} — ${a.owner} + ${b.owner}`);
        const groups = new Map<string, AnimRow[]>();
        for (const r of list) groups.set(`${r.phase}|${r.owner}`, [...(groups.get(`${r.phase}|${r.owner}`) ?? []), r]);
        for (const [k, g] of groups) {
            const [phase, owner] = k.split("|");
            table.push(`| ${phase} | \`${desc(el)}\` | ${owner} | ${g[0].props.join(",")} | ${g.length} | ${g[0].delay}+${g[0].duration} |`);
            // a transition re-armed within one window on one property is a re-run
            if (g.length > 1 && g[0].kind !== "transition") reruns.push(`${phase}: ${desc(el)} — ${owner} ×${g.length}`);
        }
        for (const a of tf) {
            for (const anc of d.els[el]?.parents ?? []) {
                for (const b of byEl.get(anc) ?? [])
                    if (b.props.includes("transform") && travelsTogether(a, b) && a.phase === b.phase)
                        ancestorStacked.push(
                            `${a.phase}: ${desc(el)} (${a.owner}) inside ${desc(anc)} (${b.owner}) — together ${Math.round(Math.min(moving(a)[1], moving(b)[1]) - Math.max(moving(a)[0], moving(b)[0]))} ms`,
                        );
            }
        }
    }
    const remounts = d.rows
        .filter((r) => r.remounted)
        .filter((r) => d.rows.some((q) => q.el !== r.el && q.phase === r.phase && q.owner === r.owner && desc(q.el) === desc(r.el) && q.first >= r.first))
        .map((r) => `${r.phase}: ${desc(r.el)} — ${r.owner} cut ≈${Math.round(r.last - r.first)} ms into ${r.delay + r.duration} ms, then re-run on a new element`);
    const bootCls = d.shifts.filter((s) => s.phase === "boot").reduce((s, e) => s + e.value, 0);
    const switchCls: Record<string, number> = {};
    for (const s of d.shifts) if (s.phase !== "boot") switchCls[s.phase] = (switchCls[s.phase] ?? 0) + s.value;
    const uniq = (xs: string[]) => [...new Set(xs)];
    return {
        multiOwner: uniq(multiOwner),
        transformBesideLayout: uniq(transformBesideLayout),
        ancestorStacked: uniq(ancestorStacked),
        remounts: uniq(remounts),
        reruns: uniq(reruns),
        table,
        bootCls,
        switchCls,
    };
}

/** Wait until no finite animation has run for STILL_MS (bounded). */
async function settle(page: Page) {
    const t0 = Date.now();
    let stillSince = Date.now();
    while (Date.now() - t0 < WINDOW_BOUND_MS) {
        const n = await page.evaluate(() => (window as unknown as { __w12m: { running(): number } }).__w12m.running());
        if (n > 0) stillSince = Date.now();
        else if (Date.now() - stillSince >= STILL_MS) return;
        await page.waitForTimeout(100);
    }
}

test.describe("X.W12.b — one owner per element per property (boot + 3 pane switches)", () => {
    test.setTimeout(180_000);

    test("continuous census: 0 multi-owner · boot CLS ≤ 0.02", async ({ browser, baseURL }) => {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            colorScheme: "dark",
            ...(WEBM_DIR ? { recordVideo: { dir: WEBM_DIR, size: { width: 1440, height: 900 } } } : {}),
        });
        await ctx.addInitScript(installCensus);
        const page = await ctx.newPage();
        const origin = ORIGIN || baseURL || "";
        try {
            await page.goto(`${origin.replace(/\/$/, "")}/#/`, { waitUntil: "load", timeout: 60_000 });
            await page.locator(".pane-shell").first().waitFor({ timeout: 30_000 });
            await settle(page);
            for (const s of SWITCHES) {
                await page.evaluate((name) => (window as unknown as { __w12m: { setPhase(n: string): void } }).__w12m.setPhase(name), `${s.from}→${s.to}`);
                await page.evaluate((h) => {
                    location.hash = h;
                }, s.hash);
                await settle(page);
            }
            const dump = await page.evaluate(() => (window as unknown as { __w12m: { dump(): CensusDump } }).__w12m.dump());
            const a = analyse(dump);
            const report = [
                `rows ${dump.rows.length} · elements ${new Set(dump.rows.map((r) => r.el)).size} · boot CLS ${a.bootCls.toFixed(4)} · switch CLS ${JSON.stringify(a.switchCls)}`,
                `multi-owner ${a.multiOwner.length}`,
                ...a.multiOwner.map((x) => `  MULTI ${x}`),
                `re-mount mid-enter ${a.remounts.length}`,
                ...a.remounts.map((x) => `  REMOUNT ${x}`),
                `transform beside layout ${a.transformBesideLayout.length}`,
                ...a.transformBesideLayout.map((x) => `  LAYOUT ${x}`),
                `re-runs ${a.reruns.length}`,
                ...a.reruns.map((x) => `  RERUN ${x}`),
                `ancestor-stacked transform ${a.ancestorStacked.length}`,
                ...a.ancestorStacked.map((x) => `  STACK ${x}`),
                `boot shifts: ${JSON.stringify(dump.shifts.filter((s) => s.phase === "boot").map((s) => [Math.round(s.t), +s.value.toFixed(4), s.sources.slice(0, 3)]))}`,
            ];
            console.log(report.join("\n"));
            if (CENSUS_OUT) {
                mkdirSync(CENSUS_OUT, { recursive: true });
                writeFileSync(`${CENSUS_OUT}/census.json`, JSON.stringify({ dump, analysis: a }, null, 1));
                writeFileSync(`${CENSUS_OUT}/census-table.md`, [...report, "", ...a.table].join("\n") + "\n");
            }
            expect(a.multiOwner, "elements animated by >1 owner on one property").toEqual([]);
            expect(a.bootCls, "boot cumulative layout shift").toBeLessThanOrEqual(BOOT_CLS_MAX);
        } finally {
            await ctx.close();
        }
    });
});
