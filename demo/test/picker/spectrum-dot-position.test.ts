// @vitest-environment node
// SS-8 B01 (SS8-0012, record D-02/D-08): the spectrum thumb's `position: absolute` must win
// over WatercolorDot's own `position` default by STRUCTURE, never by stylesheet emission order.
// Both SFC style blocks are compiled scoped exactly as Vite does, then injected into one headless
// Chromium page in BOTH orders; the real cascade decides the computed position.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compileStyle, parse } from "@vue/compiler-sfc";
import { chromium, type Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "../..");
const DOT_ID = "data-v-dot0000";
const CANVAS_ID = "data-v-cnv0000";

function scopedCss(file: string, id: string): string {
    const path = resolve(ROOT, file);
    const { descriptor } = parse(readFileSync(path, "utf8"), { filename: path });
    return descriptor.styles
        .map((style) => {
            const out = compileStyle({ source: style.content, filename: path, id, scoped: style.scoped === true });
            if (out.errors.length) throw out.errors[0];
            return out.code;
        })
        .join("\n");
}

const dotCss = scopedCss("shared/ui/watercolor-dot/WatercolorDot.vue", DOT_ID);
const canvasCss = scopedCss("picker/controls/SpectrumCanvas/SpectrumCanvas.vue", CANVAS_ID);

let browser: Browser;
beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
});
afterAll(async () => {
    await browser?.close();
});

async function positionOf(sheets: string[], markup: string): Promise<string> {
    const context = await browser.newContext();
    try {
        const page = await context.newPage();
        const styles = sheets.map((css) => `<style>${css}</style>`).join("");
        await page.setContent(`<!doctype html><html><head>${styles}</head><body>${markup}</body></html>`);
        return await page.$eval("#probe", (el) => getComputedStyle(el).position);
    } finally {
        await context.close();
    }
}

// The thumb as mounted: WatercolorDot's root carries its own scope id and the parent's.
const THUMB = `<div style="position:relative;width:200px;height:200px">
  <span id="probe" class="spectrum-dot watercolor-swatch" data-variant="solid" ${DOT_ID} ${CANVAS_ID}></span></div>`;
const BARE = `<span id="probe" class="watercolor-swatch" data-variant="solid" ${DOT_ID}></span>`;

describe("spectrum thumb position is order-independent (SS8-0012)", () => {
    it("is absolute when the dot's sheet is emitted first", async () => {
        expect(await positionOf([dotCss, canvasCss], THUMB)).toBe("absolute");
    });

    it("is absolute when the dot's sheet is emitted last", async () => {
        expect(await positionOf([canvasCss, dotCss], THUMB)).toBe("absolute");
    });

    it("keeps the dot's own relative default where no consumer places it", async () => {
        expect(await positionOf([dotCss], BARE)).toBe("relative");
    });
});
