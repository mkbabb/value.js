/**
 * T.W8 · PASS 2 probe — RESUME (same iteration; the first run crashed at the
 * blob-390 wait before LEG 6). Legs here:
 *   5b · the CORRECTED 390 touch-rung measurement (`:scope > div:last-child`
 *        — the first run's descendant selector read an inner 16px node) +
 *        the blob-390 timeout FORENSIC (what actually renders at /#/blob@390).
 *   6  · T-48 MOTION: mid-flight screencast captures + rAF pacing + one
 *        devtools.timeline trace (see w8-pass2-probe.mjs header).
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync, appendFileSync } from "node:fs";

const BUILT = "http://localhost:8611";
const OUT = "docs/tranches/T/audit/pi/w8";
mkdirSync(`${OUT}/motion`, { recursive: true });

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
    const t0 = await page.evaluate(() => performance.timeOrigin + performance.now());
    await fn();
    await page.waitForTimeout(ms);
    await cdp.send("Page.stopScreencast").catch(() => {});
    let n = 0;
    for (const f of frames) {
        const off = Math.round(f.t * 1000 - t0);
        if (off < -50) continue;
        writeFileSync(
            `${dir}/f${String(Math.max(off, 0)).padStart(5, "0")}ms.png`,
            Buffer.from(f.data, "base64"),
        );
        n++;
    }
    await cdp.detach().catch(() => {});
    return n;
}

// ═══ LEG 5b — corrected 390 touch-rung + the blob-390 forensic ═══
for (const view of ["atmosphere", "blob"]) {
    const { ctx, page } = await newPage("light", {
        viewport: { width: 390, height: 844 },
    });
    await page.goto(`${BUILT}/#/${view}`);
    await page.waitForSelector("main");
    await page.waitForTimeout(4000); // generous: mobile chunk + settle
    const state = await page.evaluate(() => {
        const rows = [...document.querySelectorAll(".config-console .configurator-row")];
        const rung = rows.slice(0, 6).map((r) => {
            const track = r.querySelector(":scope > div:last-child");
            return track ? Math.round(track.getBoundingClientRect().height) : -1;
        });
        return {
            consolePresent: !!document.querySelector(".config-console"),
            rowCount: rows.length,
            rung,
            paneTitleText:
                document.querySelector("main h1, main h2")?.textContent?.trim() ??
                "(none)",
            mainChildren: [...(document.querySelector("main")?.children ?? [])].map(
                (c) => c.className.toString().slice(0, 60),
            ),
        };
    });
    await page.screenshot({ path: `${OUT}/config/${view}-light-390.png` });
    log(`[config ${view} 390 corrected] ${JSON.stringify(state)}`);
    await ctx.close();
}

// ═══ LEG 6 — T-48 MOTION ═══
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
            const d = window.__deltas.slice(2);
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
            `[motion ${scheme} ${from}→${to}] rAF median=${pacing.median}ms max=${pacing.max}ms over-3×=${pacing.over3x}/${pacing.n} longtasks=${JSON.stringify(pacing.long)} · frames→motion/${scheme}-${from.toLowerCase()}-to-${to.toLowerCase()}`,
        );
    }
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
appendFileSync(`${OUT}/w8-pass2-probe-log.txt`, report.join("\n") + "\n");
console.log("RESUME COMPLETE");
