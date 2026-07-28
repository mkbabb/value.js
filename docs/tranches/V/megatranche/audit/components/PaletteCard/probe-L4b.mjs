// CHALLENGE-L pass 4, probe B — does the LIVE export path (demo/palettes/export.ts,
// the one PaletteCard's menu drives) escape user-controlled text before
// interpolating it into SVG markup? The DEAD contract path ships `xmlEscape`
// (demo/palettes/export/canonical.ts:39); the live one has no escaper.
// Read-only except localStorage seeding in an isolated browser profile.
import { webkit } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const now = "2026-07-27T00:00:00.000Z";

// A name a user can type into PaletteCard's own Rename field.
const HOSTILE = 'Ridge</text><rect x="0" y="0" width="999" height="999" fill="#f0f"/><text>';

const STORE = { version: 1, palettes: [{
    id: "hostile", name: HOSTILE, slug: "hostile",
    colors: [{ css: '#ff6b6b" onload="0', position: 0 }, { css: "#123456", position: 1 }],
    createdAt: now, updatedAt: now, isLocal: true,
}] };

const browser = await webkit.launch();
const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), STORE);

const out = {};
try {
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector('[role="article"]', { timeout: 20000 });
    await page.waitForTimeout(700);
    await page.click('[aria-label="Palette menu"]');
    await page.waitForTimeout(300);
    await page.click('text="Export"');
    await page.waitForTimeout(300);
    const dl = page.waitForEvent("download", { timeout: 10000 }).catch(() => null);
    await page.click('text="SVG Swatch"');
    const d = await dl;
    if (!d) out.result = "NO DOWNLOAD";
    else {
        const p = OUT + "L4b-" + d.suggestedFilename();
        await d.saveAs(p);
        const svg = readFileSync(p, "utf8");
        out.filename = d.suggestedFilename();
        out.svg = svg;
        out.escaped = !svg.includes("</text><rect");
        out.injectedElementCount = (svg.match(/<rect/g) || []).length;
        out.rawColorAttrPresent = svg.includes('fill="#ff6b6b" onload="0"');
    }
} catch (e) { out.PROBE_ERROR = String(e).split("\n")[0]; }
finally { await browser.close(); }

console.log(JSON.stringify(out, null, 2));
