/**
 * U-GESTALT probe — post-tranche-T round-1 audit, the owner's-eye gestalt read.
 * Drives the LIVE :9000 server (probe-only; never restarts it). Walks the whole
 * app in both schemes × desktop(1440)/mobile(390), saving frames named by
 * finding row (T-30..T-60) for the owner-verdict re-judge.
 *
 * Usage: node probe.mjs <legName>  (legs are independent so a crash is bounded)
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, appendFileSync } from "node:fs";

const BASE = "http://localhost:9000";
const OUT = "docs/tranches/T/audit/pi/u-gestalt";
mkdirSync(OUT, { recursive: true });
mkdirSync(`${OUT}/frames`, { recursive: true });

const leg = process.argv[2] || "all";
const logfile = `${OUT}/probe-log-${leg}.txt`;
writeFileSync(logfile, `# u-gestalt probe leg=${leg} @ ${new Date().toISOString()}\n`);
const log = (s) => { console.log(s); appendFileSync(logfile, s + "\n"); };

const browser = await chromium.launch({ headless: true });

async function mkPage(scheme, width, height = width === 390 ? 844 : 900) {
    const ctx = await browser.newContext({
        viewport: { width, height },
        colorScheme: scheme,
        deviceScaleFactor: 2,
    });
    await ctx.addInitScript((s) => {
        try { localStorage.setItem("vueuse-color-scheme", s); } catch (_) {}
    }, scheme);
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
    page._errs = errs;
    return { ctx, page };
}

async function goto(page, hash) {
    await page.goto(`${BASE}/#${hash}`, { waitUntil: "load" });
}

const shot = async (page, name, opts = {}) => {
    const p = `${OUT}/frames/${name}.png`;
    await page.screenshot({ path: p, ...opts });
    return p;
};

// ---- beat marks for the boot overture
const beatMarks = (page) =>
    page.evaluate(() =>
        Object.fromEntries(
            performance.getEntriesByType("mark")
                .filter((m) => m.name.startsWith("overture:"))
                .map((m) => [m.name.slice(9), Math.round(m.startTime)]),
        ),
    );

// contrast helper: relative luminance of an rgb string
function relLum(rgb) {
    const m = rgb.match(/\d+\.?\d*/g);
    if (!m) return null;
    const [r, g, b] = m.slice(0, 3).map((x) => {
        const c = x / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(fg, bg) {
    const l1 = relLum(fg), l2 = relLum(bg);
    if (l1 == null || l2 == null) return null;
    const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (hi + 0.05) / (lo + 0.05);
}

async function run() {
    if (leg === "boot" || leg === "all") await legBoot();
    if (leg === "picker" || leg === "all") await legPicker();
    if (leg === "panes" || leg === "all") await legPanes();
    if (leg === "dock" || leg === "all") await legDock();
    await browser.close();
    log("DONE " + leg);
}

// ============ BOOT OVERTURE (T-49 blob arrival, T-60 aurora gray pulse, T-27) ============
async function legBoot() {
    for (const scheme of ["light", "dark"]) {
        const { ctx, page } = await mkPage(scheme, 1440);
        const t0 = Date.now();
        const nav = page.goto(`${BASE}/#/`, { waitUntil: "commit" });
        // sample the boot at fixed offsets
        const offsets = [150, 300, 500, 750, 1000, 1400, 2000, 3000];
        for (const off of offsets) {
            const wait = off - (Date.now() - t0);
            if (wait > 0) await page.waitForTimeout(wait);
            try {
                await shot(page, `boot-${scheme}-t${off}`);
            } catch (e) { log(`boot shot ${scheme} t${off} FAIL ${e.message}`); }
        }
        await nav.catch(() => {});
        await page.waitForTimeout(500);
        const marks = await beatMarks(page).catch(() => ({}));
        log(`BOOT ${scheme} beat marks: ${JSON.stringify(marks)}`);
        log(`BOOT ${scheme} console errors: ${page._errs.length ? page._errs.slice(0, 5).join(" | ") : "none"}`);
        await ctx.close();
    }
}

// ============ PICKER (T-30 blob seat/blur, T-33 readout seam, T-34/T-50 well veil, T-51 title seam, T-59 rhythm) ============
async function legPicker() {
    for (const scheme of ["light", "dark"]) {
        for (const width of [1440, 390]) {
            const { ctx, page } = await mkPage(scheme, width);
            await goto(page, "/");
            await page.waitForTimeout(3200); // let overture settle
            const tag = `${scheme}-${width}`;
            await shot(page, `picker-${tag}-full`, { fullPage: false });

            // blob seat geometry (T-30): find the hero blob canvas
            const blob = await page.evaluate(() => {
                const cands = [...document.querySelectorAll("canvas")].map((c) => {
                    const r = c.getBoundingClientRect();
                    return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), cls: c.className, id: c.id };
                });
                return cands;
            });
            log(`PICKER ${tag} canvases: ${JSON.stringify(blob)}`);

            // readout/title region: the LCh label + numbers
            const header = await page.evaluate(() => {
                const findText = (t) => [...document.querySelectorAll("*")].find((e) => e.children.length === 0 && e.textContent.trim().toLowerCase() === t);
                const rects = {};
                for (const t of ["lab", "lch", "oklch", "rgb", "hsl", "srgb"]) {
                    const el = findText(t);
                    if (el) { const r = el.getBoundingClientRect(); rects[t] = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), fs: getComputedStyle(el).fontSize }; break; }
                }
                return rects;
            });
            log(`PICKER ${tag} space-label: ${JSON.stringify(header)}`);
            await ctx.close();
        }
    }
}

