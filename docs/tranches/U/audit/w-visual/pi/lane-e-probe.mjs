/**
 * U.W-VISUAL — LANE E probe (Motion real-GPU annex + Easing).
 * Served build @ :8595 (PERF_PORT, serve-built.mjs → dist/gh-pages, HEAD e97a9d1).
 *
 * ROW [u-f7] SCENE-TRANSITION-MOTION — ANNEX/OWNER-ATTEST (U-F54).
 *   Measured HEADLESS leg only: pane-swap frame timing (rAF deltas + longtask)
 *   + live confound-presence audit (PKT-1 dist-clock / O-16-R1 150ms clobber)
 *   + reveal-start capture (wake-gray bead). NEVER a headless green/red.
 *
 * ROW [zd3-easing] EASING (T-22 / T-47) — CENSUS re-judge of the O-17 landed seat.
 *   EasingAuthoringStage geometry (O-17 letterbox / plateFlat / one-column /
 *   one-literal), aliveness drag, clipped pi-frames. 1440 L/D + 390 L.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const PORT = 8595;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-visual/pi";
const FRM = "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-visual/frames";
mkdirSync(OUT, { recursive: true });
mkdirSync(FRM, { recursive: true });

const OWNER_COLOR = "lab(40.39% 52.94 47.26 / 82.7%)";
const report = [];
const log = (s) => { console.log(s); report.push(s); };
const r2 = (n) => Math.round(n * 100) / 100;

const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});

async function boot(w, h, scheme, path = "/#/", extra = {}) {
    const ctx = await browser.newContext({
        viewport: { width: w, height: h }, deviceScaleFactor: 2, colorScheme: scheme, ...extra,
    });
    const page = await ctx.newPage();
    await page.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", s); } catch {} }, scheme);
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 140)));
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 140)));
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3400); // past the boot overture
    return { ctx, page, errors };
}

// ============================================================================
// ROW [u-f7] — MOTION (measured headless leg + confound audit + wake-gray)
// ============================================================================
async function motionLeg(scheme) {
    const { ctx, page, errors } = await boot(1440, 900, scheme,
        `/#/?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`);
    log(`\n########## [u-f7] MOTION — ${scheme} ##########`);

    // -- (1) LIVE confound-presence audit -----------------------------------
    const confound = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        const tok = (n) => root.getPropertyValue(n).trim();
        // any dock/layer element carrying a ~150ms transition (O-16-R1 clobber)?
        let clobber150 = 0; const clobberSamples = [];
        for (const el of document.querySelectorAll('[class*="dock"], [class*="layer"], [class*="pane"]')) {
            const td = getComputedStyle(el).transitionDuration;
            if (/(^|[ ,])0?\.15s|150ms/.test(td)) {
                clobber150++;
                if (clobberSamples.length < 4) clobberSamples.push((el.className || "").toString().split(" ")[0] + ":" + td);
            }
        }
        return {
            defaultTransitionDuration: tok("--default-transition-duration"),
            durationNormal: tok("--duration-normal"),
            durationFast: tok("--duration-fast"),
            springSmoothDuration: tok("--spring-smooth-duration"),
            springSmoothSettle: tok("--spring-smooth-settle"),
            motionTempo: tok("--motion-tempo"),
            clobber150Count: clobber150,
            clobber150Samples: clobberSamples,
        };
    });
    log(`CONFOUND-AUDIT ${scheme}: ${JSON.stringify(confound)}`);

    // -- (2) enumerate the view combobox options ----------------------------
    const combo = page.getByRole("combobox", { name: "Select view" });
    const hasCombo = (await combo.count()) > 0;
    log(`view combobox present: ${hasCombo}`);

    // -- instrument rAF + longtask recorder ---------------------------------
    async function armRecorder() {
        await page.evaluate(() => {
            window.__frames = []; window.__lt = []; window.__run = true;
            const rec = (t) => { window.__frames.push(t); if (window.__run) requestAnimationFrame(rec); };
            requestAnimationFrame(rec);
            try {
                window.__po = new PerformanceObserver((l) => {
                    for (const e of l.getEntries()) window.__lt.push({ s: Math.round(e.startTime), d: Math.round(e.duration) });
                });
                window.__po.observe({ entryTypes: ["longtask"] });
            } catch {}
        });
    }
    async function harvest(label) {
        return page.evaluate((lab) => {
            window.__run = false; try { window.__po && window.__po.disconnect(); } catch {}
            const f = window.__frames; const d = [];
            for (let i = 1; i < f.length; i++) d.push(f[i] - f[i - 1]);
            const over32 = d.filter((x) => x > 32).length;
            const over16 = d.filter((x) => x > 16.7).length;
            const max = d.length ? Math.max(...d) : 0;
            return {
                label: lab, frames: f.length, deltas: d.length,
                maxFrameMs: Math.round(max * 10) / 10,
                over32, over16,
                longtasks: window.__lt,
                maxLongtaskMs: window.__lt.length ? Math.max(...window.__lt.map((x) => x.d)) : 0,
            };
        }, label);
    }

    // -- (3) DRIVE a real pane swap via the dock (Home -> Gradient) ----------
    let swapTiming = null, targetName = null;
    if (hasCombo) {
        await armRecorder();
        await combo.click();
        await page.waitForTimeout(120);
        // pick a non-current option (Gradient)
        const opt = page.getByRole("option").filter({ hasText: /gradient/i }).first();
        if ((await opt.count()) > 0) {
            targetName = (await opt.textContent())?.trim();
            await opt.click();
        } else {
            // fallback: pick the 2nd option
            const opts = page.getByRole("option");
            targetName = (await opts.nth(1).textContent())?.trim();
            await opts.nth(1).click();
        }
        await page.waitForTimeout(1200); // settle window
        swapTiming = await harvest(`swap Home->${targetName}`);
        log(`SWAP-TIMING ${scheme}: ${JSON.stringify(swapTiming)}`);
    }

    // -- (4) WAKE-GRAY bead: swap BACK to Home (picker KeepAlive re-activate) --
    // capture the reveal-start frame + sample the hero-blob region for gray.
    let wakeGray = null;
    if (hasCombo) {
        await combo.click();
        await page.waitForTimeout(120);
        const homeOpt = page.getByRole("option").filter({ hasText: /^home$|picker/i }).first();
        const homeName = (await homeOpt.count()) > 0 ? (await homeOpt.textContent())?.trim() : null;
        // arm a paint sampler that grabs the blob-region pixel every rAF for ~10 frames
        await page.evaluate(() => { window.__reveal = []; });
        if ((await homeOpt.count()) > 0) await homeOpt.click();
        else { await combo.press("Escape"); }
        // capture reveal-start screenshot ASAP + a settled one
        await page.waitForTimeout(40);
        await page.screenshot({ path: `${FRM}/uf7-wake-reveal-start-${scheme}.png` });
        await page.waitForTimeout(900);
        await page.screenshot({ path: `${FRM}/uf7-wake-settled-${scheme}.png` });
        // sample the hero-blob canvas center chroma at settle (headless GL confound-flagged)
        wakeGray = await page.evaluate(() => {
            const canv = document.querySelector("canvas");
            if (!canv) return { canvas: false };
            const rct = canv.getBoundingClientRect();
            return { canvas: true, canvasSize: `${canv.width}x${canv.height}`,
                box: { w: Math.round(rct.width), h: Math.round(rct.height) } };
        });
        log(`WAKE-GRAY ${scheme}: homeOption=${homeName} ${JSON.stringify(wakeGray)} (percept OWNER-ATTEST — U-F54)`);
    }

    log(`CONSOLE ${scheme}: ${errors.length} error(s)${errors.length ? " :: " + errors.slice(0, 3).join(" | ") : ""}`);
    await ctx.close();
    return { confound, swapTiming, wakeGray, errors: errors.length };
}

// ============================================================================
// ROW [zd3-easing] — EASING authoring stage re-judge
// ============================================================================
async function discloseRow0(page) {
    const head = page.locator("button[aria-controls='easing-interval-0']");
    await head.waitFor({ state: "visible", timeout: 20000 });
    if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
    const row = page.locator("#easing-interval-0");
    const tune = row.getByRole("button", { name: "Author a custom curve" });
    if ((await tune.count()) > 0 && (await tune.getAttribute("aria-expanded")) !== "true") await tune.click();
    const svg = row.locator("#easing-authoring-0 svg[role='img']");
    await svg.waitFor({ state: "visible", timeout: 10000 });
    await page.waitForTimeout(650);
    await head.evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForTimeout(250);
    return { head, row, svg };
}

async function easingLeg(w, h, scheme) {
    const cell = `${w}-${scheme}`;
    const { ctx, page, errors } = await boot(w, h, scheme,
        `/#/gradient?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`);
    log(`\n########## [zd3-easing] ${cell} ##########`);
    const { head, row, svg } = await discloseRow0(page);

    // geometry: O-17 letterbox + plateFlat + one-column + one-literal
    const g = await page.evaluate(() => {
        const r2 = (n) => Math.round(n * 100) / 100;
        const gs = (el, p) => getComputedStyle(el).getPropertyValue(p);
        const row = document.querySelector("#easing-interval-0");
        const svg = row.querySelector("#easing-authoring-0 svg[role='img']");
        const svgR = svg.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        const ctm = svg.getScreenCTM();
        const pt = (x, y) => new DOMPoint(x, y).matrixTransform(ctm);
        const tl = pt(vb.x, vb.y), br = pt(vb.x + vb.width, vb.y + vb.height);
        const authoring = row.querySelector(".easing-authoring");
        const picker = row.querySelector("[data-testid='easing-picker']");
        const card = row.querySelector("#easing-authoring-0 .glass-card");
        // one-literal law: leaves containing a cubic-bezier/steps literal
        let literalLeaves = 0;
        for (const n of row.querySelectorAll("*"))
            if (n.childElementCount === 0 && /(cubic-bezier|steps)\s*\(/.test(n.textContent ?? "")) literalLeaves++;
        // stamp census (no cartoon stamp inside the well)
        let stamps = 0;
        for (const n of row.querySelectorAll("*"))
            if (/8px 8px 0(px)?/.test(getComputedStyle(n).boxShadow)) stamps++;
        return {
            canvasBox: { w: r2(svgR.width), h: r2(svgR.height), aspect: r2(svgR.width / svgR.height) },
            vb: { w: vb.width, h: vb.height, ratio: r2(vb.height / vb.width) },
            vbRatioVar: gs(authoring, "--vb-ratio"),
            letterbox: {
                dL: r2(Math.abs(tl.x - svgR.left)), dT: r2(Math.abs(tl.y - svgR.top)),
                dR: r2(Math.abs(br.x - svgR.right)), dB: r2(Math.abs(br.y - svgR.bottom)),
            },
            inlineSize: gs(svg, "inline-size"),
            transitionProp: gs(svg, "transition-property"),
            pickerGrid: picker ? gs(picker, "grid-template-columns") : null,
            plateFlat: card ? {
                shadow: gs(card, "box-shadow").slice(0, 24),
                backdrop: gs(card, "backdrop-filter"),
                bg: gs(card, "background-color"),
            } : null,
            literalLeaves, stamps,
            travelDots: row.querySelectorAll("svg circle[r='0.03']").length,
        };
    });
    log(`GEOMETRY ${cell}: ${JSON.stringify(g)}`);
    await page.screenshot({ path: `${FRM}/zd3-easing-${cell}-bench.png` });

    // clipped pi-frame of the disclosed authoring well
    const rowBox = await row.locator(".rounded-card").first().boundingBox().catch(() => null)
        || await row.boundingBox();
    if (rowBox) {
        await page.screenshot({
            path: `${FRM}/zd3-easing-${cell}-well.png`,
            clip: { x: Math.max(0, rowBox.x), y: Math.max(0, rowBox.y),
                width: Math.min(rowBox.width, w - rowBox.x), height: Math.min(rowBox.height, h - rowBox.y) },
        });
    }

    // aliveness drag (1440-light only) — literal write-through + persistence
    let alive = null;
    if (w === 1440 && scheme === "light") {
        const readCode = () => row.locator(".readout-rail code").first().textContent();
        const before = (await readCode())?.trim();
        const handle = svg.locator("circle[r='0.04']").first();
        const hb = await handle.boundingBox();
        if (hb) {
            await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
            await page.mouse.down();
            await page.mouse.move(hb.x + hb.width / 2 + 55, hb.y + hb.height / 2 - 70, { steps: 12 });
            await page.mouse.up();
            await page.waitForTimeout(400);
        }
        const afterDrag = (await readCode())?.trim();
        const tune = row.getByRole("button", { name: "Author a custom curve" });
        await tune.click(); await page.waitForTimeout(150); await tune.click(); await page.waitForTimeout(300);
        const afterToggle = (await readCode())?.trim();
        alive = { before, afterDrag, changed: before !== afterDrag, persisted: afterDrag === afterToggle };
        log(`ALIVENESS ${cell}: ${JSON.stringify(alive)}`);
    }

    log(`CONSOLE ${cell}: ${errors.length} error(s)${errors.length ? " :: " + errors.slice(0, 3).join(" | ") : ""}`);
    await ctx.close();
    return { g, alive, errors: errors.length };
}

// ---- RUN ----
const out = { motion: {}, easing: {} };
for (const scheme of ["light", "dark"]) out.motion[scheme] = await motionLeg(scheme);
for (const [w, h, s] of [[1440, 900, "light"], [1440, 900, "dark"], [390, 844, "light"]])
    out.easing[`${w}-${s}`] = await easingLeg(w, h, s);

await browser.close();
writeFileSync(`${OUT}/lane-e-probe-log.txt`, report.join("\n") + "\n");
log("\nDONE");
