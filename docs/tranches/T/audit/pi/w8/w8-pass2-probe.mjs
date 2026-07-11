/**
 * T.W8 · CRITIQUE PASS 2 (boot / atmosphere / blob + ConfigSliderPane + T-48
 * motion) — the HEADED REAL-GPU probe (O-3 class; probe-only, no writes to
 * the app tree). Drives the LANE servers :8610 (dev) / :8611 (built gh-pages)
 * — the owner's :9000 is never touched.
 *
 * Legs:
 *   1 · THE BOOT SCREENCAST (the W8 package deliverable): cold + returning ×
 *       light + dark on the BUILT bundle — CDP screencast frame series named
 *       by offset from the page's timeOrigin (frames align with the beat
 *       marks), archived under boot/. Beat marks + Q2 settle read per run.
 *   2 · The DEV-instrument settle numbers (marks only) — the R8 bracket's
 *       instrument-comparison arm.
 *   3 · O-26 HEADED (real GPU): calm 2s / 10s migration / 60s non-recurrence
 *       over the live field (warm mid-C seed) + the R3 NEUTRAL-seed whisper
 *       re-read (field chroma + migration + archived frames — bracket input).
 *   4 · BLOB (dpr2): boot backing-store ratio post-emerge (the R2 cure
 *       verify), the park-freeze read, hover-mood frame-diff (O-12 metric),
 *       seat geometry + dpr2 corner crops (the R7/C-3 bracket's re-take on
 *       the now-crisp bead).
 *   5 · ConfigSliderPane POPULATION (M-34 re-judge): Atmosphere + Blob views
 *       × both schemes @1440 + the 390 touch-rung read; well/ink/row probes +
 *       archived pane shots.
 *   6 · T-48 MOTION: mid-flight CDP screencast captures over real pane swaps
 *       (built bundle, both schemes) + rAF inter-frame deltas + long tasks +
 *       one devtools.timeline trace (Layout-event count over a swap window).
 *
 * PNGs are gitignored-by-class (the standing owner-screenshots convention);
 * this script + the log txt are the committed record.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const DEV = "http://localhost:8610";
const BUILT = "http://localhost:8611";
const OUT = "docs/tranches/T/audit/pi/w8";
for (const d of ["boot", "field", "blob", "config", "motion"])
    mkdirSync(`${OUT}/${d}`, { recursive: true });

const SEEDS = {
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

const renderer = (page) =>
    page.evaluate(() => {
        const gl = document.createElement("canvas").getContext("webgl2");
        if (!gl) return "(no webgl2)";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "(masked)";
    });

const beatMarks = (page) =>
    page.evaluate(() =>
        Object.fromEntries(
            performance
                .getEntriesByType("mark")
                .filter((m) => m.name.startsWith("overture:"))
                .map((m) => [m.name.slice(9), Math.round(m.startTime)]),
        ),
    );

async function fieldClip(page) {
    const box = await page
        .locator('[data-testid="atmosphere-canvas"]')
        .boundingBox();
    return {
        x: Math.round(box.x + box.width * 0.15),
        y: Math.round(box.y + box.height * 0.03),
        width: Math.round(box.width * 0.7),
        height: Math.round(box.height * 0.12),
    };
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
        for (let i = 0; i < n * 4; i += 4)
            sum +=
                Math.abs(A[i] - B[i]) +
                Math.abs(A[i + 1] - B[i + 1]) +
                Math.abs(A[i + 2] - B[i + 2]);
        return sum / (n * 3);
    }, [aBuf.toString("base64"), bBuf.toString("base64")]);
}

async function meanOklchOf(page, pngBuf) {
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
        const lin = (x) => {
            const cs = x / n / 255;
            return cs <= 0.04045 ? cs / 12.92 : ((cs + 0.055) / 1.055) ** 2.4;
        };
        const R = lin(r), G = lin(gg), B = lin(b);
        const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
        const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
        const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
        const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
        const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
        const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
        const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
        return {
            L: +L.toFixed(3),
            C: +Math.hypot(a, bb).toFixed(4),
            h: +((((Math.atan2(bb, a) * 180) / Math.PI) + 360) % 360).toFixed(1),
        };
    }, pngBuf.toString("base64"));
}

/** CDP screencast wrapper: start → run fn → stop → frames written to dir,
 *  named by offset from the page's timeOrigin (aligns with beat marks). */
