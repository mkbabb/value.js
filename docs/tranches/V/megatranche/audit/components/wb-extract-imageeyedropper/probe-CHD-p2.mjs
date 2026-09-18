import { chromium, webkit, devices } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const IMG = `${OUT}/quad.png`;
const log = (...a) => console.log(...a);

const STATE = () => {
    const ov = document.querySelector('[class*="z-popover"]');
    const loupe = document.querySelector(".loupe");
    const c = document.querySelector(".loupe canvas");
    let ink = null;
    if (c) { const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; ink = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) ink++; }
    return {
        readout: ov?.querySelector("span.text-mono-small")?.textContent?.trim()?.slice(0, 30),
        pinned: !!document.querySelector(".loupe-pinned"),
        loupeVisible: !!loupe,
        loupeInk: ink,
        actionBtns: ov ? ov.querySelectorAll(".eyedropper-action-btn").length : 0,
        transform: document.querySelector(".eyedropper-canvas")?.style.transform,
        swatchClass: ov?.querySelector('[data-testid="watercolor-swatch"]')?.className,
        readoutTitle: ov?.querySelector("span.text-mono-small")?.getAttribute("title"),
    };
};

async function open(page) {
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    await page.locator("input[type=file]").first().setInputFiles(IMG);
    await page.waitForTimeout(1800);
    await page.locator("img").first().click();
    await page.waitForTimeout(1000);
    return await page.locator("canvas.eyedropper-canvas").evaluate((c) => { const p = c.parentElement.getBoundingClientRect(); return { x: p.x, y: p.y, w: p.width, h: p.height }; });
}

const which = process.argv[2] ?? "all";

if (which === "all" || which === "A") {
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const vp = await open(page);
    const P = (fx, fy) => [vp.x + vp.w * fx, vp.y + vp.h * fy];
    const step = async (label, fn) => { await fn(); await page.waitForTimeout(450); log("A|", label, "=>", JSON.stringify(await page.evaluate(STATE))); };

    await step("hover RED (.30,.35)", async () => { const [x, y] = P(0.30, 0.35); await page.mouse.move(x, y); });
    await step("hover RED nudge", async () => { const [x, y] = P(0.31, 0.36); await page.mouse.move(x, y); });
    await step("CLICK -> pin", async () => { const [x, y] = P(0.31, 0.36); await page.mouse.click(x, y); });
    await step("ADD#1", async () => { await page.locator('.eyedropper-action-btn[title="Add to palette"]').click(); });
    await new Promise((r) => setTimeout(r, 1200));
    log("A| 1.65s after ADD#1 =>", JSON.stringify(await page.evaluate(STATE)));
    await step("ADD#2", async () => { await page.locator('.eyedropper-action-btn[title="Add to palette"]').click(); });
    await step("DRAG-pan while pinned", async () => {
        const [x, y] = P(0.31, 0.36);
        await page.mouse.move(x, y); await page.mouse.down();
        await page.mouse.move(x + 40, y + 40, { steps: 8 }); await page.mouse.up();
    });
    await step("TAP GREEN (.75,.35) after pan", async () => { const [x, y] = P(0.75, 0.35); await page.mouse.move(x, y); await new Promise((r) => setTimeout(r, 150)); await page.mouse.click(x, y); });
    await step("TAP GREEN again", async () => { const [x, y] = P(0.75, 0.35); await page.mouse.click(x, y); });
    await step("WHEEL ctrl-zoom while pinned", async () => { const [x, y] = P(0.75, 0.35); await page.mouse.move(x, y); await page.keyboard.down("Control"); await page.mouse.wheel(0, -300); await page.keyboard.up("Control"); });
    await page.screenshot({ path: `${OUT}/CHD-A-wheelpinned.png` });
    await step("ESC#1", async () => { await page.keyboard.press("Escape"); });
    await step("ESC#2", async () => { await page.keyboard.press("Escape"); });
    log("A| eyedropper canvases after 2xESC:", await page.locator("canvas.eyedropper-canvas").count());
    await b.close();
}

