// o1109 pane-transitions — the card-shuffle falsifier (owner order 2026-11-09:
// "The pane animations of the value.js are not quite page like and card like
// (shuffling cards almost) like they were before").
//
// One headless browser per run; one context per cell (viewport x scheme), the
// context and the browser closed in `finally`. Every animation frame from the
// input until the swap has been still for 600 ms, per region, per card:
// its transform decomposed (tx, ty, rotation, scale), opacity, leave flag, box.
//
// THE SHUFFLE LAW (the falsifier; RED on the 1.5rem/no-rotate deck):
//   S1 forward — the leaver is flung off its region: |tx| or |ty| peaks at
//      >= 80 % of its own size, and it turns (|rot| peaks >= 1.5 deg);
//   S2 forward — the riser comes up from under the deck askew: its first
//      sampled pose turns (|rot| >= 0.5 deg) and is scaled below 1;
//   S3 back — the riser is dealt back on top from the leaver's discard side,
//      turning (|rot| >= 1.5 deg), and it is the top card (z above the leaver);
//   S4 overlap — both cards are co-mounted for >= 3 frames, no region is
//      ever blank (no card with opacity > 0.05), the document never scrolls
//      sideways, and every card ends at rest (transform none, one child);
//   S5 reduced motion — no card ever wears a transform; the leaver is gone
//      within 250 ms.
// Recorded (not asserted): p95 frame time, the leaver's normalised progress
// curve (the easing), overlap frame count.
//
// Usage: node probe.mjs <repo-root> <outdir> [--frames]
// The probe serves the repo's demo itself (vite dev on PORT, a child of this
// run, stopped in `finally`), so one guarded run owns the whole tree.
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const [root = ".", outdir = "out", ...flags] = process.argv.slice(2);
const FRAMES = flags.includes("--frames");
const PORT = Number(process.env.PROBE_PORT ?? 9467);
const origin = `http://localhost:${PORT}`;
mkdirSync(outdir, { recursive: true });

const server = spawn("npx", ["vite", "--port", String(PORT), "--strictPort"], {
    cwd: root,
    env: { ...process.env, VITE_API_URL: origin, VJS_VITE_CACHE_DIR: `${root}/node_modules/.vite-o1109pt` },
    stdio: ["ignore", "ignore", "inherit"],
    detached: true,
});
const stopServer = () => {
    try {
        process.kill(-server.pid, "SIGTERM");
    } catch {}
};
process.on("exit", stopServer);
for (let i = 0; i < 120; i++) {
    const ok = await fetch(origin).then((r) => r.ok, () => false);
    if (ok) break;
    await new Promise((r) => setTimeout(r, 500));
}

const VIEWPORTS = [
    [360, 780],
    [390, 844],
    [430, 932],
    [820, 1180],
    [1440, 900],
];
const SCHEMES = ["light", "dark"];

async function hop(page, hash) {
    return page.evaluate(async (hash) => {
        const ids = (window.__shufIds ??= new WeakMap());
        let n = (window.__shufN ??= 0);
        const idOf = (el) => {
            if (!ids.has(el)) ids.set(el, ++window.__shufN);
            return ids.get(el);
        };
        const decompose = (m) => {
            if (!m || m === "none") return { tx: 0, ty: 0, rot: 0, sc: 1 };
            const v = /matrix\(([^)]+)\)/.exec(m);
            if (!v) return { tx: 0, ty: 0, rot: 0, sc: 1, raw: m };
            const [a, b, , , e, f] = v[1].split(",").map(Number);
            return { tx: e, ty: f, rot: (Math.atan2(b, a) * 180) / Math.PI, sc: Math.hypot(a, b) };
        };
        const frame = () => new Promise((r) => requestAnimationFrame(r));
        const read = () => ({
            t: performance.now(),
            sw: document.documentElement.scrollWidth,
            iw: window.innerWidth,
            w: [...document.querySelectorAll(".pane-container > .pane-wrapper")].map((w) => ({
                role: /pane-wrapper--(\w+)/.exec(w.className)?.[1] ?? "",
                oh: w.offsetHeight,
                kids: [...w.children].map((k, i) => {
                    const cs = getComputedStyle(k);
                    return {
                        id: idOf(k),
                        i,
                        op: Number(cs.opacity),
                        z: cs.zIndex,
                        // the card's own material, or its one-deep carrier's
                        bf: k.matches(".glass-resting")
                            ? cs.backdropFilter
                            : getComputedStyle(k, "::before").backdropFilter,
                        leave: k.classList.contains("vj-enter-leave-active"),
                        enter: k.classList.contains("vj-enter-enter-active"),
                        w: k.offsetWidth,
                        h: k.offsetHeight,
                        ...decompose(cs.transform),
                    };
                }),
            })),
        });
        const out = [read()];
        location.hash = hash;
        let still = performance.now();
        let prev = JSON.stringify(out[0].w);
        while (performance.now() - still < 600 && out.length < 900) {
            await frame();
            const s = read();
            const sig = JSON.stringify(s.w);
            if (sig !== prev) still = performance.now();
            prev = sig;
            out.push(s);
        }
        return out;
    }, hash);
}

