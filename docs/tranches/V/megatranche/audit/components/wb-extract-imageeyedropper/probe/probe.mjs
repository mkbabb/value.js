// CHALLENGE-D probe — ImageEyedropper. Read-only drive of the live dev server.
import { webkit } from "playwright";

const DIR = new URL(".", import.meta.url).pathname;
const IMG = DIR + "probe-1200.png";
const out = {};

async function openEyedropper(page) {
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.locator("input[type=file]").first().setInputFiles(IMG);
    await page.waitForSelector('img[alt="Uploaded image"]', { timeout: 10000 });
    await page.waitForTimeout(1200);
    // click the preview (disableClick=true → parent opens the eyedropper)
    const dz = page.locator('div[aria-label="Image preview area, tap to sample colors"]');
    const box = await dz.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForSelector("canvas.eyedropper-canvas", { timeout: 5000 });
    await page.waitForTimeout(900);
    return box;
}

const browser = await webkit.launch();

// ---------- desktop light ----------
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errs.push("console:" + m.text()); });

    await openEyedropper(page);
    await page.screenshot({ path: DIR + "shot-desktop-light-open.png" });

    out.geometry = await page.evaluate(() => {
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const vp = cv.parentElement;
        const overlay = vp.parentElement;
        const cs = getComputedStyle(cv);
        const r = cv.getBoundingClientRect(), vr = vp.getBoundingClientRect();
        return {
            dpr: devicePixelRatio,
            canvasBacking: { w: cv.width, h: cv.height },
            canvasRendered: { w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
            viewport: { w: +vr.width.toFixed(2), h: +vr.height.toFixed(2), x: +vr.x.toFixed(1), y: +vr.y.toFixed(1) },
            transform: cs.transform,
            imageRendering: cs.imageRendering,
            transitionProp: cs.transitionProperty, transitionDur: cs.transitionDuration,
            overlayRole: overlay.getAttribute("role"),
            overlayAriaModal: overlay.getAttribute("aria-modal"),
            overlayAriaLabel: overlay.getAttribute("aria-label"),
            overlayTabindex: overlay.getAttribute("tabindex"),
            overlayClass: overlay.className,
        };
    });

    // focus containment: how many tabbable elements OUTSIDE the overlay remain reachable
    out.focus = await page.evaluate(() => {
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const overlay = cv.parentElement.parentElement;
        const sel = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
        const all = [...document.querySelectorAll(sel)].filter((e) => {
            const r = e.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden";
        });
        return {
            tabbableInsideOverlay: all.filter((e) => overlay.contains(e)).length,
            tabbableOutsideOverlay: all.filter((e) => !overlay.contains(e)).length,
            activeElementOnOpen: document.activeElement?.tagName + "." + (document.activeElement?.className || "").slice(0, 40),
            overlayContainsActive: overlay.contains(document.activeElement),
        };
    });

    // accessible names of the eyedropper's own controls
    out.controls = await page.evaluate(() => {
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const overlay = cv.parentElement.parentElement;
        return [...overlay.querySelectorAll("button,[role=button]")].map((b) => ({
            tag: b.tagName,
            ariaLabel: b.getAttribute("aria-label"),
            title: b.getAttribute("title"),
            text: (b.textContent || "").trim(),
            rect: (({ width, height }) => ({ w: Math.round(width), h: Math.round(height) }))(b.getBoundingClientRect()),
        }));
    });

    // ---- WYSIWYG: sampled value vs displayed neighbourhood ----
    const vr = out.geometry.viewport;
    const hx = vr.x + vr.w * 0.25, hy = vr.y + vr.h * 0.5;   // left half = 1px red/blue checker
    await page.mouse.move(hx, hy);
    await page.waitForTimeout(120);
    await page.mouse.move(hx + 1, hy);   // second move: loupe canvas now exists
    await page.waitForTimeout(200);
    out.hoverReadout = await page.evaluate(() => {
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const overlay = cv.parentElement.parentElement;
        return overlay.querySelector("span")?.textContent.trim();
    });
    out.displayedVsSampled = await page.evaluate(() => {
        const src = document.querySelector('img[alt="Uploaded image"]');
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const m = new DOMMatrixReadOnly(getComputedStyle(cv).transform);
        // what the compositor actually shows at this scale: draw the source at
        // the rendered size with default (smoothing on) filtering and read the centre
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(cv.width * m.a));
        c.height = Math.max(1, Math.round(cv.height * m.d));
        const g = c.getContext("2d");
        g.drawImage(cv, 0, 0, c.width, c.height);
        const px = g.getImageData(Math.round(c.width * 0.25), Math.round(c.height * 0.5), 1, 1).data;
        return { zoom: +m.a.toFixed(4), renderedW: c.width, renderedH: c.height, displayedCentrePixel: [px[0], px[1], px[2]] };
    });

    // ---- loupe: is it drawn on the first show? (tap → pin) ----
    await page.mouse.click(hx, hy);
    await page.waitForTimeout(400);
    out.loupeAfterTapDesktop = await page.evaluate(() => {
        const l = document.querySelector(".loupe canvas");
        if (!l) return { present: false };
        const d = l.getContext("2d").getImageData(0, 0, l.width, l.height).data;
        let nonZero = 0;
        for (let i = 3; i < d.length; i += 4) if (d[i] !== 0) nonZero++;
        const c = l.getContext("2d").getImageData(55, 55, 1, 1).data;
        return { present: true, w: l.width, h: l.height, paintedPx: nonZero, totalPx: d.length / 4, centrePixel: [...c] };
    });

    // ---- second tap on a DIFFERENT pixel: does the readout change? ----
    const before = out.hoverReadout;
    const gx = vr.x + vr.w * 0.8, gy = vr.y + vr.h * 0.5;  // right half = solid #808080
    await page.mouse.click(gx, gy);
    await page.waitForTimeout(350);
    const after1 = await page.evaluate(() => document.querySelector("canvas.eyedropper-canvas").parentElement.parentElement.querySelector("span")?.textContent.trim());
    await page.mouse.click(gx, gy);
    await page.waitForTimeout(350);
    const after2 = await page.evaluate(() => document.querySelector("canvas.eyedropper-canvas").parentElement.parentElement.querySelector("span")?.textContent.trim());
    out.tapCycle = { beforeGreyTaps: before, afterFirstGreyTap: after1, afterSecondGreyTap: after2 };

    await page.screenshot({ path: DIR + "shot-desktop-light-pinned.png" });
    out.consoleErrors = errs;
    await ctx.close();
}

