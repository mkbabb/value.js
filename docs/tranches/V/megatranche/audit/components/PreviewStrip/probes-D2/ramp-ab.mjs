/**
 * CHALLENGE-D (second seat) probe 2 — the LIVE A/B for the ring, plus the
 * chip's typographic anchor.
 *
 *   B  = PreviewRamp on /mix  (payload = background-image on the element)
 *   A' = PreviewStrip on /generate in DARK (payload = opaque children)
 *
 * Also records, for both hosts, the font-size the chip's `block-size: 1em`
 * resolves against vs the font-size of the description copy it sits beside.
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:9000";
const log = {};

async function main() {
    const browser = await chromium.launch();

    // ---------- B · PreviewRamp, /mix, light ----------
    try {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            deviceScaleFactor: 4,
            colorScheme: "light",
        });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/mix`, { waitUntil: "networkidle" });
        await page.waitForTimeout(1500);
        await page.locator('button[role="combobox"][aria-label="Color space"]').click();
        try {
            await page.waitForSelector(".preview-chip", { timeout: 6000 });
        } catch {
            log.rampAbsent = await page.evaluate(() => ({
                note: "no .preview-chip rendered — sampleInterpolationRamp returns null with <2 operands, so the ramp's honest-absence arm is LIVE on a fresh /mix",
                optionCount: document.querySelectorAll('[role="option"]').length,
                firstOptionText: (document.querySelector('[role="option"]')?.textContent||"").trim().slice(0,60),
            }));
            await ctx.close();
            throw { skip: true };
        }
        await page.waitForTimeout(500);
        log.ramp = await page.evaluate(() => {
            const el = document.querySelector(".preview-chip");
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            const lane = el.parentElement;
            const copy = lane?.querySelector("span:not(.preview-chip)");
            return {
                className: el.className,
                childCount: el.children.length,
                rect: { w: +r.width.toFixed(3), h: +r.height.toFixed(3) },
                ratio: +(r.width / r.height).toFixed(4),
                boxShadow: cs.boxShadow,
                display: cs.display,
                chipFontSize: cs.fontSize,
                copyFontSize: copy ? getComputedStyle(copy).fontSize : null,
                copyClass: copy ? copy.className : null,
            };
        });
        await page.locator(".preview-chip").first().screenshot({ path: join(OUT, "B-ramp-live.png") });
        await ctx.close();
    } catch (e) {
        if (!e || !e.skip) log.rampError = String(e).slice(0, 200);
    }

    // ---------- A' · PreviewStrip, /generate, DARK ----------
    {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            deviceScaleFactor: 4,
            colorScheme: "dark",
        });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/generate`, { waitUntil: "networkidle" });
        await page.waitForTimeout(1200);
        await page.locator('button[role="combobox"][aria-label="Generation preset"]').click();
        await page.waitForSelector(".preview-strip", { timeout: 8000 });
        await page.waitForTimeout(500);
        log.stripDark = await page.evaluate(() => {
            const el = document.querySelector(".preview-strip");
            const cs = getComputedStyle(el);
            const lane = el.parentElement;
            const copy = lane?.querySelector("span:not(.preview-chip)");
            const r = el.getBoundingClientRect();
            return {
                rect: { w: +r.width.toFixed(3), h: +r.height.toFixed(3) },
                ratio: +(r.width / r.height).toFixed(4),
                boxShadow: cs.boxShadow,
                chipFontSize: cs.fontSize,
                copyFontSize: copy ? getComputedStyle(copy).fontSize : null,
                copyClass: copy ? copy.className : null,
                laneClass: lane ? lane.className : null,
                nameLaneFont: (() => {
                    const opt = el.closest('[role="option"]');
                    const name = opt?.querySelector(".font-display");
                    return name
                        ? {
                              fontSize: getComputedStyle(name).fontSize,
                              fontFamily: getComputedStyle(name).fontFamily.split(",")[0],
                              fontWeight: getComputedStyle(name).fontWeight,
                          }
                        : null;
                })(),
            };
        });
        await page.locator(".preview-strip").first().screenshot({ path: join(OUT, "A2-strip-dark.png") });
        await page.locator('[role="option"]').first().screenshot({ path: join(OUT, "A2-row-dark.png") });
        await ctx.close();
    }

    // ---------- the /generate light row, whole, for the rhythm read ----------
    {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            deviceScaleFactor: 3,
            colorScheme: "light",
        });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/generate`, { waitUntil: "networkidle" });
        await page.waitForTimeout(1200);
        await page.locator('button[role="combobox"][aria-label="Generation preset"]').click();
        await page.waitForSelector(".preview-strip", { timeout: 8000 });
        await page.waitForTimeout(400);
        log.genLightRow = await page.evaluate(() => {
            const el = document.querySelector(".preview-strip");
            const lane = el.parentElement;
            const copy = lane?.querySelector("span:not(.preview-chip)");
            const opt = el.closest('[role="option"]');
            const name = opt?.querySelector(".font-display");
            const cr = copy.getBoundingClientRect();
            const er = el.getBoundingClientRect();
            return {
                chipFontSize: getComputedStyle(el).fontSize,
                chipH: +er.height.toFixed(3),
                copyFontSize: getComputedStyle(copy).fontSize,
                copyClass: copy.className,
                copyInkH: +cr.height.toFixed(3),
                chipOverCopyFont:
                    +(
                        parseFloat(getComputedStyle(el).fontSize) /
                        parseFloat(getComputedStyle(copy).fontSize)
                    ).toFixed(3),
                nameFontSize: name ? getComputedStyle(name).fontSize : null,
                nameFamily: name ? getComputedStyle(name).fontFamily.split(",")[0] : null,
                nameWeight: name ? getComputedStyle(name).fontWeight : null,
                optionRect: (() => {
                    const o = opt.getBoundingClientRect();
                    return { w: +o.width.toFixed(2), h: +o.height.toFixed(2) };
                })(),
            };
        });
        await page.locator('[role="option"]').first().screenshot({ path: join(OUT, "A3-row-light.png") });
        await page.locator('[role="listbox"], [role="presentation"]').first().screenshot({
            path: join(OUT, "A3-menu-light.png"),
        }).catch(() => {});
        await ctx.close();
    }

    writeFileSync(join(OUT, "ramp-ab.json"), JSON.stringify(log, null, 2));
    console.log(JSON.stringify(log, null, 2));
    await browser.close();
}

main().catch((e) => {
    console.error("FAIL", e);
    process.exit(1);
});
