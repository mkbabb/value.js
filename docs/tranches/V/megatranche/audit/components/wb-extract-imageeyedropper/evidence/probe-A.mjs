import { webkit } from "playwright";
import fs from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/shots";
fs.mkdirSync(OUT, { recursive: true });
const IMG = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/probe.png";
const results = {};

async function openEyedropper(page) {
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    if (!page.url().includes("extract")) {
        await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
        await page.waitForTimeout(2500);
    }
    await page.setInputFiles("input[type=file]", IMG);
    await page.waitForTimeout(1500);
    // record focus before open
    const before = await page.evaluate(() => ({
        active: document.activeElement?.tagName + "." + (document.activeElement?.className || "").slice(0, 40),
        label: document.activeElement?.getAttribute?.("aria-label"),
    }));
    await page.locator('[role=button][aria-label*="sample colors"]').click({ position: { x: 20, y: 20 } });
    await page.waitForTimeout(900);
    return before;
}

const geometryProbe = () => {
    const root = document.querySelector(".glass-floating.z-popover") ||
        document.querySelector("div.absolute.inset-0.z-popover");
    if (!root) return { error: "overlay not found" };
    const vp = root.querySelector('[style*="touch-action"]');
    const cv = root.querySelector("canvas.eyedropper-canvas");
    const loupe = root.querySelector(".loupe");
    const loupeCv = loupe?.querySelector("canvas");
    const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const cs = (e, p) => e ? getComputedStyle(e)[p] : null;
    return {
        overlay: r(root),
        overlayRole: root.getAttribute("role"),
        overlayAriaModal: root.getAttribute("aria-modal"),
        overlayAriaLabel: root.getAttribute("aria-label") || root.getAttribute("aria-labelledby"),
        overlayTabindex: root.getAttribute("tabindex"),
        viewport: r(vp),
        canvas: r(cv),
        canvasAttrWH: cv ? [cv.width, cv.height] : null,
        canvasWillChange: cs(cv, "willChange"),
        canvasImageRendering: cs(cv, "imageRendering"),
        canvasTransform: cs(cv, "transform"),
        loupeBox: r(loupe),
        loupeCanvasAttrWH: loupeCv ? [loupeCv.width, loupeCv.height] : null,
        loupeZIndex: cs(loupe, "zIndex"),
        loupeBorder: cs(loupe, "borderTopWidth") + " " + cs(loupe, "borderTopColor"),
        dpr: devicePixelRatio,
        innerH: innerHeight, innerW: innerWidth,
        // is the overlay taller than the visual viewport?
        overlayExceedsViewport: r(root).h > innerHeight,
        // top bar controls
        controls: [...root.querySelectorAll("button, [role=button]")].map((b) => {
            const bb = b.getBoundingClientRect();
            return { title: b.getAttribute("title"), aria: b.getAttribute("aria-label"), w: +bb.width.toFixed(1), h: +bb.height.toFixed(1), text: b.innerText.trim().slice(0, 20) };
        }),
        dots: [...root.querySelectorAll("[class*=watercolor], .watercolor-dot, [data-watercolor]")].map((d) => ({
            cls: String(d.getAttribute("class")).slice(0, 70), ariaHidden: d.getAttribute("aria-hidden"), tagAttr: d.getAttribute("tag"), tag: d.tagName,
        })),
        strayTagAttr: document.querySelectorAll("[tag]").length,
        strayTagAttrHTML: [...document.querySelectorAll("[tag]")].map((e) => e.tagName + "[tag=" + e.getAttribute("tag") + "] cls=" + String(e.getAttribute("class")).slice(0, 40)),
        readout: root.querySelector("span.text-mono-small")?.innerText,
        // loupe canvas emptiness
        loupeEmpty: (() => {
            if (!loupeCv) return "no-loupe-canvas";
            const ctx = loupeCv.getContext("2d");
            const d = ctx.getImageData(0, 0, loupeCv.width, loupeCv.height).data;
            let nonzero = 0;
            for (let i = 3; i < d.length; i += 4) if (d[i] > 0) nonzero++;
            return { nonAlphaPx: nonzero, totalPx: d.length / 4 };
        })(),
        // center pixel of loupe (what pixel is being magnified)
        loupeCenter: (() => {
            if (!loupeCv) return null;
            const ctx = loupeCv.getContext("2d");
            const d = ctx.getImageData(Math.floor(loupeCv.width / 2), Math.floor(loupeCv.height / 2), 1, 1).data;
            return [d[0], d[1], d[2], d[3]];
        })(),
    };
};

