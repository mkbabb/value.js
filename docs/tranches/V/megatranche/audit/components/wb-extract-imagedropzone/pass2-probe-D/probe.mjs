// CHALLENGE-D probe — ImageDropZone (demo/workbenches/extract/ImageDropZone.vue)
// READ-ONLY against the running dev server. Writes only under this directory.
//   node docs/tranches/V/megatranche/audit/components/wb-extract-imagedropzone/probe.mjs
import { webkit, devices } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
mkdirSync(`${HERE}/shots`, { recursive: true });

// ---- minimal PNG encoder (no deps) --------------------------------------
const CRC = (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        t[n] = c;
    }
    return t;
})();
function crc32(buf) {
    let c = -1;
    for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
}
function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(td));
    return Buffer.concat([len, td, crc]);
}
function png(w, h, pixel) {
    const raw = Buffer.alloc((w * 3 + 1) * h);
    let o = 0;
    for (let y = 0; y < h; y++) {
        raw[o++] = 0;
        for (let x = 0; x < w; x++) {
            const [r, g, b] = pixel(x, y);
            raw[o++] = r;
            raw[o++] = g;
            raw[o++] = b;
        }
    }
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(w, 0);
    ihdr.writeUInt32BE(h, 4);
    ihdr[8] = 8;
    ihdr[9] = 2;
    return Buffer.concat([
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        chunk("IHDR", ihdr),
        chunk("IDAT", deflateSync(raw)),
        chunk("IEND", Buffer.alloc(0)),
    ]);
}
// a TALL portrait specimen: 300 x 1400, banded so clipping is visible
const TALL = png(300, 1400, (x, y) => {
    const band = Math.floor(y / 175);
    const p = [
        [220, 40, 60], [240, 140, 30], [245, 220, 40], [60, 190, 90],
        [40, 160, 220], [70, 70, 200], [150, 60, 190], [20, 20, 20],
    ][band % 8];
    return x < 6 || x > 293 ? [255, 255, 255] : p;
});
// a WIDE landscape specimen: 1600 x 200
const WIDE = png(1600, 200, (x) => [(x / 1600) * 255 | 0, 120, 200]);

const out = {};
const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
};

async function measure(page) {
    return page.evaluate(() => {
        const r = (el) => {
            const b = el.getBoundingClientRect();
            return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
        };
        const zone = document.querySelector('[role="button"][aria-label*="mage"]');
        if (!zone) return { zone: null };
        const cs = getComputedStyle(zone);
        const img = zone.querySelector("img");
        const tag = zone.querySelector("span[aria-hidden]");
        return {
            zone: r(zone),
            ariaLabel: zone.getAttribute("aria-label"),
            tabindex: zone.getAttribute("tabindex"),
            focused: document.activeElement === zone,
            zoneStyles: {
                borderRadius: cs.borderRadius,
                borderColor: cs.borderColor,
                borderStyle: cs.borderStyle,
                borderWidth: cs.borderWidth,
                background: cs.backgroundColor,
                outline: cs.outline,
                outlineOffset: cs.outlineOffset,
                boxShadow: cs.boxShadow,
                transitionProperty: cs.transitionProperty,
                transitionDuration: cs.transitionDuration,
                overflow: cs.overflow,
                minHeight: cs.minHeight,
                maxHeight: cs.maxHeight,
                cursor: cs.cursor,
                transform: cs.transform,
            },
            img: img
                ? {
                      rect: r(img),
                      natural: { w: img.naturalWidth, h: img.naturalHeight },
                      cs: {
                          objectFit: getComputedStyle(img).objectFit,
                          borderRadius: getComputedStyle(img).borderRadius,
                          height: getComputedStyle(img).height,
                          width: getComputedStyle(img).width,
                      },
                  }
                : null,
            cornerTag: tag ? { text: tag.textContent.trim(), cs: { opacity: getComputedStyle(tag).opacity, left: getComputedStyle(tag).left, right: getComputedStyle(tag).right, inset: getComputedStyle(tag).inset } } : null,
        };
    });
}

const browser = await webkit.launch();

