// CHALLENGE-D · p1 — open the ImageEyedropper for real and measure it.
//
// Read-only against the running dev server. Writes ONLY under
// docs/tranches/V/megatranche/audit/components/wb-extract-imageeyedropper/evidence/.
//
//   node p1-open-and-measure.mjs [--origin=http://localhost:9000]
//
// Matrices: safari desktop light/dark, safari mobile light, rtl-desktop,
// zoom-200 (720x450 @2x, the audit's WCAG-1.4.4 reflow convention).
import { webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = process.argv.find((a) => a.startsWith("--origin="))?.slice(9)
    ?? "http://localhost:9000";
const FIXTURE = resolve(HERE, "fixture.png");

const MATRIX = [
    { id: "desktop-light", colorScheme: "light", ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 } },
    { id: "desktop-dark", colorScheme: "dark", ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 } },
    { id: "mobile-light", colorScheme: "light", ctx: { ...devices["iPhone 14"] } },
    { id: "rtl-desktop", colorScheme: "light", ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, rtl: true },
    { id: "zoom-200-desktop", colorScheme: "light", ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 } },
];

const initScript = (scheme) => `
  try {
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
    const de = document.documentElement;
    if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark'); else de.classList.remove('dark');
  } catch (e) {}
`;

const OVERLAY = ".z-popover.glass-floating";
const CANVAS = "canvas.eyedropper-canvas";

function rectOf(page, sel) {
    return page.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
    }, sel);
}

async function readout(page) {
    return page.evaluate((ov) => {
        const o = document.querySelector(ov);
        const span = o?.querySelector("span.text-mono-small");
        return span ? span.textContent.trim() : null;
    }, OVERLAY);
}

const results = {};

