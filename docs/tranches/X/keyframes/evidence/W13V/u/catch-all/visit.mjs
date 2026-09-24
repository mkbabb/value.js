// SERVED MODEL: claude-opus-5-5
// G-W13V-u3 · the catch-all route (/:pathMatch(.*)* -> "/") visited and audited on the served page.
// Per unknown deep link: the settled hash, the rendered scene (hero present?), console errors/warnings,
// the first painted frame (100 ms) and the settled frame; 1440 light + dark, 390 light.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/"; const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const links = ["#/nope", "#/starting-style", "#/cube/extra", "#/CUBE", "#/nope?anim=Matrix", "#/nope?state=MTIz", "#/%E2%9C%93", "#//"];
const b = await chromium.launch({ headless: false }); const res = [];
for (const [vpName, vp, scheme] of [["1440-light", { width: 1440, height: 900 }, "light"], ["1440-dark", { width: 1440, height: 900 }, "dark"], ["390-light", { width: 390, height: 844 }, "light"]]) {
  for (const [i, link] of links.entries()) {
    if (vpName !== "1440-light" && i > 1) continue; // the full link set at 1440 light; two links on the other legs
    const ctx = await b.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 1 }); const p = await ctx.newPage();
    const logs = []; p.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(`${m.type()}: ${m.text().slice(0, 140)}`); }); p.on("pageerror", (e) => logs.push("pageerror: " + String(e).slice(0, 140)));
    await p.goto(BASE + link); await p.waitForTimeout(100);
    await p.screenshot({ path: `${OUT}${vpName}-${i}-t100.png` });
    await p.waitForTimeout(3500);
    const st = await p.evaluate(() => ({ hash: location.hash, title: document.title, hero: !!document.querySelector(".wave-text"), h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim().slice(0, 40), scene: document.querySelector("[data-dock-tether=top] [role=combobox][aria-label=Scene]")?.textContent?.trim() || null, focus: document.activeElement?.tagName }));
    await p.screenshot({ path: `${OUT}${vpName}-${i}-settled.png` });
    res.push({ leg: vpName, link, ...st, logs }); await ctx.close();
  }
}
fs.writeFileSync(OUT + "visit.json", JSON.stringify(res, null, 1)); for (const r of res) console.log(JSON.stringify(r));
await b.close();