function analyse(samples, direction, reduced) {
    const faults = [];
    const dts = [];
    for (let i = 1; i < samples.length; i++) dts.push(samples[i].t - samples[i - 1].t);
    const sorted = [...dts].sort((a, b) => a - b);
    const p95 = sorted[Math.floor(0.95 * (sorted.length - 1))] ?? 0;
    const cards = new Map(); // id -> {role, frames:[{t, ...}]}
    let overlap = 0;
    for (const s of samples) {
        if (s.sw > s.iw) faults.push(`S4 scrollWidth ${s.sw} > ${s.iw}`);
        let co = false;
        for (const w of s.w) {
            if (!w.kids.some((k) => k.op > 0.05)) faults.push(`S4 ${w.role}: blank frame`);
            if (w.kids.length > 1) co = true;
            for (const k of w.kids) {
                const c = cards.get(k.id) ?? { role: w.role, frames: [] };
                c.frames.push({ t: s.t, ...k });
                cards.set(k.id, c);
            }
        }
        if (co) overlap++;
    }
    // The leaver is the card that was on the deck at the input; the riser is
    // the card at rest at the end. An intermediate plate phase (a chunk slower
    // than the hold) is neither, and is not what the eye followed.
    const roles = {};
    const first = new Map(samples[0].w.map((w) => [w.role, w.kids.map((k) => k.id)]));
    const lastIds = new Map(samples[samples.length - 1].w.map((w) => [w.role, w.kids.map((k) => k.id)]));
    for (const [id, c] of cards) {
        const leaves = c.frames.filter((f) => f.leave);
        const enters = c.frames.filter((f) => f.enter);
        if (leaves.length && first.get(c.role)?.includes(id)) (roles[c.role] ??= {}).leaver = { id, frames: leaves };
        if (enters.length && lastIds.get(c.role)?.includes(id)) (roles[c.role] ??= {}).riser = { id, frames: enters };
    }
    const report = { p95: +p95.toFixed(1), frames: samples.length, overlap, roles: {} };
    for (const [role, { leaver, riser }] of Object.entries(roles)) {
        const r = {};
        if (leaver) {
            const f = leaver.frames;
            // travel as a fraction of the card's OWN live size (a % translate
            // tracks the box, and G9 may resize the region mid-swap)
            r.leaverPeakTravel = Math.max(...f.map((x) => Math.max(Math.abs(x.tx) / Math.max(x.w, 1), Math.abs(x.ty) / Math.max(x.h, 1))));
            r.leaverPeakRot = Math.max(...f.map((x) => Math.abs(x.rot)));
            r.leaverMinScale = Math.min(...f.map((x) => x.sc));
            r.leaverLife = +(f[f.length - 1].t - f[0].t).toFixed(0);
            r.leaverZ = f[0].z;
            r.leaverMaterial = [...new Set(f.map((x) => x.bf))];
            const end = f.reduce((m, x) => (Math.hypot(x.tx, x.ty) > Math.hypot(m.tx, m.ty) ? x : m), f[0]);
            const D = Math.hypot(end.tx, end.ty) || 1;
            r.curve = f.map((x) => [+(x.t - f[0].t).toFixed(0), +(Math.hypot(x.tx, x.ty) / D).toFixed(3), +x.rot.toFixed(2)]);
            r.discardSign = Math.sign(end.tx || end.ty);
            if (reduced) {
                if (f.some((x) => x.tx || x.ty || x.rot || x.sc !== 1)) faults.push(`S5 ${role}: leaver transformed under reduce`);
                // the 120 ms cut, plus two frames of the run's own frame time
                if (r.leaverLife > 120 + 2 * p95 + 17) faults.push(`S5 ${role}: leaver lived ${r.leaverLife} ms under reduce (p95 ${p95.toFixed(0)})`);
            } else if (direction === "forward") {
                if (r.leaverPeakTravel < 0.8) faults.push(`S1 ${role}: leaver travel ${r.leaverPeakTravel.toFixed(2)} < 0.8 of its size`);
                if (r.leaverPeakRot < 1.5) faults.push(`S1 ${role}: leaver turn ${r.leaverPeakRot.toFixed(2)} deg < 1.5`);
            }
        }
        if (riser) {
            const f = riser.frames;
            r.riserFirst = { tx: +f[0].tx.toFixed(1), ty: +f[0].ty.toFixed(1), rot: +f[0].rot.toFixed(2), sc: +f[0].sc.toFixed(3) };
            r.riserPeakRot = Math.max(...f.map((x) => Math.abs(x.rot)));
            r.riserZ = f[0].z;
            r.riserCurve = f.map((x) => [+(x.t - f[0].t).toFixed(0), +x.tx.toFixed(1), +x.ty.toFixed(1), +x.rot.toFixed(2), +x.sc.toFixed(3)]);
            if (reduced) {
                if (f.some((x) => x.tx || x.ty || x.rot || x.sc !== 1)) faults.push(`S5 ${role}: riser transformed under reduce`);
            } else if (direction === "forward") {
                if (!(r.riserPeakRot >= 0.5)) faults.push(`S2 ${role}: riser rises square (turn ${r.riserPeakRot.toFixed(2)} deg)`);
                if (!(Math.min(...f.map((x) => x.sc)) < 0.995)) faults.push(`S2 ${role}: riser not from under the deck (scale 1)`);
            } else {
                if (r.riserPeakRot < 1.5) faults.push(`S3 ${role}: riser dealt back square (turn ${r.riserPeakRot.toFixed(2)} deg)`);
                if (leaver) {
                    const zr = Number(riser.frames[0].z) || 0;
                    const zl = Number(leaver.frames[0].z) || 0;
                    if (!(zr > zl)) faults.push(`S3 ${role}: riser not on top (z ${zr} vs leaver ${zl})`);
                }
                const tx0 = f[0].tx || f[0].ty;
                // dealt back from the side the forward gesture discarded to
                r.riserFromSign = Math.sign(tx0);
            }
        }
        report.roles[role] = r;
    }
    if (!reduced && overlap < 3) faults.push(`S4 overlap ${overlap} frames < 3`);
    const last = samples[samples.length - 1];
    for (const w of last.w) {
        if (w.kids.length !== 1) faults.push(`S4 ${w.role}: ${w.kids.length} cards at rest`);
        for (const k of w.kids) if (k.tx || k.ty || k.rot || k.sc !== 1) faults.push(`S4 ${w.role}: rest transform`);
    }
    return { faults: [...new Set(faults)], report };
}