async function screencast(ctx, page, dir, fn, ms) {
    mkdirSync(dir, { recursive: true });
    const cdp = await ctx.newCDPSession(page);
    const frames = [];
    cdp.on("Page.screencastFrame", async (f) => {
        frames.push({ t: f.metadata.timestamp, data: f.data });
        await cdp
            .send("Page.screencastFrameAck", { sessionId: f.sessionId })
            .catch(() => {});
    });
    await cdp.send("Page.startScreencast", {
        format: "png",
        maxWidth: 1024,
        maxHeight: 640,
        everyNthFrame: 1,
    });
    await fn();
    await page.waitForTimeout(ms);
    await cdp.send("Page.stopScreencast").catch(() => {});
    const origin = await page.evaluate(() => performance.timeOrigin);
    let n = 0;
    for (const f of frames) {
        const off = Math.round(f.t * 1000 - origin);
        if (off < -100) continue; // pre-navigation blank frames
        writeFileSync(
            `${dir}/f${String(Math.max(off, 0)).padStart(5, "0")}ms.png`,
            Buffer.from(f.data, "base64"),
        );
        n++;
    }
    await cdp.detach().catch(() => {});
    return n;
}

// ═══ LEG 1 — THE BOOT SCREENCAST (built bundle; cold + returning × schemes) ═══
for (const scheme of ["light", "dark"]) {
    // COLD — fresh context, no storage; screencast armed before the goto.
    {
        const { ctx, page } = await newPage(scheme);
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e)));
        page.on("console", (m) => {
            if (m.type() === "error") errors.push(m.text());
        });
        const dir = `${OUT}/boot/cold-${scheme}`;
        const nf = await screencast(ctx, page, dir, () => page.goto(BUILT + "/"), 4200);
        const marks = await beatMarks(page);
        const settle = (marks.b2 ?? 0) + 900;
        log(
            `[boot cold-${scheme}] renderer=${await renderer(page)} · marks=${JSON.stringify(marks)} · field-settle≈${settle}ms (Q2 bracket [1400,1700]) · frames=${nf} · console-errors=${errors.length}${errors.length ? " :: " + errors.slice(0, 3).join(" | ") : ""}`,
        );
        await ctx.close();
    }
    // RETURNING — primed storage, second navigation under screencast.
    {
        const { ctx, page } = await newPage(scheme);
        await page.goto(`${BUILT}/#/?space=oklch&color=${encodeURIComponent(SEEDS.warm)}`);
        await page.waitForSelector("main");
        await page.waitForTimeout(2500); // persists ground + settles
        const dir = `${OUT}/boot/returning-${scheme}`;
        const nf = await screencast(ctx, page, dir, () => page.goto(BUILT + "/"), 4200);
        const marks = await beatMarks(page);
        const settle = (marks.b2 ?? 0) + 900;
        log(
            `[boot returning-${scheme}] marks=${JSON.stringify(marks)} · field-settle≈${settle}ms (Q2 bracket [1400,1700]) · frames=${nf}`,
        );
        await ctx.close();
    }
}

// ═══ LEG 2 — the DEV-instrument settle numbers (R8 comparison arm) ═══
for (const mode of ["cold", "returning"]) {
    const { ctx, page } = await newPage("light");
    if (mode === "returning") {
        await page.goto(`${DEV}/#/?space=oklch&color=${encodeURIComponent(SEEDS.warm)}`);
        await page.waitForSelector("main");
        await page.waitForTimeout(2500);
    }
    await page.goto(DEV + "/");
    await page.waitForSelector("main");
    await page.waitForTimeout(3500);
    const marks = await beatMarks(page);
    log(
        `[dev-instrument ${mode}-light] marks=${JSON.stringify(marks)} · field-settle≈${(marks.b2 ?? 0) + 900}ms`,
    );
    await ctx.close();
}

