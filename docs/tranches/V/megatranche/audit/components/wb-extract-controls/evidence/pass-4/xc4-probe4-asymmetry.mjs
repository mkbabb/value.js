// CHALLENGE-C pass-4 probe 4 — the two controls in ONE row carry the SAME
// certified ink (`trackInk`) but respond to a change of it differently:
//   · k rail   — inline style on a bare <div>, no transition → snaps
//   · kC track — glass-ui `.slider-track`, `transition: background .2s` → eases
// Question 1: is the desync real and measurable?
// Question 2: are the eased INTERMEDIATES certified? (certification is computed
//   for the endpoint; contrast is not convex along an sRGB interpolation.)
// Driver: the app's own `?color=` URL contract (useColorUrl.ts:27,74) — a
// same-route query change, no remount, no source edits.
import { webkit } from "playwright";

const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));

await page.goto("http://localhost:9000/#/extract?color=oklch(0.75%200.18%20140)", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(3500);

// contrast helpers + the plate referent, resolved once
await page.evaluate(() => {
    const cvs = document.createElement("canvas"); cvs.width = cvs.height = 1;
    const g = cvs.getContext("2d", { willReadFrequently: true });
    window.__flat = (css, ground) => {
        g.fillStyle = ground; g.fillRect(0, 0, 1, 1);
        g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0, 0, 1, 1);
        const d = g.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]];
    };
    const relL = ([r, gg, bb]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(bb); };
    window.__contrast = (a, b) => { const [x, y] = [relL(a), relL(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
    // plate = the controls' painted ancestor, composited over the page ambient
    const kc = document.querySelector('[data-o18="extract-kc"]');
    let plate = null;
    for (let n = kc.parentElement; n && n !== document.body; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") { plate = bg; break; }
    }
    const ambient = getComputedStyle(document.body).backgroundColor;
    window.__plateRGB = window.__flat(plate ?? ambient, ambient);
    window.__plateCss = plate;
});
out("plate referent", await page.evaluate(() => ({ plateCss: window.__plateCss, plateRGB: window.__plateRGB })));

out("BEFORE — the two elements' transition declarations", await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const track = document.querySelector('[data-o18="extract-kc"] .slider-track');
    const g = (el) => { const cs = getComputedStyle(el); return { transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration, backgroundColor: cs.backgroundColor }; };
    return { k_rail: g(rail), kC_track: g(track) };
}));

// start the sampler, THEN flip the colour via the URL contract
await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const track = document.querySelector('[data-o18="extract-kc"] .slider-track');
    window.__s = []; window.__on = true; window.__t0 = performance.now();
    const loop = () => {
        if (!window.__on) return;
        const rb = getComputedStyle(rail).backgroundColor;
        const tb = getComputedStyle(track).backgroundColor;
        window.__s.push({
            dt: +(performance.now() - window.__t0).toFixed(1),
            rail: rb, track: tb,
            railC: +window.__contrast(window.__flat(rb, window.__plateCss), window.__plateRGB).toFixed(3),
            trackC: +window.__contrast(window.__flat(tb, window.__plateCss), window.__plateRGB).toFixed(3),
        });
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
});

// same-route query change → useColorUrl watcher fires → new live pick
await page.evaluate(() => { location.hash = "#/extract?color=oklch(0.45%200.22%20265)"; });
await page.waitForTimeout(1400);

out("DESYNC + INTERMEDIATE CERTIFICATION", await page.evaluate(() => {
    window.__on = false;
    const s = window.__s;
    const changed = s.filter((x, i) => i > 0 && (x.rail !== s[i - 1].rail || x.track !== s[i - 1].track));
    const firstChange = s.findIndex((x, i) => i > 0 && x.rail !== s[i - 1].rail);
    const railStable = firstChange >= 0 ? s.slice(firstChange).find((x, i, a) => i > 0 && x.rail === a[i - 1].rail) : null;
    const desync = s.filter((x) => x.rail !== x.track && x.track !== "rgba(0, 0, 0, 0)");
    const distinctTrack = [...new Set(s.map((x) => x.track))];
    const distinctRail = [...new Set(s.map((x) => x.rail))];
    const trackCs = s.map((x) => x.trackC).filter(Number.isFinite);
    const railCs = s.map((x) => x.railC).filter(Number.isFinite);
    return {
        frames: s.length,
        distinctRailValues: distinctRail.length,
        distinctTrackValues: distinctTrack.length,
        RAIL_snapped: distinctRail.length <= 2,
        TRACK_interpolated: distinctTrack.length > 2,
        framesWhereRailAndTrackDisagree: desync.length,
        desyncWindowMs: desync.length ? +(desync[desync.length - 1].dt - desync[0].dt).toFixed(1) : 0,
        GRAPHICS_FLOOR: 3,
        MIN_track_contrast_over_the_interpolation: trackCs.length ? Math.min(...trackCs) : null,
        MIN_rail_contrast: railCs.length ? Math.min(...railCs) : null,
        track_frames_below_floor: trackCs.filter((c) => c < 3).length,
        endpointContrasts: { first: s[0], last: s[s.length - 1] },
        trackTrajectorySample: distinctTrack.slice(0, 8),
    };
}));

out("pageErrors", pageErrors);
await b.close();
