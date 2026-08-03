// CHALLENGE-D r2 · probe 11 — register LOUDNESS, all measured in ONE crop from
// ONE baseline: how many pixels each register moves relative to the bare rail.
// Read-only.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

async function grab(page, clip) {
    const buf = await page.screenshot({ clip });
    return page.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        return { w: c.width, h: c.height, data: [...x.getImageData(0, 0, c.width, c.height).data] };
    }, buf.toString("base64"));
}
const delta = (a, b, thr = 6) => { let n = 0, m = 0; for (let i = 0; i < a.data.length; i += 4) { const d = dist([a.data[i], a.data[i + 1], a.data[i + 2]], [b.data[i], b.data[i + 1], b.data[i + 2]]); if (d > thr) n++; if (d > m) m = d; } return { changedPx: n, pctOfRail: +((n / (a.w * a.h)) * 100).toFixed(2), maxChannelDist: +m.toFixed(1) }; };

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2600);

const clip = await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: b.x - 5, y: b.y - 5, width: b.width + 10, height: b.height + 10 }; });
await page.mouse.move(2, 2); await page.waitForTimeout(400);

const out = {};
// BASELINE — boot state: NO selection, no hover, no focus.
const base = await grab(page, clip);
out.baseline = await page.evaluate(() => ({ anySelected: [...document.querySelectorAll(".channel-rail-item")].some((e) => e.getAttribute("aria-selected") === "true") }));

// R_selected: click L (this also focuses it) then move the mouse away.
await page.click(".channel-rail-item >> nth=0");
await page.waitForTimeout(900); await page.mouse.move(2, 2); await page.waitForTimeout(700);
const selectedOnly = await grab(page, clip);
out.R_selected_dot = delta(base, selectedOnly);

// R_hover on a DIFFERENT, unselected item
await page.hover(".channel-rail-item >> nth=2");
await page.waitForTimeout(700);
const hovered = await grab(page, clip);
out.R_hover_pill = delta(selectedOnly, hovered);

// R_focus: blur, then Tab back in (focus lands on the selected item)
await page.mouse.move(2, 2); await page.waitForTimeout(600);
await page.evaluate(() => document.activeElement?.blur?.());
await page.waitForTimeout(500);
const blurred = await grab(page, clip);
for (let i = 0; i < 30; i++) { await page.keyboard.press("Tab"); if (await page.evaluate(() => document.activeElement?.classList?.contains("channel-rail-item") ?? false)) break; }
await page.waitForTimeout(600);
const focused = await grab(page, clip);
out.R_focus_ring = delta(blurred, focused);
out.focusLandedOn = await page.evaluate(() => ({ text: document.activeElement.textContent.trim(), selected: document.activeElement.getAttribute("aria-selected") }));

// R_press (already proven dead; recorded here for the same-crop table)
await page.mouse.move(2, 2); await page.waitForTimeout(400);
const preRess = await grab(page, clip);
{
    const el = await page.$(".channel-rail-item >> nth=2");
    const bb = await el.boundingBox();
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await page.waitForTimeout(600);
    const hoverOnly = await grab(page, clip);
    await page.mouse.down(); await page.waitForTimeout(260);
    const pressed = await grab(page, clip);
    await page.mouse.up();
    out.R_press_beyond_hover = delta(hoverOnly, pressed);
    out.R_press_note = "delta measured against the SAME item already hovered, so it isolates the press leg alone";
}
writeFileSync(join(HERE, "probe-11-register-loudness.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
