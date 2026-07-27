// CHALLENGE-D probe 2 — readout, tap cycle, names, contrast, geometry.
import { webkit } from "playwright";
const DIR = new URL(".", import.meta.url).pathname;
const IMG = DIR + "probe-1200.png";
const out = {};

const READOUT = () => {
    const cv = document.querySelector("canvas.eyedropper-canvas");
    const ov = cv.parentElement.parentElement;
    return ov.querySelector("span.text-mono-small")?.textContent.trim();
};

async function open(page) {
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.locator("input[type=file]").first().setInputFiles(IMG);
    await page.waitForSelector('img[alt="Uploaded image"]');
    await page.waitForTimeout(1200);
    const dz = page.locator('div[aria-label="Image preview area, tap to sample colors"]');
    const b = await dz.boundingBox();
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
    await page.waitForSelector("canvas.eyedropper-canvas");
    await page.waitForTimeout(900);
}

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await open(page);

out.geom = await page.evaluate(() => {
    const cv = document.querySelector("canvas.eyedropper-canvas");
    const vp = cv.parentElement, ov = vp.parentElement;
    const cr = cv.getBoundingClientRect(), vr = vp.getBoundingClientRect(), or_ = ov.getBoundingClientRect();
    const bar = ov.firstElementChild.getBoundingClientRect();
    return {
        overlay: { w: +or_.width.toFixed(1), h: +or_.height.toFixed(1), x: +or_.x.toFixed(1), y: +or_.y.toFixed(1) },
        topbar: { h: +bar.height.toFixed(1) },
        stage: { w: +vr.width.toFixed(1), h: +vr.height.toFixed(1), x: +vr.x.toFixed(1), y: +vr.y.toFixed(1) },
        specimen: { w: +cr.width.toFixed(1), h: +cr.height.toFixed(1), x: +cr.x.toFixed(1), y: +cr.y.toFixed(1) },
        specimenAreaPctOfStage: +((cr.width * cr.height) / (vr.width * vr.height) * 100).toFixed(1),
        overlayBackdrop: getComputedStyle(ov).backdropFilter,
        overlayBg: getComputedStyle(ov).backgroundColor,
        primary: getComputedStyle(document.documentElement).getPropertyValue("--primary"),
    };
});

// tap cycle at three distinct points; readout after each
const s = out.geom.stage, sp = out.geom.specimen;
const P = (fx, fy) => [sp.x + sp.w * fx, sp.y + sp.h * fy];
out.tapCycle = [];
for (const [label, fx, fy] of [["purple-left", 0.25, 0.5], ["grey-right", 0.8, 0.5], ["grey-right-again", 0.8, 0.5], ["purple-left-2", 0.2, 0.3]]) {
    const [x, y] = P(fx, fy);
    await page.mouse.click(x, y);
    await page.waitForTimeout(320);
    out.tapCycle.push({ label, readout: await page.evaluate(READOUT), pinnedButtons: await page.evaluate(() => document.querySelectorAll("canvas.eyedropper-canvas")[0].parentElement.parentElement.querySelectorAll("button").length) });
}

// hover readout (mouse, unpinned) — needs unpin first
await page.mouse.click(...P(0.25, 0.5)); // unpin
await page.waitForTimeout(200);
await page.mouse.move(...P(0.25, 0.5));
await page.waitForTimeout(80);
await page.mouse.move(...P(0.26, 0.5));
await page.waitForTimeout(200);
out.hoverReadout = await page.evaluate(READOUT);

// widest legal representation: readout width vs available
out.readout = await page.evaluate(() => {
    const cv = document.querySelector("canvas.eyedropper-canvas");
    const ov = cv.parentElement.parentElement;
    const sp = ov.querySelector("span.text-mono-small");
    const cs = getComputedStyle(sp);
    return {
        text: sp.textContent.trim(), chars: sp.textContent.trim().length,
        clientW: sp.clientWidth, scrollW: sp.scrollWidth, truncated: sp.scrollWidth > sp.clientWidth + 1,
        title: sp.getAttribute("title"), overflow: cs.textOverflow,
        color: cs.color, font: cs.fontFamily.split(",")[0] + " " + cs.fontSize,
    };
});

// accessible names of the three eyedropper controls
out.aria = await page.locator("canvas.eyedropper-canvas").evaluate((cv) => {
    const ov = cv.parentElement.parentElement;
    return [...ov.querySelectorAll("button")].map((b) => ({
        title: b.getAttribute("title"), ariaLabel: b.getAttribute("aria-label"),
        text: b.textContent.trim(), w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height),
    }));
});
out.ariaSnapshot = await page.locator("canvas.eyedropper-canvas").evaluate(() => 0).catch(() => 0);
const ovLoc = page.locator("canvas.eyedropper-canvas").locator("xpath=../..");
out.ariaTree = await ovLoc.ariaSnapshot().catch((e) => String(e));

// keyboard: is anything in the eyedropper reachable / does Escape leave a trap?
await page.keyboard.press("Tab");
out.afterTab1 = await page.evaluate(() => {
    const cv = document.querySelector("canvas.eyedropper-canvas");
    const ov = cv?.parentElement?.parentElement;
    const a = document.activeElement;
    return { tag: a.tagName, name: a.getAttribute("title") || a.getAttribute("aria-label") || a.textContent.trim().slice(0, 30), insideOverlay: ov ? ov.contains(a) : null };
});
await page.keyboard.press("Tab");
out.afterTab2 = await page.evaluate(() => {
    const cv = document.querySelector("canvas.eyedropper-canvas");
    const ov = cv?.parentElement?.parentElement;
    const a = document.activeElement;
    return { tag: a.tagName, name: a.getAttribute("title") || a.getAttribute("aria-label") || a.textContent.trim().slice(0, 30), insideOverlay: ov ? ov.contains(a) : null };
});

// keyboard sampling: arrows should move the sample per VISUAL-CONSTITUTION §5.2
const before = await page.evaluate(READOUT);
for (const k of ["ArrowRight", "ArrowRight", "ArrowDown", "Home", "End"]) await page.keyboard.press(k);
await page.waitForTimeout(200);
out.keyboardSampling = { before, after: await page.evaluate(READOUT) };

// focus restoration on close
await page.keyboard.press("Escape");
await page.waitForTimeout(150);
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
out.afterClose = await page.evaluate(() => ({
    overlayGone: !document.querySelector("canvas.eyedropper-canvas"),
    active: document.activeElement.tagName + " " + (document.activeElement.getAttribute("aria-label") || "").slice(0, 40),
}));

console.log(JSON.stringify(out, null, 2));
await browser.close();
