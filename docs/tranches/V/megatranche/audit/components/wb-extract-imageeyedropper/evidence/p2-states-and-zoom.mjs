// CHALLENGE-D · p2 — the states p1 could not reach: the pinned action set, the
// readout overflow, the glass bleed-through, the zoom affordance, forced-colors,
// and the non-image-file path.
//
//   node p2-states-and-zoom.mjs [--origin=http://localhost:9000]
import { webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = process.argv.find((a) => a.startsWith("--origin="))?.slice(9) ?? "http://localhost:9000";
const FIXTURE = resolve(HERE, "fixture.png");

const OVERLAY = ".z-popover.glass-floating";
const CANVAS = "canvas.eyedropper-canvas";

const MATRIX = [
    { id: "p2-desktop-light", colorScheme: "light", ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 } },
    { id: "p2-mobile-light", colorScheme: "light", ctx: { ...devices["iPhone 14"] } },
    { id: "p2-forced-colors", colorScheme: "light", ctx: { viewport: { width: 1440, height: 900 }, forcedColors: "active" } },
    { id: "p2-broken-file", colorScheme: "light", ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, brokenFile: true },
];

const initScript = (scheme) => `
  try {
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
    const de = document.documentElement;
    if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark'); else de.classList.remove('dark');
  } catch (e) {}
`;

const results = {};

