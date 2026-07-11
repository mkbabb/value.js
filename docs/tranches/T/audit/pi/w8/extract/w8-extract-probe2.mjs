/**
 * T.W8 · EXTRACT p1 — supplementary probe: (a) the known-imminent skeleton
 * caught live (large noisy image + 6× CPU throttle), (b) the 390 touch
 * hit-area honesty read on the extract slider thumbs. Probe-only.
 */
import { chromium } from "@playwright/test";
import { appendFileSync } from "node:fs";

const BASE = "http://localhost:8640";
const OUT = "docs/tranches/T/audit/pi/w8/extract";
const OWNER_COLOR = "lab(40.39% 52.94 47.26 / 82.7%)";
const URL = `${BASE}/#/extract?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`;
const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

const browser = await chromium.launch({ headless: true });

// (a) skeleton catch at 1440-light
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: "light",
    });
    const page = await ctx.newPage();
    await page.goto(URL);
    await page
        .locator('[data-slot="shadow-palette"]')
        .waitFor({ state: "visible", timeout: 15000 });
    await page.waitForTimeout(3000);
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 6 });
    const b64 = await page.evaluate(() => {
        const c = document.createElement("canvas");
        c.width = 1600;
        c.height = 1200;
        const g = c.getContext("2d");
        for (let y = 0; y < 1200; y += 8)
            for (let x = 0; x < 1600; x += 8) {
                g.fillStyle = `hsl(${(x * 7 + y * 13) % 360} ${40 + ((x + y) % 50)}% ${30 + ((x * y) % 45)}%)`;
                g.fillRect(x, y, 8, 8);
            }
        return c.toDataURL("image/png").split(",")[1];
    });
    await page.locator('input[type="file"]').setInputFiles({
        name: "probe-noise.png",
        mimeType: "image/png",
        buffer: Buffer.from(b64, "base64"),
    });
    // poll fast for the imminent skeleton
    let caught = null;
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
        const state = await page.evaluate(() => {
            const skel = document.querySelector(
                '[data-slot="palette-card-skeleton"]',
            );
            const anySkel = [...document.querySelectorAll("*")].find(
                (e) =>
                    e !== document.documentElement &&
                    /skeleton/i.test(e.getAttribute("data-slot") || "") ,
            );
            const dom = [...document.querySelectorAll("span")].some((e) =>
                e.textContent.includes("% of the image"),
            );
            return {
                skel: !!(skel || anySkel),
                skelTag: (skel || anySkel)?.className?.slice?.(0, 60),
                done: dom,
            };
        });
        if (state.skel) {
            caught = state;
            await page.screenshot({
                path: `${OUT}/1440-light-imminent-skeleton.png`,
            });
            break;
        }
        if (state.done) break;
        await new Promise((r) => setTimeout(r, 60));
    }
    log(
        `imminent skeleton caught: ${!!caught}${caught ? " cls=" + caught.skelTag : ""}`,
    );
    if (caught) {
        const anim = await page.evaluate(() => {
            const skel = document.querySelector(
                '[data-slot="palette-card-skeleton"]',
            );
            if (!skel) return null;
            const inner = skel.querySelector("[class*='animate'], [class*='pulse'], [class*='breath']") || skel;
            const cs = getComputedStyle(inner);
            return {
                animationName: cs.animationName,
                duration: cs.animationDuration,
                cls: inner.className.slice(0, 80),
            };
        });
        log(`skeleton register: ${JSON.stringify(anim)}`);
    }
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    await page
        .locator("text=% of the image")
        .waitFor({ state: "visible", timeout: 30000 })
        .catch(() => {});
    await ctx.close();
}

// (b) 390 touch hit-area on extract thumbs
{
    const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        colorScheme: "light",
        hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(URL);
    await page
        .locator('[data-slot="shadow-palette"]')
        .waitFor({ state: "visible", timeout: 15000 });
    await page.waitForTimeout(2500);
    const hit = await page.evaluate(() => {
        const read = (thumb) => {
            const r = thumb.getBoundingClientRect();
            const cs = getComputedStyle(thumb);
            const after = getComputedStyle(thumb, "::after");
            const before = getComputedStyle(thumb, "::before");
            return {
                box: `${r.width.toFixed(0)}×${r.height.toFixed(0)}`,
                afterInset: after.inset || after.top,
                afterContent: after.content,
                beforeInset: before.inset || before.top,
                beforeContent: before.content,
                touchAction: cs.touchAction,
            };
        };
        const kc = document.querySelector(
            '[data-o18="extract-kc"] .slider-thumb',
        );
        const kRail = document.querySelector('[data-o18="extract-k-rail"]');
        const k = kRail.parentElement.querySelector(".slider-thumb");
        const kcTrack = document.querySelector(
            '[data-o18="extract-kc"] .slider-track',
        );
        const tr = kcTrack.getBoundingClientRect();
        return {
            kThumb: read(k),
            kcThumb: read(kc),
            kcTrackBox: `${tr.width.toFixed(0)}×${tr.height.toFixed(0)}`,
        };
    });
    log(`390 touch hit-areas: ${JSON.stringify(hit, null, 1)}`);
    await ctx.close();
}

await browser.close();
appendFileSync(
    `${OUT}/w8-extract-probe-log.txt`,
    "\n=== SUPPLEMENTARY (probe2) ===\n" + report.join("\n") + "\n",
);
log("DONE probe2");