// The S3 side law needs the forward hop's discard side per role.
function sideFaults(fwd, back) {
    const f = [];
    for (const [role, r] of Object.entries(back.report.roles)) {
        const d = fwd.report.roles[role]?.discardSign;
        if (d && r.riserFromSign !== undefined && r.riserFromSign !== d)
            f.push(`S3 ${role}: dealt back from the other side (${r.riserFromSign} vs discard ${d})`);
    }
    return f;
}

async function midFrame(page, hash, at, file) {
    await page.evaluate(
        ({ hash, at }) =>
            new Promise((resolve) => {
                // pause once the leaver's AND the riser's transitions are both
                // running (the enter's starts a frame after the leave's)
                const tick = () => {
                    const busy =
                        document.querySelector(".pane-wrapper > .vj-enter-leave-active.vj-enter-leave-to") &&
                        document.querySelector(".pane-wrapper > .vj-enter-enter-active.vj-enter-enter-to");
                    if (!busy) return requestAnimationFrame(tick);
                    const anims = document.getAnimations();
                    for (const a of anims) {
                        a.pause();
                        try {
                            a.currentTime = at;
                        } catch {}
                    }
                    window.__shufPaused = anims;
                    resolve();
                };
                location.hash = hash;
                requestAnimationFrame(tick);
            }),
        { hash, at },
    );
    await page.screenshot({ path: file });
    await page.evaluate(() => {
        for (const a of window.__shufPaused ?? []) a.play();
    });
    await page.waitForTimeout(900);
}

