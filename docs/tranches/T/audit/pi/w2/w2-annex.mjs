/**
 * T.W2 close — the O-3 HEADED REAL-GPU ANNEX (+ O-26 headed measurement,
 * owner eye-judge frames, boot screencast, font network log).
 * Drives :8090 headed on the real GPU (no SwiftShader args).
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = "http://localhost:8090";
const OUT = "docs/tranches/T/audit/pi/w2";
mkdirSync(`${OUT}/owner-frames`, { recursive: true });
mkdirSync(`${OUT}/screencast`, { recursive: true });

const SEEDS = {
    green: "oklch(0.7 0.18 145)",
    warm: "oklch(0.66 0.16 28)",
    neutral: "#808080",
};

const browser = await chromium.launch({ headless: false, channel: "chromium" });
const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

async function newPage(scheme, opts = {}) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: scheme,
        ...opts,
    });
    const page = await ctx.newPage();
    return { ctx, page };
}

async function renderer(page) {
    return page.evaluate(() => {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2");
        if (!gl) return "(no webgl2)";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "(masked)";
    });
}

async function sampleCanvasMean(page) {
    // Composited screenshot of the aurora top band → mean RGB.
    const box = await page.locator('[data-testid="atmosphere-canvas"]').boundingBox();
    const clip = {
        x: Math.round(box.x + box.width * 0.15),
        y: Math.round(box.y + box.height * 0.03),
        width: Math.round(box.width * 0.7),
        height: Math.round(box.height * 0.12),
    };
    const png = await page.screenshot({ clip });
    return { png, clip };
}

function decodeMean(pngBuf) {
    // cheap: use sharp? not available. We reuse the e2e decoder via dynamic import.
    return import(
        process.cwd() + "/e2e/smoke/fixtures/frame-diff.ts"
    ).then(() => null);
}

// ── Instead of re-decoding PNGs here, use in-page pixel sampling via a 2D
//    canvas drawImage of the screenshot — simpler: evaluate mean color of the
//    displayed region through html2canvas-like readback is NOT available.
//    So: use CDP screenshot + the same decoder the e2e fixture uses, via tsx?
//    Simplest robust: score diffs on raw PNG bytes is wrong. We instead open
//    a data URL in a canvas INSIDE the page and read pixels there.
async function meanRgbOf(page, pngBuf) {
    return page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        let r = 0, gg = 0, b = 0;
        const n = c.width * c.height;
        for (let i = 0; i < d.length; i += 4) {
            r += d[i]; gg += d[i + 1]; b += d[i + 2];
        }
        return [r / n, gg / n, b / n];
    }, pngBuf.toString("base64"));
}

async function meanAbsDiffOf(page, aBuf, bBuf) {
    return page.evaluate(async ([a64, b64]) => {
        const load = async (s) => {
            const img = new Image();
            img.src = "data:image/png;base64," + s;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.width;
            c.height = img.height;
            const g = c.getContext("2d");
            g.drawImage(img, 0, 0);
            return g.getImageData(0, 0, c.width, c.height).data;
        };
        const A = await load(a64);
        const B = await load(b64);
        let sum = 0;
        const n = Math.min(A.length, B.length) / 4;
        for (let i = 0; i < n * 4; i += 4) {
            sum += Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
        }
        return sum / (n * 3);
    }, [aBuf.toString("base64"), bBuf.toString("base64")]);
}

function srgbToOklch(r255, g255, b255) {
    const lin = (c) => {
        const cs = c / 255;
        return cs <= 0.04045 ? cs / 12.92 : ((cs + 0.055) / 1.055) ** 2.4;
    };
    const r = lin(r255), g = lin(g255), b = lin(b255);
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    return {
        L,
        C: Math.hypot(a, bb),
        h: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360,
    };
}

// ═══ LEG 1 — O-3 headed cold-load, BOTH schemes (returning-user natural
//     precondition: prime via a first visit, then bare reload) ═══
for (const scheme of ["light", "dark"]) {
    const { ctx, page } = await newPage(scheme);
    // Font network log rides the light leg.
    const fontRequests = [];
    page.on("request", (r) => {
        const u = r.url();
        if (/fonts\.(googleapis|gstatic)\.com/.test(u) || /\.woff2?/.test(u))
            fontRequests.push(u);
    });
    await page.goto(`${BASE}/#/?space=oklch&color=${encodeURIComponent(SEEDS.warm)}`);
    await page.waitForSelector("main");
    await page.waitForTimeout(1500); // write-throughs land
    await page.goto(BASE + "/");
    await page.waitForSelector("main");
    await page.waitForTimeout(3000); // settle post-arm
    const ren = await renderer(page);
    const { png } = await sampleCanvasMean(page);
    const [r, g, b] = await meanRgbOf(page, png);
    const { L, C, h } = srgbToOklch(r, g, b);
    const marks = await page.evaluate(() =>
        Object.fromEntries(
            performance
                .getEntriesByType("mark")
                .filter((m) => m.name.startsWith("overture:"))
                .map((m) => [m.name.slice(9), Math.round(m.startTime)]),
        ),
    );
    log(`[O-3 ${scheme}] renderer=${ren}`);
    log(
        `[O-3 ${scheme}] post-arm field OKLCh L=${L.toFixed(3)} C=${C.toFixed(3)} h=${h.toFixed(1)}° (seed warm h≈28°) — chromatic=${C >= 0.03 ? "PASS" : "FAIL"} hue-family=${Math.min(Math.abs(h - 28), 360 - Math.abs(h - 28)) <= 30 ? "PASS" : "FAIL"}`,
    );
    log(`[O-3 ${scheme}] beat marks: ${JSON.stringify(marks)}`);
    log(
        `[O-3 ${scheme}] font requests (${fontRequests.length}): ${fontRequests
            .map((u) => u.replace(BASE, ""))
            .join(", ")} — google-fonts=${fontRequests.filter((u) => /googleapis|gstatic/.test(u)).length} (must be 0)`,
    );
    await ctx.close();
}

// ═══ LEG 2 — the PRM-ON instant-states leg (gate 5b), per scheme ═══
// THE LAW SHAPE (T.W2 §Hard gate 5b): first content frame ≡ the settled
// composition — the FIELD is present at terminal opacity from B0 (App.vue
// pins the canvas opacity to 1 under PRM), no beat-family animation ever
// runs (overture-* / plate-land / blob-emerge), and nothing animates the
// canvas itself. SCOPING RECORD (the 2026-07-10 annex FAIL's root): the
// PRODUCER's PRM doctrine (glass-ui dist/styles/utilities/a11y-overrides.css)
// FORCES `transition: opacity/color/… 0.1s !important` onto every un-marked
// element as designed state-change fades (the same register as the demo's
// own overlay carve-out, animations.css) — those producer micro-fades on
// dock internals are the producer's sanctioned PRM grammar, NOT an overture
// beat state; they are CENSUSED here (observation), never gated. The demo's
// breach class — a fade on the FIELD or any beat animation — stays the gate.
for (const scheme of ["light", "dark"]) {
    const { ctx, page } = await newPage(scheme, { reducedMotion: "reduce" });
    await page.goto(`${BASE}/#/?space=oklch&color=${encodeURIComponent(SEEDS.warm)}`);
    await page.waitForSelector("main");
    await page.waitForTimeout(1500);
    await page.goto(BASE + "/");
    await page.waitForSelector("main");
    const states = [];
    for (let i = 0; i < 12; i++) {
        const s = await page.evaluate(() => {
            const canvas = document.querySelector('[data-testid="atmosphere-canvas"]');
            const anims = document.getAnimations({ subtree: true });
            const beat = anims.filter((a) =>
                /overture|plate-land|blob-emerge/.test(
                    String(a.animationName ?? a.transitionProperty ?? ""),
                ),
            );
            const onCanvas = anims.filter((a) => a.effect?.target === canvas);
            const producerFades = anims.filter(
                (a) =>
                    a.effect?.target !== canvas &&
                    /opacity/.test(String(a.transitionProperty ?? "")),
            );
            return {
                op: canvas ? getComputedStyle(canvas).opacity : "?",
                beat: beat.length,
                onCanvas: onCanvas.length,
                producerFades: producerFades.length,
            };
        });
        states.push(s);
        await page.waitForTimeout(150);
    }
    const opacities = [...new Set(states.map((s) => s.op))];
    const beatMax = Math.max(...states.map((s) => s.beat));
    const canvasMax = Math.max(...states.map((s) => s.onCanvas));
    const fadeMax = Math.max(...states.map((s) => s.producerFades));
    const pass =
        opacities.length === 1 &&
        opacities[0] === "1" &&
        beatMax === 0 &&
        canvasMax === 0;
    log(
        `[5b PRM ${scheme}] canvas opacity states over settle: {${opacities.join(", ")}} (law: exactly {1} — terminal from the first frame) · beat-family animations max: ${beatMax} (must be 0) · animations targeting the canvas max: ${canvasMax} (must be 0) · producer state-fade census (a11y-overrides doctrine, observation): ${fadeMax} → ${pass ? "PASS" : "FAIL"}`,
    );
    await ctx.close();
}

// ═══ LEG 3 — O-26 headed perceptibility (real GPU; mid-C seed) ═══
{
    const { ctx, page } = await newPage("light");
    await page.goto(`${BASE}/#/?space=oklch&color=${encodeURIComponent(SEEDS.warm)}`);
    await page.waitForSelector("main");
    await page.waitForTimeout(3500); // settle
    // Park the pointer away.
    await page.mouse.move(10, 890);
    const shot = async () => (await sampleCanvasMean(page)).png;
    const c0 = await shot();
    await page.waitForTimeout(2000);
    const c1 = await shot();
    const calm = await meanAbsDiffOf(page, c0, c1);
    const m0 = await shot();
    await page.waitForTimeout(5000);
    const m1 = await shot();
    await page.waitForTimeout(5000);
    const m2 = await shot();
    const mig = Math.max(
        await meanAbsDiffOf(page, m0, m1),
        await meanAbsDiffOf(page, m1, m2),
        await meanAbsDiffOf(page, m0, m2),
    );
    // 60s non-recurrence: frames every 5s; no two 5s-apart WINDOW pairs < 1/255.
    const frames = [];
    for (let i = 0; i < 12; i++) {
        frames.push(await shot());
        await page.waitForTimeout(5000);
    }
    let minPair = Infinity;
    for (let i = 0; i + 1 < frames.length; i++) {
        const d = await meanAbsDiffOf(page, frames[i], frames[i + 1]);
        minPair = Math.min(minPair, d);
    }
    log(
        `[O-26 headed] calm 2s = ${calm.toFixed(2)}/255 (< 2 → ${calm < 2 ? "PASS" : "FAIL"}) · 10s migration = ${mig.toFixed(2)}/255 (≥ 4 → ${mig >= 4 ? "PASS" : "FAIL"}) · 60s min 5s-apart pair = ${minPair.toFixed(2)}/255 (≥ 1 → ${minPair >= 1 ? "PASS" : "FAIL"})`,
    );
    await ctx.close();
}

// ═══ LEG 4 — owner eye-judge frames: green/warm/neutral × light/dark ═══
for (const [name, seed] of Object.entries(SEEDS)) {
    for (const scheme of ["light", "dark"]) {
        const { ctx, page } = await newPage(scheme);
        await page.goto(`${BASE}/#/?space=oklch&color=${encodeURIComponent(seed)}`);
        await page.waitForSelector("main");
        await page.waitForTimeout(4000); // full settle incl. blob emerge
        await page.screenshot({
            path: `${OUT}/owner-frames/${name}-${scheme}.png`,
            fullPage: false,
        });
        await ctx.close();
        console.log(`[frames] ${name}-${scheme}.png archived`);
    }
}

// ═══ LEG 5 — the boot screencast (returning warm, light) ═══
{
    const { ctx, page } = await newPage("light");
    await page.goto(`${BASE}/#/?space=oklch&color=${encodeURIComponent(SEEDS.warm)}`);
    await page.waitForSelector("main");
    await page.waitForTimeout(1500);
    const cdp = await ctx.newCDPSession(page);
    const frames = [];
    cdp.on("Page.screencastFrame", async (f) => {
        frames.push({ t: f.metadata.timestamp, data: f.data });
        await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
    });
    await cdp.send("Page.startScreencast", {
        format: "png",
        maxWidth: 900,
        maxHeight: 563,
        everyNthFrame: 2,
    });
    await page.goto(BASE + "/");
    await page.waitForTimeout(4500);
    await cdp.send("Page.stopScreencast");
    const t0 = frames.length ? frames[0].t : 0;
    for (const f of frames) {
        const ms = Math.round((f.t - t0) * 1000);
        writeFileSync(
            `${OUT}/screencast/f${String(ms).padStart(5, "0")}ms.png`,
            Buffer.from(f.data, "base64"),
        );
    }
    log(`[screencast] ${frames.length} frames archived (returning warm/light boot)`);
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/headed-annex-log.txt`, report.join("\n") + "\n");
console.log("ANNEX COMPLETE");