// ═══ LEG 3 — O-26 HEADED (warm) + the R3 neutral whisper re-read ═══
{
    const { ctx, page } = await newPage("light");
    await page.goto(`${BUILT}/#/?space=oklch&color=${encodeURIComponent(SEEDS.warm)}`);
    await page.waitForSelector("main");
    await page.waitForTimeout(3500);
    await page.mouse.move(10, 890);
    const clip = await fieldClip(page);
    const shot = () => page.screenshot({ clip });
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
    const frames = [];
    for (let i = 0; i < 12; i++) {
        frames.push(await shot());
        await page.waitForTimeout(5000);
    }
    let minPair = Infinity;
    for (let i = 0; i + 1 < frames.length; i++)
        minPair = Math.min(minPair, await meanAbsDiffOf(page, frames[i], frames[i + 1]));
    log(
        `[O-26 headed · warm] calm 2s = ${calm.toFixed(3)}/255 (<2 → ${calm < 2 ? "PASS" : "FAIL"}) · 10s migration = ${mig.toFixed(2)}/255 (≥4 → ${mig >= 4 ? "PASS" : "FAIL"}) · 60s min 5s-apart pair = ${minPair.toFixed(2)}/255 (≥1 → ${minPair >= 1 ? "PASS" : "FAIL"})`,
    );
    await ctx.close();
}
for (const scheme of ["light", "dark"]) {
    const { ctx, page } = await newPage(scheme);
    await page.goto(`${BUILT}/#/?space=oklch&color=${encodeURIComponent(SEEDS.neutral)}`);
    await page.waitForSelector("main");
    await page.waitForTimeout(3500);
    await page.mouse.move(10, 890);
    const clip = await fieldClip(page);
    const f0 = await page.screenshot({ clip });
    const oklch = await meanOklchOf(page, f0);
    await page.waitForTimeout(10000);
    const f1 = await page.screenshot({ clip });
    const mig = await meanAbsDiffOf(page, f0, f1);
    await page.screenshot({ path: `${OUT}/field/neutral-${scheme}.png` });
    log(
        `[R3 neutral · ${scheme}] field band mean OKLCh L=${oklch.L} C=${oklch.C} h=${oklch.h}° · 10s migration = ${mig.toFixed(3)}/255 · frame=field/neutral-${scheme}.png`,
    );
    await ctx.close();
}