for (const m of MATRIX) {
    const browser = await webkit.launch();
    const context = await browser.newContext({ ...m.ctx, colorScheme: m.colorScheme });
    await context.addInitScript(initScript(m.colorScheme));
    const page = await context.newPage();
    const R = { matrix: m.id, consoleErrors: [], pageErrors: [] };
    page.on("console", (msg) => { if (msg.type() === "error") R.consoleErrors.push(msg.text().slice(0, 220)); });
    page.on("pageerror", (e) => R.pageErrors.push(String(e).slice(0, 220)));

    const shot = (n) => page.screenshot({ path: resolve(HERE, `../frames/${m.id}-${n}.png`) });

    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(2500);

    if (m.brokenFile) {
        // A user who picks "All Files" in the native dialog: `accept="image/*"` is
        // advisory, and ImageDropZone's CLICK path (unlike its DROP path) has no
        // type guard.
        await page.setInputFiles('input[type="file"]', {
            name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("this is not an image"),
        });
        await page.waitForTimeout(1500);
        R.previewAcceptedNonImage = await page.evaluate(() =>
            !!document.querySelector('img[alt="Uploaded image"]'));
        R.quantizeErrorText = await page.evaluate(() => {
            const el = [...document.querySelectorAll(".text-destructive")].map((e) => e.textContent.trim());
            return el;
        });
        const seat = page.locator('[role="button"][aria-label*="sample" i]');
        R.eyedropperEntryPresent = await seat.count();
        if (await seat.count()) {
            await seat.first().click({ position: { x: 40, y: 40 } });
            await page.waitForTimeout(1800);
        }
        R.overlayPresent = await page.evaluate((ov) => !!document.querySelector(ov), OVERLAY);
        R.canvasState = await page.evaluate((s) => {
            const c = document.querySelector(s);
            if (!c) return null;
            const r = c.getBoundingClientRect();
            return { attrW: c.width, attrH: c.height, cssW: +r.width.toFixed(1), cssH: +r.height.toFixed(1),
                     transform: getComputedStyle(c).transform };
        }, CANVAS);
        R.readout = await page.evaluate((ov) => {
            const s = document.querySelector(ov)?.querySelector("span.text-mono-small");
            return s ? s.textContent.trim() : null;
        }, OVERLAY);
        R.anyErrorSurfaceInsideOverlay = await page.evaluate((ov) => {
            const o = document.querySelector(ov);
            return o ? /error|failed|could not|unable/i.test(o.textContent) : null;
        }, OVERLAY);
        await shot("Z-broken-file");
        results[m.id] = R;
        await browser.close();
        console.log(`— ${m.id} done`);
        continue;
    }

    await page.setInputFiles('input[type="file"]', FIXTURE);
    await page.waitForTimeout(1500);

    // --- the OPENING frame: what does the stage look like before decode/fit?
    await page.locator('[role="button"][aria-label*="sample" i]').first().click({ position: { x: 40, y: 40 } });
    await page.waitForTimeout(40);
    R.canvasAt40ms = await page.evaluate((s) => {
        const c = document.querySelector(s);
        if (!c) return null;
        const r = c.getBoundingClientRect();
        return { attrW: c.width, attrH: c.height, cssW: +r.width.toFixed(1), cssH: +r.height.toFixed(1),
                 transform: getComputedStyle(c).transform };
    }, CANVAS);
    await shot("G-opening-frame-40ms");
    await page.waitForTimeout(1200);

    // --- glass truth: is the panel translucent over the content it replaces?
    R.glass = await page.evaluate((ov) => {
        const o = document.querySelector(ov);
        const cs = getComputedStyle(o);
        return {
            backgroundColor: cs.backgroundColor,
            backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
            opacity: cs.opacity,
            overflow: cs.overflow,
        };
    }, OVERLAY);
    // what is painted BEHIND the empty glass band above the sampling canvas?
    R.behindEmptyBand = await page.evaluate((sel) => {
        const c = document.querySelector(sel.canvas);
        const o = document.querySelector(sel.overlay);
        const cr = c.getBoundingClientRect(), or = o.getBoundingClientRect();
        const bandMidY = (or.top + cr.top) / 2;          // between panel top and canvas top
        const x = or.left + or.width / 2;
        const stack = document.elementsFromPoint(x, bandMidY).slice(0, 6)
            .map((e) => `${e.tagName}${e.className ? "." + String(e.className).split(" ").slice(0, 2).join(".") : ""}`);
        return { probeAt: [ +x.toFixed(0), +bandMidY.toFixed(0) ], bandHeight: +(cr.top - or.top).toFixed(1), stack };
    }, { canvas: CANVAS, overlay: OVERLAY });

    // --- single clean pin (fresh state, never pinned before)
    const vp = await page.evaluate((s) => {
        const r = document.querySelector(s).parentElement.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
    }, CANVAS);
    const cx = vp.x + vp.w / 2, cy = vp.y + vp.h / 2;
    await page.mouse.move(cx - 60, cy + 40);            // RED quadrant
    await page.waitForTimeout(200);
    await page.mouse.click(cx - 60, cy + 40);
    await page.waitForTimeout(500);
    R.pinnedControls = await page.evaluate((ov) => {
        const o = document.querySelector(ov);
        return [...o.querySelectorAll("button")].map((b) => {
            const r = b.getBoundingClientRect();
            return { title: b.getAttribute("title"), ariaLabel: b.getAttribute("aria-label"),
                     accessibleText: (b.textContent ?? "").trim(),
                     w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
        });
    }, OVERLAY);
    R.readoutOverflow = await page.evaluate((ov) => {
        const s = document.querySelector(ov)?.querySelector("span.text-mono-small");
        if (!s) return null;
        const r = s.getBoundingClientRect();
        return {
            text: s.textContent.trim(), chars: s.textContent.trim().length,
            title: s.getAttribute("title"), ariaLabel: s.getAttribute("aria-label"),
            dir: s.getAttribute("dir"), role: s.getAttribute("role"),
            ariaLive: s.closest("[aria-live]")?.getAttribute("aria-live") ?? null,
            clientWidth: s.clientWidth, scrollWidth: s.scrollWidth,
            truncatedPx: s.scrollWidth - s.clientWidth,
            visibleFraction: +(s.clientWidth / s.scrollWidth).toFixed(3),
            boxW: +r.width.toFixed(1),
        };
    }, OVERLAY);
    await shot("H-pinned-actions");

    // --- hover-ink contrast: sample WHITE, then hover "Add to palette"
    // (the pin survives because we never touch the viewport again)
    R.hoverInk = await (async () => {
        const btn = page.locator(`${OVERLAY} button[title="Add to palette"]`);
        if (!(await btn.count())) return { error: "no add button" };
        const resting = await page.evaluate((ov) => {
            const b = [...document.querySelectorAll(`${ov} button`)].find((x) => x.title === "Add to palette");
            return getComputedStyle(b.querySelector("svg")).color;
        }, OVERLAY);
        await btn.hover();
        await page.waitForTimeout(350);
        const hovered = await page.evaluate((ov) => {
            const o = document.querySelector(ov);
            const b = [...o.querySelectorAll("button")].find((x) => x.title === "Add to palette");
            const bar = o.firstElementChild;
            return {
                svg: getComputedStyle(b.querySelector("svg")).color,
                svgTransform: getComputedStyle(b.querySelector("svg")).transform,
                hoverColorVar: getComputedStyle(bar).getPropertyValue("--hover-color").trim(),
                buttonBg: getComputedStyle(b).backgroundColor,
                panelBg: getComputedStyle(o).backgroundColor,
            };
        }, OVERLAY);
        return { resting, ...hovered };
    })();
    await shot("I-hover-add-ink");

    // --- zoom affordance: plain wheel vs ctrl+wheel
    if (!m.ctx.isMobile) {
        const t0 = await page.evaluate((s) => getComputedStyle(document.querySelector(s)).transform, CANVAS);
        await page.mouse.move(cx, cy);
        for (let i = 0; i < 20; i++) { await page.mouse.wheel(0, -60); await page.waitForTimeout(10); }
        await page.waitForTimeout(400);
        const t1 = await page.evaluate((s) => getComputedStyle(document.querySelector(s)).transform, CANVAS);
        await page.keyboard.down("Control");
        for (let i = 0; i < 25; i++) { await page.mouse.wheel(0, -60); await page.waitForTimeout(10); }
        await page.keyboard.up("Control");
        await page.waitForTimeout(400);
        const t2 = await page.evaluate((s) => getComputedStyle(document.querySelector(s)).transform, CANVAS);
        R.zoom = { atFit: t0, afterPlainWheel: t1, afterCtrlWheel: t2,
                   plainWheelChanged: t0 !== t1, ctrlWheelChanged: t1 !== t2 };
        R.pinnedControlsAfterWheelGesture = await page.evaluate((ov) =>
            [...document.querySelectorAll(`${ov} button`)].map((b) => b.getAttribute("title")), OVERLAY);
        await shot("J-after-ctrl-wheel-zoom");
        // pixel truth at max zoom: what does one source pixel look like?
        R.zoomedPixelRendering = await page.evaluate((s) => {
            const c = document.querySelector(s);
            const cs = getComputedStyle(c);
            const m2 = new DOMMatrix(cs.transform);
            return { scale: +m2.a.toFixed(3), imageRendering: cs.imageRendering,
                     onePixelPaintedAt: +m2.a.toFixed(2) + " CSS px per source pixel" };
        }, CANVAS);
    }

    if (m.id === "p2-forced-colors") {
        R.forcedColors = await page.evaluate((ov) => {
            const o = document.querySelector(ov);
            const loupe = document.querySelector(".loupe");
            return {
                panelBg: getComputedStyle(o).backgroundColor,
                loupePresent: !!loupe,
                loupeBorder: loupe ? getComputedStyle(loupe).borderColor : null,
                loupeShadow: loupe ? getComputedStyle(loupe).boxShadow : null,
                forcedColorAdjust: getComputedStyle(o).forcedColorAdjust,
            };
        }, OVERLAY);
        await shot("K-forced-colors");
    }

    results[m.id] = R;
    await browser.close();
    console.log(`— ${m.id} done`);
}

writeFileSync(resolve(HERE, "p2.json"), JSON.stringify(results, null, 2));
console.log(`\nwrote ${resolve(HERE, "p2.json")}`);