for (const m of MATRIX) {
    const browser = await webkit.launch();
    const context = await browser.newContext({ ...m.ctx, colorScheme: m.colorScheme });
    await context.addInitScript(initScript(m.colorScheme));
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
    page.on("pageerror", (e) => pageErrors.push(String(e)));

    const R = { matrix: m.id, consoleErrors, pageErrors };

    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(2500);
    if (m.rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(800); }

    // --- feed the fixture through the real drop-zone input
    await page.setInputFiles('input[type="file"]', FIXTURE);
    await page.waitForTimeout(1500);

    R.dropZone = await page.evaluate(() => {
        const dz = document.querySelector('[role="button"][aria-label*="preview" i], [role="button"][aria-label*="Image" i]');
        if (!dz) return null;
        return {
            ariaLabel: dz.getAttribute("aria-label"),
            tabindex: dz.getAttribute("tabindex"),
            role: dz.getAttribute("role"),
            hasKeydown: false,
        };
    });

    // Keyboard-reachability of the eyedropper ENTRY POINT: walk the whole tab
    // ring and see whether the preview seat is ever focused.
    R.tabRingContainsPreviewSeat = await page.evaluate(() => {
        const focusables = [...document.querySelectorAll(
            'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])',
        )];
        return focusables.some((el) => (el.getAttribute("aria-label") ?? "").toLowerCase().includes("sample"));
    });

    // --- open the eyedropper (pointer only — the sole entry path)
    await page.locator('[role="button"][aria-label*="sample" i]').first().click({ position: { x: 40, y: 40 } });
    await page.waitForTimeout(900);

    R.overlayRect = await rectOf(page, OVERLAY);
    R.canvasRect = await rectOf(page, CANVAS);
    R.viewportRect = await page.evaluate((s) => {
        const c = document.querySelector(s);
        const vp = c?.parentElement;
        if (!vp) return null;
        const r = vp.getBoundingClientRect();
        return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
    }, CANVAS);
    R.innerViewport = await page.evaluate(() => ({ w: innerWidth, h: innerHeight, dpr: devicePixelRatio }));
    R.canvasAttrs = await page.evaluate((s) => {
        const c = document.querySelector(s);
        if (!c) return null;
        const cs = getComputedStyle(c);
        return {
            attrW: c.width, attrH: c.height,
            imageRendering: cs.imageRendering,
            transform: cs.transform,
            ariaHidden: c.getAttribute("aria-hidden"),
        };
    }, CANVAS);

    // --- focus behaviour on open
    R.activeElementOnOpen = await page.evaluate(() => {
        const a = document.activeElement;
        return a ? `${a.tagName}${a.className ? "." + String(a.className).split(" ")[0] : ""}[${a.getAttribute("aria-label") ?? a.getAttribute("title") ?? ""}]` : null;
    });
    R.overlayA11y = await page.evaluate((ov) => {
        const o = document.querySelector(ov);
        if (!o) return null;
        return {
            role: o.getAttribute("role"),
            ariaModal: o.getAttribute("aria-modal"),
            ariaLabel: o.getAttribute("aria-label"),
            ariaLabelledby: o.getAttribute("aria-labelledby"),
            zIndex: getComputedStyle(o).zIndex,
            position: getComputedStyle(o).position,
        };
    }, OVERLAY);

    // Tab from the overlay: does focus leave into the covered content?
    const tabWalk = [];
    for (let i = 0; i < 8; i++) {
        await page.keyboard.press("Tab");
        tabWalk.push(await page.evaluate((ov) => {
            const a = document.activeElement;
            if (!a) return "none";
            const inOverlay = !!document.querySelector(ov)?.contains(a);
            const name = a.getAttribute("aria-label") ?? a.getAttribute("title") ?? (a.textContent ?? "").trim().slice(0, 24);
            return `${inOverlay ? "IN " : "OUT"} ${a.tagName}${a.type ? ":" + a.type : ""} "${name}"`;
        }, OVERLAY));
    }
    R.tabWalkAfterOpen = tabWalk;

    // --- control geometry + accessible names
    R.controls = await page.evaluate((ov) => {
        const o = document.querySelector(ov);
        return [...(o?.querySelectorAll("button") ?? [])].map((b) => {
            const r = b.getBoundingClientRect();
            return {
                title: b.getAttribute("title"),
                ariaLabel: b.getAttribute("aria-label"),
                text: (b.textContent ?? "").trim(),
                w: +r.width.toFixed(2), h: +r.height.toFixed(2),
            };
        });
    }, OVERLAY);

    const vp = R.viewportRect;
    const shot = (n) => page.screenshot({ path: resolve(HERE, `../frames/${m.id}-${n}.png`) });

    await shot("A-open-unsampled");
    R.readout_unsampled = await readout(page);

    if (vp) {
        // --- hover mapping: the fixture's four quadrants, in viewport coords
        const cx = vp.x + vp.w / 2, cy = vp.y + vp.h / 2;
        const q = async (dx, dy, label) => {
            await page.mouse.move(cx + dx, cy + dy);
            await page.waitForTimeout(220);
            return { label, at: [ +(cx + dx).toFixed(1), +(cy + dy).toFixed(1) ], readout: await readout(page) };
        };
        R.hoverQuadrants = [
            await q(-60, -40, "expect WHITE  (#ffffff)"),
            await q(60, -40, "expect BLACK  (#000000)"),
            await q(-60, 40, "expect RED    (#ff0000)"),
            await q(60, 40, "expect BLUE   (#0055ff)"),
        ];
        await shot("B-hover-sampled");

        // --- STALE READOUT: hover the letterbox (outside the image) and re-read
        R.hoverOffImage = await (async () => {
            const before = await readout(page);
            await page.mouse.move(vp.x + 4, vp.y + vp.h - 6);   // bottom-left letterbox
            await page.waitForTimeout(250);
            const after = await readout(page);
            const loupe = await rectOf(page, ".loupe");
            return { before, after, loupeStillVisible: !!loupe, loupeRect: loupe,
                     pointerAt: [ +(vp.x + 4).toFixed(1), +(vp.y + vp.h - 6).toFixed(1) ] };
        })();
        await shot("C-hover-off-image-stale");

        // --- loupe geometry vs the stage it lives in
        await page.mouse.move(cx - 60, cy - 40);
        await page.waitForTimeout(250);
        R.loupeRect = await rectOf(page, ".loupe");
        R.loupeVsStage = R.loupeRect && vp
            ? { widthShare: +(R.loupeRect.w / vp.w).toFixed(3), heightShare: +(R.loupeRect.h / vp.h).toFixed(3),
                areaShare: +((Math.PI * (R.loupeRect.w / 2) ** 2) / (vp.w * vp.h)).toFixed(3),
                centredOnPointer: {
                    loupeCenter: [ +(R.loupeRect.x + R.loupeRect.w / 2).toFixed(1), +(R.loupeRect.y + R.loupeRect.h / 2).toFixed(1) ],
                    pointer: [ +(cx - 60).toFixed(1), +(cy - 40).toFixed(1) ] } }
            : null;

        // --- reticle test: is there ANY centre marker in the loupe bitmap?
        R.loupeReticle = await page.evaluate(() => {
            const c = document.querySelector(".loupe canvas");
            if (!c) return null;
            const ctx = c.getContext("2d");
            const d = ctx.getImageData(0, 0, c.width, c.height).data;
            const px = (x, y) => { const i = (y * c.width + x) * 4; return `${d[i]},${d[i+1]},${d[i+2]},${d[i+3]}`; };
            const half = c.width / 2;
            // the sampled source pixel occupies the central 10x10 block
            const centre = new Set();
            for (let y = half - 5; y < half + 5; y++) for (let x = half - 5; x < half + 5; x++) centre.add(px(x, y));
            const ring = new Set();
            for (let y = half - 5; y < half + 5; y++) { ring.add(px(half - 12, y)); ring.add(px(half + 12, y)); }
            return { centreBlockColours: [...centre], neighbourColours: [...ring],
                     distinctCentreMarker: [...centre].length > 1 };
        });

        // --- TAP CADENCE: every second tap is swallowed by the unpin capture
        const tapAt = async (dx, dy) => {
            await page.mouse.click(cx + dx, cy + dy);
            await page.waitForTimeout(320);
            return readout(page);
        };
        R.tapCadence = [
            { step: "tap WHITE quadrant", got: await tapAt(-60, -40) },
            { step: "tap RED quadrant (1st)", got: await tapAt(-60, 40) },
            { step: "tap RED quadrant (2nd, same point)", got: await tapAt(-60, 40) },
        ];
        await shot("D-pinned");

        // --- hover-ink contrast: sample WHITE, then hover "Add to palette"
        await page.mouse.move(cx - 60, cy - 40);   // white quadrant
        await page.waitForTimeout(200);
        await page.mouse.click(cx - 60, cy - 40);  // pin -> action buttons appear
        await page.waitForTimeout(400);
        R.hoverInk = await page.evaluate(async (ov) => {
            const o = document.querySelector(ov);
            const bar = o?.firstElementChild;
            const btn = [...(o?.querySelectorAll("button") ?? [])].find((b) => b.getAttribute("title") === "Add to palette");
            if (!btn) return { error: "no add button" };
            const svg = btn.querySelector("svg");
            const barBg = getComputedStyle(bar).backgroundColor;
            const panelBg = getComputedStyle(o).backgroundColor;
            return {
                hoverColorVar: getComputedStyle(bar).getPropertyValue("--hover-color").trim(),
                svgColourResting: getComputedStyle(svg).color,
                barBg, panelBg,
            };
        }, OVERLAY);
        // hover it for real (WebKit honours :hover under mouse.move)
        const addBtn = page.locator(`${OVERLAY} button[title="Add to palette"]`);
        if (await addBtn.count()) {
            await addBtn.hover();
            await page.waitForTimeout(300);
            R.hoverInk.svgColourHovered = await page.evaluate((ov) => {
                const b = [...document.querySelectorAll(`${ov} button`)].find((x) => x.getAttribute("title") === "Add to palette");
                return b ? getComputedStyle(b.querySelector("svg")).color : null;
            }, OVERLAY);
            await shot("E-hover-add-white-sample");
        }

        // --- zoom to max and look at the pixels
        await page.mouse.move(cx, cy);
        try {
            for (let i = 0; i < 45; i++) { await page.mouse.wheel(0, -40); await page.waitForTimeout(12); }
        } catch (e) { R.wheelUnsupported = String(e).split("\n")[0]; }
        await page.waitForTimeout(500);
        R.zoomAfterWheel = await page.evaluate((s) => getComputedStyle(document.querySelector(s)).transform, CANVAS);
        await shot("F-wheel-scrolled");
    }

    // --- Escape behaviour + focus restoration
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    R.overlayAfterEscape = await rectOf(page, OVERLAY);
    R.activeElementAfterClose = await page.evaluate(() => {
        const a = document.activeElement;
        return a ? `${a.tagName}[${a.getAttribute("aria-label") ?? a.getAttribute("title") ?? ""}]` : null;
    });

    results[m.id] = R;
    await browser.close();
    console.log(`— ${m.id} done`);
}

writeFileSync(resolve(HERE, "p1.json"), JSON.stringify(results, null, 2));
console.log(`\nwrote ${resolve(HERE, "p1.json")}`);