// ═══ LEG 4 — BLOB (dpr2; backing ratio · park · hover · seat crops) ═══
for (const scheme of ["light", "dark"]) {
    const { ctx, page } = await newPage(scheme, { deviceScaleFactor: 2 });
    await page.goto(BUILT + "/");
    await page.waitForSelector('[data-testid="goo-blob-canvas"]');
    await page.waitForTimeout(1400); // post-emerge (500ms) + margin, pre-park (2.7s)
    const early = await page.evaluate(() => {
        const c = [...document.querySelectorAll('[data-testid="goo-blob-canvas"]')].at(-1);
        const b = c.getBoundingClientRect();
        return { w: c.width, h: c.height, bw: +b.width.toFixed(1), bh: +b.height.toFixed(1) };
    });
    const dpr = 2;
    const earlyRatio = early.w / (early.bw * dpr) * dpr; // backing px per CSS px
    await page.waitForTimeout(3200); // past park (2.0s idle + 0.7s pose)
    const parked = await page.evaluate(() => {
        const c = [...document.querySelectorAll('[data-testid="goo-blob-canvas"]')].at(-1);
        const b = c.getBoundingClientRect();
        return { w: c.width, h: c.height, bw: +b.width.toFixed(1) };
    });
    // Park-freeze read: two bead-box shots 1s apart must be ~identical.
    const anchor = await page.locator(".hero-blob-anchor").first().boundingBox();
    const bead = { x: anchor.x, y: anchor.y, width: anchor.width, height: anchor.height };
    const p0 = await page.screenshot({ clip: bead });
    await page.waitForTimeout(1000);
    const p1 = await page.screenshot({ clip: bead });
    const frozen = await meanAbsDiffOf(page, p0, p1);
    // Hover-mood: mean abs frame diff over the bead box within 400ms of hover-in.
    await page.mouse.move(anchor.x + anchor.width / 2, anchor.y + anchor.height / 2);
    await page.waitForTimeout(400);
    const h1 = await page.screenshot({ clip: bead });
    const hoverDiff = await meanAbsDiffOf(page, p1, h1);
    // Seat geometry + crops (the R7/C-3 bracket re-take input).
    const card = await page.locator(".pane-shell > *").first().boundingBox();
    const seat = await page.evaluate(() => {
        const el = document.querySelector(".hero-blob-anchor");
        const cs = getComputedStyle(el);
        return {
            seatVar: cs.getPropertyValue("--blob-seat").trim() || "(unset)",
            fp: cs.getPropertyValue("--blob-fp").trim() || "(unset)",
        };
    });
    const crop = {
        x: card.x + card.width * 0.45,
        y: card.y,
        width: card.width * 0.55,
        height: card.height * 0.5,
    };
    await page.screenshot({ clip: crop, path: `${OUT}/blob/seat-${scheme}-dpr2.png` });
    log(
        `[blob ${scheme} dpr2] backing early ${early.w}×${early.h} for ${early.bw}px box (ratio ${(early.w / early.bw).toFixed(3)}; full-res=2.0) · parked ${parked.w}×${parked.h} (ratio ${(parked.w / parked.bw).toFixed(3)}) · park-freeze 1s diff=${frozen.toFixed(3)}/255 · hover-mood 400ms diff=${hoverDiff.toFixed(2)}/255 (O-12 floor ≥6) · --blob-seat=${seat.seatVar} --blob-fp=${seat.fp} · anchor right/top gap to card right/top = ${(card.x + card.width - (anchor.x + anchor.width)).toFixed(1)}px / ${(anchor.y - card.y).toFixed(1)}px · crop=blob/seat-${scheme}-dpr2.png`,
    );
    await ctx.close();
}

// ═══ LEG 5 — ConfigSliderPane POPULATION (M-34 re-judge) ═══
for (const view of ["atmosphere", "blob"]) {
    for (const scheme of ["light", "dark"]) {
        const { ctx, page } = await newPage(scheme);
        await page.goto(`${BUILT}/#/${view}`);
        await page.waitForSelector(".config-console .configurator-row");
        await page.waitForTimeout(1200);
        const probe = await page.evaluate(() => {
            const well = document.querySelector(".console-well");
            const wcs = well ? getComputedStyle(well) : null;
            const rows = [...document.querySelectorAll(".config-console .configurator-row")];
            const sections = [...document.querySelectorAll(".config-section-title")].map(
                (e) => e.textContent.trim(),
            );
            const label = rows[0]?.querySelector("label");
            const mono = rows[0]?.querySelector(".font-mono");
            const combos = document.querySelectorAll(
                "main [role='combobox'], main button[aria-haspopup='listbox']",
            ).length;
            const bar = document.querySelector(".config-action-bar");
            return {
                wellPresent: !!well,
                wellBg: wcs?.backgroundColor,
                wellBlur: wcs?.backdropFilter || "none",
                rowCount: rows.length,
                sections,
                labelInk: label ? getComputedStyle(label).color : "(none)",
                valueInk: mono ? getComputedStyle(mono).color : "(none)",
                valueFont: mono ? getComputedStyle(mono).fontFamily.split(",")[0] : "",
                selectRows: combos,
                actionBar: !!bar,
                sliders: document.querySelectorAll(".config-console [role='slider']").length,
            };
        });
        await page
            .locator(".pane-wrapper--left, main")
            .first()
            .screenshot({ path: `${OUT}/config/${view}-${scheme}.png` })
            .catch(async () => page.screenshot({ path: `${OUT}/config/${view}-${scheme}.png` }));
        log(`[config ${view} ${scheme}] ${JSON.stringify(probe)}`);
        await ctx.close();
    }
}
// The 390 touch-rung read (light).
for (const view of ["atmosphere", "blob"]) {
    const { ctx, page } = await newPage("light", {
        viewport: { width: 390, height: 844 },
    });
    await page.goto(`${BUILT}/#/${view}`);
    await page.waitForSelector(".config-console .configurator-row");
    await page.waitForTimeout(1200);
    const rung = await page.evaluate(() => {
        const rows = [...document.querySelectorAll(".config-console .configurator-row")];
        const hs = rows.slice(0, 6).map((r) => {
            const track = r.querySelector("div:last-child");
            return track ? Math.round(track.getBoundingClientRect().height) : 0;
        });
        return { min: Math.min(...hs), heights: hs };
    });
    await page.screenshot({ path: `${OUT}/config/${view}-light-390.png` });
    log(
        `[config ${view} 390] slider-row heights=${JSON.stringify(rung.heights)} min=${rung.min}px (touch rung ≥44 <lg) · shot=config/${view}-light-390.png`,
    );
    await ctx.close();
}

