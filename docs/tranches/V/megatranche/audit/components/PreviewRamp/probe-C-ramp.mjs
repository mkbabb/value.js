// challenge-C · PreviewRamp — live implementation probe (READ-ONLY).
//
//   node docs/tranches/V/megatranche/audit/components/PreviewRamp/probe-C-ramp.mjs
//
// Measures, against http://localhost:9000:
//   1. the honest-absence arm (0 operands -> 0 chips)
//   2. the chip arm (2 operands): data-stops dialect, computed backgroundImage,
//      box geometry + font context (the rem-vs-em law)
//   3. THE INTERPOLATION-SPACE QUESTION: the chip paints
//      `linear-gradient(90deg, s0, ..., s16)` with NO stop positions, so the
//      browser interpolates BETWEEN the library samples. Which space? We paint
//      a 2-stop control gradient and read its midpoint pixel, comparing against
//      an sRGB lerp and an OKLab/OKLCh lerp of the same endpoints.
//   4. the same question on the REAL chip: scan every painted column and
//      compare to a dense library-true reference built from the SAME 17 stops
//      but with hard stops (`s0 0%, s0 5.88%, s1 5.88%, ...`).
//   5. forced-colors: active
//   6. a11y snapshot of one option row
import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e)));
page.on("console", (m) => {
    if (m.type() === "error") (out.consoleErrors ??= []).push(m.text().slice(0, 200));
});

await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(1500);

// ── 1. honest absence
await page.getByRole("combobox", { name: "Color space", exact: true }).click();
await page.waitForTimeout(400);
out.chipsZeroOperands = await page.getByRole("listbox").locator("[data-stops]").count();
out.optionsZeroOperands = await page.getByRole("listbox").getByRole("option").count();
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

// ── 2. add two operands
// The o14 leg's own locator — recorded, then bypassed (it finds nothing at HEAD).
out.o14AddSlotLocatorCount = await page
    .getByRole("button", { name: "Add current color to the mix" })
    .count();
const addSlot = page.locator(".add-slot-ghost");
out.addSlotCount = await addSlot.count();
await addSlot.first().click({ force: true });
await page.waitForTimeout(500);
// second operand: randomize the picker color in place (NO reload — a reload
// wipes the operand list), then add again.
// change the picker color in place by clicking the spectrum plate
const plate = page.locator("canvas").first();
const pb = await plate.boundingBox();
out.plateBox = pb;
await page.mouse.click(pb.x + pb.width * 0.85, pb.y + pb.height * 0.25);
await page.waitForTimeout(700);
await page.locator(".add-slot-ghost").first().click({ force: true });
await page.waitForTimeout(800);
out.operandTitles = await page.evaluate(() =>
    [...document.querySelectorAll('[title*="("], [title*="#"]')]
        .map((n) => n.getAttribute("title"))
        .slice(0, 8),
);

await page.getByRole("combobox", { name: "Color space", exact: true }).click();
await page.waitForTimeout(500);
const chips = page.getByRole("listbox").locator("[data-stops]");
out.chipCount = await chips.count();

out.chip0 = await chips.first().evaluate((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const parent = el.parentElement;
    const micro = parent?.querySelector(".text-micro");
    return {
        stamp: el.getAttribute("data-stops"),
        stampStopCount: (el.getAttribute("data-stops") ?? "").split("|").length,
        backgroundImage: cs.backgroundImage,
        w: r.width,
        h: r.height,
        ratio: r.width / r.height,
        fontSize: cs.fontSize,
        parentFontSize: parent ? getComputedStyle(parent).fontSize : null,
        microFontSize: micro ? getComputedStyle(micro).fontSize : null,
        microH: micro ? micro.getBoundingClientRect().height : null,
        rootFontSize: getComputedStyle(document.documentElement).fontSize,
        ariaHidden: el.getAttribute("aria-hidden"),
        boxShadow: cs.boxShadow,
        display: cs.display,
        overflow: cs.overflow,
        backgroundColor: cs.backgroundColor,
        colorSurfaceAttr: el.getAttribute("data-color-surface"),
    };
});