// ---------- A. desktop light, empty state ----------
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    out.A_empty_desktop = await measure(page);

    // focus ring: click-free keyboard focus
    await page.evaluate(() => document.querySelector('[role="button"][aria-label*="mage"]').focus());
    await page.waitForTimeout(300);
    out.A_focused = await page.evaluate(() => {
        const z = document.querySelector('[role="button"][aria-label*="mage"]');
        const cs = getComputedStyle(z);
        return { isActive: document.activeElement === z, outline: cs.outline, outlineWidth: cs.outlineWidth, outlineStyle: cs.outlineStyle, outlineColor: cs.outlineColor, boxShadow: cs.boxShadow, borderColor: cs.borderColor };
    });
    await page.screenshot({ path: `${HERE}/shots/desktop-light-focused.png`, clip: { x: 200, y: 250, width: 800, height: 500 } });

    // drag flicker: dragover on the zone, then a dragleave that BUBBLES from a child
    out.A_drag = await page.evaluate(() => {
        const z = document.querySelector('[role="button"][aria-label*="mage"]');
        const child = z.querySelector("div");
        const log = [];
        const snap = (t) => log.push({ at: t, cls: z.className.includes("border-primary bg-primary/10") ? "DRAGGING" : "rest" });
        const dt = new DataTransfer();
        z.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: dt }));
        snap("after dragover on zone");
        child.dispatchEvent(new DragEvent("dragleave", { bubbles: true, cancelable: true, dataTransfer: dt }));
        snap("after dragleave from CHILD (bubbles)");
        return log;
    });

    // upload the TALL specimen
    await page.setInputFiles('input[type="file"]', { name: "tall.png", mimeType: "image/png", buffer: TALL });
    await page.waitForTimeout(2500);
    out.B_tall_desktop = await measure(page);
    await page.screenshot({ path: `${HERE}/shots/desktop-light-tall.png`, fullPage: false });

    // corner tag on hover
    await page.hover('[role="button"][aria-label*="mage"]').catch(() => {});
    await page.waitForTimeout(400);
    out.B_tall_hovered_tag = (await measure(page)).cornerTag;

    // now the WIDE specimen (same zone, keyed remount)
    await page.setInputFiles('input[type="file"]', { name: "wide.png", mimeType: "image/png", buffer: WIDE });
    await page.waitForTimeout(2500);
    out.C_wide_desktop = await measure(page);
    await page.screenshot({ path: `${HERE}/shots/desktop-light-wide.png`, fullPage: false });

    await ctx.close();
}

// ---------- D. mobile, tall specimen ----------
{
    const ctx = await browser.newContext({ ...devices["iPhone 14 Pro"], colorScheme: "dark" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    out.D_empty_mobile = await measure(page);
    await page.setInputFiles('input[type="file"]', { name: "tall.png", mimeType: "image/png", buffer: TALL });
    await page.waitForTimeout(2500);
    out.D_tall_mobile = await measure(page);
    await page.screenshot({ path: `${HERE}/shots/mobile-dark-tall.png`, fullPage: false });
    await ctx.close();
}

// ---------- E. forced-colors + RTL + 200% zoom ----------
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    out.E_forcedcolors_rest = await page.evaluate(() => {
        const z = document.querySelector('[role="button"][aria-label*="mage"]');
        const cs = getComputedStyle(z);
        return { borderColor: cs.borderColor, background: cs.backgroundColor, borderStyle: cs.borderStyle };
    });
    // simulate the dragging class swap and re-read
    out.E_forcedcolors_dragging = await page.evaluate(() => {
        const z = document.querySelector('[role="button"][aria-label*="mage"]');
        z.classList.remove("border-primary/30", "bg-primary/5");
        z.classList.add("border-primary", "bg-primary/10");
        const cs = getComputedStyle(z);
        return { borderColor: cs.borderColor, background: cs.backgroundColor };
    });
    await page.screenshot({ path: `${HERE}/shots/forced-colors.png`, clip: { x: 200, y: 250, width: 800, height: 500 } });
    await ctx.close();
}
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.setInputFiles('input[type="file"]', { name: "wide.png", mimeType: "image/png", buffer: WIDE });
    await page.waitForTimeout(2200);
    await page.hover('[role="button"][aria-label*="mage"]').catch(() => {});
    await page.waitForTimeout(500);
    out.F_rtl = await page.evaluate(() => {
        const z = document.querySelector('[role="button"][aria-label*="mage"]');
        const tag = z.querySelector("span[aria-hidden]");
        if (!tag) return { tag: null };
        const zr = z.getBoundingClientRect(), tr = tag.getBoundingClientRect();
        return {
            dir: getComputedStyle(z).direction,
            tagText: tag.textContent.trim(),
            distFromZoneLeft: +(tr.left - zr.left).toFixed(1),
            distFromZoneRight: +(zr.right - tr.right).toFixed(1),
        };
    });
    await page.screenshot({ path: `${HERE}/shots/rtl-wide.png`, clip: { x: 200, y: 250, width: 800, height: 500 } });
    await ctx.close();
}

writeFileSync(`${HERE}/probe.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
