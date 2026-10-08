// SERVED MODEL: claude-opus-5-5
// KF.W13X.esc3 served falsifier S1 — ESC-spring-1 (KFA-191, KF-W13.md addendum (g), COHESION §0er).
// Headless real Chrome (§0ei), fresh context per cell. On #/spring (Sweep channel) at 1440x900 and
// 390x844, light and dark: the stage trace's axis label (`<H> ms`) equals the transport rail's
// aria-valuemax; playing, the scrubber reaches the horizon (>= 0.95 H) and then FALLS back along
// the same axis (a mirror, not a sawtooth: no single-sample drop > 0.25 H while descending
// counts as a jump; a jump from >= 0.6 H to <= 0.15 H is the sawtooth signature).
// Usage: node s1.mjs <base> <tag> [framesDir]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = [];
for (const [w, h, scheme] of [[1440, 900, "light"], [1440, 900, "dark"], [390, 844, "light"]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const p = await ctx.newPage();
    await p.goto(`${base}#/spring`, { waitUntil: "load" });
    await p.waitForSelector(".plot-tick", { timeout: 30000 });
    await sleep(2000);
    const axis = await p.evaluate(() => {
        const ticks = [...document.querySelectorAll(".plot-tick:not(.plot-tick--value)")].map((e) => e.textContent.trim());
        const last = ticks.find((t) => /ms$/.test(t));
        return last ? Number(last.replace(/[^0-9.]/g, "")) : null;
    });
    const rail = async () => p.evaluate(() => {
        const s = document.querySelector('[role="slider"][aria-label="Scrub animation timeline"]');
        return s ? { now: Number(s.getAttribute("aria-valuenow")), max: Number(s.getAttribute("aria-valuemax")) } : null;
    });
    const r0 = await rail();
    if (outDir) await p.screenshot({ path: `${outDir}/${tag}-s1-${w}-${scheme}-rest.png` });
    // Play: a real pointer press on the transport's Play button (Space, the shortcut, where
    // the button is not reachable at this size).
    try {
        await p.getByRole("button", { name: "Play animation" }).first().click({ timeout: 5000 });
    } catch {
        await p.keyboard.press("Space");
    }
    const played = await p.evaluate(() => !!document.querySelector('button[aria-label="Pause animation"]'));
    const samples = [];
    const t0 = Date.now();
    const span = (axis ?? 2000) * 2 + 600;
    let shotMirror = false;
    while (Date.now() - t0 < span) {
        const r = await rail();
        samples.push({ ms: Date.now() - t0, now: r?.now ?? null });
        const n = samples.length;
        if (outDir && !shotMirror && n > 3 && samples[n - 1].now < samples[n - 2].now && samples[n - 1].now > 0.5 * (axis ?? 2000) && samples[n - 1].now < 0.8 * (axis ?? 2000)) {
            shotMirror = true;
            await p.screenshot({ path: `${outDir}/${tag}-s1-${w}-${scheme}-playing.png` });
        }
        await sleep(40);
    }
    const H = axis ?? NaN;
    const vals = samples.map((s) => s.now).filter((v) => Number.isFinite(v));
    const peak = Math.max(...vals);
    let sawtooth = 0;
    let mirrorFall = 0;
    for (let i = 1; i < vals.length; i++) {
        if (vals[i - 1] >= 0.6 * H && vals[i] <= 0.15 * H) sawtooth++;
        if (vals[i] < vals[i - 1] && vals[i - 1] - vals[i] < 0.25 * H) mirrorFall++;
    }
    const ok = {
        axisEqualsRail: r0 != null && axis === r0.max,
        reachesHorizon: peak >= 0.95 * H,
        noSawtooth: sawtooth === 0,
        mirrors: mirrorFall >= 5,
    };
    res.push({ cell: `${w}x${h}-${scheme}`, played, axis, railMax: r0?.max, peak, sawtooth, mirrorFall, n: vals.length, ok: Object.values(ok).every(Boolean), preds: ok });
    await ctx.close();
}
await b.close();
console.log(JSON.stringify({ tag, base, pass: res.filter((r) => r.ok).length, of: res.length, res }));