// ---------- Matrix 1: desktop light ----------
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1512, height: 806 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage();
    const consoleErrs = [];
    page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => consoleErrs.push("PAGEERROR " + e.message.slice(0, 200)));

    const focusBefore = await openEyedropper(page);
    await page.screenshot({ path: `${OUT}/desktop-light-open.png` });
    const geo = await page.evaluate(geometryProbe);

    // focus after open
    const focusAfter = await page.evaluate(() => document.activeElement?.tagName + "|" + (document.activeElement?.getAttribute("aria-label") || document.activeElement?.innerText || "").slice(0, 40));

    // tab order: how many tabs before reaching an eyedropper control? does tab reach BEHIND the overlay?
    const tabWalk = [];
    for (let i = 0; i < 12; i++) {
        await page.keyboard.press("Tab");
        tabWalk.push(await page.evaluate(() => {
            const a = document.activeElement;
            const inOverlay = !!a?.closest?.(".z-popover");
            return { tag: a?.tagName, label: (a?.getAttribute?.("aria-label") || a?.getAttribute?.("title") || a?.innerText || "").trim().slice(0, 30), inOverlay };
        }));
    }

    // FIRST-TAP loupe: close, re-open, then tap with NO prior pointermove
    const firstTap = await (async () => {
        await page.evaluate(() => document.querySelector('.z-popover button[title="Close eyedropper"]')?.click());
        await page.waitForTimeout(700);
        await page.locator('[role=button][aria-label*="sample colors"]').click({ position: { x: 20, y: 20 }, force: true });
        await page.waitForTimeout(800);
        return await page.evaluate(() => {
            const vp = document.querySelector('[style*="touch-action"]');
            if (!vp) return { err: "no vp" };
            const b = vp.getBoundingClientRect();
            const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
            const opts = { pointerId: 7, pointerType: "touch", isPrimary: true, clientX: cx, clientY: cy, bubbles: true, cancelable: true };
            vp.dispatchEvent(new PointerEvent("pointerdown", opts));
            vp.dispatchEvent(new PointerEvent("pointerup", opts));
            return new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => {
                const lc = document.querySelector(".loupe canvas");
                if (!lc) return res({ loupePresent: false });
                const d = lc.getContext("2d").getImageData(0, 0, lc.width, lc.height).data;
                let nz = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) nz++;
                res({ loupePresent: true, nonAlphaPx: nz, total: d.length / 4, readout: document.querySelector(".z-popover span.text-mono-small")?.innerText });
            })));
        });
    })();

    // sampling accuracy at known quadrants
    const sampleAcc = await page.evaluate(() => {
        const vp = document.querySelector('[style*="touch-action"]');
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const vb = vp.getBoundingClientRect(), cb = cv.getBoundingClientRect();
        const out = [];
        // image is 64x64 with quadrants: TL #ff0000, TR #0080ff, BL #112233, BR #f0f00a
        const targets = [
            { ix: 16, iy: 16, want: "#ff0000" },
            { ix: 48, iy: 16, want: "#0080ff" },
            { ix: 16, iy: 48, want: "#112233" },
            { ix: 48, iy: 48, want: "#f0f00a" },
            { ix: 0, iy: 0, want: "#ff0000" },   // top-left corner pixel
            { ix: 63, iy: 63, want: "#f0f00a" }, // bottom-right corner pixel
        ];
        const scale = cb.width / cv.width;
        for (const t of targets) {
            // center of image pixel (ix,iy) in client coords
            const clientX = cb.x + (t.ix + 0.5) * scale;
            const clientY = cb.y + (t.iy + 0.5) * scale;
            out.push({ ...t, clientX: +clientX.toFixed(1), clientY: +clientY.toFixed(1), insideVp: clientX >= vb.x && clientX <= vb.right && clientY >= vb.y && clientY <= vb.bottom, scale: +scale.toFixed(3) });
        }
        return { canvasRect: { x: +cb.x.toFixed(1), y: +cb.y.toFixed(1), w: +cb.width.toFixed(1), h: +cb.height.toFixed(1) }, vpRect: { x: +vb.x.toFixed(1), y: +vb.y.toFixed(1), w: +vb.width.toFixed(1), h: +vb.height.toFixed(1) }, targets: out };
    });

    // actually hover each target and read the readout
    const samples = [];
    for (const t of sampleAcc.targets) {
        await page.mouse.move(t.clientX, t.clientY);
        await page.waitForTimeout(120);
        const got = await page.evaluate(() => document.querySelector(".z-popover span.text-mono-small")?.innerText);
        samples.push({ ix: t.ix, iy: t.iy, want: t.want, got });
    }

    // 200% zoom: emulate via CSS zoom on documentElement is not honest; use page.setViewportSize + deviceScaleFactor? Use CDP-free approach: set zoom via `document.body.style.zoom` is not a browser zoom. Skip; do 320px narrow instead.
    results.desktopLight = { focusBefore, focusAfter, geo, tabWalk, firstTap, sampleAcc: { canvasRect: sampleAcc.canvasRect, vpRect: sampleAcc.vpRect }, samples, consoleErrs };
    await page.screenshot({ path: `${OUT}/desktop-light-sampled.png` });

    // pinned state: click to pin, screenshot; measure layout shift of readout
    await page.mouse.move(sampleAcc.targets[0].clientX, sampleAcc.targets[0].clientY);
    const beforePin = await page.evaluate(() => { const s = document.querySelector(".z-popover span.text-mono-small"); const b = s.getBoundingClientRect(); return { x: +b.x.toFixed(1), w: +b.width.toFixed(1) }; });
    await page.mouse.click(sampleAcc.targets[0].clientX, sampleAcc.targets[0].clientY);
    await page.waitForTimeout(400);
    const afterPin = await page.evaluate(() => { const s = document.querySelector(".z-popover span.text-mono-small"); const b = s.getBoundingClientRect(); return { x: +b.x.toFixed(1), w: +b.width.toFixed(1), controls: [...document.querySelectorAll(".z-popover button")].map(x => x.getAttribute("title")) }; });
    results.desktopLight.pin = { beforePin, afterPin };
    await page.screenshot({ path: `${OUT}/desktop-light-pinned.png` });

    // escape behaviour
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const afterEsc1 = await page.evaluate(() => ({ overlay: !!document.querySelector(".z-popover.glass-floating"), pinnedBtns: document.querySelectorAll(".z-popover button").length }));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    const afterEsc2 = await page.evaluate(() => ({ overlay: !!document.querySelector(".z-popover.glass-floating"), active: document.activeElement?.tagName + "|" + (document.activeElement?.getAttribute("aria-label") || "").slice(0, 40) }));
    results.desktopLight.escape = { afterEsc1, afterEsc2 };

    await browser.close();
}