// ═══ LEG 6 — T-48 MOTION: mid-flight captures + pacing + one layout trace ═══
async function openViewInline(page, name) {
    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await viewSelect.click();
    const option = page.getByRole("option", { name, exact: true });
    await option.click();
}
for (const scheme of ["light", "dark"]) {
    const { ctx, page } = await newPage(scheme);
    await page.goto(BUILT + "/");
    await page.waitForSelector('[data-testid="goo-blob-canvas"]');
    await page.waitForTimeout(3600); // settled + blob parked — no B4 coincidence
    const hops = [
        ["Home", "Gradient"],
        ["Gradient", "Mix"],
        ["Mix", "Browse"],
        ["Browse", "Home"],
    ];
    for (const [from, to] of hops) {
        // rAF pacing sampler armed over the swap window.
        await page.evaluate(() => {
            window.__deltas = [];
            let last = performance.now();
            const tick = (t) => {
                window.__deltas.push(t - last);
                last = t;
                if (window.__deltas.length < 220) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            window.__long = [];
            new PerformanceObserver((l) =>
                l.getEntries().forEach((e) => window.__long.push(Math.round(e.duration))),
            ).observe({ type: "longtask", buffered: false });
        });
        const dir = `${OUT}/motion/${scheme}-${from.toLowerCase()}-to-${to.toLowerCase()}`;
        await screencast(ctx, page, dir, () => openViewInline(page, to), 1300);
        const pacing = await page.evaluate(() => {
            const d = window.__deltas.slice(2); // discard the arm frame
            const sorted = [...d].sort((a, b) => a - b);
            const median = sorted[Math.floor(sorted.length / 2)] ?? 0;
            return {
                n: d.length,
                median: +median.toFixed(1),
                max: +Math.max(...d).toFixed(1),
                over3x: d.filter((x) => x > 3 * median).length,
                long: window.__long,
            };
        });
        log(
            `[motion ${scheme} ${from}→${to}] rAF median=${pacing.median}ms max=${pacing.max}ms over-3×=${pacing.over3x}/${pacing.n} longtasks=${JSON.stringify(pacing.long)} · frames→${dir.replace(OUT + "/", "")}`,
        );
    }
    // One traced swap (Home→Gradient) for the layout track — no screencast.
    if (scheme === "light") {
        await browser.startTracing(page, { categories: ["devtools.timeline"] });
        await openViewInline(page, "Gradient");
        await page.waitForTimeout(1100);
        const buf = await browser.stopTracing();
        const trace = JSON.parse(buf.toString());
        const ev = trace.traceEvents ?? trace;
        const layouts = ev.filter((e) => e.name === "Layout").length;
        const paints = ev.filter((e) => e.name === "Paint").length;
        const tasks = ev
            .filter((e) => e.name === "RunTask" && (e.dur ?? 0) > 16000)
            .map((e) => Math.round(e.dur / 1000));
        log(
            `[motion trace light Home→Gradient] Layout events=${layouts} · Paint=${paints} · RunTask>16ms=${JSON.stringify(tasks)} (mount-frame layout is legitimate one-time work; a PER-FRAME layout track is the red shape)`,
        );
        await openViewInline(page, "Home");
    }
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/w8-pass2-probe-log.txt`, report.join("\n") + "\n");
console.log("PASS-2 PROBE COMPLETE");