// ============ PANES: palettes/browse/gradient/easing/extract/mix/generate ============
async function legPanes() {
    const routes = [
        ["/palettes", "palettes"],
        ["/browse", "browse"],
        ["/gradient", "gradient"],
        ["/extract", "extract"],
        ["/mix", "mix"],
        ["/generate", "generate"],
    ];
    for (const scheme of ["light", "dark"]) {
        for (const width of [1440, 390]) {
            const { ctx, page } = await mkPage(scheme, width);
            await goto(page, "/");
            await page.waitForTimeout(2600);
            for (const [hash, name] of routes) {
                await goto(page, hash);
                await page.waitForTimeout(1400);
                const tag = `${name}-${scheme}-${width}`;
                await shot(page, `pane-${tag}`);
            }
            log(`PANES ${scheme}-${width} errs: ${page._errs.length ? page._errs.slice(0, 3).join(" | ") : "none"}`);
            await ctx.close();
        }
    }
}

// ============ DOCK (T-31 atop, T-36 Tools box, T-37 swatch, T-52 edge clip, T-43/T-56 Palettes ramp, T-57 expand reflow) ============
async function legDock() {
    for (const scheme of ["light", "dark"]) {
        for (const width of [1440, 390]) {
            const { ctx, page } = await mkPage(scheme, width);
            await goto(page, "/");
            await page.waitForTimeout(2800);
            const tag = `${scheme}-${width}`;
            // dock crop at top
            const dockBox = await page.evaluate(() => {
                const el = document.querySelector('[class*="dock" i], [class*="Dock"], nav');
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
            });
            log(`DOCK ${tag} box: ${JSON.stringify(dockBox)}`);
            await shot(page, `dock-${tag}-rest`, { clip: { x: 0, y: 0, width: Math.min(width, 1440), height: 160 } });

            // T-57: measure scene-top before/after dock expand. Find "Tools" trigger.
            const before = await page.evaluate(() => {
                const main = document.querySelector("main, [class*='pane'], [class*='card']");
                return main ? Math.round(main.getBoundingClientRect().top) : null;
            });
            // try to open Tools/dock menu
            const clicked = await page.evaluate(() => {
                const btn = [...document.querySelectorAll("button, [role=button]")].find((b) => /tools/i.test(b.textContent));
                if (btn) { btn.click(); return true; }
                return false;
            });
            await page.waitForTimeout(700);
            const after = await page.evaluate(() => {
                const main = document.querySelector("main, [class*='pane'], [class*='card']");
                return main ? Math.round(main.getBoundingClientRect().top) : null;
            });
            log(`DOCK ${tag} Tools-clicked=${clicked} scene-top before=${before} after=${after} shift=${after != null && before != null ? after - before : "?"}`);
            await shot(page, `dock-${tag}-expanded`, { clip: { x: 0, y: 0, width: Math.min(width, 1440), height: 320 } });
            await ctx.close();
        }
    }
}

await run();
