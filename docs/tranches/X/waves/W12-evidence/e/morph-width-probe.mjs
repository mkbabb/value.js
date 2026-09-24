// SERVED MODEL: claude-opus-5-5
// X.W12.e · DOCK-MORPH-ROOT instrument: sample the dock's inline size every
// rAF across three layer switches (Tools → action bar, Back, Login → slug
// edit) on the served page. An iOS-27 morph shows intermediate widths; a
// snap shows exactly two. Usage: node <this> <origin> <out.json>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const [origin = "http://localhost:9000", out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
await p.goto(`${origin}/#/`, { waitUntil: "load" });
await p.locator(".glass-dock .view-select-trigger").waitFor();
await p.waitForTimeout(2500);
const btn = (name) => p.locator(".glass-dock").getByRole("button", { name, exact: true });
const arm = () =>
    p.evaluate(() => {
        const d = document.querySelector(".glass-dock");
        const w = window;
        w.__s = [];
        const t0 = performance.now();
        const tick = () => {
            const r = d.getBoundingClientRect();
            w.__s.push([Math.round(performance.now() - t0), Math.round(r.width * 10) / 10, d.hasAttribute("data-morphing") ? 1 : 0]);
            if (performance.now() - t0 < 1200) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
const rows = [];
for (const [name, go] of [
    ["tools", () => btn("Toggle action bar").click()],
    ["back", () => btn("Back").click()],
    ["login", () => btn("Login").click()],
]) {
    await arm();
    await go();
    await p.waitForTimeout(1400);
    const s = await p.evaluate(() => window.__s);
    const widths = [...new Set(s.map((x) => x[1]))];
    rows.push({ switch: name, frames: s.length, distinctWidths: widths.length, widths, morphingFrames: s.filter((x) => x[2]).length });
}
await b.close();
console.log(JSON.stringify(rows));
if (out) writeFileSync(out, JSON.stringify(rows, null, 1));
