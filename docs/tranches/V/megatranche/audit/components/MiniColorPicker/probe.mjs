// CHALLENGE-D probe — MiniColorPicker.vue
// demo/palettes/browser/search/MiniColorPicker.vue
// Read-only. Drives the LIVE dev server at :9000 in WebKit (Safari engine) to
// match the mega-tranche visual matrix.
//
//   node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe.mjs
//
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = "http://localhost:9000";

const MATRIX = [
    { id: "desktop-light", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
    { id: "desktop-dark", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
    { id: "mobile-light", ctx: { ...devices["iPhone 14"], colorScheme: "light" } },
    { id: "mobile-dark", ctx: { ...devices["iPhone 14"], colorScheme: "dark" } },
    { id: "zoom-200", ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, colorScheme: "light" } },
];

const browser = await webkit.launch();
const out = {};

for (const m of MATRIX) {
    const context = await browser.newContext(m.ctx);
    const page = await context.newPage();
    const consoleErrs = [];
    page.on("console", (c) => c.type() === "error" && consoleErrs.push(c.text().slice(0, 200)));
    const pageErrs = [];
    page.on("pageerror", (e) => pageErrs.push(String(e).slice(0, 200)));

    const rec = { matrix: m.id, consoleErrs, pageErrs };
    out[m.id] = rec;

    try {
        await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
        await page.waitForTimeout(2500);

        // 1. open the Filters popover
        await page.click('button[aria-label="Filters"]');
        await page.waitForTimeout(700);

        // 2. open MiniColorPicker via its swatch trigger
        const swatch = page.locator('button[aria-label^="Open color picker"]');
        rec.swatchCount = await swatch.count();
        if (rec.swatchCount === 0) { await context.close(); continue; }
        await swatch.first().scrollIntoViewIfNeeded().catch(() => {});
        await swatch.first().click({ force: true });
        await page.waitForTimeout(700);

        // ---- geometry / computed style census ---------------------------------
        rec.census = await page.evaluate(() => {
            const R = (el) => {
                if (!el) return null;
                const b = el.getBoundingClientRect();
                return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
            };
            const dialogs = [...document.querySelectorAll('[role="dialog"]')];
            const canvas = document.querySelector(".sv-canvas");
            const mini = canvas ? canvas.closest('[role="dialog"]') : null;
            const outer = dialogs.find((d) => d !== mini) ?? null;
            const thumb = canvas ? canvas.firstElementChild : null;
            // hue rail = the sibling div right after the sv-canvas
            const rail = canvas ? canvas.nextElementSibling : null;
            const railHandle = rail ? rail.firstElementChild : null;
            const readout = mini ? mini.querySelector("span.fira-code") : null;
            const swatchDot = mini ? mini.querySelector("span.rounded-full") : null;
            const miniSearch = mini ? [...mini.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search") : null;
            const allSearch = [...document.querySelectorAll("button")]
                .filter((b) => b.textContent.trim() === "Search" && b.getBoundingClientRect().width > 0)
                .map((b) => ({ ...R(b), fs: getComputedStyle(b).fontSize, inMini: !!(mini && mini.contains(b)) }));

            const cs = (el, props) => {
                if (!el) return null;
                const s = getComputedStyle(el);
                return Object.fromEntries(props.map((p) => [p, s[p]]));
            };

            // clip test: how much of the thumb lies outside the canvas box
            let clip = null;
            if (canvas && thumb) {
                const c = canvas.getBoundingClientRect(), t = thumb.getBoundingClientRect();
                const ix = Math.max(0, Math.min(c.right, t.right) - Math.max(c.left, t.left));
                const iy = Math.max(0, Math.min(c.bottom, t.bottom) - Math.max(c.top, t.top));
                clip = {
                    thumbArea: +(t.width * t.height).toFixed(1),
                    visibleArea: +(ix * iy).toFixed(1),
                    hiddenPct: +((1 - (ix * iy) / (t.width * t.height)) * 100).toFixed(1),
                };
            }

            // focusable walk inside the mini dialog
            const focusables = mini
                ? [...mini.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')]
                      .map((e) => ({ tag: e.tagName.toLowerCase(), name: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 40) }))
                : [];

            return {
                dialogCount: dialogs.length,
                nested: !!(mini && outer && outer.contains(mini)),
                miniRect: R(mini),
                outerRect: R(outer),
                miniAriaLabel: mini ? mini.getAttribute("aria-label") : null,
                miniAriaLabelledby: mini ? mini.getAttribute("aria-labelledby") : null,
                miniAriaDescribedby: mini ? mini.getAttribute("aria-describedby") : null,
                miniStyle: cs(mini, ["width", "padding", "borderRadius", "backgroundColor", "backdropFilter", "boxShadow", "zIndex"]),
                canvasRect: R(canvas),
                canvasStyle: cs(canvas, ["touchAction", "overflow", "borderRadius", "borderColor", "cursor", "backgroundImage", "userSelect"]),
                canvasRole: canvas ? canvas.getAttribute("role") : null,
                canvasAriaLabel: canvas ? canvas.getAttribute("aria-label") : null,
                canvasTabIndex: canvas ? canvas.getAttribute("tabindex") : null,
                thumbRect: R(thumb),
                thumbStyle: cs(thumb, ["borderColor", "borderWidth", "backgroundColor", "boxShadow", "left", "top"]),
                clip,
                railRect: R(rail),
                railStyle: cs(rail, ["touchAction", "overflow", "borderRadius", "cursor", "backgroundImage"]),
                railRole: rail ? rail.getAttribute("role") : null,
                railTabIndex: rail ? rail.getAttribute("tabindex") : null,
                railHandleRect: R(railHandle),
                railHandleStyle: cs(railHandle, ["borderColor", "boxShadow", "left", "top", "position"]),
                readoutText: readout ? readout.textContent.trim() : null,
                readoutStyle: cs(readout, ["fontSize", "fontFamily", "color", "lineHeight", "letterSpacing"]),
                readoutDir: readout ? (readout.getAttribute("dir") || getComputedStyle(readout).direction) : null,
                swatchDotRect: R(swatchDot),
                miniSearchRect: R(miniSearch),
                miniSearchStyle: cs(miniSearch, ["fontSize", "fontFamily", "height", "minHeight"]),
                allSearchButtons: allSearch,
                focusables,
                // does the child eclipse the parent?
                eclipsePct: (() => {
                    if (!mini || !outer) return null;
                    const a = mini.getBoundingClientRect(), b = outer.getBoundingClientRect();
                    const ix = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
                    const iy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
                    return +(((ix * iy) / (b.width * b.height)) * 100).toFixed(1);
                })(),
            };
        });

        // ---- keyboard reachability of the two spatial instruments -------------
        rec.keyboard = await page.evaluate(async () => {
            const canvas = document.querySelector(".sv-canvas");
            const rail = canvas ? canvas.nextElementSibling : null;
            const before = document.activeElement;
            canvas?.focus?.();
            const canvasFocusable = document.activeElement === canvas;
            rail?.focus?.();
            const railFocusable = document.activeElement === rail;
            return { canvasFocusable, railFocusable, activeBefore: before?.tagName?.toLowerCase() ?? null };
        });

        // ---- shot: whole viewport + the mini surface ---------------------------
        await page.screenshot({ path: resolve(SHOTS, `${m.id}-full.png`) });
        const miniBox = rec.census?.miniRect;
        if (miniBox && miniBox.w > 0) {
            await page.screenshot({
                path: resolve(SHOTS, `${m.id}-mini.png`),
                clip: { x: Math.max(0, miniBox.x - 8), y: Math.max(0, miniBox.y - 8), width: miniBox.w + 16, height: miniBox.h + 16 },
            });
        }

        // ---- drive the SV field: three decisive coordinates --------------------
        const c = rec.census?.canvasRect;
        if (c && c.w > 0) {
            const readState = () =>
                page.evaluate(() => {
                    const canvas = document.querySelector(".sv-canvas");
                    const thumb = canvas?.firstElementChild;
                    const rail = canvas?.nextElementSibling;
                    const handle = rail?.firstElementChild;
                    const readout = canvas?.closest('[role="dialog"]')?.querySelector("span.fira-code");
                    const cr = canvas.getBoundingClientRect(), tr = thumb.getBoundingClientRect();
                    const ix = Math.max(0, Math.min(cr.right, tr.right) - Math.max(cr.left, tr.left));
                    const iy = Math.max(0, Math.min(cr.bottom, tr.bottom) - Math.max(cr.top, tr.top));
                    return {
                        hex: readout?.textContent.trim() ?? null,
                        thumbLeft: thumb.style.left,
                        thumbTop: thumb.style.top,
                        thumbBg: thumb.style.background,
                        hueLeft: handle?.style.left ?? null,
                        thumbHiddenPct: +((1 - (ix * iy) / (tr.width * tr.height)) * 100).toFixed(1),
                        parentSwatchBg: (() => {
                            const s = document.querySelector('button[aria-label^="Open color picker"]');
                            return s ? getComputedStyle(s).backgroundColor : null;
                        })(),
                    };
                });

            rec.drive = { start: await readState() };

            const tap = async (fx, fy, label) => {
                await page.mouse.move(c.x + c.w * fx, c.y + c.h * fy);
                await page.mouse.down();
                await page.waitForTimeout(120);
                await page.mouse.up();
                await page.waitForTimeout(220);
                rec.drive[label] = await readState();
            };

            await tap(0.5, 0.5, "center");           // sat .5 val .5
            await tap(0.5, 0.995, "bottomCenter");   // val -> 0  (sat destruction probe)
            await tap(0.02, 0.02, "topLeft");        // sat 0 val 1 -> #ffffff on white
            await page.screenshot({
                path: resolve(SHOTS, `${m.id}-mini-topleft.png`),
                clip: { x: Math.max(0, miniBox.x - 8), y: Math.max(0, miniBox.y - 8), width: miniBox.w + 16, height: miniBox.h + 16 },
            });
            await tap(0.995, 0.5, "rightEdge");
        }

        // ---- hue rail drag to hue 0 (clip at the left end) ---------------------
        const r = rec.census?.railRect;
        if (r && r.w > 0) {
            await page.mouse.move(r.x + 2, r.y + r.h / 2);
            await page.mouse.down();
            await page.waitForTimeout(100);
            await page.mouse.up();
            await page.waitForTimeout(200);
            rec.hueRail = await page.evaluate(() => {
                const canvas = document.querySelector(".sv-canvas");
                const rail = canvas?.nextElementSibling;
                const handle = rail?.firstElementChild;
                const rr = rail.getBoundingClientRect(), hr = handle.getBoundingClientRect();
                const ix = Math.max(0, Math.min(rr.right, hr.right) - Math.max(rr.left, hr.left));
                const iy = Math.max(0, Math.min(rr.bottom, hr.bottom) - Math.max(rr.top, hr.top));
                return {
                    handleLeft: handle.style.left,
                    handleBg: handle.style.background,
                    handleHiddenPct: +((1 - (ix * iy) / (hr.width * hr.height)) * 100).toFixed(1),
                    railH: +rr.height.toFixed(1),
                    handleH: +hr.height.toFixed(1),
                };
            });
        }
    } catch (e) {
        rec.error = String(e).slice(0, 400);
    }
    await context.close();
}

await browser.close();
writeFileSync(resolve(HERE, "probe.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