// The named need for branded Chrome (machine law, 2026-10-16): the p95 frame
// time and the per-frame pose curve are GPU frame-production readings. On
// SwiftShader a 1440 frame is ~300 ms, longer than the whole 250 ms leave, so
// the leaver is never sampled mid-flight. This is the repo's real-GPU cell
// (`e2e/smoke/perf/real-gpu.ts`: headless `channel: "chrome"`, ANGLE-Metal).
const SOFT = process.env.PROBE_SOFT === "1";
const browser = await chromium.launch(
    SOFT
        ? { headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }
        : { headless: true, channel: "chrome", args: ["--use-angle=metal", "--force-device-scale-factor=2"] },
);
const results = [];
try {
    const cells = [];
    for (const [w, h] of VIEWPORTS) for (const s of SCHEMES) cells.push({ w, h, s, reduce: false });
    cells.push({ w: 390, h: 844, s: "light", reduce: true }, { w: 1440, h: 900, s: "dark", reduce: true });
    for (const c of cells) {
        const ctx = await browser.newContext({
            viewport: { width: c.w, height: c.h },
            colorScheme: c.s,
            reducedMotion: c.reduce ? "reduce" : "no-preference",
        });
        try {
            const page = await ctx.newPage();
            await page.goto(`${origin}/#/`);
            await page.locator(".pane-wrapper--inspector").first().waitFor({ timeout: 90_000 }).catch(() => {});
            await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
            // warm every pane chunk so a cold chunk's plate is not what is read
            for (const hsh of ["#/palettes", "#/browse", "#/"]) {
                await page.evaluate((x) => (location.hash = x), hsh);
                await page.waitForTimeout(1200);
            }
            const tag = `${c.w}-${c.s}${c.reduce ? "-reduce" : ""}`;
            if (!results.length)
                console.log(
                    "renderer:",
                    await page.evaluate(() => {
                        const gl = document.createElement("canvas").getContext("webgl2");
                        const x = gl?.getExtension("WEBGL_debug_renderer_info");
                        return x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : "unknown";
                    }),
                );
            const fwd = analyse(await hop(page, "#/palettes"), "forward", c.reduce);
            const back = analyse(await hop(page, "#/"), "back", c.reduce);
            const fwd2 = analyse(await hop(page, "#/browse"), "forward", c.reduce);
            const back2 = analyse(await hop(page, "#/"), "back", c.reduce);
            const faults = [
                ...fwd.faults.map((x) => `fwd→palettes ${x}`),
                ...back.faults.map((x) => `back→home ${x}`),
                ...fwd2.faults.map((x) => `fwd→browse ${x}`),
                ...back2.faults.map((x) => `back→home ${x}`),
                ...(c.reduce ? [] : sideFaults(fwd, back)),
            ];
            if (FRAMES && !c.reduce) {
                await midFrame(page, "#/palettes", 110, `${outdir}/${tag}-fwd-110ms.png`);
                await midFrame(page, "#/", 140, `${outdir}/${tag}-back-140ms.png`);
            }
            if (FRAMES && c.reduce) await page.screenshot({ path: `${outdir}/${tag}-rest.png` });
            results.push({ cell: tag, faults, fwd: fwd.report, back: back.report, fwd2: fwd2.report, back2: back2.report });
            console.log(`${tag}: ${faults.length ? "RED " + faults.length : "GREEN"} · p95 ${fwd.report.p95}/${back.report.p95} ms · overlap ${fwd.report.overlap}/${back.report.overlap}`);
            for (const f of faults.slice(0, 6)) console.log(`   ${f}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
    stopServer();
}
writeFileSync(`${outdir}/probe.json`, JSON.stringify(results, null, 1));
const red = results.filter((r) => r.faults.length).length;
console.log(`VERDICT ${red ? "RED" : "GREEN"} (${red}/${results.length} cells faulted)`);
process.exitCode = red ? 1 : 0;