if (which === "all" || which === "B") {
    const b = await webkit.launch();
    const ctx = await b.newContext({ ...devices["iPhone 13"] });
    const page = await ctx.newPage();
    const vp = await open(page);
    log("B| viewport box:", JSON.stringify(vp));
    const [tx, ty] = [vp.x + vp.w * 0.3, vp.y + vp.h * 0.35];
    await page.touchscreen.tap(tx, ty);
    await page.waitForTimeout(700);
    log("B| after FIRST touch tap =>", JSON.stringify(await page.evaluate(STATE)));
    await page.screenshot({ path: `${OUT}/CHD-B-mobile-tap1.png` });
    await page.touchscreen.tap(vp.x + vp.w * 0.72, ty);
    await page.waitForTimeout(700);
    log("B| 2nd tap =>", JSON.stringify(await page.evaluate(STATE)));
    await page.touchscreen.tap(vp.x + vp.w * 0.72, ty);
    await page.waitForTimeout(700);
    log("B| 3rd tap =>", JSON.stringify(await page.evaluate(STATE)));
    await page.screenshot({ path: `${OUT}/CHD-B-mobile-tap3.png` });
    log("B| coarse-pointer metrics:", JSON.stringify(await page.evaluate(() => {
        const ov = document.querySelector('[class*="z-popover"]');
        const first = ov.querySelector(".eyedropper-action-btn");
        return {
            dockControlSize: getComputedStyle(first).getPropertyValue("--dock-control-size"),
            pointerCoarse: matchMedia("(pointer: coarse)").matches,
            btns: [...ov.querySelectorAll(".eyedropper-action-btn")].map((b) => { const r = b.getBoundingClientRect(); return { name: b.title, w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }),
            overlay: (() => { const r = ov.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })(),
            loupe: (() => { const l = document.querySelector(".loupe"); if (!l) return null; const r = l.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: r.width, h: r.height }; })(),
        };
    })));
    await b.close();
}

if (which === "all" || which === "C") {
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, reducedMotion: "reduce", forcedColors: "active", colorScheme: "light" });
    const page = await ctx.newPage();
    const vp = await open(page);
    log("C| zoom200+PRM+forced-colors viewport box:", JSON.stringify(vp));
    const [x, y] = [vp.x + vp.w * 0.3, vp.y + vp.h * 0.35];
    await page.mouse.move(x, y); await page.waitForTimeout(200);
    await page.mouse.move(x + 8, y + 8); await page.waitForTimeout(200);
    await page.mouse.click(x + 8, y + 8); await page.waitForTimeout(500);
    log("C| state =>", JSON.stringify(await page.evaluate(STATE)));
    log("C| computed:", JSON.stringify(await page.evaluate(() => {
        const c = document.querySelector(".eyedropper-canvas");
        const l = document.querySelector(".loupe");
        const ov = document.querySelector('[class*="z-popover"]');
        const cc = getComputedStyle(c), lc = l ? getComputedStyle(l) : null;
        return {
            prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
            forced: matchMedia("(forced-colors: active)").matches,
            canvasTransition: cc.transitionProperty + " " + cc.transitionDuration,
            canvasImageRendering: cc.imageRendering,
            loupeBorderColor: lc?.borderColor, loupeBoxShadow: lc?.boxShadow?.slice(0, 80), loupeTransitionDur: lc?.transitionDuration,
            overlayBg: getComputedStyle(ov).backgroundColor, overlayBackdrop: getComputedStyle(ov).backdropFilter,
            overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
    })));
    await page.screenshot({ path: `${OUT}/CHD-C-zoom200-forced.png` });
    await b.close();
}

if (which === "all" || which === "D") {
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const msgs = [];
    page.on("pageerror", (e) => msgs.push("PAGEERROR " + e.message.slice(0, 140)));
    page.on("console", (m) => { if (m.type() === "error") msgs.push("CONSOLE " + m.text().slice(0, 140)); });
    await open(page);
    msgs.length = 0;
    // Force the imageUrl watcher down the onerror path.
    await page.evaluate(() => {
        const ov = document.querySelector('[class*="z-popover"]');
        // Vue internal: bump the preview to a corrupt data url via the session ref
        const app = document.querySelector("#app")?.__vue_app__;
        return !!app;
    });
    await page.evaluate(() => new Promise((res) => {
        const i = new Image(); i.crossOrigin = "anonymous"; i.src = "data:image/png;base64,AAAA";
        i.onload = () => res("load"); i.onerror = () => res("error");
    }));
    await page.waitForTimeout(800);
    log("D| console/page errors after corrupt-image probe:", JSON.stringify(msgs.slice(0, 5)));
    await b.close();
}