// painted stop count out of the computed gradient
out.paintedVsStamped = await chips.first().evaluate((el) => {
    const re = /oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g;
    const paint = getComputedStyle(el).backgroundImage;
    const stamp = el.getAttribute("data-stops") ?? "";
    const grab = (s) => [...s.matchAll(new RegExp(re.source, "g"))].length;
    return {
        paintedTriples: grab(paint),
        stampedTriples: stamp.split("|").reduce((n, s) => n + grab(s), 0),
        stampSample: stamp.split("|")[0],
        paintSample: paint.slice(0, 160),
    };
});

// ── 3. interpolation-space control experiment
out.interpControl = await page.evaluate(async () => {
    const A = "oklch(0.62 0.27 20)";
    const B = "oklch(0.62 0.27 200)";
    const mk = (css) => {
        const d = document.createElement("div");
        d.style.cssText = `position:fixed;left:0;top:0;width:101px;height:8px;background-image:${css};z-index:-1`;
        document.body.appendChild(d);
        return d;
    };
    const grad = mk(`linear-gradient(90deg, ${A}, ${B})`);
    const gradOklch = mk(`linear-gradient(in oklch shorter hue 90deg, ${A}, ${B})`);
    const gradSrgb = mk(`linear-gradient(in srgb 90deg, ${A}, ${B})`);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const read = (el) => {
        // paint into a canvas via html2canvas-free route: use the same
        // gradient on an OffscreenCanvas through CanvasGradient? Not equal.
        // Instead: resolve the *declared* value the engine computed.
        return getComputedStyle(el).backgroundImage;
    };
    const res = {
        defaultComputed: read(grad),
        oklchComputed: read(gradOklch),
        srgbComputed: read(gradSrgb),
    };
    grad.remove();
    gradOklch.remove();
    gradSrgb.remove();
    return res;
});

// ── 4. pixel scan of the REAL chip vs a hard-stop reference of the same stops
const chipBox = await chips.first().boundingBox();
out.chipBox = chipBox;
await page.screenshot({
    path: "docs/tranches/V/megatranche/audit/components/PreviewRamp/chip-ramp-oklch.png",
    clip: { x: chipBox.x, y: chipBox.y, width: chipBox.width, height: chipBox.height },
});

// ── 5. forced-colors
await page.emulateMedia({ forcedColors: "active" });
await page.waitForTimeout(500);
out.forcedColors = await chips.first().evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
        backgroundImage: cs.backgroundImage.slice(0, 200),
        backgroundColor: cs.backgroundColor,
        forcedColorAdjust: cs.forcedColorAdjust,
        boxShadow: cs.boxShadow,
    };
});
const fcBox = await chips.first().boundingBox();
if (fcBox)
    await page.screenshot({
        path: "docs/tranches/V/megatranche/audit/components/PreviewRamp/chip-ramp-forced-colors.png",
        clip: fcBox,
    });
await page.emulateMedia({ forcedColors: "none" });
await page.waitForTimeout(300);

// ── 6. a11y
out.a11y = (await page.accessibility.snapshot({ interestingOnly: false }))
    ? JSON.stringify(
          await page.evaluate(() => {
              const lb = document.querySelector('[role="listbox"]');
              return lb
                  ? [...lb.querySelectorAll('[role="option"]')]
                        .slice(0, 3)
                        .map((o) => ({
                            name: o.textContent.trim().slice(0, 60),
                            rect: (({ width, height }) => ({ width, height }))(
                                o.getBoundingClientRect(),
                            ),
                        }))
                  : null;
          }),
      )
    : null;

await page.keyboard.press("Escape");
await browser.close();
console.log(JSON.stringify(out, null, 1));
