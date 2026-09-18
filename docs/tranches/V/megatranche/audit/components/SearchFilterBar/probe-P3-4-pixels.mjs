// CHALLENGE-D pass-3 · probe 4 — PIXEL TRUTH.
// The constitution (§4.1) requires RENDERED contrast on the actual material tier: "a token name is
// not evidence". Computed styles cannot supply it here — the popover is `glass-floating` with a
// backdrop-filter over a live aurora, so its effective ground exists only in the composited frame.
// This probe screenshots the real frame and reads the pixels back through a canvas.
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "evidence-p3");
const SHOTS = resolve(HERE, "shots-p3");
mkdirSync(OUT, { recursive: true });
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";
const DPR = 4;

const lum = (c) => { const f = c.map((v) => { const x = v / 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
const ratio = (a, b) => { const la = lum(a), lb = lum(b); return +(((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05))).toFixed(2); };

const browser = await webkit.launch();
const out = {};

for (const scheme of ["light", "dark"]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: DPR });
    const page = await context.newPage();
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2800);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(800);
    // one active filter so the badge exists
    await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"][data-state="open"]');
        [...dlg.querySelectorAll("label")].find((l) => l.textContent.trim() === "Featured")?.click();
    });
    await page.waitForTimeout(400);

    // the exact ink runs we want, in CSS px
    const targets = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"][data-state="open"]');
        const r = (b) => ({ x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2) });
        const inkBox = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); return r(rg.getBoundingClientRect()); };
        const labels = [...dlg.querySelectorAll(".section-label")];
        const options = [...dlg.querySelectorAll(".filter-option")];
        const input = dlg.querySelector('input[aria-label="Search by CSS color"]');
        const searchBtn = input.parentElement.querySelector("button");
        const clearBtn = [...dlg.querySelectorAll("button")].find((b) => b.textContent.includes("Clear all"));
        const optSpan = (o) => [...o.querySelectorAll("span")].pop();
        return {
            dialog: r(dlg.getBoundingClientRect()),
            sectionLabel: inkBox(labels[0]),
            optionText: inkBox(optSpan(options[0])),
            searchPillText: inkBox(searchBtn),
            clearAllText: clearBtn ? inkBox(clearBtn) : null,
            placeholder: r(input.getBoundingClientRect()),
            divider: (() => { const s = dlg.querySelectorAll(".filter-section")[0]; const b = s.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +(b.bottom - 0.5).toFixed(2), w: +b.width.toFixed(2), h: 1 }; })(),
        };
    });

    // clip screenshots at DPR, then read pixels back through a canvas in a blank page
    const clips = {};
    const pad = 6;
    for (const [k, box] of Object.entries(targets)) {
        if (!box || k === "dialog") continue;
        const clip = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: Math.min(box.w + pad * 2, 400), height: Math.min(box.h + pad * 2, 200) };
        clips[k] = (await page.screenshot({ clip })).toString("base64");
    }
    // full popover + trigger crops for the eye
    await page.screenshot({ path: resolve(SHOTS, `P3-px-${scheme}-popover.png`), clip: { x: targets.dialog.x - 4, y: targets.dialog.y - 4, width: targets.dialog.w + 8, height: Math.min(targets.dialog.h + 8, 900 - targets.dialog.y) } });
    const trig = await page.evaluate(() => { const t = document.querySelector('button[aria-label="Filters"]'); const b = t.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(700);
    await page.screenshot({ path: resolve(SHOTS, `P3-px-${scheme}-badge.png`), clip: { x: trig.x - 10, y: trig.y - 10, width: trig.w + 20, height: trig.h + 20 } });
    const badgeShot = (await page.screenshot({ clip: { x: trig.x - 10, y: trig.y - 10, width: trig.w + 20, height: trig.h + 20 } })).toString("base64");
    await context.close();

    // ---- read the pixels back -------------------------------------------------
    const ctx2 = await browser.newContext();
    const p2 = await ctx2.newPage();
    await p2.setContent("<canvas id=c></canvas>");
    const measured = {};
    for (const [k, b64] of Object.entries(clips)) {
        measured[k] = await p2.evaluate(async (b64) => {
            const img = new Image();
            await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
            const c = document.getElementById("c"); c.width = img.width; c.height = img.height;
            const g = c.getContext("2d", { willReadFrequently: true });
            g.drawImage(img, 0, 0);
            const d = g.getImageData(0, 0, c.width, c.height).data;
            const hist = new Map();
            for (let i = 0; i < d.length; i += 4) {
                const key = `${d[i]},${d[i + 1]},${d[i + 2]}`;
                hist.set(key, (hist.get(key) ?? 0) + 1);
            }
            const sorted = [...hist.entries()].sort((a, b) => b[1] - a[1]);
            const ground = sorted[0][0].split(",").map(Number);
            const L = (c) => { const f = c.map((v) => { const x = v / 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
            const lg = L(ground);
            // ink = the pixel with maximum luminance distance from the ground that occupies >=0.4% of the crop
            let ink = ground, best = 0;
            const total = c.width * c.height;
            for (const [key, n] of sorted) {
                if (n / total < 0.004) break;
                const px = key.split(",").map(Number);
                const dd = Math.abs(L(px) - lg);
                if (dd > best) { best = dd; ink = px; }
            }
            return { ground, ink, w: c.width, h: c.height, distinctColours: hist.size };
        }, b64);
        measured[k].contrast = ratio(measured[k].ink, measured[k].ground);
    }
    // badge clip geometry from pixels: how much gold survives?
    measured.badgePixels = await p2.evaluate(async (b64) => {
        const img = new Image();
        await new Promise((res) => { img.onload = res; img.src = "data:image/png;base64," + b64; });
        const c = document.getElementById("c"); c.width = img.width; c.height = img.height;
        const g = c.getContext("2d", { willReadFrequently: true });
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        // gold = the badge fill family; find its bounding box and area
        let minX = 1e9, minY = 1e9, maxX = -1, maxY = -1, n = 0;
        for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
            const i = (y * c.width + x) * 4, r = d[i], gg = d[i + 1], b = d[i + 2];
            // olive/gold: r>g>b, clearly chromatic, mid lightness
            if (r > 70 && r < 200 && gg > 50 && gg < 175 && b < 90 && r - b > 55 && r - gg > 8) {
                n++; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
            }
        }
        return { goldPixels: n, bbox: maxX < 0 ? null : { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 }, cropW: c.width, cropH: c.height };
    }, badgeShot);
    await ctx2.close();
    out[scheme] = { targets, measured };
}
await browser.close();
writeFileSync(resolve(OUT, "P3-4-pixels.json"), JSON.stringify(out, null, 1));
for (const scheme of ["light", "dark"]) {
    console.log("=====", scheme);
    for (const [k, v] of Object.entries(out[scheme].measured)) {
        if (k === "badgePixels") { console.log("  badgePixels", JSON.stringify(v)); continue; }
        console.log(` ${k.padEnd(16)} ink=${v.ink} ground=${v.ground} contrast=${v.contrast}`);
    }
}
