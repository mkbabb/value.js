// CHALLENGE-D r2 · probe 07 — every color-space arm the rail must render:
// glyph set, rail width/height, and the two-glyph (ICtCp / Jzazbz) + Hex
// extremes. Read-only.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2500);

async function pickSpace(prefix) {
    const combo = page.locator('[role=combobox][aria-label="Select color space"]').first();
    await combo.click(); await page.waitForTimeout(600);
    const opts = await page.locator("[role=option]").allTextContents();
    const idx = opts.findIndex((t) => t.trim().startsWith(prefix));
    if (idx < 0) { await page.keyboard.press("Escape"); return false; }
    await page.locator("[role=option]").nth(idx).click();
    await page.waitForTimeout(1600);
    return true;
}

const state = () => page.evaluate(() => {
    const rail = document.querySelector(".channel-rail");
    if (!rail) return { railPresent: false };
    const rb = rail.getBoundingClientRect();
    const items = [...rail.querySelectorAll(".channel-rail-item")];
    const rows = [...document.querySelectorAll(".channel-strip")].map((el) => { const b = el.getBoundingClientRect(); return +(b.y + b.height / 2).toFixed(2); });
    return {
        railPresent: true,
        railW: +rb.width.toFixed(2), railH: +rb.height.toFixed(2),
        n: items.length,
        anySelected: items.some((e) => e.getAttribute("aria-selected") === "true"),
        glyphs: items.map((el) => {
            const g = el.querySelector(".rail-glyph");
            const gb = g.getBoundingClientRect(); const gs = getComputedStyle(g);
            const b = el.getBoundingClientRect();
            return {
                t: el.textContent.trim(), cps: [...el.textContent.trim()].map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase()),
                itemW: +b.width.toFixed(2), glyphW: +gb.width.toFixed(2), glyphH: +gb.height.toFixed(2),
                fam: gs.fontFamily.split(",")[0], style: gs.fontStyle,
                aria: el.getAttribute("aria-label"),
                overflowsItem: +(gb.width - b.width + 12).toFixed(2), // 12 = 2*0.375rem padding
            };
        }),
        drift: items.map((el, i) => { const b = el.getBoundingClientRect(); return rows[i] != null ? +((b.y + b.height / 2) - rows[i]).toFixed(2) : null; }),
        pitchRail: items.length > 1 ? +(items[1].getBoundingClientRect().y - items[0].getBoundingClientRect().y).toFixed(2) : null,
        pitchRows: rows.length > 1 ? +(rows[1] - rows[0]).toFixed(2) : null,
    };
});

const out = { arms: {} };
for (const s of ["Lab", "LCh", "OKLCh", "HWB", "XYZ", "ICtCp", "Jzazbz", "Kelvin", "Hex", "RGB"]) {
    const ok = await pickSpace(s);
    out.arms[s] = ok ? await state() : { picked: false };
    if (ok && out.arms[s].railPresent) {
        await page.screenshot({
            path: join(HERE, `shot-G-${s.replace(/[^A-Za-z0-9]/g, "")}.png`),
            clip: await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: Math.max(0, b.x - 8), y: Math.max(0, b.y - 10), width: b.width + 220, height: b.height + 20 }; }),
        });
    }
}
writeFileSync(join(HERE, "probe-07-glyph-arms.json"), JSON.stringify(out, null, 2));
for (const [k, v] of Object.entries(out.arms)) {
    console.log(k.padEnd(8), v.railPresent === false ? "RAIL ABSENT" : v.picked === false ? "not picked" :
        `n=${v.n} railW=${v.railW} railH=${v.railH} sel=${v.anySelected} pitchRail=${v.pitchRail} pitchRows=${v.pitchRows} drift=${JSON.stringify(v.drift)} glyphs=${v.glyphs.map((g) => `${g.t}[${g.cps.join(" ")}] w${g.glyphW}/${g.itemW} ${g.fam}${g.style === "italic" ? "-i" : ""}`).join(" | ")}`);
}
await browser.close();