// ---------- mobile (touch) dark ----------
{
    const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
        hasTouch: true, isMobile: true, colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await openEyedropper(page);
    const vr = await page.evaluate(() => {
        const r = document.querySelector("canvas.eyedropper-canvas").parentElement.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    await page.touchscreen.tap(vr.x + vr.w * 0.5, vr.y + vr.h * 0.5);
    await page.waitForTimeout(600);
    out.mobile = await page.evaluate(() => {
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const overlay = cv.parentElement.parentElement;
        const l = document.querySelector(".loupe canvas");
        let loupe = { present: !!l };
        if (l) {
            const d = l.getContext("2d").getImageData(0, 0, l.width, l.height).data;
            let nz = 0; for (let i = 3; i < d.length; i += 4) if (d[i] !== 0) nz++;
            const lr = l.getBoundingClientRect();
            loupe = { present: true, backing: { w: l.width, h: l.height }, cssRect: { w: +lr.width.toFixed(1), h: +lr.height.toFixed(1) }, paintedPx: nz, totalPx: d.length / 4, dpr: devicePixelRatio };
        }
        return { readout: overlay.querySelector("span")?.textContent.trim(), loupe, overlayRect: (({ width, height }) => ({ w: Math.round(width), h: Math.round(height) }))(overlay.getBoundingClientRect()) };
    });
    await page.screenshot({ path: DIR + "shot-mobile-dark-tapped.png" });
    await ctx.close();
}

// ---------- broken image URL: the error state ----------
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push("pageerror:" + String(e).slice(0, 160)));
    page.on("console", (m) => { if (m.type() === "error") errs.push("console:" + m.text().slice(0, 160)); });
    await openEyedropper(page);
    // swap the prop to a URL that will fail to load, exactly as a revoked
    // object-URL / dead data-URL would behave
    await page.evaluate(() => {
        const el = document.querySelector("canvas.eyedropper-canvas");
        const vue = el.__vueParentComponent;
        // find the ImageEyedropper instance and flip its imageUrl through the parent
        let p = vue; while (p && p.type?.__name !== "ExtractWorkbench") p = p.parent;
        return !!p;
    });
    await ctx.close();
    out.errorProbeNote = "see static analysis — loadImage() rejection is unhandled (onMounted calls loadAndFit() without catch)";
    out.errorProbeErrs = errs;
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
