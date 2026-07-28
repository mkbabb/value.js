// P7 — knob LIVENESS, done properly.
//   (0) which substrate is armed (webgl canvas vs the CSS-gradient placeholder)?
//   (1) the exact option TEXT the pane's label() emits for each medium
//   (2) with motion=Still, does each enum knob change the painted field?
//       (PNG byte-hash of a background patch; Escape between trials)
import { chromium } from "playwright";
import { createHash } from "node:crypto";
const sha = (b) => createHash("sha256").update(b).digest("hex").slice(0, 16);
const URL = "http://localhost:9000/#/atmosphere";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [], perrs = [];
page.on("console", (m) => { if (m.type() === "error" && !/VITE_API_URL/.test(m.text())) errs.push(m.text()); });
page.on("pageerror", (e) => perrs.push(String(e)));
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".aurora-row");
await page.waitForTimeout(2500);

console.log("0 · substrate");
console.log("  " + JSON.stringify(await page.evaluate(() => {
    const c = document.querySelector("canvas");
    const cs = c ? getComputedStyle(c) : null;
    // glass-ui's own auto tier, recomputed in-page the same way useAtmosphere does
    let glTier = "n/a";
    try {
        const t = document.createElement("canvas").getContext("webgl2");
        const dbg = t?.getExtension("WEBGL_debug_renderer_info");
        glTier = t ? String(t.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : t.RENDERER)) : "no-webgl2";
    } catch { glTier = "threw"; }
    const grad = [...document.querySelectorAll("*")].find((e) => /linear-gradient/.test(getComputedStyle(e).backgroundImage) && e.clientHeight > 500);
    return {
        canvas: !!c, canvasW: c?.width ?? 0, canvasH: c?.height ?? 0,
        canvasOpacity: cs?.opacity, canvasDisplay: cs?.display,
        canvasHasGl: !!(c && (c.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) || true)) ,
        renderer: glTier,
        fullPageGradientEl: grad ? grad.tagName + "." + String(grad.className).slice(0, 40) : null,
    };
})));

console.log("\n1 · the exact option text the pane's label() emits (Medium)");
await page.locator('[aria-label="Painterly medium"]').click();
await page.waitForTimeout(400);
const media = await page.evaluate(() => [...document.querySelectorAll('[role="option"]')].map((o) => o.textContent.trim()));
console.log("  " + JSON.stringify(media));
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

async function pick(label, optionText) {
    await page.locator(`[aria-label="${label}"]`).click();
    await page.waitForTimeout(400);
    const opt = page.locator('[role="option"]').filter({ hasText: new RegExp(`^${optionText}$`) }).first();
    if (!(await opt.count())) { await page.keyboard.press("Escape"); await page.waitForTimeout(300); return false; }
    await opt.click();
    await page.waitForTimeout(900);
    return true;
}

console.log("\n2 · liveness (motion=Still; 260x180 background patch, byte-hash)");
await pick("Motion register", "Still");
await page.waitForTimeout(1500);
const clip = { x: 30, y: 30, width: 260, height: 180 };
let base = sha(await page.screenshot({ clip }));
// stability control: same state twice
await page.waitForTimeout(1500);
const base2 = sha(await page.screenshot({ clip }));
console.log(`  baseline=${base}  restabled=${base2}  STATIC=${base === base2}${base !== base2 ? "  (field still animating — liveness test is inconclusive)" : ""}`);

for (const [lbl, val] of [
    ["Painterly medium", "Watercolor"],
    ["Painterly medium", "Vangogh"],
    ["Painterly medium", "Crayon"],
    ["Painterly medium", "Oil"],
    ["Painterly medium", "Smooth"],
    ["Zone arrangement", "Centred"],
    ["Zone arrangement", "Scattered"],
    ["Palette harmony", "Triad"],
    ["Palette harmony", "Monochrome"],
    ["Motion register", "Drifting"],
]) {
    const ok = await pick(lbl, val);
    if (!ok) { console.log(`  ${lbl} -> ${val}: OPTION NOT FOUND`); continue; }
    await page.waitForTimeout(1500);
    const h = sha(await page.screenshot({ clip }));
    const shown = (await page.locator(`[aria-label="${lbl}"]`).innerText()).trim();
    const bg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--saved-bg-0").trim());
    console.log(`  ${lbl.padEnd(17)} -> ${val.padEnd(11)} trigger="${shown.padEnd(11)}" patch=${h} CHANGED_vs_baseline=${h !== base}  --saved-bg-0=${bg}`);
}

console.log("\n3 · Reset");
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
await page.getByRole("button", { name: /Reset/i }).click();
await page.waitForTimeout(1200);
console.log("  " + JSON.stringify(await page.evaluate(() =>
    [...document.querySelectorAll(".aurora-row")].map((r) => r.querySelector('[role="combobox"]').textContent.trim()))));
console.log("  expected: Analogous / Scattered / Smooth / Drifting");
console.log(`\n4 · consoleErrors=${errs.length} pageErrors=${perrs.length}`);
errs.slice(0, 5).forEach((e) => console.log(`    ${e.slice(0, 200)}`));
perrs.slice(0, 5).forEach((e) => console.log(`    ${e.slice(0, 200)}`));
await browser.close();
