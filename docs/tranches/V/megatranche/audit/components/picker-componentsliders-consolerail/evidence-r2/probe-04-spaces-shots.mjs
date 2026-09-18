// CHALLENGE-D r2 · probe 04 — visual witnesses for every register, plus the
// color-space arms (4-channel and the 2-channel KELVIN extreme) and the
// space-change dot wipe. Read-only.
import { webkit, chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SHOTS = HERE;
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2500);

const out = {};

// Where is the space selector? enumerate every combobox/select in the picker.
out.controls = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll("button,[role=combobox],select,[role=button]")];
    return nodes.slice(0, 60).map((el) => ({
        tag: el.tagName, role: el.getAttribute("role"), aria: el.getAttribute("aria-label"),
        text: el.textContent.trim().slice(0, 30),
        cls: el.className.toString().slice(0, 70),
    })).filter((n) => /space|lab|oklch|rgb|hsl/i.test(n.text + n.aria + n.cls));
});

// Crop helper: the rail + the rows beside it, so alignment is visible.
async function shot(name, pad = { l: 8, t: 10, r: 250, b: 10 }) {
    const clip = await page.evaluate(({ pad }) => {
        const rail = document.querySelector(".channel-rail");
        const b = rail.getBoundingClientRect();
        return { x: Math.max(0, b.x - pad.l), y: Math.max(0, b.y - pad.t), width: b.width + pad.l + pad.r, height: b.height + pad.t + pad.b };
    }, { pad });
    await page.screenshot({ path: join(SHOTS, name), clip });
    return clip;
}

// --- REGISTER WITNESSES ---------------------------------------------------
out.shots = {};
out.shots.R0_default_no_dot = await shot("shot-R0-default-NO-DOT.png");

await page.click(".channel-rail-item >> nth=0");
await page.waitForTimeout(800);
out.shots.R1_selected = await shot("shot-R1-selected-L.png");

await page.hover(".channel-rail-item >> nth=1");
await page.waitForTimeout(500);
out.shots.R2_hover_unselected = await shot("shot-R2-hover-unselected.png");

await page.hover(".channel-rail-item >> nth=0");
await page.waitForTimeout(500);
out.shots.R3_hover_SELECTED = await shot("shot-R3-hover-SELECTED-no-change.png");

{
    const el = await page.$(".channel-rail-item >> nth=2");
    const bb = await el.boundingBox();
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(200);
    out.shots.R4_press = await shot("shot-R4-press-NO-SCALE.png");
    await page.mouse.up();
    await page.waitForTimeout(500);
}

await page.mouse.move(2, 2);
await page.evaluate(() => document.activeElement?.blur?.());
for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    if (await page.evaluate(() => document.activeElement?.classList?.contains("channel-rail-item") ?? false)) break;
}
await page.waitForTimeout(400);
out.shots.R5_focus_visible = await shot("shot-R5-focus-visible.png");

// zoomed dot-vs-ring collision
{
    const clip = await page.evaluate(() => {
        const sel = document.querySelector(".channel-rail-item[aria-selected=true]") ?? document.querySelector(".channel-rail-item");
        const b = sel.getBoundingClientRect();
        return { x: b.x - 10, y: b.y - 8, width: b.width + 20, height: b.height + 16 };
    });
    await page.screenshot({ path: join(SHOTS, "shot-Z-dot-vs-ring-closeup.png"), clip });
    out.shots.Z_closeup = clip;
}

// --- SPACE ARMS -----------------------------------------------------------
// Drive the model directly through the app's own exposed hydrate path if any;
// otherwise use the visible space control.
out.spaceControl = await page.evaluate(() => {
    const cands = [...document.querySelectorAll("[role=combobox],button")].map((el) => ({
        text: el.textContent.trim(), aria: el.getAttribute("aria-label"), cls: el.className.toString().slice(0, 60),
    }));
    return cands.filter((c) => /lab|LCh|OKL|RGB|HSL|space/i.test(c.text) || /space/i.test(c.aria ?? ""));
});

writeFileSync(join(HERE, "probe-04-spaces-shots.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2).slice(0, 4000));
await browser.close();
