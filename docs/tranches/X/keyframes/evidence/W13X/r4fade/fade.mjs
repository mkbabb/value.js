// SERVED MODEL: claude-opus-5-5
// KF.W13X.r4fade served falsifier (UIA-KF-125 motion half; COHESION §0fa item 4). Headless
// real Chrome (§0ei), fresh context per cell, one browser closed in a finally.
//   F1 HARD-LOAD FADE: a cold hard load of `#/<scene>` with the scene chunk held, so the
//      keyed <Suspense> fallback stands; release it, and sample `.scene-host`'s computed
//      opacity on every frame from the fallback's detach. GREEN iff the resolve runs the
//      house swap fade: the first sampled frame after detach reads < 0.5 and the trace rises
//      to >= 0.99 (a spring rise over >= 3 frames). The fallback's own minimum opacity is
//      recorded beside it, not gated (the boot's key flip fades the fallback in).
//   F2 REDUCED MOTION: the same under `reducedMotion: "reduce"`: GREEN iff every frame from
//      detach reads 1 (the swap's own snap: no fade, no blank).
// Usage: node fade.mjs <base> <tag> [framesDir]   (env S="spring,amiga", W="1440x900")
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const scenes = (process.env.S || "spring,amiga").split(",");
const [w, h] = (process.env.W || "1440x900").split("x").map(Number);
const CHUNK = { spring: "SpringScene", easing: "EasingScene", amiga: "AmigaScene", square: "SquareScene", sequence: "SequenceScene" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Per-frame trace, installed before any page script: opacity of the scene host and whether
// the fallback is mounted, from the first frame the host exists.
const INSTR = () => {
    window.__tr = [];
    const t0 = performance.now();
    const tick = () => {
        const host = document.querySelector(".scene-host");
        if (host) window.__tr.push({ t: Math.round(performance.now() - t0), o: Number(getComputedStyle(host).opacity), sk: !!document.querySelector(".scene-skeleton") });
        if (window.__tr.length < 4000) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};
const res = [];
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
    for (const reduce of [false, true]) for (const scene of scenes) {
        const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: "light", reducedMotion: reduce ? "reduce" : "no-preference" });
        try {
            const p = await ctx.newPage();
            await p.addInitScript(INSTR);
            let release; const gate = new Promise((r) => (release = r));
            await p.route(new RegExp(`/scenes/${scene}/${CHUNK[scene]}[.-]`), async (r) => { await gate; await r.continue(); });
            await p.goto(`${base}#/${scene}`, { waitUntil: "domcontentloaded" });
            const seen = await p.waitForSelector(".scene-skeleton", { timeout: 30000 }).then(() => true, () => false);
            await sleep(600);
            if (outDir && !reduce) await p.screenshot({ path: `${outDir}/${tag}-${scene}-fallback.png` });
            release();
            await p.waitForSelector(".scene-skeleton", { state: "detached", timeout: 30000 }).catch(() => {});
            if (outDir && !reduce) await p.screenshot({ path: `${outDir}/${tag}-${scene}-resolve-early.png` });
            await sleep(1500);
            if (outDir) await p.screenshot({ path: `${outDir}/${tag}-${scene}${reduce ? "-reduce" : ""}-settled.png` });
            const settled = await p.evaluate(() => Number(getComputedStyle(document.querySelector(".scene-host")).opacity));
            const tr = await p.evaluate(() => window.__tr);
            const det = tr.findIndex((f, i) => i > 0 && tr[i - 1].sk && !f.sk);
            const fb = tr.filter((f) => f.sk).map((f) => f.o);
            const after = det < 0 ? [] : tr.slice(det, det + 40).map((f) => Math.round(f.o * 1000) / 1000);
            const rising = after.filter((o) => o < 0.99).length;
            const ok = !seen || det < 0 ? false
                : reduce ? after.every((o) => o === 1) && settled === 1
                : after[0] < 0.5 && rising >= 3 && settled >= 0.99;
            res.push({ check: reduce ? "F2" : "F1", scene, w, h, seen, detachFrame: det, fallbackMin: fb.length ? Math.min(...fb) : null, after, settled, ok });
            console.log(`${reduce ? "F2" : "F1"} ${scene} ${w}x${h} seen=${seen} fallbackMin=${fb.length ? Math.min(...fb) : "-"} after[0..9]=${JSON.stringify(after.slice(0, 10))} sub1Frames=${rising} settled=${settled} -> ${ok ? "GREEN" : "RED"}`);
        } finally { await ctx.close(); }
    }
} finally { await b.close(); }
console.log(`TOTAL ${res.filter((r) => r.ok).length}/${res.length} GREEN`);
fs.writeFileSync(`${tag}.json`, JSON.stringify(res, null, 1));
