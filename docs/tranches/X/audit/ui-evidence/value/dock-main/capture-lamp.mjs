// dock-main: DockStatusLamp capture — backend forced offline by aborting ONLY non-dev-server origins.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const notes = [];
for (const [vp, size] of [["d", { width: 1440, height: 900 }], ["m", { width: 390, height: 844 }]]) {
  for (const theme of ["light", "dark"]) {
    const c = await b.newContext({ viewport: size, deviceScaleFactor: 2, colorScheme: theme });
    await c.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const p = await c.newPage();
    const hosts = new Set();
    await p.route("**/*", (r) => { const u = new URL(r.request().url()); if (u.host !== "localhost:9000" && !/fonts|jsdelivr|cdnjs/.test(u.host)) { hosts.add(u.host); return r.abort(); } return r.continue(); });
    await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(6000);
    const lamp = await p.evaluate(() => { const l = document.querySelector(".dock-status-lamp"); if (!l) return null; const r = l.getBoundingClientRect(); const d = document.querySelector(".glass-dock").getBoundingClientRect(); const cs = getComputedStyle(l); return { variant: l.dataset.variant, text: l.textContent.trim(), rect: [r.x, r.y, r.width, r.height].map(Math.round), dock: [d.x, d.y, d.width, d.height].map(Math.round), radius: cs.borderTopLeftRadius, font: cs.fontSize }; });
    notes.push({ vp, theme, aborted: [...hosts], lamp });
    await p.screenshot({ path: `${OUT}${vp}-${theme}-30-lamp-offline-page.png` });
    await p.screenshot({ path: `${OUT}${vp}-${theme}-31-lamp-band.png`, clip: { x: 0, y: 0, width: size.width, height: 110 } });
    await c.close();
  }
}
writeFileSync(`${OUT}capture-lamp-meta.json`, JSON.stringify(notes, null, 1));
await b.close(); console.log(JSON.stringify(notes));
