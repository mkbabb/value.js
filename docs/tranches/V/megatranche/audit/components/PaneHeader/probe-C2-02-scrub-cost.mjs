// CHALLENGE-C (2nd audit) probe C2-02 — what does the veil scrub actually COST?
//
// O-11 gate 4 certifies "compositor-only" by counting devtools.timeline `Layout`
// events (<=5) during a 0->300px scrub. It counts NOTHING on the paint/raster
// track. The veil is an `opacity` animation ON AN ELEMENT CARRYING
// `backdrop-filter: blur(7px) saturate(...)` — an opacity change on a
// backdrop-filtered layer cannot be a pure compositor property, because the
// filtered backdrop must be recomputed for the new group alpha.
//
// A/B/C control experiment, interleaved, 3 reps each:
//   A = shipped
//   B = backdrop-filter forced to `none` on the veil (opacity scrub kept)
//   C = the veil animation removed (opacity pinned at the 0.52 rest floor,
//       backdrop-filter kept)  -> isolates the *animation*, not the material
//   D = both removed
import { chromium } from "playwright";

const URL = process.env.URL ?? "http://localhost:9000/#/";

const PATCHES = {
    A: "",
    B: `.pane-header::before { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }`,
    C: `.pane-header::before { animation: none !important; opacity: 0.52 !important; }`,
    D: `.pane-header::before { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; animation: none !important; opacity: 0.52 !important; }`,
};

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send("Performance.enable");

await p.goto(URL, { waitUntil: "load" });
await p.locator("main .pane-header").first().waitFor({ state: "visible" });
// settle the boot overture so first-reveal work never lands inside a run
await p
    .waitForFunction(
        () => performance.getEntriesByName("overture:b4", "mark").length > 0,
        null,
        { timeout: 20_000 },
    )
    .catch(() => {});
await p.waitForTimeout(2500);

const hostInfo = await p.evaluate(() => {
    const host = Array.from(
        document.querySelectorAll(".pane-scroll-fade"),
    ).find((el) => el.offsetParent !== null && el.scrollHeight > el.clientHeight);
    if (!host) return null;
    host.id = host.id || "__probe_host";
    return {
        id: host.id,
        cls: host.className.slice(0, 60),
        scrollH: host.scrollHeight,
        clientH: host.clientHeight,
    };
});
console.log("scroll host:", JSON.stringify(hostInfo));

async function applyPatch(css) {
    await p.evaluate((text) => {
        let s = document.getElementById("__probe_patch");
        if (!s) {
            s = document.createElement("style");
            s.id = "__probe_patch";
            document.head.appendChild(s);
        }
        s.textContent = text;
    }, css);
    await p.waitForTimeout(250);
}

async function metrics() {
    const m = await cdp.send("Performance.getMetrics");
    const o = {};
    for (const { name, value } of m.metrics) o[name] = value;
    return o;
}

/** rAF-driven scrub; returns per-frame deltas in ms. */
async function scrub(hostId) {
    return p.evaluate(async (id) => {
        const host = document.getElementById(id);
        host.scrollTop = 0;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        const deltas = [];
        let last = performance.now();
        for (let i = 1; i <= 100; i++) {
            host.scrollTop = i * 3;
            await new Promise((r) =>
                requestAnimationFrame((t) => {
                    const now = performance.now();
                    deltas.push(now - last);
                    last = now;
                    r(null);
                }),
            );
        }
        host.scrollTop = 0;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        return deltas;
    }, hostId);
}

const stats = (a) => {
    const s = [...a].sort((x, y) => x - y);
    const sum = a.reduce((x, y) => x + y, 0);
    return {
        mean: +(sum / a.length).toFixed(2),
        p50: +s[Math.floor(s.length * 0.5)].toFixed(2),
        p95: +s[Math.floor(s.length * 0.95)].toFixed(2),
        max: +s[s.length - 1].toFixed(2),
        over17: a.filter((d) => d > 17).length,
        over33: a.filter((d) => d > 33).length,
    };
};

const acc = { A: [], B: [], C: [], D: [] };
const cost = { A: [], B: [], C: [], D: [] };

// warm-up
await applyPatch("");
await scrub(hostInfo.id);

for (let rep = 0; rep < 3; rep++) {
    for (const k of ["A", "B", "C", "D"]) {
        await applyPatch(PATCHES[k]);
        const m0 = await metrics();
        const d = await scrub(hostInfo.id);
        const m1 = await metrics();
        acc[k].push(...d);
        cost[k].push({
            task: +((m1.TaskDuration - m0.TaskDuration) * 1000).toFixed(1),
            layout: +((m1.LayoutDuration - m0.LayoutDuration) * 1000).toFixed(1),
            style: +(
                (m1.RecalcStyleDuration - m0.RecalcStyleDuration) *
                1000
            ).toFixed(1),
            script: +((m1.ScriptDuration - m0.ScriptDuration) * 1000).toFixed(1),
        });
    }
}

console.log("\n=== per-frame ms over a 0->300px rAF scrub (300 frames, 3 interleaved reps) ===");
for (const k of ["A", "B", "C", "D"]) {
    console.log(`  ${k}  ${JSON.stringify(stats(acc[k]))}`);
}
console.log("\n=== CDP Performance.getMetrics delta per 100-frame scrub (ms) ===");
for (const k of ["A", "B", "C", "D"]) {
    const t = cost[k];
    const avg = (f) => +(t.reduce((s, x) => s + x[f], 0) / t.length).toFixed(1);
    console.log(
        `  ${k}  task=${avg("task")}  layout=${avg("layout")}  style=${avg("style")}  script=${avg("script")}`,
    );
}
console.log(
    "\nlegend  A=shipped  B=no backdrop-filter  C=no veil animation  D=neither",
);
await b.close();