// ---------- Matrix 2: desktop dark ----------
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1512, height: 806 }, deviceScaleFactor: 2, colorScheme: "dark" });
    const page = await ctx.newPage();
    await openEyedropper(page);
    await page.mouse.move(600, 400);
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/desktop-dark-open.png` });
    results.desktopDark = await page.evaluate(geometryProbe);
    await browser.close();
}

// ---------- Matrix 3: mobile dark (iPhone-ish) ----------
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "dark", isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await openEyedropper(page);
    await page.screenshot({ path: `${OUT}/mobile-dark-open.png` });
    results.mobileDark = await page.evaluate(geometryProbe);
    // tap in the middle of the image viewport with touch
    const tapped = await page.evaluate(() => {
        const vp = document.querySelector('[style*="touch-action"]');
        if (!vp) return "no vp";
        const b = vp.getBoundingClientRect();
        const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
        const o = { pointerId: 3, pointerType: "touch", isPrimary: true, clientX: cx, clientY: cy, bubbles: true, cancelable: true };
        vp.dispatchEvent(new PointerEvent("pointerdown", o));
        vp.dispatchEvent(new PointerEvent("pointerup", o));
        return { cx, cy };
    });
    await page.waitForTimeout(600);
    results.mobileDark.afterTap = await page.evaluate(geometryProbe);
    results.mobileDark.tapped = tapped;
    await page.screenshot({ path: `${OUT}/mobile-dark-tapped.png` });
    await browser.close();
}

// ---------- Matrix 4: forced colors + reduced motion + rtl ----------
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1512, height: 806 }, deviceScaleFactor: 2, colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await openEyedropper(page);
    await page.mouse.move(600, 400);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/forced-colors-reduced.png` });
    results.forcedColors = await page.evaluate(geometryProbe);
    results.forcedColors.motion = await page.evaluate(() => {
        const cv = document.querySelector("canvas.eyedropper-canvas");
        return { transition: getComputedStyle(cv).transitionDuration, prm: matchMedia("(prefers-reduced-motion: reduce)").matches, forced: matchMedia("(forced-colors: active)").matches };
    });
    await browser.close();
}

// ---------- Matrix 5: RTL ----------
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1512, height: 806 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.addInitScript(() => { document.addEventListener("DOMContentLoaded", () => { document.documentElement.dir = "rtl"; }); });
    await openEyedropper(page);
    await page.mouse.move(600, 400);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/rtl-open.png` });
    results.rtl = await page.evaluate(geometryProbe);
    await browser.close();
}

fs.writeFileSync(OUT + "/results.json", JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1).slice(0, 200));
console.log("DONE");
