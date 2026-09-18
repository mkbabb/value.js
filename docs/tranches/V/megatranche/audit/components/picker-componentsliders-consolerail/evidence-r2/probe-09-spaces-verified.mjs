// CHALLENGE-D r2 · probe 09 — the space sweep, EACH ARM VERIFIED against the
// combobox's own label before any measurement is recorded (probe-07's ICtCp
// arm was an index artifact; this probe refuses to record an unverified arm).
// Read-only.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2500);

const comboLabel = () => page.evaluate(() => document.querySelector('[role=combobox][aria-label="Select color space"]')?.textContent.trim());

async function pickVerified(name, tries = 3) {
    for (let t = 0; t < tries; t++) {
        const combo = page.locator('[role=combobox][aria-label="Select color space"]').first();
        await combo.click(); await page.waitForTimeout(700);
        const opts = await page.locator("[role=option]").allTextContents();
        const idx = opts.findIndex((o) => o.trim().startsWith(name));
        if (idx < 0) { await page.keyboard.press("Escape"); await page.waitForTimeout(300); continue; }
        await page.locator("[role=option]").nth(idx).click();
        await page.waitForTimeout(1800);
        if ((await comboLabel()) === name) return true;
    }
    return false;
}

const state = (name) => page.evaluate((name) => {
    const rail = document.querySelector(".channel-rail");
    const rb = rail.getBoundingClientRect();
    const items = [...rail.querySelectorAll(".channel-rail-item")];
    const rows = [...document.querySelectorAll(".channel-strip")].map((el) => { const b = el.getBoundingClientRect(); return +(b.y + b.height / 2).toFixed(2); });
    return {
        verifiedAs: document.querySelector('[role=combobox][aria-label="Select color space"]')?.textContent.trim(),
        asked: name,
        railW: +rb.width.toFixed(2), railH: +rb.height.toFixed(2), n: items.length,
        anySelected: items.some((e) => e.getAttribute("aria-selected") === "true"),
        glyphs: items.map((el) => {
            const g = el.querySelector(".rail-glyph"); const gb = g.getBoundingClientRect();
            const b = el.getBoundingClientRect(); const gs = getComputedStyle(g);
            return { t: el.textContent.trim(), cps: [...el.textContent.trim()].map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase()), itemW: +b.width.toFixed(2), glyphW: +gb.width.toFixed(2), fam: gs.fontFamily.split(",")[0], style: gs.fontStyle };
        }),
        pitchRail: items.length > 1 ? +(items[1].getBoundingClientRect().y - items[0].getBoundingClientRect().y).toFixed(2) : null,
        pitchRows: rows.length > 1 ? +(rows[1] - rows[0]).toFixed(2) : null,
        drift: items.map((el, i) => { const b = el.getBoundingClientRect(); return rows[i] != null ? +((b.y + b.height / 2) - rows[i]).toFixed(2) : null; }),
    };
}, name);

const out = { arms: {}, failedPicks: [] };
for (const s of ["Lab", "LCh", "OKLab", "OKLCh", "RGB", "HSL", "HSV", "HWB", "XYZ", "ICtCp", "Jzazbz", "Kelvin", "Hex", "Rec. 2020", "Display P3"]) {
    const ok = await pickVerified(s);
    if (!ok) { out.failedPicks.push({ space: s, landedOn: await comboLabel() }); continue; }
    out.arms[s] = await state(s);
    await page.screenshot({ path: join(HERE, `shot-A-${s.replace(/[^A-Za-z0-9]/g, "")}.png`), clip: await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: Math.max(0, b.x - 8), y: Math.max(0, b.y - 10), width: b.width + 220, height: b.height + 20 }; }) });
}
writeFileSync(join(HERE, "probe-09-spaces-verified.json"), JSON.stringify(out, null, 2));
const ws = [];
for (const [k, v] of Object.entries(out.arms)) {
    ws.push(v.railW);
    console.log(k.padEnd(11), `n=${v.n} railW=${String(v.railW).padStart(6)} railH=${v.railH} sel=${v.anySelected} pitchRail=${v.pitchRail} pitchRows=${v.pitchRows} drift=${JSON.stringify(v.drift)}  ${v.glyphs.map((g) => `${g.t}(${g.cps.join("+")})`).join(" ")}`);
}
console.log("\nrailW distinct:", [...new Set(ws)].sort((a, b) => a - b).join(", "), " min→max swing:", (Math.max(...ws) - Math.min(...ws)).toFixed(2), "px =", (100 * (Math.max(...ws) / Math.min(...ws) - 1)).toFixed(1) + "%");
console.log("failedPicks:", JSON.stringify(out.failedPicks));
await browser.close();
